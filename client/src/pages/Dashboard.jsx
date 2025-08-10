import RoleAdmin from "../components/RoleAdmin";
import BatchRegister from "./BatchRegister";
import TransferPage from "./TransferPage";
import StatusPage from "./StatusPage";

export default function Dashboard({ userAddress, role }) {
  return (
    <div>
      <h1>Welcome to PharmaTraceSecure</h1>
      <h4>Role: {role || "No role assigned"}</h4>

      {role === "admin" && <RoleAdmin />}
      {(role === "manufacturer" || role === "admin") && (
        <BatchRegister address={userAddress} />
      )}
      {role && <TransferPage userAddress={userAddress} />}
      <StatusPage />
    </div>
  );
}
