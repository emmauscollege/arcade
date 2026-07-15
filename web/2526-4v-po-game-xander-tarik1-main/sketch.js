/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path=".vscode/p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const INTRO = 0;
const SPELEN = 1;
const GOAL = 2;
var spelStatus = INTRO;

var speler1X = 300; // x-positie van speler1
var speler1Y = 360; // y-positie van speler1
var health = 100;  // health van speler1

var speler2X = 980; // x-positie van speler2
var speler2Y = 360; // y-positie van speler2
var health = 100;  // health van speler2

var balX = 640; // x-positie van bal
var balY = 360; // x-positie van bal
var balVelX = 0; // y-snelheid van bal
var balVelY = 0; // y-snelheid van bal

var i = 0; // score speler 1
var u = 0; // score speler 2

var balAfbeelding;

// snelheidsboosters
var boosterX = 0; 
var boosterY = 0;
var boosterBestaat = false; // bestaat booster?
var boosttimer1 = 0; // timer voor speler1 boost
var boosttimer2 = 0; // timer voor speler2 boost
var boostSpawn = 0;
var boostspawntimer = 2000;


// freeze powerup
var freezerX = 0; 
var freezerY = 0;
var freezerBestaat = false; // bestaat freezer?
var freezetimer1 = 0; // timer voor speler2 freeze
var freezetimer2 = 0; // timer voor speler1 freeze
var freezeSpawn = 0;
var freezespawntimer = 3000;
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
function preload() {
  balAfbeelding = loadImage('afbeeldingen/bal.png');
}

var beweegAlles = function() {
  var speed1 = 3
  var speed2 = 3

  // check actieve boosts
  if(boosttimer1 > 0) {
    speed1 = 5;
    boosttimer1--;
  }
  if(boosttimer2 > 0) {
    speed2 = 5;
    boosttimer2--;
  }
  // check actieve boosts
  if(freezetimer1 > 0) {
    speed2 = 0;
    freezetimer1--;
  }
  if(freezetimer2 > 0) {
    speed1 = 0;
    freezetimer2--;
  }

  // speler
  if(keyIsDown(65)){
    speler1X -= speed1
  }

  if(keyIsDown(83)){
    speler1Y += speed1
  }

  if(keyIsDown(68)){
    speler1X += speed1
  }

  if(keyIsDown(87)){
    speler1Y -= speed1
  }

  background('green');

  // speler2
  if(keyIsDown(74)){
    speler2X -= speed2
  }

  if(keyIsDown(75)){
    speler2Y += speed2
  }

  if(keyIsDown(76)){
    speler2X += speed2
  }

  if(keyIsDown(73)){
    speler2Y -= speed2
  }

  background('green');
  
  // update boosters
  

  // bal beweging
  balX += balVelX;
  balY += balVelY;
  
  // bal blijft in speelveld
  if(balX < 15) balVelX = Math.abs(balVelX);
  if(balX > 1265) balVelX = -Math.abs(balVelX);
  if(balY < 15) balVelY = Math.abs(balVelY);
  if(balY > 705) balVelY = -Math.abs(balVelY);
  
  // bal vertraagt langzaam
  balVelX *= 0.98;
  balVelY *= 0.98;
};

