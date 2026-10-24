const { CATALOG } = require('../guess-the-frame-colyseus/dist/data/catalog');
const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.resolve(__dirname, '..');

let missing = 0;
let totalFrames = 0;

for (const item of CATALOG) {
  if (item.category === 'frames') {
    totalFrames++;
    const decodedPath = decodeURIComponent(item.content);
    const fullPath = path.join(ROOT_DIR, decodedPath);
    if (!fs.existsSync(fullPath)) {
      console.error(`Missing file on disk: ${fullPath} (Item ID: ${item.id})`);
      missing++;
    }
  }
}

console.log(`Total Frame Items Checked: ${totalFrames}`);
console.log(`Missing Files: ${missing}`);

if (missing === 0) {
  console.log("✅ All frame files exist on disk with 100% integrity!");
} else {
  process.exit(1);
}
