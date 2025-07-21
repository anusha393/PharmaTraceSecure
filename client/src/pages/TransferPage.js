import React from "react";
import { useWallet } from "../hooks/useWallet";
import { useRole } from "../hooks/useRole";
import BatchTransfer from "../components/BatchTransfer";

function TransferPage() {
  const { account } = useWallet();
  const { role } = useRole(account);

  if (!account) return <p>Connect wallet to access.</p>;
  if (role !== "DISTRIBUTOR") return <p>Access denied: distributors only.</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-bold mb-4">Transfer Batch Ownership</h3>
      <BatchTransfer account={account} />
    </div>
  );
}

export default TransferPage;
