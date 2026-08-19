/* Screenshot the docs site with headless Chromium for visual verification. */
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const shots = [
    { url: 'http://localhost:5199/#/avatar', w: 1728, h: 1200, out: '/tmp/ume-figma/site-desktop.png', full: true },
    { url: 'http://localhost:5199/#/avatar', w: 390, h: 844, out: '/tmp/ume-figma/site-mobile.png', full: true },
    { url: 'http://localhost:5199/#/quickstart', w: 1728, h: 1200, out: '/tmp/ume-figma/site-quickstart.png', full: true },
  ];
  for (const s of shots) {
    const page = await browser.newPage({ viewport: { width: s.w, height: s.h } });
    await page.goto(s.url, { waitUntil: 'networkidle' });
    await page.screenshot({ path: s.out, fullPage: s.full });
    await page.close();
    console.log('saved', s.out);
  }
  await browser.close();
})();
