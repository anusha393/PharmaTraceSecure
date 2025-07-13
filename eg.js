

// ### 🛠️ **1. CLI Execution Header**

```js
#!/usr/bin/env node
```

// - This tells Unix-based systems (like Linux/macOS) to use Node.js when executing this file as a command-line tool.  
//   👉 On Windows, this line doesn’t do anything, but it’s safe to include.



// ### 🌿 **2. Load Environment Variables**

```js
require("dotenv").config();
```

// - Loads values from your `.env` file (like `INFURA_KEY` and `PRIVATE_KEY`) into `process.env`.
//   👉 Useful for keeping sensitive info out of your code.



// ### 📦 **3. Import Modules**

```js
const { ethers } = require("ethers");
const { program } = require("commander");
```

// - `ethers`: Connects to Ethereum and interacts with smart contracts.
// - `commander`: Builds a command-line interface (CLI).

// ---

// ### 🔌 **4. Configure Provider and Signer**

```js
const provider = new ethers.InfuraProvider("sepolia", process.env.INFURA_KEY);
```

// - Connects your app to the **Sepolia testnet** using your Infura project key.
  
```js
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
```

// - Creates a wallet from your private key and ties it to the provider.  
//   👉 This lets you sign and send transactions.

// ---

// ### 🧠 **5. Load Smart Contract**

```js
const contractABI = [/* your ABI here */];
const contractAddress = "0xYourContractAddress";
const contract = new ethers.Contract(contractAddress, contractABI, signer);
```

// - `ABI` = Application Binary Interface = the blueprint of your contract's methods.
// - `contractAddress` = address of your deployed contract.
// - `contract` = the actual instance that you interact with.

// ---

// ### 🧪 **6. CLI Commands**

// #### 🧾 Read command

```js
program
  .command("get")
  .description("Read stored value")
  .action(async () => {
    const value = await contract.get();
    console.log("Stored value:", value.toString());
  });
```

// - Defines the `get` command which calls the contract’s `get()` function.
// - Prints the value to the terminal.

// #### ✍️ Write command

```js
program
  .command("set <num>")
  .description("Set a new value")
  .action(async (num) => {
    const tx = await contract.set(num);
    await tx.wait();
    console.log("New value set!");
  });
```

// - Defines `set` command that sends a transaction to change the value.
// - `await tx.wait()` waits until the transaction is confirmed on-chain.

// ---

// ### 🧭 **7. Parse Terminal Arguments**

```js
program.parse(process.argv);
```

// - Reads arguments from the command line (like `node cli.js get`) and runs the matching command.

// ---

// Let me know if you’d like help adding validations, logging events, or deploying and interacting with an actual contract on Sepolia from this CLI. We can also expand this into a full backend service if you’d like to level it up 🔁🔗💪