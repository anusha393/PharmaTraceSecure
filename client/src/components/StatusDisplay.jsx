import { useEffect, useState } from "react";
import { getBatchStatus } from "../services/api";

export default function StatusDisplay({ batchId }) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    getBatchStatus(batchId).then(setStatus);
  }, [batchId]);

  return <p>Status: {status}</p>;
}
