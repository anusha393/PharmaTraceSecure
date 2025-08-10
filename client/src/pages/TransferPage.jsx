import { useState } from "react";
import TransferForm from "../components/TransferForm";

export default function TransferPage({ userAddress }) {
  return (
    <div>
      <h2>Transfer Records</h2>
      <TransferForm address={userAddress} />
    </div>
  );
}
