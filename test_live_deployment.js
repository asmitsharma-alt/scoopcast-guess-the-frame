// Automated Verification Suite for Scoopcast Live Deployment
const https = require('https');
const http = require('http');

function fetchUrl(url, headers = {}, timeoutMs = 45000) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy();
      reject(new Error('Request timed out after ' + timeoutMs + 'ms: ' + url));
    });
  });
}

async function runVerification() {
  console.log('====================================================');
  console.log('🧪 LIVE PRODUCTION VERIFICATION: SCOOPCAST DEPLOYMENT');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function assertTest(name, condition, details = '') {
    total++;
    if (condition) {
      passed++;
      console.log(`  ✅ [PASS] ${name}`);
    } else {
      console.error(`  ❌ [FAIL] ${name} ${details ? '(' + details + ')' : ''}`);
    }
  }

  // ── TEST SUITE 1: Backend Health on Render ──
  console.log('▶ 1. Testing Colyseus Backend on Render...');
  try {
    const backendRes = await fetchUrl('https://guess-the-frame-colyseus.onrender.com/health');
    assertTest('Backend responds with HTTP 200', backendRes.status === 200, `Status: ${backendRes.status}`);
    const json = JSON.parse(backendRes.body);
    assertTest('Backend reports healthy status', json.status === 'healthy', JSON.stringify(json));
    assertTest('Backend game title is correct', json.game.includes('Guess The Frame'), `Game: ${json.game}`);
  } catch (err) {
    assertTest('Backend health endpoint reachable', false, err.message);
  }

  // ── TEST SUITE 2: Vercel Edge Device Routing ──
  console.log('\n▶ 2. Testing Vercel Edge Device Routing...');
  try {
    // 2a. Android User-Agent
    const androidUa = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
    const androidRes = await fetchUrl('https://scoopcast-me.vercel.app/android/', { 'User-Agent': androidUa });
    assertTest('Direct /android/ endpoint returns HTTP 200', androidRes.status === 200);
    assertTest('Android build contains interactive-widget meta tag', androidRes.body.includes('interactive-widget=resizes-content'));
    assertTest('Android build includes Live Typing Mirror element', androidRes.body.includes('liveTypingMirror') || androidRes.body.includes('typing-live-preview'));
    assertTest('Android build includes Mobile Action Dock', androidRes.body.includes('mobile-action-dock'));

    // 2b. Direct /desktop/ endpoint
    const desktopRes = await fetchUrl('https://scoopcast-me.vercel.app/desktop/');
    assertTest('Direct /desktop/ endpoint returns HTTP 200', desktopRes.status === 200);
    assertTest('Desktop build contains full cinema background styling', desktopRes.body.includes('cinema_bg.webp'));

    // 2c. Root URL routing (redirects to /desktop/ or /android/)
    const rootRes = await fetchUrl('https://scoopcast-me.vercel.app/');
    assertTest('Root URL responds with HTTP 200 or 307 redirect', rootRes.status === 200 || rootRes.status === 307, `Status: ${rootRes.status}`);
  } catch (err) {
    assertTest('Vercel routing functional', false, err.message);
  }

  // ── TEST SUITE 3: Static Asset Integrity ──
  console.log('\n▶ 3. Testing Static Assets & CDN Delivery...');
  const assetsToTest = [
    { name: 'App Logo', url: 'https://scoopcast-me.vercel.app/logo.png', expectedType: 'image/png' },
    { name: 'Avatar SVG (Aman)', url: 'https://scoopcast-me.vercel.app/avvtar/aman.svg', expectedType: 'image/svg+xml' },
    { name: 'Avatar SVG (Amish)', url: 'https://scoopcast-me.vercel.app/avvtar/amish.svg', expectedType: 'image/svg+xml' },
    { name: 'Android Stylesheet', url: 'https://scoopcast-me.vercel.app/android/css/android.css', expectedType: 'text/css' },
    { name: 'Android Haptics Script', url: 'https://scoopcast-me.vercel.app/android/js/haptics.js', expectedType: 'application/javascript' },
    { name: 'Android Keyboard Script', url: 'https://scoopcast-me.vercel.app/android/js/keyboard.js', expectedType: 'application/javascript' },
    { name: 'Android PWA Manifest', url: 'https://scoopcast-me.vercel.app/android/manifest.json', expectedType: 'application/json' },
    { name: 'Movie Frame WebP', url: 'https://scoopcast-me.vercel.app/GUESSTHEFRAME/12th%20Fail%20(2023).webp', expectedType: 'image/webp' }
  ];

  for (const asset of assetsToTest) {
    try {
      const res = await fetchUrl(asset.url);
      const isOk = res.status === 200;
      const typeMatches = res.headers['content-type'] && res.headers['content-type'].includes(asset.expectedType.split('/')[1]);
      assertTest(`Asset [${asset.name}] loads with HTTP 200`, isOk && typeMatches, `Status: ${res.status}, Type: ${res.headers['content-type']}`);
    } catch (err) {
      assertTest(`Asset [${asset.name}] reachable`, false, err.message);
    }
  }

  // ── TEST SUITE 4: Live Colyseus WebSocket Matchmaking ──
  console.log('\n▶ 4. Testing Live WebSocket Connection to Render...');
  try {
    const { Client } = require('./guess-the-frame-colyseus/node_modules/colyseus.js');
    const client = new Client('wss://guess-the-frame-colyseus.onrender.com');

    console.log('  * Connecting WebSocket to Render server...');
    const room = await client.joinOrCreate('trivia_room', {
      name: 'VerificationBot',
      avatar: 'aman'
    });

    assertTest('WebSocket connects & joins room successfully', !!room.id, `Room ID: ${room.id}`);

    // Wait for initial room state sync from server
    await new Promise((resolve) => {
      if (room.state && room.state.roomCode) return resolve();
      room.onStateChange.once(() => resolve());
      setTimeout(resolve, 5000);
    });

    assertTest('Room code is generated (4 letters)', room.state && room.state.roomCode && room.state.roomCode.length === 4, `Code: ${room.state && room.state.roomCode}`);
    const myPlayer = room.state && room.state.players && room.state.players.get(room.sessionId);
    assertTest('Player registered as Host', myPlayer && myPlayer.isHost === true, `Player found: ${!!myPlayer}`);
    assertTest('Secret answer is strictly hidden in lobby', room.state && room.state.revealedAnswer === '', `revealedAnswer: "${room.state && room.state.revealedAnswer}"`);

    await room.leave();
    assertTest('Clean WebSocket disconnection', true);
  } catch (err) {
    assertTest('Live WebSocket Matchmaking', false, err.stack || err.message);
  }

  console.log('\n====================================================');
  console.log(`📊 SUMMARY: ${passed}/${total} Tests Passed (${Math.round(passed/total*100)}%)`);
  console.log('====================================================');

  if (passed === total) {
    console.log('🎉 ALL PRODUCTION SYSTEMS VERIFIED AND OPERATIONAL!');
    process.exit(0);
  } else {
    console.error('⚠️ Some tests failed. Check logs above.');
    process.exit(1);
  }
}

runVerification();
