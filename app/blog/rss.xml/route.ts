import { getAbsoluteUrl, getAllBlogPosts, createExcerpt, decodeHtmlEntities } from '@/lib/blog';

export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getAllBlogPosts();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Speech on the Slope Blog</title>
    <link>${getAbsoluteUrl('/blog')}</link>
    <description>Tips, insights, and resources for supporting your child&apos;s speech, language, and literacy development.</description>
    <language>en-us</language>
    ${posts
      .map((post) => {
        const title = decodeHtmlEntities(post.title);
        const description = createExcerpt(post.body, 240);
        const url = getAbsoluteUrl(`/blog/${post.slug}`);
        const pubDate = new Date(post.updatedAt ?? post.createdAt).toUTCString();

        return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
      })
      .join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
