var snake;
var scl = 20;
var eten;
var steen;
var punten = 0;
var levens = 1; 
var tick = 0;

var status = 0;
//status = 0; is startscherm
//status = 1; is speelscherm SNAKE NORMAAL
//status = 2; is speelscherm SNAKE MOEILIJK
//status = 3; is speelscherm SNAKE EXTREEM
//status = 4; is doodscherm


//setup
function setup() {
  createCanvas(800, 800);
  frameRate(10);
  snake = new Snake();
  kiesLocatie();
 
 }

//locatie van het eten
function kiesLocatie() {
var kolom = floor(width/scl);
var rij = floor(height/scl);
eten = createVector(floor (random(kolom)), floor( random(rij)));
eten.mult(scl);
steen = createVector(floor (random(kolom)), floor( random(rij)));
steen.mult(scl);
}




function draw() {
  snake.dood();
  snake.update();
  snake.beeld();
  background(0, 0, 255);

//startscherm
  if(status == 0){
    background(0, 255, 0);
    textSize(45);
    textFont("Comic Sans MS");
    fill(sin(tick/2)*255+255,cos(tick/2)*50+120,22);
    text('WELKOM BIJ SNAKE PREMIUM', 50, 100);
    fill(255);
    text('NORMAAL', 300, 250);
    text('MOEILIJK', 300, 400);
    text('EXTREEM', 300, 550);
    textSize(30);
    text('Pak de groene blokjes, maar vermijdt de grijze.', 70, 650);
    text('Gebruik de pijltjes toetsen om te sturen.', 105, 680);
    

    if (status == 0 && mouseY > 200 && mouseY < 300 && mouseIsPressed){
   status = 1;
 }

 if (status == 0 && mouseY > 350 && mouseY < 450 && mouseIsPressed){
   status = 2;
 }

 if (status == 0 && mouseY > 500 && mouseY < 600 && mouseIsPressed){
   status = 3;
 }
 
 snake.richting(0,0);

//normaal snake
  } else if (status == 1){
  background(0);
  
snake.beeld();
  textFont('Comic Sans MS');
  textSize(30);
  text("PUNTEN: " + punten, 5, 30);

  keyPressed();

   if (snake.eet(eten)){
    kiesLocatie ();
  }
 noStroke()
 fill(0, 255, 0);
 rect(eten.x, eten.y, scl, scl);

//moeilijk snake
  }else if (status == 2){
   background(0);
snake.beeld();
 frameRate(20);
  textFont('Comic Sans MS');
  textSize(30);
  text("PUNTEN: " + punten, 5, 30);
 
 keyPressed();

  
   if (snake.eet(eten)){
    kiesLocatie ();
  }
 noStroke()
 fill(0, 255, 0);
 rect(eten.x, eten.y, scl, scl);

 //stenen
 if (snake.stoot(steen)){
   snake.dood();
 }
 noStroke();
  fill(125, 125, 125);

  var tijdelijk_steen_x = steen.x;
  var tijdelijk_steen_y = steen.y;

  noStroke();
  fill(125, 125, 125);
  rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
  if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
  }


  tijdelijk_steen_x = steen.x+5*scl;
  tijdelijk_steen_y = steen.y-3*scl;
  

  rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
  if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
  }

  tijdelijk_steen_x = steen.x-4*scl;
  tijdelijk_steen_y = steen.y-8*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x+4*scl;
  tijdelijk_steen_y = steen.y+7*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x-10*scl;
  tijdelijk_steen_y = steen.y+5*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x+4*scl;
  tijdelijk_steen_y = steen.y-8*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x-4*scl;
  tijdelijk_steen_y = steen.y+8*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x+3*scl;
  tijdelijk_steen_y = steen.y-9*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x+9*scl;
  tijdelijk_steen_y = steen.y-8*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood(); 
 }

  tijdelijk_steen_x = steen.x+5*scl;
  tijdelijk_steen_y = steen.y-8*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }
 
 
  tijdelijk_steen_x = steen.x-4*scl;
  tijdelijk_steen_y = steen.y+9*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x-4*scl;
  tijdelijk_steen_y = steen.y-3*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x-2*scl;
  tijdelijk_steen_y = steen.y+3*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x+4*scl;
  tijdelijk_steen_y = steen.y-6*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x+6*scl;
  tijdelijk_steen_y = steen.y-8*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x-7*scl;
  tijdelijk_steen_y = steen.y+9*scl;

  /*rect(steen.x/2.2, steen.y*1.35, scl, scl);
  rect(steen.x/1.3, steen.y/2.5, scl, scl);
  rect(steen.x*1.7, steen.y*1.8, scl, scl);
  rect(steen.x/2.9, steen.y/1.5, scl, scl);
  rect(steen.x*1.95, steen.y/5, scl, scl);
  rect(steen.x/1.1, steen.y*1.65, scl, scl);
  rect(steen.x*1.5, steen.y/2.8, scl, scl);
  rect(steen.x/1.1, steen.y/2, scl, scl);
  rect(steen.x*1.45, steen.y/1.53, scl, scl);
  rect(steen.x/5, steen.y/1.4, scl, scl);*/
  
