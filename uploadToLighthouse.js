const lighthouse = require('@lighthouse-web3/sdk');
const { ethers } = require('ethers');
const fs = require('fs');

const apiKey = '6491d085.bbab76ee8a0449e7b31303d848e020ca';
const publicKey = '0x1CFB14A7001AD8c8b54f2b00CCBa078AF4FB7fB5';
const privateKey = 'e3b700c1165ef3ecfd53dc2938441625c92385dc9981f3646fe13958f7283c11'; // Be careful not to share this publicly!

async function uploadMetadata() {
  const provider = new ethers.JsonRpcProvider('https://rpc.sepolia.org');
  const signer = new ethers.Wallet(privateKey, provider);

  const message = (await lighthouse.getAuthMessage(publicKey)).data.message;
  const signedMessage = await signer.signMessage(message);

  const response = await lighthouse.uploadEncrypted(
    './cosmic-ape.json', // Change this if your JSON file has a different name
    apiKey,
    publicKey,
    signedMessage
  );

  console.log('✅ Metadata uploaded to IPFS!');
  console.log(`🔗 tokenURI: ipfs://${response.data[0].Hash}`);

}

uploadMetadata();
