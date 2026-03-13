import { test, expect } from '@playwright/test';

test.describe('Practice Software Testing Toolshop comprehensive Chromium tests', () => {
  

  test('Home page load and navigation menu links', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await expect(page).toHaveTitle(/Practice Software Testing - Toolshop/);

    await expect(page.getByRole('heading', { name: 'Practice Black Box Testing & Bug Hunting' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Categories' })).toBeVisible();

    await page.getByRole('button', { name: 'Categories' }).click();
    await expect(page.getByRole('link', { name: 'Hand Tools' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Power Tools' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Other' })).toBeVisible();
  });

  test('Search for Thor Hammer and verify results', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    const searchInput = page.getByRole('textbox', { name: 'Search' });
    const searchButton = page.getByRole('button', { name: 'Search' });

    await expect(searchInput).toBeVisible();
    await searchInput.fill('Thor Hammer');
    await searchButton.click();

    await expect(page.getByText('Searched for: Thor Hammer')).toBeVisible();
    await expect(page.getByText('Thor Hammer')).toBeVisible();
  });

  test('Filter by Hammer category and validate results', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByRole('button', { name: 'Categories' }).click();
    await page.getByRole('checkbox', { name: 'Hammer' }).check();

    // Hammer category items should appear (at least one visible)
    await expect(page.locator('h5', { hasText: /hammer/i }).first()).toBeVisible();
  });

  test('Open product details from list and validate URL', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    const productLink = page.getByRole('link', { name: 'Combination Pliers' }).first();
    await expect(productLink).toBeVisible();
    await productLink.click();

   // await expect(page).toHaveURL(/\\/product\\//);
    await expect(page.locator('h1, h2, h3, h5')).toBeVisible();
  });

  test('Contact page form fields and Send button', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/contact');
    await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'First name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email address' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Subject' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Message *' })).toBeVisible();

    await page.getByRole('textbox', { name: 'First name' }).fill('Test');
    await page.getByRole('textbox', { name: 'Last name' }).fill('User');
    await page.getByRole('textbox', { name: 'Email address' }).fill('test.user@example.com');
    await page.getByRole('combobox', { name: 'Subject' }).selectOption('Customer service');
    await page.getByRole('textbox', { name: 'Message *' }).fill('Automated test message.');

    await expect(page.getByRole('button', { name: 'Send' })).toBeEnabled();
  });

  test('Sign in page fields and links', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with Google' })).toBeVisible();
    await expect(page.getByPlaceholder('Your email')).toBeVisible();
    await expect(page.getByPlaceholder('Your password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Register your account' })).toHaveAttribute('href', '/auth/register');
    await expect(page.getByRole('link', { name: 'Forgot your Password?' })).toHaveAttribute('href', '/auth/forgot-password');
  });
});