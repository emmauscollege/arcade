var ship;
var bullet;
var bullets = [];
var invader;
var invaders = [];
var invaderbullet;
var invaderbullets = [];
var score = 0;
var health = 3;
var invaderNumber = 0;
var shipX;


function setup() {
  createCanvas(700, 600);
  ship = new Ship(); 
}

function draw() {

  if (health > 0) {
  background('black');
  ship.show();

  shipX = ship.getX();

  for (var i = 0; i < bullets.length; i++) {
    bullets[i].show();
    bullets[i].move();

    for (var j = 0; j < invaders.length; j++) {
      if (bullets[i].hits(invaders[j])) {
        invaders[j].destroy();
        bullets[i].remove();
      }
    }
  }

  var x = 50;

  let s = round(random(0, x));
    if(s === 1){
    let t = round(random(0,invaders.length -1)); 
    invaderbullet = new Invaderbullet(invaders[t].x, invaders[t].y);
    invaderbullets.push(invaderbullet);
  }

  for (var i = 0; i < invaderbullets.length; i++) {
    invaderbullets[i].show();
    invaderbullets[i].move();
    invaderbullets[i].hit();

    if (invaderbullets[i].hit(ship) === true) {
      invaderbullets[i].remove();
      health = health - 1;
    }
  }

  var edge = false;

  for (var i = 0; i < invaders.length; i++) {
    invaders[i].show();
    invaders[i].move();

    if (invaders[i].x > 680 || invaders[i].x < 20) {
      edge = true;
    }
  }

  if (edge) {
    for (var i = 0; i < invaders.length; i++) {
      invaders[i].shiftDown();
    }
  }

  for (var i = 0; i < bullets.length; i++) {
    if (bullets[i].toDelete) {
      bullets.splice(i, 1);
    }
  }

  for (var i = 0; i < invaderbullets.length; i++) {
    if (invaderbullets[i].toDelete) {
      invaderbullets.splice(i, 1);
    }
  }

  for (var i = 0; i < invaders.length; i++) {
    if (invaders[i].toDelete) {
      invaders.splice(i, 1);
      score = score + 1;
      invaderNumber = invaderNumber - 1;
    }
  } 

  if (invaderNumber === 0) {
    for (invaderNumber = 0; invaderNumber < 10; invaderNumber++) {
    invaders[invaderNumber] = new Invader(invaderNumber * 60 + 70, 50);
    }
    x = x - 5;
  } 

  if (keyIsDown(RIGHT_ARROW)) {
    ship.move(1);
  } else if (keyIsDown(LEFT_ARROW)) {
    ship.move(-1);
  }

  fill('white');
  textSize(18);
  textFont('MODERN');
  text('Score ' + score, 520, 550);
  text('Health ' + health, 600, 550);
  } else {
    fill('white');
    textSize(40);
    textFont('MODERN');
    text('Game Over', width/2 - 90, height/2);
  }

}

function keyPressed() {
  if (key === ' ') {
    bullet = new Bullet(ship.x, 585);
    bullets.push(bullet);
  }

  if (key === 'r') {
    location.reload();
  }
}