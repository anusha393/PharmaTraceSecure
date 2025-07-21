import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContract } from "../services/contractService";
import { ethers } from "ethers";
import { NavLink } from "react-router-dom";
const navItemClass = "px-3 py-1 bg-blue-100 hover:bg-blue-300 rounded text-sm font-mono";

function BatchBrowser() {
  const [batchIds, setBatchIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBatchIds() {
      try {
        const contract = await getContract();
        const ids = await contract.getAllBatchIds();
        const decoded = ids.map((id) => ethers.decodeBytes32String(id));
        setBatchIds(decoded);
      } catch (err) {
        console.error("Failed to fetch batch IDs:", err.message);
      } finally {
        setLoading(false);  // This line tells React we're done loading
      }
    }
  
    fetchBatchIds();
  }, []);
  
  

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <h3 className="text-lg font-semibold">Registered Batches</h3>
  
      {loading ? (
        <p className="text-gray-500">Loading batch list...</p>
      ) : batchIds.length === 0 ? (
        <p className="text-gray-500">No batches found.</p>
      ) : (
        batchIds.map(id => (
            <NavLink
            key={id}
            to={`/viewer/${id}`}
            className="px-3 py-1 bg-blue-100 hover:bg-blue-300 rounded text-sm font-mono"
          >
             {id}
          </NavLink>
          
        ))
      )}
    </div>
  );
  
}

export default BatchBrowser;
