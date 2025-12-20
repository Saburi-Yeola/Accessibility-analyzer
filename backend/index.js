import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { runAxeScan } from "./runAxe.js";
import aiFixRoutes from "./routes/aiFix.js";

/**
 * 🔑 Load environment variables
 */
dotenv.config({ path: "./.env" });

// 1️⃣ FIREBASE ADMIN SETUP
import admin from "firebase-admin";
import { createRequire } from "module"; 

const require = createRequire(import.meta.url);

// --- 🔒 ROBUST SECRET LOADING (Local vs Render) ---
let serviceAccount;

try {
  // A. Try loading from Render's automatic secret path (Production)
  serviceAccount = require("/etc/secrets/serviceAccountKey.json");
  console.log("🔑 Loaded Service Account from /etc/secrets/");
} catch (error) {
  // B. If that fails, load from local folder (Development)
  try {
    serviceAccount = require("./serviceAccountKey.json");
    console.log("🔑 Loaded Service Account from local folder");
  } catch (localError) {
    console.error("❌ CRITICAL ERROR: Could not find serviceAccountKey.json in /etc/secrets/ OR ./");
    console.error("   -> Did you add the Secret File in Render Dashboard?");
    process.exit(1); // Stop the server if we can't authenticate
  }
}

// Initialize Firebase (Only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// 🚨 CRITICAL: Connect to your specific named database
db.settings({ databaseId: "accessibility-db" }); 

const app = express();
app.use(cors());
app.use(express.json());

// ---------- URL VALIDATION HELPER ----------
function isValidUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:");
  } catch (err) {
    return false;
  }
}

function buildSummary(axeResults) {
  const summary = {
    totalViolations: 0,
    byImpact: { critical: 0, serious: 0, moderate: 0, minor: 0 }
  };

  if (!axeResults || !axeResults.violations) {
    return summary;
  }

  summary.totalViolations = axeResults.violations.length;

  axeResults.violations.forEach((violation) => {
    const impact = violation.impact;
    if (impact && summary.byImpact[impact] !== undefined) {
      summary.byImpact[impact]++;
    }
  });

  return summary;
}

// ---------- BASIC TEST ROUTE ----------
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// ---------- SCAN ROUTE ----------
app.post("/scan", async (req, res) => {
  const { url, userId, userEmail } = req.body;

  if (!url) return res.status(400).json({ success: false, error: "URL is required" });
  if (!isValidUrl(url)) return res.status(400).json({ success: false, error: "Invalid URL format" });

  console.log(`🔍 Scanning URL: ${url}`);

  try {
    // results now contains { ...axeResults, screenshot: "data:..." }
    const results = await runAxeScan(url);
    const summary = buildSummary(results);

    // 2️⃣ SAVE TO FIRESTORE (Backend Logic)
    // Only save if a User ID is present.
    if (userId) {
      console.log(`📝 Saving scan for user: ${userEmail}`);
      
      try {
        const timestamp = admin.firestore.FieldValue.serverTimestamp();

        // A. Update User Document
        await db.collection("users").doc(userId).set({
          email: userEmail,
          lastScanAt: timestamp
        }, { merge: true });

        // B. Add New Scan Document
        await db.collection("users").doc(userId).collection("scans").add({
          url: url,
          summary: {
            ...summary,
            passes: results.passes ? results.passes.length : 0,
            incomplete: results.incomplete ? results.incomplete.length : 0
          },
          createdAt: timestamp
        });

        console.log(`✅ Scan saved to Firestore!`);
      } catch (dbErr) {
        console.error("❌ Database Save Failed:", dbErr.message);
      }
    } else {
      // 🟢 DEMO MODE: Logic hits here when userId is null
      console.log("⚠️ No User ID provided (Demo Mode). Skipping DB save.");
    }

    // Return the full results object which includes results.screenshot
    return res.json({
      success: true,
      summary,
      data: results 
    });

  } catch (err) {
    console.error("❌ Scan Error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Accessibility scan failed"
    });
  }
});

// ---------- AI FIX ROUTE ----------
app.use("/api/ai-fix", aiFixRoutes);

// Use the PORT environment variable if available (Render sets this automatically)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});