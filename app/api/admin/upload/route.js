import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { put, del } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const ALLOWED_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request) {
  const token = request.cookies.get('admin_session')?.value;
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: 'Only JPEG, PNG, or WebP images are allowed.' }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'Image must be under 5MB.' }, { status: 400 });
  }

  const filename = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  // On Vercel the filesystem is read-only, so uploads go to Vercel Blob
  // there. Auth is via Vercel's auto-injected OIDC token; the store ID has
  // to be passed explicitly since this project's Blob store env var got a
  // non-standard name during setup (BLOB_STORE_ID_STORE_ID_STORE_ID instead
  // of the plain BLOB_STORE_ID the SDK looks for automatically).
  if (process.env.VERCEL) {
    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: file.type,
      storeId: process.env.BLOB_STORE_ID_STORE_ID_STORE_ID,
    });
    return NextResponse.json({ url: blob.url });
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  fs.mkdirSync(uploadsDir, { recursive: true });
  fs.writeFileSync(path.join(uploadsDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}

// Temporary: used once to clean up a stray test blob, then removed.
export async function DELETE(request) {
  const token = request.cookies.get('admin_session')?.value;
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { url } = await request.json();
  await del(url, { storeId: process.env.BLOB_STORE_ID_STORE_ID_STORE_ID });
  return NextResponse.json({ ok: true });
}
