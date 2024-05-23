const { DoublyLinkedList, Node } = require('./doubly_linked_list.js');

// Factory function to create lists for tests
const createList = (values) => {
  const list = new DoublyLinkedList();
  values.forEach(val => list.push(val));
  return list;
};

describe('DoublyLinkedList', () => {
  let list;

  beforeEach(() => {
    list = new DoublyLinkedList();
  });

  describe('unshift', () => {
    test('adds an element to the head of the list', () => {
      list.unshift(1);
      expect(list.head.data).toBe(1);
      expect(list.tail.data).toBe(1);

      list.unshift(2);
      expect(list.head.data).toBe(2);
      expect(list.head.next.data).toBe(1);
      expect(list.tail.data).toBe(1);
    });
  });

  describe('push', () => {
    test('adds an element to the tail of the list', () => {
      list.push(1);
      expect(list.head.data).toBe(1);
      expect(list.tail.data).toBe(1);

      list.push(2);
      expect(list.tail.data).toBe(2);
      expect(list.tail.prev.data).toBe(1);
      expect(list.head.data).toBe(1);
    });
  });

  describe('shift', () => {
    test('removes and returns the head of the list', () => {
      list = createList([2, 1]);
      expect(list.shift()).toBe(2);
      expect(list.head.data).toBe(1);
      expect(list.tail.data).toBe(1);
      expect(list.shift()).toBe(1);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    test('returns null if the list is empty', () => {
      expect(list.shift()).toBeNull();
    });
  });

  describe('pop', () => {
    test('removes and returns the tail of the list', () => {
      list = createList([1, 2]);
      expect(list.pop()).toBe(2);
      expect(list.tail.data).toBe(1);
      expect(list.head.data).toBe(1);
      expect(list.pop()).toBe(1);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    test('returns null if the list is empty', () => {
      expect(list.pop()).toBeNull();
    });
  });

  describe('find', () => {
    test('returns the node containing the data', () => {
      list = createList([1, 2]);
      expect(list.find(1).data).toBe(1);
      expect(list.find(2).data).toBe(2);
    });

    test('returns null if the data is not found', () => {
      list = createList([1, 2]);
      expect(list.find(3)).toBeNull();
    });
  });

  describe('insertAfter', () => {
    test('inserts a node after the given node', () => {
      list = createList([1]);
      const node = list.find(1);
      list.insertAfter(node, 2);
      expect(node.next.data).toBe(2);
      expect(list.tail.data).toBe(2);
    });

    test('does nothing if the given node is null', () => {
      list.insertAfter(null, 1);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });
  });

  describe('insertBefore', () => {
    test('inserts a node before the given node', () => {
      list = createList([1]);
      const node = list.find(1);
      list.insertBefore(node, 2);
      expect(node.prev.data).toBe(2);
      expect(list.head.data).toBe(2);
    });

    test('does nothing if the given node is null', () => {
      list.insertBefore(null, 1);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });
  });

  describe('remove', () => {
    test('removes the given node', () => {
      list = createList([1, 2]);
      const node = list.find(1);
      list.remove(node);
      expect(list.find(1)).toBeNull();
      expect(list.head.data).toBe(2);
      expect(list.tail.data).toBe(2);
    });

    test('does nothing if the given node is null', () => {
      list.remove(null);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });
  });

  describe('toArray', () => {
    test('returns an array of node data', () => {
      list = createList([1, 2]);
      expect(list.toArray()).toEqual([1, 2]);
    });

    test('returns an empty array if the list is empty', () => {
      expect(list.toArray()).toEqual([]);
    });
  });

  describe('reverse', () => {
    test('reverses the list', () => {
      list = createList([1, 2, 3]);
      list.reverse();
      expect(list.toArray()).toEqual([3, 2, 1]);
    });

    test('does nothing if the list is empty', () => {
      list.reverse();
      expect(list.toArray()).toEqual([]);
    });
  });

  describe('isEmpty', () => {
    test('returns true if the list is empty and false otherwise', () => {
      expect(list.isEmpty()).toBe(true);
      list.push(1);
      expect(list.isEmpty()).toBe(false);
    });
  });

  describe('size', () => {
    test('returns the number of nodes in the list', () => {
      expect(list.size()).toBe(0);
      list = createList([1, 2]);
      expect(list.size()).toBe(2);
    });
  });
});
