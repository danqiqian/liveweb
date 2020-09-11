var blocks = document.getElementsByClassName("block");

console.log(blocks);

for(let i = 0; i < 20; i++){

  window.setInterval(function(){
		blocks[i].style.background = getRandomColor();
    document.body.style.background = getRandomColor();
    if(i % 2 == 0){
      blocks[i].style.flex = getRandomSize(80);
    } else {
      blocks[i].style.flex = getRandomSize(50);
    }
  },4000);

  // blocks[i].addEventListener("click",function(){
  //   blocks[i].style.flex = getRandomSize(5);
  // });
}

document.body.addEventListener("scroll", function(event){
  console.log('evt: ', event, event.target);
  let newRow = document.createElement("DIV");
  newRow.classList.add("newRow");
  newRow.innerHTML =
  '<div id="newBlock"></div> \n' +
  '<div id="newBlock"></div> \n' +
  '<div id="newBlock"></div> \n' +
  '<div id="newBlock"></div> \n';

  document.getElementsByClassName("wrapper")[0].appendChild(newRow);

  let allNewRows = document.getElementsByClassName("newRow")
  let lastAddedRow = allNewRows[allNewRows.length - 1]
  let children = lastAddedRow.children;
  console.log(children);

  for(let i = 0; i < children.length; i++){
    window.setInterval(function(){
      children[i].style.background = getRandomColor();
      if(i % 2 == 0){
        children[i].style.flex = getRandomSize(80);
      } else {
        children[i].style.flex = getRandomSize(50);
      }
    },4000);
  }
});

function getRandomColor(){
   var x = Math.floor(Math.random() * 256);
   var y = Math.floor(Math.random() * 256);
   var z = Math.floor(Math.random() * 256);
   var bgColor = "rgb(" + x + "," + y + "," + z + ")";
   return bgColor;
}

function getRandomSize(p){
   var growth = Math.floor(Math.random() * p) + 1;
   var randomFlex = "1 1 " + growth + "%";
   return randomFlex;
}
