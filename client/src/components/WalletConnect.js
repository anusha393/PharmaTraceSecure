import { useEffect, useState } from "react";
import { ethers } from "ethers";

function WalletConnect() {
  const [account, setAccount] = useState("");

  useEffect(() => {
    async function connect() {
      if (window.ethereum) {
        const [addr] = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(addr);
      }
    }
    connect();
  }, []);

  return <p> Connected Wallet: {account || "Not connected"}</p>;
}

export default WalletConnect;
