import { generateKeyPairSync } from "crypto";
import { Chain, Transaction } from '../internal';

/** 
* Defines a `Wallet` class to be the basis for all user accounts.
* @since v1.0.0
*/
export default class Wallet {
  privateKey: string;
  publicKey: string;
  /** 
  * Constructs the `Wallet` Object.
  * @since v1.0.0
  */
  constructor() {
    /** @private */
    const keys = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });
    /** @private */
    this.privateKey = keys.privateKey;
    /** @private */
    this.publicKey = keys.publicKey;
  }
  
  /** 
  * Sends an amount of crypto from one user's `Wallet` to another user's `Wallet`.
  * @param amount - The amount to send.
  * @param receiver - The public key of the receiving party's `Wallet`.
  * @param blockchain - The `Chain` to send the `Transaction` on.
  * @since v1.0.0
  */
  send(amount: number, receiver: string, blockchain: Chain) {
    const transaction = new Transaction(this.publicKey, receiver, amount);
    transaction.sign(this);
    blockchain.addTransaction(transaction);
  }
}