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

console.log('LIST');
list.forEach(function (node){
  console.log(node);
});

var filteredList = list.filter(function (dummy){
  return dummy.id < 5;
});

console.log('FILTERED LIST');
filteredList.forEach(function (node){
  console.log(node);
});
