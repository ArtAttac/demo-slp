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
