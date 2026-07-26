import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getCredentials, setCredentials, verifySessionToken } from '@/lib/auth';

async function requireAuth(request) {
  const token = request.cookies.get('admin_session')?.value;
  if (!token) return false;
  return Boolean(await verifySessionToken(token));
}

export async function PATCH(request) {
  if (!(await requireAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { currentPassword, newUsername, newPassword } = await request.json();

  if (!currentPassword) {
    return NextResponse.json({ error: 'Current password is required.' }, { status: 400 });
  }
  if (!newUsername && !newPassword) {
    return NextResponse.json({ error: 'Provide a new username or password.' }, { status: 400 });
  }
  if (newPassword && newPassword.length < 8) {
    return NextResponse.json({ error: 'New password must be at least 8 characters.' }, { status: 400 });
  }

  const { username, passwordHash } = await getCredentials();
  const valid = await bcrypt.compare(currentPassword, passwordHash);
  if (!valid) {
    return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 });
  }

  const updated = await setCredentials({
    username: newUsername || username,
    passwordHash: newPassword ? bcrypt.hashSync(newPassword, 12) : passwordHash,
  });

  return NextResponse.json({ ok: true, username: updated.username });
}
