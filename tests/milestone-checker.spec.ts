import { expect, test, type Page } from '@playwright/test';

async function startCheckIn(page: Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/milestone-checker');
  await expect(page.getByRole('heading', { name: 'Communication Milestone Check-In' })).toBeVisible();
  await page.getByLabel('I have read and understand the above.').check();
  await page.getByRole('button', { name: 'Begin the check-in' }).click();
}

async function answerMilestones(page: Page, answer = 'Yes, consistently') {
  for (let index = 0; index < 10; index += 1) {
    await expect(page.getByText(new RegExp(`Question ${index + 1} of 10`))).toBeVisible();
    await page.getByRole('radio', { name: new RegExp(`^${answer}`) }).click({ force: true });
  }
}

test.describe('public milestone check-in flow', () => {
  test('is public, advances on selection, supports keyboard selection, and updates progress', async ({ page }) => {
    await startCheckIn(page);
    await expect(page).toHaveURL('/milestone-checker');
    await expect(page.getByText('Question 1 of 10 · Understanding language')).toBeVisible();
    await expect(page.getByText(/Context question/)).toHaveCount(0);
    const guidanceCopy = 'Answer based on what you usually notice during everyday activities.';
    await expect(page.getByText(new RegExp(guidanceCopy))).toHaveCount(0);
    const guidanceButton = page.getByRole('button', { name: 'How to answer' });
    await guidanceButton.click();
    const guidanceDialog = page.getByRole('dialog', { name: 'How to answer' });
    await expect(guidanceDialog).toContainText(guidanceCopy);
    await expect(page.getByRole('button', { name: 'Close answer guidance' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(guidanceDialog).toHaveCount(0);
    await expect(guidanceButton).toBeFocused();

    await expect(page.getByRole('button', { name: 'Next question' })).toHaveCount(0);

    const firstChoice = page.getByRole('radio', { name: /^Yes, consistently/ });
    await firstChoice.focus();
    await page.keyboard.press('Space');
    await expect(page.getByText('Question 2 of 10 · Sharing words and ideas')).toBeVisible();
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByText('Question 1 of 10 · Understanding language')).toBeVisible();
    await expect(page.getByRole('radio', { name: /^Yes, consistently/ })).toBeChecked();
    await page.getByRole('radio', { name: /^Sometimes/ }).click({ force: true });
    await expect(page.getByText('Question 2 of 10 · Sharing words and ideas')).toBeVisible();
    expect(new URL(page.url()).search).toBe('');
  });

  test('shows deterministic results, valid CTA, and restart', async ({ page }) => {
    await startCheckIn(page);
    await answerMilestones(page, 'Not yet');

    await expect(page.getByRole('heading', { name: 'More information could provide clarity' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Communication strengths' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Skills that may still be emerging' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Ideas to try during everyday routines' })).toBeVisible();
    const consultation = page.getByRole('link', { name: 'Schedule a consultation' });
    await expect(consultation).toHaveAttribute('href', /^https:\/\/calendar\.google\.com\//);
    const emailBeforeAbout = await page.locator('#email-signup-heading, #about-results').evaluateAll(
      (elements) => elements.map((element) => element.id),
    );
    expect(emailBeforeAbout).toEqual(['email-signup-heading', 'about-results']);
    expect(new URL(page.url()).search).toBe('');
    await expect(page.getByRole('button', { name: 'Review my final answer' })).toHaveCount(0);

    await page.getByRole('button', { name: 'Restart the check-in' }).click();
    await expect(page.getByRole('group', { name: 'How old is your child?' })).toBeVisible();
    await expect(page.getByLabel('I have read and understand the above.')).not.toBeChecked();
  });
});
