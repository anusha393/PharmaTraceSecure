const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "server/.env") });

const { ethers } = require("ethers");

console.log("RPC_URL:", process.env.RPC_URL);
console.log("Ethers object loaded:", !!ethers);
console.log("JsonRpcProvider available:", !!ethers?.providers?.JsonRpcProvider);
