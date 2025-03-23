const chromium = require("@sparticuz/chromium");
const playwright = require("playwright-core");

(async () => {
  const browser = await playwright.chromium.launch({
    headless: true,
    executablePath: await chromium.executablePath(),
    args: chromium.args,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("🌍 Navigating to ZenHR login...");
  await page.goto("https://app.zenhr.com/en/users/sign_in", {
    waitUntil: "domcontentloaded",
  });

  // ✅ Wait for Email field using getByRole
  await page.getByRole("textbox", { name: "Email" }).waitFor();

  console.log("🔑 Entering login credentials...");
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("h.abdulmanan@rewaatech.com");
  await page
    .getByRole("textbox", { name: "Password" })
    .fill("Iamstudentofpucit12;");

  console.log("🚀 Logging in...");
  await page.getByRole("button", { name: "Login" }).click();

  // ✅ Wait for Clock-In button using getByRole
  await page
    .getByRole("button", { name: "Clock-In" })
    .waitFor({ timeout: 30000 });

  await page.waitForTimeout(15000);

  console.log("⏰ Checking Out...");
  await page.getByRole("button", { name: "Clock-Out" }).click();

  await page
    .getByRole("button", { name: "Proceed" })
    .waitFor({ timeout: 30000 });
  await page.getByRole("button", { name: "Proceed" }).click();

  console.log("✅ Check-in completed!");

  await browser.close();
})();
