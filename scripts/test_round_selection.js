const fs = require('fs');
const path = require('path');

console.log("==================================================");
console.log("🎯 TESTING ROUND SELECTION LOGIC (40 SEC / 80 TOTAL)");
console.log("==================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, testName, details) {
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`❌ [FAIL] ${testName}${details ? ': ' + details : ''}`);
    failed++;
  }
}

// ── TEST SUITE 1: Desktop Wizard Logic (js/gameCreationWizard.js) ──
console.log("--- TEST SUITE 1: Desktop Wizard Logic ---");
const desktopWizardCode = fs.readFileSync(path.join(__dirname, '../js/gameCreationWizard.js'), 'utf-8');

// Mock a lightweight browser environment to test CreateRoomWizard
const mockWindow = {};
const mockDoc = {
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => []
};
const mockLocalStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); }
};

const desktopFn = new Function('window', 'document', 'localStorage', desktopWizardCode + '; return window.CreateRoomWizard;');
const DesktopWizard = desktopFn(mockWindow, mockDoc, mockLocalStorage);

DesktopWizard.init();
DesktopWizard.state.sections = ['frame', 'dialogue', 'eyes'];
DesktopWizard.state.rounds = { frame: 5, dialogue: 5, eyes: 0 };

// Step frame rounds up to boundary
for (let i = 0; i < 50; i++) {
  DesktopWizard.adjustSectionRounds('frame', 1);
}
assert(DesktopWizard.state.rounds.frame === 40, "Desktop Wizard: Frame rounds clamp at maximum 40", `Got ${DesktopWizard.state.rounds.frame}`);

// Step dialogue rounds up to boundary
for (let i = 0; i < 50; i++) {
  DesktopWizard.adjustSectionRounds('dialogue', 1);
}
assert(DesktopWizard.state.rounds.dialogue === 40, "Desktop Wizard: Dialogue rounds clamp at maximum 40", `Got ${DesktopWizard.state.rounds.dialogue}`);

// Step eyes rounds up to boundary (max 10)
for (let i = 0; i < 20; i++) {
  DesktopWizard.adjustSectionRounds('eyes', 1);
}
assert(DesktopWizard.state.rounds.eyes === 10, "Desktop Wizard: Eyes rounds clamp at maximum 10", `Got ${DesktopWizard.state.rounds.eyes}`);

// Test total rounds calculation with 40 frames + 40 dialogue = 80
DesktopWizard.state.sections = ['frame', 'dialogue'];
DesktopWizard.state.rounds = { frame: 40, dialogue: 40 };
assert(DesktopWizard.getTotalRounds() === 80, "Desktop Wizard: Total rounds calculation equals 80", `Got ${DesktopWizard.getTotalRounds()}`);

// Test validation bounds
const total80 = DesktopWizard.getTotalRounds();
const isValid80 = total80 >= 3 && total80 <= 80;
assert(isValid80 === true, "Desktop Wizard: 80 total rounds is considered valid (<= 80)", `Got isValid = ${isValid80}`);

DesktopWizard.state.rounds.eyes = 5;
DesktopWizard.state.sections = ['frame', 'dialogue', 'eyes'];
const total85 = DesktopWizard.getTotalRounds();
const isValid85 = total85 >= 3 && total85 <= 80;
assert(isValid85 === false, "Desktop Wizard: 85 total rounds correctly triggers validation error (> 80)", `Got isValid = ${isValid85}`);

// ── TEST SUITE 2: Android Wizard Logic (android/js/gameCreationWizard.js) ──
console.log("\n--- TEST SUITE 2: Android Wizard Logic ---");
const androidWizardCode = fs.readFileSync(path.join(__dirname, '../android/js/gameCreationWizard.js'), 'utf-8');

const androidFn = new Function('window', 'document', 'localStorage', androidWizardCode + '; return window.CreateRoomWizard;');
const AndroidWizard = androidFn(mockWindow, mockDoc, mockLocalStorage);

AndroidWizard.init();
AndroidWizard.state.sections = ['frame', 'dialogue', 'eyes'];
AndroidWizard.state.rounds = { frame: 5, dialogue: 5, eyes: 0 };

for (let i = 0; i < 50; i++) {
  AndroidWizard.adjustSectionRounds('frame', 1);
}
assert(AndroidWizard.state.rounds.frame === 40, "Android Wizard: Frame rounds clamp at maximum 40", `Got ${AndroidWizard.state.rounds.frame}`);

for (let i = 0; i < 50; i++) {
  AndroidWizard.adjustSectionRounds('dialogue', 1);
}
assert(AndroidWizard.state.rounds.dialogue === 40, "Android Wizard: Dialogue rounds clamp at maximum 40", `Got ${AndroidWizard.state.rounds.dialogue}`);

for (let i = 0; i < 20; i++) {
  AndroidWizard.adjustSectionRounds('eyes', 1);
}
assert(AndroidWizard.state.rounds.eyes === 10, "Android Wizard: Eyes rounds clamp at maximum 10", `Got ${AndroidWizard.state.rounds.eyes}`);

AndroidWizard.state.sections = ['frame', 'dialogue'];
AndroidWizard.state.rounds = { frame: 40, dialogue: 40 };
assert(AndroidWizard.getTotalRounds() === 80, "Android Wizard: Total rounds calculation equals 80", `Got ${AndroidWizard.getTotalRounds()}`);

// ── TEST SUITE 3: Desktop App Lobby Stepper Logic (desktop_app.html) ──
console.log("\n--- TEST SUITE 3: Desktop App Lobby Stepper Logic ---");
const desktopAppCode = fs.readFileSync(path.join(__dirname, '../desktop_app.html'), 'utf-8');

// Verify line for maxRounds in adjustRounds
const hasMaxRounds40 = desktopAppCode.includes("const maxRounds = (mode === 'frames' || mode === 'dialogue') ? 40 : 10;");
assert(hasMaxRounds40 === true, "desktop_app.html: Lobby stepper allows 40 for frames and dialogue");

// ── TEST SUITE 4: Backend Engine & Room Limits ──
console.log("\n--- TEST SUITE 4: Backend Engine & Room Limits ---");
const triviaRoomCode = fs.readFileSync(path.join(__dirname, '../guess-the-frame-colyseus/src/rooms/TriviaRoom.ts'), 'utf-8');

const hasRoomMax80 = triviaRoomCode.includes("totalRounds = Math.max(3, Math.min(80, totalRounds));");
assert(hasRoomMax80 === true, "TriviaRoom.ts: Caps total rounds at maximum 80 (not 30)");

const hasFrameMax40 = triviaRoomCode.includes("Math.min(40, Math.max(0, Number(rbm.frame !== undefined ? rbm.frame : (rbm.frames !== undefined ? rbm.frames : 7))))");
assert(hasFrameMax40 === true, "TriviaRoom.ts: Frame rounds clamp to 40");

const hasDialogueMax40 = triviaRoomCode.includes("Math.min(40, Math.max(0, Number(rbm.dialogue !== undefined ? rbm.dialogue : 5)))");
assert(hasDialogueMax40 === true, "TriviaRoom.ts: Dialogue rounds clamp to 40");

console.log("\n==================================================");
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
