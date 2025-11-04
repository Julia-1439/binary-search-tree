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
