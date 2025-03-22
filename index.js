const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://app.zenhr.com/en/users/sign_in");

  await page.goto("https://app.zenhr.com/en/users/sign_in");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("h.abdulmanan@rewaatech.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page
    .getByRole("textbox", { name: "Password" })
    .fill("Iamstudentofpucit12;");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("button", { name: "Clock-In" }).click();
  console.log("✅ Check-in completed!");

  await browser.close();
})();
