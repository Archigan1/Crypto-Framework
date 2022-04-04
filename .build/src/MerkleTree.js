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
  default: () => MerkleTree_default
});
var import_internal = __toModule(require("../internal"));
class MerkleTree {
  constructor(root, size) {
    this.root = root;
    this.size = size;
  }
  static create(transactions) {
    const size = Math.ceil(Math.log2(transactions.length)) + 1;
    const root = (0, import_internal.makeRoot)(transactions.map((trn) => new import_internal.MerkleNode(trn.hash)));
    return new MerkleTree(root, size);
  }
  findSiblingOf(hash, node = this.root) {
    var _a, _b;
    if (node.value === hash)
      return { node };
    if (!node.left && !node.right)
      return null;
    if (((_a = node.left) == null ? void 0 : _a.value) === hash)
      return { node: node.right, left: false };
    if (((_b = node.right) == null ? void 0 : _b.value) === hash)
      return { node: node.left, left: true };
    return this.findSiblingOf(hash, node.left) || this.findSiblingOf(hash, node.right);
  }
  verify(transaction) {
    let hash = transaction.hash;
    let sibling = this.findSiblingOf(hash);
    while (sibling && sibling.node.value !== this.root.value) {
      const val = sibling.left ? sibling.node.value + hash : hash + sibling.node.value;
      hash = (0, import_internal.getHash)(val);
      sibling = this.findSiblingOf(hash);
    }
    return sibling && sibling.node.value === this.root.value ? true : false;
  }
}
var MerkleTree_default = MerkleTree;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=MerkleTree.js.map
