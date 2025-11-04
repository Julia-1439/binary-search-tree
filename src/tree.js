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
    while (true) {
      // will terminate upon insertion or finding `value` is a duplicate
      if (value < curr.value) {
        if (curr.left) {
          curr = curr.left;
        } else {
          curr.left = new Node(value);
          break;
        }
      } else if (value > curr.value) {
        if (curr.right) curr = curr.right;
        else {
          curr.right = new Node(value);
          break;
        }
      } else {
        throw new Error("This value already exists in the tree.");
      }
    }
  }

  /**
   *
   * @param {Number} value
   * @returns {Node} new tree with the node containing `value` removed, or
   * an unchanged tree if `value` did not exist 
   */
  remove(value) {
    if (this.root === null) {
      return this.root;
    }

    this.root = this.#removeRecur(this.root, value);
  }

  /**
   * 
   * @param {Node} currNode 
   * @param {Number} value 
   * @returns {Node | null} if `currNode` contains `value`, then its replacement node. 
   * else, `currNode`. This return value is used one level up the stack
   * to restructure the tree as needed. 
   */
  #removeRecur(currNode, value) {
    // Stopping case (1): went past a leaf node - element not found
    if (currNode === null) {
      return currNode;
    }

    if (value < currNode.value) {
      currNode.left = this.#removeRecur(currNode.left, value);
    } 
    else if (value > currNode.value) {
      currNode.right = this.#removeRecur(currNode.right, value);
    }
    // Stopping case (2): Found a match
    else { 
      // Case 1: at a leaf node
      if (!currNode.left && !currNode.right) {
        return null;
      }
      // Case 2a: current node has one child, a left child
      else if (currNode.left && !currNode.right) {
        return currNode.left;
      }
      // Case 2b: current node has one child, a right child
      else if (!currNode.left && currNode.right) {
        return currNode.right;
      }
      // Case 3: current node has two child nodes
      else {
        const replacement = this.#getInorderPredecessor(currNode);
        currNode.value = replacement.value;
        currNode.left = this.#removeRecur(currNode.left, replacement.value);
        return currNode;
      }
    }

    return currNode;
  }

  /**
   * Utility function in removal. Note that using the inorder-successor is also
   * permitted.
   * @param {Node} currNode part of a BST having two children
   * @returns {Node} the inorder-predecessor of `currNode` 
   */
  #getInorderPredecessor(currNode) {
    currNode = currNode.left;
    while (currNode.right !== null) {
      currNode = currNode.right;
    }
    return currNode;
  }

  find(value) {
    return this.#findRecur(this.root, value);
  }

  /**
   * 
   * @param {Node} currNode 
   * @param {Number} value 
   * @returns {Node | null} the Node containing value or null if not found
   */
  #findRecur(currNode, value) {
    // Stopping case: did not find the node - unravel all the way back up
    if (currNode === null) {
      return currNode;
    }

    if (value < currNode.value) {
      return this.#findRecur(currNode.left, value);
    }
    else if (value > currNode.value) {
      return this.#findRecur(currNode.right, value);
    }
    else { // Stopping case: found a match - unravel all the way back up
      return currNode;
    }
  }

  /**
   * Traverse the tree in breadth-first level order, visiting each node by 
   * calling a callback `cb` function on them. Implemented via iteration.
   * @param {Function} cb with a single Node parameter
   */
  levelOrderForEachIterative(cb) {
    if (typeof(cb) !== "function") {
      throw new Error("A callback function is required.");
    }

    if (this.root === null) {
      return;
    }

    const queue = []; // "we have queue at home"
    queue.push(this.root);
    while (queue.length !== 0) {
      const curr = queue.shift();
      cb(curr);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }

  /**
   * Traverse the tree in breadth-first level order, visiting each node by 
   * calling a callback `cb` function on them. Implemented via recursion; the
   * iterative solution is above.
   * @param {Function} cb with a single Node parameter
   */
  levelOrderForEachRecur(cb) {
    if (typeof(cb) !== "function") {
      throw new Error("A callback function is required.");
    }

    if (this.root === null) {
      return;
    }

    this.#levelOrderForEachRecurHelper([this.root], cb);
  }

  /**
   * Helper function to `levelOrderForEachRecur`. Each call processes a level of
   * the tree. 
   * @param {Array{Node}} level 
   * @param {Function} cb 
   * @returns {undefined}
   */
  #levelOrderForEachRecurHelper(level, cb) {
    // Stopping case: finished the final layer
    if (level.length === 0) {
      return;
    }

    const nextLevel = [];
    level.forEach((node) => {
      cb(node);
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    });

    this.#levelOrderForEachRecurHelper(nextLevel, cb);
  }

  inOrderForEach(cb) {
    if (typeof(cb) !== "function") {
      throw new Error("A callback function is required.");
    }

    this.#inOrderForEachRecur(this.root, cb);
  }

  #inOrderForEachRecur(currNode, cb) {
    if (currNode === null) {
      return;
    }

    this.#inOrderForEachRecur(currNode.left, cb);
    cb(currNode);
    this.#inOrderForEachRecur(currNode.right, cb);
  }

  preOrderForEach(cb) {
    if (typeof(cb) !== "function") {
      throw new Error("A callback function is required.");
    }

    this.#preOrderForEachRecur(this.root, cb);
  }

  #preOrderForEachRecur(currNode, cb) {
    if (currNode === null) {
      return;
    }

    cb(currNode);
    this.#preOrderForEachRecur(currNode.left, cb);
    this.#preOrderForEachRecur(currNode.right, cb);
  }

  postOrderForEach(cb) {
    if (typeof(cb) !== "function") {
      throw new Error("A callback function is required.");
    }

    this.#postOrderForEachRecur(this.root, cb);
  }

  #postOrderForEachRecur(currNode, cb) {
    if (currNode === null) {
      return;
    }

    this.#postOrderForEachRecur(currNode.left, cb);
    this.#postOrderForEachRecur(currNode.right, cb);
    cb(currNode);
  }

  toString() {
    prettyPrint(this.root, ":");
  }
}

export { Tree };
