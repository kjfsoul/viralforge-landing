export function assertRequiredEnv(keys: string[] = ['PRINTIFY_API_TOKEN']) {
  const missing = keys.filter(k => !process.env[k] || process.env[k] === '');
  if (missing.length) throw new Error(`Missing required env var(s): ${missing.join(', ')}`);
}
