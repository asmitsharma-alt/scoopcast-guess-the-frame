import { GameDatabase } from "../database/GameDatabase";
import { EnrichedFrameMetadata } from "./metadataEnricher";
import { PerceptualHash } from "../utils/perceptualHash";
import { CatalogItem } from "../data/catalog";

export interface PlaylistRequestOptions {
  roomCode: string;
  playerIds: string[];
  rounds?: number;
  category?: 'all' | 'frames' | 'dialogue' | 'eyes';
  weeklyOnly?: boolean;
  roundsByMode?: { frames?: number; eyes?: number; dialogue?: number };
  gameSeed?: string;
  preferredDifficulty?: number;
  ignoreCooldown?: boolean;
}

export class FrameEngine {
  private static instance: FrameEngine | null = null;
  private db: GameDatabase;

  // Cached frame catalog pool in memory for sub-millisecond selection
  private cachedFrames: EnrichedFrameMetadata[] = [];
  private lastPoolRefresh: number = 0;

  // In-memory global cooldown cache for ultra-fast concurrency (1,000+ rooms/sec)
  private memoryCooldowns: Map<string, number> = new Map();

  // Adaptive difficulty wave progression (1-10)
  public static readonly ADAPTIVE_DIFFICULTY_CURVE: number[] = [3, 5, 6, 8, 9, 6, 10];

  public static getInstance(db?: GameDatabase): FrameEngine {
    if (!FrameEngine.instance) {
      FrameEngine.instance = new FrameEngine(db || GameDatabase.getInstance());
    }
    return FrameEngine.instance;
  }

  constructor(db: GameDatabase) {
    this.db = db;
    this.refreshFramePool();
  }

  /**
   * Refreshes in-memory frame cache from persistent SQLite database.
   */
  public refreshFramePool() {
    this.cachedFrames = this.db.getActiveFrames();
    for (const f of this.cachedFrames) {
      (f as any).hashHigh = parseInt(f.perceptualHash.slice(0, 8), 16) || 0;
      (f as any).hashLow = parseInt(f.perceptualHash.slice(8, 16), 16) || 0;
    }
    this.lastPoolRefresh = Date.now();
  }

  /**
   * Main recommendation entry point. Generates an optimal, personalized playlist
   * tailored to the connected players in the room with zero repeats and strict diversity.
   */
  public generatePlaylist(options: PlaylistRequestOptions): CatalogItem[] {
    // If pool is empty or older than 10 minutes, refresh
    if (this.cachedFrames.length === 0 || Date.now() - this.lastPoolRefresh > 10 * 60 * 1000) {
      this.refreshFramePool();
    }

    const {
      roomCode,
      playerIds = [],
      rounds = 7,
      category = 'all',
      roundsByMode,
      gameSeed = `${roomCode}_${Date.now()}`,
      ignoreCooldown = false
    } = options;

    // 1. Fetch historical player intelligence from database
    const seenFrameFrequencies = this.db.getUserSeenFrameFrequencies(playerIds);
    const seenMovieIds = this.db.getUserSeenMovies(playerIds, 7 * 86400 * 1000);

    // Seeded PRNG for reproducible room generation
    const rng = this.createSeededRNG(gameSeed);

    // Multi-mode handling (frames + dialogue + eyes)
    if (roundsByMode && (roundsByMode.frames || roundsByMode.dialogue || roundsByMode.eyes)) {
      const fCount = Number(roundsByMode.frames) || 0;
      const dCount = Number(roundsByMode.dialogue) || 0;
      const eCount = Number(roundsByMode.eyes) || 0;

      const frames = this.selectScoredPlaylist(
        'frames',
        fCount,
        seenFrameFrequencies,
        seenMovieIds,
        rng,
        options.weeklyOnly,
        ignoreCooldown
      );
      const dialogues = this.selectScoredPlaylist(
        'dialogue',
        dCount,
        seenFrameFrequencies,
        seenMovieIds,
        rng,
        options.weeklyOnly,
        ignoreCooldown
      );
      const eyes = this.selectScoredPlaylist(
        'eyes',
        eCount,
        seenFrameFrequencies,
        seenMovieIds,
        rng,
        options.weeklyOnly,
        ignoreCooldown
      );

      const combined = [...frames, ...dialogues, ...eyes];
      return combined.map(f => this.toCatalogItem(f));
    }

    // Standard category playlist
    const selected = this.selectScoredPlaylist(
      category,
      rounds,
      seenFrameFrequencies,
      seenMovieIds,
      rng,
      options.weeklyOnly,
      ignoreCooldown
    );

    return selected.map(f => this.toCatalogItem(f));
  }

