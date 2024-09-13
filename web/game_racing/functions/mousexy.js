//
// text for position x and y 
// press X to see only works while testing is true
//
var mouseXY = function() {
    if(keyIsDown(88)) {
      let x = round(mouseX, 0);
      let y = round(mouseY, 0);
      let xPos = round(mouseX, 0);
      let yPos = round(mouseY, 0);
      if(xPos > 1164) {
        xPos = x - 200;
      }else{
        xPos = x;
      }
      if(yPos < 50) {
        yPos = y + 60;
      }
  
      if(x > 1344) {
        x = 1344;
      }
      if(x < 0) {
        x = 0;
      }
      if(y > 960) {
        y = 960;
      }
  
      text(x + ', ' + y, xPos+20, yPos - 20);
      stroke('white');
      strokeWeight(5);
      point(x, y);
      strokeWeight(0);
    }
  }