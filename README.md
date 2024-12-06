# Smart Contract API Marketplace
This project is a backend server application designed for managing a decentralized marketplace using smart contracts. It provides a RESTful API to interact with Ethereum-based contracts to manage marketplace items. Built with NestJS and Ethers.js, it facilitates listing, purchasing, and withdrawing earnings from token transactions.
Here is the related smart contract repository: [Smart Contract Marketplace](https://github.com/IsmaelTerreno/smart-contract-marketplace)
## Features
- **List Items**: Allows users to list their tokens on the marketplace.
- **View Items**: Fetch all available listings in the marketplace.
- **Purchase Items**: Enables buyers to purchase listed tokens.
- **Withdraw Earnings**: Allows sellers to withdraw their earnings from successful sales.
- **Blockchain Interaction**: Uses Ethers.js to interact with smart contracts deployed on Ethereum.

## Prerequisites
- Node.js v14 or higher
- npm (Node Package Manager)
- A running Ethereum node (local or remote)
- Environment Variables configured (refer to .env.sample for example settings)

## Installation
1. **Clone the Repository:**
``` bash
   git clone https://github.com/IsmaelTerreno/smart-contract-api-marketplace.git
```
``` bash
   cd smart-contract-api-marketplace
```
1. **Install Dependencies:**
``` bash
   npm install
```
1. **Environment Configuration:**
   Copy `.env.sample` to `.env` and configure your blockchain and contract details.
``` bash
   cp .env.sample .env
```
1. **Build the Project:**
``` bash
   npm run build
```
1. **Run the Application:**
``` bash
   npm start
```
The application will start on port 6000 by default.
## Usage
- **API Endpoints:**
   - `POST /api/v1/marketplace/list`: List a token on the marketplace.
   - `GET /api/v1/marketplace/items`: Retrieve all items in the marketplace.
   - `POST /api/v1/marketplace/purchase`: Purchase a listed item.
   - `POST /api/v1/marketplace/withdraw`: Withdraw earnings for sellers.
   - `GET /api/v1/marketplace`: Home endpoint returning a welcome message.
   - `GET /api/v1/marketplace/general-info-config-marketplace`: Retrieve general information for marketplace configuration, mainly for demo and testing purposes.
## Testing
The project includes e2e tests to test the API endpoints. Use the following command to run the tests:
``` bash
npm run test:e2e
```
Make sure to configure your `.env` with the appropriate contract addresses and wallet information before running tests.
## Project Structure
- **src/app.module.ts:** Main application module importing various sub-modules.
- **src/blockchain:** Contains blockchain interaction logic using Ethers.js.
- **src/marketplace:** Includes the marketplace logic, with service and controller for handling API requests.
- **test:** Contains e2e tests for the application.

## Technologies Used
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Ethers.js**: A complete and compact Ethereum wallet implementation library.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Jest**: JavaScript testing framework designed to ensure correctness of any JavaScript codebase.

## Acknowledgements
This project is built on the cutting-edge technology of Ethereum smart contracts and leverages NestJS for a robust backend architecture.
Feel free to modify sections specific to your project's needs or add more technical details as necessary!

---
# Assessment Objective related to this project
Develop a dApp (Decentralized Application) consisting of:
1. Smart Contracts: Implement a decentralized token-based marketplace.
2. Backend Service: Build a backend to interact with the smart contracts and manage EIP-712 signatures.
3. Frontend GUI: Create a simple user interface for interacting with the marketplace.

## Detailed Requirements

---

### Part 1: Smart Contracts

1. Implement a Marketplace contract using ERC-20 tokens as the traded items.
   - List Item: A user can list a certain number of ERC-20 tokens for sale at a specified price in Ether.
   - Purchase Item: Another user can purchase the listed tokens by sending the required amount of Ether. The tokens are transferred to
     the buyer.
   - Withdraw Funds: Sellers can withdraw their earnings in Ether from the marketplace contract.
2. EIP-712 Signed Message Interaction:
   - Add a function that enables token transfers based on an EIP-712 signed message:
   - Users can sign a message authorizing the marketplace to transfer tokens on their behalf.
   - The contract verifies the signature before executing the transfer.
   - Include a specific use case in the marketplace:
   - Allow sellers to pre-authorize token listings using signed messages.
3. Key Requirements:
   Use Solidity and follow EVM-compatible standards.
   Include events for important actions ( ItemListed, ItemPurchased, FundsWithdrawn).
   Use OpenZeppelin libraries such as ERC-20 where possible.
---
### Part 2: Backend Service

1. Build a backend service to:
   - Query listed items and purchase history from the smart contract.
   - Generate EIP-712-compliant messages for token transfers.
     Facilitate API routes for:
   - Listing items via signed messages ( POST /list).
   - Querying all items ( GET /items).
   - Purchasing item ( POST /purchase).
   - Withdraw item ( POST /withdraw)
2. Sell Tokens Directly (Optional Advanced Use Case):
   Provide an API route ( POST /sell) to:
   - Accept signed EIP-712 messages authorizing the backend to facilitate direct token transfers between users.
   - Push the transfer transaction to the blockchain on behalf of the seller and buyer.
3. Key Requirements:
   - Use Node.js with Express, Nestjs or any other equivalent framework.
   - Integrate Web3.js or ethers.js for contract interaction.
   - Include utilities for signing messages on behalf of users (e.g., using a wallet or private key during testing).
---
### Part 3: Frontend GUI
1. Build a simple GUI to interact with the backend and marketplace:
   - Marketplace: Display all listed ERC-20 tokens, including name, price, and quantity.
   - Listing Form: Allow users to list tokens for sale. Include an option to sign the listing with their wallet.
   - Purchase Flow: Enable users to buy tokens by connecting their wallet.
   - Withdraw Section: Allow sellers to withdraw their funds in Ether.
2. Key Requirements:
   - Use a modern frontend framework (React, Vue, etc.).
   - Implement wallet integration using MetaMask, WalletConnect, or wagmi.
   - Display detailed information about signed messages and their validation.
     Bonus (Optional)
     Add a test suite for:
   - Smart contracts (using Hardhat or Foundry).
   - EIP-712 message verification.
   - Deploy the contract to a testnet (e.g., sepolia or zkSync Era) and provide the deployment address.
   - Implement token price sorting or filtering on the frontend.
   - Add off-chain caching of marketplace data for performance (e.g., using Redis).
