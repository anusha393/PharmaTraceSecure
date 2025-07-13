# PharmaTraceSecure — Blockchain Toolkit for Pharmaceutical Traceability

PharmaTraceSecure is a secure blockchain-powered system for registering, monitoring, and verifying pharmaceutical batches. It combines Solidity smart contracts, Hardhat deployment, CLI tooling, RESTful APIs, event logging, Swagger documentation, and rigorous unit testing for audit-ready compliance workflows.

---

## Key Components

- **Smart Contract**: Lifecycle logic, role-based access control (manufacturer, holder), secure batch transitions
- **Hardhat Setup**: Compile and deploy contract to Sepolia, localhost, or Ganache
- **CLI Tool**: Register, view, transfer, and update batch status via `commander.js`
- **REST API**: Express routes for smart contract actions, formatted for frontend or backend integration
- **Swagger Docs**: Auto-generated OpenAPI 3.0 documentation via `/docs`
- **Event Logger**: Real-time listener for `Registered`, `Transferred`, and `StatusChanged`
- **Tests**: Full suite with Mocha/Chai for permission, transition, and fallback logic

---

## 📁 Folder & File Layout
. ├── contracts/ # PharmaTraceSecure.sol ├── scripts/deploy.js # Hardhat deploy script ├── hardhat.config.js # Solidity compiler and network config ├── cli.js # Command-line interface for contract calls ├── eventLogger.js # Blockchain event listener ├── index.js # Express app entry ├── swagger.js # Swagger setup ├── api/routes/batch.js # RESTful endpoints ├── test/test.cjs # Smart contract tests ├── lib/contract.js # Contract wrapper methods ├── .env # Environment variables ├── README.md # This file


---

## 🚀 Installation & Setup

### 1. Install dependencies
```bash
npm install

### 2. Create .env file
RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=YOUR_PRIVATE_KEY
CONTRACT_ADDRESS=DEPLOYED_CONTRACT_ADDRESS
PORT=4000

#### Deploying Contract (Sepolia)
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia

### 3. Run API Server
node index.js
Open http://localhost:4000/docs for interactive documentation.

CLI Usage
node cli.js register --batchId B001 --drugName "Paracetamol" --date 1720000000 --cid QmCID123
node cli.js get B001
node cli.js transfer --batchId B001 --to 0xRecipientAddress
node cli.js status --batchId B001 --status 2

Event Monitoring
To listen for contract activity:
node eventLogger.js
Outputs:
Registered: B001 by 0xMANUFACTURER
Transferred: B001 from 0xA to 0xB
Status Updated: B001 is now 2


Test Coverage
npx hardhat test
Validates:

Manufacturer access

Batch registration constraints

Transfer logic

Status updates

Fallback/receive rejection

Utility function behavior

Swagger Docs
Available at:
http://localhost:4000/docs
Auto-generated from JSDoc annotations in api/routes/batch.js.



