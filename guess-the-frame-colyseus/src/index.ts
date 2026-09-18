import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { Server } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { monitor } from "@colyseus/monitor";
import { TriviaRoom } from "./rooms/TriviaRoom";

dotenv.config();

const port = Number(process.env.PORT || 2567);
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"]
}));
app.use(express.json());

// ── Health & Uptime Endpoints ──
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    game: "Scoopcast: Guess The Frame",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime())
  });
});

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong");
});

// ── Colyseus Monitor Dashboard ──
app.use("/colyseus", monitor());

// ── HTTP + Colyseus Server Initialization ──
const httpServer = http.createServer(app);

const gameServer = new Server({
  transport: new WebSocketTransport({
    server: httpServer,
    pingInterval: 5000,
    pingMaxRetries: 3
  })
});

// Register the main trivia room
gameServer.define("trivia_room", TriviaRoom);

gameServer.listen(port).then(() => {
  console.log(`🎬 [GTF-Server] Guess The Frame server running on http://localhost:${port}`);
  console.log(`🔌 [GTF-Server] WebSocket endpoint ready on ws://localhost:${port}`);
  console.log(`📊 [GTF-Server] Colyseus Monitor accessible on http://localhost:${port}/colyseus`);
});

export { app, httpServer, gameServer };

