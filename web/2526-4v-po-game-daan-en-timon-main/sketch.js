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

function setup() {
  createCanvas(1280, 720);  // Match browser window
}

function windowResized() {
  resizeCanvas(1280, 720);  // Resize when window changes
}

const INTRO = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = INTRO;

var spelerX = 150; // x-positie van speler
var spelerY = 600; // y-positie van speler
var health = 200;  // health van speler
var damage = 25;
var damage2 = 50;   // hoeveel schade een vijand doet
var punten = 0;    // aantal verdiende punten
var vijandenX = [1100, 1000, 1100, 1000]; // x-positie van vijand
var vijandenY = [ 150, 375, 420, 585]; // y-positie van vijand
var vijanden2X= [1050]
var vijanden2Y= [25]
var lollyX = [1130]
var lollyY = [50]
var spelerBreedte = 70;
var spelerHoogte = 70;
var vijandBreedte = 70;
var vijandHoogte = 70;
var vijanden2Hoogte = 70;
var vijanden2Breedte = 70;
var lollyHoogte=60;
var lollyBreedte=60;
var vijandenSnelheid = 5;
var vijanden2Snelheid = 5;
var lollySnelheid = 4;
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler

  // WS Movement
  

  if (keyIsDown(87)) { // W
    spelerY -= 8;
  }
  if (keyIsDown(83)) { // S
    spelerY += 8;
  }
  // AD Movement 
  if (keyIsDown(65)) { // A
    spelerX -= 8;
  }
  if (keyIsDown(68)) { // D
    spelerX += 8;
  }



  // grens van het speelveld
  spelerX = constrain(spelerX, 0, 1140);
  spelerY = constrain(spelerY, -35, 585);
 
  // vijand
  for (var i = 0; i < vijandenX.length; i++) {
    if(vijandenX[i]>0){
      vijandenX[i] -= vijandenSnelheid + punten/100;
    } 
    else {
      vijandenX[i] = 1140; // reset positie van vijand als deze het scherm verlaat
      vijandenY[i] = random(-35, 585);
     }
   
  }
  
  for(var i = 0; i<vijanden2X.length; i++) {
    if(vijanden2X[i]>0){
      vijanden2X[i] -= vijanden2Snelheid + punten/100;
    }
    else {
      vijanden2X[i]=1140;
      vijanden2Y[i]= random(-35, 585);
    }
  }
  

  for (var i = 0; i < lollyX.length; i++) {
    if(lollyX[i]>0){
      lollyX[i] -= lollySnelheid + punten/100;
      }
     else {
     lollyX[i] = 1140;
      lollyY[i] = random(-35, 585);
    }
  }
}

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand

  
  for (var i = 0; i < vijandenX.length; i++) {
    

    var raaktVijand = spelerX < vijandenX[i] + vijandBreedte &&
                      spelerX + spelerBreedte > vijandenX[i] &&
                      spelerY < vijandenY[i] + vijandHoogte &&
                      spelerY + spelerHoogte > vijandenY[i];

    if (raaktVijand) {
      health -= damage;
      vijandenX[i] = -200; // verwijder de vijand zodat je niet elke frame schade krijgt
    }
    var raaktVijand2 = spelerX< vijanden2X[i] + vijanden2Breedte &&
                      spelerX + spelerBreedte > vijanden2X[i] &&
                      spelerY < vijanden2Y[i] + vijanden2Hoogte &&
                      spelerY + spelerHoogte > vijanden2Y[i];

    if (raaktVijand2) {
      health -= damage2;
      vijanden2X[i] = -200;
    }
    var raaktLolly = spelerX < lollyX[i] + lollyBreedte &&
                      spelerX + spelerBreedte > lollyX[i] &&
                      spelerY < lollyY[i] + lollyHoogte &&
                      spelerY + spelerHoogte > lollyY[i];

    if (raaktLolly) {
      punten += 10;
      lollyX[i] = -200; // verwijder de vijand zodat je niet elke frame schade krijgt
    }
  }

  // botsing kogel tegen vijand

  // update punten en health
  
};

/**
 * Tekent spelscherm
 */
var bgImage;
var spelerImg;
var vijandenImg;
var vijanden2Img
var introImg;
var outroImg;
var lollyImg;

function preload() {
  bgImage = loadImage('achtergrondGame4.png');  // Load before setup
  spelerImg = loadImage('pixil-frame-0-4.png');
  vijandenImg = loadImage('bijvijand.png');
  vijanden2Img = loadImage('vijand2.png')
  introImg = loadImage('introImg3.png');
  outroImg = loadImage('outroGame2.png');
  lollyImg = loadImage('pixelLolly.png');
}

var tekenAlles = function() {
  // achtergrond

  // vijanden
  for (var i = 0; i < vijandenX.length; i++) {
    image(vijandenImg, vijandenX[i], vijandenY[i], vijandBreedte, vijandHoogte); 
  }
  for (var i=0; i < vijanden2X.length; i++) {
    image(vijanden2Img, vijanden2X[i], vijanden2Y[i], vijanden2Breedte, vijanden2Hoogte);
  }
  // lolly
  for (var i = 0; i < lollyX.length; i++) {
    image(lollyImg, lollyX[i], lollyY[i], lollyBreedte, lollyHoogte); 
  }
  
  // kogel

  // speler
  
  image(spelerImg, spelerX, spelerY, spelerBreedte, spelerHoogte);

  // punten en health
  fill('pink')
  noStroke();
  textSize(40);
  textAlign(LEFT, TOP);
  text('Health: ' + health, 10, 0);

  fill('purple');
  noStroke();
  textSize(40);
  textAlign(RIGHT, TOP);
  text('Punten: ' + punten, 1270, 0);

  fill('red');
  rect(spelerX, spelerY-10, 100, 10);
  fill('lime');
  rect(spelerX, spelerY-10, health/2, 10);
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */


/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  image(bgImage, 0, 0, 1280, 720);  // Draw at (0,0) with canvas width/height
  if (spelStatus === INTRO) {
    // teken een startscherm
    background(introImg);
    fill('pink');
    textAlign(CENTER, CENTER);
    textSize(40);
    text('', 640, 360);
    textSize(20);
    text('', 640, 400);
    if (keyIsDown(32)) { // 32 = SPATIE
      spelStatus = SPELEN;
    }
  }
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (health <= 0) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    background(outroImg);
    fill('pink');
    textSize(50);
    textAlign(CENTER, CENTER);
    text('', 640, 360);
    fill('white');
    textSize(50);
    text('' + punten, 640, 560);
    text('', 640, 480);
  }
    if (keyIsDown(ENTER)) { 
    // reset alle variabelen naar beginwaarden
    punten = 0;
    health = 200;
    spelerX = 150;
    spelerY = 600;
    vijandenX =[1000,1100,1000,1100,1000];
    vijandenY=[50,150,375,420,585];
    vijanden2X=[1050];
    vijanden2Y=[25];
    lollyX=[1120,1130];
    lollyY=[50,450];

    spelStatus = INTRO;
    }

}

