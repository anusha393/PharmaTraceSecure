import React from "react";
import { useWallet } from "../hooks/useWallet";
import { useRole } from "../hooks/useRole";
import BatchRegister from "../components/BatchRegister";

console.log("🚪 Entered RegisterPage");


function RegisterPage() {
  const { account } = useWallet();
  const { role } = useRole(account);
//   const { account } = useWallet();
// const { role } = useRole(account);

console.log("🔐 Wallet:", account);
console.log("🎯 Role from hook:", role);


  if (!account) {
    return <p className="text-red-600">🔌 Connect your wallet to access this page.</p>;
  }

  // if (role !== "MANUFACTURER") {
  //   return <p className="text-yellow-700">🚫 Access denied. This page is restricted to manufacturers only.</p>;
  // }
  

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">📦 Register a New Batch</h3>
      <BatchRegister account={account} />
      <button onClick={() => console.log("🧪 Test button works!")}>Click Me</button>

    </div>
  );
}

export default RegisterPage;
