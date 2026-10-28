import assert from "assert";
import http from "http";
import express from "express";
import { Server, matchMaker } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { Client as ColyseusClient } from "colyseus.js";
import { TriviaRoom } from "../src/rooms/TriviaRoom";
import { GameState } from "../src/rooms/schema/GameState";

async function runMidGameJoinAndHardeningTest() {
  console.log("==================================================");
  console.log("🛡️ RUNNING MID-GAME JOIN & KICK PREVENTION TEST");
  console.log("==================================================");

  const port = 3910;
  const app = express();
  app.use(express.json());

  app.get("/api/room/:code", async (req, res) => {
    const rawCode = String(req.params.code || "").trim().toUpperCase();
    const rooms = await matchMaker.query({ name: "trivia_room" });
    const match = rooms.find(r =>
      (r.roomId && r.roomId.toUpperCase() === rawCode) ||
      (r.metadata?.roomCode && String(r.metadata.roomCode).toUpperCase() === rawCode)
    );

    if (!match) {
      return res.status(404).json({ exists: false, error: `Room ${rawCode} not found` });
    }

    const isOngoing = Boolean(match.metadata?.phase && match.metadata.phase !== "lobby");
    return res.status(200).json({
      exists: true,
      roomId: match.roomId,
      roomCode: match.metadata?.roomCode || match.roomId,
      clients: match.clients,
      maxClients: match.maxClients || 16,
      phase: match.metadata?.phase || "lobby",
      locked: Boolean(match.locked),
      ongoing: isOngoing
    });
  });

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
    const wsUrl = `ws://localhost:${port}`;
    const httpUrl = `http://localhost:${port}`;

    // 1. Host creates room
    const hostClient = new ColyseusClient(wsUrl);
    const hostRoom = await hostClient.create<GameState>("trivia_room", {
      name: "HostPlayer",
      avatar: "aman",
      roomCode: "LOCK",
      userId: "u_host"
    });
    await new Promise(r => hostRoom.onStateChange.once(r));
    assert.strictEqual(hostRoom.state.roomCode, "LOCK");
    console.log("  ✔ Step 1: Host created room LOCK in lobby");

    // Check API before start
    const apiBefore = await (await fetch(`${httpUrl}/api/room/LOCK`)).json() as any;
    assert.strictEqual(apiBefore.ongoing, false);
    assert.strictEqual(apiBefore.phase, "lobby");

    // 2. Player 2 joins in lobby
    const p2Client = new ColyseusClient(wsUrl);
    const p2Room = await p2Client.joinById<GameState>(hostRoom.id, {
      name: "Player2",
      avatar: "amish",
      roomCode: "LOCK",
      userId: "u_p2"
    });
    await new Promise(r => p2Room.onStateChange.once(r));
    await new Promise(r => setTimeout(r, 200));
    assert.strictEqual(p2Room.state.players.size, 2);
    console.log("  ✔ Step 2: Player 2 joined in lobby");

    // Both players ready
    hostRoom.send("player_ready", { isReady: true });
    p2Room.send("player_ready", { isReady: true });
    await new Promise(r => setTimeout(r, 150));

    // 3. Host starts match
    hostRoom.send("start_game", { rounds: 3, timer: 15 });
    console.log("  * Waiting for match to start (countdown -> round_intro -> playing)...");
    await new Promise<void>((resolve) => {
      const iv = setInterval(() => {
        if (hostRoom.state.phase === "playing") {
          clearInterval(iv);
          resolve();
        }
      }, 150);
    });
    assert.strictEqual(hostRoom.state.phase, "playing");
    console.log("  ✔ Step 3: Match is now actively playing");

    // Check API during match
    const apiDuring = await (await fetch(`${httpUrl}/api/room/LOCK`)).json() as any;
    assert.strictEqual(apiDuring.ongoing, true, "Room must be marked ongoing during active game");
    assert.strictEqual(apiDuring.locked, true, "Room must be locked by matchmaker during active game");
    console.log("  ✔ Step 4: /api/room/LOCK confirms ongoing: true, locked: true");

    // 4. Try joining with a NEW Player 3 during the game (MUST BE REJECTED)
    console.log("  * Attempting to join as new Player 3 during active match...");
    const p3Client = new ColyseusClient(wsUrl);
    let p3JoinRejected = false;
    try {
      await p3Client.joinById<GameState>(hostRoom.id, {
        name: "Player3_Intruder",
        avatar: "aman",
        roomCode: "LOCK",
        userId: "u_p3_new"
      });
    } catch (err: any) {
      p3JoinRejected = true;
      console.log("  ✔ Player 3 join correctly rejected with error:", err.message);
      assert.ok(err.message.includes("already started") || err.message.includes("locked") || err.message.includes("closed"));
    }
    assert.strictEqual(p3JoinRejected, true, "New player must NOT be allowed to join ongoing game!");

    // 5. Simulate Player 2 socket drop (unconsented)
    console.log("  * Simulating Player 2 unexpected disconnect during active gameplay...");
    const p2Token = p2Room.reconnectionToken;
    assert.ok(p2Token, "p2 must have reconnection token");
    hostRoom.state.players.get(p2Room.sessionId)!.score = 25;

    // Abrupt transport close
    (p2Room as any).connection.transport.close();
    await new Promise(r => setTimeout(r, 400));

    // Verify Player 2 is NOT kicked / deleted from room
    const p2InHostState = hostRoom.state.players.get(p2Room.sessionId);
    assert.ok(p2InHostState, "Player 2 must NOT be deleted from server state during unconsented disconnect!");
    assert.strictEqual(p2InHostState.connected, false, "Player 2 is marked disconnected: false");
    assert.strictEqual(p2InHostState.score, 25, "Player 2 score is preserved");
    console.log("  ✔ Step 5: Player 2 slot and score preserved on server during disconnect");

    // 6. Player 2 reconnects during active match
    console.log("  * Player 2 reconnecting using token...");
    const p2Reconnected = await p2Client.reconnect<GameState>(p2Token);
    await new Promise(r => setTimeout(r, 150));
    assert.strictEqual(p2Reconnected.sessionId, hostRoom.state.players.get(p2Room.sessionId)?.id);
    assert.strictEqual(hostRoom.state.players.get(p2Room.sessionId)?.connected, true);
    assert.strictEqual(hostRoom.state.players.get(p2Room.sessionId)?.score, 25);
    console.log("  ✔ Step 6: Player 2 reconnected seamlessly with score intact!");

    // 7. Match ends and host rematches (returns to lobby)
    console.log("  * Host returns room to lobby (rematch)...");
    hostRoom.send("rematch");
    await new Promise<void>((resolve) => {
      const iv = setInterval(() => {
        if (hostRoom.state.phase === "lobby") {
          clearInterval(iv);
          resolve();
        }
      }, 100);
    });
    assert.strictEqual(hostRoom.state.phase, "lobby");

    // Check API after returning to lobby
    const apiLobby = await (await fetch(`${httpUrl}/api/room/LOCK`)).json() as any;
    assert.strictEqual(apiLobby.ongoing, false);
    assert.strictEqual(apiLobby.locked, false, "Room must be unlocked when back in lobby");

    // 8. Now Player 3 CAN join in lobby!
    console.log("  * Player 3 joining now that room is back in lobby...");
    const p3LobbyRoom = await p3Client.joinById<GameState>(hostRoom.id, {
      name: "Player3_NowAllowed",
      avatar: "aman",
      roomCode: "LOCK",
      userId: "u_p3_new"
    });
    await new Promise(r => p3LobbyRoom.onStateChange.once(r));
    await new Promise(r => setTimeout(r, 200));
    assert.strictEqual(p3LobbyRoom.state.players.size, 3, "Room should now have 3 players in lobby");
    console.log("  ✔ Step 7: Player 3 successfully joined lobby after match ended!");

    // Clean up
    await hostRoom.leave();
    await p2Reconnected.leave();
    await p3LobbyRoom.leave();

    console.log("==================================================");
    console.log("🎉 ALL MID-GAME JOIN & KICK PREVENTION TESTS PASSED 100%!");
    console.log("==================================================");
  } finally {
    await gameServer.gracefullyShutdown(false);
  }
}

runMidGameJoinAndHardeningTest().catch(err => {
  console.error("❌ Test Failed:", err);
  process.exit(1);
});
