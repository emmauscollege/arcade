


///<reference path="p5.global-mode.d.ts" />
"use strict"

/*********************/
/*AAN MENEER CAMMERAAT*/
/* TOETS A, D, P, SPATIE TEGELIJKERTIJD IN VOOR INVINCIBILITY, TOETS Z IN OM HET UIT TE ZETTEN*/

//globale variabelen die je gebruikt in je game
const SPELEN = 1;
const GAMEOVER = 2;
const START = 3;
const EINDE = 4;
var spelStatus = START;
var gameOver2;
let level = 1;
var win = false;

//jump variables
var hoogte = true;
var jumpHeight = 10;
var jumpCooldown = false;
var floorHeight = 660;
var accelerationY = 10;
const gravityFactor = 0.6;
//platforms
var platY = [];
var platX = [];
var platWidth = [];
var platHeight = [];

//walls
var wallX = [];
var wallY = [];
var wallWidth = [];
var wallHeight = [];

//decor
var treeX;
var treeY;
var treeWidth;
var treeHeight;
var treeLeavesY;
var treeLeavesW;
var treeLeavesH;
var treeLeavesX;

//spikes
var spikeUp;
var spikeDown;
var spikeLeft;
var spikeRight;
var spikeTrap;
var spikeBlock;

//apple
var apple;

//triggers
var trapTriggered1 = false;
var trapTriggered2 = false;
var apple3 = false;
var apple4 = false;
var apple5 = false;
var apple6 = false;
var apple7 = false;
var apple8 = false;
var apple9 = false;
var apple10 = false;
var apple11 = false;
var apple12 = false;
var miniSpike = false;
var spikeWall = false;
var timer = 100;
var beweegPlatform = false;
var kill20Up = false;
var kill20Right = false;
var kill22L = false;
var move22 = true;
var timer2 = 340;

var metalBlockX = [];
var metalBlockY = [];

//speler vars
var spelerColRight = spelerX + 20;
var spelerX; // x-positie van speler
var spelerY; // y-positie van speler 

var sign;
var bullet;
var bulletX = spelerX;


//keyCodes
var D = 68;        // keyCode D
var A = 65;        // keyCode A
var SPACE = 32;    // keyCode SPACE
var R = 82;        // keyCode R
var P = 80;        // keyCode P
var Z = 90;        // keyCode Z
var W = 87;
var E = 69;
var X = 88;
var C = 67;
var enter = 13;
var N = 78;
var O = 79;
var M = 77;
var I = 73;
var J = 74;
var L = 76;
var K = 75;
var Q = 81;
var U = 85;
var B = 66;
var direction;
var moveRight = true;
var moveLeft = true;
var immune = false;
var shoot = false;

//images
let backgroundImage;
let gameOver1;
let startImage;
let controls;
let endscreen;
let portal;
let metalBlock;

//animaties
// player
let theKidRun;
let theKidRunL;
let theKidIdle;
let theKidIdleL;
let theKid;
let theKidDeath;

//enemy
var enemy;
var enemyHealth = 150;
var enemyX;
var enemyY;
var enemyW;
var enemyH;
var enemyHurt;
var enemyNormal;

//direction
var LEFT;
var RIGHT;

//deathCounter
var deathCount = 0;

//spike
var drawSpikeXRight

//SFX
var bulletSound;
var bossSound;
var jumpSound;
var spaceship;
var soundTrack;
var livingroom;

var cutsceneI;
var cutscene = 0;


