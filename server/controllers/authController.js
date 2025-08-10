const { SiweMessage } = require("siwe");
const crypto = require("crypto");

let latestNonce = crypto.randomBytes(16).toString("hex");

exports.getNonce = (req, res) => {
  latestNonce = crypto.randomBytes(16).toString("hex");
  res.json({ nonce: latestNonce });
};

exports.verifySIWE = async (req, res) => {
  const { message, signature } = req.body;
  try {
    const siwe = new SiweMessage(message);
    const result = await siwe.verify({ signature, nonce: latestNonce });

    if (!result.success) return res.status(400).json({ error: "SIWE verification failed" });

    // Simulate role lookup
    const userRole = "manufacturer"; // Retrieve from DB or assign dynamically
    res.cookie("session", result.data.address, { httpOnly: true });
    res.json({ ok: true, role: userRole });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
