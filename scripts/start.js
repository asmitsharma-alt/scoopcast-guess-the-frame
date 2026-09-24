const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'guess-the-frame-colyseus');
if (fs.existsSync(targetDir) && fs.existsSync(path.join(targetDir, 'package.json'))) {
  console.log('Starting Colyseus backend in guess-the-frame-colyseus...');
  execSync('npm start', { cwd: targetDir, stdio: 'inherit' });
} else {
  console.error('Error: guess-the-frame-colyseus directory not found.');
  process.exit(1);
}
