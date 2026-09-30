import { CATALOG } from "../src/data/catalog";
import { FrameEngine } from "../src/engine/FrameEngine";
import { GameDatabase } from "../src/database/GameDatabase";
import { FuzzyMatcher } from "../src/utils/fuzzyMatcher";

console.log("==================================================");
console.log("🎬 RUNNING DIALOGUE & FIGHT CLUB FEATURE TESTS");
console.log("==================================================");

// Test 1: Catalog counts and structure
console.log("\n[TEST 1] Verifying Catalog dialogue entries...");
const dialogueItems = CATALOG.filter(c => c.category === 'dialogue');
console.log(`Found ${dialogueItems.length} total dialogue items in CATALOG.`);
if (dialogueItems.length < 400) {
  throw new Error(`Expected at least 400 dialogue items, found ${dialogueItems.length}`);
}

const bollywoodItems = dialogueItems.filter(c => c.region === 'bollywood');
const hollywoodItems = dialogueItems.filter(c => c.region === 'hollywood');
console.log(`Bollywood dialogues: ${bollywoodItems.length}`);
console.log(`Hollywood dialogues: ${hollywoodItems.length}`);

if (bollywoodItems.length !== 200) {
  throw new Error(`Expected exactly 200 Bollywood dialogues, got ${bollywoodItems.length}`);
}
if (hollywoodItems.length !== 200) {
  throw new Error(`Expected exactly 200 Hollywood dialogues, got ${hollywoodItems.length}`);
}
console.log("✅ Catalog has exactly 200 Bollywood and 200 Hollywood dialogues.");

// Test 2: Fight Club masking & answer acceptance
console.log("\n[TEST 2] Verifying Fight Club dialogues and answers...");
const fcItems = dialogueItems.filter(c => c.answer === 'FIGHT CLUB');
console.log(`Found ${fcItems.length} Fight Club dialogue entries.`);
if (fcItems.length < 2) {
  throw new Error(`Expected at least 2 Fight Club dialogues, found ${fcItems.length}`);
}
for (const fc of fcItems) {
  if (fc.displayAnswer !== '***** ****') {
    throw new Error(`Fight Club item ${fc.id} missing displayAnswer '***** ****': got ${fc.displayAnswer}`);
  }
  // Verify FuzzyMatcher accepts "fight club"
  const isMatchLower = FuzzyMatcher.isMatch("fight club", fc.answer);
  const isMatchUpper = FuzzyMatcher.isMatch("FIGHT CLUB", fc.answer);
  if (!isMatchLower || !isMatchUpper) {
    throw new Error(`FuzzyMatcher failed to accept 'fight club' for answer ${fc.answer}`);
  }
}
console.log("✅ Fight Club has displayAnswer '***** ****' and accepts 'fight club' guesses.");

// Test 3: Selection Half-Half logic (Even count: 10 rounds -> 5 Bollywood, 5 Hollywood)
console.log("\n[TEST 3] Testing FrameEngine dialogue playlist (Even: 10 rounds)...");
const db = GameDatabase.getInstance();
const engine = FrameEngine.getInstance(db);

const playlist10 = engine.selectRandomPlaylist(
  'dialogue',
  10,
  new Map(),
  Math.random
);
const bCount10 = playlist10.filter(p => p.region === 'bollywood').length;
const hCount10 = playlist10.filter(p => p.region === 'hollywood').length;
console.log(`10 rounds requested -> ${bCount10} Bollywood, ${hCount10} Hollywood`);
if (bCount10 !== 5 || hCount10 !== 5) {
  throw new Error(`Expected 5 Bollywood and 5 Hollywood for 10 rounds, got ${bCount10}B / ${hCount10}H`);
}
console.log("✅ 10 rounds evenly split 5 Bollywood / 5 Hollywood.");

// Test 4: Selection Half-Half logic (Odd count: 5 rounds -> 3 Bollywood, 2 Hollywood)
console.log("\n[TEST 4] Testing FrameEngine dialogue playlist (Odd: 5 rounds)...");
const playlist5 = engine.selectRandomPlaylist(
  'dialogue',
  5,
  new Map(),
  Math.random
);
const bCount5 = playlist5.filter(p => p.region === 'bollywood').length;
const hCount5 = playlist5.filter(p => p.region === 'hollywood').length;
console.log(`5 rounds requested -> ${bCount5} Bollywood, ${hCount5} Hollywood`);
if (bCount5 !== 3 || hCount5 !== 2) {
  throw new Error(`Expected 3 Bollywood and 2 Hollywood for 5 rounds, got ${bCount5}B / ${hCount5}H`);
}
console.log("✅ 5 rounds correctly gave 3 Bollywood (+1 extra) and 2 Hollywood.");

// Test 5: Selection Half-Half logic (Odd count: 7 rounds -> 4 Bollywood, 3 Hollywood)
console.log("\n[TEST 5] Testing FrameEngine dialogue playlist (Odd: 7 rounds)...");
const playlist7 = engine.selectRandomPlaylist(
  'dialogue',
  7,
  new Map(),
  Math.random
);
const bCount7 = playlist7.filter(p => p.region === 'bollywood').length;
const hCount7 = playlist7.filter(p => p.region === 'hollywood').length;
console.log(`7 rounds requested -> ${bCount7} Bollywood, ${hCount7} Hollywood`);
if (bCount7 !== 4 || hCount7 !== 3) {
  throw new Error(`Expected 4 Bollywood and 3 Hollywood for 7 rounds, got ${bCount7}B / ${hCount7}H`);
}
console.log("✅ 7 rounds correctly gave 4 Bollywood (+1 extra) and 3 Hollywood.");

// Test 6: Verify Character & Actor hints on items
console.log("\n[TEST 6] Verifying dialogue hints have Character & Actor metadata...");
let withCharAndActor = 0;
for (const d of dialogueItems) {
  if (d.character && d.actor) {
    withCharAndActor++;
  }
}
console.log(`${withCharAndActor} / ${dialogueItems.length} dialogues have both Character and Actor defined.`);
if (withCharAndActor < 380) {
  throw new Error(`Expected almost all dialogues to have character and actor, found only ${withCharAndActor}`);
}

// Sample a hint
const sample = dialogueItems[0];
const sampleHint = `Character / Actor: ${sample.character} (${sample.actor})`;
console.log(`Sample Hint for '${sample.dialogue}':`);
console.log(`  -> ${sampleHint}`);
console.log("✅ Dialogue hints format validated.");

console.log("\n==================================================");
console.log("🎉 ALL DIALOGUE & FIGHT CLUB TESTS PASSED!");
console.log("==================================================");
