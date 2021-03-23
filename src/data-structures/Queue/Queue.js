import { DoublyLinkedList as List } from "../LinkedLists/DoublyLinkedList.js";

class Queue {
  constructor() {
    this.lst = new List();
  }

  enqueue(x) {
    this.lst.unshift(x);
  }

  dequeue() {
    return this.lst.pop();
  }

  first() {
    return this.lst.tail.data;
  }

  last() {
    return this.lst.head.data;
  }

  isEmpty() {
    return this.lst.isEmpty();
  }

  static makeEmpty() {
    return new Queue();
  }
}

export { Queue };
