import { useState } from "react";
import { transferBatch } from "../services/api";

export default function TransferForm({ address }) {
  const [batchId, setBatchId] = useState("");
  const [recipient, setRecipient] = useState("");

  async function handleTransfer() {
    await transferBatch(batchId, recipient, address);
    alert("Transfer submitted");
  }

  return (
    <div>
      <h3>Transfer Batch</h3>
      <input placeholder="Batch ID" onChange={(e) => setBatchId(e.target.value)} />
      <input placeholder="Recipient Address" onChange={(e) => setRecipient(e.target.value)} />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
}
