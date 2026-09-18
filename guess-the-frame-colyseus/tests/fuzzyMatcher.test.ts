import assert from "assert";
import { FuzzyMatcher } from "../src/utils/fuzzyMatcher";

console.log("▶ Running FuzzyMatcher Tests...");

// 1. Exact & Case Insensitive
assert.strictEqual(FuzzyMatcher.isMatch("12th fail", "12TH FAIL"), true, "Should match exact case-insensitive");
assert.strictEqual(FuzzyMatcher.isMatch("AFTER HOURS", "after hours"), true, "Should match after hours");

// 2. Diacritics and accents
assert.strictEqual(FuzzyMatcher.isMatch("amelie", "Amélie"), true, "Should match diacritics");

// 3. Typo tolerance (Levenshtein)
assert.strictEqual(FuzzyMatcher.isMatch("12 fail", "12th Fail"), true, "Should match '12 fail' to '12th Fail'");
assert.strictEqual(FuzzyMatcher.isMatch("bramayugm", "Bramayugam"), true, "Should match slight typo in Bramayugam");
assert.strictEqual(FuzzyMatcher.isMatch("khosla ka ghosla", "khosla ka gholsa"), true, "Should match ghosla typo");

// 4. Roman Numerals & Word Numbers
assert.strictEqual(FuzzyMatcher.isMatch("cocktail two", "Cocktail 2"), true, "Should normalize word numbers");
assert.strictEqual(FuzzyMatcher.isMatch("cocktail ii", "Cocktail 2"), true, "Should normalize roman numerals");

// 5. Stop words & common articles
assert.strictEqual(FuzzyMatcher.isMatch("french dispatch", "The French Dispatch"), true, "Should ignore leading article");
assert.strictEqual(FuzzyMatcher.isMatch("revenant", "The Revenant"), true, "Should match significant word without 'The'");

// 6. Subtitles & compound words
assert.strictEqual(FuzzyMatcher.isMatch("avengers infinity war", "AVENGERS: INFINITY WAR"), true, "Should match subtitle split");
assert.strictEqual(FuzzyMatcher.isMatch("infinity war", "AVENGERS: INFINITY WAR"), true, "Should match subtitle part");

// 7. Reject false matches
assert.strictEqual(FuzzyMatcher.isMatch("star wars", "Star Trek"), false, "Should reject different franchise");
assert.strictEqual(FuzzyMatcher.isMatch("godfather", "Batman Begins"), false, "Should reject unrelated movie");

// 8. Anti-Spoiler Shield
assert.strictEqual(FuzzyMatcher.isAnswerOrSpoiler("i think this is 12th fail", "12TH FAIL"), true, "Should flag chat spoiler");
assert.strictEqual(FuzzyMatcher.isAnswerOrSpoiler("is it bramayugam?", "BRAMAYUGAM"), true, "Should flag question spoiler");
assert.strictEqual(FuzzyMatcher.isAnswerOrSpoiler("this movie is awesome!", "12TH FAIL"), false, "Should allow regular chat");

console.log("✅ All FuzzyMatcher Tests Passed!");
