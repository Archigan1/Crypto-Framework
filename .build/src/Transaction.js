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
  default: () => Transaction_default
});
var import_uuid = __toModule(require("uuid"));
var import_crypto = __toModule(require("crypto"));
var import_NETWORK_WALLET = __toModule(require("./NETWORK_WALLET"));
class Transaction {
  constructor(senderPubKey, receiverPubKey, amount) {
    const id = (0, import_uuid.v4)();
    const data = senderPubKey + receiverPubKey + amount + id;
    const hash = (0, import_crypto.createHash)("sha256").update(data).digest("hex");
    this.id = id;
    this.sender = senderPubKey;
    this.receiver = receiverPubKey;
    this.amount = amount;
    this.hash = hash;
    this.signature = "";
  }
  sign(wallet) {
    if (wallet.publicKey === this.sender) {
      const shaSign = (0, import_crypto.createSign)("sha256");
      shaSign.update(this.hash).end();
      this.signature = shaSign.sign(wallet.privateKey).toString("base64");
    }
  }
  isValid(chain) {
    const sig = Buffer.from(this.signature, "base64");
    const verify = (0, import_crypto.createVerify)("sha256");
    verify.update(this.hash);
    const isVerified = verify.verify(this.sender, sig);
    const data = this.sender + this.receiver + this.amount + this.id;
    const hash = (0, import_crypto.createHash)("sha256").update(data).digest("hex");
    return this.sender && this.receiver && this.amount && (chain.getBalance(this.sender) >= this.amount || this.sender === import_NETWORK_WALLET.default.publicKey) && this.hash === hash && isVerified;
  }
}
var Transaction_default = Transaction;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=Transaction.js.map
