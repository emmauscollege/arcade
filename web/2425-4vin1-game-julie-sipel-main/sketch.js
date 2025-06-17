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
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 8;
const WIN = 3; 
var spelStatus = SPELEN;

var muntjes = [
  { x: 800, y: 365, gepakt: false },
  { x: 700, y: 123, gepakt: false },
  { x: 300, y: 546, gepakt: false },
  { x: 350, y: 170, gepakt: false },
  { x: 100, y: 364, gepakt: false },
  { x: 857, y: 674, gepakt: false },
  { x: 987, y: 465, gepakt: false },
  { x: 534, y: 300, gepakt: false },
  { x: 1100, y: 189, gepakt: false }, 
];
var score = 0;
var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler
var health = 100;  // health van speler

var vijandX = 600;
var vijandY = 500;
var konijn;
var vogel;
var tekenGameOverScherm = function() {
  background(184,15,10); // Zwart achtergrond voor game over scherm

  // Tekst: Game Over
  textSize(50);
  fill("white");
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 50);  // Spel is afgelopen

  // Score tonen
  textSize(30);
  text("Score: " + score, width / 2, height / 2);

  // Herstart prompt
  textSize(20);
  text("Ververs de pagina om opnieuw te spelen", width / 2, height / 2 + 50);
};

var tekenGewonnenScherm = function() {
  background(184,15,10  ); // roze achtergrond voor gewonnen scherm

  // Tekst: Gewonnen!
  textSize(50);
  fill("white");
  textAlign(CENTER, CENTER);
  text("Gewonnen!", width / 2, height / 2 - 50);

  // Score tonen
  textSize(30);
  text("Score: " + score, width / 2, height / 2);

  // Herstart prompt
  textSize(20);
  text("Ververs de pagina om opnieuw te spelen", width / 2, height / 2 + 50); 
};


/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
  if  (keyIsDown (65)) {
    spelerX = spelerX -3;
  } 
  if (keyIsDown (68)) { 
    spelerX = spelerX +3;
  }
  if (keyIsDown (87)) {
    spelerY = spelerY -3;
  }
  if (keyIsDown (83)) {
    spelerY = spelerY +3;
  }
  // vijand
  if  (keyIsDown (37)) {
    vijandX = vijandX -3;
  } 
  if (keyIsDown (39)) { 
    vijandX = vijandX +3;
  }
  if (keyIsDown (38)) {
    vijandY = vijandY -3;
  }
  if (keyIsDown (40)) {
    vijandY = vijandY +3;
  }

  // kogel
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  for (let i = 0; i < muntjes.length; i++) {
    let munt = muntjes[i];
    // Bereken de afstand tussen speler en munt
    let afstand = dist(spelerX, spelerY, munt.x, munt.y);
    
    // Als de afstand kleiner is dan de straal van de speler + munt, is er een botsing
    if (!munt.gepakt && afstand < 25 + 15) { // 25 is de straal van de speler (omtrek), 15 is de straal van de munt
      munt.gepakt = true;  // Markeer het muntje als gepakt
      score += 1;  // Verhoog de score
      console.log("Munt gepakt! Score:", score);
    }
  }
   // Check of alle muntjes zijn gepakt
  let alleMuntjesGepakt = muntjes.every(munt => munt.gepakt);
  if (alleMuntjesGepakt) {
    spelStatus = WIN; // Zet de status naar WIN als alle muntjes gepakt zijn
  } 
  // botsing speler tegen vijand
  let botsing =
    spelerX > vijandX - 65 &&
    spelerX < vijandX + 65 &&
    spelerY > vijandY - 50 &&
    spelerY < vijandY + 50
    
    if (botsing) {
      console.log ("botsing");
      health -=1;

      }
    };

  // botsing kogel tegen vijand

  // update punten en health



/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond


  background(107, 142, 35);

  // vijand
  // fill("red")
  // rect(vijandX - 25, vijandY - 25, 50, 50);
  // fill("black");
  // ellipse(vijandX, vijandY, 10, 10);
  image(vogel, vijandX - 25, vijandY - 25, 50, 50);

  // kogel

  // speler
  // fill("white");
  // rect(spelerX - 25, spelerY - 25, 50, 50);
  // fill("black");
  // ellipse(spelerX, spelerY, 10, 10);
  image(konijn, spelerX - 25, spelerY - 25, 50, 50);

  // punten en health
  fill ("white");
  textSize(24);
  text("health: " + health, 30, 30);
  for (let i = 0; i < muntjes.length; i++){
    let munt = muntjes [i]; 
    if (!munt.gepakt) {
      // Tekenen als een munt
      fill ("gold");
      ellipse(munt.x, munt.y, 30, 30);
      
    }
  }

};
function preload() {
  konijn = loadImage("./images/konijn.png");
  vogel = loadImage("./images/vogel.png");
}

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */

function setup()   {
  createCanvas (1280, 720); 
  background ('green'); 
}


  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
 

  // Kleur de achtergrond blauw, zodat je het kunt zien


  


  

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
  
    if (health <= 0) {
      spelStatus = GAMEOVER;
    }
    }
  else if (spelStatus === GAMEOVER) {
    tekenGameOverScherm();

    // Herstarten als de speler op ENTER drukt
    if (keyIsDown(13)) { // ENTER toets
      herstartSpel();
    }
    }
  else if (spelStatus === WIN) {
    tekenGewonnenScherm();

  }

  if (spelStatus === GAMEOVER) {
   
      fill("white");
      text("game over, birdie wins, 300, 300");
      textSize (30);
     
      if (keyIsDown (32)) { 
        muntjes.forEach(munt => munt.gepakt = false);
        var herstartSpel = function () {
       score = 0; 
        health = 100;
        spelerX = 600;
        spelerY = 600;
        vijandX = 800;
        vijandY = 600; 
      spelStatus = SPELEN;
     }
    
  }
}
if (spelStatus === UITLEG) {
  console.log("uitleg");
  background ("black");
  textSize(40);
  fill("white");
  text("click on ENTER to play again, 250, 300");
  if (keyIsDown (13)) { //enter
    spelerX = 400; 
  spelStatus = SPELEN; }
} } 
