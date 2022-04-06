import { getHash, makeRoot, MerkleNode, Transaction } from '../internal';

/**
* The Merkle Tree used to combine hashes together when mining.
* @since v1.0.0
*/
class MerkleTree {
  root: MerkleNode;
  size: number;
  /**
  * Constructs the `MerkleTree`.
  * @param root - The `MerkleNode` used as part of the final hash at the top of the tree.
  * @param size - 2 to the power of this is the amount of leaves that will be used to make the final tree.
  * @since v1.0.0
  */
  constructor(root: MerkleNode, size: number) {
    /** @private */
    this.root = root;
    /** @private */
    this.size = size;
  }
  
  /**
  * Creates the `MerkleTree` Object.
  * @param transactions - The `Transaction`s to be used in making the tree.
  * @returns A new `MerkleTree` Object.
  * @since v1.0.0
  */
  static create(transactions: Array<Transaction>) {
    const size = Math.ceil(Math.log2(transactions.length)) + 1;
    const root = makeRoot(transactions.map((trn) => new MerkleNode(trn.hash)));
    return new MerkleTree(root, size);
  }
  
  /**
  * Finds the sibling of the `MerkleNode` to combine with.
  * @param hash - The hash of the transaction used in the `MerkleTree.verify()` method.
  * @param node - The `MerkleNode` whose sibling you're finding.
  * @returns Either the sibling of the node or null.
  * @since v1.0.0
  */
  findSiblingOf(hash: string, node: MerkleNode | any = this.root): any {
    if (node.value === hash) return { node };
    if (!node.left && !node.right) return null;
    if (node.left?.value === hash) return { node: node.right, left: false };
    if (node.right?.value === hash) return { node: node.left, left: true };
    return (
      this.findSiblingOf(hash, node.left) ||
      this.findSiblingOf(hash, node.right)
    );
  }

  /** 
  * Verifies the siblings using a `Transaction`.
  * @param transaction - A `Transaction` Object whose hash is used to verify the sibling of the node.
  * @returns A boolean that says whether the sibling was valid or not.
  * @since v1.0.0
  */
  verify(transaction: Transaction) {
    let hash = transaction.hash;
    let sibling = this.findSiblingOf(hash);
    while (sibling && sibling.node.value !== this.root.value) {
      const val = sibling.left
        ? sibling.node.value + hash
        : hash + sibling.node.value;
      hash = getHash(val);
      sibling = this.findSiblingOf(hash);
    }

    return sibling && sibling.node.value === this.root.value ? true : false;
  }
}

export default MerkleTree;