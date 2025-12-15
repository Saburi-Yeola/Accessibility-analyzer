import puppeteer from "puppeteer";
import axeCore from "axe-core";

export async function runAxeScan(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  await page.evaluate(axeCore.source);

  const results = await page.evaluate(async () => {
    return await axe.run();
  });

  await browser.close();
  return results;
}
