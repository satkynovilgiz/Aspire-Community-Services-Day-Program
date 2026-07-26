import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

const DATA_PATH = path.join(process.cwd(), 'data', 'site-content.json');
const KV_KEY = 'site-content';

function hasRedis() {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function readLocalFile() {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

// On Vercel, the filesystem is read-only, so content lives in Upstash Redis
// there. Locally (no Redis env vars), it falls back to the JSON file on disk.
export async function getContent() {
  if (!hasRedis()) return readLocalFile();

  const redis = Redis.fromEnv();
  const stored = await redis.get(KV_KEY);
  if (stored) return stored;

  // First run against a fresh Redis store: seed it from the repo's defaults.
  const seed = readLocalFile();
  await redis.set(KV_KEY, seed);
  return seed;
}

export async function updateContent(patch) {
  const current = await getContent();
  const next = {
    ...current,
    ...patch,
    contact: { ...current.contact, ...(patch.contact || {}) },
    director: { ...current.director, ...(patch.director || {}) },
    hero: { ...current.hero, ...(patch.hero || {}) },
    team: patch.team ?? current.team,
  };

  if (hasRedis()) {
    await Redis.fromEnv().set(KV_KEY, next);
  } else {
    fs.writeFileSync(DATA_PATH, JSON.stringify(next, null, 2) + '\n');
  }
  return next;
}
