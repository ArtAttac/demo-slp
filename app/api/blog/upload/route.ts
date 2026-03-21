/**
 * POST /api/blog/upload
 *
 * Uploads a blog featured image to Vercel Blob.
 * Requires the BLOG_EDIT_KEY to prevent unauthorized uploads.
 *
 * Request: multipart/form-data
 *   - editKey  {string}  The blog edit key (same one used to publish posts)
 *   - image    {File}    The image file to upload
 *
 * Response 201: { url: string }  — the public Vercel Blob URL
 * Response 400: { error: string } — validation failure
 * Response 401: { error: string } — wrong edit key
 * Response 500: { error: string } — server misconfiguration
 *
 * Accepted formats: JPEG, PNG, WebP, GIF
 * Max size: 5 MB
 */

import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  if (!process.env.BLOG_EDIT_KEY) {
    console.error('BLOG_EDIT_KEY environment variable is not set');
    return NextResponse.json({ error: 'Blog edit key not configured on server.' }, { status: 500 });
  }

  const formData = await request.formData();
  const editKey = formData.get('editKey') as string | null;
  const file = formData.get('image') as File | null;

  if (editKey !== process.env.BLOG_EDIT_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!file) {
    return NextResponse.json({ error: 'No image file provided.' }, { status: 400 });
  }

  if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'Invalid file type. Please use JPEG, PNG, WebP, or GIF.' },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json({ error: 'Image must be under 5 MB.' }, { status: 400 });
  }

  // Sanitise the filename so it's safe to use in a URL path
  const safeName = file.name.replace(/[^a-z0-9.\-_]/gi, '_');
  const blobPath = `blog-images/${Date.now()}-${safeName}`;

  const blob = await put(blobPath, file, { access: 'public' });

  return NextResponse.json({ url: blob.url }, { status: 201 });
}
