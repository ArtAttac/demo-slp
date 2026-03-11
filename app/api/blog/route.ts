import { NextResponse } from 'next/server';
import { redis, BlogPost } from '@/lib/redis';

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
  const { title, body, editKey } = await request.json();

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
    createdAt: new Date().toISOString(),
  };

  await redis.set(`blog:post:${slug}`, post);
  await redis.lpush('blog:slugs', slug);

  return NextResponse.json(post, { status: 201 });
}

export async function PUT(request: Request) {
  const { slug, title, body, editKey } = await request.json();

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
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };

  await redis.set(`blog:post:${slug}`, updatedPost);

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

  await redis.del(`blog:post:${slug}`);
  await redis.lrem('blog:slugs', 0, slug);

  return NextResponse.json({ success: true });
}
