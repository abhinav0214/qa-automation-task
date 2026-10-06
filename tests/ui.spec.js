const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const USERNAME = process.env.DEMOQA_USER || 'Abhi1408';
const PASSWORD = process.env.DEMOQA_PASS || 'Tester@123';
const BOOK = 'Learning JavaScript Design Patterns';
const OUTPUT_FILE = path.join(__dirname, '..', 'output', 'book-details.txt');

test('Book Store: login, search book, save details, logout', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('link', { name: 'Book Store Application' }).click();
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('textbox', { name: 'UserName' }).fill(USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText(USERNAME, { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /log ?out/i })).toBeVisible();

  await page.getByRole('listitem').filter({ hasText: /^Book Store$/ }).click();
  await page.getByRole('textbox', { name: 'Type to search' }).fill(BOOK);

  const row = page.getByRole('row').filter({ hasText: BOOK });
  await expect(row).toHaveCount(1);
  const cells = row.getByRole('cell');
  const title = (await cells.nth(1).innerText()).trim();
  const author = (await cells.nth(2).innerText()).trim();
  const publisher = (await cells.nth(3).innerText()).trim();
  expect(title).toBe(BOOK);

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  const details = `Title: ${title}\nAuthor: ${author}\nPublisher: ${publisher}\n`;
  fs.writeFileSync(OUTPUT_FILE, details);
  console.log(details);

  await page.getByRole('button', { name: /log ?out/i }).click();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});
