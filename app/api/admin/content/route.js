import { NextResponse } from 'next/server';
import { getContent, updateContent } from '@/lib/content';
import { verifySessionToken } from '@/lib/auth';

async function requireAuth(request) {
  const token = request.cookies.get('admin_session')?.value;
  if (!token) return false;
  return Boolean(await verifySessionToken(token));
}

export async function GET(request) {
  if (!(await requireAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(getContent());
}

export async function PATCH(request) {
  if (!(await requireAuth(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const patch = await request.json();
  const next = updateContent(patch);
  return NextResponse.json(next);
}
