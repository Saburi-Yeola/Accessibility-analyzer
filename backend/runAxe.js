import puppeteer from "puppeteer";
import axeCore from "axe-core";

export async function runAxeScan(url) {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000
    });

    // Inject axe-core script
    await page.evaluate(axeCore.source);

    // Run axe inside the browser
    const results = await page.evaluate(async () => {
      return await axe.run();
    });

    return results;

  } catch (error) {
    return { error: error.message };
  } finally {
    if (browser) await browser.close();
  }
}
