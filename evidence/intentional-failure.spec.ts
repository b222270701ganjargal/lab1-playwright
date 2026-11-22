
import { test, expect } from '@playwright/test';

test('Санаатай алдаа - Trace debugging', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Санаатай буруу assertion:
  // Жинхэнэ URL нь inventory.html байх ёстой.
  await expect(page).toHaveURL(/inventory-wrong\.html/, {
    timeout: 5000
  });
});
