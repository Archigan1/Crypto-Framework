import { calculateHash, Chain, Transaction, MerkleTree } from "../internal";

/** 
* Creates a `Block` instance for `Transaction`s and `Chain`s. 
* @since v1.0.0
*/

class Block {
  data: Array<Transaction>;
  hash: string;
  previousHash: string | null;
  rootHash: string;
  timestamp: Date;
  pow: number;
  /**
  * Constructs the `Block` class.
<<<<<<< HEAD
  * @param data - Provides the block data in terms of an array of `Transaction`s.
  * @param previousHash - The hash of the previous `Block` in the chain.
  * @since v1.0.0
=======
  * @param {Array<Transaction>} data - provides the block data in terms of an array of `Transaction`s.
  * @param {String | Null} previousHash - The hash of the previous `Block` in the chain.
>>>>>>> origin/main
  */
  constructor(data: Array<Transaction>, previousHash: string | null) {
    /** @private */
    this.data = data;
    /** @private */
    this.hash = "";
    /** @private */
    this.previousHash = previousHash;
    /** @private */
    this.rootHash = MerkleTree.create(data).root.value;
    /** @private */
    this.timestamp = new Date();
    /** @private */
    this.pow = 0;
  }
  
  /** 
  * The method used to mine a `Block`.
  * @param difficulty - The number of zeroes a generated hash must have for the block to be mined.
  * @since v1.0.0
  */
  mine(difficulty: number) {
    const regex = new RegExp(`^(0){${difficulty}}.*`);
    while (!this.hash.match(regex)) {
      this.pow++;
      this.hash = calculateHash(this);
    }
  }
  
  /**
  * Used to verify all of the `Transaction`s.
  * @param chain - The `Chain` to validify.
  * @returns Whether the entire chain is valid or not.
  * @since v1.0.0
  */
  hasValidTransactions(chain: Chain): boolean {
    return this.data.every((transaction: Transaction) =>
      transaction.isValid(chain);
    );
  }
}

export default Block;
