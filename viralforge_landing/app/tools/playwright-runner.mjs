import { exec } from 'node:child_process';

const cmd = process.env.PW_CMD || 'npx playwright test --reporter=json';
const env = {
  PLAYWRIGHT_BASE_URL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
  PLAYWRIGHT_WEB_COMMAND: process.env.PLAYWRIGHT_WEB_COMMAND || 'pnpm dev',
  ...process.env
};

exec(cmd, { env, maxBuffer: 1024*1024*50 }, (err, stdout, stderr) => {
  let json = null;
  try {
    const start = stdout.indexOf('{');
    const end   = stdout.lastIndexOf('}');
    if (start !== -1 && end !== -1) json = JSON.parse(stdout.slice(start, end+1));
  } catch {}
  const payload = {
    ok: !err,
    code: err ? (err.code ?? 1) : 0,
    json,
    stdout: json ? undefined : stdout,
    stderr
  };
  console.log(JSON.stringify(payload, null, 2));
  process.exit(payload.code);
});
