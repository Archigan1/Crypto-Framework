import { createHash } from "crypto";
import { Block, MerkleNode } from '../internal';

/** 
* Returns a newly generated hash based on a string of data.
* @param data - The data used to generate the hash.
* @returns A hash.
* @since v1.0.0
*/
export const getHash = (data: string): string => {
  return createHash("sha256").update(data.toString()).digest("hex");
};

/** 
* Makes a root network of `MerkleNode`s, used in formulating a `MerkleTree`.
* @param arr - An array of `MerkleNode`s used to make a `MerkleTree`.
* @returns A list of `MerkleNode`s to be used at the bottom of the future `MerkleTree`.
* @since v1.0.0
*/
export const makeRoot = (arr: Array<MerkleNode>): MerkleNode => {
  if (arr.length === 1) return arr[0];
  const list = [];
  const length = arr.length;
  for (let i = 0; i < length; i += 2) {
    const currentItem = arr[i];
    if (i + 1 >= length) {
      list.push(currentItem);
      break;
    }
    const nextItem = arr[i + 1];
    let value = currentItem.value + nextItem.value;
    const node = new MerkleNode(getHash(value), currentItem, nextItem);
    list.push(node);
  }
  return makeRoot(list);
};

/** 
* Calculates a hash based off of a `Block` Object and its data. Used for mining.
* @param block - The `Block` Object used to generate the hash.
* @returns The hash to be checked against a difficulty.
* @since v1.0.0
*/
export const calculateHash = (block: Block) => {
  const blockData =
    block.rootHash +
    block.previousHash +
    block.timestamp.toISOString() +
    block.pow.toString();
  return createHash("sha256").update(blockData).digest("hex");
};