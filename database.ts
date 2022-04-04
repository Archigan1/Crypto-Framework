import { pluralize, model, connect, Schema, Document } from "mongoose";

pluralize(s => s);

connect(process.env.DATABASE!).catch((e: Error) => {
    console.error(e);
    console.log("Error while connecting to database, see above for full error");
    process.exit();
});


interface IWallet extends Document {
  username: string;
  balance: number;
  publicKey: string;
  privateKey: string;
}
const WalletSchema = new Schema({
  username: String,
  balance: Number,
  publicKey: String,
  privateKey: String
});
export const wallet = model<IWallet>("wallets", WalletSchema);


export async function getWallet(id: string) {
  return await wallet.findOne({ username: id }) || new wallet({ username: id });
}