import toast from "react-hot-toast";

import { getContract } from "../services/contractService";
import { useWallet } from "../hooks/useWallet";
import { addManufacturerSafely } from "../services/contractService";
import React, { useState, useEffect } from "react";


function RoleAdmin() {
  const { account } = useWallet();
  const [manufacturerAddress, setManufacturerAddress] = useState("");
  const [isVerified, setIsVerified] = useState(null);
  const contract =  getContract();
//   const contract = await getContract();

if (contract && contract.functions) {
  console.log("🔍 Contract methods:", Object.keys(contract.functions));
} else {
  console.error("🚨 Contract or functions object is not available");
}
//   console.log("🧪 Available contract methods:", Object.keys(contract.functions));

//   const isManufacturer = contract.isManufacturer("0x1CFB14A7001AD8c8b54f2b00CCBa078AF4FB7fB5");
//   console.log("✅ Whitelisted?", isManufacturer);
//   const contract1= getContract();
//   const owner =  contract1.owner();
//   console.log("🧑‍⚖️ Contract Owner:", owner);
//   console.log("👛 Connected Wallet:", account);
  

  const handleAddManufacturerSecurely  = async () => {
    try {
      await addManufacturerSafely(manufacturerAddress);
      toast.success("✅ Manufacturer whitelisted");
      setManufacturerAddress("");
      setIsVerified(true);
    } catch (err) {
      console.error(err);
      toast.error("❌ Whitelisting failed");
    }
  };

  const handleVerify = async () => {
    try {
      const contract = await getContract();
      const result = await contract.isManufacturer(manufacturerAddress);
      setIsVerified(result);
      toast.success(`🔎 Role status: ${result ? "Manufacturer ✅" : "Not whitelisted 🚫"}`);
    } catch (err) {
      console.error(err);
      toast.error("❌ Verification failed");
    }
  };
  useEffect(() => {
    const setupListener = async () => {
      const contract = await getContract();
      contract.on("ManufacturerWhitelisted", (account) => {
        toast.success(`✅ Whitelisted: ${account}`);
      });
    };
  
    setupListener();
  
    return () => {
      getContract().then((contract) => {
        contract.removeAllListeners("ManufacturerWhitelisted");
      });
    };
  }, []);
  
  

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto space-y-4">
      <h3 className="text-xl font-bold">🛡️ Role Management</h3>
      <p className="text-sm text-gray-500">Owner wallet: <span className="font-mono">{account}</span></p>

      <input
        type="text"
        value={manufacturerAddress}
        onChange={(e) => setManufacturerAddress(e.target.value)}
        placeholder="Target wallet address"
        className="input"
      />

      <div className="space-x-2">
        <button onClick={handleVerify} className="btn">🔍 Verify Role</button>
        <button onClick={handleAddManufacturerSecurely} className="btn">➕ Whitelist Manufacturer</button>
      </div>

      {isVerified !== null && (
        <div className="text-sm mt-2">
          {isVerified ? (
            <span className="text-green-600 font-semibold">✅ This address is a whitelisted manufacturer</span>
          ) : (
            <span className="text-red-600 font-semibold">🚫 This address is not a manufacturer</span>
          )}
        </div>
      )}
    </div>
  );
}

export default RoleAdmin;
