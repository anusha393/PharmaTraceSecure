import { useState } from "react";
import { assignRole } from "../services/api";

export default function RoleAdmin() {
  const [target, setTarget] = useState("");
  const [role, setRole] = useState("");

  async function handleAssign() {
    await assignRole(target, role);
    alert("Role assigned");
  }

  return (
    <div>
      <h3>Admin: Assign Role</h3>
      <input placeholder="Address" onChange={(e) => setTarget(e.target.value)} />
      <input placeholder="Role" onChange={(e) => setRole(e.target.value)} />
      <button onClick={handleAssign}>Assign</button>
    </div>
  );
}
