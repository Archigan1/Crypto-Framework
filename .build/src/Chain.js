var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  default: () => Chain_default
});
var import_internal = __toModule(require("../internal"));
class Chain {
  constructor(chain, difficulty) {
    this.chain = chain;
    this.difficulty = difficulty;
    this.blockTime = 1e4;
    this.transactions = [];
    this.reward = 678;
  }
  static create(firstUserAddress) {
    const firstTransaction = new import_internal.Transaction(import_internal.NETWORK_WALLET.publicKey, firstUserAddress, 1e4);
    firstTransaction.sign(import_internal.NETWORK_WALLET);
    const genesisBlock = new import_internal.Block([firstTransaction], null);
    genesisBlock.mine(3);
    return new Chain([genesisBlock], 3);
  }
  addBlock(transactions) {
    const lastBlock = this.chain.at(-1);
    const newBlock = new import_internal.Block(transactions, lastBlock ? lastBlock.hash : null);
    newBlock.mine(this.difficulty);
    this.chain.push(newBlock);
    this.difficulty += Date.now() - newBlock.timestamp.getTime() > this.blockTime ? -1 : 1;
  }
  isValid() {
    if (this.chain[0].hash !== (0, import_internal.calculateHash)(this.chain[0]) || !this.chain[0].hasValidTransactions(this))
      return false;
    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];
      if (currentBlock.hash !== (0, import_internal.calculateHash)(currentBlock) || previousBlock.hash !== currentBlock.previousHash || !currentBlock.hasValidTransactions(this))
        return false;
    }
    return true;
  }
  addTransaction(transaction) {
    const isDuplicate = this.transactions.some(({ hash }) => hash === transaction.hash);
    if (!isDuplicate && transaction.isValid(this)) {
      this.transactions.push(transaction);
    }
  }
  getBalance(pubKey) {
    let balance = 0;
    this.chain.forEach((block) => {
      block.data.forEach((transaction) => {
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
  mineTransactions(rewardAddress) {
    const rewardTransaction = new import_internal.Transaction(import_internal.NETWORK_WALLET.publicKey, rewardAddress, this.reward);
    rewardTransaction.sign(import_internal.NETWORK_WALLET);
    this.addBlock([rewardTransaction, ...this.transactions]);
    this.transactions = [];
  }
}
var Chain_default = Chain;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=Chain.js.map
