/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const STARTSCHERM = 0;
const UITLEG = 1;
const MOEILIJKHEIDKIEZEN = 2;
const SPELEN = 3;
const GAMEOVER = 4;
const WINSCHERM = 5;
const LAADSCHERM = 6;

var spelStatus = STARTSCHERM;

var laatTijd = 0;
var levels = 0;

var tijd = 0;
var snelsteTijd = Infinity;

var gameStatus = 0;
const UITGESPEELD = 1;

const GEMIDDELD = 0;
const MAKKELIJK = 1;
const HARDMODE = 2;
var moeilijkheid = GEMIDDELD;

const ENTER = 13;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const SPACEBAR = 32;

var spelerX = 100; // x-positie van speler
var spelerY = 500; // y-positie van speler

var springHoogte = 8.5 + 2.5;
var springTimer = 0;

var damagePlatformSpeedX = [[0, 0, 0, 0], 
                            [], 
                            [], 
                            [], 
                            [], 
                            [8]];

var damagePlatformSpeedY = [[4, 4, 4, 4], 
                            [], 
                            [], 
                            [], 
                            [], 
                            [0]];

var platformSpeedX = [[], 
                      [], 
                      [0, 0, 0, 0, 0], 
                      [], 
                      [0, 2, 2, 2], 
                      [0]];

var platformSpeedY = [[], 
                      [], 
                      [3.25, 3.25, 3.25, 3.25, 3.25], 
                      [],
                      [0, 0, 0, 0],
                      [0]];

var platformX = [[50, 300, 550, 800, 1050],
                 [50, 250, 50, 250, 700, 950, 1125],
                 [50, 300, 550, 800, 1050],
                 [50],
                 [50, 175, 700, 825],
                 [50, 300, 550, 800, 1050]];

var platformY = [[500, 500, 500, 500, 500],
                 [500, 400, 300, 200, 550, 550, 450],
                 [500, 500, 500, 500, 500], 
                 [500],
                 [500, 500, 500, 500],
                 [500, 500, 500, 500, 500]];

var damagePlatformX = [[175, 425, 675, 925],
                       [500, 600, 700, 800],
                       [], 
                       [],
                       [],
                       [300]];
var damagePlatformY = [[350, 350, 350, 350],
                       [200, 250, 400, 200],
                       [], 
                       [],
                       [],
                       [450]];


var stekelPlatformenX = [200, 500, 800];
var stekelPlatformenY = [450, 350, 250];

var stekelPlatformenTweeX = [350, 650];
var stekelPlatformenTweeY = [400, 300];

var puntenX = [[100, 350, 600, 850, 1100],
               [100, 300, 100, 300, 650, 750],
               [100, 350, 600, 850, 1100],
               [250, 550, 850],
               [487.5, 812.5],
               [100, 350, 600, 850, 1100]];
var puntenY = [[450, 450, 450, 450, 450],
               [450, 350, 250, 150, 425, 275],
               [450, 450, 450, 450, 450], 
               [400, 300, 200],
               [400, 400],
               [450, 450, 450, 450, 450]];

var spelerSize = 25; // grote van de speler
var hp = 10; // levens speler

var score = 0; // aantal behaalde punten
var hoogsteScore = 0; // meeste behaalde punten




/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

var timer = function() {
tijd += (1/54)
}

/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill(43, 47, 119);
  rect(20, 20, width - 2 * 20, height - 2 * 20);
};

var hardMode = function() {
        gameStatus = 0;
        strokeWeight(1.5)

        fill('black')
        rect(20, 20, width - 40, width - 40)

        fill(150, 100, 50)
        ellipse(width/2 + 2, 300, 225, 225)
        fill(150, 0, 0)
        ellipse(width/2 - 2, 300, 225, 225)
        fill('black')
        ellipse(width/2, 300, 220, 220)

        stroke('red')
        line(width/2, 350, width/2 + 25, 350 - 25)
        line(width/2, 350, width/2 - 25, 350 - 25)
        line(width/2 + 25, 325, width/2 - 25, 275)
        line(width/2 - 25, 325, width/2 + 25, 275)
        line(width/2 + 25, 275, width/2 + 12.5, 262.5)
        line(width/2 - 25, 275, width/2 - 12.5, 262.5)
        line(width/2, 350, width/2, 270)
}

