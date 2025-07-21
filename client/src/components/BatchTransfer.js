import React, { useState } from "react";
import toast from "react-hot-toast";
import { getContract } from "../services/contractService";
import { logAction } from "../services/loggerService";

function BatchTransfer({ account }) {
  const [form, setForm] = useState({ batchId: "", newOwner: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const contract = await getContract();
      const tx = await contract.transferBatch(form.batchId, form.newOwner);
      await tx.wait();
      toast.success("Batch transferred!");
      await logAction({ address: account, action: "TRANSFER", txHash: tx.hash });
      setForm({ batchId: "", newOwner: "" });
    } catch (err) {
      toast.error("Transfer failed.");
      console.error(" Error:", err); // For full stack trace
      toast.error(err.message || JSON.stringify(err));
    }
  };

  return (
    <form onSubmit={handleTransfer} className="space-y-4">
      <input name="batchId" value={form.batchId} onChange={handleChange} placeholder="Batch ID" className="input" required />
      <input name="newOwner" value={form.newOwner} onChange={handleChange} placeholder="New Owner Address" className="input" required />
      <button type="submit" className="btn">Transfer</button>
    </form>
  );
}

export default BatchTransfer;
