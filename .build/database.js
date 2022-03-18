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
  getWallet: () => getWallet,
  wallet: () => wallet
});
var import_mongoose = __toModule(require("mongoose"));
(0, import_mongoose.pluralize)((s) => s);
(0, import_mongoose.connect)(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).catch((e) => {
  console.error(e);
  console.log("Error while connecting to database, see above for full error");
  process.exit();
});
const WalletSchema = new import_mongoose.Schema({
  username: String,
  balance: Number,
  publicKey: String,
  privateKey: String
});
const wallet = (0, import_mongoose.model)("wallets", WalletSchema);
async function getWallet(id) {
  return await wallet.findOne({ username: id }) || new wallet({ username: id });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getWallet,
  wallet
});
//# sourceMappingURL=database.js.map
