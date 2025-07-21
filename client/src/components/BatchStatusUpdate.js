import React, { useState } from "react";
import toast from "react-hot-toast";
import { getContract } from "../services/contractService";
import { logAction } from "../services/loggerService";

function BatchStatusUpdate({ account }) {
  const [form, setForm] = useState({ batchId: "", newStatus: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const contract = await getContract();
      const tx = await contract.updateBatchStatus(form.batchId, form.newStatus);
      await tx.wait();
      toast.success("📊 Status updated!");
      await logAction({ address: account, action: "STATUS_UPDATE", txHash: tx.hash });
      setForm({ batchId: "", newStatus: "" });
    } catch (err) {
      toast.error("⚠️ Update failed.");
      console.error("🔥 Error:", err); // For full stack trace
      toast.error(err.message || JSON.stringify(err));
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <input name="batchId" value={form.batchId} onChange={handleChange} placeholder="Batch ID" className="input" required />
      <input name="newStatus" value={form.newStatus} onChange={handleChange} placeholder="Status (e.g. Shipped)" className="input" required />
      <button type="submit" className="btn">Update Status</button>
    </form>
  );
}

export default BatchStatusUpdate;
