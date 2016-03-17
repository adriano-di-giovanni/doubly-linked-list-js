(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return (root.DoublyLinkedList = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.DoublyLinkedList = factory();
}
}(this, function () {

  var
    breaker = {};

  var
    floor = Math.floor,
    random = Math.random;

  function Node(data) {
    this.data = data;
    this.previous = null;
    this.next = null;
  }

  Node.prototype = {
    constructor: Node,

    hasPrevious: function () {
      return this.previous !== null;
    },

    hasNext: function () {
      return this.next !== null;
    }
  };

  function DoublyLinkedList() {
    this._head = null;
    this._tail = null;
    this._length = 0;
    this._isCircular = false;
  }

  DoublyLinkedList.VERSION = '0.1.6';

  DoublyLinkedList.forge = function () {
    /* jshint newcap: false */
    return new this();
  };

  DoublyLinkedList.forgeCircular = function () {
    return this.forge().makeCircular();
  };

  DoublyLinkedList.prototype = {
    constructor: DoublyLinkedList,

    makeCircular: function () {
      if ( ! this.isEmpty()) {
        this._head.previous = this._tail;
        this._tail.next = this._head;
      }

      this._isCircular = true;

      return this;
    },

    makeLinear: function () {
      if ( ! this.isEmpty()) {
        this._head.previous = null;
        this._tail.next = null;
      }

      this._isCircular = false;

      return this;
    },

    add: function (data) {
      var
        node = new Node(data),
        tail = this._tail;

      if ( ! this.isEmpty()) {
        tail.next = node;
        node.previous = tail;
        this._tail = node;
      } else {
        this._head = node;
        this._tail = node;
      }

      this._length += 1;

      if (this._isCircular) {
        this.makeCircular();
      }

      return this;
    },

    getAt: function (index) {
      var
        node = this._getAt(index);

      return (node !== null) ? node.data : null;
    },

    getFirst: function () {
      var
        node = this._head;

      return (node !== null) ? node.data : null;
    },

    getPrevious: function (data) {
      var
        node = this._getAdjacent(data, false);
      return (node !== null) ? node.data : null;
    },

    getNext: function (data) {
      var
        node = this._getAdjacent(data);

      return (node !== null) ? node.data : null;
    },

    getLast: function () {
      var
        node = this._tail;

      return (node !== null) ? node.data : null;
    },

    getRandom: function () {

      var
        min = 0,
        max = this.getLength(),
        rnd = floor(random() * (max - min)) + min;

      return this.getAt(rnd);
    },

    getIndexOf: function (data) {
      var
        index = 0,
        resultIndex = -1;

      this._traverse(function (node) {
        if (node.data === data) {
          resultIndex = index;
          return breaker;
        }
        index += 1;
      });

      return resultIndex;
    },

    getLastIndexOf: function (data) {
      var
        index = this._length - 1,
        resultIndex = -1;

      this._traverse(function (node) {
        if (node.data === data) {
          resultIndex = index;
          return breaker;
        }
        index -= 1;
      }, this._tail, false);

      return resultIndex;
    },

    filter: function (iterator, fromData, context) {
      var
        fromNode = this._get(fromData),
        res = false,
        result = DoublyLinkedList.forge();

      if (this._isCircular) { result.makeCircular(); }

      this._traverse(function (node){

        res = iterator.call(context, node.data);

        // console.log(res);
        if (res){
          result.add(node.data);
        }

      }, fromNode);

      return result;

    },

    some: function (iterator, fromData, context) {

      var
        fromNode = this._get(fromData),
        res = false;

      this._traverse(function (node){

        res = iterator.call(context, node.data);

        if (res){
          return breaker;
        }
      }, fromNode);

      return res;
    },

    every: function (iterator, fromData, context) {
      var
        fromNode = this._get(fromData),
        res = true;

      this._traverse(function (node){

        res = iterator.call(context, node.data);

        if ( ! res){
          return breaker;
        }
      }, fromNode);

      return res;
    },

    forEach: function (iterator, fromData, context) {
      var
        fromNode = this._get(fromData);

      this._traverse(function (node) {
        iterator.call(context, node.data);
      }, fromNode);
    },

    forEachReverse: function (iterator, fromData, context) {
      var
        fromNode = this._get(fromData);

      this._traverse(function (node) {
        iterator.call(context, node.data);
      }, fromNode, false);
    },

    removeAt: function (index) {
      var
        node = this._getAt(index),
        isHead = this._isHead(node),
        isTail = this._isTail(node);

      if (node !== null) {
        if (isHead) {
          this._head = node.next;
        }
        if (isTail) {
          this._tail = node.previous;
        }
        if (node.hasNext()) {
          node.next.previous = node.previous;
        }
        if (node.hasPrevious()) {
          node.previous.next = node.next;
        }
        this._length -= 1;

        if (isHead || isTail || this._isCircular) {
          this.makeCircular();
        }

        return node.data;
      }

      return null;
    },

    toArray: function () {
      var
        array = [],
        node = this._head;

      while (node !== null) {
        array.push(node.data);
        node = node.next;
      }

      return array;
    },

    toString: function () {
      return this.toArray().toString();
    },

    getLength: function () {
      return this._length;
    },

    isEmpty: function () {
      return this._length === 0;
    },

    isCircular: function () {
      return this._isCircular;
    },

    _get: function (data) {
      var
        resultNode = null;

      this._traverse(function (node) {
        if (node.data === data) {
          resultNode = node;
          return breaker;
        }
      });

      return resultNode;
    },

    _getAt: function (index) {
      var
        node,
        i;

      if (index > -1 && index < this._length) {
        node = this._head;
        i = 0;
        while (i < index) {
          node = node.next;
          i += 1;
        }
        return node;
      }

      return null;
    },

    _getAdjacent: function (data, useNext) {
      useNext = typeof useNext === 'boolean' ? useNext : true;
      var
        method = useNext ? 'next' : 'previous',
        resultNode = null;

      this._traverse(function (node) {
        if (node.data === data) {
          resultNode = node;
          return breaker;
        }
      });

      return (resultNode !== null) ? resultNode[method] : null;
    },

    _traverse: function (iterator, fromNode, useNext, context) {
      fromNode = fromNode || this._head;
      useNext = typeof useNext === 'boolean' ? useNext : true;

      var
        node = fromNode,
        length = this._length,
        i,
        method = useNext ? 'next' : 'previous';

      for (i = 0; i < length; i += 1) {
        if (node === null || iterator.call(context, node, this) === breaker) {
          return;
        }
        node = node[method];
      }
    },

    _isHead: function (node) {
      return node === this._head;
    },

    _isTail: function (node) {
      return node === this._tail;
    }
  };

  return DoublyLinkedList;
}));
