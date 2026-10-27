import type { MetadataRoute } from 'next';
import { getAbsoluteUrl } from '@/lib/blog';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      // Explicitly welcome the major search bots so nothing in a future
      // wildcard rule accidentally blocks them.
      { userAgent: 'Googlebot', allow: '/', disallow: '/api/' },
      { userAgent: 'Googlebot-Image', allow: '/', disallow: '/api/' },
      { userAgent: 'Bingbot', allow: '/', disallow: '/api/' },
      // AI search and assistant crawlers (ChatGPT, Claude, Perplexity, Gemini,
      // Apple) so the site can be found and cited in AI answers.
      {
        userAgent: [
          'OAI-SearchBot',
          'ChatGPT-User',
          'GPTBot',
          'Claude-SearchBot',
          'Claude-User',
          'ClaudeBot',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'Applebot',
          'Applebot-Extended',
        ],
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: getAbsoluteUrl('/sitemap.xml'),
    host: getAbsoluteUrl(),
  };
}
