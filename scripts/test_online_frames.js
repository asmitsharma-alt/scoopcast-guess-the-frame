// scripts/test_online_frames.js
// Tests the accessibility and response of frames in catalog and media maps

const fs = require('fs');
const path = require('path');

async function testOnlineFrames() {
  console.log("==================================================");
  console.log("🔍 TESTING ONLINE FRAME CATALOG ACCESSIBILITY");
  console.log("==================================================\n");

  // 1. Read catalog.ts to extract image frame URLs
  const catalogPath = path.resolve(__dirname, '../guess-the-frame-colyseus/src/data/catalog.ts');
  const catalogContent = fs.readFileSync(catalogPath, 'utf8');

  // Match frames: { id: "f_...", ... content: "http...", answer: "..." }
  const regex = /id:\s*["']([^"']+)["'],[\s\S]*?category:\s*["']([^"']+)["'],[\s\S]*?type:\s*["']image["'],[\s\S]*?content:\s*["']([^"']+)["'],[\s\S]*?answer:\s*["']([^"']+)["']/g;
  
  const frames = [];
  let match;
  while ((match = regex.exec(catalogContent)) !== null) {
    frames.push({
      id: match[1],
      category: match[2],
      url: match[3],
      answer: match[4]
    });
  }

  console.log(`Found ${frames.length} online image frames in catalog.`);

  // 2. Also check CLOUDINARY_MEDIA_MAP in mobileUi.js
  const mobileUiPath = path.resolve(__dirname, '../android/js/mobileUi.js');
  const mobileContent = fs.readFileSync(mobileUiPath, 'utf8');
  const mediaMapMatch = mobileContent.match(/const CLOUDINARY_MEDIA_MAP = {([\s\S]*?)};/);
  const mediaMapUrls = [];
  if (mediaMapMatch) {
    const lines = mediaMapMatch[1].split('\n');
    lines.forEach(l => {
      const urlM = l.match(/:\s*["'](https:\/\/[^"']+)["']/);
      if (urlM) mediaMapUrls.push(urlM[1]);
    });
  }
  console.log(`Found ${mediaMapUrls.length} verified CDN frames in CLOUDINARY_MEDIA_MAP.\n`);

  // 3. Test a comprehensive sample of catalog frames across various ranges
  const sampleIndices = [0, 1, 2, 3, 5, 10, 15, 20, 30, 50, 75, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 999].filter(i => i < frames.length);
  const sampleFrames = sampleIndices.map(i => frames[i]);

  console.log(`▶ Testing ${sampleFrames.length} catalog frames spanning the full catalog (f_1 to f_1000)...`);
  
  const catalogResults = [];
  for (const f of sampleFrames) {
    const t0 = performance.now();
    try {
      const res = await fetch(f.url, { method: 'HEAD' });
      const elapsed = performance.now() - t0;
      catalogResults.push({
        id: f.id,
        answer: f.answer,
        url: f.url,
        status: res.status,
        ok: res.ok,
        timeMs: elapsed
      });
      console.log(`  [${f.id}] ${f.answer} -> Status ${res.status} (${elapsed.toFixed(0)} ms)`);
    } catch (e) {
      catalogResults.push({
        id: f.id,
        answer: f.answer,
        url: f.url,
        status: 0,
        ok: false,
        timeMs: performance.now() - t0
      });
      console.log(`  [${f.id}] ${f.answer} -> ERROR: ${e.message}`);
    }
  }

  // 4. Test CLOUDINARY_MEDIA_MAP frames
  console.log(`\n▶ Testing 15 live app frames from CLOUDINARY_MEDIA_MAP...`);
  const sampleMedia = mediaMapUrls.slice(0, 15);
  const mediaResults = [];
  for (const u of sampleMedia) {
    const t0 = performance.now();
    try {
      const res = await fetch(u, { method: 'HEAD' });
      const elapsed = performance.now() - t0;
      mediaResults.push({ url: u, status: res.status, ok: res.ok, timeMs: elapsed });
      const name = u.split('/').pop();
      console.log(`  ${name} -> Status ${res.status} (${elapsed.toFixed(0)} ms)`);
    } catch (e) {
      mediaResults.push({ url: u, status: 0, ok: false, timeMs: performance.now() - t0 });
    }
  }

  console.log("\n==================================================");
  console.log("📊 SUMMARY OF ONLINE FRAMES ACCESSIBILITY");
  console.log("==================================================");
  const catOk = catalogResults.filter(r => r.ok).length;
  console.log(`Catalog Frames Sample: ${catOk}/${catalogResults.length} (${((catOk / catalogResults.length) * 100).toFixed(0)}% accessible)`);
  const medOk = mediaResults.filter(r => r.ok).length;
  console.log(`Live App Media Map: ${medOk}/${mediaResults.length} (${((medOk / mediaResults.length) * 100).toFixed(0)}% accessible)`);
  
  const avgLat = [...catalogResults, ...mediaResults].filter(r => r.ok).reduce((s, r) => s + r.timeMs, 0) / (catOk + medOk);
  console.log(`Average CDN Latency: ${avgLat.toFixed(0)} ms`);
  console.log("==================================================");
}

testOnlineFrames().catch(console.error);
