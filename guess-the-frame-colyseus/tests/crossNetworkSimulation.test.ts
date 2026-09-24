import assert from "assert";
import http from "http";
import express from "express";
import { Server, matchMaker } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { Client as ColyseusClient } from "colyseus.js";
import { TriviaRoom } from "../src/rooms/TriviaRoom";
import { GameState } from "../src/rooms/schema/GameState";

async function testCrossNetworkSimulation() {
  console.log("==================================================");
  console.log("🌐 STARTING CROSS-NETWORK & RECONNECTION SIMULATION");
  console.log("==================================================");

  const port = 3902;
  const app = express();
  app.use(express.json());

  // Replicate index.ts APIs
  app.get("/health", async (req, res) => {
    const rooms = await matchMaker.query({ name: "trivia_room" });
    res.status(200).json({ status: "healthy", activeRooms: rooms.length });
  });

  app.get("/ping", (req, res) => {
    res.status(200).send("pong");
  });

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

    return res.status(200).json({
      exists: true,
      roomId: match.roomId,
      roomCode: match.metadata?.roomCode || match.roomId,
      clients: match.clients,
      maxClients: match.maxClients || 16,
      phase: match.metadata?.phase || "lobby"
    });
  });

  const httpServer = http.createServer(app);
  const gameServer = new Server({
    transport: new WebSocketTransport({
      server: httpServer,
      pingInterval: 10000,
      pingMaxRetries: 6
    })
  });

  gameServer.define("trivia_room", TriviaRoom).filterBy(["roomCode"]);
  await gameServer.listen(port);
  console.log(`  * Simulation Server active on port ${port}`);

  try {
    const serverUrl = `http://localhost:${port}`;
    const wsUrl = `ws://localhost:${port}`;

    // ── TEST 1: Cold start & Health Checks ──
    console.log("▶ [Test 1] Verifying /health and /ping endpoints...");
    const pingRes = await fetch(`${serverUrl}/ping`);
    const pingText = await pingRes.text();
    assert.strictEqual(pingText, "pong", "Ping must return pong");

    const healthRes = await fetch(`${serverUrl}/health`);
    const healthJson: any = await healthRes.json();
    assert.strictEqual(healthJson.status, "healthy", "Health must return healthy");
    console.log("  ✔ /health and /ping verified!");

    // ── TEST 2: Host creates Room FILM ──
    console.log("▶ [Test 2] Host creates room FILM...");
    const hostClient = new ColyseusClient(wsUrl);
    const hostRoom = await hostClient.create<GameState>("trivia_room", {
      name: "DeviceA_WiFi",
      avatar: "aman",
      roomCode: "FILM"
    });
    await new Promise(r => hostRoom.onStateChange.once(r));
    assert.strictEqual(hostRoom.state.roomCode, "FILM", "Host roomCode must be FILM");
    console.log("  ✔ Room FILM created. ID:", hostRoom.id);

    // ── TEST 3: HTTP API Room Code Resolution ──
    console.log("▶ [Test 3] Remote client querying /api/room/FILM before joining...");
    const queryRes = await fetch(`${serverUrl}/api/room/FILM`);
    const queryData: any = await queryRes.json();
    assert.strictEqual(queryData.exists, true, "Room FILM must exist");
    assert.strictEqual(queryData.roomCode, "FILM", "RoomCode must match FILM");
    assert.strictEqual(queryData.clients, 1, "Must show 1 connected client");
    console.log("  ✔ /api/room/FILM correctly returned room metadata!");

    // ── TEST 4: Query invalid room code ──
    console.log("▶ [Test 4] Remote client querying invalid room code /api/room/WXYZ...");
    const badRes = await fetch(`${serverUrl}/api/room/WXYZ`);
    const badData: any = await badRes.json();
    assert.strictEqual(badRes.status, 404, "Invalid room must return 404");
    assert.strictEqual(badData.exists, false, "exists must be false");
    console.log("  ✔ Non-existent room correctly returned 404!");

    // ── TEST 5: Remote Mobile Client (Device B, 4G) joins via resolved roomId ──
    console.log("▶ [Test 5] Remote Mobile client joins via joinById(roomId)...");
    const mobileClient = new ColyseusClient(wsUrl);
    const mobileRoom = await mobileClient.joinById<GameState>(queryData.roomId, {
      name: "DeviceB_4G",
      avatar: "amish"
    });
    await new Promise(r => mobileRoom.onStateChange.once(r));
    assert.strictEqual(mobileRoom.state.players.size, 2, "Room must have 2 players");
    console.log("  ✔ Remote mobile client joined successfully via joinById!");

    // ── TEST 6: Heartbeat Ping/Pong ──
    console.log("▶ [Test 6] Testing application-level keep-alive heartbeat ping/pong...");
    let pongReceived = false;
    mobileRoom.onMessage("pong", (data) => {
      pongReceived = true;
    });
    mobileRoom.send("ping");
    await new Promise(r => setTimeout(r, 200));
    assert.strictEqual(pongReceived, true, "Client must receive pong heartbeat response");
    console.log("  ✔ Heartbeat ping/pong verified!");

    // ── TEST 7: Mobile Reconnection with reconnectionToken (4G tower switch simulation) ──
    console.log("▶ [Test 7] Simulating mobile 4G network drop & token reconnection...");
    const initialSessionId = mobileRoom.sessionId;
    const token = mobileRoom.reconnectionToken;
    assert.ok(token, "reconnectionToken must be available");
    console.log("  * Mobile reconnection token:", token);

    // Give player a score to ensure state preservation
    hostRoom.state.players.get(initialSessionId)!.score = 15;

    // Simulate unexpected socket close (e.g. cellular tower switch)
    (mobileRoom as any).connection.transport.close();
    await new Promise(r => setTimeout(r, 400));

    // Player should be marked disconnected on host's state
    const pRecord = hostRoom.state.players.get(initialSessionId);
    assert.strictEqual(pRecord?.connected, false, "Player must be marked connected: false during drop");
    console.log("  * Player temporarily disconnected on server state. Score preserved:", pRecord?.score);

    // Reconnect using client.reconnect(token)
    console.log("  * Mobile device reconnecting using token...");
    const reconnectedRoom = await mobileClient.reconnect<GameState>(token);
    await new Promise(r => setTimeout(r, 100));

    assert.strictEqual(reconnectedRoom.sessionId, initialSessionId, "Session ID must be preserved after reconnect");
    const myPlayer = reconnectedRoom.state.players.get(initialSessionId);
    assert.strictEqual(myPlayer?.connected, true, "My player must be marked connected: true after reconnect");

    const hostViewPlayer = hostRoom.state.players.get(initialSessionId);
    assert.strictEqual(hostViewPlayer?.connected, true, "Host view must show player connected: true after reconnect");
    assert.strictEqual(hostViewPlayer?.score, 15, "Player score must be completely intact after reconnect");
    console.log("  ✔ Mobile reconnection completely seamless! Score & sessionId intact.");

    // Clean up
    await hostRoom.leave();
    await reconnectedRoom.leave();

    console.log("==================================================");
    console.log("🎉 ALL CROSS-NETWORK SIMULATION TESTS PASSED 100%!");
    console.log("==================================================");
  } finally {
    await gameServer.gracefullyShutdown(false);
  }
}

testCrossNetworkSimulation().catch((err) => {
  console.error("❌ Simulation Test Failed:", err);
  process.exit(1);
});
