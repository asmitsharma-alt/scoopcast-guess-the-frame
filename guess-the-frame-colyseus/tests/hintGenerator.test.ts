import assert from "assert";
import { HintGenerator } from "../src/utils/hintGenerator";

console.log("▶ Running HintGenerator Tests...");

// 1. Basic masking
const hint1 = HintGenerator.generateMaskedHint("12TH FAIL");
assert.ok(hint1.includes("_"), "Hint should contain masked underscores");
assert.ok(hint1.split("   ").length === 2, "Hint should preserve 2 words separated by triple spaces");

// 2. Multi-word title with punctuation
const hint2 = HintGenerator.generateMaskedHint("SPIDER-MAN");
assert.ok(hint2.includes("-"), "Hint should preserve hyphens");

// 3. Single short word (e.g. "DC")
const hint3 = HintGenerator.generateMaskedHint("DC");
// For length 2, exactly 1 is revealed, 1 is hidden
const letters3 = hint3.split(" ");
assert.strictEqual(letters3.length, 2, "Should have 2 character slots");
assert.strictEqual(letters3.filter(c => c === "_").length, 1, "Length 2 must have exactly 1 masked underscore");

console.log("✅ All HintGenerator Tests Passed!");
