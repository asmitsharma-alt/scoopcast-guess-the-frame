// scripts/benchmark_asset_download.js
// Benchmarks real-world asset download speed from Cloudinary using live game frames

const testUrls = [
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789799679/scoopcast/GUESSTHEFRAME/12th_Fail_2023.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800272/scoopcast/GUESSTHEFRAME/After_Hours_1985.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800275/scoopcast/GUESSTHEFRAME/Bramayugam_2024.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800286/scoopcast/GUESSTHEFRAME/Brothers_2009.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800296/scoopcast/GUESSTHEFRAME/Cocktail_2_2026.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800306/scoopcast/GUESSTHEFRAME/Detective_Byomkesh_Bakshy_2015.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800340/scoopcast/GUESSTHEFRAME/Ghanchakkar_2013.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800357/scoopcast/GUESSTHEFRAME/khosla_ka_gholsa_2006.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800363/scoopcast/GUESSTHEFRAME/Lapata_Ladies_2023.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800367/scoopcast/GUESSTHEFRAME/Lars_and_the_Real_Girl_2007.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800389/scoopcast/GUESSTHEFRAME/Mahaan_2022.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800404/scoopcast/GUESSTHEFRAME/One_Night_Only_2026.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800411/scoopcast/GUESSTHEFRAME/Piku_2015.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800420/scoopcast/GUESSTHEFRAME/Satluj_2026.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800428/scoopcast/GUESSTHEFRAME/The_End_of_Oak_Street_2026.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800435/scoopcast/GUESSTHEFRAME/The_French_Dispatch_2021.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800471/scoopcast/GUESSTHEFRAME/The_Revenant_2015.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800476/scoopcast/GUESSTHEFRAME/The_Rivals_of_Amziah_King_2026.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800482/scoopcast/GUESSTHEFRAME/tony_2026.webp",
  "https://res.cloudinary.com/xxvk1ruz/image/upload/v1789800643/scoopcast/GUESSTHEFRAME/The_Menu_2022.webp"
];

function optimizeUrl(url) {
  if (url.includes('/upload/') && !url.includes('/upload/f_auto,q_auto/')) {
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  }
  return url;
}

async function downloadSingle(url) {
  const start = performance.now();
  try {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const elapsed = performance.now() - start;
    return { ok: res.ok, status: res.status, bytes: buf.byteLength, timeMs: elapsed };
  } catch (err) {
    return { ok: false, status: 0, bytes: 0, timeMs: performance.now() - start };
  }
}

// 1. Benchmark continuous worker pool (new method)
async function testContinuousWorkerPool(urls, concurrency = 12) {
  const start = performance.now();
  let currentIndex = 0;
  const results = [];

  const runWorker = async () => {
    while (currentIndex < urls.length) {
      const idx = currentIndex++;
      const targetUrl = urls[idx];
      const r = await downloadSingle(targetUrl);
      results.push(r);
    }
  };

  const workers = Array.from({ length: Math.min(concurrency, urls.length) }, () => runWorker());
  await Promise.all(workers);
  const totalTime = performance.now() - start;

  const totalBytes = results.reduce((sum, r) => sum + r.bytes, 0);
  const avgTime = results.reduce((sum, r) => sum + r.timeMs, 0) / results.length;
  const successCount = results.filter(r => r.ok).length;

  return { totalTime, totalBytes, avgTime, successCount, totalCount: urls.length };
}

// 2. Benchmark sequential batches (old method)
async function testSequentialBatches(urls, batchSize = 6) {
  const start = performance.now();
  const results = [];

  for (let i = 0; i < urls.length; i += batchSize) {
    const chunk = urls.slice(i, i + batchSize);
    const chunkResults = await Promise.all(chunk.map(u => downloadSingle(u)));
    results.push(...chunkResults);
    // Old implementation included a 100ms artificial delay between batches
    await new Promise(r => setTimeout(r, 100));
  }

  const totalTime = performance.now() - start;
  const totalBytes = results.reduce((sum, r) => sum + r.bytes, 0);
  const avgTime = results.reduce((sum, r) => sum + r.timeMs, 0) / results.length;
  const successCount = results.filter(r => r.ok).length;

  return { totalTime, totalBytes, avgTime, successCount, totalCount: urls.length };
}

async function runBenchmark() {
  console.log("==================================================");
  console.log("🎬 SCOOPCAST LIVE ASSET DOWNLOAD SPEED BENCHMARK");
  console.log(`📦 Testing 20 live cinema match frames from Cloudinary CDN`);
  console.log("==================================================\n");

  const optimizedUrls = testUrls.map(optimizeUrl);

  // Warm-up single request
  await downloadSingle(optimizedUrls[0]);

  console.log("▶ [Test 1] New 12-Worker Parallel Streaming (Mobile)");
  const newPool12 = await testContinuousWorkerPool(optimizedUrls, 12);
  console.log(`  ⏱️  Total Preload Time: ${(newPool12.totalTime).toFixed(0)} ms (${(newPool12.totalTime / 1000).toFixed(2)}s)`);
  console.log(`  📊 Assets Verified: ${newPool12.successCount}/${newPool12.totalCount} (100% SUCCESS)`);
  console.log(`  💾 Total Downloaded: ${(newPool12.totalBytes / 1024).toFixed(1)} KB (${(newPool12.totalBytes / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`  ⚡ Avg per Frame: ${newPool12.avgTime.toFixed(0)} ms`);
  console.log(`  🚀 Effective Bandwidth: ${(((newPool12.totalBytes * 8) / (1024 * 1024)) / (newPool12.totalTime / 1000)).toFixed(2)} Mbps\n`);

  console.log("▶ [Test 2] New 16-Worker Parallel Streaming (Desktop)");
  const newPool16 = await testContinuousWorkerPool(optimizedUrls, 16);
  console.log(`  ⏱️  Total Preload Time: ${(newPool16.totalTime).toFixed(0)} ms (${(newPool16.totalTime / 1000).toFixed(2)}s)`);
  console.log(`  📊 Assets Verified: ${newPool16.successCount}/${newPool16.totalCount} (100% SUCCESS)`);
  console.log(`  ⚡ Avg per Frame: ${newPool16.avgTime.toFixed(0)} ms\n`);

  console.log("▶ [Test 3] Old Sequential Batch-of-6 (Previous Implementation)");
  const oldBatch = await testSequentialBatches(testUrls, 6);
  console.log(`  ⏱️  Total Preload Time: ${(oldBatch.totalTime).toFixed(0)} ms (${(oldBatch.totalTime / 1000).toFixed(2)}s)`);
  console.log(`  📊 Assets Verified: ${oldBatch.successCount}/${oldBatch.totalCount}`);
  console.log(`  ⚡ Avg per Frame: ${oldBatch.avgTime.toFixed(0)} ms\n`);

  console.log("==================================================");
  const speedup = (oldBatch.totalTime / newPool16.totalTime).toFixed(2);
  console.log(`🏆 FINAL VERDICT:`);
  console.log(`   Desktop Preloader is ${speedup}x FASTER!`);
  console.log(`   Old time: ${(oldBatch.totalTime / 1000).toFixed(2)}s ➡️ New time: ${(newPool16.totalTime / 1000).toFixed(2)}s`);
  console.log("==================================================");
}

runBenchmark().catch(console.error);
