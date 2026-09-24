import assert from "assert";
import http from "http";
import express from "express";
import { Server, matchMaker } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { Client as ColyseusClient } from "colyseus.js";
import { TriviaRoom } from "../src/rooms/TriviaRoom";
import { GameState } from "../src/rooms/schema/GameState";

async function testMatchmaking() {
  console.log("▶ Testing Matchmaking by roomCode...");
  const port = 3901;
  const app = express();
  const httpServer = http.createServer(app);

  const gameServer = new Server({
    transport: new WebSocketTransport({
      server: httpServer
    })
  });

  gameServer.define("trivia_room", TriviaRoom).filterBy(["roomCode"]);
  await gameServer.listen(port);

  try {
    const client1 = new ColyseusClient(`ws://localhost:${port}`);
    const client2 = new ColyseusClient(`ws://localhost:${port}`);

    // 1. Host creates room with roomCode "FILM"
    console.log("  * Host creating room FILM...");
    const hostRoom = await client1.create<GameState>("trivia_room", {
      name: "HostPlayer",
      roomCode: "FILM"
    });
    console.log("  * Host room created, id:", hostRoom.id, "sessionId:", hostRoom.sessionId);
    await new Promise((r) => hostRoom.onStateChange.once(r));
    assert.strictEqual(hostRoom.state.roomCode, "FILM");

    // 2. Client 2 joins room with roomCode "FILM"
    console.log("  * Client 2 joining room FILM...");
    const guestRoom = await client2.join<GameState>("trivia_room", {
      name: "GuestPlayer",
      roomCode: "FILM"
    });
    console.log("  * Guest joined, id:", guestRoom.id, "sessionId:", guestRoom.sessionId);
    assert.strictEqual(guestRoom.id, hostRoom.id, "Guest should be in the same room as host");

    // 3. Client 3 joins with non-existent code
    console.log("  * Client 3 attempting to join non-existent room NOPE...");
    const client3 = new ColyseusClient(`ws://localhost:${port}`);
    let joinFailed = false;
    try {
      await client3.join<GameState>("trivia_room", {
        name: "LostPlayer",
        roomCode: "NOPE"
      });
    } catch (e: any) {
      joinFailed = true;
      console.log("  * Expected failure caught:", e.message);
    }
    assert.strictEqual(joinFailed, true, "Should fail when roomCode does not exist");

    // 4. Test room created without explicit roomCode in options
    console.log("  * Host creating room without options.roomCode...");
    const hostRoom2 = await client1.create<GameState>("trivia_room", {
      name: "AutoHost"
    });
    await new Promise((r) => hostRoom2.onStateChange.once(r));
    const generatedCode = hostRoom2.state.roomCode;
    console.log("  * Auto-generated roomCode:", generatedCode);

    console.log(`  * Client trying to join auto-generated code ${generatedCode}...`);
    try {
      const guestRoom2 = await client2.join<GameState>("trivia_room", {
        name: "AutoGuest",
        roomCode: generatedCode
      });
      console.log("  * Joined auto-generated room successfully!");
      await guestRoom2.leave();
    } catch (e: any) {
      console.log("  ❌ FAILED TO JOIN AUTO-GENERATED ROOM:", e.message);
    }
    await hostRoom2.leave();

    await hostRoom.leave();
    await guestRoom.leave();
    console.log("✅ Matchmaking test passed!");
  } finally {
    await gameServer.gracefullyShutdown(false);
  }
}

if (require.main === module) {
  testMatchmaking().catch((e) => {
    console.error("Matchmaking test failed:", e);
    process.exit(1);
  });
}
