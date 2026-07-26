import { NextResponse } from 'next/server';
import { verifyCredentials, createSessionToken } from '@/lib/auth';

export async function POST(request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
  }

  const valid = await verifyCredentials(username, password);
  if (!valid) {
    console.log('[admin-login-debug]', JSON.stringify({
      hasUsernameEnv: !!process.env.ADMIN_USERNAME,
      hasHashEnv: !!process.env.ADMIN_PASSWORD_HASH,
      hasSecretEnv: !!process.env.SESSION_SECRET,
      envUsernameLength: (process.env.ADMIN_USERNAME || '').length,
      envHashLength: (process.env.ADMIN_PASSWORD_HASH || '').length,
      envHashStartsWith: (process.env.ADMIN_PASSWORD_HASH || '').slice(0, 7),
      submittedUsername: username,
      usernameMatches: username === process.env.ADMIN_USERNAME,
    }));
    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
  }

  const token = await createSessionToken(username);
  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
