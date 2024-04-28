/* globale variabelen die je gebruikt in je game   */
console.log("start variabelen declareren"); // berichtje voor debuggen

var spelStatus = "beginscherm"; // spelStatus kan zijn: "beginscherm", "spelen", "eindscherm"
var score = 0; //score
var platformX = 0;
var balX = 400;
var balY = 700;
var balsnelheidX = 5;
var balsnelheidY = -5;
var array = new Array(15);
var array2 = new Array(15);
var array3 = new Array(15);
var array4 = new Array(15);
var array5 = new Array(15);
/* functies die je gebruikt in je game
   */
//scherm wissen
var wisScherm = function () {
  fill("red");
  rect(0, 0, 800, 800);
  fill("black");
  rect(0 + 10, 0 + 10, 800 - 20, 800 - 20);
}
//startscherm
var tekenStartscherm = function () {
  wisScherm();
  fill("white");
  textSize(32);
  text("Brick Break", 300, 100);
  textSize(20);
  text("Gemaakt door Maarten van Koesveld en Jayden Wong", 150,650);
  fill("Red");
  rect(250, 325, 300, 150);
  fill("white");
  textSize(40);
  text("Start", 360, 410);
}
//eindscherm
var tekenEindscherm = function () {
  wisScherm();
  fill("white");
  text("Game over", 300, 200);
  text("Score:", 340, 350);
  text(score, 390, 400)
  text("Herstart", 125, 700);
  text("Startscherm", 500, 700);
  fill("red");
  noStroke();
  rect(0, 600, 800, 10);
  rect(395, 600, 10, 200);
}
//speelveld scherm
var spelLoop = function () {
  wisScherm();
  fill(255, 0, 0);
  rect(20, 20, 50, 50);
  fill(200, 200, 30);
  textSize(18);
  text("STOP", 20, 50);
  textSize(40);
  text(score, 400, 70);
  // platform
  rect(platformX, 750, 100, 20); 
  
  // bal bewegen
  balX = balX + balsnelheidX;
  balY = balY + balsnelheidY;
  // botsing bal tegen schermrand
  if ((balX >= 780) || (balX <= 20)) {
    balsnelheidX = balsnelheidX * -1;
  }
  if (balY < 20) {
    balsnelheidY = balsnelheidY * -1;
  }
  // botsing bal tegen plank
  if (balY > 740 && balY < 780 && balX > platformX && balX < platformX + 100) {
    balsnelheidY = balsnelheidY * -1;
    balsnelheidX = random(-10, 10);
  } 
  
  //stopknop
  if (mouseX > 20 && mouseX < 70 && mouseY > 20 && mouseY < 70 && mouseIsPressed || balY >= 800) {   
    return "af";
  } else {
    return "verder";
  }
}
/* setup
   de code in deze functie wordt één keer uitgevoerd door de p5 library, 
   zodra het spel geladen is in de browser 
    */
function setup() {
  createCanvas(800, 800); // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  console.log("setup klaar"); // berichtje voor debuggen
 // array voor blokjes
  for(var i = 0; i < 15; i++){
    array[i] = 1;
  } 
  for(var j = 0; j < 15; j++){
    array2[j] = 1;
  }
  for(var k = 0; k < 15; k++){
    array3[k] = 1;
  } 
  for(var l = 0; l < 15; l++){
    array4[l] = 1;
  } 
  for(var m = 0; m < 15; m++){
    array5[m] = 1;
  } 
}
/* draw
   de code in deze functie wordt meerdere keren per seconde uitgevoerd door de p5 library, 
   nadat de setup functie klaar is
    */
function draw() {
  //beginscherm en startknop
  if (spelStatus === "beginscherm") {
    tekenStartscherm();
    if (mouseIsPressed && mouseX > 250 && mouseX < 550 && mouseY > 325 && mouseY < 475) {
      spelStatus = "spelen";
    }
  }
  //af kunnen gaan
  if (spelStatus === "spelen") {
    // doe 1 stapje van het spel en 
    // ga naar einde als af
    if (spelLoop() === "af") {
      spelStatus = "eindscherm";
    }

    //blokjes tekenen
    fill(0, 100, 200);
    for(var i = 0; i < 15; i++){
      if(array[i] >0){
        rect(20+51*i,100,50,25);
        var data = array[i];
      } 
    }
    for (var j = 0; j < 15; j++) {
      if (array2[j] > 0){
        rect(20+51*j, 126, 50, 25);
        var data = array2[j];
      }
    }
    for(var k = 0; k < 15; k++){
      if(array3[k] >0){
        rect(20+51*k,152,50,25);
        var data = array3[k];
      } 
    }
    for(var l = 0; l < 15; l++){
      if(array4[l] >0){
        rect(20+51*l,178,50,25);
        var data = array4[l];
      } 
    }
    for(var m = 0; m < 15; m++){
      if(array5[m] >0){
        rect(20+51*m,204,50,25);
        var data = array5[m];
      } 
    }
    
    //blokjes kunnen raken
    if(balX > 20 && balX < 20+15*51 && balY > 100 && balY < 125){
      var arrayX = Math.floor((balX-20)/51);
      var data = array[arrayX];
      if(data > 0){
        array[arrayX] = data - 1;
        balsnelheidY *= -1;
        score = score + 1;
      }
    }
    if(balX > 20 && balX < 20+15*51 && balY > 126 && balY < 151){
      var arrayX = Math.floor((balX-20)/51);
      var data = array2[arrayX];
      if(data > 0){
        array2[arrayX] = data - 1;
        balsnelheidY *= -1;
        score = score + 1;
      }
    }
    if(balX > 20 && balX < 20+15*51 && balY > 152 && balY < 177){
      var arrayX = Math.floor((balX-20)/51);
      var data = array3[arrayX];
      if(data > 0){
        array3[arrayX] = data - 1;
        balsnelheidY *= -1;
        score = score + 1;
      }
    }
    if(balX > 20 && balX < 20+15*51 && balY > 178 && balY < 203){
      var arrayX = Math.floor((balX-20)/51);
      var data = array4[arrayX];
      if(data > 0){
        array4[arrayX] = data - 1;
        balsnelheidY *= -1;
        score = score + 1;
      }
    }
    if(balX > 20 && balX < 20+15*51 && balY > 204 && balY < 229){
      var arrayX = Math.floor((balX-20)/51);
      var data = array5[arrayX];
      if(data > 0){
        array5[arrayX] = data - 1;
        balsnelheidY *= -1;
        score = score + 1;
      }
    }
    
    
    // balletje
    fill("white");
    ellipse(balX, balY, 20, 20);
  }
  //eindscherm
  if (spelStatus === "eindscherm") {
    tekenEindscherm();
    balX = 400;//balX resetten
    balY = 700;//balY resetten
    balsnelheidX = 5;//balsnelheidX resetten
    balsnelheidY = -5;//balsnelheidY resetten
    //knop om naar het beginscherm te gaan
    if (mouseIsPressed && mouseX > 400 && mouseY > 600) {
      spelStatus = "beginscherm"; 
      score = 0;
      }
    //knop om opnieuw te spelen  
    if (mouseIsPressed && mouseX < 400 && mouseY > 600) {
      spelStatus = "spelen";
      score = 0;
    } 
  }
  
  //platform laten bewegen
  platformX = mouseX - 50;
  
} /* einde code */
