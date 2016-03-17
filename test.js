var DLL = require('./DoublyLinkedList.js');

var createDummy = function(){
  return { id : parseInt(Math.random()*10)};
};

var
  list = DLL.forge();

  list.add(createDummy());
  list.add(createDummy());
  list.add(createDummy());
  list.add(createDummy());
  list.add(createDummy());
  list.add(createDummy());

list.forEach(function (node){
  console.log(node);
});


var filteredList = list.filter(function (node){
  return node.id < 5;
});


console.log(filteredList);
