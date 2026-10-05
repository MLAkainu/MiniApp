import { test, expect } from '@playwright/test';
for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 1000 }]) {
  test(`gifts, letter and QR at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('dịu dàng');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('button', { name: 'Mở lời nhắn dành cho bạn' }).click();
    await expect(page.locator('#letter')).toBeVisible();
    await page.getByRole('button', { name: 'Mình nhận được rồi' }).click();
    await expect(page.locator('#letter')).not.toBeVisible();
    await page.locator('#wish').click();
    const firstWish = await page.locator('.gift-result').textContent();
    await page.locator('#wish').click();
    expect(await page.locator('.gift-result').textContent()).not.toBe(firstWish);
    await page.locator('#flower').click();
    await page.locator('#flower').click();
    await expect(page.locator('.gift-result')).toContainText('2 bông hoa');
    await page.locator('#hug').click();
    await expect(page.locator('.gift-result')).toContainText('ấm');
    await page.getByRole('button', { name: 'Vuốt ve mèo trắng' }).click();
    await expect(page.locator('.animal-message')).toContainText('Meo');
    await page.locator('#show-qr').click();
    await expect(page.locator('#qr-dialog')).toBeVisible();
    await expect(page.locator('#download-qr')).toHaveAttribute('href', /^data:image\/png;base64,/);
    await expect(page.locator('.qr-url')).toHaveText('http://127.0.0.1:4173/');
    await page.keyboard.press('Escape');
    await expect(page.locator('#qr-dialog')).not.toBeVisible();
    await page.screenshot({ path: `/tmp/miniapp-${viewport.width}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}
