
import hardhat from "hardhat";
const { ethers } = hardhat;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


const main = async () => {
  // const [deployer] = await ethers.getSigners();
  // console.log("Deploying with account:", deployer.address);

  const ContractFactory = await ethers.getContractFactory("PharmaTraceSecure");
  const contract = await ContractFactory.deploy();
  await contract.waitForDeployment();

  console.log(" Deployed at:", contract.target);
};

main().catch((err) => {
  console.error("Deployment failed:", err);
  process.exit(1);
});

