import { DoublyLinkedList as List } from "../LinkedLists/DoublyLinkedList.js";

const getVertexIndex = char => char.charCodeAt(0) - "a".charCodeAt(0);
const getVertexName = index => String.fromCharCode(index + "a".charCodeAt(0));

class AdjacencyMatrix {
  constructor(numOfVertexs, directed = true) {
    // create numOfVertexs X numOfVertexs matrix and fills with zeros
    this.matrix = Array(numOfVertexs).fill();
    this.matrix = this.matrix.map(() => Array(numOfVertexs).fill(0));
    // type can be either directed or undirected
    this.directed = directed;
  }

  neighborList(vertex) {
    const vertexIndex = getVertexIndex(vertex);
    const neightbors = new List();
    for (let i = 0; i < this.matrix.length; i++) {
      if (this.matrix[vertexIndex][i]) {
        neightbors.append(getVertexName(i));
      }
    }
    return neightbors;
  }

  areNeightbors(vertexOne, vertexTwo) {
    const vertexOneIndex = getVertexIndex(vertexOne);
    const vertexTwoIndex = getVertexIndex(vertexTwo);
    return !!this.matrix[vertexOneIndex][vertexTwoIndex];
  }

  addEdge(vertexOne, vertexTwo) {
    const vertexOneIndex = getVertexIndex(vertexOne);
    const vertexTwoIndex = getVertexIndex(vertexTwo);
    this.matrix[vertexOneIndex][vertexTwoIndex] = 1;
    if (!this.directed) {
      this.matrix[vertexTwoIndex][vertexOneIndex] = 1;
    }
  }

  deleteEdge(vertexOne, vertexTwo) {
    const vertexOneIndex = getVertexIndex(vertexOne);
    const vertexTwoIndex = getVertexIndex(vertexTwo);
    this.matrix[vertexOneIndex][vertexTwoIndex] = 0;
    if (!this.directed) {
      this.matrix[vertexTwoIndex][vertexOneIndex] = 0;
    }
  }
}

export { AdjacencyMatrix };
