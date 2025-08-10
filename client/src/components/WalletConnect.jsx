import UseWallet from "./UseWallet";

export default function WalletConnect({ setUser }) {
  return (
    <div>
      <h2>PharmaTraceSecure</h2>
      <UseWallet onConnected={setUser} />
    </div>
  );
}
