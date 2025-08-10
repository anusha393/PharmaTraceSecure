import { createContext, useContext, useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { signInWithEthereum } from "../services/siwe";
import { assignRole } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [role, setRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStatus, setAuthStatus] = useState("idle"); // idle | connecting | authenticated | error

  // 🧠 Detect active session from backend
  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setIsAuthenticated(true);
          setWalletAddress(data.address);
          setAuthStatus("authenticated");
        }
      })
      .catch(err => console.warn("Session check failed:", err));
  }, []);

  // 🔌 Connect wallet
  async function connectWallet() {
    try {
      if (!window.ethereum) {
        setAuthStatus("error");
        alert("MetaMask not detected");
        return;
      }

      setAuthStatus("connecting");
      const ethProvider = new BrowserProvider(window.ethereum);
      await ethProvider.send("eth_requestAccounts", []);
      const ethSigner = await ethProvider.getSigner();
      const address = await ethSigner.getAddress();

      console.log("Wallet connected:", address);
      setWalletAddress(address);
      setProvider(ethProvider);
      setSigner(ethSigner);
    } catch (err) {
      console.error("Wallet connection failed:", err);
      setAuthStatus("error");
    }
  }

  // 🔐 Authenticate via SIWE
  async function authenticate() {
    if (!signer || !walletAddress) {
      console.warn("Skipping authentication — missing signer/address");
      return;
    }

    try {
      const response = await signInWithEthereum(signer, walletAddress);
      console.log("SIWE response:", response);

      if (response.ok) {
        setIsAuthenticated(true);
        setRole(response.role || "guest");
        setAuthStatus("authenticated");
      } else {
        setAuthStatus("error");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setAuthStatus("error");
    }
  }

  // 🔄 Auto authenticate after wallet connects
  useEffect(() => {
    if (signer && walletAddress) {
      authenticate();
    }
  }, [signer, walletAddress]);

  // 🧭 Initial wallet connect + listeners
  useEffect(() => {
    if (window.ethereum && !walletAddress) {
      connectWallet();

      window.ethereum.on("accountsChanged", connectWallet);
      window.ethereum.on("chainChanged", () => window.location.reload());

      return () => {
        window.ethereum.removeListener("accountsChanged", connectWallet);
      };
    }
  }, []);

  const contextValue = {
    walletAddress,
    provider,
    signer,
    role,
    isAuthenticated,
    authStatus,
    connectWallet,
    authenticate,
    assignUserRole: async (target, roleName) => {
      await assignRole(target, roleName);
    },
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
