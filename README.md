# doubly-linked-list-js

A `DoublyLinkedList` Javascript Universal Module.

## Installation

You may install this package using `bower` or `npm`:

`bower install doubly-linked-list-js --save`

`npm install doubly-linked-list-js --save`

## Usage

### Node.js

```javascript
var
	DoublyLinkedList = require('doubly-linked-list-js');

var
	list = new DoublyLinkedList();
```

## API

* [`forge()`](#forge)
* [`forgeCircular()`](#forgeCircular)
* [`add(data)`](#add)
* [`forEach(iterator, fromData, context)`](#forEach)
* [`forEachReverse(iterator, fromData, context)`](#forEachReverse)
* `getAt(index)`
* `getFirst()`
* `getIndexOf(data)`
* `getLast()`
* `getRandom()`
* `getLastIndexOf(data)`
* `getLength()`
* `getNext(data)`
* `getPrevious(data)`
* `isCircular()`
* `isEmpty()`
* `makeCircular()`
* `makeLinear()`
* `removeAt(index)`
* `toArray()`
* `toString()`

### <a name="forge"></a>forge

```javascript
var
	list = DoublyLinkedList.forge();
```

### <a name="forgeCircular"></a>forgeCircular

```javascript
var
	list = DoublyLinkedList.forgeCircular();
```

### <a name="add"></a>add

```javascript
list
	.add('a')
	.add('b')
	.add('c');
```

### <a name="forEach"></a>forEach

```javascript
var
	array = [];

list.forEach(function (data) {
	array.push(data);
}, 'b');

console.log(array.toString()); // b,c

list
	.makeCircular()
	.forEach(function (data) {
		array.push(data);
	}, 'b');

console.log(array.toString()); // b,c,a
```

### <a name="forEachReverse"></a>forEachReverse

```javascript
var
	array = [];

list.forEachReverse(function (data) {
	array.push(data);
}, 'b');

console.log(array.toString()); // b,a

list
	.makeCircular()
	.forEachReverse(function (data) {
		array.push(data);
	}, 'b');

console.log(array.toString()); // b,a,c
```