//extreem snake
  }else if (status == 3){
    background(0);
snake.beeld();
frameRate(30);
    //punten
  textFont('Comic Sans MS');
  textSize(30);
  text("PUNTEN: " + punten, 5, 30);

  keyPressed();

   if (snake.eet(eten)){
    kiesLocatie ();
  }
 noStroke()
 fill(0, 255, 0);
 rect(eten.x, eten.y, scl, scl);

  //stenen
  if (snake.stoot(steen)){
   snake.dood();
 }
  var tijdelijk_steen_x = steen.x;
  var tijdelijk_steen_y = steen.y;

  noStroke();
  fill(125, 125, 125);
  rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
  if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
  }


  tijdelijk_steen_x = steen.x+5*scl;
  tijdelijk_steen_y = steen.y-3*scl;
  

  rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
  if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
  }

  tijdelijk_steen_x = steen.x-4*scl;
  tijdelijk_steen_y = steen.y-8*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x+4*scl;
  tijdelijk_steen_y = steen.y+7*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x-10*scl;
  tijdelijk_steen_y = steen.y+5*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x+4*scl;
  tijdelijk_steen_y = steen.y-8*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x-4*scl;
  tijdelijk_steen_y = steen.y+8*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x+3*scl;
  tijdelijk_steen_y = steen.y-9*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x+9*scl;
  tijdelijk_steen_y = steen.y-8*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood(); 
 }

  tijdelijk_steen_x = steen.x+5*scl;
  tijdelijk_steen_y = steen.y-8*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }
 
 
  tijdelijk_steen_x = steen.x-4*scl;
  tijdelijk_steen_y = steen.y+9*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x-4*scl;
  tijdelijk_steen_y = steen.y-3*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x-2*scl;
  tijdelijk_steen_y = steen.y+3*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x+4*scl;
  tijdelijk_steen_y = steen.y-6*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x+6*scl;
  tijdelijk_steen_y = steen.y-8*scl;

 rect(tijdelijk_steen_x,tijdelijk_steen_y,scl,scl);
 if (snake.stoot(tijdelijk_steen_x,tijdelijk_steen_y)){
   snake.dood();
 }

  tijdelijk_steen_x = steen.x-7*scl;
  tijdelijk_steen_y = steen.y+9*scl;



//doodscherm
  }else if (status == 4){
      fill(255, 0, 0);
    rect(0, 0, 800, 800);
    
    fill(0);
    textSize(50);
    text('GAME OVER', 280, 150);
    text('PUNTEN:' + punten, 290, 250);
    text('OPNIEUW', 290, 350);

  }

 //voor de flitsende kleurtjes
 tick++;
}



//besturing
function keyPressed() {
if (keyCode === UP_ARROW) {
snake.richting(0,-1);
}
else if (keyCode === DOWN_ARROW) {
snake.richting(0,1);
}
else if (keyCode === RIGHT_ARROW) {
snake.richting(1,0);
}
else if (keyCode === LEFT_ARROW) {
snake.richting(-1,0);
}

}
