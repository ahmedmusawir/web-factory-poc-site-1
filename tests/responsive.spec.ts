import { test, expect } from '@playwright/test';
const evidence='/home/moose/web-factory/projects/cyberize-poc/WBM/EVIDENCE/engineering/screenshots';
const routes=['/','/seo-services/','/ppc/','/website-design/','/web-development/','/website-support/','/contact/'];
test('breakpoints and outside interactions', async ({page}, info) => {
 for (const width of [320,768,899,900,901,1024]) {
  await page.setViewportSize({width,height:900});
  for (const route of routes) {
   await page.goto(route); expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${route} ${width}`).toBe(true);
  }
 }
 await page.setViewportSize({width:info.project.name==='mobile'?390:1440,height:900});
 await page.goto('/'); const toggle=page.locator('.mobile-toggle');
 if (info.project.name==='mobile') await toggle.click();
 const services=page.locator('.services-toggle'); await services.click();
 await page.screenshot({path:`${evidence}/menu-home-${info.project.name}.png`,fullPage:true});
 await page.locator('main').click({position:{x:5,y:5},force:true});
 await expect(services).toHaveAttribute('aria-expanded','false');
 if(info.project.name==='mobile') await expect(toggle).toHaveAttribute('aria-expanded','false');
 await page.setViewportSize({width:900,height:900}); await toggle.click(); await services.click();
 await page.setViewportSize({width:901,height:900}); await expect(services).toHaveAttribute('aria-expanded','false'); await expect(toggle).toHaveAttribute('aria-expanded','false');
});
