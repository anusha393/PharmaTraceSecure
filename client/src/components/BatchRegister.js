import React, { useState } from "react";
import toast from "react-hot-toast";
import { getContract } from "../services/contractService";
import { logAction } from "../services/loggerService";
import { ethers } from "ethers";
console.log("BatchRegister component loaded");



function BatchRegister({ account }) {
  const [form, setForm] = useState({ batchId: "", productName: "", manufactureDate: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form values:", form);
    console.log("Proceeding to contract call...");

  
    try {
      const contract = await getContract();
  
     
      console.log("Form values:", form);
  
      let batchIdBytes;
      let timestamp;
  
      try {
        batchIdBytes = ethers.encodeBytes32String(form.batchId);
        console.log("Encoded Batch ID:", batchIdBytes);
      } catch (err) {
        console.error("Failed to encode batch ID:", err.message);
        toast.error("Invalid batch ID");
        return;
      }
  
      try {
        const dateObj = new Date(form.manufactureDate);
        if (isNaN(dateObj.getTime())) throw new Error("Invalid Date");
        timestamp = Math.floor(dateObj.getTime() / 1000);
        console.log("Timestamp:", timestamp);
      } catch (err) {
        console.error("ate parsing failed:", err.message);
        toast.error("Invalid date format");
        return;
      }
  
      console.log("Product Name:", form.productName);
  
     
      const tx = await contract.registerBatch(
        batchIdBytes,
        form.productName,
        timestamp,
        "CID_PLACEHOLDER"
      );
  
      await tx.wait();
      toast.success("Batch registered!");
  
      await logAction({
        address: account,
        action: "REGISTER",
        txHash: tx.hash
      });
  
      setForm({ batchId: "", productName: "", manufactureDate: "" });
    } catch (err) {
      toast.error("Registration failed.");
      console.error("Error:", err);
      toast.error(err.message || JSON.stringify(err));
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="batchId" value={form.batchId} onChange={handleChange} placeholder="Batch ID" className="input" required />
      <input name="productName" value={form.productName} onChange={handleChange} placeholder="Product Name" className="input" required />
      <input
        type="date"
        name="manufactureDate"
        value={form.manufactureDate}
        onChange={handleChange}
        className="input"
        required
      />
            
      <button type="submit" className="btn">Register</button>
    </form>
  );
}

export default BatchRegister;
