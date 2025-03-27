const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium-min");

// test code locally
// const browser = await puppeteer.launch({
//     executablePath:
//       "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
//     headless: false,
//     defaultViewport: {
//       width: 1280,
//       height: 720,
//     },
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });

async function checkIn() {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      "https://zen-hr.s3.us-east-1.amazonaws.com/chromium-v122.0.0-pack.tar"
    ),
    headless: chromium.headless,
  });
  const page = await browser.newPage();

  console.log("🌍 Navigating to ZenHR login...");
  await page.goto("https://app.zenhr.com/en/users/sign_in", {
    waitUntil: "domcontentloaded",
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  await page.waitForSelector("#user_login");
  await page.type("#user_login", "h.abdulmanan@rewaatech.com");
  await page.type('input[name="user[password]"]', "Iamstudentofpucit12;");

  await delay(2000);
  await page.click('button[type="submit"]');

  await page.waitForSelector('button[name="action_type"]', { timeout: 30000 });
  const buttons = await page.$$('button[name="action_type"]');
  
  console.log("⏳ Waiting for 5 seconds...");
  await delay(10000);
  console.log("✅ Continuing...");
  await buttons[0].click();

  await delay(3000);
  await page.waitForSelector('button[name="commit"]', { timeout: 30000 });
  const buttonProceed = await page.$$('button[name="commit"]');
  await buttonProceed[0].click();

  await delay(3000);

  console.log("✅ Check-Out completed!");
  await browser.close();

  return "Check-in completed!";
}

async function checkOut() {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      "https://zen-hr.s3.us-east-1.amazonaws.com/chromium-v122.0.0-pack.tar"
    ),
    headless: chromium.headless,
  });
  const page = await browser.newPage();

  console.log("🌍 Navigating to ZenHR login...");
  await page.goto("https://app.zenhr.com/en/users/sign_in", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector("#user_login");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  await page.type("#user_login", "h.abdulmanan@rewaatech.com");
  await page.type('input[name="user[password]"]', "Iamstudentofpucit12;");

  delay(2000);
  await page.click('button[type="submit"]');

  await page.waitForSelector('button[name="action_type"]', { timeout: 30000 });
  const buttons = await page.$$('button[name="action_type"]');


  console.log("⏳ Waiting for 5 seconds...");
  await delay(10000);
  console.log("✅ Continuing...");
  await buttons[1].click();

  await delay(3000);
  await page.waitForSelector('button[name="commit"]', { timeout: 30000 });
  const buttonProceed = await page.$$('button[name="commit"]');
  await buttonProceed[0].click();

  await delay(3000);

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
