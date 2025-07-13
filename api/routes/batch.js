import express from "express";

const router = express.Router();
import { getBatch } from "../../lib/contract.js";
import { registerBatch } from "../../lib/contract.js";
import { transferBatch } from "../../lib/contract.js";
import { updateStatus } from "../../lib/contract.js";
import { ethers } from "ethers";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

function safeJson(obj) {
    return JSON.parse(JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    ));
  }
  
/**
 * @swagger
 * /api/batch/register:
 *   post:
 *     summary: Register a new pharmaceutical batch
 *     tags: [Batch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - batchId
 *               - drugName
 *               - manufactureDate
 *               - cid
 *             properties:
 *               batchId:
 *                 type: string
 *               drugName:
 *                 type: string
 *               manufactureDate:
 *                 type: integer
 *               cid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Batch successfully registered
 *       400:
 *         description: Error during registration
 */
router.post("/register", async (req, res) => {
    try {
      const { batchId, drugName, manufactureDate, cid } = req.body;
  
      const hexId = ethers.encodeBytes32String(batchId);
      const hexCid = ethers.encodeBytes32String(cid);
  
      const tx = await registerBatch({
        batchId: hexId,
        drugName,
        manufactureDate,
        cid: hexCid,
      });
  
      res.json(
        safeJson({
          message: `Batch ${batchId} registered successfully`,
          txHash: tx.hash,
        })
      );
    } catch (err) {
      console.error(" Registration failed:", err.message);
      res.status(500).json({ message: "Batch registration failed" });
    }
  });
/**
 * @swagger
 * /api/batch/{batchId}:
 *   get:
 *     summary: Retrieve batch details by ID
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: batchId
 *         required: true
 *         schema:
 *           type: string
 *         description: The batch ID (plain string before encoding)
 *     responses:
 *       200:
 *         description: Batch details found
 *       404:
 *         description: Batch not found
 */
router.get("/:batchId", async (req, res) => {
    try {
      const hex = ethers.encodeBytes32String(req.params.batchId);
      const batch = await getBatch(hex);
  
      // If empty batch is returned
      if (!batch || batch.length < 5) {
        return res.status(404).json({ message: "Batch not found or incomplete" });
      }
  
      // Destructure the array from smart contract
      const [rawId, drugName, manufactureDate, rawCid, status] = batch;
  
      // Decode and normalize values
      const statusLabels = {
        "1": "InTransit",
        "2": "Received",
        "3": "Verified",
      };
      
      const result = {
        batchId: typeof rawId === "string" && rawId.startsWith("0x")
          ? ethers.decodeBytes32String(rawId)
          : rawId,
        drugName,
        manufactureDate: manufactureDate?.toString?.() ?? null,
        cid: typeof rawCid === "string" && rawCid.startsWith("0x")
          ? ethers.decodeBytes32String(rawCid)
          : rawCid,
        status: status?.toString?.() ?? null,
        statusText: statusLabels[status?.toString?.()] || "Unknown",
      };
  
      res.json(
        safeJson({
          message: "Batch retrieved successfully",
          batch: result,
        })
      );
    } catch (err) {
      console.error(" Error fetching batch:", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
/**
 * @swagger
 * /api/batch/transfer:
 *   post:
 *     summary: Transfer a batch to another address
 *     tags: [Batch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - batchId
 *               - to
 *             properties:
 *               batchId:
 *                 type: string
 *               to:
 *                 type: string
 *                 description: Ethereum wallet address of recipient
 *     responses:
 *       200:
 *         description: Transfer successful
 *       400:
 *         description: Transfer failed
 */
router.post("/transfer", async (req, res) => {
    try {
      const { batchId, to } = req.body;
      const hexId = ethers.encodeBytes32String(batchId);
  
      const tx = await transferBatch({ batchId: hexId, to });
  
      res.json(
        safeJson({
          message: `Batch ${batchId} transferred to ${to}`,
          txHash: tx.hash,
        })
      );
    } catch (err) {
      console.error(" Transfer failed:", err.message);
      res.status(500).json({ message: "Batch transfer failed" });
    }
  });
/**
 * @swagger
 * /api/batch/status:
 *   post:
 *     summary: Update status of a batch
 *     tags: [Batch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - batchId
 *               - status
 *             properties:
 *               batchId:
 *                 type: string
 *               status:
 *                 type: integer
 *                 description: New status (1 = InTransit, 2 = Received, 3 = Verified)
 *     responses:
 *       200:
 *         description: Status updated
 *       400:
 *         description: Update failed
 */
router.post("/status", async (req, res) => {
    try {
      const { batchId, status } = req.body;
      const hexId = ethers.encodeBytes32String(batchId);
  
      const tx = await updateStatus({
        batchId: hexId,
        newStatus: parseInt(status),
      });
  
      res.json(
        safeJson({
          message: `Status of batch ${batchId} updated to ${status}`,
          txHash: tx.hash,
        })
      );
    } catch (err) {
      console.error("Status update failed:", err.message);
      res.status(500).json({ message: "Batch status update failed" });
    }
  });

export default router;

    
    