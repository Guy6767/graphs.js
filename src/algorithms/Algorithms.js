import { Queue } from "../data-structures/Queue/Queue.js";
import { AdjacencyList as Graph } from "../data-structures/Graphs/AdjacencyList.js";
import { DoublyLinkedList as List } from "../data-structures/LinkedLists/DoublyLinkedList.js";
import { reverse } from "../data-structures/LinkedLists/Algorithms.js";

function printEdges(G) {
  const V = G.getVertexs();
  for (const v of V) {
    for (const u of G.neighbors(v)) {
      console.log(`(${v}, ${u})`);
    }
  }
}

function topologicalSort(G) {
  if (!G.directed) {
    throw new Error("G must be directed to be topologcially sorted");
  }

  const sequence = [];
  const Q = new Queue();
  const indegree = {};

  const V = G.getVertexs();
  const E = G.getEdges();

  for (const v of V) {
    indegree[v] = 0;
  }

  for (const [u, v] of E) {
    indegree[v]++;
  }

  for (const v of V) {
    if (indegree[v] == 0) {
      Q.enqueue(v);
    }
  }

  while (!Q.isEmpty()) {
    const u = Q.dequeue();
    sequence.push(u);
    for (const v of G.neighbors(u)) {
      indegree[v]--;
      if (indegree[v] == 0) Q.enqueue(v);
    }
  }

  for (const v of V) {
    if (indegree[v] != 0) {
      throw new Error(
        "A circuit was found. For a graph to be topologcially sorted it must be acyclic"
      );
    }
  }

  return sequence;
}

// FIXME: should validates the connectivity of the graph
function hasEulerianCircuit(G) {
  // undirected graph - check if every node degree is even
  if (!G.directed) {
    return G.getVertexs().every(v => G.neighbors(v).length % 2 == 0);
  }
  // directed graph - compare d_in(v) == d_out(v) for every v in V
  const degreesIn = {};
  G.getEdges().forEach(([u, v]) => {
    degreesIn[v] = degreesIn[v] ? degreesIn[v] + 1 : 1;
  });
  return G.getVertexs().every(v => G.neighbors(v).length == degreesIn[v]);
}

function findCiruit(G, v0) {
  const L = [v0];

  let v = v0;
  while (G.vertexs[v].pos) {
    const u = G.vertexs[v].pos.data.name;
    G.vertexs[v].pos = G.vertexs[v].pos.next;
    L.push(u);
    v = u;
  }
  return L;
}

function findEulerianCircuit(G) {
  if (!hasEulerianCircuit(G)) {
    throw new Error(
      "A eulerian circuit can not be found in a non eulerian graph"
    );
  }
  // set up a pos for every vertex
  for (const v of G.getVertexs()) {
    G.vertexs[v].pos = G.neighborList(v).head;
  }
  // start the first circle from a random vertex
  let v = G.getVertexs()[0];
  let L = findCiruit(G, v);
  let current = 0;

  while (current < L.length) {
    v = L[current];
    // get to the next vertex with unused edges
    if (!G.vertexs[v].pos) {
      current++;
    } else {
      // paste the circle found from v into L
      L.splice(current, 1, ...findCiruit(G, v));
    }
  }

  return L;
}

function DFS(G, mainLoopList) {
  // initialize colors dictionary for all the vertexs
  const colors = {};
  for (const u of G.getVertexs()) {
    colors[u] = "white";
  }
  // the DFS trees
  const trees = new List();
  // create timestamps and initialize clock ticks
  let ticks = 0;
  const timestamps = {};
  for (const u of G.getVertexs()) {
    timestamps[u] = Array(2);
  }
  // discovery and ending lists
  const discoveryList = new List();
  const endingList = new List();
  // MAIN-LOOP
  for (const u of mainLoopList || G.getVertexs()) {
    if (colors[u] == "white") {
      trees.append(new Graph());
      trees.last().addVertex(u);
      visit(u);
    }
  }
  // the recursive visit function
  function visit(u) {
    // begin processing of u
    colors[u] = "gray";
    discoveryList.append(u);
    const foundTime = ++ticks;
    // visit every neighbor of u who wasn't discovered
    for (const v of G.neighborList(u)) {
      classifyEdge(v, colors, trees.last());
      if (v.dfsType == "Tree Edge") {
        trees.last().addEdge(u, v.name);
      }
      if (colors[v.name] == "white") {
        visit(v.name);
      }
    }
    // end processing of u
    colors[u] = "black";
    endingList.append(u);
    timestamps[u] = [foundTime, ++ticks];
  }
  return { trees, timestamps, discoveryList, endingList };
}

function visit(G, u, colors) {
  // begin processing of u
  colors[u] = "gray";
  // visit every neighbor of u who wasn't discovered
  for (const v of G.neighbors(u)) {
    if (colors[v] == "white") {
      visit(G, v, colors);
    }
  }
  // end processing of u
  colors[u] = "black";
}

function classifyEdge(v, colors, tree) {
  const edgesTypes = {
    white: "Tree Edge",
    gray: "Back Edge",
    // FIXME: for the edge to be forward, v need to an ancestor of u,
    // not just in the current DFS tree
    black: tree.vertexs[v.name] ? "Forward Edge" : "Cross Edge",
  };
  v.dfsType = edgesTypes[colors[v.name]];
}

function isConnected(G) {
  if (G.getVertexs().length == 0) return true;
  // initialize colors dictionary for all the vertexs
  const colors = {};
  for (const u of G.getVertexs()) {
    colors[u] = "white";
  }
  visit(G, G.getVertexs()[0], colors);
  return Object.keys(colors).every(u => colors[u] == "black");
}

function findComponents(G) {
  if (G.directed) {
    throw new Error(
      "A directed graph can only be checked for strongly connected components"
    );
  }

  const { trees } = DFS(G);
  return trees;
}

function hasCircuit(G) {
  if (!G.directed) {
    throw new Error("Can be determined only for directed graphs");
  }
  DFS(G);
  return G.getEdgesData().some(edge => edge.dfsType == "Back Edge");
}

function topologicalSortDFS(G) {
  const endingList = DFS(G).endingList;
  reverse(endingList);
  return endingList;
}

function transpose(G) {
  const GT = new Graph(G.directed);
  G.getEdges().forEach(([u, v]) => GT.addEdge(v, u));
  return GT;
}

function isStronglyConnected(G) {
  return isConnected(G) && isConnected(transpose(G));
}

function findStronglyConnectedComponents(G) {
  const endingList = DFS(G).endingList;
  const { trees } = DFS(transpose(G), reverse(endingList));
  return trees;
}

export {
  printEdges,
  topologicalSort,
  hasEulerianCircuit,
  findCiruit,
  findEulerianCircuit,
  DFS,
  isConnected,
  findComponents,
  hasCircuit,
  topologicalSortDFS,
  transpose,
  isStronglyConnected,
  findStronglyConnectedComponents,
};
