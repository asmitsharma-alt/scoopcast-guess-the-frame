// scripts/test_admin_auth.js
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('admin.html', 'utf8');

// Minimal mock DOM for testing AdminApp auth logic
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
    'userAvatarImg', 'userRoleBadge', 'settingsNavBtn', 'dropsListContainer',
    'dropsCount', 'cfgCloudName', 'cfgApiKey', 'cfgApiSecret', 'cfgTmdbToken',
    'cfgClerkKey', 'cfgPasscode', 'cfgAdminEmail', 'cfgUploaderPasscode',
    'settingsModal', 'cldStatusPill', 'assetLibHeaderCount', 'assetSubtitle',
    'catCountAll', 'catCountFrames', 'catCountEyes', 'catCountTie',
    'catCountAvvtar', 'catCountBg', 'adminToast', 'toastIcon', 'toastMsg'
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
  console.log('🧪 Running Scoopcast Admin Auth Test Suite...\n');

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
    console.log('✅ Test 1 Passed: quickLoginAsmit() grants 👑 MAIN HEAD and hides overlay immediately');
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
    console.log('✅ Test 4 Passed: Uploader passcode logs in as 📤 UPLOADER and hides API settings');
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

  console.log('\n🎉 ALL 7 AUTH INTEGRATION TESTS PASSED 100%!');
}

runTests().catch(err => {
  console.error('\n❌ TEST RUNNER FAILED:', err);
  process.exit(1);
});
