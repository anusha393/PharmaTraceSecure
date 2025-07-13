require('dotenv').config();
const { ethers } = require('ethers');

// Connect to provider and signer
// const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const provider = new ethers.InfuraProvider("sepolia", process.env.INFURA_KEY);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);





// Replace with your contract details
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "data",
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

const contract = new ethers.Contract(contractAddress, abi, signer);

async function main() {
  const value = await contract.get(); // Read function
  console.log("Stored value:", value.toString());

  const tx = await contract.set(123); // Write function
  await tx.wait();
  console.log("Value updated!");
}

main();