var beweegAlles = function () {
  theKid = theKidIdle;
  if (direction === LEFT) {
    theKid = theKidIdleL;
  }
  // movement X
  if (keyIsDown(D) || keyIsDown(L) && moveRight === true) {
    theKid = theKidRun;
    spelerX = spelerX + 5;
    bulletX += 5;
    direction = RIGHT;
  }
  if (keyIsDown(A) || keyIsDown(J) && moveLeft === true) {
    theKid = theKidRunL;
    spelerX = spelerX - 5;
    bulletX -= 5;
    direction = LEFT;
  }

  //immune
  if (keyIsDown(P) && keyIsDown(A) && keyIsDown(D) && keyIsDown(SPACE)) {
    immune = true;
  }

  if (keyIsDown(Z)) {
    immune = false;
    jumpHeight = 10;
  }

  if (immune == true) {
    jumpHeight = 14;
  }

  // jump
  if (accelerationY <= 40 && !jumpCooldown) {
    accelerationY = 0;
  }

  if (keyIsDown(SPACE) && !jumpCooldown || keyIsDown(Z) && !jumpCooldown || keyIsDown(B) && !jumpCooldown) {
    jumpCooldown = true;
    accelerationY = jumpHeight;
  }

  if (jumpCooldown = true && accelerationY > -40) {
    spelerY = spelerY - accelerationY;
    accelerationY = accelerationY - gravityFactor;
  }

  while (spelerY + 7 > floorHeight) {
    spelerY = spelerY - gravityFactor;
  }

  if (spelerY + 8 >= floorHeight) {
    jumpCooldown = false;
  }
};


function verwerkBotsing() {

  // platforms
  for (var i = 0; i < platX.length; i++) {
    if (spelerY <= platY[i] && spelerX >= platX[i] && spelerX <= platX[i] + platWidth[i]) {
      floorHeight = platY[i];
    }
  }

  //wall detection
  for (var i = 0; i < wallX.length; i++) {
    if (spelerX + 5 > wallX[i] && spelerX < wallX[i] + wallWidth[i] && spelerY > wallY[i] && spelerY <= wallY[i] + wallHeight[i]) {
      spelerX -= 5;

    }
  }

  for (var i = 0; i < wallX.length; i++) {
    if (spelerX - 5 < wallX[i] + wallWidth[i] && spelerX > wallX[i] && spelerY >= wallY[i] && spelerY <= wallY[i] + wallHeight[i]) {
      spelerX += 5;

    }
  }

  for (var i = 0; i < wallX.length; i++) {
    if (bulletX > wallX[i] && spelerX < wallX[i] + wallWidth[i] && spelerY > wallY[i] && spelerY <= wallY[i] + wallHeight[i]) {
      bulletX = spelerX;
      shoot = false;
    }
  }

  for (var i = 0; i < wallX.length; i++) {
    if (bulletX < wallX[i] + wallWidth[i] && spelerX > wallX[i] && spelerY >= wallY[i] && spelerY <= wallY[i] + wallHeight[i]) {
      bulletX = spelerX;
      shoot = false;

    }
  }

  // kill player
  if (immune === false && win === false) {
    for (var i = 0; i < killX.length; i++) {
      if (spelerX + 5 >= killX[i] && spelerX - 5 <= killX[i] + killWidth[i] && spelerY >= killY[i] && spelerY - 5 <= killY[i] + killHeight[i]) {
        spelStatus = GAMEOVER;
      }
    }
  }
}


