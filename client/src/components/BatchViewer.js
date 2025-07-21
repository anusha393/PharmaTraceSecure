import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { getContract } from "../services/contractService";

// 🟦 Status color map for badge styling
const statusColorMap = {
  manufactured: "bg-blue-500",
  intransit: "bg-yellow-500",
  received: "bg-green-600",
  verified: "bg-indigo-500"
};

// 📘 Maps status text to Tailwind color classes
function getStatusColor(status) {
  return statusColorMap[status.toLowerCase()] || "bg-gray-400";
}

function BatchViewer({ batchId }) {
  const [batchDetails, setBatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBatch() {
      try {
        const contract = await getContract();
        const encoded = ethers.encodeBytes32String(batchId);

        const [
          returnedBatchId,
          drugName,
          manufacturer,
          manufactureDate,
          cid,
          holder,
          status
        ] = await contract.getBatch(encoded);

        setBatchDetails({
          batchId: ethers.decodeBytes32String(returnedBatchId),
          drugName,
          manufacturer,
          manufactureDate,
          cid,
          holder,
          status: Number(status)
        });
      } catch (err) {
        console.error("🚫 Failed to fetch batch:", err.message);
        toast.error("Failed to load batch details");
      } finally {
        setLoading(false);
      }
    }

    fetchBatch();
  }, [batchId]);

  if (loading) {
    return <p>🔄 Loading batch details...</p>;
  }

  if (!batchDetails) {
    return <p>🚫 No batch data found.</p>;
  }

  const statusLabels = ["Manufactured", "InTransit", "Received", "Verified"];
  const statusText = statusLabels[batchDetails.status];
  const formattedDate = new Date(Number(batchDetails.manufactureDate) * 1000).toLocaleDateString();

  return (
    <div className="bg-white p-6 rounded shadow space-y-3">
      <h3 className="text-xl font-semibold">📦 Batch ID: {batchDetails.batchId}</h3>

      <div>
        <span className="font-medium">Product Name:</span> {batchDetails.drugName}
      </div>

      <div>
        <span className="font-medium">Manufacture Date:</span> {formattedDate}
      </div>

      <div>
        <span className="font-medium">Status:</span>{" "}
        <span className={`px-2 py-1 rounded text-white ${getStatusColor(statusText)}`}>
          {statusText}
        </span>
      </div>

      <div>
        <span className="font-medium">Current Owner:</span>{" "}
        <span className="font-mono">{batchDetails.holder}</span>
      </div>

      {/* Optional: Add CID preview or Etherscan links here */}
    </div>
  );
}

export default BatchViewer;
