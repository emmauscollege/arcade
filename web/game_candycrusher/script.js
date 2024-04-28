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

const UITLEG = 0;   // uitlegscherm
const SPELENMAKKELIJK = 1;   // moeilijkheidsgraad makkelijk
const SPELENMEDIUM = 2;   // moeilijkheidsgraad medium
const SPELENMOEILIJK = 3;   // moeilijkheidsgraad moeilijk
const GAMEOVER = 4;   // gameover scherm
const OVERWINNING = 5;   // overwinningsscherm
var spelStatus = UITLEG;   // begin van de game

var spelerX = 0; // wordt gezet in resetfunctie
var spelerY = 0; // wordt gezet in resetfunctie

var vijandkogelX = 0;   // x-positie van vijandkogel
var vijandkogelY = 0;   // y-positie van vijandkogel

var vijandX = 50;   // x-positie van vijand
var vijandY = 60;   // y-positie van vijand

var score = 0; // aantal behaalde punten

var speed = 5;  // snelheid van de vijand
var speedVerticaal = 5;

var kogels = []   // array van kogels
var lastkogelDT = Date.now()   // tijd tussen het schieten van kogels

var vijandkogels = []   // array van vijandkogels
var lastkogelDT2 = Date.now()   // tijd tussen het schieten van de vijandkogels

var vijandbeweging = Date.now()   // tijd tussen het veranderen in richting van de vijand horizontaal
var vijandbewegingV = Date.now()   // tijd tussen het veranderen in richting van de vijand verticaal

var beginTijd = 0;   // begintijd van het spel
var gametijdTekst = "";   // tekst voor de tijd van de game 

var bgImg;   // achtergrond plaatje

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

/**
 * reset de game aan het begin
 */
var resetGame = function()
{
    spelerX = 600; 
    spelerY = 500; 

    vijandX = random(100, 1200);  
    vijandY = 60;   

    vijandkogels = [];
    kogels = [];
    beginTijd = Date.now();
    gametijdTekst = "";
};


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
    image(bgImg, 0, 0, width, height)
};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    fill ('black');
    ellipse (x, y, 50, 50);
};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {
    // image(kogelImg, x, y, 10, 10);
    fill ('black');
    ellipse (x, y, 10, 10);
};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  fill("pink");
  ellipse(x, y, 50, 50);
} ;


/**
 * Tekent de vijandkogel
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenvijandKogel = function(x, y) {
    fill('red');
    ellipse (x, y, 10, 10);
}


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function(vijandsnelheid, vijandwild) {
    var randomspeed = random(0, 10)
    
    if (vijandX < 1200 && vijandX > 100 && Date.now() - vijandbeweging > vijandwild) {
        if (randomspeed < 5) {
            speed = vijandsnelheid
        }
        else {
            speed = -vijandsnelheid
        }
        vijandbeweging = Date.now()
    }
    else if (vijandX < 100) {
        speed = vijandsnelheid;
    }
    else if (vijandX > 1200) {
        speed = -vijandsnelheid;
    };

    vijandX = vijandX + speed;
    
    var randomspeed2 = random(0, 10)
    if (vijandY < 300 && vijandY > 50 && Date.now() - vijandbewegingV > 2000) {
        if (randomspeed2 < 5) {
            speedVerticaal = vijandsnelheid
        }
        else {
            speedVerticaal = -vijandsnelheid
        }
        vijandbewegingV = Date.now()
    }
    else if (vijandY < 50) {
        speedVerticaal = vijandsnelheid;
    }
    else if (vijandY > 300) {
        speedVerticaal = -vijandsnelheid;
    };

    vijandY = vijandY + speedVerticaal;
    
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogels = function() {
    if (keyIsDown(32)) {
      //tekenKogel(kogelX = spelerX, kogelY = spelerY)
      
      if(kogels.length == 0 || (Date.now() - lastkogelDT) > 250 ) {
        var kogel = [spelerX, spelerY]
        
        kogels.push(kogel)
        lastkogelDT = Date.now();
      }
    };

    kogels.forEach(
        element => {
            element[1] = element[1] -8    
    });

    kogels.forEach(
        element => {
            tekenKogel(element[0], element[1])
    });
} ;


/**
 * update globale variabelen van de kogel van de vijand
 */
var vijandKogel = function(kogelsnelheid) {
    if (vijandX > 100) {
        if (vijandkogels.length == 0 || (Date.now() - lastkogelDT2 > kogelsnelheid)) {
            var vijandkogel = [vijandX, vijandY]
            vijandkogels.push(vijandkogel)
            lastkogelDT2 = Date.now();
        }
    };

    vijandkogels.forEach(
        element => {
            element[1] = element[1] + 8
    });
    
    vijandkogels.forEach(
        element => {
            tekenvijandKogel(element[0], element[1])
    });
};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
    if (keyIsDown(37) && spelerX > 20) {
        spelerX = spelerX - 6;
    }
    if (keyIsDown(39) && spelerX < 1208) {
        spelerX = spelerX + 6;
    }
    if (keyIsDown(38) && spelerY > 20) {
        spelerY = spelerY - 6;
    }
    if (keyIsDown(40) && spelerY < 648) {
        spelerY = spelerY + 6;
    }
};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {
    for(let index = 0; index < kogels.length; index++)
    {
        var geraakt = checkVijandGeraaktDoorDezeKogel(kogels[index][0], kogels[index][1]);
        if(geraakt)
        { 
            //maak de kogels leeg, zodat het eindscherm niet meerdere keren getoond wordt
            kogels = [];
            return true;
        }
    }
    return false;
};

