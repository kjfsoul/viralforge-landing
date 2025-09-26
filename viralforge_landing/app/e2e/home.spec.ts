import { test, expect } from '@playwright/test';

test('home shows hero H1', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { level: 1, name: /3i\/atlas/i })
  ).toBeVisible();
});

test('primary nav link is visible', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('navigation').getByRole('button', { name: 'Brands', exact: true })
  ).toBeVisible();
});
