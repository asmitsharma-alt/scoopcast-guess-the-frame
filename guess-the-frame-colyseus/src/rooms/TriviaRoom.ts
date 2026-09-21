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

    if (options.timer && options.timer >= 10 && options.timer <= 120) {
      this.roundTimerDuration = options.timer;
    }

    this.setupMessageHandlers();

    // 1-second authoritative simulation tick
    this.setSimulationInterval(() => this.updateTick(), 1000);
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

    this.addSystemChatMessage(`👋 ${player.name} joined the room!`);
  }

  async onLeave(client: Client, consented: boolean) {
    const player = this.state.players.get(client.sessionId);
    if (!player) return;

    player.connected = false;

    try {
      if (consented) {
        throw new Error("consented leave");
      }
      // Allow 20s for mobile reconnections / page refreshes
      await this.allowReconnection(client, 20);
      player.connected = true;
      this.addSystemChatMessage(`🔄 ${player.name} reconnected!`);
    } catch (e) {
      this.state.players.delete(client.sessionId);
      this.addSystemChatMessage(`🚪 ${player.name} left the room.`);

      // Host Migration
      if (player.isHost && this.state.players.size > 0) {
        this.migrateHost();
      }

      // Check if all remaining players have guessed
      if (this.state.phase === "playing") {
        this.checkRoundCompletion();
      }
    }
  }

  onDispose() {
    if (this.autoAdvanceTimer) {
      clearTimeout(this.autoAdvanceTimer);
    }
  }

  private setupMessageHandlers() {
    // ── Host starts the game ──
    this.onMessage("start_game", (client, message?: { category?: string; rounds?: number; timer?: number; weeklyOnly?: boolean }) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !player.isHost) return;
      if (this.state.phase !== "lobby" && this.state.phase !== "game_over") return;

      const category = message?.category || 'all';
      const requestedRounds = Number(message?.rounds) || GAME_CONFIG.defaultRounds;
      const weeklyOnly = message?.weeklyOnly !== undefined ? Boolean(message.weeklyOnly) : true;
      if (message?.timer) {
        this.roundTimerDuration = Math.max(10, Math.min(120, Number(message.timer)));
      }

      this.buildPlaylist(category, requestedRounds, weeklyOnly);
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

      const countdownInterval = this.clock.setInterval(() => {
        this.state.timeRemaining--;
        if (this.state.timeRemaining <= 0) {
          countdownInterval.clear();
          this.startRound(0);
        }
      }, 1000);
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
        let points = 0;
        if (pos === 1) points = GAME_CONFIG.scoring.firstPlace;
        else if (pos === 2) points = GAME_CONFIG.scoring.secondPlace;
        else if (pos === 3) points = GAME_CONFIG.scoring.thirdPlace;

        player.score += points;

        const winner = new RoundWinner();
        winner.playerId = player.id;
        winner.playerName = player.name;
        winner.avatar = player.avatar;
        winner.position = pos;
        winner.points = points;
        this.state.currentRoundWinners.push(winner);

        // Notify client of success
        client.send("guess_result", {
          isCorrect: true,
          points: points,
          position: pos
        });

        const medal = pos === 1 ? '🥇' : pos === 2 ? '🥈' : '🥉';
        this.addSystemChatMessage(`${medal} <strong>${player.name}</strong> guessed correctly! (+${points} pts)`);

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

      this.addSystemChatMessage(`⏭ Host skipped the round.`);
      this.finishRound();
    });

    // ── Host actions: Pause / Resume ──
    this.onMessage("pause_game", (client) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !player.isHost) return;
      if (this.state.phase !== "playing") return;

      this.state.isPaused = !this.state.isPaused;
      this.addSystemChatMessage(this.state.isPaused ? `⏸ Game paused by Host.` : `▶ Game resumed.`);
    });

    // ── Host actions: Advance to Next Round early ──
    this.onMessage("next_round", (client) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !player.isHost) return;
      if (this.state.phase !== "round_reveal") return;

      if (this.autoAdvanceTimer) {
        clearTimeout(this.autoAdvanceTimer);
        this.autoAdvanceTimer = null;
      }
      this.advanceNext();
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
  }

  private finishRound() {
    this.state.phase = "round_reveal";
    this.state.revealedAnswer = this.currentSecretAnswer;

    if (this.currentSecretItem && this.currentSecretItem.type === "eye") {
      this.state.revealedContent = this.currentSecretItem.revealContent || "";
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

        this.addSystemChatMessage(`⚔️ TIE BREAKER! Scores are tied between: ${topPlayers.map(p => p.name).join(', ')}!`);
        return;
      }
    }

    this.state.phase = "game_over";
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

  private buildPlaylist(category: string, count: number, weeklyOnly: boolean = false) {
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
    const valid = ['aman', 'amish', 'vish', 'aziz'];
    const clean = String(avatar || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return valid.includes(clean) ? clean : 'aman';
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
