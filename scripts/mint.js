
import hardhat from "hardhat";
const { ethers } = hardhat;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

async function main() {
  const contractAddress = "0x4c11bb84B5b8104bd342B8762DFDcd27097CF139";
  const MyNFT = await ethers.getContractAt("MyNFT", contractAddress);

  const recipient = "0x1CFB14A7001AD8c8b54f2b00CCBa078AF4FB7fB5";
  const tokenURI = "ipfs://bafkreiaal3itooaxet3uqnivmu7afxacldiywcrur6qxq2kc7jhlqgzika";

  const tx = await MyNFT.mintNFT(recipient, tokenURI);
  console.log("Minting in progress...");
  await tx.wait();
  console.log(`Minted NFT to ${recipient} with tokenURI ${tokenURI}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
