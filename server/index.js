const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { toHex, utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils");
const  secp256k1 = require("ethereum-cryptography/secp256k1");

app.use(cors());
app.use(express.json());

const balances = {
  "02e828ace37537e18155f1a0f1e7bf7f5da0d859f7fd9b982488390e46492da338": 100,
  "0207b5d32de68aea2cfee17307a449d03ce367389f571b70aa04fad5608b3b29d7": 50,
  "022a22bb0cae88560141c7d26ee317f86cec16dabed3a8848c2da65d382fce73d8": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, txHash, signature, publicKey } = req.body;

  const signatureBytes = hexToBytes(signature);
  const publicKeyBytes = hexToBytes(publicKey);
  const txHashBytes = hexToBytes(txHash);

  const isValid = secp256k1.verify(signatureBytes, txHashBytes, publicKeyBytes);
  if (!isValid) {
    return res.status(400).send({ message: "Invalid signature!" });
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  console.log(balances[sender]);
  if (balances[sender] < amount) {
   return res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    return res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 100;
  }
}
