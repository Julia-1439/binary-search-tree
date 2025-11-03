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