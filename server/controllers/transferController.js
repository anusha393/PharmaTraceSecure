const contract = require("../utils/constants");

exports.transferBatch = async (req, res) => {
  const { batchId, recipient } = req.body;

  try {
    const tx = await contract.transferBatch(batchId, recipient);
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
