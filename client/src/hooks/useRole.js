import { useState, useEffect } from "react";
import { getContract } from "../services/contractService";

export function useRole(account) {
  const [role, setRole] = useState("");

  useEffect(() => {
    async function fetchRole() {
      if (!account) return;
      try {
        const contract = await getContract();
        const isManufacturer = await contract.isManufacturer(account);
        setRole(isManufacturer ? "MANUFACTURER" : "UNKNOWN");// Or fallback
      } catch (err) {
        console.error("🚨 Role check failed:", err);
        setRole("UNKNOWN");
      }
    }
    fetchRole();
  }, [account]);

  return { role };
}
