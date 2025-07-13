import { ethers } from "ethers";
// import abi from "../abi/Storage.json" assert { type: "json" };
const contractABI = [
    	{
    		"inputs": [],
    		"stateMutability": "nonpayable",
    		"type": "constructor"
    	},
    	{
    		"inputs": [
    			{
    				"internalType": "address",
    				"name": "owner",
    				"type": "address"
    			}
    		],
    		"name": "OwnableInvalidOwner",
    		"type": "error"
    	},
    	{
    		"inputs": [
    			{
    				"internalType": "address",
    				"name": "account",
    				"type": "address"
    			}
    		],
    		"name": "OwnableUnauthorizedAccount",
    		"type": "error"
    	},
    	{
    		"inputs": [],
    		"name": "ReentrancyGuardReentrantCall",
    		"type": "error"
    	},
    	{
    		"anonymous": false,
    		"inputs": [
    			{
    				"indexed": true,
    				"internalType": "address",
    				"name": "account",
    				"type": "address"
    			}
    		],
    		"name": "ManufacturerWhitelisted",
    		"type": "event"
    	},
    	{
    		"anonymous": false,
    		"inputs": [
    			{
    				"indexed": true,
    				"internalType": "address",
    				"name": "previousOwner",
    				"type": "address"
    			},
    			{
    				"indexed": true,
    				"internalType": "address",
    				"name": "newOwner",
    				"type": "address"
    			}
    		],
    		"name": "OwnershipTransferred",
    		"type": "event"
    	},
    	{
    		"anonymous": false,
    		"inputs": [
    			{
    				"indexed": true,
    				"internalType": "bytes32",
    				"name": "batchId",
    				"type": "bytes32"
    			},
    			{
    				"indexed": true,
    				"internalType": "address",
    				"name": "manufacturer",
    				"type": "address"
    			}
    		],
    		"name": "Registered",
    		"type": "event"
    	},
    	{
    		"anonymous": false,
    		"inputs": [
    			{
    				"indexed": true,
    				"internalType": "bytes32",
    				"name": "batchId",
    				"type": "bytes32"
    			},
    			{
    				"indexed": false,
    				"internalType": "enum PharmaTraceSecure.Status",
    				"name": "newStatus",
    				"type": "uint8"
    			}
    		],
    		"name": "StatusChanged",
    		"type": "event"
    	},
    	{
    		"anonymous": false,
    		"inputs": [
    			{
    				"indexed": true,
    				"internalType": "bytes32",
    				"name": "batchId",
    				"type": "bytes32"
    			},
    			{
    				"indexed": true,
    				"internalType": "address",
    				"name": "from",
    				"type": "address"
    			},
    			{
    				"indexed": true,
    				"internalType": "address",
    				"name": "to",
    				"type": "address"
    			}
    		],
    		"name": "Transferred",
    		"type": "event"
    	},
    	{
    		"anonymous": false,
    		"inputs": [
    			{
    				"indexed": true,
    				"internalType": "address",
    				"name": "caller",
    				"type": "address"
    			},
    			{
    				"indexed": false,
    				"internalType": "uint256",
    				"name": "value",
    				"type": "uint256"
    			}
    		],
    		"name": "UnexpectedCall",
    		"type": "event"
    	},
    	{
    		"stateMutability": "payable",
    		"type": "fallback"
    	},
    	{
    		"inputs": [
    			{
    				"internalType": "address",
    				"name": "account",
    				"type": "address"
    			}
    		],
    		"name": "addManufacturer",
    		"outputs": [],
    		"stateMutability": "nonpayable",
    		"type": "function"
    	},
    	{
    		"inputs": [],
    		"name": "generateBatchSalt",
    		"outputs": [
    			{
    				"internalType": "uint256",
    				"name": "",
    				"type": "uint256"
    			}
    		],
    		"stateMutability": "view",
    		"type": "function"
    	},
    	{
    		"inputs": [
    			{
    				"internalType": "bytes32",
    				"name": "batchId",
    				"type": "bytes32"
    			}
    		],
    		"name": "getBatch",
    		"outputs": [
    			{
    				"internalType": "bytes32",
    				"name": "",
    				"type": "bytes32"
    			},
    			{
    				"internalType": "string",
    				"name": "",
    				"type": "string"
    			},
    			{
    				"internalType": "address",
    				"name": "",
    				"type": "address"
    			},
    			{
    				"internalType": "uint64",
    				"name": "",
    				"type": "uint64"
    			},
    			{
    				"internalType": "string",
    				"name": "",
    				"type": "string"
    			},
    			{
    				"internalType": "address",
    				"name": "",
    				"type": "address"
    			},
    			{
    				"internalType": "enum PharmaTraceSecure.Status",
    				"name": "",
    				"type": "uint8"
    			}
    		],
    		"stateMutability": "view",
    		"type": "function"
    	},
    	{
    		"inputs": [
    			{
    				"internalType": "address",
    				"name": "",
    				"type": "address"
    			}
    		],
    		"name": "isManufacturer",
    		"outputs": [
    			{
    				"internalType": "bool",
    				"name": "",
    				"type": "bool"
    			}
    		],
    		"stateMutability": "view",
    		"type": "function"
    	},
    	{
    		"inputs": [],
    		"name": "owner",
    		"outputs": [
    			{
    				"internalType": "address",
    				"name": "",
    				"type": "address"
    			}
    		],
    		"stateMutability": "view",
    		"type": "function"
    	},
    	{
    		"inputs": [
    			{
    				"internalType": "bytes32",
    				"name": "batchId",
    				"type": "bytes32"
    			},
    			{
    				"internalType": "string",
    				"name": "drugName",
    				"type": "string"
    			},
    			{
    				"internalType": "uint64",
    				"name": "manufactureDate",
    				"type": "uint64"
    			},
    			{
    				"internalType": "string",
    				"name": "cid",
    				"type": "string"
    			}
    		],
    		"name": "registerBatch",
    		"outputs": [],
    		"stateMutability": "nonpayable",
    		"type": "function"
    	},
    	{
    		"inputs": [],
    		"name": "renounceOwnership",
    		"outputs": [],
    		"stateMutability": "nonpayable",
    		"type": "function"
    	},
    	{
    		"inputs": [
    			{
    				"internalType": "bytes32",
    				"name": "batchId",
    				"type": "bytes32"
    			},
    			{
    				"internalType": "address",
    				"name": "to",
    				"type": "address"
    			}
    		],
    		"name": "transfer",
    		"outputs": [],
    		"stateMutability": "nonpayable",
    		"type": "function"
    	},
    	{
    		"inputs": [
    			{
    				"internalType": "address",
    				"name": "newOwner",
    				"type": "address"
    			}
    		],
    		"name": "transferOwnership",
    		"outputs": [],
    		"stateMutability": "nonpayable",
    		"type": "function"
    	},
    	{
    		"inputs": [
    			{
    				"internalType": "bytes32",
    				"name": "batchId",
    				"type": "bytes32"
    			},
    			{
    				"internalType": "enum PharmaTraceSecure.Status",
    				"name": "newStatus",
    				"type": "uint8"
    			}
    		],
    		"name": "updateStatus",
    		"outputs": [],
    		"stateMutability": "nonpayable",
    		"type": "function"
    	},
    	{
    		"stateMutability": "payable",
    		"type": "receive"
    	}
    ];
import dotenv from "dotenv";
dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
export const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, signer);

export async function registerBatch({ batchId, drugName, manufactureDate, cid }) {
  const tx = await contract.registerBatch(batchId, drugName, manufactureDate, cid);
  await tx.wait();
  return tx.hash;
}

export async function transferBatch({batchId, to}) {
  const tx = await contract.transfer(batchId, to);
  await tx.wait();
  return tx.hash;
}


export async function updateStatus({ batchId, newStatus }) {
    const tx = await contract.updateStatus(batchId, newStatus);
    await tx.wait();
    return tx;
  }

export async function getBatch(batchId) {
  return await contract.getBatch(batchId);
}
