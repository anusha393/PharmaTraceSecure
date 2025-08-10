const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { ethers } = require("ethers");
const { JsonRpcProvider } = require("ethers");


const artifact = require("../../artifacts/contracts/PharmaTraceSecure.sol/PharmaTraceSecure.json");
const contractABI = artifact.abi;

// Log BEFORE anything else
console.log("RPC_URL:", process.env.RPC_URL);
console.log("PRIVATE_KEY:", process.env.SEPOLIA_PRIVATE_KEY);
console.log("CONTRACT_ADDRESS:", process.env.CONTRACT_ADDRESS);

if (!process.env.RPC_URL || !process.env.SEPOLIA_PRIVATE_KEY || !process.env.CONTRACT_ADDRESS) {
  throw new Error(" Missing required environment variables. Check your .env file.");
}

const provider = new JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, signer);

module.exports = contract;