var tekenAlles = function () {

  //background
  image(backgroundImage, 0, 0, 1280, 720);

  // decor
  noStroke()

  //bomen
  fill("brown")
  for (var i = 0; i < treeX.length; i++) {
    rect(treeX[i], treeY, treeWidth, treeHeight);
  }

  fill("green")
  for (var i = 0; i < treeLeavesX.length; i++) {
    ellipse(treeLeavesX[i], treeLeavesY, treeLeavesW, treeLeavesH);
  }

  //kill blocks

  
  if (immune === true) {
    fill("red")

    //noFill()
    for (var i = 0; i < killX.length; i++) {
      rect(killX[i], killY[i], killWidth[i], killHeight[i]);
    }
  }
  // SpikeUp
  for (var i = 0; i < drawSpikeXUp.length; i++) {
    image(spikeUp, drawSpikeXUp[i], drawSpikeYUp[i], drawSpikeWidth, drawSpikeHeight);
  }

  //decor lvl 1
  if (level === 1) {
    image(spikeUp, 250, 340, 10, 10);
    image(spikeUp, 300, 340, 10, 10);
    image(spikeUp, killX[15], killY[15], 10, 10);
  }

  if (level === 1) {
    image(sign, 740, 580, 50, 90);
  }
  // SpikeDown
  for (var i = 0; i < drawSpikeXDown.length; i++) {
    image(spikeDown, drawSpikeXDown[i], drawSpikeYDown[i], drawSpikeWidth, drawSpikeHeight);
  }

  // SpikeLeft
  for (var i = 0; i < drawSpikeXLeft.length; i++) {
    image(spikeLeft, drawSpikeXLeft[i], drawSpikeYLeft[i], drawSpikeWidth, drawSpikeHeight);
  }

  // SpikeRight
  for (var i = 0; i < drawSpikeXRight.length; i++) {
    image(spikeRight, drawSpikeXRight[i], drawSpikeYRight[i], drawSpikeWidth, drawSpikeHeight);
  }

  //apples
  for (var i = 0; i < drawAppleX.length; i++) {
    image(apple, drawAppleX[i], drawAppleY[i], drawAppleWidth[i], drawAppleHeight[i]);
  }

  //walls
  fill("blue")
  for (var i = 0; i < wallX.length; i++) {
    rect(wallX[i], wallY[i], wallWidth[i], wallHeight[i]);

    for (var xBlock = wallX[i]; xBlock < wallX[i] + wallWidth[i]; xBlock = xBlock + 30) {
      for (var yBlock = wallY[i]; yBlock < wallY[i] + wallHeight[i]; yBlock = yBlock + 30) {
        image(metalBlock, xBlock, yBlock, 30, 30);
      };
    };
  };

  // Platforms

  for (var i = 0; i < platX.length; i++) {
    rect(platX[i], platY[i], platWidth[i], platHeight[i]);

    for (var yBlock = platY[i]; yBlock < platY[i] + platHeight[i]; yBlock = yBlock + 30) {
      for (var xBlock = platX[i]; xBlock < platX[i] + platWidth[i]; xBlock = xBlock + 30) {
        image(metalBlock, xBlock, yBlock, 30, 30);
      }
    }

  }

  //tracker
  if (immune === true) {
    fill("green")
    textSize(20)
    text("X" + mouseX, 100, 100, 100, 50)
    text("Y" + mouseY, 100, 150, 100, 50)

    text("spelerY" + spelerY, 500, 100, 100, 100);
    text("spelerX" + spelerX, 500, 50, 100, 100);

    text("timer" + timer2, 900, 50, 100, 100);
    text("acc" + accelerationY, 900, 100, 100, 100);
    text("gf" + gravityFactor, 800, 50, 100, 100);
  }
  //bullet
  if (spelStatus === SPELEN) {
    image(bullet, bulletX, spelerY);
  }
  // speler
  image(theKid, spelerX - 17, spelerY - 24);
  //schieten
  if (keyIsDown(Q) && spelStatus === SPELEN ||keyIsDown(enter) && spelStatus === SPELEN || keyIsDown(U)&& spelStatus === SPELEN) {
    shoot = true;

  }

  if (shoot === true && direction === RIGHT) {
    bulletX += 30;

  }

  if (shoot === true && direction === LEFT) {
    bulletX -= 30;

  }

  if (bulletX > spelerX + 750 && direction === RIGHT) {
    shoot = false;
    bulletX = spelerX;
  }

  if (bulletX < spelerX - 750 && direction === LEFT) {
    shoot = false;
    bulletX = spelerX;
  }
  image(controls, 0, 0, 200, 200);

  if (level === 2 && enemyHealth > 0) {
    for (var i = 2; i < killX.length; i++) {
      image(apple, killX[i], killY[i], particlesW, particlesH);
    }
  }
  image(enemy, enemyX, enemyY, enemyW, enemyH);
};


//death counter
function death() {
  textSize(40);
  fill(0, 0, 0);
  text("Deaths: " + deathCount, 900, 30);
}

//reset
function keyPressed() {
  if (keyCode === R || keyCode === P) {
    bossSound.pause();
    bossSound.load();
    spaceship.load();
    spaceship.play();
    cutsceneI.reset();
    deathCount++;
    cutscene = 0;
    spelStatus = SPELEN;
    initLevel(level);

    if (level == 1) {
      floorHeight = 660;
    }
  }
}

