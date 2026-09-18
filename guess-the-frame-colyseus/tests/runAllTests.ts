async function runAll() {
  console.log("==================================================");
  console.log("🚀 STARTING BACKEND TEST SUITE (GUESS THE FRAME)");
  console.log("==================================================");

  // 1. FuzzyMatcher Tests
  await import("./fuzzyMatcher.test");

  // 2. HintGenerator Tests
  await import("./hintGenerator.test");

  // 3. TriviaRoom E2E Tests
  const { runIntegrationTest } = await import("./triviaRoom.test");
  await runIntegrationTest();

  console.log("==================================================");
  console.log("🎉 ALL TESTS COMPLETED & VERIFIED SUCCESSFULLY!");
  console.log("==================================================");
  process.exit(0);
}

runAll().catch(err => {
  console.error("Test Suite Error:", err);
  process.exit(1);
});
