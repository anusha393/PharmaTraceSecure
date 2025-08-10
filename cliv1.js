#!/usr/bin/env node

require("dotenv").config();
const { ethers } = require("ethers");
const { program } = require("commander");
const hre = require("hardhat");

// const provider = new ethers.InfuraProvider("sepolia", process.env.INFURA_KEY);
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
// const https = require("https");

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });
const { InfuraProvider, FetchRequest } = require("ethers");



const https = require("https");
const fs = require("fs");

// Optional CA pinning (if needed)
// const ca = fs.readFileSync("path/to/DigiCert.pem");
https.globalAgent = new https.Agent({
  rejectUnauthorized: false,
});

// Override fetch to ignore SSL errors
FetchRequest.create = function (url) {
  const req = new FetchRequest(url);
  req.agent = new https.Agent({ rejectUnauthorized: false });
  return req;
};

// const provider = new InfuraProvider("sepolia", process.env.INFURA_KEY);


const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log("Wallet address:", signer.address);


// Replace with your contract ABI and address
const contractAddress = "0x688c0611a5691B7c1F09a694bf4ADfb456a58Cf7";
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
// const contract = new ethers.Contract(contractAddress, contractABI, signer);

async function getContract() {
	const signer = (await hre.ethers.getSigners())[0];
	return new hre.ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  }
  
  program
	.command("get")
	.description("Read stored value")
	.action(async () => {
	  const contract = await getContract();
	  const value = await contract.get();
	  console.log("Stored value:", value.toString());
	});

	program
  .command("set <num>")
  .description("Set a new value")
  .action(async (num) => {
    const contract = await getContract();
    const tx = await contract.set(num);
    await tx.wait();
    console.log(`New value set: ${num}`);
  });

program.parse(process.argv);