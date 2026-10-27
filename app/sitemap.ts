import { MetadataRoute } from 'next';
import { getAbsoluteUrl, getAllBlogPosts, getPostLastModified } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts();
  // Use real last-edit dates for pages (bump them when a page's content changes),
  // so crawlers can trust lastModified instead of seeing every page as "updated today".
  const latestBlogUpdate = posts[0] ? new Date(getPostLastModified(posts[0])) : new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl(),
      // The homepage lists the latest posts, so it changes when the blog does.
      lastModified: latestBlogUpdate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: getAbsoluteUrl('/about'),
      lastModified: new Date('2026-08-02'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl('/services'),
      lastModified: new Date('2026-08-02'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl('/blog'),
      lastModified: latestBlogUpdate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl('/faq'),
      lastModified: new Date('2026-08-02'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl('/milestone-checker'),
      lastModified: new Date('2026-09-07'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl('/workshops'),
      lastModified: new Date('2026-10-27'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl('/privacy-practices'),
      lastModified: new Date('2026-08-02'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: getAbsoluteUrl('/patient-rights-good-faith-estimate'),
      lastModified: new Date('2026-08-02'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: getAbsoluteUrl('/disclaimer'),
      lastModified: new Date('2026-08-23'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: getAbsoluteUrl('/privacy-policy'),
      lastModified: new Date('2026-09-07'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: getAbsoluteUrl('/terms-of-use'),
      lastModified: new Date('2026-08-23'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: getAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(getPostLastModified(post)),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
