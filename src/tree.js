import { Node } from "./node.js";
import { prettyPrint } from "./prettyPrint.js";

/**
 * Builds a balanced binary search tree from an array of numbers. The numbers
 * need not be pre-sorted or have all unique values, as that will be taken care
 * of internally. 
 */
class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);  
  }

  buildTree(arr) {
    // Initial processing: remove duplicates, then sort.   
    arr = [...new Set(arr)]; 
    arr.sort((a, b) => a - b);

    return this.#buildTreeRecur(arr, 0, arr.length - 1);
  }

  /**
   * 
   * @param {Array{Number}} arr must be sorted and free of duplicates
   * @param {Number} start defines the start index of arr from which to build a tree, *inclusive*
   * @param {Number} end defines the end index of arr from which to build a tree, also *inclusive*.
   * (tried the math with `end` being exclusive - didn't work out once get down to the leaf nodes)
   */
  #buildTreeRecur(arr, start, end) {

    // Stopping condition: tried to build a left or right subtree from a leaf node  
    if (end < start) {
      return null;
    }

    const mid = start + Math.floor((end - start) / 2);

    const root = new Node(arr[mid]);
    root.left = this.#buildTreeRecur(arr, start, mid - 1);
    root.right = this.#buildTreeRecur(arr, mid + 1, end);

    return root;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let curr = this.root;
    while (true) { // will terminate upon insertion or finding `value` is a duplicate
      if (value < curr.value) {
        if (curr.left) {
          curr = curr.left;
        } 
        else {
          curr.left = new Node(value);
          break;
        }
      }
      else if (value > curr.value) {
        if (curr.right) 
          curr = curr.right;
        else {
          curr.right = new Node(value);
          break;
        }
      }
      else {
        throw new Error("This value already exists in the tree.");
      }
    }
  }

  toString() {
    prettyPrint(this.root, ":");
  }
}

export {
  Tree,
};