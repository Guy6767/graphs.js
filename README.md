# javascript-graphs

An easy to use [graph](<https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)>) data structure with some useful algorithms.

# Install

Using [npm](http://npmjs.org):

```
npm i javascript-graphs
```

## The Graph data structure

Import with ES6 modules:

```js
import Graph from "javascript-graphs";
```

The constructor syntax:

```
new Graph(directed?: boolean);
```

Using the graph:

```js
import Graph from "javascript-graphs";

// create a new graph, it is directed graph by default
const G = new Graph();
// create an undirected graph
const G2 = new Graph(false);

// add edges
G.addEdge("A", "B");
G.addEdge("B", "A");
G.addEdge("B", "C");

// addEdge will add new vertex automatically,
// but you can add them individually
G.addVertex("D");

// delete edges
G.deleteEdge("B", "C");

for (const v of G.getVertexs()) {
  console.log(v); //  A  B  C  D
}

for (const [u, v] of G.getEdges()) {
  console.log(`(${u}, ${v})`); //  (A, B)  (B, A)
}

G.addEdge("B", "D");
G.addEdge("B", "E");

for (const v of G.neighbors("B")) {
  console.log(v); //  A  D  E
}
```

## Algorithms

Some algorthmis examples:

```js
import Graph from "javascript-graphs";
import {
  findStronglyConnectedComponents,
  topologicalSort,
  findEulerianCircuit,
  DFS,
} from "javascript-graphs";

const G = new Graph();

G.addEdge("A", "B");
G.addEdge("B", "A");
G.addEdge("B", "C");
G.addEdge("C", "A");
G.addEdge("C", "D");
G.addEdge("D", "E");
G.addEdge("E", "D");

const components = findStronglyConnectedComponents(G);

for (const component of components) {
  console.log(component.getEdges()); // [(B, A), (A, C)], [(D, E)]
}

const G2 = new Graph();

G2.addEdge("foo", "bar");
G2.addEdge("foo", "qux");
G2.addEdge("baz", "qux");
G2.addEdge("qux", "quux");

for (const v of topologicalSort(G2)) {
  console.log(v); // foo, baz, bar, qux, quux
}

const G3 = new Graph();

G3.addEdge("a", "b");
G3.addEdge("b", "c");
G3.addEdge("c", "b");
G3.addEdge("b", "a");

for (const v of findEulerianCircuit(G3)) {
  console.log(v); // a->b->c->b->a
}
```

Using DFS search and it's return values:

```js
const G = new Graph();

G.addEdge("A", "B");
G.addEdge("B", "A");
G.addEdge("B", "C");
G.addEdge("C", "A");
G.addEdge("C", "D");
G.addEdge("D", "E");
G.addEdge("E", "D");

const { trees, timestamps, discoveryList, endingList } = DFS(G);

// DFS trees
for (const tree of trees) {
  console.log(tree.getEdges()); // (A, B) (B, C) (C, D) (D, E)
}

console.log(timestamps); // A: [1, 10], B: [2, 9], C: [3, 8], D: [4, 7], E: [5, 6]

// iterable list
for (const v of discoveryList) {
  console.log(v); // A B C D E
}

// iterable list
for (const v of endingList) {
  console.log(v); // E D C B A
}
```

## The full list of algorithms

- DFS
- hasEulerianCircuit
- findCiruit
- findEulerianCircuit
- isConnected
- findComponents
- hasCircuit
- topologicalSort
- topologicalSortDFS
- transpose
- printEdges
- isStronglyConnected
- findStronglyConnectedComponents

# License

MIT
