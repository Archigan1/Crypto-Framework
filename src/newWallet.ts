import { getWallet } from '../database';
import { Wallet } from '../internal';

export async function create(username: string) {
  const newWallet = new Wallet();
  const wallet = await getWallet(username);
  wallet.balance = 0;
  wallet.publicKey = newWallet.publicKey;
  wallet.privateKey = newWallet.privateKey;
  wallet.save();
  console.log(`New wallet for user ${username}`);
  console.log(newWallet);
}