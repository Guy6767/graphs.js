import { DoublyLinkedList as List } from "../LinkedLists/DoublyLinkedList.js";

class Stack {
  constructor() {
    this.lst = new List();
  }

  push(x) {
    this.lst.append(x);
  }

  pop() {
    return this.lst.pop().data;
  }

  top() {
    return this.lst.tail.data;
  }

  isEmpty() {
    return this.lst.isEmpty;
  }

  static makeEmpty() {
    return new Stack();
  }
}

export { Stack };
