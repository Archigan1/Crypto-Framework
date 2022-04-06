import { v4 as uuidv4 } from "uuid";
import { createHash, createSign, createVerify } from "crypto";
import { NETWORK_WALLET, Wallet, Chain } from '../internal';

/** 
* Defines a `Transaction` between `Wallet`s and attached to `Chain`s.
* @since v1.0.0
*/
class Transaction {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  hash: string;
  signature: string;
  /** 
  * Constructs a new `Transaction`.
  * @param senderPubKey - The public key of the sending `Wallet`.
  * @param receiverPubKey - The public key of the receiving `Wallet`.
  * @param amount - The amount of crypto to send.
  * @since v1.0.0
  */
  constructor(senderPubKey: string, receiverPubKey: string, amount: number) {
    /** @private */
    const id = uuidv4();
    /** @private */
    const data = senderPubKey + receiverPubKey + amount + id;
    /** @private */
    const hash = createHash("sha256").update(data).digest("hex");
    /** @private */
    this.id = id;
    /** @private */
    this.sender = senderPubKey;
    /** @private */
    this.receiver = receiverPubKey;
    /** @private */
    this.amount = amount;
    /** @private */
    this.hash = hash;
    /** @private */
    this.signature = "";
  }
  
  /**
  * This function signs the transaction.
  * @param wallet - The sending `Wallet`.
  * @since v1.0.0
  */
  sign(wallet: Wallet) {
    if (wallet.publicKey === this.sender) {
      const shaSign = createSign("sha256");
      shaSign.update(this.hash).end();
      this.signature = shaSign.sign(wallet.privateKey).toString("base64");
    }
  }
  
  /** 
  * Validifies the `Transaction`, and returns `false` if the transaction has been tampered with.
  * @param chain - The `Chain` to attach the `Transaction` to.
  * @returns Whether the `Transaction` is valid or not.
  * @since v1.0.0
  */
  isValid(chain: Chain): string | number | boolean {
    const sig = Buffer.from(this.signature, "base64");
    const verify = createVerify("sha256");
    verify.update(this.hash);
    const isVerified = verify.verify(this.sender, sig);

    const data = this.sender + this.receiver + this.amount + this.id;
    const hash = createHash("sha256").update(data).digest("hex");

    return (
      this.sender &&
      this.receiver &&
      this.amount &&
      (chain.getBalance(this.sender) >= this.amount ||
        this.sender === NETWORK_WALLET.publicKey) &&
      this.hash === hash &&
      isVerified
    );
  }
}

export default Transaction;