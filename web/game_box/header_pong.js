function showCoords(event) {
  var mouseY = event.clientY;

}

function getscore(){
  if(y <= 0){
    scorep2++;
    y = 400;
    x= 100;
   step = 5;
  }
  if(y >= 800){
    scorep1++;
     y = 400;
    x= 100;
    step = 5;
  };
};