  /**
   * Core Recommendation Loop: Selects frames round-by-round by scoring
   * candidate frames against player histories, diversity rules, difficulty curve,
   * quality metrics, and visual similarity.
   */
  private selectScoredPlaylist(
    category: string,
    targetCount: number,
    seenFrameFrequencies: Map<string, number>,
    seenMovieIds: Set<string>,
    rng: () => number,
    weeklyOnly?: boolean,
    ignoreCooldown?: boolean
  ): EnrichedFrameMetadata[] {
    let pool = this.cachedFrames;
    if (category !== 'all') {
      pool = pool.filter(f => f.category === category);
    }
    if (weeklyOnly) {
      const weekly = pool.filter(f => f.tag === 'new');
      if (weekly.length >= targetCount) {
        pool = weekly;
      }
    }

    if (pool.length === 0) {
      return [];
    }

    const playlist: EnrichedFrameMetadata[] = [];
    const selectedMovieIds = new Set<string>();
    const selectedFranchises = new Set<string>();
    const selectedHashes: Array<{ high: number; low: number }> = [];
    const genreHistory: string[] = [];
    const regionCounts: Record<string, number> = { hollywood: 0, bollywood: 0, regional: 0, international: 0 };
    let lastLeadActor = '';

    const now = Date.now();

    for (let round = 0; round < targetCount; round++) {
      // Determine target difficulty for this round
      const targetDifficulty = this.getTargetDifficultyForRound(round);

      let bestScore = -Infinity;
      let bestCandidate: EnrichedFrameMetadata | null = null;

      // Evaluate each candidate in the pool
      for (const candidate of pool) {
        // Skip already selected frames in this playlist
        if (playlist.some(p => p.frameId === candidate.frameId)) {
          continue;
        }

        // ============================================
        // 1. MOVIE DIVERSITY RULES (Strict Disqualifiers)
        // ============================================
        // Never same movie twice inside one match
        if (selectedMovieIds.has(candidate.movieId)) {
          continue;
        }

        // Never same franchise twice inside one match
        if (candidate.franchise !== 'none' && selectedFranchises.has(candidate.franchise)) {
          continue;
        }

        // ============================================
        // 2. SIMILAR FRAME DETECTION (Visual Hash)
        // ============================================
        let isVisuallySimilar = false;
        const candHigh = (candidate as any).hashHigh as number;
        const candLow = (candidate as any).hashLow as number;
        for (const existingHash of selectedHashes) {
          const dist = PerceptualHash.fastDistance(candHigh, candLow, existingHash.high, existingHash.low);
          if (dist < 10) { // < 10 bits difference in 64 bits = ~85% visual similarity
            isVisuallySimilar = true;
            break;
          }
        }
        if (isVisuallySimilar) {
          continue; // Disqualify identical scene/duplicate screenshots
        }

        // ============================================
        // 3. SMART FRAME SCORING
        // ============================================
        let score = 0;

        // Freshness & User Seen Penalty:
        // Fresh unseen frames receive huge priority (+100) vs seen frames (-10000)
        // This ensures the player NEVER sees a repeated frame while unseen frames remain!
        const timesSeen = seenFrameFrequencies.get(candidate.frameId) || 0;
        if (timesSeen === 0) {
          score += 100; // Never seen frame bonus (+100)
        } else {
          score -= 10000 * timesSeen; // Heavily penalize seen frames
        }

        // Recently played movie penalty
        if (seenMovieIds.has(candidate.movieId)) {
          score -= 300; // Recently played movie penalty (-300)
        }

        // Cinematic Quality Score
        score += candidate.qualityScore * 0.5; // Up to +50 for high cinematic quality

        // Discovery Value (celebrates masterpieces & distinctive foreign/indie cinema)
        score += candidate.discoveryValue * 0.35; // Up to +35

        // Adaptive Difficulty Balance
        const diffDistance = Math.abs(candidate.difficulty - targetDifficulty);
        const difficultyBalance = Math.max(-50, 50 - diffDistance * 12);
        score += difficultyBalance; // Perfect match: +50, 1 off: +38, 2 off: +26

        // Global Cooldown Penalty (avoid serving the same frame globally across all rooms)
        if (!ignoreCooldown) {
          const lastServedAt = this.memoryCooldowns.get(candidate.frameId);
          if (lastServedAt) {
            const elapsedMs = now - lastServedAt;
            if (elapsedMs < 15 * 60 * 1000) {
              score -= 300; // Served within 15 minutes globally
            } else if (elapsedMs < 60 * 60 * 1000) {
              score -= 150; // Served within 1 hour globally
            }
          }
        }

        // Diversity penalties & bonuses:
        // Never same actor consecutively (penalty -800 to avoid consecutive actor if alternative exists)
        if (candidate.leadActor !== 'Ensemble Cast' && candidate.leadActor === lastLeadActor) {
          score -= 800;
        }

        // Avoid same genre repeatedly
        if (genreHistory.length >= 2 &&
            genreHistory[genreHistory.length - 1] === candidate.genre &&
            genreHistory[genreHistory.length - 2] === candidate.genre) {
          score -= 600;
        } else if (genreHistory.length > 0 && genreHistory[genreHistory.length - 1] === candidate.genre) {
          score -= 40;
        }

        // Regional & Decade Variety Bonus
        if (regionCounts[candidate.region] === 0) {
          score += 30; // Underrepresented region bonus (Hollywood, Bollywood, Regional, International)
        }

        // Seeded jitter to resolve ties and ensure variance across different rooms
        const jitter = rng() * 6;
        score += jitter;

        if (score > bestScore) {
          bestScore = score;
          bestCandidate = candidate;
        }
      }

      // If a candidate was found, lock it into the playlist
      if (bestCandidate) {
        playlist.push(bestCandidate);
        selectedMovieIds.add(bestCandidate.movieId);
        if (bestCandidate.franchise !== 'none') {
          selectedFranchises.add(bestCandidate.franchise);
        }
        selectedHashes.push({
          high: (bestCandidate as any).hashHigh,
          low: (bestCandidate as any).hashLow
        });
        genreHistory.push(bestCandidate.genre);
        regionCounts[bestCandidate.region] = (regionCounts[bestCandidate.region] || 0) + 1;
        lastLeadActor = bestCandidate.leadActor;

        // Record in-memory global cooldown for fast concurrency
        this.memoryCooldowns.set(bestCandidate.frameId, now);
      } else {
        // Pool exhausted under strict constraints: fallback gracefully to remaining items
        const remaining = pool.filter(p => !playlist.some(x => x.frameId === p.frameId));
        if (remaining.length > 0) {
          // Sort remaining so unseen are first
          remaining.sort((a, b) => {
            const aSeen = seenFrameFrequencies.get(a.frameId) || 0;
            const bSeen = seenFrameFrequencies.get(b.frameId) || 0;
            return aSeen - bSeen;
          });
          const fallback = remaining[0];
          playlist.push(fallback);
          selectedMovieIds.add(fallback.movieId);
        } else {
          break; // Entire catalog exhausted
        }
      }
    }

    return playlist;
  }

