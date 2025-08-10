import { useAuth } from "../context/AuthContext";

export default function UseWallet() {
  const { walletAddress, connectWallet, authStatus } = useAuth();

  return (
    <div>
      {authStatus === "authenticated" && (
        <p>Connected ✅ {walletAddress}</p>
      )}
      {authStatus === "connecting" && (
        <p>🔄 Connecting wallet…</p>
      )}
      {authStatus === "error" && (
        <p style={{ color: "red" }}>⚠️ Wallet not found or connection failed.</p>
      )}
      {authStatus === "idle" && (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
