import Chain from "./src/Chain";
import { create } from './src/newWallet';

function createTestWallet(username: string) {
  create(username);
}

createTestWallet("test");

/* function init() {
  const blockchain = Chain.create(Alice.publicKey);
  Alice.send(1299, Bob.publicKey, blockchain);
  Alice.send(345, Bob.publicKey, blockchain);
  blockchain.mineTransactions(Bob.publicKey);
  console.log("Alice has " + blockchain.getBalance(Alice.publicKey));
  console.log("Bob has " + blockchain.getBalance(Bob.publicKey));
  console.log(`Blockchain is${blockchain.isValid() ? "" : " not"} valid`);
} */