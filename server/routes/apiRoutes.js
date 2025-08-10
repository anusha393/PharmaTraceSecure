const express = require("express");
const router = express.Router();
const { SiweMessage } = require("siwe");

const auth = require("../controllers/authController");
const batch = require("../controllers/batchController");
const transfer = require("../controllers/transferController");
const role = require("../controllers/roleController");

const nonceStore = require("../utils/nonceStore");
const requireAuth = require("../middleware/verifySession");

// 🔐 Authentication Routes
router.get("/auth/nonce", (req, res) => {
  const wallet = req.query.address;
  if (!wallet) {
    return res.status(400).json({ error: "Missing wallet address" });
  }
  const nonce = nonceStore.setNonce(wallet);
  res.json({ nonce });
});



router.post("/auth/verify", async (req, res) => {
  console.log("Incoming verify request body:", req.body);

  const { message, signature } = req.body;

  if (!message || !signature) {
    return res.status(400).json({
      ok: false,
      error: "Missing 'message' or 'signature' in request body",
    });
  }

  try {
    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.validate(signature);
    const wallet = fields.address;
    const storedNonce = nonceStore[wallet];

    if (!nonceStore.validateNonce(wallet, fields.nonce)) {
      return res.status(400).json({ error: "Invalid or expired nonce" });
    }
    nonceStore.clearNonce(wallet);
    

    req.session.siwe = fields;
    res.json({ ok: true, address: wallet });
  } catch (err) {
    console.error(" SIWE verification failed:", err);
    res.status(400).json({
      error: "Signature verification failed",
      details: err.message,
    });
  }
});


router.get("/auth/me", (req, res) => {
  if (req.session.siwe) {
    return res.json({ authenticated: true, address: req.session.siwe.address });
  }
  res.json({ authenticated: false });
});

router.post("/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

// 🛡️ Protected Routes
router.get("/protected", requireAuth, (req, res) => {
  res.json({ secret: "Blockchain vault accessed ✅" });
});

// 📦 Batch Routes
router.post("/batch/register", requireAuth, batch.registerBatch);
router.get("/status/:batchId", requireAuth, batch.getStatus);
console.log("Loaded batch controller:", batch);


// 💸 Transfer Routes
router.post("/transfer/send", requireAuth, transfer.transferBatch);

// 🛠️ Role Management
router.post("/admin/assign", requireAuth, role.assignRole);
router.get("/admin/role/:address", requireAuth, role.getRole);


module.exports = router;
