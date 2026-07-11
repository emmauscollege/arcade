/* Game opdracht
   Informatica - Emmauscollege Rotterdam
*/

///<reference path=".vscode/p5.global-mode.d.ts" />
"use strict";

const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 200;
var spelerY = 300;
var spelerSpeedY = 0;

var health = 3;
var score = 0;

var damageTimer = 0;
var powerupTimer = 0;

// Obstakels
var obstakelX = [];
var obstakelY = [];
var obstakelSizeX = [];
var obstakelSizeY = [];

// Powerups
var powerupX = [];
var powerupY = [];
var powerupSizeX = [];
var powerupSizeY = [];

var powerupRate = 600;

var obstakelSpeed = 5;

var kleinObstakel = 60;
var grootObstakel = 300;

/* ********************************************* */

var beweegAlles = function () {

  // zwaartekracht
  spelerSpeedY = spelerSpeedY + 0.5;

  // jetpack (spatie)
  if (keyIsDown(32)) {
    spelerSpeedY = -5;
  }

  spelerY = spelerY + spelerSpeedY;

  // niet door grond of plafond
  if (spelerY > 670) {
    spelerY = 670;
    spelerSpeedY = 0;
  }

  if (spelerY < 0) {
    spelerY = 0;
    spelerSpeedY = 0;
  }

  // damage timer
  if (damageTimer > 0) {
    damageTimer--;
  }

  // powerup timer
  if (powerupTimer > 0) {
    powerupTimer--;
  }

  // spawn powerup
  if (frameCount % powerupRate === 0) {
    powerupX[powerupX.length] = width;
    powerupY[powerupY.length] = random(100, 400);
    powerupSizeX[powerupSizeX.length] = 50;
    powerupSizeY[powerupSizeY.length] = 50;
  }

  // obstakels bewegen
  for (var i = 0; i < obstakelX.length; i++) {
    obstakelX[i] -= obstakelSpeed;
  }

  // powerups bewegen
  for (var i = 0; i < powerupX.length; i++) {
    powerupX[i] -= obstakelSpeed;
  }

  // langzaam sneller
  if (frameCount % 100 === 0) {
    obstakelSpeed = obstakelSpeed + 0.2;
    kleinObstakel = kleinObstakel - 1;
    grootObstakel = grootObstakel - 3;
  }

  // max spawn rate
  if (grootObstakel < 10) {
    grootObstakel = 10;
  }

  if (kleinObstakel < 5) {
    kleinObstakel = 5;
  }

  // kleine obstakels
  if (
    frameCount % kleinObstakel === 0 &&
    frameCount % grootObstakel !== 0
  ) {
    obstakelX[obstakelX.length] = width;
    obstakelY[obstakelY.length] = random(100, 600);
    obstakelSizeX[obstakelSizeX.length] = random(40, 80);
    obstakelSizeY[obstakelSizeY.length] = random(40, 80);
  }

  // grote obstakels
  if (frameCount % grootObstakel === 0) {
    obstakelX[obstakelX.length] = width;
    obstakelY[obstakelY.length] = random(-20, -10);
    obstakelSizeX[obstakelSizeX.length] = 50;
    obstakelSizeY[obstakelSizeY.length] = 200;

    obstakelX[obstakelX.length] = width;
    obstakelY[obstakelY.length] = random(600, 650);
    obstakelSizeX[obstakelSizeX.length] = 50;
    obstakelSizeY[obstakelSizeY.length] = 200;

    obstakelX[obstakelX.length] = width;
    obstakelY[obstakelY.length] = -5;
    obstakelSizeX[obstakelSizeX.length] = 100000;
    obstakelSizeY[obstakelSizeY.length] = 50;

    obstakelX[obstakelX.length] = width;
    obstakelY[obstakelY.length] = 680;
    obstakelSizeX[obstakelSizeX.length] = 100000;
    obstakelSizeY[obstakelSizeY.length] = 50;
  }

  // score
  if (frameCount % 50 === 0) {
    score++;
  }
};

