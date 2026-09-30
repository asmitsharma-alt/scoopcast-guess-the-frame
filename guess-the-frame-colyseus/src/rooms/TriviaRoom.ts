import { Room, Client } from "colyseus";
import { GameState, Player, RoundWinner, ChatMessage } from "./schema/GameState";
import { CATALOG, CatalogItem } from "../data/catalog";
import { FuzzyMatcher } from "../utils/fuzzyMatcher";
import { HintGenerator } from "../utils/hintGenerator";
import { GAME_CONFIG } from "../config/gameConfig";
import { FrameEngine } from "../engine/FrameEngine";
import { GameDatabase, UserFrameHistoryRecord } from "../database/GameDatabase";

export interface CreateRoomOptions {
  roomCode?: string;
  category?: 'all' | 'frames' | 'dialogue' | 'eyes';
  mode?: string; // "Popcorn" | "Cinephile" | "Director's Cut"
  sections?: string[]; // ["frame", "dialogue", "eyes"]
  rounds?: number;
  roundsByMode?: { frame?: number; dialogue?: number; eyes?: number; frames?: number };
  timer?: number;
  userId?: string;
  name?: string;
  avatar?: string;
}

export class TriviaRoom extends Room<GameState> {
  maxClients = GAME_CONFIG.maxPlayers;

  private currentPlaylist: CatalogItem[] = [];
  private currentPlaylistIndex: number = -1;
  private currentSecretAnswer: string = "";
  private currentSecretItem: CatalogItem | null = null;
  private roundTimerDuration: number = GAME_CONFIG.defaultTimerDuration;
  private autoAdvanceTimer: any = null;
  private gameSeed: string = "";
  private roundStartTime: number = 0;
  private playerGuessTimes: Map<string, number> = new Map();
  private playerCorrectCount: Map<string, number> = new Map();

