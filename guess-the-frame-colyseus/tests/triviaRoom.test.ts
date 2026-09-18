import assert from "assert";
import http from "http";
import express from "express";
import { Server, matchMaker } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { Client as ColyseusClient } from "colyseus.js";
import { TriviaRoom } from "../src/rooms/TriviaRoom";

import { GameState } from "../src/rooms/schema/GameState";

async function runIntegrationTest() {
  console.log("▶ Running TriviaRoom End-to-End Integration Test...");

  const port = 3899;
  const app = express();
  const httpServer = http.createServer(app);

  const gameServer = new Server({
    transport: new WebSocketTransport({
      server: httpServer
    })
  });

  gameServer.define("trivia_room", TriviaRoom);

  await gameServer.listen(port);
  console.log(`  * Test Server listening on port ${port}`);

  try {
    const client1 = new ColyseusClient(`ws://localhost:${port}`);
    const client2 = new ColyseusClient(`ws://localhost:${port}`);

    // 1. Host creates & joins room
    const room1 = await client1.joinOrCreate<GameState>("trivia_room", {
      name: "Host Player",
      avatar: "aman",
      roomCode: "TEST"
    });
    await new Promise((r) => room1.onStateChange.once(r));
    assert.strictEqual(room1.state.roomCode, "TEST", "Room code should be TEST");
    assert.strictEqual(room1.state.players.size, 1, "Should have 1 player");

    // 2. Client 2 joins room
    const room2 = await client2.joinOrCreate<GameState>("trivia_room", {
      name: "Player Two",
      avatar: "amish",
      roomCode: "TEST"
    });
    await new Promise((r) => room2.onStateChange.once(r));
    await new Promise((r) => setTimeout(r, 150));
    assert.strictEqual(room2.state.players.size, 2, "Should have 2 players");

    // Verify Host role
    const p1 = room1.state.players.get(room1.sessionId);
    const p2 = room1.state.players.get(room2.sessionId);
    assert.strictEqual(p1?.isHost, true, "Player 1 must be Host");
    assert.strictEqual(p2?.isHost, false, "Player 2 must NOT be Host");

    // 3. Test Host-only commands
    // Client 2 attempts to start game (should be ignored)
    room2.send("start_game", { rounds: 3, timer: 15 });
    await new Promise((r) => setTimeout(r, 200));
    assert.strictEqual(room1.state.phase, "lobby", "Non-host cannot start game");

    // Host starts the game
    room1.send("start_game", { rounds: 3, timer: 15 });

    // Wait for countdown (3s) + round transition
    console.log("  * Waiting for countdown and round start...");
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (room1.state.phase === "playing") {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });

    assert.strictEqual(room1.state.phase, "playing", "Phase should be playing");
    assert.strictEqual(room1.state.revealedAnswer, "", "Answer must be hidden during playing phase!");
    assert.ok(room1.state.currentMediaContent.length > 0, "Media content must be provided");

    // 4. Test Hint deduction
    let hintReceived = false;
    room2.onMessage("hint_response", (msg) => {
      assert.ok(msg.maskedHint.includes("_"), "Hint should be masked");
      assert.strictEqual(msg.pointsDeducted, 2, "Should deduct 2 points");
      hintReceived = true;
    });

    room2.send("request_hint");
    await new Promise((r) => setTimeout(r, 300));
    assert.strictEqual(hintReceived, true, "Client 2 must receive private hint");
    // Client 2 score was 0, deduction clamped to 0
    assert.strictEqual(room1.state.players.get(room2.sessionId)?.score, 0, "Score cannot be negative");

    // 5. Test Chat Spoiler Shield
    let spoilerBlocked = false;
    room2.onMessage("chat_warning", (msg) => {
      spoilerBlocked = true;
    });

    // Access secret answer directly from server instance to test anti-spoiler
    const serverRoom = matchMaker.getRoomById(room1.id);
    const serverSecretAnswer = (serverRoom as any)?.currentSecretAnswer;
    assert.ok(serverSecretAnswer && serverSecretAnswer.length > 0, "Server must have secret answer");

    // Send spoiler in chat
    room2.send("send_chat", { text: `The answer is ${serverSecretAnswer} for sure!` });
    await new Promise((r) => setTimeout(r, 300));
    assert.strictEqual(spoilerBlocked, true, "Chat spoiler must be intercepted and blocked");

    // 6. Test Correct Guess by Player 1 (1st place = 10 pts)
    let p1ResultReceived = false;
    room1.onMessage("guess_result", (res) => {
      if (res.isCorrect) {
        assert.strictEqual(res.position, 1, "Player 1 should be 1st place");
        assert.strictEqual(res.points, 10, "Player 1 should get 10 pts");
        p1ResultReceived = true;
      }
    });

    room1.send("submit_guess", { text: serverSecretAnswer });
    await new Promise((r) => setTimeout(r, 400));
    assert.strictEqual(p1ResultReceived, true, "Player 1 guess result received");
    assert.strictEqual(room1.state.players.get(room1.sessionId)?.score, 10, "Player 1 score should be 10");

    // 7. Test Correct Guess by Player 2 (2nd place = 7 pts)
    let p2ResultReceived = false;
    room2.onMessage("guess_result", (res) => {
      if (res.isCorrect) {
        assert.strictEqual(res.position, 2, "Player 2 should be 2nd place");
        assert.strictEqual(res.points, 7, "Player 2 should get 7 pts");
        p2ResultReceived = true;
      }
    });

    room2.send("submit_guess", { text: serverSecretAnswer });
    await new Promise((r) => setTimeout(r, 400));
    assert.strictEqual(p2ResultReceived, true, "Player 2 guess result received");
    assert.strictEqual(room1.state.players.get(room2.sessionId)?.score, 7, "Player 2 score should be 7");

    // 8. Round Completion
    // Since both players in the room guessed correctly, the round must finish!
    console.log("  * Waiting for round_reveal transition...");
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (room1.state.phase === "round_reveal") {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });

    assert.strictEqual(room1.state.phase, "round_reveal", "Phase must transition to round_reveal");
    assert.strictEqual(room1.state.revealedAnswer, serverSecretAnswer, "Revealed answer must match server secret");
    assert.strictEqual(room1.state.currentRoundWinners.length, 2, "Should have 2 round winners");

    // Disconnect clients
    await room1.leave();
    await room2.leave();
    console.log("✅ TriviaRoom End-to-End Integration Test Passed!");
  } finally {
    await gameServer.gracefullyShutdown(false);
  }
}

export { runIntegrationTest };

if (require.main === module) {
  runIntegrationTest().catch((err) => {
    console.error("❌ Test Failed:", err);
    process.exit(1);
  });
}

