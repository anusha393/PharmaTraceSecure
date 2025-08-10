const contract = require("../utils/constants");

exports.registerBatch = async (req, res) => {
  const { cid, senderAddress } = req.body;

  try {
    const tx = await contract.registerBatch(cid);
    await tx.wait(); // Wait for confirmation

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStatus = async (req, res) => {
  const { batchId } = req.params;

  try {
    const status = await contract.getBatchStatus(batchId); // ensure this method exists in your contract
    res.json({ batchId, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
