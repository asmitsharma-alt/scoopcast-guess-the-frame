import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { Server, matchMaker } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { monitor } from "@colyseus/monitor";
import { TriviaRoom } from "./rooms/TriviaRoom";

dotenv.config();

const port = Number(process.env.PORT || 2567);
const app = express();

// Trust reverse proxies (Render, Cloudflare, etc.) for real client IPs and SSL
app.set("trust proxy", 1);

// Permissive CORS for cross-origin web/mobile clients
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));
app.options("*", cors());
app.use(express.json());

// ── Health & Uptime Endpoints ──
app.get("/health", async (req: Request, res: Response) => {
  try {
    const rooms = await matchMaker.query({ name: "trivia_room" });
    const totalClients = rooms.reduce((sum, r) => sum + (r.clients || 0), 0);
    res.status(200).json({
      status: "healthy",
      game: "Scoopcast: Guess The Frame",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      activeRooms: rooms.length,
      connectedClients: totalClients
    });
  } catch (err: any) {
    res.status(200).json({
      status: "healthy",
      game: "Scoopcast: Guess The Frame",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      warning: "Matchmaker warming up"
    });
  }
});

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong");
});

// ── Room Lookup & Validation APIs ──
// Used by clients to verify room existence, resolve roomId, and wake up Render
app.get("/api/room/:code", async (req: Request, res: Response) => {
  try {
    const rawCode = String(req.params.code || "").trim().toUpperCase();
    if (!rawCode || rawCode.length < 3) {
      return res.status(400).json({ exists: false, error: "Invalid room code format" });
    }

    const rooms = await matchMaker.query({ name: "trivia_room" });
    const match = rooms.find(r =>
      (r.roomId && r.roomId.toUpperCase() === rawCode) ||
      (r.metadata?.roomCode && String(r.metadata.roomCode).toUpperCase() === rawCode)
    );

    if (!match) {
      return res.status(404).json({
        exists: false,
        roomCode: rawCode,
        error: `Room "${rawCode}" not found. Verify the code with the host or check if the room was closed.`
      });
    }

    return res.status(200).json({
      exists: true,
      roomId: match.roomId,
      roomCode: match.metadata?.roomCode || match.roomId,
      clients: match.clients || 0,
      maxClients: match.maxClients || 16,
      phase: match.metadata?.phase || "lobby",
      locked: Boolean(match.locked),
      isFull: (match.clients || 0) >= (match.maxClients || 16)
    });
  } catch (err: any) {
    console.error("[API] Error in /api/room/:code:", err);
    return res.status(500).json({ exists: false, error: "Failed to query room state" });
  }
});

app.get("/api/rooms", async (req: Request, res: Response) => {
  try {
    const rooms = await matchMaker.query({ name: "trivia_room" });
    const list = rooms.map(r => ({
      roomId: r.roomId,
      roomCode: r.metadata?.roomCode || r.roomId,
      clients: r.clients,
      maxClients: r.maxClients,
      phase: r.metadata?.phase || "lobby",
      locked: r.locked,
      createdAt: r.createdAt
    }));
    res.status(200).json({ rooms: list });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to list rooms" });
  }
});

// ── Colyseus Monitor Dashboard ──
app.use("/colyseus", monitor());

// ── HTTP + Colyseus Server Initialization ──
const httpServer = http.createServer(app);

const gameServer = new Server({
  transport: new WebSocketTransport({
    server: httpServer,
    pingInterval: 10000, // 10s ping interval
    pingMaxRetries: 6    // 6 retries = 60s tolerance for cellular networks (4G/5G)
  })
});

// Register the main trivia room (joinable/matchable by roomCode)
gameServer.define("trivia_room", TriviaRoom).filterBy(["roomCode"]);

gameServer.listen(port, "0.0.0.0").then(() => {
  console.log(`🎬 [GTF-Server] Guess The Frame server running on port ${port} (0.0.0.0)`);
  console.log(`🔌 [GTF-Server] WebSocket endpoint ready on ws://0.0.0.0:${port}`);
  console.log(`📊 [GTF-Server] Colyseus Monitor accessible on http://localhost:${port}/colyseus`);
});

export { app, httpServer, gameServer };
