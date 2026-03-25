import { redis, BlogPost } from '@/lib/redis';

const BASE_URL = 'https://speechontheslope.com';

export async function getBlogSlugs(): Promise<string[]> {
  const slugs = await redis.lrange('blog:slugs', 0, -1);
  return slugs ?? [];
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = await getBlogSlugs();
  if (slugs.length === 0) return [];

  const posts = await Promise.all(
    slugs.map((slug) => redis.get<BlogPost>(`blog:post:${slug}`))
  );

  return posts
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return redis.get<BlogPost>(`blog:post:${slug}`);
}

export function getPostLastModified(post: BlogPost): string {
  return post.updatedAt ?? post.createdAt;
}

export function getAbsoluteUrl(path = ''): string {
  return `${BASE_URL}${path}`;
}

export function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

export function stripMarkdown(text: string): string {
  return decodeHtmlEntities(
    text
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[`*_>#~-]/g, ' ')
      .replace(/\r?\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

export function createExcerpt(text: string, maxLength = 160): string {
  const plainText = stripMarkdown(text);
  if (plainText.length <= maxLength) return plainText;

  const truncated = plainText.slice(0, maxLength).replace(/\s+\S*$/, '').trim();
  return `${truncated}...`;
}
