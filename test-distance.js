var DLL = require('./DoublyLinkedList.js');

var id = 0;
var createDummy = function(){
  return { id : id++ };
};

var
  list = DLL.forgeCircular();

  list.add(createDummy());
  list.add(createDummy());
  list.add(createDummy());
  list.add(createDummy());
  list.add(createDummy());
  list.add(createDummy());

console.log('LIST');
list.forEach(function (node){
  console.log(node);
});

var a = list.getRandom();
var b = list.getRandom();

console.log('getIndexOf a', list.getIndexOf(a));
console.log('getIndexOf b', list.getIndexOf(b));
console.log('Distance ', list.getDistance(a,b));
