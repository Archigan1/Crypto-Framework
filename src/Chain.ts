import { calculateHash, NETWORK_WALLET, Block, Transaction, BlockError, ValidationError } from '../internal';

/**
* Defines a `Chain` instance to link a series of `Block`s used to track transactions.
* @since v1.0.0
*/

class Chain {
  chain: Array<Block>;
  difficulty: number;
  blockTime: number;
  transactions: Array<Transaction>;
  reward: number;
  /**
  * Constructs the `Chain` class.
  * @param chain - The chain itself, made up of multiple `Block` Objects.
  * @param difficulty - The number of zeroes a generated hash needs to have at the start to successfully mine a block.
  * @since v1.0.0
  */
  constructor(chain: Array<Block>, difficulty: number) {
    /** @private */
    this.chain = chain;
    /** @private */
    this.difficulty = difficulty;
    /** @private */
    this.blockTime = 10000;
    /** @private */
    this.transactions = [];
    /** @private */
    this.reward = 678;
  }

  /**
  * Creates the first `Block` in the `Chain`.
  * @param firstUserAddress - The public key of the new `Wallet`.
  * @returns The start of the blockchain, using the `genesisBlock`.
  * @since v1.0.0
  * @version v1.1.0
  */
  static create(firstUserAddress: string): Chain {
    const firstTransaction = new Transaction(
      NETWORK_WALLET.publicKey,
      firstUserAddress,
      1
    );
    firstTransaction.sign(NETWORK_WALLET);
    const genesisBlock = new Block([firstTransaction], null);
    genesisBlock.mine(3);
    if (genesisBlock.pow <= 0) {
      try {
        throw new BlockError('Proof of work too low!');
      } catch (e) {
        console.error(`${e.name}: ${e.message}\n ${e.stack}\n\nWith Proof Of Work 0, this Chain is not valid. Please mine again.`)
      }
    }
    return new Chain([genesisBlock], 3);
  }

  /**
  * Adds a `Block` Object to the chain.
  * @param transactions - The transactions used to formulate the `Block`.
  * @since v1.0.0
  */
  addBlock(transactions: Array<Transaction>) {
    const lastBlock = this.chain.at(-1);
    const newBlock = new Block(transactions, lastBlock ? lastBlock.hash : null);
    newBlock.mine(this.difficulty);
    this.chain.push(newBlock);
    this.difficulty +=
      Date.now() - newBlock.timestamp.getTime() > this.blockTime ? -1 : 1;
  }

  /**
  * Verifies the `Chain`, and returns `false` if tampered with.
  * @returns Whether the `Transaction` and `Block` are valid.
  * @since v1.0.0
  */
  isValid(): boolean {
    if (
      this.chain[0].hash !== calculateHash(this.chain[0]) ||
      !this.chain[0].hasValidTransactions(this)
    )
      try {
        throw new ValidationError('Chain')
      } catch (e) {
        console.error(`${e.name}: ${e.super}\n${e.stack}`)
      };

    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];
      if (
        currentBlock.hash !== calculateHash(currentBlock) ||
        previousBlock.hash !== currentBlock.previousHash ||
        !currentBlock.hasValidTransactions(this)
      )
        try {
          throw new ValidationError('Hash')
        } catch (e) {
          console.error(`${e.name}: ${e.super}\n${e.stack}`)
        };
    }
    return true;
  }



  /**
  * Adds a `Transaction` Object to the chain.
  * @param transaction - The `Transaction` Object to be added.
  * @since v1.0.0
  */
  addTransaction(transaction: Transaction) {
    const isDuplicate = this.transactions.some(
      ({ hash }) => hash === transaction.hash
    );
    if (!isDuplicate && transaction.isValid(this)) {
      this.transactions.push(transaction);
    }
  }

  /**
  * Gets the balance of a specified `Wallet`.
  * @param pubKey - The public key of the wallet to be queried.
  * @returns The balance of the queried `Wallet`.
  * @since v1.0.0
  */
  getBalance(pubKey: string): number {
    let balance = 0;
    this.chain.forEach((block) => {
      block.data.forEach((transaction: Transaction) => {
        if (transaction.sender === pubKey) {
          balance -= transaction.amount;
        }

        if (transaction.receiver === pubKey) {
          balance += transaction.amount;
        }
      });
    });
    return balance;
  }

  /**
  * Allows the user to mine the `Transaction` to claim their crypto sent to them.
  * @param rewardAddress - The public key of the intended receiver.
  * @since v1.0.0
  */
  mineTransactions(rewardAddress: string) {
    const rewardTransaction = new Transaction(
      NETWORK_WALLET.publicKey,
      rewardAddress,
      this.reward
    );
    rewardTransaction.sign(NETWORK_WALLET);
    this.addBlock([rewardTransaction, ...this.transactions]);
    this.transactions = [];
  }
}

export default Chain;