var borders = function () {
    if (spelerX < 20 + spelerSize/2) {spelerX = 20 + spelerSize/2;}
    if (spelerY < 20 + spelerSize/2) {spelerY = 20 + spelerSize/2;}
    if (spelerY > 600 - spelerSize/2) {spelerY = 600 - spelerSize/2;};

    fill("orange")
    rect(0, 0, 20, 720)
    rect(0, 0, 1280, 20)
    rect(0, 700, 1280, 20)

    platform(1260, 0, 20, 300)
    platform(1260, 420, 20, 300)
    tekenPlatform(1260, 0, 20, 300)
    tekenPlatform(1260, 420, 20, 300)
};

var platform = function(x, y, w, h) {
if (spelerX > x - spelerSize/2 &&
    spelerX < x + w + spelerSize/2 &&
    spelerY > y - spelerSize/2 &&
    spelerY < y + spelerSize/2
    ) 

     {spelerY = y - spelerSize/2;
        springHoogte = 8.5 + 2.5;
        springTimer = 0;
     };

if (spelerX > x - spelerSize/2 &&
    spelerX < x + w + spelerSize/2 &&
    spelerY > y - spelerSize/2 &&
    spelerY < y + 5 + h + spelerSize/2
    ) 
     
     {spelerY = y + 5 + h + spelerSize/2;
      springTimer = 40;
     };

if (spelerX > x - spelerSize/2 &&
    spelerX < x + 5 + w + spelerSize/2 &&
    spelerY > y - spelerSize/2 &&
    spelerY < y + h + spelerSize/2
    ) 
     
     {spelerX = x + 5 + w + spelerSize/2;
     };

if (spelerX > x - 5 - spelerSize/2 &&
    spelerX < x + w + spelerSize/2 &&
    spelerY > y - spelerSize/2 &&
    spelerY < y + h + spelerSize/2
    ) 
     
     {spelerX = x - 5 - spelerSize/2;
     };
};

var damagePlatform = function(x, y, w, h)
{if (spelerX > x - spelerSize/2 && 
        spelerX < x + w + spelerSize/2 && 
        spelerY > y - spelerSize/2 && 
        spelerY < y + h + spelerSize/2)

        {hp -= 1;
        spelerX = 100;
        spelerY = 500 - spelerSize/2;
        springTimer = 40;
        spelStatus = LAADSCHERM;
    }
};

var punten = function(x, y, w, h, p)
{if (spelerX > x - 0.375*w && 
        spelerX < x + 1*w && 
        spelerY > y - 0.375*h && 
        spelerY < y + 1*w)

        {score += 1;
         puntenX[levels].splice(p, 1);
         puntenY[levels].splice(p, 1);
    }
};

var stekelPlatform = function(x, y) {
    platform(x, y, 100, 50)
    damagePlatform(x, y - 20, 20, 20)
    damagePlatform(x + 80, y - 20, 20, 20)

    tekenPlatform(x, y, 100, 50)
    tekenDamagePlatform(x, y - 20, 20, 20)
    tekenDamagePlatform(x + 80, y - 20, 20, 20)
}

var stekelPlatformTwee = function(x, y) {
    platform(x, y, 100, 50)
    damagePlatform(x + 35, y - 20, 30, 20)
    tekenPlatform(x, y, 100, 50)
    tekenDamagePlatform(x + 35, y - 20, 30, 20)
}

var eindScherm = function() {
    if (moeilijkheid === HARDMODE) {
            score *= 2
            moeilijkheid = GEMIDDELD;
        }

        if (score > hoogsteScore) {
            hoogsteScore = score;
        }

        levels = 0;
        spelerX = 100;
        spelerY = 500;
        stroke('black');

    if (keyIsDown(SPACEBAR)) {
        spelStatus = MOEILIJKHEIDKIEZEN;
        }

    if (keyIsDown(ENTER)) {
        spelStatus = STARTSCHERM;
        }

    if (keyIsDown(ENTER) || keyIsDown(SPACEBAR)) {
        hp = 10;
        score = 0;
        puntenX = [[100, 350, 600, 850, 1100],
                   [100, 300, 100, 300, 650, 750],
                   [100, 350, 600, 850, 1100],
                   [250, 550, 850],
                   [487.5, 812.5],
                   [100, 350, 600, 850, 1100]];
        puntenY = [[450, 450, 450, 450, 450],
                   [450, 350, 250, 150, 425, 275],
                   [450, 450, 450, 450, 450], 
                   [400, 300, 200],
                   [400, 400],
                   [450, 450, 450, 450, 450]];
    }
}

