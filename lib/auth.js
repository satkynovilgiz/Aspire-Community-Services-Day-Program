import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { Redis } from '@upstash/redis';

const encoder = new TextEncoder();
const CREDENTIALS_PATH = path.join(process.cwd(), 'data', 'admin-credentials.json');
const KV_KEY = 'admin-credentials';

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not set');
  return encoder.encode(secret);
}

function hasRedis() {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

// Credentials start out from env vars, but once the admin changes them from
// the dashboard, the override takes precedence (env vars aren't rewritable at
// runtime). On Vercel that override lives in Redis (read-only filesystem);
// locally it falls back to a JSON file on disk.
export async function getCredentials() {
  if (hasRedis()) {
    const stored = await Redis.fromEnv().get(KV_KEY);
    if (stored) return stored;
  } else {
    try {
      const raw = fs.readFileSync(CREDENTIALS_PATH, 'utf-8');
      return JSON.parse(raw);
    } catch {
      // fall through to env vars below
    }
  }
  return {
    username: process.env.ADMIN_USERNAME,
    passwordHash: process.env.ADMIN_PASSWORD_HASH,
  };
}

export async function setCredentials(patch) {
  const current = await getCredentials();
  const next = { ...current, ...patch };
  if (hasRedis()) {
    await Redis.fromEnv().set(KV_KEY, next);
  } else {
    fs.mkdirSync(path.dirname(CREDENTIALS_PATH), { recursive: true });
    fs.writeFileSync(CREDENTIALS_PATH, JSON.stringify(next, null, 2) + '\n');
  }
  return next;
}

export async function verifyCredentials(username, password) {
  const { username: expectedUser, passwordHash: expectedHash } = await getCredentials();
  if (!expectedUser || !expectedHash) return false;
  if (username !== expectedUser) return false;
  return bcrypt.compare(password, expectedHash);
}

export async function createSessionToken(username) {
  return new SignJWT({ sub: username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey());
}

export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload;
  } catch {
    return null;
  }
}
