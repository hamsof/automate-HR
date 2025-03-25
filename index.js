const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium-min");

async function checkIn() {
  const browser = await chromium.launchChromium({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("🌍 Navigating to ZenHR login...");
  await page.goto("https://app.zenhr.com/en/users/sign_in", {
    waitUntil: "domcontentloaded",
  });

  await page
    .getByRole("textbox", { name: "Email" })
    .fill("h.abdulmanan@rewaatech.com");
  await page
    .getByRole("textbox", { name: "Password" })
    .fill("Iamstudentofpucit12;");
  await page.getByRole("button", { name: "Login" }).click();

  await page
    .getByRole("button", { name: "Clock-In" })
    .waitFor({ timeout: 30000 });
  await page.waitForTimeout(15000);
  await page.getByRole("button", { name: "Clock-In" }).click();
  await page
    .getByRole("button", { name: "Proceed" })
    .waitFor({ timeout: 30000 });
  await page.getByRole("button", { name: "Proceed" }).click();

  console.log("✅ Check-in completed!");
  await browser.close();

  return "Check-in completed!";
}

async function checkOut() {
  const browser = await chromium.launchChromium({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("🌍 Navigating to ZenHR login...");
  await page.goto("https://app.zenhr.com/en/users/sign_in", {
    waitUntil: "domcontentloaded",
  });

  await page
    .getByRole("textbox", { name: "Email" })
    .fill("h.abdulmanan@rewaatech.com");
  await page
    .getByRole("textbox", { name: "Password" })
    .fill("Iamstudentofpucit12;");
  await page.getByRole("button", { name: "Login" }).click();

  await page
    .getByRole("button", { name: "Clock-In" })
    .waitFor({ timeout: 30000 });
  await page.waitForTimeout(15000);
  await page.getByRole("button", { name: "Clock-Out" }).click();
  await page
    .getByRole("button", { name: "Proceed" })
    .waitFor({ timeout: 30000 });
  await page.getByRole("button", { name: "Proceed" }).click();

  console.log("✅ Check-Out completed!");
  await browser.close();

  return "Check-Out completed!";
}

exports.handler = async (event) => {
  try {
    if (event.type === "check-in") {
      return await checkIn();
    } else if (event.type === "check-out") {
      return await checkOut();
    } else {
      throw new Error("Invalid event type");
    }
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
