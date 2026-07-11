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
const SPELEN1 = 1;
const GAMEOVER = 2;
const UITLEG = 3;
const SPELMODUSSEN = 4;
const SPELEN2 = 5;
const SPELEN3 = 6;
var spelStatus = INTRO;

var spelerX = 150; // x-positie van speler 1
var spelerY = 300; // y-positie van speler 1
var speler2X = 150; // x-positie van speler 2
var spelerY2 = 600; // y-positie van speler 2
var obstakelX = [1400, 1600, 1100, 900, 600, 1000, 1700, 1500];
var obstakelY = [400, 550, 300, 600, 200, 150, 300, 200];
var health = 100;  // health van speler 1
var health2 = 100;  // health van speler 2
var punten1 = 0;  // punten van speler 1
var punten2 = 0;  //punten van speler
var spelerGrootte = 100;

var speed = 5;  //5
var speedObstakel = 3; //3
var kat;
/*var gameOverImg;*/
var GAMEOVERS;
var katten;
var head1;
var head2;
var obstakel;
var knoppen;

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var rectY1 = 250; 
var beweegAlles = function() {
  // speler
  beweegSpeler1();
  beweegSpeler2();
  // achtergrond
  noStroke();
  fill(255, 255, 255)
  ellipse(250, 80, 200, 100);
  ellipse(950, 80, 200, 100);
  fill(100, 140, 100)
  rect(0, 150, 1300, 600);
  fill(100, 130, 105)
  rect(0, rectY1, 1300, 100);
  rect(0, rectY1 + 200, 1300, 100);
  rect(0, rectY1 + 400, 1300, 100);
};

var bewegendeObstakels = function () {
  fill(22, 23, 26);
  for (var i = 0; i < obstakelX.length; i++) {
    image(obstakel, obstakelX[i], obstakelY [i], 50, 80);
  }

}

var beweging = function () {
  for(var i = 0; i < obstakelX.length; i++){
    if (spelStatus === SPELEN1) {
      obstakelX[i] -= speedObstakel;
    }
     if (obstakelX[i] < -50) {
      var geldigePositie = false;

      while (!geldigePositie) {
        var nieuweX = random(1100, 1250);
        var nieuweY = random(150, 650);

        geldigePositie = true;

        for (var j = 0; j < obstakelX.length; j++) {
          if (j !== i) {
            var afstand = dist(
              nieuweX, nieuweY,
              obstakelX[j], obstakelY[j]
            );

            if (afstand < 260) {
              geldigePositie = false;
              break;
            }
          }
        }

        if (geldigePositie) {
          obstakelX[i] = nieuweX;
          obstakelY[i] = nieuweY;
          }
       } 
    }

    if (spelStatus === SPELEN2) {
      obstakelX[i] -= speedObstakel+2;
    }
     if (obstakelX[i] < -50) {
      var geldigePositie = false;

      while (!geldigePositie) {
        var nieuweX = random(1100, 1250);
        var nieuweY = random(150, 650);

        geldigePositie = true;

        for (var j = 0; j < obstakelX.length; j++) {
          if (j !== i) {
            var afstand = dist(
              nieuweX, nieuweY,
              obstakelX[j], obstakelY[j]
            );

            if (afstand < 260) {
              geldigePositie = false;
              break;
            }
          }
        }

        if (geldigePositie) {
          obstakelX[i] = nieuweX;
          obstakelY[i] = nieuweY;
          }
       } 
    }

    if (spelStatus === SPELEN3) {
      obstakelX[i] -= speedObstakel+5;
    }
     if (obstakelX[i] < -50) {
      var geldigePositie = false;

      while (!geldigePositie) {
        var nieuweX = random(1100, 1250);
        var nieuweY = random(150, 650);

        geldigePositie = true;

        for (var j = 0; j < obstakelX.length; j++) {
          if (j !== i) {
            var afstand = dist(
              nieuweX, nieuweY,
              obstakelX[j], obstakelY[j]
            );

            if (afstand < 260) {
              geldigePositie = false;
              break;
            }
          }
        }

        if (geldigePositie) {
          obstakelX[i] = nieuweX;
          obstakelY[i] = nieuweY;
          }
       } 
    }
  }
}
  

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  for (var i = 0; i < obstakelX.length; i++) {
    // botsing speler 1
    if (
      spelerX + 20 < obstakelX[i] + 50 &&
      spelerX + spelerGrootte -20 > obstakelX[i] &&
      spelerY + 20 < obstakelY[i] + 80 &&  
      spelerY + spelerGrootte -20 > obstakelY[i]
    ) {
      health -= 100;
    }
    // botsing speler 2
    if (
      speler2X + 20 < obstakelX[i] + 50 &&
      speler2X + spelerGrootte - 20 > obstakelX[i] &&
      spelerY2 + 20 < obstakelY[i] + 80 && 
      spelerY2 + spelerGrootte - 20 > obstakelY[i]
    ) {
      health2 -= 100;
    }
  }
};


  // speler