/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  fill('black');
  ellipse(x + 6.5 - spelerSize/2, y + 2 - spelerSize/2, 10, 10)
  fill(255, 102, 0)
  ellipse(x - 6.5 + spelerSize/2, y + 2 - spelerSize/2, 10, 10)

  fill('230, 180, 180')
  ellipse(x, y, spelerSize, spelerSize);
  fill('black')
  ellipse(x - 2 + spelerSize/4, y - spelerSize/4, spelerSize/5, spelerSize/5)
  ellipse(x + 2 - spelerSize/4, y - spelerSize/4, spelerSize/5, spelerSize/5)
  fill('white')
  ellipse(x - 2 + spelerSize/4, y - spelerSize/4 , 3, 3)
  ellipse(x + 2 - spelerSize/4, y - spelerSize/4, 3, 3)

  line(x + 5, y + 2, x + 20, y + 10)
  line(x + 5, y, x + 20, y)
  line(x + 5, y - 2, x + 20, y - 10)
  line(x - 5, y + 2, x - 20, y + 10)
  line(x - 5, y, x - 20, y)
  line(x - 5, y - 2, x - 20, y - 10)
};

var tekenPlatform = function(x, y, w, h) {
  fill("orange");
  rect(x, y, w, h)
}

var tekenDamagePlatform = function(x, y, w, h) {
  fill(150, 0, 0);
  rect(x, y, w, h);
}

var tekenPunten = function(x, y, w, h) {
 fill(187, 224, 255)
 ellipse(x, y, w, h);
}

var jumpSpeler = function() {
      if (keyIsDown(KEY_UP)) {
         spelerY -= springHoogte;
         springTimer += 1
      }

      if (springTimer === 5) {springHoogte = 6 + 2.5;
      }

      if (springTimer === 10) {springHoogte = 4.5 + 2.5;
      }

      if (springTimer === 20) {springHoogte = 3 + 2.5;
      }

      if (springTimer === 25) {springHoogte = 1.5 + 2.5;
      }

      if (springTimer === 30) {springHoogte = 0.75 + 2.5;
      }

      if (springTimer === 35) {springHoogte = 0.25 + 2.5;
      }

      if (springTimer > 39) {springHoogte = 0;
      }
};

/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
        if (keyIsDown(KEY_LEFT)) {spelerX -= 5}
        else if (keyIsDown(KEY_RIGHT)) {spelerX += 5}
        jumpSpeler();
};

var beweegDamagePlatform = function(x, y, linkerX, rechterX, benedenY, bovenY) {
    damagePlatformY[levels][y] += damagePlatformSpeedY[levels][y];
    damagePlatformX[levels][x] += damagePlatformSpeedX[levels][x];

    if (damagePlatformX[levels][x] > rechterX) {
        damagePlatformSpeedX[levels][x] = -damagePlatformSpeedX[levels][x];
    }
    
    if (damagePlatformX[levels][x] < linkerX) {
        damagePlatformSpeedX[levels][x] = -damagePlatformSpeedX[levels][x];
    }

    if (damagePlatformY[levels][y] > benedenY) {
        damagePlatformSpeedY[levels][y] = -damagePlatformSpeedY[levels][y];
    }
    
    if (damagePlatformY[levels][y] < bovenY) {
        damagePlatformSpeedY[levels][y] = -damagePlatformSpeedY[levels][y];
    }
}

var beweegPlatform = function(x, y, linkerX, rechterX, benedenY, bovenY) {

    platformY[levels][y] += platformSpeedY[levels][y];
    platformX[levels][x] += platformSpeedX[levels][x];

    if (platformX[levels][x] > rechterX) {
        platformSpeedX[levels][x] = -platformSpeedX[levels][x];
    }
    
    if (platformX[levels][x] < linkerX) {
        platformSpeedX[levels][x] = -platformSpeedX[levels][x];
    }

    if (platformY[levels][y] > benedenY) {
        platformSpeedY[levels][y] = -platformSpeedY[levels][y];
    }
    
    if (platformY[levels][y] < bovenY) {
        platformSpeedY[levels][y] = -platformSpeedY[levels][y];
    }
}

