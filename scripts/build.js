const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'guess-the-frame-colyseus');
if (fs.existsSync(targetDir) && fs.existsSync(path.join(targetDir, 'package.json'))) {
  console.log('Building Colyseus backend in guess-the-frame-colyseus...');
  execSync('npm install --include=dev && npm run build', { cwd: targetDir, stdio: 'inherit' });
} else {
  console.log('Static frontend deployment detected; skipping backend build.');
}
