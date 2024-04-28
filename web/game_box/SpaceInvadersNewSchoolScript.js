let img;
let img_h;
let playerImg;
let rockImg;
let goImage;
let rocks = [];
let rock;
let rockXSpawn = 6000;
let rockXG = 2;
let image_x = -50;
let bullets = [];
let bigBullets = [];
let gigaBullets = [];
let ship;
let bullet;
let rockX;
let rockY;
let bulletActive = false;
let health = 10;
let isDead = false;
let score = 0;
let chargeGrow = 0.5;
let charge = 200;
let chargeGrowGB = 0.05;
let chargeGB = 200;
let level = 1;


function setup() {

  createCanvas(1200, 600);
  noCursor();
  ship = new Ship();
  
  for (var i = 0; i < 120; i++) {
    setupRock();
  }
}

function draw() {
  
  if(isDead === false){
  drawScene();
  ship.show();
  rock.getX();

   for (var i = 0; i < bullets.length; i++) {
    bullets[i].show();
    bullets[i].move();
    bullets[i].hit();
  }
  for (var i = 0; i < rocks.length; i++) {
    rocks[i].show();
    rocks[i].move();
    ship.hit();
    
    
    

  }
  for (var i = 0; i < bigBullets.length; i++) {
    bigBullets[i].show();
    bigBullets[i].move();
    bigBullets[i].hit();
  }
  for (var i = 0; i < gigaBullets.length; i++) {
    gigaBullets[i].show();
    gigaBullets[i].move();
    gigaBullets[i].hit();
  }
  overLay();
  checkLevel();
 
}
}