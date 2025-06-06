import { useState } from "react";
import { toHex } from "ethereum-cryptography/utils";
import { randomBytes } from "@noble/hashes/utils";
import * as secp256k1 from "ethereum-cryptography/secp256k1";

function Wallet({ address, setAddress, balance, setPrivateKey }) {
  const [inputKey, setInputKey] = useState("");

  function generateWallet() {
    const privateKey = randomBytes(32);
    const privateKeyHex = toHex(privateKey);
    const publicKey = secp256k1.getPublicKey(privateKey);
    setPrivateKey(privateKeyHex);
    setAddress(toHex(publicKey));
    setInputKey("");
  }

  function importWallet() {
    try {
      const publicKey = secp.getPublicKey(inputKey);
      setPrivateKey(inputKey);
      setAddress(toHex(publicKey));
      setInputKey("");
    } catch (e) {
      alert("Invalid private key!");
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <button onClick={generateWallet}>Generate New Wallet</button>
      <div>
        <input
          type="text"
          placeholder="Import private key"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
        />
        <button onClick={importWallet}>Import</button>
      </div>
      <div style={{ marginTop: "1em" }}>
        <div><b>Address:</b> {address}</div>
        <div className="balance">Balance: {balance}</div>
      </div>
    </div>
  );
}

export default Wallet;
