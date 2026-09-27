// scripts/test_admin_auth.js
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('admin.html', 'utf8');

// Minimal mock DOM for testing AdminApp manual auth & team credentials logic
function createMockEnvironment() {
  const elements = {};
  function makeEl(id, tagName = 'div') {
    return {
      id,
      tagName: tagName.toUpperCase(),
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        toggle: () => {}
      },
      textContent: '',
      innerHTML: '',
      value: '',
      dataset: {},
      addEventListener: () => {},
      scrollIntoView: () => {}
    };
  }

  const ids = [
    'authOverlay', 'authUserIdInput', 'authPassInput', 'authError', 'userNameLabel',
    'userAvatarImg', 'userRoleBadge', 'settingsNavBtn', 'teamNavBtn',
    'teamModal', 'newUserName', 'newUserIdentifier', 'newUserPassword', 'newUserRole', 'newUserAvatar',
    'teamListCount', 'teamUsersList', 'teamHeaderCount',
    'dropsListContainer', 'dropsCount', 'cfgCloudName', 'cfgApiKey',
    'cfgApiSecret', 'cfgTmdbToken', 'cfgPasscode',
    'cfgAdminEmail', 'cfgUploaderPasscode', 'settingsModal', 'cldStatusPill',
    'assetLibHeaderCount', 'assetSubtitle', 'catCountAll', 'catCountFrames',
    'catCountEyes', 'catCountTie', 'catCountAvvtar', 'catCountBg',
    'adminToast', 'toastIcon', 'toastMsg',
    'eyesModeTab', 'exportBtn', 'dialogueFields', 'imageUploadSection',
    'eyesRevealGroup', 'tmdbStillsSection', 'formHeaderTitle', 'answerLabel',
    'mockModeBadge', 'itemAnswer', 'itemYear', 'itemHint', 'itemDialogue',
    'mockAnswerText', 'mockHintText', 'mockImage', 'mockDialogueText',
    'submitBtn', 'uploadProgress', 'progressFill', 'progressStatus',
    'progressPercent', 'fileDropzone'
  ];

  ids.forEach(id => {
    elements[id] = makeEl(id);
  });

  const storage = {};
  const mockStorage = {
    getItem: (k) => storage[k] || null,
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; },
    clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
  };

  const doc = {
    getElementById: (id) => elements[id] || makeEl(id),
    querySelector: (sel) => makeEl(sel),
    querySelectorAll: () => [],
    addEventListener: () => {}
  };

  const sandbox = {
    window: {
      location: { origin: 'https://scoopcast.me', href: 'https://scoopcast.me/admin', search: '', hash: '' }
    },
    document: doc,
    sessionStorage: mockStorage,
    localStorage: mockStorage,
    fetch: async () => ({ ok: true, json: async () => ({ drops: [] }) }),
    setTimeout: (fn) => fn(),
    clearTimeout: () => {},
    alert: (msg) => {},
    confirm: (msg) => true,
    prompt: (msg, def) => def || 'newpass123',
    console: console,
    AdminApp: null
  };

  sandbox.window.document = doc;
  sandbox.window.sessionStorage = mockStorage;
  sandbox.window.localStorage = mockStorage;

  return { sandbox, elements, storage };
}

// Extract AdminApp script
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/i);
if (!scriptMatch) {
  console.error('FAIL: Could not find inline AdminApp script');
  process.exit(1);
}
const scriptContent = scriptMatch[1];

