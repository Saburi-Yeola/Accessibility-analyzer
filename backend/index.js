import express from "express";
import cors from "cors";
import { runAxeScan } from "./runAxe.js";

const app = express();
app.use(cors());
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});


app.post("/scan", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  console.log("Scanning URL:", url);

  const results = await runAxeScan(url);

  res.json(results);
});

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
