import { DatabaseSync, StatementSync } from "node:sqlite";
import * as path from "node:path";
import * as fs from "node:fs";
import { CATALOG, CatalogItem } from "../data/catalog";
import { MetadataEnricher, EnrichedFrameMetadata } from "../engine/metadataEnricher";

export interface UserFrameHistoryRecord {
  userId: string;
  frameId: string;
  movieId: string;
  gameId: string;
  seenAt: number;
  correctAnswer: boolean;
  guessTime: number;
}

export interface UserStats {
  userId: string;
  totalGames: number;
  totalFramesSeen: number;
  totalCorrect: number;
  preferredDifficulty: number;
  lastPlayedAt: number;
}

export class GameDatabase {
  private static instance: GameDatabase | null = null;
  private db: DatabaseSync;

  // Cached prepared statements for maximum throughput
  private stmtInsertHistory!: StatementSync;
  private stmtGetSeenFramesByUserIds!: StatementSync;
  private stmtGetSeenMoviesByUserIds!: StatementSync;
  private stmtUpsertCooldown!: StatementSync;
  private stmtGetRecentCooldowns!: StatementSync;
  private stmtUpsertFrame!: StatementSync;
  private stmtGetAllFrames!: StatementSync;
  private stmtGetFramesByCategory!: StatementSync;
  private stmtUpsertUserStats!: StatementSync;
  private stmtGetUserStats!: StatementSync;
  private stmtUpsertGameConfig!: StatementSync;
  private stmtUpsertPlayerSession!: StatementSync;
  private stmtGetGameConfig!: StatementSync;
  private stmtGetRoomPlayers!: StatementSync;
  private stmtSeenFrameByCount: Map<number, StatementSync> = new Map();
  private stmtSeenMovieByCount: Map<number, StatementSync> = new Map();

  public static getInstance(dbPath?: string): GameDatabase {
    if (!GameDatabase.instance) {
      GameDatabase.instance = new GameDatabase(dbPath);
    }
    return GameDatabase.instance;
  }

  constructor(customPath?: string) {
    const defaultDir = path.resolve(__dirname, "../../data");
    if (!fs.existsSync(defaultDir)) {
      try {
        fs.mkdirSync(defaultDir, { recursive: true });
      } catch (e) {}
    }

    const resolvedPath = customPath || process.env.DATABASE_PATH || path.join(defaultDir, "scoopcast_game.db");
    this.db = new DatabaseSync(resolvedPath);

    this.configurePragmas();
    this.createSchema();
    this.prepareStatements();
    this.seedCatalogIfEmpty();
  }

  private configurePragmas() {
    this.db.exec("PRAGMA journal_mode = WAL;");
    this.db.exec("PRAGMA synchronous = NORMAL;");
    this.db.exec("PRAGMA cache_size = -64000;"); // 64MB memory cache
    this.db.exec("PRAGMA temp_store = MEMORY;");
  }

  private createSchema() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS frames_metadata (
        frame_id TEXT PRIMARY KEY,
        movie_id TEXT NOT NULL,
        movie_title TEXT NOT NULL,
        content_url TEXT NOT NULL,
        category TEXT NOT NULL,
        type TEXT NOT NULL,
        year INTEGER NOT NULL,
        franchise TEXT NOT NULL,
        region TEXT NOT NULL,
        genre TEXT NOT NULL,
        lead_actor TEXT NOT NULL,
        difficulty INTEGER NOT NULL,
        quality_score REAL NOT NULL,
        discovery_value REAL NOT NULL,
        perceptual_hash TEXT NOT NULL,
        tag TEXT,
        aliases_json TEXT,
        dialogue TEXT,
        reveal_content TEXT,
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at INTEGER NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_frames_cat ON frames_metadata(category);
      CREATE INDEX IF NOT EXISTS idx_frames_diff ON frames_metadata(difficulty);
      CREATE INDEX IF NOT EXISTS idx_frames_franchise ON frames_metadata(franchise);
      CREATE INDEX IF NOT EXISTS idx_frames_region ON frames_metadata(region);
      CREATE INDEX IF NOT EXISTS idx_frames_active ON frames_metadata(is_active);

      CREATE TABLE IF NOT EXISTS user_frame_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        frame_id TEXT NOT NULL,
        movie_id TEXT NOT NULL,
        game_id TEXT NOT NULL,
        seen_at INTEGER NOT NULL,
        correct_answer INTEGER NOT NULL DEFAULT 0,
        guess_time REAL NOT NULL DEFAULT 0
      );