async function runTests() {
  console.log('🧪 Running Scoopcast Manual Auth & Team Credentials Test Suite...\n');

  // Test 1: Quick Login as Asmit Sharma (Main Head)
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;

    AdminApp.quickLoginAsmit();
    
    if (storage['scoopcast_admin_auth'] !== 'true') throw new Error('Test 1 failed: auth not saved');
    if (storage['scoopcast_user_role'] !== 'admin') throw new Error('Test 1 failed: role not admin');
    if (storage['scoopcast_user_name'] !== 'Asmit Sharma') throw new Error('Test 1 failed: name not Asmit Sharma');
    if (elements['authOverlay'].style.display !== 'none') throw new Error('Test 1 failed: overlay not hidden');
    if (elements['userRoleBadge'].textContent !== '👑 MAIN HEAD') throw new Error('Test 1 failed: role badge mismatch');
    if (elements['settingsNavBtn'].style.display !== 'inline-flex') throw new Error('Test 1 failed: settings button hidden for admin');
    if (elements['teamNavBtn'].style.display !== 'inline-flex') throw new Error('Test 1 failed: team button hidden for admin');
    console.log('✅ Test 1 Passed: quickLoginAsmit() grants 👑 MAIN HEAD, displays Team button and hides overlay immediately');
  }

  // Test 2: Manual login with Root Admin ID 'asmit' & password 'scoopcast2026'
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);

    elements['authUserIdInput'].value = 'asmit';
    elements['authPassInput'].value = 'scoopcast2026';
    sandbox.window.AdminApp.handleLogin({ preventDefault: () => {} });

    if (storage['scoopcast_admin_auth'] !== 'true') throw new Error('Test 2 failed: auth not saved');
    if (storage['scoopcast_user_role'] !== 'admin') throw new Error('Test 2 failed: role not admin');
    if (elements['authOverlay'].style.display !== 'none') throw new Error('Test 2 failed: overlay not hidden');
    console.log('✅ Test 2 Passed: Manual login with ID "asmit" and password logs in as 👑 MAIN HEAD');
  }

  // Test 3: Manual login with Root Admin Email 'asmit.sharma@hotmail.com' & password 'scoopcast2026'
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);

    elements['authUserIdInput'].value = 'asmit.sharma@hotmail.com';
    elements['authPassInput'].value = 'scoopcast2026';
    sandbox.window.AdminApp.handleLogin({ preventDefault: () => {} });

    if (storage['scoopcast_admin_auth'] !== 'true') throw new Error('Test 3 failed: auth not saved');
    if (storage['scoopcast_user_role'] !== 'admin') throw new Error('Test 3 failed: role not admin');
    if (elements['authOverlay'].style.display !== 'none') throw new Error('Test 3 failed: overlay not hidden');
    console.log('✅ Test 3 Passed: Manual login with email "asmit.sharma@hotmail.com" logs in as 👑 MAIN HEAD');
  }

  // Test 4: Default contributor login with 'curator' & password 'uploader2026'
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;
    AdminApp.loadTeamUsers();

    elements['authUserIdInput'].value = 'curator';
    elements['authPassInput'].value = 'uploader2026';
    AdminApp.handleLogin({ preventDefault: () => {} });

    if (storage['scoopcast_admin_auth'] !== 'true') throw new Error('Test 4 failed: auth not saved');
    if (storage['scoopcast_user_role'] !== 'uploader') throw new Error('Test 4 failed: role not uploader');
    if (elements['userRoleBadge'].textContent !== '📤 UPLOADER') throw new Error('Test 4 failed: role badge mismatch');
    if (elements['settingsNavBtn'].style.display !== 'none') throw new Error('Test 4 failed: settings button must be hidden for uploader');
    if (elements['teamNavBtn'].style.display !== 'none') throw new Error('Test 4 failed: team button must be hidden for uploader');
    if (elements['eyesModeTab'].style.display !== 'none') throw new Error('Test 4 failed: eyes mode tab must be hidden for uploader');
    if (elements['exportBtn'].style.display !== 'none') throw new Error('Test 4 failed: export button must be hidden for uploader');
    console.log('✅ Test 4 Passed: Contributor "curator" logs in as 📤 UPLOADER with eyes tab, export & settings hidden');
  }

  // Test 5: Rejection of incorrect password for valid user
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;
    AdminApp.loadTeamUsers();

    elements['authUserIdInput'].value = 'asmit';
    elements['authPassInput'].value = 'WRONG_PASSWORD';
    elements['authError'].style.display = 'none';

    AdminApp.handleLogin({ preventDefault: () => {} });

    if (storage['scoopcast_admin_auth'] === 'true') throw new Error('Test 5 failed: session was granted with wrong password');
    if (elements['authError'].style.display !== 'block') throw new Error('Test 5 failed: error banner not shown for wrong password');
    console.log('✅ Test 5 Passed: Incorrect password correctly rejected with error banner');
  }

  // Test 6: Rejection of unknown user ID
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;
    AdminApp.loadTeamUsers();

    elements['authUserIdInput'].value = 'unknown_hacker';
    elements['authPassInput'].value = 'random_pass';
    elements['authError'].style.display = 'none';

    AdminApp.handleLogin({ preventDefault: () => {} });

    if (storage['scoopcast_admin_auth'] === 'true') throw new Error('Test 6 failed: session was granted to unknown user');
    if (elements['authError'].style.display !== 'block') throw new Error('Test 6 failed: error banner not shown for unknown user');
    console.log('✅ Test 6 Passed: Unknown User ID cleanly rejected');
  }

  // Test 7: Auth persistence checkAuth()
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    storage['scoopcast_admin_auth'] = 'true';
    storage['scoopcast_user_role'] = 'admin';
    storage['scoopcast_user_name'] = 'Asmit Sharma';

    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);

    sandbox.window.AdminApp.checkAuth();
    if (elements['authOverlay'].style.display !== 'none') throw new Error('Test 7 failed: overlay should be hidden on restore');
    console.log('✅ Test 7 Passed: checkAuth() restores existing session without showing lock screen');
  }

  // Test 8: Logout clears credentials and shows overlay
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    storage['scoopcast_admin_auth'] = 'true';
    storage['scoopcast_user_role'] = 'admin';

    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);

    sandbox.window.AdminApp.logout();
    if (storage['scoopcast_admin_auth']) throw new Error('Test 8 failed: auth flag not cleared');
    if (elements['authOverlay'].style.display !== 'flex') throw new Error('Test 8 failed: overlay should be flex on logout');
    console.log('✅ Test 8 Passed: logout() cleanly wipes session and restores lock overlay');
  }

  // Test 9: Add New Contributor with custom ID and Password via handleAddUser
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;
    AdminApp.loadTeamUsers();

    const initialCount = AdminApp.teamUsers.length;
    elements['newUserName'].value = 'Priya Sharma';
    elements['newUserIdentifier'].value = 'priya';
    elements['newUserPassword'].value = 'priya2026';
    elements['newUserRole'].value = 'uploader';
    elements['newUserAvatar'].value = 'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799933/scoopcast/avvtar/radha.svg';

    AdminApp.handleAddUser({ preventDefault: () => {} });

    if (AdminApp.teamUsers.length !== initialCount + 1) throw new Error('Test 9 failed: user not added to team list');
    const added = AdminApp.teamUsers.find(u => u.identifier === 'priya');
    if (!added || added.password !== 'priya2026' || added.role !== 'uploader') throw new Error('Test 9 failed: user credentials not recorded');
    
    // Check saved in storage
    const saved = JSON.parse(storage['scoopcast_team_users']);
    if (!saved.some(u => u.identifier === 'priya')) throw new Error('Test 9 failed: not saved to localStorage');
    console.log('✅ Test 9 Passed: handleAddUser() successfully saves contributor with custom ID & password');
  }

  // Test 10: Contributor signs in with custom credentials
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;
    AdminApp.loadTeamUsers();

    // Add priya
    elements['newUserName'].value = 'Priya Sharma';
    elements['newUserIdentifier'].value = 'priya';
    elements['newUserPassword'].value = 'priya2026';
    elements['newUserRole'].value = 'uploader';
    elements['newUserAvatar'].value = 'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799933/scoopcast/avvtar/radha.svg';
    AdminApp.handleAddUser({ preventDefault: () => {} });

    // Login with priya credentials
    elements['authUserIdInput'].value = 'priya';
    elements['authPassInput'].value = 'priya2026';
    AdminApp.handleLogin({ preventDefault: () => {} });

    if (storage['scoopcast_admin_auth'] !== 'true') throw new Error('Test 10 failed: priya auth not saved');
    if (storage['scoopcast_user_role'] !== 'uploader') throw new Error('Test 10 failed: priya role should be uploader');
    if (storage['scoopcast_user_name'] !== 'Priya Sharma') throw new Error('Test 10 failed: name mismatch');
    if (elements['authOverlay'].style.display !== 'none') throw new Error('Test 10 failed: overlay not hidden for priya');
    console.log('✅ Test 10 Passed: Newly added contributor logs in with their manual ID and password');
  }

  // Test 11: Edit Contributor Password (editUserPassword)
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;
    AdminApp.loadTeamUsers();

    // Add user
    elements['newUserName'].value = 'Dev User';
    elements['newUserIdentifier'].value = 'devuser';
    elements['newUserPassword'].value = 'oldpass';
    elements['newUserRole'].value = 'uploader';
    AdminApp.handleAddUser({ preventDefault: () => {} });

    // Update password
    sandbox.prompt = () => 'newsecret2026';
    AdminApp.editUserPassword('devuser');

    const dev = AdminApp.teamUsers.find(u => u.identifier === 'devuser');
    if (!dev || dev.password !== 'newsecret2026') throw new Error('Test 11 failed: password not updated');

    // Test login with new password
    elements['authUserIdInput'].value = 'devuser';
    elements['authPassInput'].value = 'newsecret2026';
    AdminApp.handleLogin({ preventDefault: () => {} });
    if (storage['scoopcast_admin_auth'] !== 'true') throw new Error('Test 11 failed: login with updated password failed');

    console.log('✅ Test 11 Passed: editUserPassword() successfully updates contributor password on the fly');
  }

  // Test 12: Role toggle (toggleUserRole)
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;
    AdminApp.loadTeamUsers();

    // Add user
    elements['newUserName'].value = 'Rahul Dev';
    elements['newUserIdentifier'].value = 'rahul';
    elements['newUserPassword'].value = 'rahulpass';
    elements['newUserRole'].value = 'uploader';
    AdminApp.handleAddUser({ preventDefault: () => {} });

    // Toggle role to admin
    AdminApp.toggleUserRole('rahul');
    let rahul = AdminApp.teamUsers.find(u => u.identifier === 'rahul');
    if (rahul.role !== 'admin') throw new Error('Test 12 failed: role not toggled to admin');

    // Toggle back to uploader
    AdminApp.toggleUserRole('rahul');
    rahul = AdminApp.teamUsers.find(u => u.identifier === 'rahul');
    if (rahul.role !== 'uploader') throw new Error('Test 12 failed: role not toggled to uploader');
    console.log('✅ Test 12 Passed: toggleUserRole() switches role between uploader and admin');
  }

  // Test 13: Remove user (removeUser)
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;
    AdminApp.loadTeamUsers();

    // Add user
    elements['newUserName'].value = 'Temporary Curator';
    elements['newUserIdentifier'].value = 'tempcurator';
    elements['newUserPassword'].value = 'temppass';
    elements['newUserRole'].value = 'uploader';
    AdminApp.handleAddUser({ preventDefault: () => {} });

    // Remove user
    AdminApp.removeUser('tempcurator');
    if (AdminApp.teamUsers.some(u => u.identifier === 'tempcurator')) throw new Error('Test 13 failed: user not removed');

    // Attempt login with removed user
    elements['authUserIdInput'].value = 'tempcurator';
    elements['authPassInput'].value = 'temppass';
    elements['authError'].style.display = 'none';
    AdminApp.handleLogin({ preventDefault: () => {} });

    if (elements['authError'].style.display !== 'block') throw new Error('Test 13 failed: removed user was not denied access');
    console.log('✅ Test 13 Passed: removeUser() removes contributor and revokes login access immediately');
  }

  // Test 14: Root admin permanent protection
  {
    const { sandbox } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;
    AdminApp.loadTeamUsers();

    let alertMsg = '';
    sandbox.alert = (m) => { alertMsg = m; };

    AdminApp.removeUser('asmit');
    if (!AdminApp.teamUsers.some(u => u.identifier === 'asmit' || u.email === 'asmit.sharma@hotmail.com')) {
      throw new Error('Test 14 failed: Root admin was removed!');
    }
    console.log('✅ Test 14 Passed: Root Main Head is permanently protected against deletion');
  }

  // Test 15: Uploader cannot switch to 'eyes' mode, but can switch to 'frames' and 'dialogue'
  {
    const { sandbox, elements } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;

    let alertFired = false;
    sandbox.alert = (msg) => { alertFired = true; };

    AdminApp.applyRole('uploader', { name: 'Curator', avatar: '' });
    
    // Attempt to switch to eyes mode
    AdminApp.setMode('eyes');
    if (AdminApp.currentMode === 'eyes') throw new Error('Test 15 failed: Uploader was able to switch to eyes mode');
    if (!alertFired) throw new Error('Test 15 failed: No restriction alert fired when uploader attempted eyes mode');
    if (AdminApp.currentMode !== 'frames') throw new Error('Test 15 failed: Mode should default to frames');

    // Dialogue mode should succeed
    alertFired = false;
    AdminApp.setMode('dialogue');
    if (AdminApp.currentMode !== 'dialogue') throw new Error('Test 15 failed: Uploader could not switch to dialogue mode');

    // Frames mode should succeed
    AdminApp.setMode('frames');
    if (AdminApp.currentMode !== 'frames') throw new Error('Test 15 failed: Uploader could not switch to frames mode');

    console.log('✅ Test 15 Passed: Uploader is strictly blocked from "eyes" mode, but authorized for "frames" and "dialogue"');
  }

  // Test 16: Uploader cannot submit when currentMode is 'eyes'
  {
    const { sandbox, elements } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;

    let alertMsg = '';
    sandbox.alert = (m) => { alertMsg = m; };

    AdminApp.applyRole('uploader', { name: 'Curator', avatar: '' });
    AdminApp.currentMode = 'eyes';

    elements['itemAnswer'].value = 'AMITABH BACHCHAN';
    await AdminApp.handleSubmit({ preventDefault: () => {} });

    if (!alertMsg.includes('Access Restricted')) throw new Error('Test 16 failed: handleSubmit did not block uploader on eyes mode');
    console.log('✅ Test 16 Passed: handleSubmit() blocks drop submission for uploaders if mode is "eyes"');
  }

  // Test 17: Uploader cannot pre-fill 'eyes' asset in form via useAssetInForm
  {
    const { sandbox, elements } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;

    let alertMsg = '';
    sandbox.alert = (m) => { alertMsg = m; };

    AdminApp.applyRole('uploader', { name: 'Curator', avatar: '' });
    AdminApp.useAssetInForm('https://cloudinary.com/eyes/shahrukh.jpg', 'Shah Rukh Khan', 'eyes');

    if (!alertMsg.includes('Access Restricted')) throw new Error('Test 17 failed: useAssetInForm did not block eyes asset for uploader');

    // But frame asset should succeed
    alertMsg = '';
    AdminApp.useAssetInForm('https://cloudinary.com/frames/sholay.jpg', 'Sholay (1975)', 'frames');
    if (alertMsg.includes('Access Restricted')) throw new Error('Test 17 failed: frames asset was blocked for uploader');
    if (AdminApp.currentMode !== 'frames') throw new Error('Test 17 failed: frames asset should set mode to frames');

    console.log('✅ Test 17 Passed: useAssetInForm() blocks "eyes" assets for uploader while allowing "frames"');
  }

  // Test 18: Uploader cannot delete drops or export playlist JSON
  {
    const { sandbox } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;

    let alertMsg = '';
    sandbox.alert = (m) => { alertMsg = m; };

    AdminApp.applyRole('uploader', { name: 'Curator', avatar: '' });
    AdminApp.dropsData = [{ answer: 'SHOLAY', category: 'frames' }];

    // Attempt export
    AdminApp.exportPlaylistJson();
    if (!alertMsg.includes('Access Restricted')) throw new Error('Test 18 failed: exportPlaylistJson did not block uploader');

    // Attempt delete
    alertMsg = '';
    AdminApp.deleteDrop(0);
    if (!alertMsg.includes('Access Restricted')) throw new Error('Test 18 failed: deleteDrop did not block uploader');

    console.log('✅ Test 18 Passed: Uploader is strictly blocked from deleting drops and exporting playlist JSON');
  }

  // Test 19: Main Head retains full permissions (all 3 modes, export, delete)
  {
    const { sandbox, elements } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;

    AdminApp.quickLoginAsmit();

    if (elements['eyesModeTab'].style.display !== 'flex') throw new Error('Test 19 failed: eyesModeTab not flex for admin');
    if (elements['exportBtn'].style.display !== 'inline-flex') throw new Error('Test 19 failed: exportBtn not inline-flex for admin');
    if (elements['settingsNavBtn'].style.display !== 'inline-flex') throw new Error('Test 19 failed: settingsNavBtn not inline-flex for admin');
    if (elements['teamNavBtn'].style.display !== 'inline-flex') throw new Error('Test 19 failed: teamNavBtn not inline-flex for admin');

    AdminApp.setMode('frames');
    if (AdminApp.currentMode !== 'frames') throw new Error('Test 19 failed: admin cannot switch to frames');

    AdminApp.setMode('eyes');
    if (AdminApp.currentMode !== 'eyes') throw new Error('Test 19 failed: admin cannot switch to eyes');

    AdminApp.setMode('dialogue');
    if (AdminApp.currentMode !== 'dialogue') throw new Error('Test 19 failed: admin cannot switch to dialogue');

    console.log('✅ Test 19 Passed: 👑 Main Head has 100% full access to all 3 game modes, export JSON, settings & team');
  }

  console.log('\n🎉 ALL 19 MANUAL AUTH & PERMISSION TESTS PASSED 100%!');
}

runTests().catch(err => {
  console.error('\n❌ TEST RUNNER FAILED:', err);
  process.exit(1);
});
