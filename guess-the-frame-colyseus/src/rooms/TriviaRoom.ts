import { Room, Client } from "colyseus";
import { GameState, Player, RoundWinner, ChatMessage } from "./schema/GameState";
import { CATALOG, CatalogItem } from "../data/catalog";
import { FuzzyMatcher } from "../utils/fuzzyMatcher";
import { HintGenerator } from "../utils/hintGenerator";
import { GAME_CONFIG } from "../config/gameConfig";

export interface CreateRoomOptions {
  roomCode?: string;
  category?: 'all' | 'frames' | 'dialogue' | 'eyes';
  rounds?: number;
  timer?: number;
}

export class TriviaRoom extends Room<GameState> {
  maxClients = GAME_CONFIG.maxPlayers;

  private currentPlaylist: CatalogItem[] = [];
  private currentPlaylistIndex: number = -1;
  private currentSecretAnswer: string = "";
  private currentSecretItem: CatalogItem | null = null;
  private roundTimerDuration: number = GAME_CONFIG.defaultTimerDuration;
  private autoAdvanceTimer: any = null;

  onCreate(options: CreateRoomOptions) {
    this.setState(new GameState());

    // 4-letter alphanumeric room code
    const code = (options.roomCode || this.generateRoomCode()).toUpperCase().trim();
    this.state.roomCode = code;
    this.roomId = code; // Joinable via room code

    // Set matchmaker metadata so /api/room/:code and queries find this room immediately
    this.setMetadata({
      roomCode: code,
      phase: "lobby",
      playerCount: 0
    });

    if (options.timer && options.timer >= 10 && options.timer <= 120) {
      this.roundTimerDuration = options.timer;
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

  onJoin(client: Client, options: { name?: string; avatar?: string }) {
    const isFirst = this.state.players.size === 0;

    const player = new Player();
    player.id = client.sessionId;
    player.name = (options.name || `Player ${this.state.players.size + 1}`).trim().slice(0, 18);
    player.avatar = this.validateAvatar(options.avatar);
    player.isHost = isFirst;
    player.score = 0;
    player.connected = true;

    this.state.players.set(client.sessionId, player);

    if (isFirst) {
      this.state.currentHostId = client.sessionId;
    }

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

    try {
      if (consented) {
        throw new Error("consented leave");
      }
      // Allow 30s for mobile reconnections / page refreshes / cellular tower switches
      await this.allowReconnection(client, 30);
      player.connected = true;
      this.addSystemChatMessage(`🔄 ${player.name} reconnected!`);
    } catch (e) {
      this.state.players.delete(client.sessionId);
      this.addSystemChatMessage(`🚪 ${player.name} left the game`);

      // Host Migration
      if (player.isHost && this.state.players.size > 0) {
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

    // ── Host starts the game ──
    this.onMessage("start_game", (client, message?: { category?: string; rounds?: number; timer?: number; weeklyOnly?: boolean; roundsByMode?: { frames?: number; eyes?: number; dialogue?: number } }) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !player.isHost) return;
      if (this.state.phase !== "lobby" && this.state.phase !== "game_over") return;

      const category = message?.category || 'all';
      const requestedRounds = Number(message?.rounds) || GAME_CONFIG.defaultRounds;
      const weeklyOnly = message?.weeklyOnly !== undefined ? Boolean(message.weeklyOnly) : true;
      if (message?.timer) {
        this.roundTimerDuration = Math.max(10, Math.min(120, Number(message.timer)));
      }

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
        player.hasGuessedCorrectly = true;
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

        const medal = pos === 1 ? '🥇' : pos === 2 ? '🥈' : '🥉';
        const streakTag = player.streak >= 2 ? ` 🔥 ${player.streak}x STREAK (${multiplier}x pts)!` : '';
        this.addSystemChatMessage(`${medal} <strong>${player.name}</strong> guessed correctly! (+${points} pts)${streakTag}`);

        this.checkRoundCompletion();
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

      const masked = HintGenerator.generateMaskedHint(this.currentSecretAnswer);

      // Sent privately ONLY to this client
      client.send("hint_response", {
        maskedHint: masked,
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

      // Anti-Spoiler filter active during round
      if (this.state.phase === "playing" && this.currentSecretAnswer) {
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
    this.state.revealedAnswer = this.currentSecretAnswer;
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
  }

  private migrateHost() {
    const nextPlayer = Array.from(this.state.players.values()).find(p => p.connected);
    if (nextPlayer) {
      nextPlayer.isHost = true;
      this.state.currentHostId = nextPlayer.id;
      this.addSystemChatMessage(`👑 <strong>${nextPlayer.name}</strong> is now the Host!`);
    }
  }

  private buildPlaylist(category: string, count: number, weeklyOnly: boolean = false, roundsByMode?: { frames?: number; eyes?: number; dialogue?: number }) {
    if (roundsByMode && (roundsByMode.frames || roundsByMode.dialogue || roundsByMode.eyes)) {
      const fCount = Number(roundsByMode.frames) || 0;
      const dCount = Number(roundsByMode.dialogue) || 0;
      const eCount = Number(roundsByMode.eyes) || 0;
      const selectItems = (items: CatalogItem[], cnt: number) => {
        if (!Array.isArray(items) || cnt <= 0) return [];
        if (weeklyOnly) {
          const newItems = items.filter(i => i.tag === 'new').sort(() => 0.5 - Math.random());
          if (newItems.length >= cnt) return newItems.slice(0, cnt);
          const remaining = cnt - newItems.length;
          const classic = items.filter(i => i.tag !== 'new').sort(() => 0.5 - Math.random()).slice(0, remaining);
          return [...newItems, ...classic];
        }
        return [...items].sort(() => 0.5 - Math.random()).slice(0, cnt);
      };

      const frames = selectItems(CATALOG.filter(c => c.category === 'frames'), fCount);
      const dialogues = selectItems(CATALOG.filter(c => c.category === 'dialogue'), dCount);
      const eyes = selectItems(CATALOG.filter(c => c.category === 'eyes'), eCount);
      const combined = [...frames, ...dialogues, ...eyes];
      if (combined.length > 0) {
        this.currentPlaylist = combined;
        return;
      }
    }

    let pool: CatalogItem[] = [];
    if (category === 'frames') {
      pool = CATALOG.filter(c => c.category === 'frames');
    } else if (category === 'dialogue') {
      pool = CATALOG.filter(c => c.category === 'dialogue');
    } else if (category === 'eyes') {
      pool = CATALOG.filter(c => c.category === 'eyes');
    } else {
      // 'all' includes frames, dialogues, and eyes
      pool = CATALOG.filter(c => c.category !== 'tie_breaker');
    }

    if (weeklyOnly) {
      const weeklyItems = pool.filter(c => c.tag === 'new');
      if (weeklyItems.length > 0) {
        const shuffledWeekly = [...weeklyItems].sort(() => Math.random() - 0.5);
        if (shuffledWeekly.length >= count) {
          this.currentPlaylist = shuffledWeekly.slice(0, count);
          return;
        } else {
          // If fewer weekly items than requested count, use all weekly items,
          // then fill remaining slots with classic items so match doesn't fall short
          const remainingCount = count - shuffledWeekly.length;
          const classicPool = pool.filter(c => c.tag !== 'new').sort(() => Math.random() - 0.5);
          this.currentPlaylist = [...shuffledWeekly, ...classicPool.slice(0, remainingCount)];
          return;
        }
      }
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    this.currentPlaylist = shuffled.slice(0, Math.min(count, shuffled.length));
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
