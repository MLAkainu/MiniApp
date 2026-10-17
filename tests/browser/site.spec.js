import { test, expect } from '@playwright/test';
for (const viewport of [{ width: 414, height: 896 }, { width: 896, height: 414 }, { width: 390, height: 844 }, { width: 1440, height: 1000 }]) {
  test(`animals and letter at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('dịu dàng');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('button', { name: 'Mở lời nhắn Mloc gửi cho Phanh' }).click();
    await expect(page.locator('#letter')).toBeVisible();
    const modal = await page.locator('#letter').boundingBox();
    expect(modal.x).toBeGreaterThanOrEqual(0);
    expect(modal.y).toBeGreaterThanOrEqual(0);
    expect(modal.x + modal.width).toBeLessThanOrEqual(viewport.width);
    expect(modal.y + modal.height).toBeLessThanOrEqual(viewport.height);
    await page.getByRole('button', { name: 'Mình nhận được rồi' }).click();
    await expect(page.locator('#letter')).not.toBeVisible();
    await page.getByRole('button', { name: 'Vuốt ve thỏ trắng' }).click();
    await expect(page.locator('.animal-message')).toContainText('chúc phanh');
    await page.getByRole('button', { name: 'Vuốt ve mèo trắng' }).click();
    await expect(page.locator('.animal-message')).toContainText('Meo');
    await expect(page.locator('.little-things, .share-section, #qr-dialog')).toHaveCount(0);
    await page.screenshot({ path: `/tmp/miniapp-${viewport.width}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}
