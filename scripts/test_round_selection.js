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
  querySelectorAll: () => [],
  createElement: () => ({ classList: { add: () => {}, remove: () => {} }, style: {} }),
  body: { appendChild: () => {}, removeChild: () => {} }
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

DesktopWizard.state.rounds = { frame: 40, dialogue: 40 };
DesktopWizard.state.sections = ['frame', 'dialogue'];
DesktopWizard.currentStep = 2;
DesktopWizard.goToStep(3);
assert(DesktopWizard.currentStep === 3, "Desktop Wizard: Navigates from Step 2 to Step 3 with 80 rounds without 'Maximum game length is 30 rounds' error", `Ended at step ${DesktopWizard.currentStep}`);

DesktopWizard.state.rounds = { frame: 40, dialogue: 40, eyes: 5 };
DesktopWizard.state.sections = ['frame', 'dialogue', 'eyes'];
DesktopWizard.currentStep = 2;
DesktopWizard.goToStep(3);
assert(DesktopWizard.currentStep === 2, "Desktop Wizard: Blocks transition to Step 3 when total rounds = 85 (> 80)", `Ended at step ${DesktopWizard.currentStep}`);

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

// ── TEST SUITE 5: Direct Round Input & Fallback to 40 ──
console.log("\n--- TEST SUITE 5: Direct Round Input & Fallback to 40 ---");

let lastNoticeMsg = '';
DesktopWizard.showNotice = (msg) => { lastNoticeMsg = msg; };
AndroidWizard.showNotice = (msg) => { lastNoticeMsg = msg; };

// Test Desktop direct typing <= 40
const desktopInputMock = { value: '35', classList: { add() {}, remove() {} } };
DesktopWizard.handleRoundInput('frame', desktopInputMock);
assert(DesktopWizard.state.rounds.frame === 35, "Desktop Wizard: Directly writing '35' updates frame rounds to 35", `Got ${DesktopWizard.state.rounds.frame}`);

// Test Desktop direct typing > 40 triggers warning and falls back to 40
const desktopInputExceedMock = { value: '45', classList: { add() {}, remove() {} } };
DesktopWizard.handleRoundInput('frame', desktopInputExceedMock);
assert(DesktopWizard.state.rounds.frame === 40, "Desktop Wizard: Writing '45' (> 40) falls back to 40 in state", `Got ${DesktopWizard.state.rounds.frame}`);
assert(desktopInputExceedMock.value === 40, "Desktop Wizard: Writing '45' resets input value to 40", `Got ${desktopInputExceedMock.value}`);
assert(lastNoticeMsg.includes('Maximum rounds') && lastNoticeMsg.includes('40'), "Desktop Wizard: Shows warning notice on exceeding 40", `Got notice: ${lastNoticeMsg}`);

// Test Desktop direct typing large number (e.g. 99)
const desktopInput99Mock = { value: '99', classList: { add() {}, remove() {} } };
DesktopWizard.handleRoundInput('dialogue', desktopInput99Mock);
assert(DesktopWizard.state.rounds.dialogue === 40, "Desktop Wizard: Writing '99' (> 40) falls back to 40 in state", `Got ${DesktopWizard.state.rounds.dialogue}`);
assert(desktopInput99Mock.value === 40, "Desktop Wizard: Writing '99' resets input value to 40", `Got ${desktopInput99Mock.value}`);

// Test Android direct typing > 40 triggers warning and falls back to 40
const androidInputExceedMock = { value: '55', classList: { add() {}, remove() {} } };
AndroidWizard.handleRoundInput('frame', androidInputExceedMock);
assert(AndroidWizard.state.rounds.frame === 40, "Android Wizard: Writing '55' (> 40) falls back to 40 in state", `Got ${AndroidWizard.state.rounds.frame}`);
assert(androidInputExceedMock.value === 40, "Android Wizard: Writing '55' resets input value to 40", `Got ${androidInputExceedMock.value}`);

// Test blur fallback on empty / < 1
const blurEmptyMock = { value: '', classList: { add() {}, remove() {} } };
DesktopWizard.handleRoundBlur('frame', blurEmptyMock);
assert(DesktopWizard.state.rounds.frame === 1 && blurEmptyMock.value === 1, "Desktop Wizard: Blurring on empty value falls back to 1", `Got ${DesktopWizard.state.rounds.frame}`);

// Test blur fallback on > 40
const blurExceedMock = { value: '100', classList: { add() {}, remove() {} } };
DesktopWizard.handleRoundBlur('frame', blurExceedMock);
assert(DesktopWizard.state.rounds.frame === 40 && blurExceedMock.value === 40, "Desktop Wizard: Blurring on 100 falls back to 40", `Got ${DesktopWizard.state.rounds.frame}`);

// Verify input element presence in wizard HTML markup
assert(desktopWizardCode.includes('class="gw-stepper-val gw-stepper-input"'), "Desktop Wizard: Generates editable <input class='gw-stepper-val gw-stepper-input'>");
assert(androidWizardCode.includes('class="gw-stepper-val gw-stepper-input"'), "Android Wizard: Generates editable <input class='gw-stepper-val gw-stepper-input'>");

console.log("\n==================================================");
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
