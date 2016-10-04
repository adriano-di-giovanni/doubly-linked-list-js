var DLL = require('./DoublyLinkedList.js');

var createDummy = function(){
  return { id : parseInt(Math.random()*10)};
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

var filteredList = list.filter(function (dummy){
  return dummy.id < 5;
});

console.log('FILTERED LIST - FOR EACH');
filteredList.forEach(function (node){
  console.log(node);
});

console.log('LIST - GET NEXT');
list.forEach(function (node){
  console.log('from %s to %s', node.id, list.getNext(node).id);
});


console.log('FILTERED LIST - GET NEXT');
filteredList.forEach(function (node){
  console.log('from %s to %s', node.id, filteredList.getNext(node).id);
});


console.log('REMOVE AT');
var list2 = DLL.forge();

list2
    .add('a')
    .add('b')
    .add('c')
    .add('d');

console.log(list2.toString());
list2.removeAt(0);
console.log(list2.toString());
