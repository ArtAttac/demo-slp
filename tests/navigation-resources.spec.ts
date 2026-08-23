import { expect, test } from '@playwright/test';

test('navbar places the milestone checker after workshops', async ({ page }) => {
  await page.goto('/');

  const navLinks = await page.locator('header nav a').evaluateAll((links) =>
    links.map((link) => ({
      href: link.getAttribute('href'),
      label: link.textContent?.trim(),
    })),
  );
  const workshopsIndex = navLinks.findIndex((link) => link.href === '/workshops');
  const milestoneIndex = navLinks.findIndex((link) => link.href === '/milestone-checker');

  expect(workshopsIndex).toBeGreaterThanOrEqual(0);
  expect(milestoneIndex).toBe(workshopsIndex + 1);
  expect(navLinks[milestoneIndex]?.label).toBe('Milestone Checker');
});

test('homepage resource popup links to the blog and milestone checker', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.removeItem('site-resources-toast-dismissed-v2');
  });
  await page.goto('/');

  const popup = page.getByRole('status');
  await expect(popup).toContainText('Helpful resources for families', { timeout: 5000 });
  await expect(popup.getByRole('link', { name: /Explore the blog/ })).toHaveAttribute('href', '/blog');
  await expect(popup.getByRole('link', { name: /Try the milestone checker/ })).toHaveAttribute('href', '/milestone-checker');
});
