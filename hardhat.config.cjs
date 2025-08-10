require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-deploy");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.RPC_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // first account by default
    },
  },
};

