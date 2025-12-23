import puppeteer from "puppeteer";
import axeCore from "axe-core";

// 🚀 GLOBAL VARIABLE: Keep the browser alive!
let sharedBrowser = null;

async function getBrowser() {
  // If browser exists and is connected, reuse it!
  if (sharedBrowser && sharedBrowser.isConnected()) {
    return sharedBrowser;
  }

  // Otherwise, launch a new one (Only happens once on server start)
  console.log("🔥 Launching new 'Hot' Browser instance...");
  sharedBrowser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage", // Critical for memory
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
      "--single-process",
      "--no-zygote", 
    ],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
    timeout: 60000 
  });

  return sharedBrowser;
}

export async function runAxeScan(url) {
  let page;

  try {
    // 1. Get the existing browser (Instant)
    const browser = await getBrowser();
    
    // 2. Open a new TAB only (Fast)
    page = await browser.newPage();
    
    // Set viewport to standard desktop size
    await page.setViewport({ width: 1280, height: 800 });

    // ❌ REMOVED: Asset Blocking Logic 
    // We are now loading ALL fonts, images, and media for maximum accuracy.

    // 3. Navigate
    // We use 'domcontentloaded' to keep it snappy, but since assets are allowed, 
    // the visual rendering will be correct.
    await page.goto(url, { 
      waitUntil: "domcontentloaded", 
      timeout: 45000 
    });

    // Optional: Wait a tiny bit extra for fonts/images to render (1s)
    // This helps contrast checks be more accurate without waiting forever.
    await new Promise(r => setTimeout(r, 1000));

    // 4. Capture Screenshot (Standard quality for better visuals)
    const screenshot = await page.screenshot({ 
      encoding: "base64", 
      type: "jpeg",
      quality: 60, // Slightly higher quality for better visibility
      fullPage: false 
    });

    // 5. Run Axe
    await page.evaluate(axeCore.source);
    
    const results = await page.evaluate(async () => {
      const axeResults = await window.axe.run({
        runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
        }
      });
      
      // Extract coordinates for Visual Inspector
      for (const violation of axeResults.violations) {
        for (const node of violation.nodes) {
          const element = document.querySelector(node.target[0]);
          if (element) {
            const rect = element.getBoundingClientRect();
            node.rect = {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              windowWidth: window.innerWidth 
            };
          }
        }
      }
      return axeResults;
    });

    return {
      ...results,
      screenshot: `data:image/jpeg;base64,${screenshot}`,
    };

  } catch (error) {
    console.error("❌ Axe Scan Error:", error.message);
    
    // Reset browser if it crashed
    if (sharedBrowser && !sharedBrowser.isConnected()) {
      sharedBrowser = null;
    }

    if (error.message.includes("timeout") || error.message.includes("Navigation")) {
      throw new Error("Page took too long. Try a lighter page.");
    }
    throw error;

  } finally {
    // ⚠️ CRITICAL: Close the TAB to free memory
    if (page) {
      await page.close();
    }
  }
}