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
    'adminToast', 'toastIcon', 'toastMsg'
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
    console.log('✅ Test 4 Passed: Uploader passcode logs in as 📤 UPLOADER and hides API settings & Team management');
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

  console.log('\n🎉 ALL 12 AUTH & USER MANAGEMENT TESTS PASSED 100%!');
}

runTests().catch(err => {
  console.error('\n❌ TEST RUNNER FAILED:', err);
  process.exit(1);
});
