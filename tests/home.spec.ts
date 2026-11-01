import { test, expect } from '@playwright/test';
const routes = [ ['home','/'], ['seo','/seo-services/'], ['ppc','/ppc/'], ['web-design','/website-design/'], ['web-development','/web-development/'], ['website-support','/website-support/'], ['contact','/contact/'] ] as const;
const evidence = '/home/moose/web-factory/projects/cyberize-poc/WBM/EVIDENCE/engineering';
for (const [stem, route] of routes) {
 test(`${stem}: route, content, navigation and canonical capture`, async ({ page }, info) => {
  const response = await page.goto(route); expect(response?.status()).toBe(200);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll(imgs => Promise.all(imgs.map(img => (img as HTMLImageElement).decode().catch(() => {}))));
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('footer')).toContainText('Provisional');
  for (const [, href] of routes) await expect(page.locator(`footer a[href="${href}"]`).first()).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(await page.locator('form, a[href^="mailto:"]').count()).toBe(0);
  const bad = await page.locator('a[href]').evaluateAll(links => links.map(a => a.getAttribute('href') || '').filter(h => h.includes('.html'))); expect(bad).toEqual([]);
  await page.screenshot({ path: `${evidence}/screenshots/${stem}-${info.project.name}.png`, fullPage:true });
 });
}
test('404, menu keyboard and FAQ', async ({page}, info) => {
 const response = await page.goto('/not-a-real-page/'); expect(response?.status()).toBe(404); await expect(page.getByRole('heading',{name:'Page not found'})).toBeVisible();
 await page.goto('/website-design/');
 const mobile=page.locator('.mobile-toggle'), services=page.getByRole('button',{name:/Services/});
 if (info.project.name==='mobile') await mobile.click();
 await services.click(); await expect(services).toHaveAttribute('aria-expanded','true'); await expect(page.locator('#service-links a')).toHaveCount(5);
 await page.keyboard.press('Escape'); await expect(services).toBeFocused(); await expect(services).toHaveAttribute('aria-expanded','false');
 if (info.project.name==='mobile') { await page.keyboard.press('Escape'); await expect(mobile).toBeFocused(); }
 const details=page.locator('main details'); await expect(details).toHaveCount(5);
 await details.nth(0).locator('summary').click(); await details.nth(1).locator('summary').click(); await expect(details.nth(0)).toHaveAttribute('open',''); await expect(details.nth(1)).toHaveAttribute('open','');
 await page.screenshot({path:`${evidence}/screenshots/faq-expanded-${info.project.name}.png`,fullPage:true});
});
test('image fallback retains accessible label and dimensions', async ({page}) => {
 await page.route('**/agency-connected.svg', route => route.abort()); await page.goto('/');
 const fallback=page.locator('main .image-fallback'); await expect(fallback).toHaveCount(1); await expect(fallback).toHaveAttribute('role','img'); await expect(fallback).toHaveAttribute('aria-label', /design and development/i);
});
