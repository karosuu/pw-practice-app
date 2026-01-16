import { test, expect } from '@playwright/test';

test('New User Registration', async ({ page }) => {
  await page.goto('https://app.corraldata.com');
  await expect(page.locator('#kc-header')).toContainText('CorralData');
  
})
