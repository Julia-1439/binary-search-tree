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