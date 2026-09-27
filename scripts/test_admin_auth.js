// scripts/test_admin_auth.js
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('admin.html', 'utf8');

// Minimal mock DOM for testing AdminApp auth & team management logic
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
    'authOverlay', 'authPassInput', 'authError', 'userNameLabel',
    'userAvatarImg', 'userRoleBadge', 'settingsNavBtn', 'teamNavBtn',
    'teamModal', 'newUserName', 'newUserEmail', 'newUserRole', 'newUserAvatar',
    'teamListCount', 'teamUsersList', 'teamHeaderCount',
    'dropsListContainer', 'dropsCount', 'cfgCloudName', 'cfgApiKey',
    'cfgApiSecret', 'cfgTmdbToken', 'cfgClerkKey', 'cfgPasscode',
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
    querySelector: (sel) => {
      if (sel === '.neo-auth-card') return makeEl('card');
      if (sel === '.btn-google-login') return makeEl('google-btn');
      return makeEl('sel');
    },
    querySelectorAll: () => [],
    addEventListener: () => {}
  };

  const sandbox = {
    window: {
      location: { origin: 'https://scoopcast.me', href: 'https://scoopcast.me/admin', search: '', hash: '' },
      Clerk: {
        loaded: true,
        load: async () => {},
        openSignIn: () => {},
        addListener: () => {}
      }
    },
    document: doc,
    sessionStorage: mockStorage,
    localStorage: mockStorage,
    fetch: async () => ({ ok: true, json: async () => ({ drops: [] }) }),
    setTimeout: (fn) => fn(),
    clearTimeout: () => {},
    alert: (msg) => {},
    confirm: (msg) => true,
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
  console.log('🧪 Running Scoopcast Admin & Team Management Test Suite...\n');

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

  // Test 2: Email login with asmit.sharma@hotmail.com
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);

    elements['authPassInput'].value = 'asmit.sharma@hotmail.com';
    sandbox.window.AdminApp.handleLogin({ preventDefault: () => {} });

    if (storage['scoopcast_admin_auth'] !== 'true') throw new Error('Test 2 failed: auth not saved');
    if (storage['scoopcast_user_role'] !== 'admin') throw new Error('Test 2 failed: role not admin');
    if (elements['authOverlay'].style.display !== 'none') throw new Error('Test 2 failed: overlay not hidden');
    console.log('✅ Test 2 Passed: Email asmit.sharma@hotmail.com successfully logs in as 👑 MAIN HEAD');
  }

  // Test 3: Passcode login with scoopcast2026
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);

    elements['authPassInput'].value = 'scoopcast2026';
    sandbox.window.AdminApp.handleLogin({ preventDefault: () => {} });

    if (storage['scoopcast_admin_auth'] !== 'true') throw new Error('Test 3 failed: auth not saved');
    if (storage['scoopcast_user_role'] !== 'admin') throw new Error('Test 3 failed: role not admin');
    if (elements['authOverlay'].style.display !== 'none') throw new Error('Test 3 failed: overlay not hidden');
    console.log('✅ Test 3 Passed: Master passcode scoopcast2026 logs in as 👑 MAIN HEAD');
  }

  // Test 4: Uploader passcode login with uploader2026
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);

    elements['authPassInput'].value = 'uploader2026';
    sandbox.window.AdminApp.handleLogin({ preventDefault: () => {} });

    if (storage['scoopcast_admin_auth'] !== 'true') throw new Error('Test 4 failed: auth not saved');
    if (storage['scoopcast_user_role'] !== 'uploader') throw new Error('Test 4 failed: role not uploader');
    if (elements['userRoleBadge'].textContent !== '📤 UPLOADER') throw new Error('Test 4 failed: role badge mismatch');
    if (elements['settingsNavBtn'].style.display !== 'none') throw new Error('Test 4 failed: settings button must be hidden for uploader');
    if (elements['teamNavBtn'].style.display !== 'none') throw new Error('Test 4 failed: team button must be hidden for uploader');
    if (elements['eyesModeTab'].style.display !== 'none') throw new Error('Test 4 failed: eyes mode tab must be hidden for uploader');
    if (elements['exportBtn'].style.display !== 'none') throw new Error('Test 4 failed: export button must be hidden for uploader');
    console.log('✅ Test 4 Passed: Uploader passcode logs in as 📤 UPLOADER and hides API settings, Team, Eyes tab & Export');
  }

  // Test 5: Clerk user handler for asmit.sharma@hotmail.com
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);

    sandbox.window.AdminApp.handleClerkUser({
      primaryEmailAddress: { emailAddress: 'asmit.sharma@hotmail.com' },
      fullName: 'Asmit Sharma',
      imageUrl: 'https://img.clerk.com/avatar.jpg'
    });

    if (storage['scoopcast_admin_auth'] !== 'true') throw new Error('Test 5 failed: auth not saved');
    if (storage['scoopcast_user_role'] !== 'admin') throw new Error('Test 5 failed: role not admin');
    if (elements['authOverlay'].style.display !== 'none') throw new Error('Test 5 failed: overlay not hidden');
    if (elements['userRoleBadge'].textContent !== '👑 MAIN HEAD') throw new Error('Test 5 failed: badge mismatch');
    console.log('✅ Test 5 Passed: Clerk user with asmit.sharma@hotmail.com auto-promoted to 👑 MAIN HEAD');
  }

  // Test 6: Auth persistence checkAuth()
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    storage['scoopcast_admin_auth'] = 'true';
    storage['scoopcast_user_role'] = 'admin';
    storage['scoopcast_user_name'] = 'Asmit Sharma';

    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);

    sandbox.window.AdminApp.checkAuth();
    if (elements['authOverlay'].style.display !== 'none') throw new Error('Test 6 failed: overlay should be hidden on restore');
    console.log('✅ Test 6 Passed: checkAuth() restores existing session without showing lock screen');
  }

  // Test 7: Logout clears credentials and shows overlay
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    storage['scoopcast_admin_auth'] = 'true';
    storage['scoopcast_user_role'] = 'admin';

    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);

    await sandbox.window.AdminApp.logout();
    if (storage['scoopcast_admin_auth']) throw new Error('Test 7 failed: auth flag not cleared');
    if (elements['authOverlay'].style.display !== 'flex') throw new Error('Test 7 failed: overlay should be flex on logout');
    console.log('✅ Test 7 Passed: logout() cleanly wipes session and restores lock overlay');
  }

  // Test 8: Add New Team Member via handleAddUser
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;
    AdminApp.loadTeamUsers();

    const initialCount = AdminApp.teamUsers.length;
    elements['newUserName'].value = 'Priya Sharma';
    elements['newUserEmail'].value = 'priya@example.com';
    elements['newUserRole'].value = 'uploader';
    elements['newUserAvatar'].value = 'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799933/scoopcast/avvtar/radha.svg';

    AdminApp.handleAddUser({ preventDefault: () => {} });

    if (AdminApp.teamUsers.length !== initialCount + 1) throw new Error('Test 8 failed: user not added to team list');
    const added = AdminApp.teamUsers.find(u => u.email === 'priya@example.com');
    if (!added || added.name !== 'Priya Sharma' || added.role !== 'uploader') throw new Error('Test 8 failed: user properties incorrect');
    
    // Check saved in storage
    const saved = JSON.parse(storage['scoopcast_team_users']);
    if (!saved.some(u => u.email === 'priya@example.com')) throw new Error('Test 8 failed: not saved to localStorage');
    console.log('✅ Test 8 Passed: handleAddUser() successfully adds member and persists to localStorage');
  }

  // Test 9: Newly added team member can sign in
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;
    AdminApp.loadTeamUsers();

    // Add priya
    elements['newUserName'].value = 'Priya Sharma';
    elements['newUserEmail'].value = 'priya@example.com';
    elements['newUserRole'].value = 'uploader';
    elements['newUserAvatar'].value = 'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799933/scoopcast/avvtar/radha.svg';
    AdminApp.handleAddUser({ preventDefault: () => {} });

    // Now test login with priya's email
    elements['authPassInput'].value = 'priya@example.com';
    AdminApp.handleLogin({ preventDefault: () => {} });

    if (storage['scoopcast_admin_auth'] !== 'true') throw new Error('Test 9 failed: priya auth not saved');
    if (storage['scoopcast_user_role'] !== 'uploader') throw new Error('Test 9 failed: priya role should be uploader');
    if (storage['scoopcast_user_name'] !== 'Priya Sharma') throw new Error('Test 9 failed: name mismatch');
    if (elements['authOverlay'].style.display !== 'none') throw new Error('Test 9 failed: overlay not hidden for priya');
    console.log('✅ Test 9 Passed: Authorized team member (priya@example.com) can log in successfully');
  }

  // Test 10: Role toggle (toggleUserRole)
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;
    AdminApp.loadTeamUsers();

    // Add user
    elements['newUserName'].value = 'Rahul Dev';
    elements['newUserEmail'].value = 'rahul@example.com';
    elements['newUserRole'].value = 'uploader';
    elements['newUserAvatar'].value = 'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799893/scoopcast/avvtar/aman.svg';
    AdminApp.handleAddUser({ preventDefault: () => {} });

    // Toggle role to admin
    AdminApp.toggleUserRole('rahul@example.com');
    let rahul = AdminApp.teamUsers.find(u => u.email === 'rahul@example.com');
    if (rahul.role !== 'admin') throw new Error('Test 10 failed: role not toggled to admin');

    // Toggle back to uploader
    AdminApp.toggleUserRole('rahul@example.com');
    rahul = AdminApp.teamUsers.find(u => u.email === 'rahul@example.com');
    if (rahul.role !== 'uploader') throw new Error('Test 10 failed: role not toggled to uploader');
    console.log('✅ Test 10 Passed: toggleUserRole() switches role between uploader and admin');
  }

  // Test 11: Remove user (removeUser)
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;
    AdminApp.loadTeamUsers();

    // Add user
    elements['newUserName'].value = 'Temporary Curator';
    elements['newUserEmail'].value = 'temp@example.com';
    elements['newUserRole'].value = 'uploader';
    elements['newUserAvatar'].value = 'https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799893/scoopcast/avvtar/aman.svg';
    AdminApp.handleAddUser({ preventDefault: () => {} });

    if (!AdminApp.teamUsers.some(u => u.email === 'temp@example.com')) throw new Error('Test 11 setup failed');

    // Remove user
    AdminApp.removeUser('temp@example.com');
    if (AdminApp.teamUsers.some(u => u.email === 'temp@example.com')) throw new Error('Test 11 failed: user not removed');

    // Attempt login with removed user
    elements['authPassInput'].value = 'temp@example.com';
    elements['authError'].style.display = 'none';
    AdminApp.handleLogin({ preventDefault: () => {} });

    if (elements['authError'].style.display !== 'block') throw new Error('Test 11 failed: removed user was not denied access');
    console.log('✅ Test 11 Passed: removeUser() removes user and revokes login access');
  }

  // Test 12: Root admin protection
  {
    const { sandbox, elements, storage } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;
    AdminApp.loadTeamUsers();

    let alertMsg = '';
    sandbox.alert = (m) => { alertMsg = m; };

    AdminApp.removeUser('asmit.sharma@hotmail.com');
    if (!AdminApp.teamUsers.some(u => u.email === 'asmit.sharma@hotmail.com')) {
      throw new Error('Test 12 failed: Root admin was removed!');
    }
    console.log('✅ Test 12 Passed: Root Main Head (asmit.sharma@hotmail.com) is permanently protected against removal');
  }

  // Test 13: Uploader cannot switch to 'eyes' mode, but can switch to 'frames' and 'dialogue'
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
    if (AdminApp.currentMode === 'eyes') throw new Error('Test 13 failed: Uploader was able to switch to eyes mode');
    if (!alertFired) throw new Error('Test 13 failed: No restriction alert fired when uploader attempted eyes mode');
    if (AdminApp.currentMode !== 'frames') throw new Error('Test 13 failed: Mode should default to frames');

    // Dialogue mode should succeed
    alertFired = false;
    AdminApp.setMode('dialogue');
    if (AdminApp.currentMode !== 'dialogue') throw new Error('Test 13 failed: Uploader could not switch to dialogue mode');
    if (alertFired) throw new Error('Test 13 failed: Alert incorrectly fired for dialogue mode');

    // Frames mode should succeed
    AdminApp.setMode('frames');
    if (AdminApp.currentMode !== 'frames') throw new Error('Test 13 failed: Uploader could not switch to frames mode');

    console.log('✅ Test 13 Passed: Uploader is strictly blocked from "eyes" mode, but authorized for "frames" and "dialogue"');
  }

  // Test 14: Uploader cannot submit when currentMode is 'eyes'
  {
    const { sandbox, elements } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;

    let alertMsg = '';
    sandbox.alert = (m) => { alertMsg = m; };

    AdminApp.applyRole('uploader', { name: 'Curator', avatar: '' });
    AdminApp.currentMode = 'eyes'; // Force variable to test guard

    elements['itemAnswer'].value = 'AMITABH BACHCHAN';
    await AdminApp.handleSubmit({ preventDefault: () => {} });

    if (!alertMsg.includes('Access Restricted')) throw new Error('Test 14 failed: handleSubmit did not block uploader on eyes mode');
    console.log('✅ Test 14 Passed: handleSubmit() blocks drop submission for uploaders if mode is "eyes"');
  }

  // Test 15: Uploader cannot pre-fill 'eyes' asset in form via useAssetInForm
  {
    const { sandbox, elements } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;

    let alertMsg = '';
    sandbox.alert = (m) => { alertMsg = m; };

    AdminApp.applyRole('uploader', { name: 'Curator', avatar: '' });
    AdminApp.useAssetInForm('https://cloudinary.com/eyes/shahrukh.jpg', 'Shah Rukh Khan', 'eyes');

    if (!alertMsg.includes('Access Restricted')) throw new Error('Test 15 failed: useAssetInForm did not block eyes asset for uploader');
    if (elements['itemAnswer'].value === 'SHAHRUKH KHAN' || AdminApp.currentMode === 'eyes') {
      throw new Error('Test 15 failed: eyes asset was loaded into form for uploader');
    }

    // But frame asset should succeed
    alertMsg = '';
    AdminApp.useAssetInForm('https://cloudinary.com/frames/sholay.jpg', 'Sholay (1975)', 'frames');
    if (alertMsg.includes('Access Restricted')) throw new Error('Test 15 failed: frames asset was blocked for uploader');
    if (AdminApp.currentMode !== 'frames') throw new Error('Test 15 failed: frames asset should set mode to frames');
    if (elements['itemAnswer'].value !== 'SHOLAY') throw new Error('Test 15 failed: frames title not loaded into form');

    console.log('✅ Test 15 Passed: useAssetInForm() blocks "eyes" assets for uploader while allowing "frames"');
  }

  // Test 16: Uploader cannot delete drops or export playlist JSON
  {
    const { sandbox, elements } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;

    let alertMsg = '';
    sandbox.alert = (m) => { alertMsg = m; };

    AdminApp.applyRole('uploader', { name: 'Curator', avatar: '' });
    AdminApp.dropsData = [{ answer: 'SHOLAY', category: 'frames' }];

    // Attempt export
    AdminApp.exportPlaylistJson();
    if (!alertMsg.includes('Access Restricted')) throw new Error('Test 16 failed: exportPlaylistJson did not block uploader');

    // Attempt delete
    alertMsg = '';
    AdminApp.deleteDrop(0);
    if (!alertMsg.includes('Access Restricted')) throw new Error('Test 16 failed: deleteDrop did not block uploader');
    if (AdminApp.dropsData.length !== 1) throw new Error('Test 16 failed: drop was deleted by uploader');

    console.log('✅ Test 16 Passed: Uploader is strictly blocked from deleting drops and exporting playlist JSON');
  }

  // Test 17: Main Head retains full permissions (all 3 modes, export, delete)
  {
    const { sandbox, elements } = createMockEnvironment();
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    const AdminApp = sandbox.window.AdminApp;

    AdminApp.quickLoginAsmit();

    // Verify all tabs and buttons visible
    if (elements['eyesModeTab'].style.display !== 'flex') throw new Error('Test 17 failed: eyesModeTab not flex for admin');
    if (elements['exportBtn'].style.display !== 'inline-flex') throw new Error('Test 17 failed: exportBtn not inline-flex for admin');
    if (elements['settingsNavBtn'].style.display !== 'inline-flex') throw new Error('Test 17 failed: settingsNavBtn not inline-flex for admin');
    if (elements['teamNavBtn'].style.display !== 'inline-flex') throw new Error('Test 17 failed: teamNavBtn not inline-flex for admin');

    // Can switch to all 3 modes
    AdminApp.setMode('frames');
    if (AdminApp.currentMode !== 'frames') throw new Error('Test 17 failed: admin cannot switch to frames');

    AdminApp.setMode('eyes');
    if (AdminApp.currentMode !== 'eyes') throw new Error('Test 17 failed: admin cannot switch to eyes');

    AdminApp.setMode('dialogue');
    if (AdminApp.currentMode !== 'dialogue') throw new Error('Test 17 failed: admin cannot switch to dialogue');

    console.log('✅ Test 17 Passed: 👑 Main Head has 100% full access to all 3 game modes, export JSON, settings & team');
  }

  console.log('\n🎉 ALL 17 PERMISSION, AUTH & USER MANAGEMENT TESTS PASSED 100%!');
}

runTests().catch(err => {
  console.error('\n❌ TEST RUNNER FAILED:', err);
  process.exit(1);
});
