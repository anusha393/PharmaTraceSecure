import React from "react";
import { NavLink } from "react-router-dom";
import { useWallet } from "../hooks/useWallet";
import { useRole } from "../hooks/useRole";

function Navbar() {
  const { account } = useWallet();
  const { role } = useRole(account);

  const navItemClass = ({ isActive }) =>
    `px-3 py-2 rounded ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <nav className="bg-white shadow mb-6 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex space-x-4 mb-2 sm:mb-0">
        <NavLink to="/register" className={navItemClass}>
          Register
        </NavLink>
        <NavLink to="/transfer" className={navItemClass}>
          Transfer
        </NavLink>
        <NavLink to="/status" className={navItemClass}>
          Update Status
        </NavLink>
        <NavLink to="/browser" className={navItemClass}>
        Browse Batches
      </NavLink>
        <NavLink to="/admin" className={navItemClass}>
          Role Admin
        </NavLink>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <span className="text-sm text-gray-500">Role: <span className="font-semibold">{role || "Loading..."}</span></span>
        <span className="text-sm text-gray-500"> Wallet: <span className="font-mono">{account || "Not connected"}</span></span>
      </div>
    </nav>
  );
}

export default Navbar;
