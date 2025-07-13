const https = require("https");
const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

// ✅ TLS CA patch
const caPath = "C:/Users/Anusha.potla/Documents/DappWorld/DigiCertGlobalRootG2.crt.pem";
https.globalAgent = new https.Agent({ ca: fs.readFileSync(caPath) });
axios.defaults.httpsAgent = https.globalAgent;

global.fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) =>
    fetch(...args, { agent: https.globalAgent })
  );

// ✅ Load Hardhat AFTER patch
const hre = require("hardhat");

(async () => {
  try {
    const deploy = require("./scripts/deploy.js");
    await deploy(); // Call main()
  } catch (err) {
    console.error("❌ TLS-patched deployment failed:", err);
  }
})();
