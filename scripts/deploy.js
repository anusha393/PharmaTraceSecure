
import hardhat from "hardhat";
const { ethers } = hardhat;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// this is for pharma
// const main = async () => {
//   // const [deployer] = await ethers.getSigners();
//   // console.log("Deploying with account:", deployer.address);

//   const ContractFactory = await ethers.getContractFactory("PharmaTraceSecure");
//   const contract = await ContractFactory.deploy();
//   await contract.waitForDeployment();

//   console.log(" Deployed at:", contract.target);
// };

//this is for ERC token
// async function main() {
//   const initialSupply = "1000000";
//   const ApexToken = await ethers.getContractFactory("ApexToken");
//   const token = await ApexToken.deploy(initialSupply);

//   await token.waitForDeployment();
//   console.log(`ApexToken deployed to: ${token.target}`);

// }

//this is for NFT
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();
  await myNFT.waitForDeployment();
  console.log(`MyNFT deployed to: ${myNFT.target}`);

}

main().catch((err) => {
  console.error("Deployment failed:", err);
  process.exit(1);
});