  /**
   * Maps round index (0-based) to the specified Adaptive Difficulty:
   * Round 1: 3
   * Round 2: 5
   * Round 3: 6
   * Round 4: 8
   * Round 5: 9
   * Round 6: 6
   * Round 7: 10
   */
  public getTargetDifficultyForRound(roundIndex: number): number {
    const curve = FrameEngine.ADAPTIVE_DIFFICULTY_CURVE;
    if (roundIndex < curve.length) {
      return curve[roundIndex];
    }
    // For rounds beyond 7, cycle through the undulating difficulty wave
    const wave = [4, 7, 9, 5, 8, 10, 6, 8, 9, 6, 10];
    const offset = (roundIndex - curve.length) % wave.length;
    return wave[offset];
  }

  /**
   * Converts EnrichedFrameMetadata back to CatalogItem for Colyseus GameState compatibility.
   */
  private toCatalogItem(meta: EnrichedFrameMetadata): CatalogItem {
    return {
      id: meta.frameId,
      category: meta.category,
      type: meta.type,
      content: meta.contentUrl,
      answer: meta.movieTitle,
      year: meta.year ? String(meta.year) : undefined,
      tag: (meta.tag as any) || 'classic',
      aliases: meta.aliases,
      dialogue: meta.dialogue,
      revealContent: meta.revealContent
    };
  }

  /**
   * Deterministic Linear Congruential Generator (LCG) PRNG seeded from room string.
   */
  private createSeededRNG(seedStr: string): () => number {
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) {
      seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
    }
    return () => {
      seed = (1664525 * seed + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }
}
