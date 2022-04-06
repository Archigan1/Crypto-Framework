/**
* Defines a Merkle Node, used in making a Merkle Tree.
* @since v1.0.0
*/
class MerkleNode {
  value: string;
  left: MerkleNode | null;
  right: MerkleNode | null;
  /**
  * Constructs the `MerkleNode`.
  * @param value - Takes the hash of a `Transaction`.
  * @param left - The node down and to the left of the current node.
  * @param right - The node down and to the right of the current node.
  * @since v1.0.0
  */
  constructor(value: string, left: MerkleNode | null = null, right: MerkleNode | null = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export default MerkleNode;