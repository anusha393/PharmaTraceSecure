import { useEffect, useState } from "react";
import { ethers } from "ethers";

export const useWallet = () => {
  const [account, setAccount] = useState(null);
  useEffect(() => {
    async function connect() {
      if (window.ethereum) {
        const [addr] = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(addr);
      }
    }
    connect();
  }, []);
  return { account };
};
