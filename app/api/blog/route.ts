import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { redis, BlogPost } from '@/lib/redis';
import { getAbsoluteUrl } from '@/lib/blog';
import { pingIndexNow } from '@/lib/indexnow';

// URLs to notify on any blog mutation: the post itself + the index + the
// sitemap (so search engines re-pull the list of all posts).
function urlsToPing(slug: string): string[] {
  return [
    getAbsoluteUrl(`/blog/${slug}`),
    getAbsoluteUrl('/blog'),
    getAbsoluteUrl('/sitemap.xml'),
  ];
}

export async function GET() {
  const slugs = await redis.lrange('blog:slugs', 0, -1);
  if (!slugs || slugs.length === 0) {
    return NextResponse.json([]);
  }

  const posts: BlogPost[] = [];
  for (const slug of slugs) {
    const post = await redis.get<BlogPost>(`blog:post:${slug}`);
    if (post) posts.push(post);
  }

  posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const { title, body, imageUrl, editKey } = await request.json();

  if (!process.env.BLOG_EDIT_KEY) {
    console.error('BLOG_EDIT_KEY environment variable is not set');
    return NextResponse.json({ error: 'Blog edit key not configured on server.' }, { status: 500 });
  }

  if (editKey !== process.env.BLOG_EDIT_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!title || !body) {
    return NextResponse.json({ error: 'Title and body are required.' }, { status: 400 });
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const post: BlogPost = {
    slug,
    title,
    body,
    ...(imageUrl && { imageUrl }), // Only include if provided
    createdAt: new Date().toISOString(),
  };

  await redis.set(`blog:post:${slug}`, post);
  await redis.lpush('blog:slugs', slug);

  await pingIndexNow(urlsToPing(slug));

  return NextResponse.json(post, { status: 201 });
}

export async function PUT(request: Request) {
  const { slug, title, body, imageUrl, editKey } = await request.json();

  if (!process.env.BLOG_EDIT_KEY) {
    console.error('BLOG_EDIT_KEY environment variable is not set');
    return NextResponse.json({ error: 'Blog edit key not configured on server.' }, { status: 500 });
  }

  if (editKey !== process.env.BLOG_EDIT_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!slug || !title || !body) {
    return NextResponse.json({ error: 'Slug, title, and body are required.' }, { status: 400 });
  }

  const existing = await redis.get<BlogPost>(`blog:post:${slug}`);
  if (!existing) {
    return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  }

  const updatedPost: BlogPost = {
    slug,
    title,
    body,
    ...(imageUrl ? { imageUrl } : {}), // Clear imageUrl if not provided
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };

  await redis.set(`blog:post:${slug}`, updatedPost);

  await pingIndexNow(urlsToPing(slug));

  return NextResponse.json(updatedPost);
}

export async function DELETE(request: Request) {
  const { slug, editKey } = await request.json();

  if (editKey !== process.env.BLOG_EDIT_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required.' }, { status: 400 });
  }

  // Delete the featured image from Vercel Blob before removing the post record
  const post = await redis.get<BlogPost>(`blog:post:${slug}`);
  if (post?.imageUrl) {
    await del(post.imageUrl).catch((err) =>
      console.warn(`Could not delete blob for post "${slug}":`, err)
    );
  }

  await redis.del(`blog:post:${slug}`);
  await redis.lrem('blog:slugs', 0, slug);

  await pingIndexNow(urlsToPing(slug));

  return NextResponse.json({ success: true });
}
