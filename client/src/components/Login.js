import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { SiweMessage } from "siwe";

const BACKEND_URL = "http://localhost:3001";

export default function Login() {
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check session on mount
    fetch(`${BACKEND_URL}/api/auth/me`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.address) {
          setAuthenticated(true);
          setWalletAddress(data.address);
          console.log("Session active:", data.address);
        }
      })
      .catch(err => console.error("Session check failed", err));
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      console.error("MetaMask not found");
      setError("Please install MetaMask to continue.");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    console.log("Wallet connected:", address);
    setWalletAddress(address);
    return { signer, address };
  }

  async function fetchNonce(address) {
    const res = await fetch(`${BACKEND_URL}/api/auth/nonce?address=${address}`);
    const data = await res.json();
    console.log("Nonce received:", data.nonce);
    return data.nonce;
  }

  async function signIn() {
    setLoading(true);
    setError("");

    try {
      const { signer, address } = await connectWallet();
      if (!signer || !address) return;

      const nonce = await fetchNonce(address);
      if (!nonce) {
        setError("Failed to fetch nonce. Please try again.");
        return;
      }

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in to PharmaTraceSecure",
        uri: window.location.origin,
        version: "1",
        chainId: 11155111,
        nonce
      });

      console.log("SIWE message:", message);
      const signature = await signer.signMessage(message.prepareMessage());

      if (!signature || typeof signature !== "string") {
        console.error("Invalid signature");
        return;
      }

      const res = await fetch(`${BACKEND_URL}/api/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message, signature })
      });

      const result = await res.json();
      console.log("Verification response:", result);

      if (result.ok) {
        setAuthenticated(true);
      } else {
        setError("Authentication failed. Try again.");
        console.error("Auth failed:", result);
      }
    } catch (err) {
      console.error("SIWE error:", err);
      setError("An unexpected error occurred during sign-in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {authenticated ? (
        <p>✅ Authenticated as {walletAddress}</p>
      ) : (
        <>
          <button onClick={signIn} disabled={loading}>
            {loading ? "Connecting..." : "Sign-In with Ethereum"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );
}
