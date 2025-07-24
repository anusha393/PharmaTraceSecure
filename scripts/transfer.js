
import hardhat from "hardhat";
const { ethers } = hardhat;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


async function main() {
  const contractAddress = "0x4c11bb84B5b8104bd342B8762DFDcd27097CF139";
  const MyNFT = await ethers.getContractAt("MyNFT", contractAddress);

  const sender = "0x1CFB14A7001AD8c8b54f2b00CCBa078AF4FB7fB5";
  const recipient = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";
  const tokenId = 0; // adjust based on what you minted

  const tx = await MyNFT.transferFrom(sender, recipient, tokenId);
  console.log("🔄 Transferring NFT...");
  await tx.wait();
  console.log(`✅ NFT with tokenId ${tokenId} transferred to ${recipient}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
