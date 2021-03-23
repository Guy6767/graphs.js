class SinglyLinkedListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class SinglyLinkedList {
  constructor(head = null) {
    this.head = this.tail = head;
  }

  isEmpty() {
    return !this.head;
  }

  find(node) {
    let temp = this.head;
    while (temp && node != temp) temp = temp.next;
    return temp;
  }

  deleteNode(node) {
    let temp = this.head,
      tempPrev = null;
    while (temp && node != temp) {
      tempPrev = temp;
      temp = temp.next;
    }
    if (temp) tempPrev.next = temp.next;
  }

  addNodeToHead(node) {
    const temp = this.head;
    this.head = node;
    this.head.next = temp;
    if (!this.tail) this.tail = this.head;
  }

  removeNodeFromHead() {
    // empty SinglyLinkedList
    if (!this.head) return;
    // single item SinglyLinkedList
    if (this.head == this.tail) this.tail = this.tail.next;
    // multiple items SinglyLinkedList
    this.head = this.head.next;
  }

  removeNodeFromTail() {
    // empty SinglyLinkedList
    if (!this.tail) return;
    // single item SinglyLinkedList
    if (this.head == this.tail) return (this.head = this.tail = null);
    // multiple items SinglyLinkedList
    let temp = this.head;
    // advance temp item until we reach 1 item before the tail
    while (temp.next && temp.next.next) temp = temp.next;
    // set the new tail
    this.tail = temp;
    this.tail.next = null;
  }

  static makeEmpty(head = null) {
    return new SinglyLinkedList(head);
  }

  static createNewNode(data, next = null) {
    return new SinglyLinkedListNode(data, next);
  }
}

export { SinglyLinkedList };
