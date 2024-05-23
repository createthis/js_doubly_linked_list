class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  unshift(data) { // Renamed from insertAtHead
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  push(data) { // Renamed from insertAtTail
    const newNode = new Node(data);
    if (this.tail === null) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  shift() { // Renamed from removeHead
    if (!this.head) return null;
    const removedData = this.head.data;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    return removedData;
  }

  pop() { // Renamed from removeTail
    if (!this.tail) return null;
    const removedData = this.tail.data;
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    return removedData;
  }

  find(data) { // Renamed from search
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.data === data) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  insertAfter(node, data) {
    if (!node) return; // Node doesn't exist
    const newNode = new Node(data);
    newNode.next = node.next;
    newNode.prev = node;
    if (node.next) {
      node.next.prev = newNode;
    } else {
      this.tail = newNode;
    }
    node.next = newNode;
  }

  insertBefore(node, data) {
    if (!node) return;
    const newNode = new Node(data);
    newNode.prev = node.prev;
    newNode.next = node;
    if (node.prev) {
      node.prev.next = newNode;
    } else {
      this.head = newNode;
    }
    node.prev = newNode;
  }

  remove(node) {
    if (!node) return;
    if (node === this.head) {
      this.shift(); // Use the existing shift method
    } else if (node === this.tail) {
      this.pop();  // Use the existing pop method
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
  }

  toArray() {
    const arr = [];
    let currentNode = this.head;
    while (currentNode) {
      arr.push(currentNode.data);
      currentNode = currentNode.next;
    }
    return arr;
  }

  reverse() {
    let temp = null;
    let currentNode = this.head;

    while (currentNode) {
      temp = currentNode.prev;  // Swap prev and next pointers
      currentNode.prev = currentNode.next;
      currentNode.next = temp;
      currentNode = currentNode.prev; // Move to the next node (which is the previous in original order)
    }

    if (temp) { // Adjust head and tail after the loop
      this.head = temp.prev; 
    }
  }

  isEmpty() {
    return this.head === null;
  }

  size() {
    let count = 0;
    let currentNode = this.head;
    while (currentNode) {
      count++;
      currentNode = currentNode.next;
    }
    return count;
  }
}

module.exports = {
  Node,
  DoublyLinkedList,
};
