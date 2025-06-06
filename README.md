# ECDSA Web Wallet Demo

A secure web application demonstrating digital signatures and public key cryptography for peer-to-peer transfers using the Elliptic Curve Digital Signature Algorithm (ECDSA).

## Project Overview

This project showcases a client-server web application where users can securely transfer funds between accounts using cryptographic signatures. The app leverages ECDSA to ensure that only the owner of a private key can authorize transactions from their account, providing a hands-on demonstration of how modern cryptocurrencies secure digital assets.

## Features

- **Secure Wallet Generation:** Users can generate or import a private key in the browser. The private key never leaves the client.
- **Public Key Addressing:** Accounts are identified by public keys, similar to blockchain wallets.
- **Digital Signatures:** All transactions are signed client-side using ECDSA, and the server verifies signatures before processing transfers.
- **Balance Tracking:** The server maintains balances for each public key.
- **No Private Key Exposure:** Private keys are never sent to the server, ensuring user security.

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Cryptography:** [ethereum-cryptography](https://www.npmjs.com/package/ethereum-cryptography) v1.2.0

## How It Works

1. **Wallet Creation:** Users generate or import a private key in the browser. The corresponding public key is derived and used as the account address.
2. **Transaction Signing:** When sending funds, the client signs the transaction data with the private key using ECDSA.
3. **Server Verification:** The server receives the transaction, signature, and public key. It verifies the signature and checks the sender's balance before processing the transfer.
4. **Security:** At no point is the private key transmitted or stored on the server.

## Screenshots

<!-- Add screenshots of the wallet UI and transfer form here -->

## Why This Project Is Impressive

- Demonstrates real-world cryptographic security principles in a web application.
- Illustrates how digital signatures can be used to authenticate and authorize transactions without exposing sensitive keys.
- Provides a foundation for understanding how blockchain wallets and transactions work under the hood.

## Running the Project

### Client

1. `cd client`
2. `npm install`
3. `npm run dev`
4. Visit [http://localhost:5173/](http://localhost:5173/)

### Server

1. `cd server`
2. `npm install`
3. `node index.js` (or `nodemon index.js` for auto-reload)
4. The server runs on port 3042 by default.

## Credits

Built as a demonstration of secure digital signatures and public key cryptography in web applications.