var verwerkBotsing = function () {

  for (var i = 0; i < obstakelX.length; i++) {

    if (
      spelerX < obstakelX[i] + obstakelSizeX[i] &&
      spelerX + 50 > obstakelX[i] &&
      spelerY < obstakelY[i] + obstakelSizeY[i] &&
      spelerY + 50 > obstakelY[i]
    ) {

      if (damageTimer === 0) {
        health--;
        damageTimer = 20;
      }
    }
  }
};

var verwerkPowerup = function () {

  for (var i = 0; i < powerupX.length; i++) {

    if (
      spelerX < powerupX[i] + powerupSizeX[i] &&
      spelerX + 50 > powerupX[i] &&
      spelerY < powerupY[i] + powerupSizeY[i] &&
      spelerY + 50 > powerupY[i]
    ) {

      if (powerupTimer === 0) {

        health++;
        powerupTimer = 20;

        // verwijder powerup 
        for (var j = i; j < powerupX.length - 1; j++) {
          powerupX[j] = powerupX[j + 1];
          powerupY[j] = powerupY[j + 1];
          powerupSizeX[j] = powerupSizeX[j + 1];
          powerupSizeY[j] = powerupSizeY[j + 1];
        }
        // verklein de arrays met 1
        powerupX.length = powerupX.length - 1;
        powerupY.length = powerupY.length - 1;
        powerupSizeX.length = powerupSizeX.length - 1;
        powerupSizeY.length = powerupSizeY.length - 1;

        i--;
      }
    }
  }
};

var tekenAlles = function () {

  background(100, 180, 255);

  // speler
  fill("white");
  rect(spelerX, spelerY, 50, 50);

  // obstakels
  fill("red");

  for (var i = 0; i < obstakelX.length; i++) {

    rect(
      obstakelX[i],
      obstakelY[i],
      obstakelSizeX[i],
      obstakelSizeY[i]
    );
  }

  // powerups
  fill("green");

  for (var i = 0; i < powerupX.length; i++) {

    rect(
      powerupX[i],
      powerupY[i],
      powerupSizeX[i],
      powerupSizeY[i]
    );
  }

  // health en score
  fill("black");
  textSize(20);

  text("Health: " + health, 20, 30);
  text("Score: " + score, 20, 60);
};

/* ********************************************* */

function setup() {
  createCanvas(1280, 720);
}

function draw() {

  if (spelStatus === SPELEN) {

    beweegAlles();
    verwerkBotsing();
    verwerkPowerup();
    tekenAlles();

    if (health <= 0) {
      spelStatus = GAMEOVER;
    }
  }

  if (spelStatus === GAMEOVER) {

    background("black");

    fill("white");
    textSize(50);
    text("GAME OVER", 450, 350);

    fill(219, 219, 101);
    rect(400, 400, 440, 200);

    fill(186, 103, 191);
    textSize(30);
    text("Press R to restart", 500, 500);
    textSize(15);
    text("ode aan my G", 550,525)
    text("Bedankt aan Expensive Black voor alle inspiratie", 450, 550);
    text("Bedankt aan alle belgen", 500, 570);
    text("bedankt aan Mr Segers", 500,590)
    
    textSize(40);
    fill("white");
    text("Score: " + score, 520, 250);

    // restart
    if (keyIsDown(82)) {

      spelerX = 200;
      spelerY = 300;
      spelerSpeedY = 0;

      health = 3;
      score = 0;

      damageTimer = 0;
      powerupTimer = 0;

      obstakelSpeed = 5;

      kleinObstakel = 60;
      grootObstakel = 300;

      obstakelX = [];
      obstakelY = [];
      obstakelSizeX = [];
      obstakelSizeY = [];

      powerupX = [];
      powerupY = [];
      powerupSizeX = [];
      powerupSizeY = [];

      spelStatus = SPELEN;
    }
  }
} 