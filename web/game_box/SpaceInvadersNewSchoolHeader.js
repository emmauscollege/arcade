

function preload() {
  img = loadImage('images/Home-Background-Galaxy (1).jpg');
  playerImg = loadImage('images/Symbol 1.png');
  rockImg = loadImage('images/asteroid.png');
  goImage = loadImage('images/game_over.png');
}

function GigaBullet(x, y){
  this.x = x + 100;
  this.y = y;
  if (mouseX > 400) {
   this.x = 400;
 }


  this.show = function () {
    
      fill('aqua');
      stroke('blue');
      strokeWeight(4);
      ellipse(this.x + 60, this.y, 200, 200);
      strokeWeight(1);
      debugger;
      
    
  }

  this.move = function () {
    
      this.x += 7;
      if (this.x >= 1250) {
        this.x = 25000;
      }
    


  }

  this.hit = function () {

    for (var k = 0; k < rocks.length; k++) {
     
      debugger;
      if (this.x >= rocks[k].getX() &&
        this.x <= rocks[k].getX() + 250 &&
        this.y >= rocks[k].getY() + -100 &&
        this.y <= rocks[k].getY() + 150) {
        rocks[k].rhit();
        score += 1;



      }
    }

  }
}
function BigBullet(x, y){
  this.x = x;
  this.y = y;
  if (mouseX > 400) {
   this.x = 400;
 }


  this.show = function () {
    
      fill('lime');
      stroke('green');
      strokeWeight(4);
      ellipse(this.x + 60, this.y, 50, 50);
      strokeWeight(1);
      debugger;
      
    
  }

  this.move = function () {
    
      this.x += 15;
      if (this.x >= 1250) {
        this.x = 25000;
      }
    


  }

  this.hit = function () {

    for (var k = 0; k < rocks.length; k++) {
     
      debugger;
      if (this.x >= rocks[k].getX() &&
        this.x <= rocks[k].getX() + 250 &&
        this.y >= rocks[k].getY() + -25 &&
        this.y <= rocks[k].getY() + 75) {
        rocks[k].rhit();
        score += 1;



      }
    }

  }
}


 
//afgerond
function Bullet(x, y) {
  let bhit = false;
  if(bhit === false){
  this.x = x;
  this.y = y;
  if (mouseX > 400) {
   this.x = 400;
 }


  this.show = function () {
    if (bhit === false) {
      fill('red');
      stroke('red');
      ellipse(this.x + 60, this.y, 10, 10);
    }
  }

  this.move = function () {
    if (bhit === false) {
      this.x += 20;
      if (this.x >=1250) {
        this.x = 25000;
        bhit = true;
      }
    }


  }

  this.hit = function () {
    if(bhit === false){
    for (var k = 0; k < rocks.length; k++) {
      if (this.x >= rocks[k].getX() &&
        this.x <= rocks[k].getX() + 50 &&
        this.y >= rocks[k].getY() &&
        this.y <= rocks[k].getY() + 50) {
        bhit = true;
        rocks[k].rhit();
        score += 1;
        this.x = -25000;



      }
    }

  }

  
  }
}
}

//afgerond
function Ship() {

  this.x = mouseX;
  this.y = mouseY;

  this.show = function () {
    if (mouseX > 400) {
      mouseX = 400;
    }
    if(mouseY < 0){
      mouseY = 0;
    }
    if(mouseY > 600){
      mouseY = 600;
    }
    if(mouseX < 0){
      mouseX = 0;
    }

    image(playerImg, mouseX - 207.9 / 2, mouseY - 180 / 2);
  }

  this.hit = function () {
    for (var k = 0; k < rocks.length; k++) {

      debugger;
      if (rocks[k].getX() <= mouseX + 50 &&
        rocks[k].getX() >= mouseX - 100 &&
        rocks[k].getY() <= mouseY + 25 &&
        rocks[k].getY() >= mouseY - 50) {
        rocks[k].rhit();
        ship.damage();





      }
      this.damage = function () {
        if (isDead === false && health > 0) {
          health = health - 1;

        }

      }
    }
  }

}




function drawScene() {
  image(img, image_x, -500);

  if (isDead != true) {
    if (image_x > -1200) {
      image_x = image_x - 0.25;
    } else {
      image_x = -50;
    }
  }


}
  overLay = function () {
  stroke('black');
  fill('white')
  textSize(32);
  textFont('MODERN');
  text('HP: ' + health, 200, 100);
  text('SCORE: ' + score, 300, 100);
  text('LEVEL: ' + level, 250, 140);
  if(score >= 100){
  fill('lime');
  strokeWeight(1);
  stroke('black')
  rect(200, 50 , charge, 10)
  charge += chargeGrow;
  if(charge >= 200){
    chargeGrow = 0;
  }
  if(keyIsDown(32) && charge >= 200 && isDead !=true) {
    charge = 0;
    chargeGrow = 0.5;
    bigBullet = new BigBullet(mouseX, mouseY);
    bigBullets.push(bigBullet);
    
  }
  }
  if(score >= 500){
  fill('aqua');
  strokeWeight(1);
  stroke('black')
  rect(200, 25 , chargeGB, 10)
  chargeGB += chargeGrowGB;
  if(chargeGB >= 200){
    chargeGrowGB = 0;
  }
  if(keyIsDown(87) && chargeGB >= 200 && isDead != true){
    chargeGB = 0;
    chargeGrowGB = 0.05;
    gigaBullet = new GigaBullet(mouseX, mouseY);
    gigaBullets.push(gigaBullet);

  }
  }
  if (health === 0) {
    isDead = true;
    image(goImage, 100, 175, 1024, 256);
  }

  if(score === 100){
    level = 2;
  }
  if(score === 500){
    level = 3;
  }
}
checkLevel = function(){
  if(level === 2){
    rockXSpawn = 3000;
    rockXG = 2.5;
  }
  if(level === 3){
    rockXSpawn = 2000;
    rockXG = 3;
  }
}


function Rock() {

  this.y = random(0, 600);
  this.x = random(1200, 30000); 
  this.rhit = function () {
    this.y = random(0, 600);
    this.x = random(1200, rockXSpawn);
    let randomNum = round(random(0,15));
    if (randomNum === 7) {
      setupRock();
    }
  }
  this.show = function () {

    image(rockImg, this.x, this.y, 50, 50);

  }
  this.move = function () {
    this.x -= rockXG;
    if (this.x <= -50) {
      this.y = random(0, 600);
      this.x = random(1200, 1300);
    }


  }
  this.getX = function () {
    return this.x;
  }
  this.getY = function () {
    return this.y;
  }


}
setupRock = function () {
  rock = new Rock(this.x, this.y);
  rocks.push(rock);
}


function mousePressed() {
  bulletActive = true;
  if (isDead != true) {
    bullet = new Bullet(mouseX, mouseY);
    bullets.push(bullet);
  }
  if(isDead === true){
    location.reload();
  }
}
