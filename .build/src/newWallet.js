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
  create: () => create
});
var import_database = __toModule(require("../database"));
var import_Wallet = __toModule(require("./Wallet"));
async function create(username) {
  const newWallet = new import_Wallet.default();
  const wallet = await (0, import_database.getWallet)(username);
  wallet.balance = 0;
  wallet.publicKey = newWallet.publicKey;
  wallet.privateKey = newWallet.privateKey;
  wallet.save();
  console.log(`New wallet for user ${username}`);
  console.log(newWallet);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create
});
//# sourceMappingURL=newWallet.js.map
