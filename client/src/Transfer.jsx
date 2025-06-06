import { useState } from "react";
import server from "./server";
import { toHex, utf8ToBytes, hexToBytes } from "ethereum-cryptography/utils";
import * as secp256k1 from "ethereum-cryptography/secp256k1";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const tx = { sender: address, amount: parseInt(sendAmount), recipient };
      const txHash = utf8ToBytes(JSON.stringify(tx));
      const privateKeyBytes = hexToBytes(privateKey);
      const signature = await secp256k1.sign(txHash, privateKeyBytes);
      const signatureHex = toHex(signature);

      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: toHex(secp256k1.getPublicKey(privateKeyBytes)),
        recipient,
        amount: parseInt(sendAmount),
        txHash: toHex(txHash),
        signature: signatureHex,
        publicKey: toHex(secp256k1.getPublicKey(privateKeyBytes)),
      });


      setBalance(balance);
      alert("Transfer successful");
    } catch (ex) {
      console.log(ex.response.data);
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="Amount"
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Recipient address"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
