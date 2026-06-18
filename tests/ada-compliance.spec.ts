import { test, expect, type Page } from '@playwright/test';

// Helper: calculate relative luminance from an RGB color string like "rgb(23, 30, 93)"
function relativeLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(lum1: number, lum2: number): number {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseRgb(color: string): [number, number, number] {
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) throw new Error(`Cannot parse color: ${color}`);
  return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
}

// ─── Test 1: Contrast ratio — "Learn More" button (HeroSection) ──────────────
test('1. Learn More button meets minimum contrast ratio on hover (brand-darkBlue bg)', async ({ page }) => {
  await page.goto('/');

  const learnMoreBtn = page.locator('a[href="#get-started"]', { hasText: 'Learn More' }).first();
  await expect(learnMoreBtn).toBeVisible();

  // Simulate hover state by evaluating computed styles after hover
  await learnMoreBtn.hover();
  await page.waitForTimeout(400); // let CSS transition complete

  const colors = await learnMoreBtn.evaluate((el) => {
    const styles = window.getComputedStyle(el);
    return {
      bg: styles.backgroundColor,
      fg: styles.color,
    };
  });

  const [bgR, bgG, bgB] = parseRgb(colors.bg);
  const [fgR, fgG, fgB] = parseRgb(colors.fg);

  const bgLum = relativeLuminance(bgR, bgG, bgB);
  const fgLum = relativeLuminance(fgR, fgG, fgB);
  const ratio = contrastRatio(bgLum, fgLum);

  console.log(`  Hover BG: ${colors.bg} | FG: ${colors.fg} | Contrast ratio: ${ratio.toFixed(2)}:1`);

  // WCAG AA requires 4.5:1 for normal text, 3:1 for large text (bold ≥18.67px or ≥14pt)
  // The button uses font-semibold (px-8 py-4), likely large text — minimum is 3:1
  // We test against the stricter 4.5:1 threshold
  expect(ratio, `Expected contrast ratio ≥ 4.5:1, got ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5);
});

// ─── Test 2: Landmark — "NOW ACCEPTING NEW CLIENTS" is inside a landmark ─────
test('2. AnnouncementBar copy is contained within a landmark element', async ({ page }) => {
  await page.goto('/');

  const announcementText = page.locator('text=Now accepting new clients');
  await expect(announcementText).toBeVisible();

  // Walk up the DOM to find a landmark ancestor
  const inLandmark = await announcementText.evaluate((el) => {
    const landmarks = ['header', 'nav', 'main', 'aside', 'footer', 'section', 'article', 'form'];
    const landmarkRoles = ['banner', 'navigation', 'main', 'complementary', 'contentinfo', 'region', 'search', 'form'];

    let node: Element | null = el;
    while (node) {
      const tag = node.tagName.toLowerCase();
      const role = node.getAttribute('role');
      if (landmarks.includes(tag)) return { found: true, element: tag };
      if (role && landmarkRoles.includes(role)) return { found: true, element: `[role="${role}"]` };
      node = node.parentElement;
    }
    return { found: false, element: null };
  });

  console.log(`  Landmark ancestor: ${inLandmark.found ? inLandmark.element : 'NONE FOUND'}`);

  expect(
    inLandmark.found,
    `"Now accepting new clients" is NOT inside any landmark element. Found: ${inLandmark.element}`
  ).toBe(true);
});

// ─── Test 3: Scrollable content keyboard accessibility ────────────────────────
test('3. Scrollable service card content (.service-card-scroll) is keyboard accessible', async ({ page }) => {
  await page.goto('/');

  // Find and flip the "Community Events + Workshops" card (front face only)
  const cardFront = page.locator('h3', { hasText: 'Community Events + Workshops' }).first();
  await cardFront.scrollIntoViewIfNeeded();
  await cardFront.click();
  await page.waitForTimeout(700); // allow flip animation

  // The scrollable div should now be visible
  const scrollableEl = page.locator('.service-card-scroll').first();
  await expect(scrollableEl).toBeVisible();

  // A scrollable region that is not interactive (no interactive child) must have tabindex="0"
  // to be reachable by keyboard per WCAG 2.1 SC 2.1.1
  const tabIndex = await scrollableEl.evaluate((el) => el.getAttribute('tabindex'));
  const tagName = await scrollableEl.evaluate((el) => el.tagName.toLowerCase());

  console.log(`  .service-card-scroll tag: <${tagName}>, tabindex: ${tabIndex ?? 'not set'}`);

  // Scrollable elements with overflow:auto/scroll need tabindex="0" unless they contain focusable children
  const hasFocusableChild = await scrollableEl.evaluate((el) => {
    const focusable = el.querySelectorAll('a, button, input, select, textarea, [tabindex]');
    return focusable.length > 0;
  });

  if (!hasFocusableChild) {
    expect(
      tabIndex,
      '.service-card-scroll has overflow:auto but no tabindex="0" — keyboard users cannot scroll it'
    ).toBe('0');
  } else {
    console.log('  Has focusable children — tabindex not required on container');
  }
});

// ─── Test 4: Mobile menu toggle button has an accessible name ─────────────────
test('4. Mobile menu toggle button (Navigation.tsx line 65) has an accessible name', async ({ page }) => {
  // Use a mobile viewport to make the hamburger button visible
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  // The button wraps only an SVG with no text — it needs aria-label or title
  const menuBtn = page.locator('header button').filter({
    has: page.locator('svg'),
  }).first();

  await expect(menuBtn).toBeVisible();

  const accessibleName = await menuBtn.evaluate((el) => {
    // getComputedAccessibleName equivalent: check aria-label, aria-labelledby, title, and inner text
    const ariaLabel = el.getAttribute('aria-label');
    const ariaLabelledBy = el.getAttribute('aria-labelledby');
    const title = el.querySelector('title')?.textContent ?? el.getAttribute('title');
    const innerText = el.textContent?.trim();
    return { ariaLabel, ariaLabelledBy, title, innerText };
  });

  console.log(`  aria-label: ${accessibleName.ariaLabel}`);
  console.log(`  aria-labelledby: ${accessibleName.ariaLabelledBy}`);
  console.log(`  title: ${accessibleName.title}`);
  console.log(`  innerText: "${accessibleName.innerText}"`);

  const hasAccessibleName =
    !!accessibleName.ariaLabel ||
    !!accessibleName.ariaLabelledBy ||
    !!accessibleName.title ||
    (!!accessibleName.innerText && accessibleName.innerText.length > 0);

  expect(
    hasAccessibleName,
    'Mobile menu button has no accessible name. Add aria-label="Open menu" / aria-label="Close menu" or a visually-hidden <span>.'
  ).toBe(true);
});
