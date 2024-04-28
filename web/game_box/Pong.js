/* JavaScript met P5 library
   eenvoudig voorbeeld voor animatie
   doel: laat zien hoe je de setup() en draw() functies 
   in de p5 library kunt gebruiken voor animaties
*/

// globale variabelen
var y = 400;
var x = 100;
var step = 5;
var stepx = 3;
var aiLoc = 200;
var aiMovement;
var colorType = [100 + 156, 256, 156];
var i = 0;
var scorep1 = 0;
var scorep2 = 0;





setup = function () {
  createCanvas(800, 400);
};


draw = function () {
  var stepMultiplier = Math.floor(Math.random() * 3) + 1;
  getscore();
  clear();

  if ((x > 385) || (x < 15)) { //omdraaien bal y beweging ale randen geraakt worden
    stepx = stepx * -1;
  }
  if (x <= mouseY + 50 && x >= mouseY - 50 && y <= 75 && y >= 40) { // botsen tegen linker plank
    step = step * -1;
    if (stepMultiplier === 1) {
      stepx = stepx * -1;

    }
    if (step > 0 && step < 30) {
      step = step + 1;
    }
  }

  //player
  background('black');

  textSize(32);
  textFont('modern');
  text(scorep1 , 150, 100);
  text(scorep2, 650, 100);

  fill('white')
  ellipse(y, x, 30, 30);

  rect(50, mouseY - 50, 10, 100)
  y = y + step;
  x = x + stepx;

  //A.I.
  rect(750, aiLoc - 50, 10, 100)
  if (step > 0) {
    var aiMovement = x - aiLoc;
    if (aiMovement > 0) {
      aiLoc = aiLoc + 5;


    }
    if (aiMovement < 0) {
      aiLoc = aiLoc - 5;
    }

  }
  if (x <= aiLoc + 50 && x >= aiLoc - 50 && y >= 740 && y <= 780) {
    step = step * -1;
    if (stepMultiplier === 1) {
      stepx = stepx * -1;
    }
  }

}
