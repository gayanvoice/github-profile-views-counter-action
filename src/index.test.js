const cp = require('child_process');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  const ip = path.join(__dirname, 'index.js');
  console.log(cp.execSync(`node ${ip}`, {env: process.env}).toString());
})
