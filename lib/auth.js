import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const encoder = new TextEncoder();
const CREDENTIALS_PATH = path.join(process.cwd(), 'data', 'admin-credentials.json');

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not set');
  return encoder.encode(secret);
}

// Credentials start out from env vars, but once the admin changes them from
// the dashboard, the on-disk override takes precedence (env vars aren't
// rewritable at runtime).
export function getCredentials() {
  try {
    const raw = fs.readFileSync(CREDENTIALS_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {
      username: process.env.ADMIN_USERNAME,
      passwordHash: process.env.ADMIN_PASSWORD_HASH,
    };
  }
}

export function setCredentials(patch) {
  const current = getCredentials();
  const next = { ...current, ...patch };
  fs.mkdirSync(path.dirname(CREDENTIALS_PATH), { recursive: true });
  fs.writeFileSync(CREDENTIALS_PATH, JSON.stringify(next, null, 2) + '\n');
  return next;
}

export async function verifyCredentials(username, password) {
  const { username: expectedUser, passwordHash: expectedHash } = getCredentials();
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
