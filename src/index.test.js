import { test } from '@jest/globals';
import cp from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  const ip = path.join(__dirname, 'index.js');
  console.log(cp.execSync(`node ${ip}`, {env: process.env}).toString());
})
