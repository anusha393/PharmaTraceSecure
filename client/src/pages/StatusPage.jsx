import { useState } from "react";
import StatusDisplay from "../components/StatusDisplay";

export default function StatusPage() {
  const [batchId, setBatchId] = useState("");

  return (
    <div>
      <h2>Batch Status</h2>
      <input placeholder="Batch ID" onChange={(e) => setBatchId(e.target.value)} />
      {batchId && <StatusDisplay batchId={batchId} />}
    </div>
  );
}
