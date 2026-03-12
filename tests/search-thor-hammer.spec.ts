// spec: generated from user scenario
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Search Thor Hammer on practicesoftwaretesting.com and verify results', () => {
  test('Open browser, search Thor Hammer, and validate result visibility', async ({ page }) => {
    // 1. Open browser and go to https://practicesoftwaretesting.com/.
    await page.goto('https://practicesoftwaretesting.com/');

    // 2. Enter "Thor Hammer" in Search field and click on Search button.
    const searchInput = page.locator('[data-test="search-query"]');
    const searchButton = page.locator('[data-test="search-submit"]');

    await expect(searchInput).toBeVisible();
    await searchInput.fill('Thor Hammer');
    await expect(searchButton).toBeVisible();
    await searchButton.click();

    // 3. Verify if Thor Hammer is in Search results
    await expect(page.getByText('Searched for: Thor Hammer')).toBeVisible();
    await expect(page.getByText('Thor Hammer')).toBeVisible();
  });
});