import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { put } from '@vercel/blob';
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
  // there. Locally (no blob token), fall back to writing into public/uploads.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(filename, buffer, { access: 'public', contentType: file.type });
    return NextResponse.json({ url: blob.url });
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  fs.mkdirSync(uploadsDir, { recursive: true });
  fs.writeFileSync(path.join(uploadsDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
