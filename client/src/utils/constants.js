// constants.js
const ethers = require("ethers");
require("dotenv").config();

const artifact = require("../../artifacts/contracts/PharmaTraceSecure.sol/PharmaTraceSecure.json");
const contractABI = artifact.abi;

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const signer = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, signer);

module.exports = contract;
