import dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";
// const abi = require("../abi/Storage.json");
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
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, signer);
const code = await provider.getCode(process.env.CONTRACT_ADDRESS);
console.log("Deployed bytecode:", code);

export async function get() {
    const value = await contract.get();
    return value.toString(); 
  }
  

export async function set(value) {
    const tx = await contract.set(value);
    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("New value stored:", value);
    return tx.hash; 
  }
  


  