  onCreate(options: CreateRoomOptions) {
    this.setState(new GameState());

    // 4-letter alphanumeric room code
    const code = (options.roomCode || this.generateRoomCode()).toUpperCase().trim();
    this.state.roomCode = code;
    this.roomId = code; // Joinable via room code
    this.gameSeed = `${code}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

    // Set matchmaker metadata so /api/room/:code and queries find this room immediately
    this.setMetadata({
      roomCode: code,
      phase: "lobby",
      playerCount: 0
    });

    if (options.timer && options.timer >= 10 && options.timer <= 120) {
      this.roundTimerDuration = options.timer;
    }

    // AAA Game Settings & Permanent Lock
    const mode = options.mode || "Cinephile";
    this.state.gameSettings.mode = mode;
    this.state.gameSettings.sections.clear();
    const rawSections = options.sections && options.sections.length > 0 ? options.sections : ['frame'];
    rawSections.forEach(s => this.state.gameSettings.sections.push(s));

    const rbm = options.roundsByMode || {};
    this.state.gameSettings.frameRounds = Number(rbm.frame !== undefined ? rbm.frame : (rbm.frames !== undefined ? rbm.frames : 7));
    this.state.gameSettings.dialogueRounds = Number(rbm.dialogue !== undefined ? rbm.dialogue : 5);
    this.state.gameSettings.eyesRounds = Number(rbm.eyes !== undefined ? rbm.eyes : 0);

    let totalRounds = options.rounds || (this.state.gameSettings.frameRounds + this.state.gameSettings.dialogueRounds + this.state.gameSettings.eyesRounds);
    totalRounds = Math.max(3, Math.min(30, totalRounds));
    this.state.gameSettings.totalRounds = totalRounds;
    this.state.totalRounds = totalRounds;
    this.state.gameSettings.isLocked = true;
    this.state.settingsLocked = true;

    // Persist Game Configuration in Database
    try {
      GameDatabase.getInstance().saveGameConfiguration({
        roomId: code,
        hostId: options.userId || "pending_host",
        mode: mode,
        sections: rawSections,
        roundSettings: {
          frameRounds: this.state.gameSettings.frameRounds,
          dialogueRounds: this.state.gameSettings.dialogueRounds,
          eyesRounds: this.state.gameSettings.eyesRounds,
          totalRounds: totalRounds
        },
        createdAt: Date.now()
      });
    } catch (e) {
      console.warn("[TriviaRoom] Could not save game config to database:", e);
    }

    this.setupMessageHandlers();

    // 1-second authoritative simulation tick
    this.setSimulationInterval(() => this.updateTick(), 1000);
  }

  onAuth(client: Client, options: any) {
    if (options && options.roomCode) {
      const code = String(options.roomCode).toUpperCase().trim();
      if (this.state.roomCode && code !== this.state.roomCode) {
        throw new Error(`Invalid room code. Expected ${this.state.roomCode}, received ${code}`);
      }
    }
    if (this.state.players.size >= this.maxClients) {
      throw new Error(`Room is full (${this.maxClients} players maximum).`);
    }
    return true;
  }

  onJoin(client: Client, options: { name?: string; avatar?: string; userId?: string }) {
    const isFirst = this.state.players.size === 0;

    const player = new Player();
    player.id = client.sessionId;
    player.userId = (options.userId || client.sessionId).trim();
    player.name = (options.name || `Player ${this.state.players.size + 1}`).trim().slice(0, 18);
    player.avatar = this.validateAvatar(options.avatar);
    player.isHost = isFirst;
    player.connected = true;
    player.assetProgress = 0;
    player.isReady = false;
    player.assetStatus = "waiting";

    this.state.players.set(client.sessionId, player);

    if (isFirst) {
      this.state.currentHostId = client.sessionId;
    }

    try {
      GameDatabase.getInstance().saveOrUpdatePlayerSession({
        playerId: player.id,
        roomId: this.state.roomCode,
        username: player.name,
        avatarId: player.avatar,
        assetStatus: player.assetStatus,
        readyStatus: player.isReady
      });
    } catch(e) {}

    this.setMetadata({
      roomCode: this.state.roomCode,
      phase: this.state.phase,
      playerCount: this.state.players.size
    });

    this.addSystemChatMessage(`👋 ${player.name} joined the game`);
  }

  async onLeave(client: Client, consented: boolean) {
    const player = this.state.players.get(client.sessionId);
    if (!player) return;

    player.connected = false;

    // Fast Host Migration: if leaving player was host, migrate host immediately so room is never frozen!
    const wasHost = player.isHost;
    if (wasHost && this.state.players.size > 1) {
      player.isHost = false;
      this.migrateHost();
    }

    try {
      if (consented) {
        throw new Error("consented leave");
      }
      // Unconsented disconnects (network blip, refresh) get 15s to reconnect
      await this.allowReconnection(client, 15);
      player.connected = true;
      this.addSystemChatMessage(`🔄 ${player.name} reconnected!`);
    } catch (e) {
      this.state.players.delete(client.sessionId);
      this.addSystemChatMessage(`🚪 ${player.name} left the game`);

      // If host wasn't migrated yet (e.g. was only player earlier or edge condition)
      if (wasHost && this.state.players.size > 0 && !Array.from(this.state.players.values()).some(p => p.isHost)) {
        this.migrateHost();
      }

      // Check if all remaining players have guessed
      if (this.state.phase === "playing") {
        this.checkRoundCompletion();
      }
    } finally {
      this.setMetadata({
        roomCode: this.state.roomCode,
        phase: this.state.phase,
        playerCount: this.state.players.size
      });
    }
  }

  onDispose() {
    if (this.autoAdvanceTimer) {
      clearTimeout(this.autoAdvanceTimer);
    }
  }

  private setupMessageHandlers() {
    // ── Application-level Heartbeat / Keep-Alive ──
    this.onMessage("ping", (client) => {
      client.send("pong", { timestamp: Date.now() });
    });

    // ── Explicit Fast Host Leave ──
    this.onMessage("host_leaving", (client) => {
      const player = this.state.players.get(client.sessionId);
      if (player && player.isHost && this.state.players.size > 1) {
        player.isHost = false;
        this.migrateHost();
      }
    });

    // ── Asset Preloading Progress Updates ──
    this.onMessage("asset_progress", (client, message?: { progress: number; status?: string }) => {
      const player = this.state.players.get(client.sessionId);
      if (!player) return;

      const progress = Math.min(100, Math.max(0, Math.round(Number(message?.progress) || 0)));
      player.assetProgress = progress;
      player.assetStatus = String(message?.status || (progress >= 100 ? 'ready' : 'downloading'));
      if (progress >= 100) {
        player.isReady = true;
        player.assetStatus = 'ready';
      }

      try {
        GameDatabase.getInstance().saveOrUpdatePlayerSession({
          playerId: player.id,
          roomId: this.state.roomCode,
          username: player.name,
          avatarId: player.avatar,
          assetStatus: player.assetStatus,
          readyStatus: player.isReady
        });
      } catch(e) {}

      this.broadcast("player_asset_update", {
        playerId: player.id,
        name: player.name,
        progress: player.assetProgress,
        status: player.assetStatus,
        isReady: player.isReady
      });
    });

    // ── Explicit Player Ready ──
    this.onMessage("player_ready", (client, message?: { ready?: boolean }) => {
      const player = this.state.players.get(client.sessionId);
      if (!player) return;

      player.isReady = message?.ready !== undefined ? Boolean(message.ready) : true;
      if (player.isReady) {
        player.assetProgress = 100;
        player.assetStatus = 'ready';
      }

      try {
        GameDatabase.getInstance().saveOrUpdatePlayerSession({
          playerId: player.id,
          roomId: this.state.roomCode,
          username: player.name,
          avatarId: player.avatar,
          assetStatus: player.assetStatus,
          readyStatus: player.isReady
        });
      } catch(e) {}

      this.broadcast("player_asset_update", {
        playerId: player.id,
        name: player.name,
        progress: player.assetProgress,
        status: player.assetStatus,
        isReady: player.isReady
      });
    });

    // ── Host starts the game ──
    this.onMessage("start_game", (client, message?: { category?: string; rounds?: number; timer?: number; weeklyOnly?: boolean; roundsByMode?: { frames?: number; eyes?: number; dialogue?: number } }) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !player.isHost) return;
      if (this.state.phase !== "lobby" && this.state.phase !== "game_over") return;

      // AAA Host Start Validation: ALL connected players must be ready!
      const unreadyPlayers: Array<{ name: string; progress: number; status: string }> = [];
      this.state.players.forEach((p) => {
        if (p.connected && !p.isReady) {
          unreadyPlayers.push({
            name: p.name,
            progress: p.assetProgress || 0,
            status: p.assetStatus || 'downloading'
          });
        }
      });

      if (unreadyPlayers.length > 0) {
        client.send("start_error", {
          message: "Waiting for players to finish loading assets",
          unreadyPlayers
        });
        return;
      }

      const category = message?.category || 'all';
      const requestedRounds = Number(message?.rounds) || GAME_CONFIG.defaultRounds;
      const weeklyOnly = message?.weeklyOnly !== undefined ? Boolean(message.weeklyOnly) : true;
      if (message?.timer) {
        this.roundTimerDuration = Math.max(10, Math.min(120, Number(message.timer)));
      }

      // Generate a fresh random game seed for this match
      this.gameSeed = `${this.state.roomCode}_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

      this.buildPlaylist(category, requestedRounds, weeklyOnly, message?.roundsByMode);
      if (this.currentPlaylist.length === 0) return;

      this.state.totalRounds = this.currentPlaylist.length;

      // Reset player scores & round status
      this.state.players.forEach((p) => {
        p.score = 0;
        p.hasGuessedCorrectly = false;
        p.hasUsedHint = false;
      });

      this.state.phase = "countdown";
      this.state.timeRemaining = 3;
      this.setMetadata({ roomCode: this.state.roomCode, phase: "countdown", playerCount: this.state.players.size });

      const countdownInterval = this.clock.setInterval(() => {
        this.state.timeRemaining--;
        if (this.state.timeRemaining <= 0) {
          countdownInterval.clear();
          this.startRound(0);
        }
      }, 1000);
    });

    // ── Update settings in lobby ──
    this.onMessage("update_settings", (client, message?: {
      category?: string;
      categories?: string[];
      roundsByMode?: { frames?: number; eyes?: number; dialogue?: number };
      rounds?: number;
      timer?: number;
      weeklyOnly?: boolean;
    }) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !player.isHost) return;
      if (this.state.phase !== "lobby") return;

      // Enforce permanent lock on game settings after lobby creation
      if (this.state.settingsLocked) {
        client.send("settings_error", {
          message: "Settings cannot be changed after lobby creation."
        });
        return;
      }

      if (message?.timer) {
        this.roundTimerDuration = Math.max(10, Math.min(120, Number(message.timer)));
        this.state.timeRemaining = this.roundTimerDuration;
      }
      this.broadcast("settings_updated", {
        hostSettings: message,
        timer: this.roundTimerDuration
      });
    });

    // ── Update player profile (name / avatar) ──
    this.onMessage("update_profile", (client, message?: { name?: string; avatar?: string }) => {
      const player = this.state.players.get(client.sessionId);
      if (!player) return;
      if (message?.name) player.name = String(message.name).trim().slice(0, 18);
      if (message?.avatar) player.avatar = this.validateAvatar(message.avatar);
    });

    // ── Host kicks player ──
    this.onMessage("kick_player", (client, message?: { targetPlayerId: string }) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !player.isHost) return;
      if (!message?.targetPlayerId || message.targetPlayerId === client.sessionId) return;

      const targetClient = this.clients.find(c => c.sessionId === message.targetPlayerId);
      if (targetClient) {
        targetClient.send("kicked", { message: "You were kicked by the host." });
        targetClient.leave();
      }
    });

    // ── Host ends match early ──
    this.onMessage("host_end_game", (client) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !player.isHost) return;
      if (this.state.phase === "game_over") return;

      if (this.autoAdvanceTimer) {
        clearTimeout(this.autoAdvanceTimer);
        this.autoAdvanceTimer = null;
      }
      this.state.phase = "game_over";
      this.setMetadata({ roomCode: this.state.roomCode, phase: "game_over", playerCount: this.state.players.size });
      this.addSystemChatMessage("🏁 Match ended early by Host.");
    });

    // ── Rematch / return to lobby ──
    this.onMessage("rematch", (client) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !player.isHost) return;

      if (this.autoAdvanceTimer) {
        clearTimeout(this.autoAdvanceTimer);
        this.autoAdvanceTimer = null;
      }
      this.state.phase = "lobby";
      this.state.currentRound = 0;
      this.state.revealedAnswer = "";
      this.state.revealedContent = "";
      this.state.currentRoundWinners.clear();
      this.state.players.forEach(p => {
        p.score = 0;
        p.hasGuessedCorrectly = false;
        p.hasUsedHint = false;
        p.streak = 0;
      });
      this.setMetadata({ roomCode: this.state.roomCode, phase: "lobby", playerCount: this.state.players.size });
      this.broadcast("return_to_lobby", {});
    });

    // ── Player submits a guess ──
    this.onMessage("submit_guess", (client, message: { text: string }) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !player.connected) return;
      if (this.state.phase !== "playing" || player.hasGuessedCorrectly) return;

      const guessText = String(message?.text || '').trim();
      if (!guessText) return;

      const isMatch = FuzzyMatcher.isMatch(guessText, this.currentSecretAnswer);

      if (isMatch) {
        this.awardCorrectGuess(client, player);
      } else {
        client.send("guess_result", {
          isCorrect: false
        });
      }
    });

    // ── Player requests a hint (-2 points penalty) ──
    this.onMessage("request_hint", (client) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !player.connected) return;
      if (this.state.phase !== "playing" || player.hasGuessedCorrectly || player.hasUsedHint) return;

      player.hasUsedHint = true;
      player.score = Math.max(0, player.score - GAME_CONFIG.scoring.hintCost);

      let hintText = "";
      if (this.currentSecretItem && (this.currentSecretItem.type === "dialogue" || this.currentSecretItem.category === "dialogue")) {
        const char = this.currentSecretItem.character;
        const act = this.currentSecretItem.actor;
        if (char && act) {
          hintText = `Character / Actor: ${char} (${act})`;
        } else if (char) {
          hintText = `Character: ${char}`;
        } else if (act) {
          hintText = `Actor: ${act}`;
        } else {
          hintText = HintGenerator.generateMaskedHint(this.currentSecretAnswer);
        }
      } else {
        hintText = HintGenerator.generateMaskedHint(this.currentSecretAnswer);
      }

      // Sent privately ONLY to this client
      client.send("hint_response", {
        maskedHint: hintText,
        pointsDeducted: GAME_CONFIG.scoring.hintCost
      });

      this.addSystemChatMessage(`💡 <em>${player.name}</em> unlocked a private hint (-${GAME_CONFIG.scoring.hintCost} pts)`);
    });

    // ── Host actions: Skip Round ──
    this.onMessage("skip_round", (client) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !player.isHost) return;
      if (this.state.phase !== "playing") return;

      this.addSystemChatMessage(`⏭ Host skipped the frame`);
      this.finishRound();
    });

    // ── Host actions: Pause / Resume ──
    this.onMessage("pause_game", (client) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !player.isHost) return;
      if (this.state.phase !== "playing") return;

      this.state.isPaused = !this.state.isPaused;
      this.addSystemChatMessage(this.state.isPaused ? `⏸ Host paused the game` : `▶ Host resumed the game`);
    });

    // ── Host actions: Advance to Next Round early ──
    this.onMessage("next_round", (client) => {
      const player = this.state.players.get(client.sessionId);
      const isHost = (player && player.isHost) || this.state.currentHostId === client.sessionId;
      if (!isHost) return;

      if (this.autoAdvanceTimer) {
        clearTimeout(this.autoAdvanceTimer);
        this.autoAdvanceTimer = null;
      }

      if (this.state.phase === "round_reveal" || this.state.phase === "tie_breaker") {
        this.advanceNext();
      }
    });

    // ── Chat messaging with Anti-Spoiler Shield ──
    this.onMessage("send_chat", (client, message: { text: string }) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !player.connected) return;

      const rawText = String(message?.text || '').trim();
      if (!rawText || rawText.length > 200) return;

      // During a round, check if the chat message is actually a correct answer
      if (this.state.phase === "playing" && this.currentSecretAnswer) {
        // If player hasn't guessed yet and this is a valid answer, auto-accept it
        if (!player.hasGuessedCorrectly && FuzzyMatcher.isMatch(rawText, this.currentSecretAnswer)) {
          this.awardCorrectGuess(client, player);
          return;
        }
        // Otherwise, if it contains spoiler content, block it
        if (FuzzyMatcher.isAnswerOrSpoiler(rawText, this.currentSecretAnswer)) {
          client.send("chat_warning", {
            message: "⚠️ Your message was blocked to protect players from spoilers!"
          });
          return;
        }
      }

      const chat = new ChatMessage();
      chat.id = Math.random().toString(36).substr(2, 9);
      chat.senderId = player.id;
      chat.senderName = player.name;
      chat.senderAvatar = player.avatar;
      chat.text = rawText;
      chat.timestamp = Date.now();
      chat.isSystem = false;

      this.state.chatMessages.push(chat);
      if (this.state.chatMessages.length > 60) {
        this.state.chatMessages.shift();
      }
    });
  }

  /** Shared helper: award points, streaks, and notify the client for a correct guess. */
  private awardCorrectGuess(client: any, player: any) {
    player.hasGuessedCorrectly = true;
    const guessSeconds = Math.max(0.1, Number(((Date.now() - this.roundStartTime) / 1000).toFixed(2)));
    this.playerGuessTimes.set(player.id, guessSeconds);
    const prevCorrect = this.playerCorrectCount.get(player.id) || 0;
    this.playerCorrectCount.set(player.id, prevCorrect + 1);

    const pos = this.state.currentRoundWinners.length + 1;
    let basePoints = 0;
    if (pos === 1) basePoints = GAME_CONFIG.scoring.firstPlace;
    else if (pos === 2) basePoints = GAME_CONFIG.scoring.secondPlace;
    else if (pos === 3) basePoints = GAME_CONFIG.scoring.thirdPlace;

    // Streak multiplier: 2 in a row = 1.5x, 3+ in a row = 2.0x!
    player.streak = (player.streak || 0) + 1;
    let multiplier = 1.0;
    if (player.streak >= 3) multiplier = 2.0;
    else if (player.streak === 2) multiplier = 1.5;

    const points = Math.round(basePoints * multiplier);
    player.score += points;

    const winner = new RoundWinner();
    winner.playerId = player.id;
    winner.playerName = player.name;
    winner.avatar = player.avatar;
    winner.position = pos;
    winner.points = points;
    winner.streak = player.streak;
    this.state.currentRoundWinners.push(winner);

    // Notify client of success
    client.send("guess_result", {
      isCorrect: true,
      points: points,
      position: pos,
      streak: player.streak,
      multiplier
    });

    // Dedicated round winner banner is handled authoritatively by state.currentRoundWinners.onAdd
    this.checkRoundCompletion();
  }

  private updateTick() {
    if (this.state.phase === "playing" && !this.state.isPaused) {
      this.state.timeRemaining--;
      if (this.state.timeRemaining <= 0) {
        this.finishRound();
      }
    }
  }

  private startRound(index: number) {
    if (index >= this.currentPlaylist.length) {
      this.checkForTieBreakerOrGameOver();
      return;
    }

    this.roundStartTime = Date.now();
    this.playerGuessTimes.clear();

    this.currentPlaylistIndex = index;
    const item = this.currentPlaylist[index];
    this.currentSecretItem = item;
    this.currentSecretAnswer = item.answer;

    // Reset player round flags
    this.state.players.forEach((p) => {
      p.hasGuessedCorrectly = false;
      p.hasUsedHint = false;
    });

    this.state.currentRoundWinners.clear();
    this.state.revealedAnswer = "";
    this.state.revealedContent = "";
    this.state.currentMediaType = item.type;
    this.state.currentMediaContent = item.content;
    this.state.currentYear = item.year || "";
    this.state.currentRound = index + 1;
    this.state.timeRemaining = this.roundTimerDuration;
    this.state.isPaused = false;
    this.state.phase = "playing";
    this.setMetadata({ roomCode: this.state.roomCode, phase: "playing", playerCount: this.state.players.size });
  }

  private finishRound() {
    this.state.phase = "round_reveal";
    this.state.revealedAnswer = this.currentSecretItem?.displayAnswer || this.currentSecretAnswer;
    this.setMetadata({ roomCode: this.state.roomCode, phase: "round_reveal", playerCount: this.state.players.size });

    if (this.currentSecretItem && this.currentSecretItem.type === "eye") {
      this.state.revealedContent = this.currentSecretItem.revealContent || "";
    }

    // Reset streaks for players who did not guess correctly in this round
    this.state.players.forEach((p) => {
      if (!p.hasGuessedCorrectly) {
        p.streak = 0;
      }
    });

    // ── Permanently Record Shown Frame in Database for All Players ──
    try {
      const records: UserFrameHistoryRecord[] = [];
      const now = Date.now();
      const frameId = this.currentSecretItem?.id || `frame_${this.state.currentRound}`;
      const title = (this.currentSecretItem?.answer || 'unknown').toLowerCase();
      const movieId = `${title.replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, '-').trim()}-${this.currentSecretItem?.year || '2020'}`;

      this.state.players.forEach((player) => {
        const uid = player.userId || player.id;
        const guessTime = this.playerGuessTimes.get(player.id) || this.roundTimerDuration;
        records.push({
          userId: uid,
          frameId,
          movieId,
          gameId: this.roomId,
          seenAt: now,
          correctAnswer: player.hasGuessedCorrectly,
          guessTime
        });
      });

      GameDatabase.getInstance().recordRoundHistory(records);
    } catch (err) {
      console.error("[TriviaRoom] Failed to persist user frame history:", err);
    }

    // Safety auto-advance timer (20 seconds)
    if (this.autoAdvanceTimer) clearTimeout(this.autoAdvanceTimer);
    this.autoAdvanceTimer = setTimeout(() => {
      if (this.state.phase === "round_reveal") {
        this.advanceNext();
      }
    }, GAME_CONFIG.autoAdvanceDuration * 1000);
  }

  private advanceNext() {
    if (this.autoAdvanceTimer) {
      clearTimeout(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
    if (this.currentPlaylistIndex + 1 < this.currentPlaylist.length) {
      this.startRound(this.currentPlaylistIndex + 1);
    } else {
      this.checkForTieBreakerOrGameOver();
    }
  }

  private checkRoundCompletion() {
    const connectedPlayers = Array.from(this.state.players.values()).filter(p => p.connected);
    const correctCount = this.state.currentRoundWinners.length;

    // Advance if top 3 positions filled or all players have guessed
    if (correctCount >= 3 || (connectedPlayers.length > 0 && correctCount >= connectedPlayers.length)) {
      this.finishRound();
    }
  }

  private checkForTieBreakerOrGameOver() {
    // Determine top score
    let highestScore = 0;
    this.state.players.forEach((p) => {
      if (p.score > highestScore) highestScore = p.score;
    });

    const topPlayers = Array.from(this.state.players.values()).filter(p => p.score === highestScore && highestScore > 0);

    // If top 2+ players are tied, trigger Tie Breaker
    if (topPlayers.length > 1 && this.state.phase !== "tie_breaker") {
      const tieBreakers = CATALOG.filter(c => c.category === 'tie_breaker');
      if (tieBreakers.length > 0) {
        const tbItem = tieBreakers[Math.floor(Math.random() * tieBreakers.length)];
        this.currentSecretItem = tbItem;
        this.currentSecretAnswer = tbItem.answer;

        this.state.players.forEach(p => {
          p.hasGuessedCorrectly = false;
          p.hasUsedHint = false;
        });

        this.state.currentRoundWinners.clear();
        this.state.revealedAnswer = "";
        this.state.currentMediaType = tbItem.type;
        this.state.currentMediaContent = tbItem.content;
        this.state.currentYear = tbItem.year || "";
        this.state.timeRemaining = this.roundTimerDuration;
        this.state.phase = "tie_breaker";
        this.setMetadata({ roomCode: this.state.roomCode, phase: "tie_breaker", playerCount: this.state.players.size });

        this.addSystemChatMessage(`⚔️ TIE BREAKER! Scores are tied between: ${topPlayers.map(p => p.name).join(', ')}!`);
        return;
      }
    }

    this.state.phase = "game_over";
    this.setMetadata({ roomCode: this.state.roomCode, phase: "game_over", playerCount: this.state.players.size });
    this.addSystemChatMessage(`🏁 Game Over! Thanks for playing Scoopcast Guess The Frame!`);

    // Update persistent user statistics in SQLite
    try {
      const totalRoundsPlayed = this.state.currentRound;
      this.state.players.forEach((p) => {
        const uId = p.userId || p.id;
        const correct = this.playerCorrectCount.get(p.id) || 0;
        GameDatabase.getInstance().updateUserMatchStats(uId, totalRoundsPlayed, correct, 5);
      });
    } catch (err) {
      console.error("[TriviaRoom] Failed to update user match stats:", err);
    }
  }

  private migrateHost() {
    const nextPlayer = Array.from(this.state.players.values()).find(p => p.connected);
    if (nextPlayer) {
      nextPlayer.isHost = true;
      this.state.currentHostId = nextPlayer.id;
      this.addSystemChatMessage(`👑 <strong>${nextPlayer.name}</strong> is now the Host!`);
      this.broadcast("host_migrated", {
        hostId: nextPlayer.id,
        hostName: nextPlayer.name
      });
    }
  }

  private buildPlaylist(category: string, count: number, weeklyOnly: boolean = false, roundsByMode?: { frames?: number; eyes?: number; dialogue?: number }) {
    const playerIds = Array.from(this.state.players.values())
      .map(p => p.userId || p.id)
      .filter(Boolean);

    try {
      this.currentPlaylist = FrameEngine.getInstance().generatePlaylist({
        roomCode: this.state.roomCode,
        playerIds,
        rounds: count,
        category: category as any,
        weeklyOnly,
        roundsByMode,
        gameSeed: this.gameSeed,
        fullyRandom: true
      });
    } catch (err) {
      console.error("[TriviaRoom] FrameEngine recommendation error, falling back:", err);
    }

    // Safety fallback only if engine returned nothing
    if (!this.currentPlaylist || this.currentPlaylist.length === 0) {
      const fallbackPool = [...CATALOG].filter(c => category === 'all' || c.category === category);
      for (let i = fallbackPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = fallbackPool[i];
        fallbackPool[i] = fallbackPool[j];
        fallbackPool[j] = temp;
      }
      this.currentPlaylist = fallbackPool.slice(0, Math.min(count, fallbackPool.length));
    }
  }

  private addSystemChatMessage(htmlOrText: string) {
    const chat = new ChatMessage();
    chat.id = Math.random().toString(36).substr(2, 9);
    chat.senderId = "system";
    chat.senderName = "System";
    chat.text = htmlOrText;
    chat.timestamp = Date.now();
    chat.isSystem = true;
    this.state.chatMessages.push(chat);
    if (this.state.chatMessages.length > 60) {
      this.state.chatMessages.shift();
    }
  }

  private validateAvatar(avatar?: string): string {
    if (!avatar || typeof avatar !== "string") return "aman";
    const trimmed = avatar.trim();
    if (trimmed.length > 500) return trimmed.slice(0, 500);
    return trimmed || "aman";
  }

  private generateRoomCode(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}