/**
 * Checkt botsingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler1 met bal
  var afstand1 = dist(speler1X, speler1Y, balX, balY);

  if(afstand1 < 40) {
    balVelX = ((balX - speler1X) / 10) * 1.7;
    balVelY = ((balY - speler1Y) / 10) * 1.7;
  }
  
  // botsing speler2 met bal
  var afstand2 = dist(speler2X, speler2Y, balX, balY);
  if(afstand2 < 40) {
    balVelX = ((balX - speler2X) / 10) * 1.7;
    balVelY = ((balY - speler2Y) / 10) * 1.7;
  }
  //botsing met booster
  var afstandBooster1 = dist (speler1X, speler1Y, boosterX, boosterY);
  if (afstandBooster1 < 40) {
    boosttimer1 = 180;
    boosterBestaat = false;
  }

  var afstandBooster2 = dist (speler2X, speler2Y, boosterX, boosterY);
  if (afstandBooster2 < 40) {
    boosttimer2 = 180;
    boosterBestaat = false;
  }

  

  //botsing mat freezer
  var afstandfreezer1 = dist (speler1X, speler1Y, freezerX, freezerY);
  if (afstandfreezer1 < 40) {
    freezetimer1 = 60;
    freezerBestaat = false;
  }

  var afstandFreezer2 = dist (speler2X, speler2Y, freezerX, freezerY);
  if (afstandFreezer2 < 40) {
    freezetimer2 = 60;
    freezerBestaat = false;
  }

  // botsing tussen spelers
  var afstandSpelers = dist(speler1X, speler1Y, speler2X, speler2Y);

  if (afstandSpelers < 50) {
    var dx = speler2X - speler1X;
    var dy = speler2Y - speler1Y;
    var distance = Math.sqrt(dx*dx + dy*dy);
    if (distance > 0) {
      dx /= distance;
      dy /= distance;
      var overlap = 50 - distance;
      speler1X -= dx * overlap / 2;
      speler1Y -= dy * overlap / 2;
      speler2X += dx * overlap / 2;
      speler2Y += dy * overlap / 2;
    }
  }
};
/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  //goals
  stroke("red");
  strokeWeight(10);
  background('green');
  fill("green");
  rect(-10, 200, 110, 300);
  stroke("blue");
  rect(1190, 200, 110, 300);

  //scoreboard
  stroke("white");
  fill("black")
  strokeWeight(2);
  rect(560, 0, 160, 40)
  fill('white');
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  text(i +" : "+ u, 640, 10);

  //veld
  stroke("white");
  strokeWeight(5);
  fill("green");
  ellipse(640, 360, 100, 100);
  noStroke();
  fill("white")
  rect(638, 40, 5, 720)
  rect(300, 90, 5, 500)
  rect(976, 90, 5, 500)
  rect(0, 90, 300, 5)
  rect(0, 585, 300, 5)
  rect(976, 90, 300, 5)
  rect(976, 585, 300, 5)

  // speler1
  stroke("black");
  strokeWeight(1);
  fill("red");
  rect(speler1X - 25, speler1Y - 25, 50, 50);
  fill("white");
  noStroke();
  textSize(30);
  textAlign(CENTER, CENTER);
  text('1', speler1X, speler1Y);
  
  if(speler1X < 25){
    speler1X = 25
  }

  if(speler1X > 1255){
    speler1X = 1255
  }

  if(speler1Y < 25){
    speler1Y = 25
  }

  if(speler1Y > 695){
    speler1Y = 695
  }


  // speler2
  fill("blue");
  stroke("black");
  strokeWeight(1);
  rect(speler2X - 25, speler2Y - 25, 50, 50);
  fill("white");
  noStroke();
  textSize(30);
  textAlign(CENTER, CENTER);
  text('2', speler2X, speler2Y);

  if(speler2X < 25){
    speler2X = 25
  }

  if(speler2X > 1255){
    speler2X = 1255
  }

  if(speler2Y < 25){
    speler2Y = 25
  }

  if(speler2Y > 695){
    speler2Y = 695
  }
  
  // bal
  image(balAfbeelding, balX, balY, 30, 30);
  
  // booster spawnen

  if (!boosterBestaat) {
    if (millis() - boostSpawn > boostspawntimer){
      spawnBooster();
      boosterBestaat = true;
      boostSpawn = millis();
    }
  }

  if (!freezerBestaat) {
    if (millis() - freezeSpawn > freezespawntimer){
      spawnFreezer();
      freezerBestaat = true;
      freezeSpawn = millis();
    }
  }

  tekenFreezer();
 tekenBooster();
};
/**
 * Spawn willekeurig boosters op het speelveld
 */
var spawnBooster = function() {
  boosterX = random(300, 980);
  boosterY = random(200, 520);
}

var tekenBooster = function() {
  if (millis() - boostSpawn > boostspawntimer){
    fill(255, 215, 0);
    stroke(200, 170, 0);
    strokeWeight(2);
    rect(boosterX - 15, boosterY - 15, 30, 30);
  }
};

var spawnFreezer = function() {
  freezerX = random(100, 1180);
  freezerY = random(100, 620);
}

var tekenFreezer = function() {
  if (millis() - freezeSpawn > freezespawntimer){
    fill(0, 0, 139);
    stroke(2, 7, 93);
    strokeWeight(2);
    rect(freezerX - 15, freezerY - 15, 30, 30);
  }
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
  imageMode(CENTER);
  // Kleur de achtergrond groen, zodat je het kunt zien
  background('green');
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
  }
  if (balX <= 15 && (balY <= 500 && balY >= 200) || balX >= 1265 && (balY <= 500 && balY >= 200)) {
    console.log(balX, balY);
    spelStatus = GOAL;
  }
  if (spelStatus === INTRO) {
    // teken een startscherm
    background(0);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(50);
    text('Voetbal 1v1', width / 2, height / 2 - 40);
    textSize(25);
    text("press 'enter' to start", width / 2, height / 2 + 20);
    if (keyIsDown(13)) {
      spelStatus = SPELEN;
    }
}
  if (spelStatus === GOAL) {
    tekenAlles();
    fill(0, 0, 0, 200);
    rect(0, 0, 2000, 2000);
    fill("white");
    textSize(50);
    textAlign(CENTER, CENTER);
    text("GOAL!", width / 2, height / 2);
    textSize(25);
    text("press 'enter' to continue", width / 2, height / 2 + 50);
    
  }
  if (spelStatus === GOAL) {
      if (balX >= 1265) {
        i+=1;
        balX = 1250
        balVelX = 0;
        balVelY = 0;
        }
      else if (balX <= 15) {
        u+=1;
        balX = 30
        balVelX = 0;
        balVelY = 0;
        
      }
  }
  if (spelStatus === GOAL && keyIsDown(13)) {
      balX = 640
      balY = 360
      speler1X = 300
      speler1Y = 360
      speler2X = 980
      speler2Y = 360
      balVelX = 0
      balVelY = 0
      spelStatus = SPELEN
  }
};
