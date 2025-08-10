const contract = require("../utils/constants");

exports.assignRole = async (req, res) => {
  const { address, role } = req.body;

  try {
    const tx = await contract.assignRole(address, role);
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRole = async (req, res) => {
  const { address } = req.params;

  try {
    const role = await contract.getRole(address); // Ensure this matches your smart contract method
    res.json({ address, role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
