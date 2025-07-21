import express from "express";
import fs from "fs";
const router = express.Router();

router.post("/", (req, res) => {
  const { address, action, txHash } = req.body;
  const entry = `[${new Date().toISOString()}] ${address} → ${action} → ${txHash}\n`;

  fs.appendFile("userLogs.txt", entry, (err) =>
    err ? res.status(500).json({ error: "Failed" }) : res.json({ status: "Logged" })
  );
});

export default router;
