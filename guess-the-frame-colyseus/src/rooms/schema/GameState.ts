import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("string") id: string = "";
  @type("string") name: string = "Player";
  @type("string") avatar: string = "aman";
  @type("number") score: number = 0;
  @type("boolean") isHost: boolean = false;
  @type("boolean") hasGuessedCorrectly: boolean = false;
  @type("boolean") hasUsedHint: boolean = false;
  @type("boolean") connected: boolean = true;
}

export class RoundWinner extends Schema {
  @type("string") playerId: string = "";
  @type("string") playerName: string = "";
  @type("string") avatar: string = "aman";
  @type("number") position: number = 1; // 1 = 1st, 2 = 2nd, 3 = 3rd
  @type("number") points: number = 0;   // 10, 7, or 5
}

export class ChatMessage extends Schema {
  @type("string") id: string = "";
  @type("string") senderId: string = "";
  @type("string") senderName: string = "";
  @type("string") senderAvatar: string = "aman";
  @type("string") text: string = "";
  @type("number") timestamp: number = 0;
  @type("boolean") isSystem: boolean = false;
}

export class GameState extends Schema {
  @type("string") roomCode: string = "";
  @type("string") phase: string = "lobby"; // lobby | countdown | playing | round_reveal | tie_breaker | game_over
  @type("number") currentRound: number = 0;
  @type("number") totalRounds: number = 20;
  @type("number") timeRemaining: number = 30;
  @type("string") currentMediaType: string = "image"; // image | dialogue | eye
  @type("string") currentMediaContent: string = "";   // frame path or dialogue text
  @type("string") currentYear: string = "";
  @type("string") currentHostId: string = "";
  @type("boolean") isPaused: boolean = false;

  // Answer is kept completely blank during active play, only filled when round finishes!
  @type("string") revealedAnswer: string = "";
  @type("string") revealedContent: string = ""; // Full photo for eye mode

  @type({ map: Player }) players = new MapSchema<Player>();
  @type([RoundWinner]) currentRoundWinners = new ArraySchema<RoundWinner>();
  @type([ChatMessage]) chatMessages = new ArraySchema<ChatMessage>();
}