var tekenSpeler1 = function() {
  image (head1, spelerX, spelerY, spelerGrootte,spelerGrootte);
};

 var beweegSpeler1 = function() {
  if (keyIsDown(87) && spelerY > 115) { // W
    spelerY -= speed;
  }
  if (keyIsDown(83) && spelerY < 650) { // S
    spelerY += speed;
  }
 };

 var tekenSpeler2 = function()  {
   image (head2, speler2X, spelerY2, spelerGrootte,spelerGrootte);
 }

 var beweegSpeler2 = function() {
  if (keyIsDown(73) && spelerY2 > 115) { // I
    spelerY2 -= speed;
  }
  if (keyIsDown(75) && spelerY2 < 650) { // K
    spelerY2 += speed;
  }

  
 };


/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

function preload() {
  kat = loadImage ('/img/katje-removebg-preview.png');
  /*gameOverImg = loadImage('/img/GAMEOVER.png');*/
  GAMEOVERS = loadImage ('/img/GAMEOVER.png');
  katten = loadImage ('/img/twoCats.jpg');
  head1 = loadImage ('/img/pixil-frame-0.png');
  head2 = loadImage ('/img/pixil-frame-0-2.png');
  obstakel = loadImage ('/img/groteStruik.png');
  knoppen = loadImage ('/img/uitleg-knoppen.png');
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
  
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  background(104, 199, 242);

  if (spelStatus === INTRO) {
    noStroke();
    background (167, 214, 164);
    fill (255, 255, 255);
    rect (420, 500, 400, 300);
    ellipse (425, 525, 150, 150);
    ellipse (825, 525, 150, 150);
    ellipse (400, 455, 60, 55);
    ellipse (830, 455, 60, 55);
    image (kat, 320, 125, 600, 600);

    noStroke(0);
    fill(255, 218, 185);
    rect(315, 200, 600, 100);
    fill(92, 64, 51);
    textSize(40);
    text ("Klik op Enter om te beginnen!", 360, 260);

    fill(245, 222, 179);
    rect(25, 465, 285, 80);
    fill(92, 64, 51); 
    textSize (25);
    text ("Klik op 'P' om",80,500);
    text ("de instructies te bekijken", 30, 525);

    fill(245, 222, 179);
    rect (225, 100, 785, 80);
    fill(92, 64, 51);    
    textSize (40);
    text ("Cat Run",525,160);
    
    if (keyIsDown('13')) { //Enter-toets
      spelStatus = SPELMODUSSEN;
    }
     
    if (keyIsDown('80')) { //X-toets
      spelStatus = UITLEG;
    }
  }

  if (spelStatus === SPELEN1) {
    beweegAlles();
    verwerkBotsing();
    tekenSpeler1();
    beweegSpeler1();
    tekenSpeler2();
    beweegSpeler2();
    bewegendeObstakels();
    beweging();
    if (health <= 0 || health2 <= 0) {
      spelStatus = GAMEOVER;
    }
  }

  if (spelStatus === SPELEN2) {
     beweegAlles();
     verwerkBotsing();
     tekenSpeler1();
     beweegSpeler1();
     tekenSpeler2();
     beweegSpeler2();
     bewegendeObstakels();
     beweging();
     if (health <= 0 || health2 <= 0) {
      spelStatus = GAMEOVER;
    }
  }

    if (spelStatus === SPELEN3) {
    beweegAlles();
    verwerkBotsing();
    tekenSpeler1();
    beweegSpeler1();
    tekenSpeler2();
    beweegSpeler2();
    bewegendeObstakels();
    beweging();
    if (health <= 0 || health2 <= 0) {
      spelStatus = GAMEOVER;
    }
  }

  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    background (255,255,255);
    image(GAMEOVERS, 175, 0, 900, 700);
    fill (0);
    textSize(40);
    text ("Klik op Spatie om opnieuw te beginnen!", 310, 660);
    if (health === 0 && health2 === 100) {
      image (head2, 10, 160, 175,175);
      textSize (30);
      fill (0);
      text ("Speler 2", 40, 320);
      text ("heeft gewonnen!",0, 360);
    } 
    
    if (health2 === 0 && health === 100) {
        stroke(0);
      image (head1, 10, 160, 175,175);
      textSize (30);
      text ("Speler 1", 40, 320);
      text ("heeft gewonnen!",0, 360);
    } 
    
    if (health === 0 && health2 === 0) {
      image(katten, 60, 200, 80, 80);
      fill (0);
      text ("Gelijkspel!",0, 360);
    }

    if (keyIsDown('32')) { //Space-toets
      spelerX = 150; // x-positie van speler 1
      spelerY = 300; // y-positie van speler 1
      speler2X = 150; // x-positie van speler 2
      spelerY2 = 600; // y-positie van speler 2
      obstakelX = [1400, 1600, 1100, 900, 600, 1000, 1700, 1500];
      obstakelY = [400, 550, 300, 600, 200, 150, 300, 200];
      health = 100;  // health van speler 1
      health2 = 100;  // health van speler 2
      punten1 = 0;  // punten van speler 1
      punten2 = 0;  //punten van speler

      spelStatus = INTRO;
    }
  }
  if (spelStatus === UITLEG) {
    background (238, 129, 28);
    image (knoppen, 0, 150, 1300, 400);
    fill (255, 228, 161);
    rect (275, 50, 290, 100);
    fill (0);
    textSize (20);
    text ("'E', 'R' en 'C'", 360, 75);
    text ("zijn voor moeilijkheidsgraad-", 300, 105);
    text ("selectie", 375, 135);

    if (keyIsDown('88')) {
    spelStatus = INTRO;
    }
   }

   if (spelStatus === SPELMODUSSEN) {
    background (212, 238, 227);
    noStroke();
    fill (191, 222, 164);
    rect (175, 200, 200, 200);
    rect (525, 200, 200, 200);
    rect (875, 200, 200, 200);

    fill(0);
    textSize (25);
    text ("Makkelijk", 220, 260);
    text ("Gemiddeld", 560, 260);
    text ("Moeilijk", 930, 260);
    textSize (40);
    text ("Kies 'E'", 210, 330);
    text ("Kies 'R'", 560, 330);
    text ("Kies 'C'", 910, 330);

    fill (255, 228, 161);
    rect (15, 545, 1240, 70);
    fill (0);
    textSize (55);
    text ("Klik op 'X' om terug te gaan naar het beginscherm", 25, 600);

      if (keyIsDown('69')) {
    spelStatus = SPELEN1;
    }
   if (keyIsDown('82')) {
    spelStatus = SPELEN2;
    }
       if (keyIsDown('67')) {
    spelStatus = SPELEN3;
    }

         if (keyIsDown('88')) {
    spelStatus = INTRO;
    }
   }
};
