const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PROJECT_ROOT = path.resolve(__dirname, '..');

// TMDB DNS-over-HTTPS resolver (bypasses Indian ISP DNS blocks on api.themoviedb.org)
let cachedTmdbIp = null;
let lastDohTime = 0;

async function getRealTmdbHost() {
  const now = Date.now();
  if (cachedTmdbIp && (now - lastDohTime < 300000)) {
    return cachedTmdbIp;
  }
  try {
    const res = await fetch('https://cloudflare-dns.com/dns-query?name=api.themoviedb.org&type=AAAA', {
      headers: { 'Accept': 'application/dns-json' }
    });
    const json = await res.json();
    const aaaa = json.Answer && json.Answer.find(a => a.type === 28);
    if (aaaa && aaaa.data) {
      cachedTmdbIp = aaaa.data;
      lastDohTime = now;
      return cachedTmdbIp;
    }
  } catch (e) {
    console.error('[DoH Resolution Error]:', e);
  }
  return '2600:9000:21b3:e00:c:174a:c400:93a1';
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let urlPath = '';
  try {
    urlPath = decodeURIComponent(req.url.split('?')[0]);
  } catch (e) {
    urlPath = req.url.split('?')[0];
  }

  // ── TMDB PROXY (Bypasses Indian ISP DNS poison blocks) ──
  if (urlPath.startsWith('/api/tmdb')) {
    try {
      const tmdbPath = req.url.replace(/^\/api\/tmdb/, '');
      const realIp = await getRealTmdbHost();
      const options = {
        hostname: realIp,
        port: 443,
        path: tmdbPath,
        method: req.method,
        headers: {
          'Host': 'api.themoviedb.org',
          'User-Agent': 'Mozilla/5.0',
          'Authorization': req.headers['authorization'] || ''
        },
        servername: 'api.themoviedb.org'
      };
      const proxyReq = https.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, {
          'Content-Type': proxyRes.headers['content-type'] || 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        proxyRes.pipe(res);
      });
      proxyReq.on('error', (err) => {
        console.error('[TMDB Proxy Error]:', err);
        if (!res.headersSent) res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'TMDB proxy connection failed', details: err.message }));
      });
      req.pipe(proxyReq);
      return;
    } catch (e) {
      if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
      return;
    }
  }

  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(req.headers['user-agent'] || '');

  let targetFile = '';
  if (urlPath === '/' || urlPath === '/index.html') {
    targetFile = isMobile ? 'mobile_app.html' : 'desktop_app.html';
  } else if (urlPath === '/admin' || urlPath === '/admin.html') {
    targetFile = 'admin.html';
  } else if (urlPath === '/frames' || urlPath === '/frames.html' || urlPath === '/tmdb_frames') {
    targetFile = 'frames.html';
  } else if (urlPath === '/desktop_app' || urlPath === '/desktop') {
    targetFile = 'desktop_app.html';
  } else if (urlPath === '/mobile_app' || urlPath === '/android') {
    targetFile = 'mobile_app.html';
  } else if (urlPath === '/manifest.json') {
    targetFile = 'manifest.json';
  } else {
    targetFile = urlPath.replace(/^\//, '');
    if (!path.extname(targetFile) && fs.existsSync(path.join(PROJECT_ROOT, targetFile + '.html'))) {
      targetFile += '.html';
    }
  }

  const filePath = path.join(PROJECT_ROOT, targetFile);

  const serveFile = (p) => {
    try {
      const ext = path.extname(p).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      const stream = fs.createReadStream(p);
      stream.on('error', () => {
        try { res.end(); } catch (e) {}
      });
      res.on('error', () => {
        try { stream.destroy(); } catch (e) {}
      });
      stream.pipe(res);
    } catch (e) {
      if (!res.headersSent) res.writeHead(500);
      res.end('Server error');
    }
  };

  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      serveFile(filePath);
    } else {
      const androidFallback = path.join(PROJECT_ROOT, 'android', targetFile);
      if (fs.existsSync(androidFallback) && fs.statSync(androidFallback).isFile()) {
        serveFile(androidFallback);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found: ' + urlPath);
      }
    }
  } catch (err) {
    if (!res.headersSent) res.writeHead(500);
    res.end();
  }
});

server.on('error', (err) => {
  console.error('[Frontend Server Error]:', err);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n====================================================`);
  console.log(`🚀 SCOOPCAST LOCAL SERVERS RUNNING:`);
  console.log(`👉 Admin Studio: http://localhost:${PORT}/admin`);
  console.log(`👉 Game Client:  http://localhost:${PORT}/`);
  console.log(`👉 Colyseus WS:  ws://localhost:2567`);
  console.log(`====================================================\n`);
});

// Heartbeat keeps background task active and monitors uptime
setInterval(() => {
  console.log(`[${new Date().toLocaleTimeString()}] Scoopcast server active on http://localhost:${PORT}/admin`);
}, 45000);

const logError = (type, err) => {
  const line = `[${new Date().toISOString()}] ${type}: ${err && err.stack ? err.stack : err}\n`;
  try {
    fs.appendFileSync(path.join(__dirname, 'err.log'), line);
  } catch (e) {}
  console.error(line);
};

process.on('uncaughtException', (err) => logError('UncaughtException', err));
process.on('exit', (code) => {
  console.log(`[Process Exit] Server exited with code: ${code}`);
});
process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));



