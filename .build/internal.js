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
  Block: () => import_Block.default,
  Chain: () => import_Chain.default,
  MerkleNode: () => import_MerkleNode.default,
  MerkleTree: () => import_MerkleTree.default,
  NETWORK_WALLET: () => import_NETWORK_WALLET.default,
  Transaction: () => import_Transaction.default,
  Wallet: () => import_Wallet.default,
  calculateHash: () => import_utils.calculateHash,
  create: () => import_newWallet.create,
  getHash: () => import_utils.getHash,
  makeRoot: () => import_utils.makeRoot
});
var import_utils = __toModule(require("./src/utils"));
var import_Block = __toModule(require("./src/Block"));
var import_Chain = __toModule(require("./src/Chain"));
var import_Transaction = __toModule(require("./src/Transaction"));
var import_Wallet = __toModule(require("./src/Wallet"));
var import_MerkleNode = __toModule(require("./src/MerkleNode"));
var import_MerkleTree = __toModule(require("./src/MerkleTree"));
var import_NETWORK_WALLET = __toModule(require("./src/NETWORK_WALLET"));
var import_newWallet = __toModule(require("./src/newWallet"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Block,
  Chain,
  MerkleNode,
  MerkleTree,
  NETWORK_WALLET,
  Transaction,
  Wallet,
  calculateHash,
  create,
  getHash,
  makeRoot
});
//# sourceMappingURL=internal.js.map
