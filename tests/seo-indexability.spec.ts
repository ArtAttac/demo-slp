import { expect, test } from '@playwright/test';

test.describe('public route indexability', () => {
  for (const route of ['/milestone-checker', '/workshops']) {
    test(`${route} is indexable with a canonical URL`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      const robots = page.locator('meta[name="robots"]');
      await expect(robots).toHaveAttribute('content', /index/);
      await expect(robots).not.toHaveAttribute('content', /noindex/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://speechontheslope.com${route}`,
      );
    });
  }

  test('sitemap lists both public routes', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();
    const sitemap = await response.text();
    expect(sitemap).toContain('<loc>https://speechontheslope.com/milestone-checker</loc>');
    expect(sitemap).toContain('<loc>https://speechontheslope.com/workshops</loc>');
  });

  test('robots allows public pages and advertises the sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBeTruthy();
    const robots = await response.text();
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('Sitemap: https://speechontheslope.com/sitemap.xml');
  });

  test('RSS remains a valid crawlable feed', async ({ request }) => {
    const response = await request.get('/blog/rss.xml');
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/rss+xml');
    expect(await response.text()).toContain('<rss version="2.0">');
  });
});