var timeInSec;
//score counter
function score() {
  if (spelStatus === SPELEN || GAMEOVER) {
    timeInSec = int(millis() / 1000.0);
  }
  textSize(40);
  fill(0, 0, 0);
  text("Time: " + timeInSec, 560, 30);
  fill(0, 0, 0);
}

//startscreen
function startScreen() {
  image(startImage, 0, 0, 1280, 720);

  if (mouseIsPressed || keyIsPressed) {
    initLevel(level);
    spelStatus = SPELEN;
  }
  livingroom.play();
};


function preload() {

  //backgrounds
  backgroundImage = loadImage('images/Citybackground.jpeg');

  //start screen
  startImage = loadImage('images/StartScreen.png');

  //death screen
  gameOver1 = loadImage('images/RToRestart.png');

  //sprite for traps
  spikeDown = loadImage('trap/spikeDown.png');
  spikeUp = loadImage('trap/spikeUp.png');
  spikeLeft = loadImage('trap/spikeLeft.png');
  spikeRight = loadImage('trap/spikeRight.png');
  spikeTrap = loadImage('trap/spikeTrap.png');
  spikeBlock = loadImage('trap/spikeBlock.png');

  //bullet
  bullet = loadImage('bullet.png');

  //apple
  apple = loadImage('trap/apple.png');

  //boss sprite
  enemyNormal = loadImage('cyan apple.png');
  enemyHurt = loadImage('cyan apple hit.png')
  enemy = enemyNormal;

  //block texture
  metalBlock = loadImage('images/metal_block.jpg');

  //controls
  controls = loadImage('images/controls.png');

  // decor
  sign = loadImage('images/Sign.png');
  portal = loadImage('images/portal.gif');
  cutsceneI = loadImage('images/apple.gif');

  //player images
  theKidIdleL = loadImage('images/IdleLeft.gif');
  theKidIdle = loadImage('images/Idle.gif');
  theKidRun = loadImage('images/Run.gif');
  theKidRunL = loadImage('images/RunLeft.gif');
  theKidDeath = loadImage('images/Death.gif');
  theKid = theKidIdle;

  //endscreen
  endscreen = loadImage('images/endscreen.png');

  //sound
  bulletSound = new Audio('SFX/bullet.wav');
  jumpSound = new Audio('SFX/jump.wav');
  bossSound = new Audio('SFX/FinalBoss.mp3');
  spaceship = new Audio('SFX/Spaceship.mp3');
  livingroom = new Audio('SFX/livingroom.mp3');


};


function setup() {
  createCanvas(1280, 720);

  //textFont
  loadFont('slkscr.ttf', pixel => {
    textFont(pixel);
  });
};


function draw() {

  if (spelStatus === START) {
    startScreen();

  }
  if (spelStatus === SPELEN) {
    beweegAlles();
    tekenAlles();
    verwerkBotsing();
    score();
    death();
    spaceship.play();
    livingroom.pause();
  }

  if (spelStatus === SPELEN && level === 1) {
    trapslvl1();

  }
  if (spelerX > 1287) {
    level++
    initLevel(level);
  }

  if (level === 2) {
    bossFight();
  }

  if (spelStatus === GAMEOVER) {
    tekenAlles();
    theKid = theKidDeath
    image(gameOver1, 109, 250);
  }

  if (enemyHealth <= 0) {
    win === true;
    killX[1]++;
    enemyX++;
    bossSound.pause();
    spaceship.pause();
    if (enemyX > 1250) {
      image(portal, 1170, 570, 50, 90);
    }
    if (spelerX > 1200 && spelerY > 570) {

      livingroom.play();
      spelStatus = EINDE;
      image(endscreen, 0, 0, 1280, 720);
      fill('red')
      textSize(90)
      textAlign(CENTER)
      text(deathCount, 970, 550)
      text(timeInSec, 310, 550);
    }
    for (var i = 2; i < killX.length; i++) {
      killX[i] = 0;
    }
  }
};