      CREATE INDEX IF NOT EXISTS idx_ufh_user_id ON user_frame_history(user_id);
      CREATE INDEX IF NOT EXISTS idx_ufh_user_frame ON user_frame_history(user_id, frame_id);
      CREATE INDEX IF NOT EXISTS idx_ufh_user_movie ON user_frame_history(user_id, movie_id);
      CREATE INDEX IF NOT EXISTS idx_ufh_user_seen ON user_frame_history(user_id, seen_at DESC);

      CREATE TABLE IF NOT EXISTS global_cooldowns (
        frame_id TEXT PRIMARY KEY,
        last_served_at INTEGER NOT NULL,
        serve_count INTEGER NOT NULL DEFAULT 1
      );

      CREATE INDEX IF NOT EXISTS idx_cooldown_time ON global_cooldowns(last_served_at DESC);

      CREATE TABLE IF NOT EXISTS user_stats (
        user_id TEXT PRIMARY KEY,
        total_games INTEGER NOT NULL DEFAULT 0,
        total_frames_seen INTEGER NOT NULL DEFAULT 0,
        total_correct INTEGER NOT NULL DEFAULT 0,
        preferred_difficulty INTEGER NOT NULL DEFAULT 5,
        last_played_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS game_configurations (
        room_id TEXT PRIMARY KEY,
        host_id TEXT NOT NULL,
        mode TEXT NOT NULL,
        sections TEXT NOT NULL,
        round_settings TEXT NOT NULL,
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS game_players (
        player_id TEXT NOT NULL,
        room_id TEXT NOT NULL,
        username TEXT NOT NULL,
        avatar_id TEXT NOT NULL,
        asset_status TEXT NOT NULL,
        ready_status INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        PRIMARY KEY (player_id, room_id)
      );
    `);
  }

  private prepareStatements() {
    this.stmtInsertHistory = this.db.prepare(`
      INSERT INTO user_frame_history (user_id, frame_id, movie_id, game_id, seen_at, correct_answer, guess_time)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    this.stmtUpsertCooldown = this.db.prepare(`
      INSERT INTO global_cooldowns (frame_id, last_served_at, serve_count)
      VALUES (?, ?, 1)
      ON CONFLICT(frame_id) DO UPDATE SET
        last_served_at = excluded.last_served_at,
        serve_count = serve_count + 1
    `);

    this.stmtGetRecentCooldowns = this.db.prepare(`
      SELECT frame_id, last_served_at, serve_count
      FROM global_cooldowns
      WHERE last_served_at >= ?
    `);

    this.stmtUpsertFrame = this.db.prepare(`
      INSERT INTO frames_metadata (
        frame_id, movie_id, movie_title, content_url, category, type, year,
        franchise, region, genre, lead_actor, difficulty, quality_score,
        discovery_value, perceptual_hash, tag, aliases_json, dialogue,
        reveal_content, is_active, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(frame_id) DO UPDATE SET
        content_url = excluded.content_url,
        category = excluded.category,
        type = excluded.type,
        year = excluded.year,
        tag = excluded.tag,
        aliases_json = excluded.aliases_json,
        dialogue = excluded.dialogue,
        reveal_content = excluded.reveal_content,
        is_active = excluded.is_active
    `);

    this.stmtGetAllFrames = this.db.prepare(`
      SELECT * FROM frames_metadata WHERE is_active = 1
    `);

    this.stmtGetFramesByCategory = this.db.prepare(`
      SELECT * FROM frames_metadata WHERE is_active = 1 AND category = ?
    `);

    this.stmtGetUserStats = this.db.prepare(`
      SELECT * FROM user_stats WHERE user_id = ?
    `);

    this.stmtUpsertUserStats = this.db.prepare(`
      INSERT INTO user_stats (user_id, total_games, total_frames_seen, total_correct, preferred_difficulty, last_played_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET
        total_games = total_games + excluded.total_games,
        total_frames_seen = total_frames_seen + excluded.total_frames_seen,
        total_correct = total_correct + excluded.total_correct,
        preferred_difficulty = excluded.preferred_difficulty,
        last_played_at = excluded.last_played_at
    `);

    this.stmtUpsertGameConfig = this.db.prepare(`
      INSERT INTO game_configurations (room_id, host_id, mode, sections, round_settings, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(room_id) DO UPDATE SET
        host_id = excluded.host_id,
        mode = excluded.mode,
        sections = excluded.sections,
        round_settings = excluded.round_settings
    `);

    this.stmtUpsertPlayerSession = this.db.prepare(`
      INSERT INTO game_players (player_id, room_id, username, avatar_id, asset_status, ready_status, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(player_id, room_id) DO UPDATE SET
        username = excluded.username,
        avatar_id = excluded.avatar_id,
        asset_status = excluded.asset_status,
        ready_status = excluded.ready_status,
        updated_at = excluded.updated_at
    `);

    this.stmtGetGameConfig = this.db.prepare(`
      SELECT * FROM game_configurations WHERE room_id = ?
    `);

    this.stmtGetRoomPlayers = this.db.prepare(`
      SELECT * FROM game_players WHERE room_id = ? ORDER BY updated_at ASC
    `);
  }

  public saveGameConfiguration(config: {
    roomId: string;
    hostId: string;
    mode: string;
    sections: string[];
    roundSettings: any;
    createdAt?: number;
  }): void {
    try {
      this.stmtUpsertGameConfig.run(
        config.roomId,
        config.hostId,
        config.mode,
        JSON.stringify(config.sections || []),
        JSON.stringify(config.roundSettings || {}),
        config.createdAt || Date.now()
      );
    } catch (e) {
      console.warn("[GameDatabase] Failed to save game config:", e);
    }
  }

  public saveOrUpdatePlayerSession(player: {
    playerId: string;
    roomId: string;
    username: string;
    avatarId: string;
    assetStatus: string;
    readyStatus: boolean;
  }): void {
    try {
      this.stmtUpsertPlayerSession.run(
        player.playerId,
        player.roomId,
        player.username,
        player.avatarId,
        player.assetStatus || "ready",
        player.readyStatus ? 1 : 0,
        Date.now()
      );
    } catch (e) {
      console.warn("[GameDatabase] Failed to save player session:", e);
    }
  }

  public getGameConfiguration(roomId: string): any {
    try {
      const row: any = this.stmtGetGameConfig.get(roomId);
      if (!row) return null;
      return {
        roomId: row.room_id,
        hostId: row.host_id,
        mode: row.mode,
        sections: JSON.parse(row.sections || "[]"),
        roundSettings: JSON.parse(row.round_settings || "{}"),
        createdAt: row.created_at
      };
    } catch (e) {
      return null;
    }
  }

  public getRoomPlayers(roomId: string): any[] {
    try {
      const rows: any = this.stmtGetRoomPlayers.all(roomId);
      return rows.map((r: any) => ({
        playerId: r.player_id,
        roomId: r.room_id,
        username: r.username,
        avatarId: r.avatar_id,
        assetStatus: r.asset_status,
        readyStatus: Boolean(r.ready_status)
      }));
    } catch (e) {
      return [];
    }
  }

  /**
   * Automatically initializes frame catalog metadata into SQLite database
   * on first run or when catalog updates.
   */
  public seedCatalogIfEmpty() {
    const countRow = this.db.prepare("SELECT COUNT(*) as count FROM frames_metadata").get() as any;
    const existingCount = Number(countRow?.count || 0);

    // If empty or catalog has more items, populate/upsert
    if (existingCount < CATALOG.length) {
      this.db.exec("BEGIN TRANSACTION;");
      try {
        const now = Date.now();
        for (const raw of CATALOG) {
          const enriched = MetadataEnricher.enrich(raw);
          this.stmtUpsertFrame.run(
            enriched.frameId,
            enriched.movieId,
            enriched.movieTitle,
            enriched.contentUrl,
            enriched.category,
            enriched.type,
            enriched.year,
            enriched.franchise,
            enriched.region,
            enriched.genre,
            enriched.leadActor,
            enriched.difficulty,
            enriched.qualityScore,
            enriched.discoveryValue,
            enriched.perceptualHash,
            enriched.tag || 'classic',
            enriched.aliases ? JSON.stringify(enriched.aliases) : null,
            enriched.dialogue || null,
            enriched.revealContent || null,
            1,
            now
          );
        }
        this.db.exec("COMMIT;");
      } catch (err) {
        this.db.exec("ROLLBACK;");
        console.error("[GameDatabase] Failed to seed catalog metadata:", err);
      }
    }
  }

  /**
   * Fetches seen frame IDs for all given user IDs.
   * Returns a Map of frameId -> count of room users who have seen it.
   */
  public getUserSeenFrameFrequencies(userIds: string[]): Map<string, number> {
    const validUsers = userIds.filter(id => Boolean(id && id.trim()));
    const result = new Map<string, number>();
    if (validUsers.length === 0) return result;

    let stmt = this.stmtSeenFrameByCount.get(validUsers.length);
    if (!stmt) {
      const placeholders = validUsers.map(() => '?').join(',');
      const query = `
        SELECT frame_id, COUNT(DISTINCT user_id) as user_count
        FROM user_frame_history
        WHERE user_id IN (${placeholders})
        GROUP BY frame_id
      `;
      stmt = this.db.prepare(query);
      this.stmtSeenFrameByCount.set(validUsers.length, stmt);
    }

    const rows = stmt.all(...validUsers) as Array<{ frame_id: string; user_count: number }>;
    for (const row of rows) {
      result.set(row.frame_id, Number(row.user_count));
    }
    return result;
  }

  /**
   * Fetches recently seen movies for all given user IDs within the specified time window.
   */
  public getUserSeenMovies(userIds: string[], windowMs: number = 7 * 86400 * 1000): Set<string> {
    const validUsers = userIds.filter(id => Boolean(id && id.trim()));
    const result = new Set<string>();
    if (validUsers.length === 0) return result;

    const cutoff = Date.now() - windowMs;
    let stmt = this.stmtSeenMovieByCount.get(validUsers.length);
    if (!stmt) {
      const placeholders = validUsers.map(() => '?').join(',');
      const query = `
        SELECT DISTINCT movie_id
        FROM user_frame_history
        WHERE user_id IN (${placeholders}) AND seen_at >= ?
      `;
      stmt = this.db.prepare(query);
      this.stmtSeenMovieByCount.set(validUsers.length, stmt);
    }

    const rows = stmt.all(...validUsers, cutoff) as Array<{ movie_id: string }>;
    for (const row of rows) {
      result.add(row.movie_id);
    }
    return result;
  }

  /**
   * Fetches global cooldown timestamps for recently served frames.
   */
  public getGlobalCooldowns(windowMs: number = 60 * 60 * 1000): Map<string, { lastServedAt: number; serveCount: number }> {
    const cutoff = Date.now() - windowMs;
    const rows = this.stmtGetRecentCooldowns.all(cutoff) as Array<{ frame_id: string; last_served_at: number; serve_count: number }>;
    const map = new Map<string, { lastServedAt: number; serveCount: number }>();
    for (const r of rows) {
      map.set(r.frame_id, {
        lastServedAt: Number(r.last_served_at),
        serveCount: Number(r.serve_count)
      });
    }
    return map;
  }

  /**
   * Records that a frame was served globally (for server-wide cooldowns).
   */
  public recordGlobalCooldown(frameId: string, timestamp: number = Date.now()) {
    this.stmtUpsertCooldown.run(frameId, timestamp);
  }

  /**
   * Saves a round's shown frame permanently into user history for all connected players.
   */
  public recordRoundHistory(records: UserFrameHistoryRecord[]) {
    if (!records || records.length === 0) return;
    this.db.exec("BEGIN TRANSACTION;");
    try {
      for (const rec of records) {
        this.stmtInsertHistory.run(
          rec.userId,
          rec.frameId,
          rec.movieId,
          rec.gameId,
          rec.seenAt,
          rec.correctAnswer ? 1 : 0,
          rec.guessTime
        );
      }
      this.db.exec("COMMIT;");
    } catch (e) {
      this.db.exec("ROLLBACK;");
      console.error("[GameDatabase] Failed to record round history:", e);
    }
  }

  /**
   * Updates user statistics after match completion.
   */
  public updateUserMatchStats(userId: string, framesSeen: number, correctCount: number, difficulty: number) {
    this.stmtUpsertUserStats.run(
      userId,
      1, // 1 game
      framesSeen,
      correctCount,
      difficulty,
      Date.now()
    );
  }

  /**
   * Fetches all active frames from database.
   */
  public getActiveFrames(category?: string): EnrichedFrameMetadata[] {
    const rows = (category && category !== 'all')
      ? (this.stmtGetFramesByCategory.all(category) as any[])
      : (this.stmtGetAllFrames.all() as any[]);

    return rows.map(r => ({
      frameId: r.frame_id,
      movieId: r.movie_id,
      movieTitle: r.movie_title,
      contentUrl: r.content_url,
      category: r.category,
      type: r.type,
      year: Number(r.year),
      franchise: r.franchise,
      region: r.region,
      genre: r.genre,
      leadActor: r.lead_actor,
      difficulty: Number(r.difficulty),
      qualityScore: Number(r.quality_score),
      discoveryValue: Number(r.discovery_value),
      perceptualHash: r.perceptual_hash,
      tag: r.tag,
      aliases: r.aliases_json ? JSON.parse(r.aliases_json) : undefined,
      dialogue: r.dialogue,
      revealContent: r.reveal_content
    }));
  }

  /**
   * Close database connection cleanly.
   */
  public close() {
    this.db.close();
  }
}
