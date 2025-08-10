import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";

function App() {
  const { walletAddress, role, authenticate, authStatus } = useAuth();

  useEffect(() => {
    if (walletAddress) {
      authenticate();
    }
  }, [walletAddress]);
  console.log("Calling authenticate for:", walletAddress);


  if (authStatus === "authenticated" && walletAddress) {
    return <Dashboard userAddress={walletAddress} role={role} />;
  }

  if (authStatus === "connecting") {
    return <p>🔄 Connecting wallet...</p>;
  }

  if (authStatus === "error") {
    return <p>⚠️ Wallet failed to connect.</p>;
  }

  return <p>🔌 Waiting for wallet connection...</p>;
}

export default App;
