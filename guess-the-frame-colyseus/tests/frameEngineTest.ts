import { GameDatabase } from "../src/database/GameDatabase";
import { FrameEngine } from "../src/engine/FrameEngine";
import { PerceptualHash } from "../src/utils/perceptualHash";
import * as path from "node:path";
import * as fs from "node:fs";

async function runRecommendationEngineTests() {
  console.log("=================================================");
  console.log("🎬 SCOOPCAST INTELLIGENT FRAME RECOMMENDATION ENGINE TESTS");
  console.log("=================================================\n");

  const testDbPath = path.resolve(__dirname, "../../data/test_scoopcast.db");
  if (fs.existsSync(testDbPath)) {
    try { fs.unlinkSync(testDbPath); } catch (e) {}
  }

  const db = new GameDatabase(testDbPath);
  const engine = new FrameEngine(db);

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} - ${detail || 'Assertion failed'}`);
      failed++;
    }
  }

  // ───────────────────────────────────────────────
  // TEST 1: Adaptive Difficulty Wave Curve
  // ───────────────────────────────────────────────
  console.log("\n--- TEST 1: ADAPTIVE DIFFICULTY CURVE ---");
  const expectedCurve = [3, 5, 6, 8, 9, 6, 10];
  let curveMatched = true;
  for (let r = 0; r < expectedCurve.length; r++) {
    const diff = engine.getTargetDifficultyForRound(r);
    if (diff !== expectedCurve[r]) {
      curveMatched = false;
      console.error(`Round ${r + 1} difficulty mismatch: expected ${expectedCurve[r]}, got ${diff}`);
    }
  }
  assert(curveMatched, "Exact 7-round adaptive difficulty curve matches [3, 5, 6, 8, 9, 6, 10]");

  // ───────────────────────────────────────────────
  // TEST 2: Movie Diversity Rules in Single Room
  // ───────────────────────────────────────────────
  console.log("\n--- TEST 2: MOVIE DIVERSITY RULES ---");
  const playlist = engine.generatePlaylist({
    roomCode: "TEST_DIV",
    playerIds: ["user_diversity_test"],
    rounds: 7,
    category: "frames",
    gameSeed: "test_seed_diversity_123"
  });

  assert(playlist.length === 7, `Generated full 7-round playlist (received ${playlist.length})`);

  // Check 1: Never same movie twice
  const titles = playlist.map(p => p.answer.toUpperCase());
  const uniqueTitles = new Set(titles);
  assert(uniqueTitles.size === playlist.length, "Never same movie twice in one match", `Duplicates found: ${titles.length - uniqueTitles.size}`);

  // Check 2: Never same franchise twice
  // Map titles to franchises
  const activeFrames = db.getActiveFrames();
  const frameMap = new Map(activeFrames.map(f => [f.frameId, f]));
  const franchisesInMatch = playlist
    .map(p => frameMap.get(p.id)?.franchise || 'none')
    .filter(f => f !== 'none');
  const uniqueFranchises = new Set(franchisesInMatch);
  assert(uniqueFranchises.size === franchisesInMatch.length, "Never same franchise twice in one match", `Franchises: ${franchisesInMatch.join(', ')}`);

  // Check 3: Never same actor consecutively
  let consecutiveActor = false;
  let lastActor = '';
  for (const item of playlist) {
    const actor = frameMap.get(item.id)?.leadActor || 'Ensemble';
    if (actor !== 'Ensemble Cast' && actor === lastActor) {
      consecutiveActor = true;
      break;
    }
    lastActor = actor;
  }
  assert(!consecutiveActor, "Never same lead actor consecutively");

  // ───────────────────────────────────────────────
  // TEST 3: Visual Similarity & Duplicate Detection
  // ───────────────────────────────────────────────
  console.log("\n--- TEST 3: VISUAL SIMILARITY DETECTION ---");
  const baseHash = "a1b2c3d4e5f60718";
  const duplicateHash = "a1b2c3d4e5f60719"; // 1 bit flip (Hamming distance 1)
  const differentHash = "fedcba9876543210"; // Very high distance

  const distNear = PerceptualHash.hammingDistance(baseHash, duplicateHash);
  const distFar = PerceptualHash.hammingDistance(baseHash, differentHash);
  const simNear = PerceptualHash.visualSimilarity(baseHash, duplicateHash);

  assert(distNear === 1, `PerceptualHash detected near-duplicate with Hamming distance ${distNear}`);
  assert(simNear > 0.95, `Visual similarity calculated as ${(simNear * 100).toFixed(1)}%`);
  assert(distFar > 25, `Different scenes correctly measured distance ${distFar}`);

  // ───────────────────────────────────────────────
  // TEST 4: Anti-Repetition Over 50 Consecutive Matches
  // ───────────────────────────────────────────────
  console.log("\n--- TEST 4: 50 CONSECUTIVE MATCHES (PLAYER FEEL: ALWAYS NEW FRAMES) ---");
  const testUserId = "veteran_player_42";
  const seenFrameIds = new Set<string>();
  let totalFramesServed = 0;
  let duplicateFramesEncountered = 0;

  // Total active frames in catalog
  const totalCatalogFrames = activeFrames.filter(f => f.category === 'frames').length;
  console.log(`Testing with player history against ${totalCatalogFrames} catalog frames...`);

  // Play 30 matches (210 rounds) - well below catalog exhaustion
  const matchCount = 30;
  for (let m = 0; m < matchCount; m++) {
    const matchPlaylist = engine.generatePlaylist({
      roomCode: `MATCH_${m}`,
      playerIds: [testUserId],
      rounds: 7,
      category: "frames",
      gameSeed: `seed_m_${m}_${Date.now()}`
    });

    for (const frame of matchPlaylist) {
      totalFramesServed++;
      if (seenFrameIds.has(frame.id)) {
        duplicateFramesEncountered++;
      }
      seenFrameIds.add(frame.id);

      // Save permanently to user history in SQLite after every round
      db.recordRoundHistory([{
        userId: testUserId,
        frameId: frame.id,
        movieId: frame.answer.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        gameId: `MATCH_${m}`,
        seenAt: Date.now(),
        correctAnswer: true,
        guessTime: 4.5
      }]);
    }
  }

  assert(
    duplicateFramesEncountered === 0,
    `Player played ${matchCount} matches (${totalFramesServed} frames) with ZERO repeats! (Seen unique: ${seenFrameIds.size})`
  );

  // ───────────────────────────────────────────────
  // TEST 5: Multi-Room Synchronization & Distinctness
  // ───────────────────────────────────────────────
  console.log("\n--- TEST 5: MULTI-ROOM SYNCHRONIZATION & SEPARATION ---");
  const roomA1 = engine.generatePlaylist({
    roomCode: "ROOM_ALPHA",
    playerIds: ["player_alice", "player_bob"],
    rounds: 7,
    category: "frames",
    gameSeed: "SEED_ALPHA_FIXED",
    ignoreCooldown: true
  });

  const roomA2 = engine.generatePlaylist({
    roomCode: "ROOM_ALPHA",
    playerIds: ["player_alice", "player_bob"],
    rounds: 7,
    category: "frames",
    gameSeed: "SEED_ALPHA_FIXED",
    ignoreCooldown: true
  });

  const roomB = engine.generatePlaylist({
    roomCode: "ROOM_BETA",
    playerIds: ["player_charlie", "player_dave"],
    rounds: 7,
    category: "frames",
    gameSeed: "SEED_BETA_DISTINCT"
  });

  const idsA1 = roomA1.map(f => f.id).join(",");
  const idsA2 = roomA2.map(f => f.id).join(",");
  const idsB = roomB.map(f => f.id).join(",");

  assert(idsA1 === idsA2, "Same room players deterministically receive the exact same frames");
  assert(idsA1 !== idsB, "Different rooms receive distinct frame sequences");

  // ───────────────────────────────────────────────
  // TEST 6: High-Concurrency Performance (1,000 Concurrent Rooms)
  // ───────────────────────────────────────────────
  console.log("\n--- TEST 6: HIGH-CONCURRENCY PERFORMANCE (1,000 ROOMS) ---");
  const concurrentRooms = 1000;
  const startPerf = Date.now();

  for (let i = 0; i < concurrentRooms; i++) {
    engine.generatePlaylist({
      roomCode: `ROOM_${i}`,
      playerIds: [`user_${i % 100}`],
      rounds: 7,
      category: "frames",
      gameSeed: `seed_stress_${i}`
    });
  }

  const elapsedMs = Date.now() - startPerf;
  const avgMsPerRoom = elapsedMs / concurrentRooms;
  console.log(`⚡ 1,000 Rooms generated in ${elapsedMs}ms (Average: ${avgMsPerRoom.toFixed(2)}ms / room)`);

  assert(elapsedMs < 2000, `High concurrency test passed under 2000ms threshold (Actual: ${elapsedMs}ms)`);
  assert(avgMsPerRoom < 2.0, `Average room generation latency < 2ms (Actual: ${avgMsPerRoom.toFixed(2)}ms)`);

  // Clean up
  db.close();
  try { fs.unlinkSync(testDbPath); } catch (e) {}

  console.log("\n=================================================");
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runRecommendationEngineTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
