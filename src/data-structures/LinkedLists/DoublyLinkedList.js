class DoublyLinkedListNode {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor(head = null) {
    this.head = this.tail = head;
    this.length = 0;
  }

  isEmpty() {
    return this.length == 0;
  }

  find(key, getKeyCallback) {
    let node = this.head;
    while (node && getKeyCallback(node.data) != key) node = node.next;
    return node ? node.data : null;
  }

  at(index) {
    if (index < 0 || index > this.length) return null;

    let node = this.head;
    while (index > 0) {
      node = node.next;
      index--;
    }
    return node.data;
  }

  first() {
    return this.head ? this.head.data : null;
  }

  last() {
    return this.tail ? this.tail.data : null;
  }

  remove(key, getKeyCallback) {
    let nodeToBeRemoved = this.head;
    // find node to be removed in the list
    while (nodeToBeRemoved && getKeyCallback(nodeToBeRemoved.data) != key)
      nodeToBeRemoved = nodeToBeRemoved.next;
    // no node was found
    if (!nodeToBeRemoved) return null;
    // remove the head of the list
    if (nodeToBeRemoved == this.head) return this.shift();
    // remove the tail of the list
    if (nodeToBeRemoved == this.tail) return this.pop();
    // node is in the middle of the list
    const prevNode = nodeToBeRemoved.prev;
    const nextNode = nodeToBeRemoved.next;
    if (prevNode) prevNode.next = nextNode;
    if (nextNode) nextNode.prev = prevNode;
    this.length--;
    return nodeToBeRemoved;
  }

  append(data, next = null) {
    // create a new node
    const newNode = DoublyLinkedList.createNewNode(data, next);
    // append it to the list and update the tail
    if (!this.tail) {
      this.tail = this.head = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail = this.tail.next = newNode;
    }
    this.length++;
  }

  pop() {
    if (this.length == 0) return null;
    const poppedNode = this.tail;

    if (this.head == this.tail) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = poppedNode.prev = null;
    }
    this.length--;
    return poppedNode.data;
  }

  unshift(data, next = null, prev = null) {
    const newNode = DoublyLinkedList.createNewNode(data, next, prev);
    const temp = this.head;
    this.head = newNode;
    this.head.next = temp;
    if (temp) temp.prev = this.head;
    if (!this.tail) this.tail = this.head;
    this.length++;
  }

  shift() {
    // empty SinglyLinkedList
    if (this.length == 0) return;
    // single item SinglyLinkedList
    if (this.head == this.tail) this.tail = this.tail.next;
    // multiple items SinglyLinkedList
    const toShift = this.head;
    this.head = this.head.next;
    toShift.next = null;
    if (this.head) this.head.prev = null;
    this.length--;
    return toShift.data;
  }

  static makeEmpty(head = null) {
    return new DoublyLinkedList(head);
  }

  static createNewNode(data, next = null, prev = null) {
    return new DoublyLinkedListNode(data, next, prev);
  }

  [Symbol.iterator]() {
    let node = this.head;

    return {
      next() {
        let result;
        if (node) {
          result = { value: node.data, done: false };
          node = node.next;
        } else {
          result = { value: undefined, done: true };
        }
        return result;
      },
    };
  }
}

export { DoublyLinkedList };
