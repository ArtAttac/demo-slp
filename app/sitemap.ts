import { MetadataRoute } from 'next';
import { redis, BlogPost } from '@/lib/redis';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://speechontheslope.com';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-practices`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/patient-rights-good-faith-estimate`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-use`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamically add blog post URLs
  const slugs = await redis.lrange('blog:slugs', 0, -1);
  const blogPages: MetadataRoute.Sitemap = [];

  if (slugs && slugs.length > 0) {
    for (const slug of slugs) {
      const post = await redis.get<BlogPost>(`blog:post:${slug}`);
      if (post) {
        blogPages.push({
          url: `${baseUrl}/blog/${slug}`,
          lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.createdAt),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    }
  }

  return [...staticPages, ...blogPages];
}
