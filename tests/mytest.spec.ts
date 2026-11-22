
import { test, expect } from '@playwright/test';

test('Амжилттай нэвтрэх', async ({ page }) => {
  // 1. SauceDemo сайтыг нээх
  await page.goto('https://www.saucedemo.com/');

  // 2. Зөв хэрэглэгчийн мэдээлэл оруулах
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // 3. Login товчийг дарах
  await page.getByRole('button', { name: 'Login' }).click();

  // 4. Нэвтрэлт амжилттай болсныг шалгах
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/inventory\.html/);

  // 5. Системээс гарах
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').click();

  // 6. Login хуудас руу буцсаныг шалгах
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();


});

test('Буруу нууц үгээр нэвтрэх', async ({ page }) => {
  // 1. Нэвтрэх хуудсыг нээх
  await page.goto('https://www.saucedemo.com/');

  // 2. Зөв хэрэглэгчийн нэр, буруу нууц үг оруулах
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');

  // 3. Нэвтрэхийг оролдох
  await page.getByRole('button', { name: 'Login' }).click();

  // 4. Алдааны мэдэгдэл гарсныг шалгах
  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username and password do not match');

  // 5. Нэвтрэх хуудаснаас гараагүйг баталгаажуулах
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('Барааг сагсанд нэмэх', async ({ page }) => {
  // 1. SauceDemo сайтыг нээж нэвтрэх
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // 2. Бүтээгдэхүүний хуудас нээгдсэнийг шалгах
  await expect(page).toHaveURL(/inventory\.html/);

  // 3. Sauce Labs Backpack барааг сагсанд нэмэх
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // 4. Сагсны тоо 1 болсон эсэхийг шалгах
  await expect(page.locator('[data-test="shopping-cart-badge"]'))
    .toHaveText('1');

  // 5. Сагс руу орж бараа нэмэгдсэнийг шалгах
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();


});

