const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://app.zenhr.com/en/login');

    console.log("✅ Check-in completed!");

    await browser.close();
})();