/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    if (hp === 0)
    {return true}
    else return false;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond zwart, zodat je het kunt zien
  background("black");
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case STARTSCHERM:
    background(43, 47, 119);
    fill('orange')
    textSize(75)
    text('CAVIA QUEST', width/2 - 200, height/2 - 75, 700, 700)
    textSize(35)
    text('Gemaakt door: een leerling', width/2 - 185, height/2 + 25, 700, 700)
    text('Druk op spacebar om verder te gaan', width/2 - 225, height/2 + 250, 700, 700)
    if (keyIsDown(SPACEBAR)) {
        spelStatus = UITLEG;
    }

    break;
    case UITLEG:
    background('black');
    if (keyIsDown(ENTER)) {spelStatus = MOEILIJKHEIDKIEZEN;}
    fill(175, 175, 175)
    textSize(30)
    text("Gebruik de linker en rechter pijltjes om heen en weer te bewegen. Met pijltje omhoog kan je springen. De langer je het pijltje ingedrukt houd de hoger je karakter springt.", 40, 20, 1240, 700)
    text("Druk op enter om verder te gaan.", 40, 150, 1240, 700)

    text("Dit is een normaal platform waar je op kan springen.", 325, 265, 700, 700)

    text("Dit is een damageplatform. Als je het platform aanraakt dan verlies je 1 hp en wordt je teruggestuurd naar het begin van het level. Bij een game over wordt je teruggestuurd naar het allereerste level.", 325, 375, 900, 700 )

    text("Dit is een punt. Als je deze oppakt dan gaat je score plus 1.", 325, 550, 1000, 700)

    tekenPlatform(150, 250, 100, 50)
    tekenDamagePlatform(150, 375, 100, 50)
    tekenPunten(200, 550, 20, 20)
    break;

    case MOEILIJKHEIDKIEZEN:
    background('black')
    fill(175, 175, 175)
    textSize(30)
    tijd = 0;
    text("Druk op 1 voor makkelijk. Bij makkelijk heb je 25 hp.", 125, 165 - 70, 720, 700)

    text("Druk op 2 voor normaal. Bij normaal heb je 10 hp.", 125, 275 - 70, 920, 700 )

    text("Druk op 3 voor moeilijk. Bij moeilijk heb je 1 hp, maar je score wordt wel verdubbeld. Op moeilijk verandert het uiterlijk van de game overigens ook.", 125, 400 - 70, 1020, 700)

    if (gameStatus === UITGESPEELD) {
    fill('orange')
    text("Je kunt nu levels selecteren door op het nummer van het level te drukken op je toetsenbord. Dit werkt alleen bij makkelijk en gemiddeld.", 125, 550 - 30, 1200, 1200);
    }
    if (keyIsDown(49)) {
        moeilijkheid = MAKKELIJK;
        spelStatus = SPELEN;
    }
    if (keyIsDown(50)) {
        moeilijkheid = GEMIDDELD;
        spelStatus = SPELEN;
    }
    if (keyIsDown(51)) {
        moeilijkheid = HARDMODE;
        hp = 1;
        spelStatus = SPELEN;
    }
    break;

    case SPELEN: 
    laatTijd = 0;
    background('black')
      beweegSpeler();

      switch (moeilijkheid) {
      case GEMIDDELD: 
      tekenVeld();
      strokeWeight(1);
      break;

      case MAKKELIJK: 
      hp = 25;
      moeilijkheid = GEMIDDELD;
      break;

      case HARDMODE: 
      hardMode();
      }
      
      // Dit is de zwaartekracht
      spelerY += 3.25
      // Dit is een timer die de tijd bij houd in seconden.
      timer()
      // Dit zijn de borders
      borders();

      if (gameStatus === UITGESPEELD) {
      for(var i = 0; i < 6; i++) {
      if (keyIsDown(49 + i) && levels !== i) {levels = i;
      spelerX = 100;
      spelerY = 500;}
      }
    }

      if (levels === 0) {
        for(var i = 0; i <damagePlatformX[levels].length; i++) {
          beweegDamagePlatform(i, i, 0, 0, 650, 350)
        }
      }

      if (levels === 1) {
          platform(500, 250, 100, 350)
          platform(800, 250, 100, 200)
          tekenPlatform(500, 250, 100, 350)
          tekenPlatform(800, 250, 100, 200)
      }

      if (levels === 2) {
          for(var i = 1; i < platformX[levels].length; i++) {
          beweegPlatform(i, i, 0, 0, 650, 500)
        }
      }
      
      if (levels === 3) {
      for(var i = 0; i <stekelPlatformenX.length; i++) {
      stekelPlatform(stekelPlatformenX[i], stekelPlatformenY[i])
      }

      for(var i = 0; i <stekelPlatformenTweeX.length; i++) {
       stekelPlatformTwee(stekelPlatformenTweeX[i], stekelPlatformenTweeY[i])
       }
      }

      if (levels === 4) {
        beweegPlatform(1, 1, 175, 375, 0, 0)
        beweegPlatform(2, 2, 500, 700, 0, 0)
        beweegPlatform(3, 3, 825, 1025, 0, 0)
      }

      if (levels === 5) {
          beweegDamagePlatform(0, 0, 300, 1050, 0, 0)
          if (spelerX > 1260) {
          spelStatus = WINSCHERM;
          gameStatus = UITGESPEELD;
          }
      }

      if (spelerX > 1260 && levels < 5) {
        spelerX = 100; 
        spelerY = 500 - spelerSize/2;
        levels += 1;
        spelStatus = LAADSCHERM;}


      for(var i = 0; i <platformX[levels].length; i++) {
      platform(platformX[levels][i], platformY[levels][i], 100, 50)
      }


      for(var i = 0; i <damagePlatformX[levels].length; i++) {
      damagePlatform(damagePlatformX[levels][i], damagePlatformY[levels][i], 100, 50)
      }


      for(var i = 0; i <puntenX[levels].length; i++) {
      punten(puntenX[levels][i], puntenY[levels][i], 20, 20, i)
      }


      tekenSpeler(spelerX, spelerY);


      for(var i = 0; i <platformX[levels].length; i++) {
      tekenPlatform(platformX[levels][i], platformY[levels][i], 100, 50)
      }


      for(var i = 0; i <damagePlatformX[levels].length; i++) {
      tekenDamagePlatform(damagePlatformX[levels][i], damagePlatformY[levels][i], 100, 50)
      }


      for(var i = 0; i <puntenX[levels].length; i++) {
      tekenPunten(puntenX[levels][i], puntenY[levels][i], 20, 20)
      }

      damagePlatform(20, 600 - 5, width - 2*20, height - 2*20 - 575 + 5)
      tekenDamagePlatform(20, 600 - 5, width - 2*20, height - 2*20 - 575 + 5)

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }

      textSize(30)
      fill(200, 200, 200)
      text("hp = " + hp, 40, 40, 200, 200)
      text("score = " + score, 40, 80, 400, 200)
      text("level " + (levels + 1), width/2 - 25, 40, 200, 200)
      text("" + Math.round(tijd*100)/100, width - 125, 35, 200, 200)
      break;

    case GAMEOVER:
    eindScherm();
    background('black');
    textSize(75)
    fill(255, 0, 0)
    text("GAME OVER", 640 - 175, 260, 700, 700);
    textSize(35)
    text("Score: " + score, 640 - 45, 360, 700, 700);
    text("Highscore: " + hoogsteScore, 640 - 45, 410, 700, 700);
    text("Tijd: " + Math.round(tijd*100)/100, 640 - 45, 460, 700, 700)

    text('Druk op spacebar om verder te gaan', width/2 - 225, height/2 + 250, 700, 700)
    text('Druk op enter om te stoppen', width/2 - 175, height/2 + 300, 700, 700)
    break;

    case WINSCHERM: 
    eindScherm();
    if (tijd < snelsteTijd) {
            snelsteTijd = tijd;
        }

    background(43, 47, 119);
    textSize(75)
    fill('orange')
    text("GAME WON", 640 - 165, 160 + 50, 700, 700)

    textSize(35)
    text("Score: " + score, 640 - 45, 260 + 50, 700, 700);
    text("Highscore: " + hoogsteScore, 640 - 45, 310 + 50, 700, 700);
    text("Tijd: " + Math.round(tijd*100)/100, 640 - 45, 360 + 50, 700, 700)
    text("Snelste tijd: " + Math.round(snelsteTijd*100)/100, 640 - 45, 410 + 50, 700, 700)
    text('Druk op spacebar om verder te gaan', width/2 - 225, height/2 + 250, 700, 700)
    text('Druk op enter om te stoppen', width/2 - 175, height/2 + 300, 700, 700)
    break;

    /*Dit laadscherm zorgt ervoor dat als je dood springt je tijd heb om de spring knop los te laten, 
      want anders spring je misschien wel meteen weer dood.*/
    case LAADSCHERM:
    laatTijd += (1/54)
    if (laatTijd > 0.6) {
    spelStatus = SPELEN;}

    background('black')
    stroke('red')
    line(width/2, 350, width/2 + 25, 350 - 25)
    line(width/2, 350, width/2 - 25, 350 - 25)
    line(width/2 + 25, 325, width/2 - 25, 275)
    line(width/2 - 25, 325, width/2 + 25, 275)
    line(width/2 + 25, 275, width/2 + 12.5, 262.5)
    line(width/2 - 25, 275, width/2 - 12.5, 262.5)
    line(width/2, 350, width/2, 270)
    stroke('black')
    tekenSpeler(spelerX, spelerY);
  }
}
