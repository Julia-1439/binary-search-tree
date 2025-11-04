# binary-search-tree

A binary search tree implemention. Includes the following features: 
- insert, delete, find
- BFS traversal
- DFS traversal (pre/in/post order)
- height and depth functions 
- checking for balance
- rebalancing (manual)

These were implemented using recursion, iteration, or both.

limitations: only stores numbers, and cannot insert duplicate elements

<strong>Reflection</strong>

A binary search tree, in its <em>balanced</em> form, provides a quick average-case O(log n) runtime for insertion, deletion, and finding. It does this by essentially simulating a sorted array to leverage the logarithmic find of the Binary Search algorithm, and using pointers rather than indices so inserting or removing the data does not require any re-indexing. 

It is possible for a BST to degenerate as more values are added after creation, becoming <em>imbalanced</em>. This has a cost on runtime with the worst case for insert/delete/find being O(n). In such case, the tree needs to be <em>rebalanced</em>. In this project, the tree has a method to rebalance manually.  