var checkVijandGeraaktDoorDezeKogel = function(kogelX, kogelY) {
    if (vijandX - kogelX < 45 && vijandX - kogelX > -45 && vijandY - kogelY < 45 && vijandY - kogelY > -45) {
        return true
    ;}
    else {
      return false;
    }
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    for(let index = 0; index < vijandkogels.length; index++)
    {
        var geraakt = checkGeraaktDoorDezeKogel(vijandkogels[index][0], vijandkogels[index][1]);
        if(geraakt)
        { 
            //maak de kogels leeg, zodat het eindscherm niet meerdere keren getoond wordt
            vijandkogels = [];
            return true;
        }
    }
    return false;
}

var checkGeraaktDoorDezeKogel = function(vijandkogelX, vijandkogelY) {
    if (spelerX - vijandkogelX < 38 && spelerX - vijandkogelX > -38 && spelerY - vijandkogelY < 38 && spelerY - vijandkogelY > -38) {
        return true
    ;}
    else {
      return false;
    }
};


/**
 * omrekenen van de millisecondes voor de totale tijd van de game bij overwinning
 */
var gameTijdNaarMillisecTekst = function(gametijdMS) {
  var ms = gametijdMS % 1000;
  gametijdMS = gametijdMS - ms;
  var secs = gametijdMS / 1000;
  
  var overwinningTekst =  "Je hebt het spel gewonnen in "  + secs + " secondes en " + ms + " milisecondes";
  
  return overwinningTekst;
}


/**
 * het laden van het achtergrondplaatje
 */
function preload() {
    // @ts-ignore
    bgImg = loadImage('Afbeeldingen/candyland.jpg') 
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
};


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {

    case UITLEG:
        image(bgImg, 0, 0, width, height);
        fill('white')
        rect(80, 80, width - 2 * 80, height -2 * 80) 
        textSize(30);
        fill(0, 0, 0);
        text('Gebruik de pijltjes toetsen om te bewegen', 400, 150, 700, 400)
        text('Gerbuik de spatie toets om te schieten', 400, 250, 700, 300)
        text('Klik 1 voor moeilijkheidsgraad makkelijk', 400, 350, 700, 500)
        text('Klik 2 voor moeilijkheidsgraad medium', 400, 425, 700, 500)
        text('Klik 3 voor moeilijkheidsgraad moeilijk', 400, 500, 700, 500)

        if (keyIsDown(49)) {
            resetGame();
            spelStatus = SPELENMAKKELIJK;
        };
        if (keyIsDown(50)) {
            resetGame();
            spelStatus = SPELENMEDIUM;
        };
        if (keyIsDown(51)) {
            resetGame();
            spelStatus = SPELENMOEILIJK;
        };

    break;

    case SPELENMAKKELIJK:
        background(20, 10, 20);
        tekenVeld();
        beweegVijand(6, 2000);

        beweegKogels();
        vijandKogel(300);
        beweegSpeler();
        
        if (checkVijandGeraakt()) { 
            spelStatus = OVERWINNING;

        }
        
        if (checkSpelerGeraakt()) {
            spelStatus = GAMEOVER;
        }

        tekenVijand(vijandX, vijandY);
        tekenSpeler(spelerX, spelerY);
        
    break;

    case SPELENMEDIUM:
        background(20, 10, 20);
        tekenVeld();
        beweegVijand(7, 1700);

        beweegKogels();
        vijandKogel(250);
        beweegSpeler();
        
        if (checkVijandGeraakt()) { 
            spelStatus = OVERWINNING;

        }
        
        if (checkSpelerGeraakt()) {
            spelStatus = GAMEOVER;
        }

        tekenVijand(vijandX, vijandY);
        tekenSpeler(spelerX, spelerY);

    break;

    case SPELENMOEILIJK:
        background(20, 10, 20);
        tekenVeld();
        beweegVijand(8, 1200);

        beweegKogels();
        vijandKogel(200);
        beweegSpeler();
        
        if (checkVijandGeraakt()) { 
            spelStatus = OVERWINNING;

        }
        
        if (checkSpelerGeraakt()) {
            spelStatus = GAMEOVER;
        }

        tekenVijand(vijandX, vijandY);
        tekenSpeler(spelerX, spelerY);

    break;

    case GAMEOVER:
        image(bgImg, 0, 0, width, height);
        fill('white')
        rect(80, 80, width - 2 * 80, height -2 * 80) 
        fill(250, 0, 0)
        text('GAMEOVER', 200, 200, 200, 200);
        text('Druk op control om nog een keer te spelen', 200, 300, 400, 600);
      
        //druk op ctrl om verder te gaan
        if (keyIsDown(17)) {
          spelStatus = UITLEG
        };

    break;

    case OVERWINNING:
        var gameTijd = Date.now() - beginTijd;
       
        if(gametijdTekst == "")
        {
            gametijdTekst = gameTijdNaarMillisecTekst(gameTijd);
        }

        image(bgImg, 0, 0, width, height);
        fill('white')
        rect(80, 80, width - 2 * 80, height -2 * 80) 
        fill(0, 200, 200);
        text('YOU DID IT :)', 200, 200, 200, 200);
        text(gametijdTekst, 200, 300, 400, 600);
        text('Druk op control om nog een keer te spelen', 200, 450, 400, 600);

        //druk op ctrl om verder te gaan
        if (keyIsDown(17)) {
            spelStatus = UITLEG
        };

    break;
  }
};

