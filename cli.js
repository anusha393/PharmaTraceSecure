#!/usr/bin/env node

// import { Command } from "commander";
// import { ethers } from "ethers";
// import * as dotenv from "dotenv";
// import chalk from "chalk";
// // import contractJson from "./artifacts/contracts/PharmaTraceSecure.sol/PharmaTraceSecure.json" assert { type: "json" };
// const contractABI = [
// 	{
// 		"inputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnableInvalidOwner",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnableUnauthorizedAccount",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "ReentrancyGuardReentrantCall",
// 		"type": "error"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "ManufacturerWhitelisted",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "previousOwner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnershipTransferred",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "bytes32",
// 				"name": "batchId",
// 				"type": "bytes32"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "manufacturer",
// 				"type": "address"
// 			}
// 		],
// 		"name": "Registered",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "bytes32",
// 				"name": "batchId",
// 				"type": "bytes32"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "enum PharmaTraceSecure.Status",
// 				"name": "newStatus",
// 				"type": "uint8"
// 			}
// 		],
// 		"name": "StatusChanged",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "bytes32",
// 				"name": "batchId",
// 				"type": "bytes32"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			}
// 		],
// 		"name": "Transferred",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "caller",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "UnexpectedCall",
// 		"type": "event"
// 	},
// 	{
// 		"stateMutability": "payable",
// 		"type": "fallback"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "addManufacturer",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "generateBatchSalt",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "bytes32",
// 				"name": "batchId",
// 				"type": "bytes32"
// 			}
// 		],
// 		"name": "getBatch",
// 		"outputs": [
// 			{
// 				"internalType": "bytes32",
// 				"name": "",
// 				"type": "bytes32"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint64",
// 				"name": "",
// 				"type": "uint64"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "enum PharmaTraceSecure.Status",
// 				"name": "",
// 				"type": "uint8"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"name": "isManufacturer",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "owner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "bytes32",
// 				"name": "batchId",
// 				"type": "bytes32"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "drugName",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "uint64",
// 				"name": "manufactureDate",
// 				"type": "uint64"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "cid",
// 				"type": "string"
// 			}
// 		],
// 		"name": "registerBatch",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "renounceOwnership",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "bytes32",
// 				"name": "batchId",
// 				"type": "bytes32"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			}
// 		],
// 		"name": "transfer",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "transferOwnership",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "bytes32",
// 				"name": "batchId",
// 				"type": "bytes32"
// 			},
// 			{
// 				"internalType": "enum PharmaTraceSecure.Status",
// 				"name": "newStatus",
// 				"type": "uint8"
// 			}
// 		],
// 		"name": "updateStatus",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"stateMutability": "payable",
// 		"type": "receive"
// 	}
// ];

// dotenv.config();

// const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
// const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, signer);

// const program = new Command();
// // your CLI commands...









import { ethers } from "ethers";


import { Command } from "commander";
import * as CT from "./lib/contract.js";
import chalk from "chalk";

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


const program = new Command();


program
  .command("register")
  .description("Register new batch")
  .requiredOption("--batchId <id>")
  .requiredOption("--drugName <name>")
  .requiredOption("--date <timestamp>")
  .requiredOption("--cid <hash>")
  .action(async ({ batchId, drugName, date, cid }) => {
    console.log("ddddddddddddddddddddddddddddd",drugName.length)
    const hexId = ethers.encodeBytes32String(batchId);
    // const hexName = ethers.encodeBytes32String(drugName);
    const hexCid = ethers.encodeBytes32String(cid);
    const tx = await CT.registerBatch({
      batchId: hexId,
      drugName,
      manufactureDate: date,
      cid: hexCid,
    });
    console.log(chalk.green(` Registered: ${tx}`));
  });

program
  .command("get <batchId>")
  .description("Retrieve batch details")
  .action(async (id) => {
    const hex = ethers.encodeBytes32String(id);
    const b = await CT.getBatch(hex);
    console.log(chalk.blue(`Batch Info:\n`), b);
  });


  program
  .command("transfer")
  .description("Transfer batch ownership to a new address")
  .requiredOption("--batchId <id>", "Batch ID to transfer")
  .requiredOption("--to <address>", "Recipient wallet address")
  .action(async ({ batchId, to }) => {
    const hexBatchId = ethers.encodeBytes32String(batchId);
    const tx = await CT.transferBatch({ batchId: hexBatchId, to });
    console.log(chalk.green(`Batch transferred to ${to}. Tx: ${tx.hash}`));
  });

program
  .command("status")
  .description("Update batch status (1 = InTransit, 2 = Received, 3 = Verified)")
  .requiredOption("--batchId <id>", "Batch ID to update")
  .requiredOption("--status <int>", "New status (must be higher than current)")
  .action(async ({ batchId, status }) => {
    const hexBatchId = ethers.encodeBytes32String(batchId);
    const tx = await CT.updateStatus({
      batchId: hexBatchId,
      newStatus: parseInt(status)
    });
    console.log(chalk.yellow(` Status updated to ${status}. Tx: ${tx.hash}`));
  });

program.parse(process.argv);


