import { Tree } from "./tree.js";

// Test array: unsorted and contains duplicates
let arr = [1, 5, 9, 14, 23, 27];

let T = new Tree(arr);
console.log(T.toString());

arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
T = new Tree(arr);
console.log(T.toString());

arr = [];
T = new Tree(arr);
console.log(T.toString());
console.log(T.root);
console.log("Insert into empty tree:");
T.insert(8);
T.insert(6);
T.insert(10);
console.log(T.toString());


arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
T = new Tree(arr);
T.insert(10);
T.insert(7000);
T.insert(2);
T.insert(0);
T.insert(-1);
T.insert(7.5);
T.insert(6.5);
console.log(T.toString());

try {
  T.insert(5);

} catch (err) {
  console.warn("Inserting duplicate element 5");
}
console.log(T.toString());

arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 0, -1];
T = new Tree(arr);
console.log("Starting tree:", T.toString());

// remove leaf
T.remove(6345);
console.log("Removed leaf node 6345:", T.toString());
// remove node with one right child and no left child
T.remove(0);
console.log("Removed node 0 with one right child and no left child:", T.toString());
// remove node with one left child and no right child
T.remove(67);
console.log("Removed node 67 with one left child and no right child:", T.toString());
// remove node with two children
T.remove(4);
console.log("Removed node 4 with two LEAF children:", T.toString());
T.remove(23);
console.log("Removed node 23 with two LEAF children:", T.toString());
// remove root (and the replacement having a left child)
T.insert(4);
console.log("Inserted 4:", T.toString());
T.remove(7);
console.log("Removed root 7 and with replacement 5 having a left child:", T.toString());

// remove non-existent element
T.remove(9999);
console.log("Attempted remove non-existent value 9999:", T.toString());

// remove everything
T.remove(5);
T.remove(9);
T.remove(8);
T.remove(1);
T.remove(3);
T.remove(4);
T.remove(-1);
T.remove(324);
console.log("Removed everything:", T.toString());

// remove from empty tree
T.remove(5);
T.remove(null);
console.log("Remove from empty tree:", T.toString());

// remove root from singleton tree
T.insert(5);
console.log("Insert element (singleton tree):", T.toString());
T.remove(5);
console.log("Remove element from singleton tree:", T.toString());

// find on empty tree
console.log("Find on empty tree:", T.find(6));

T.insert(8);
console.log("Find on singleton tree:", T.find(8));

arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 0, -1];
T = new Tree(arr);
console.log(T.toString());
console.log("Find non-existent value 6:", T.find(6));
console.log("Find leaf node 3:", T.find(3));
console.log("Find parent node 324:", T.find(324));

T.levelOrderForEachIterative((node) => {
  console.log(node.value);
});

console.log("-------------------------");

T.levelOrderForEachRecur((node) => {
  console.log(node.value);
});

arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 0, -1];
T = new Tree(arr);
console.log(T.toString());

T.postOrderForEach((node) => console.log(node.value));
console.log("-------------------------");
T.preOrderForEach((node) => console.log(node.value));
console.log("-------------------------");
T.inOrderForEach((node) => console.log(node.value));
console.log("-------------------------");

console.log(T.toString());

// height of leaf node
console.log("Height of leaf node:", T.height(3));

// height of mid-level nodes
console.log("Height of mid-level nodes:", T.height(4), T.height(23), T.height(1));

// height of root node
console.log("Height of root node:", T.height(7));

// height of root node with slight imbalance
T.insert(9999);
console.log(T.toString());
console.log("Height of root node, modified:", T.height(7));

// height of non-existent node
console.log("Height of non-existent node:", T.height(-9999));

// depth of leaf nodes
console.log("Depth of leaf node:", T.depth(5));
console.log("Depth of leaf node:", T.depth(9999));

// depth of mid-level nodes
console.log("Depth of mid-level node:", T.depth(8));
console.log("Depth of mid-level node:", T.depth(1));

// depth of root node
console.log("Depth of root node:", T.depth(7));

// depth of non-existent nodes
console.log("Depth of non-existent node:", T.depth(10));
console.log("Depth of non-existent node:", T.depth(10000));

// is balanced
console.log(T.toString());
console.log("Is balanced:", T.isBalanced());

// imbalance
T.insert(10000);
console.log(T.toString());
console.log("Is balanced:", T.isBalanced());

// heights are in line but still imbalanced
T.insert(-2);
T.insert(-3);
console.log(T.toString());
console.log("Is balanced:", T.isBalanced());

// rebalance
T.rebalance();
console.log(T.toString())
console.log("Rebalanced. Is balanced:", T.isBalanced());

T = new Tree([1]);
console.log("Singleton tree balanced:", T.isBalanced());

T.insert(2);
T.insert(3);
console.log(T.toString());
console.log("Tree balanced (became a linked list):", T.isBalanced());

// rebalancing
T.rebalance();
console.log(T.toString());
console.log("Rebalanced. Is balanced:", T.isBalanced());