import dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_number",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newValue",
				"type": "uint256"
			}
		],
		"name": "ValueChanged",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, provider);

console.log("🔍 Listening for contract events...");

contract.on("ValueChanged", (newVal, event) => {
  console.log("Event Fired → ValueChanged =", newVal.toString());
  console.log(" Tx Hash:", event.transactionHash);
});
