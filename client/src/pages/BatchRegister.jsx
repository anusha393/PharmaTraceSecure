import { useState } from "react";
import { registerBatch } from "../services/api";

export default function BatchRegister({ address }) {
  const [cid, setCid] = useState("");

  async function handleRegister() {
    await registerBatch(cid, address);
    alert("Batch Registered");
    setCid("");
  }

  return (
    <div>
      <h2>Register New Batch</h2>
      <input
        placeholder="IPFS Metadata CID"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
      />
      <button onClick={handleRegister}>Submit</button>
    </div>
  );
}
