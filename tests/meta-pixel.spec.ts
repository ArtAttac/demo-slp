import { expect, test } from '@playwright/test';

test('tracks one Meta Lead when half of the appointment calendar is visible', async ({ page }) => {
  await page.addInitScript(() => {
    const calls: unknown[][] = [];

    window.fbq = (...args: unknown[]) => {
      calls.push(args);
    };

    Object.defineProperty(window, '__metaPixelCalls', {
      value: calls,
      writable: false,
    });
  });

  const response = await page.goto('/');
  const contentSecurityPolicy = response?.headers()['content-security-policy'];

  expect(contentSecurityPolicy).toContain('https://connect.facebook.net');
  expect(contentSecurityPolicy).toContain('https://www.facebook.com');

  const leadCallCount = () =>
    page.evaluate(
      () =>
        ((window as Window & { __metaPixelCalls?: unknown[][] }).__metaPixelCalls ?? []).filter(
          ([command, eventName]) => command === 'track' && eventName === 'Lead',
        ).length,
    );

  await expect.poll(leadCallCount).toBe(0);

  const calendar = page.getByTitle('Schedule an appointment with Speech on the Slope');
  await calendar.scrollIntoViewIfNeeded();
  await expect(calendar).toBeInViewport({ ratio: 0.5 });
  await expect.poll(leadCallCount).toBe(1);

  await page.locator('#hero-section').scrollIntoViewIfNeeded();
  await calendar.scrollIntoViewIfNeeded();
  await expect(calendar).toBeInViewport({ ratio: 0.5 });
  await expect.poll(leadCallCount).toBe(1);
});
