/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"
if (!localStorage.getItem('highScore')){
  localStorage.setItem('highScore', 0)
}

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;                                    // dit is de constante voor wanneer je echt aan het spelen bent
const GAMEOVER = 2;                                  // constante voor als je af bent
const UITLEG = 3;                                    // constante voor als je begint aan de spel
const AFTELLEN = 4;
var spelStatus = UITLEG;                             // legt uit dat als je begint moet de spelstatus uitleg zijn

//declareren van knoppen op toetsenbord
const SPACE = 32; 
const ENTER = 13;
const BACKSPACE = 8;
const W_BUTTON = 87;
const ARROW_UP = 38;

var spelerX = 600;                                   // x-positie van speler
var spelerY = 300;                                   // y-positie van speler
var spelerY2 = 250;                                  // y-positie van speler 2

/******************** */
var spelerSpeed = 0;                                 // snelheid van speler 1
var spelerSpeed2 = 0;                                // snelheid van speler 2
var maxSpeed = 6;                                    // maximale snelheid die een speler kan bereiken
var acceleration = {up:.6,down:.4};                  // de versnelling die je gebruikt om het spel realistischer te maken                         

//de declaratie van de afbeeldingen
var zeester;
var star;
var hamburger;
var kogelvis;
var cookie;
var saturnus;
var afval1;
var afval2;
var afval3;
var ruimte1;
var ruimte2;
var ruimte3;
var eten1;
var eten2;
var eten3;
var gameover;
var wasd;
var pijltjes;
var sterretje;

//arrays van de vijanden
var food = [];
var afvallen = [];
var ruimtes = [];
var koraal = [];                                      //1 element van koraal bestaat uit [x-positie, y van onderste, y van bovenste, is ie al langs het 'detectiepunt' geweest (true of false)]
var randoImg;                                          // zorgt voor willekeurige vijanden
var afval;

// de achtergronden
var bg;
var bg2;
var bg3;
var startbg;
var orangebg;
var blackbg;
var orangebg;

//variabele van functies in een bepaalde situatie                                           
var snelheid = 5;                                      //snelheid van vijanden
var minSnelheid = 5;                                   //maximale snelheid van speler

//de variabeles van de scores
var score = 0;
var highscore = 0;
var startkoraal = 1400;                              // startpositie van de vijand
var spelers = 1;                                     // geeft aan hoeveel spelers er zijn
var winnaar = undefined;                             // als je met 2 spelers speelt, laat het zien wie er gewonnen heeft
var song;                                            // variabele voor muziek

//variabele voor de 3 werelden
var water;
var space;
var fastfood;           
var gekozenWereld = 0;                                       // geeft aan welke wereld er is gekozen
var aftellen = 0;                                     // is voor de aftelling in het begin

// zorgt ervoor dat het geselecteerde blokje roze wordt
var kleur = [255, 255, 255];

/******************** */

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Checkt botsingen
 * Zorgt voor beweging van de speler
 * Updatet globale variabelen zoals punten
 */
var doeAlles = function() {
  // zorgt voor de beweging en snelheid van speler2
  if(spelers === 2){
    if(keyIsDown(87) && spelerY2 >= 0){
      if((spelerSpeed2 - acceleration.up >= -maxSpeed)){
        spelerSpeed2 -= acceleration.up;
      }
    } else if(spelStatus === SPELEN){
      if((spelerSpeed2 + acceleration.down <= maxSpeed)){
        spelerSpeed2 += acceleration.down;
      }
    }
    spelerY2 += spelerSpeed2;
    //checkt of speler2 de vijand raakt
    for(var i = 0; i < koraal.length; i++){
      var stronk = koraal[i];
      if (spelStatus === SPELEN && spelerX >= stronk[0] && spelerX <= stronk[0] + 100 && spelerY2 >= stronk[1] + 15 && spelerY2 <= stronk[1] + 175
          ||
          spelStatus === SPELEN && spelerX >= stronk[0] && spelerX <= stronk[0] + 100 && spelerY2 >= -stronk[2] + 15 && spelerY2 <= -stronk[2] + 175
          ||
          spelStatus === SPELEN && spelerX + 50 >= stronk[0] && spelerX + 50 <= stronk[0] + 100 && spelerY2 + 50 >= stronk[1] + 15 && spelerY2 + 50 <= stronk[1] + 175
          ||
          spelStatus === SPELEN && spelerX + 50 >= stronk[0] && spelerX + 50 <= stronk[0] + 100 && spelerY2 + 50 >= -stronk[2] + 15 && spelerY2 + 50 <= -stronk[2] + 175
          ||
          spelStatus === SPELEN && spelerY2 + 50 >= 720
          ){
        spelStatus = GAMEOVER;
        snelheid = 5;
        spelerY2 = 200;
        spelerY = 250;
        //kijkt wie de winnaar is als speler2 afgaat
        if(gekozenWereld === 2){
          winnaar = 'zeester';
        };
        if(gekozenWereld === 1){
          winnaar = 'ster';
        };
        if(gekozenWereld === 3){
          winnaar = 'hamburger';
        };
        resetKoraal();                                                        //zorgt ervoor dat het spel gereset wordt zodra je afgaat
        break;
      }
    };
  };
  
  //doet hetzelfde als speler2 maar dan voor speler1
  if(keyIsDown(38) && spelerY >= 0 ){
    if((spelerSpeed - acceleration.up >= -maxSpeed)){
      spelerSpeed -= acceleration.up;
      
    }
  } else if(spelStatus === SPELEN){
    if((spelerSpeed + acceleration.down <= maxSpeed)){
      spelerSpeed += acceleration.down;
      
    }
  }
  spelerY += spelerSpeed;
    
  //checkt of speler1 geraakt wordt
  for(var i = 0; i < koraal.length; i++){
    
    var stronk = koraal[i];
    if (spelStatus === SPELEN && spelerX >= stronk[0] && spelerX <= stronk[0] + 100 && spelerY >= stronk[1] + 15 && spelerY <= stronk[1] + 175
        ||
        spelStatus === SPELEN && spelerX >= stronk[0] && spelerX <= stronk[0] + 100 && spelerY >= -stronk[2] + 15 && spelerY <= -stronk[2] + 175
        ||
        spelStatus === SPELEN && spelerX + 50 >= stronk[0] && spelerX + 50 <= stronk[0] + 100 && spelerY + 50 >= stronk[1] + 15 && spelerY + 50 <= stronk[1] + 175
        ||
        spelStatus === SPELEN && spelerX + 50 >= stronk[0] && spelerX + 50 <= stronk[0] + 100 && spelerY + 50 >= -stronk[2] + 15 && spelerY + 50 <= -stronk[2] + 175
        ||
        spelStatus === SPELEN && spelerY + 50 >= 720
        ){
      spelStatus = GAMEOVER;
      snelheid = 5;
      spelerY = 200;
      spelerY2 = 250;
      //bepaalt wie de winnaar is als speler1 afgaat
      if(gekozenWereld === 2){
        winnaar = 'kogelvis';
      };
      if(gekozenWereld === 1){
        winnaar = 'saturnus';
      };
      if(gekozenWereld === 3){
        winnaar = 'cookie';
      };
      resetKoraal();                                                                              //zorgt ervoor dat het koraal gereset wordt
      break;
    }
    //zorgt ervoor dat de vijand van rechts naar links beweegt
    if(spelStatus === SPELEN ){
      koraal[i][0] -= snelheid 
    }
    //zorgt ervoor dat er een nieuwe vijand spawnt als de eerste vijand langs een detectiepunt komt
    if(koraal[i][0] < width/1.3 && !koraal[i][3] ){
      koraal[i][3] = true
      score ++;
    }
  }
  //bepaalt de snelheid van de vijand op basis van het aantal frames
  if(spelStatus === SPELEN){
    snelheid = frameCount / 400
    if (snelheid < minSnelheid){
      snelheid = minSnelheid
    }
  }
  //zorgt ervoor dat de vijand niet meer beweegt als je niet aan het spelen bent
  if(spelStatus === GAMEOVER || spelStatus === UITLEG){
    snelheid = 5;
    frameCount = 0;
    
  }
 
  //slaat een lokale highscore op als je af gaat
  if (spelStatus === GAMEOVER){
    if(score > localStorage.getItem('highScore')){
      localStorage.setItem('highScore' , score)
    }
  };
};
//de functie voor het aanroepen van de vijand
var spawnKoraal = function(){
  var randomNumber = random(-170, 250);                                                     //zorgt voor een willekeurige positie van de vijand
  koraal.push([startkoraal, randomNumber + 420, -randomNumber, false, random(afvallen), random(afvallen), random(ruimtes), random(ruimtes), random(food), random(food)]);
}
//de functie voor het stoppen van de vijand als je niet aan het spelen bent
var resetKoraal = function(){
  koraal = [[1800, 520, 0, false]]
  koraal.pop();
}

//functie die wordt aangeroepen wanneer de muis wordt ingedrukt
function mousePressed() {
  //zorgt ervoor dat je de muziek aan en uit kan zetten
  if(spelStatus === SPELEN || spelStatus === GAMEOVER){
    if (song.isPlaying()) {
      song.stop();
    } else {
      song.play();
    }
  };
  //hierdoor kun je een thema kiezen
  if(spelStatus === UITLEG && mouseX  >= 470 && mouseX <= 545 && mouseY >= 360 && mouseY <= 435){
    gekozenWereld = 1;
    kleur = [0, 255, 255];
  }
  //var kleur = [255, 255, 255]
  if(spelStatus === UITLEG && mouseX  >= 575 && mouseX <= 650 && mouseY >= 360 && mouseY <= 435){
    gekozenWereld = 2;
    kleur = [255, 0, 255];
  }
  if(spelStatus === UITLEG && mouseX  >= 680 && mouseX <= 755 && mouseY >= 360 && mouseY <= 435){
    gekozenWereld = 3;
    kleur = [255, 255, 0];
  }
}

function tekenAlles(){
  // achtergrond op basis van het gekozen thema
  if(gekozenWereld === 2){
    background(bg);
  };
  if(gekozenWereld === 1){
    background(bg2);
  };
  if(gekozenWereld === 3){
    background(bg3);
  };
  
  //bepaalt per thema hoe de speler er uitziet
  if(gekozenWereld === 2){
    image(zeester,spelerX,spelerY, 60, 60);
    if(spelers === 2){
      image(kogelvis, spelerX, spelerY2, 60, 60);
    }
  };
  if(gekozenWereld === 1){
    image(star,spelerX,spelerY, 60, 60);
    if(spelers === 2){
      image(saturnus, spelerX, spelerY2, 60, 60);
    }
  };
  if(gekozenWereld === 3){
    image(hamburger, spelerX, spelerY, 60, 60)
    if(spelers === 2){
      image(cookie, spelerX, spelerY2, 60, 60);
    }
  }
  
  if(spelStatus === SPELEN){
    for(var i = 0; i < koraal.length; i++){
      var stronk = koraal[i];
      if(stronk[3] === false && stronk[0] < 1000){
        spawnKoraal();
        koraal[i][3] = true;
        score++;
        highscore++;
      }

      if(gekozenWereld === 2){
        image(stronk[4], stronk[0], stronk[1], 100, 200)
        scale(1,-1)
        image(stronk[5], stronk[0], stronk[2] - 200, 100, 200)
        scale(1,-1)
      };
      if(gekozenWereld === 1){
        image(stronk[6], stronk[0], stronk[1], 100, 200)
        scale(1,-1)
        image(stronk[7], stronk[0], stronk[2] - 200, 100, 200)
        scale(1,-1)
      }
      if(gekozenWereld === 3){
        image(stronk[8], stronk[0], stronk[1], 100, 200)
        scale(1,-1)
        image(stronk[9], stronk[0], stronk[2] - 200, 100, 200)
        scale(1,-1)
      }
    }
  
  
    fill(255,120,0)
    image(orangebg, 17.5, 5, 100, 35)
    image(orangebg, 1085, 5, 150, 35)
    fill(0,0,0)
    textSize(20);
    textFont("Oswald")
    text('Score = ' + score, 25, 30)
    text('Highscore = ' + localStorage.getItem('highScore'), 1100, 30)
  
  }
}
function spelerKeuze(){
  frameCount = 0;
  if (key === '1' && gekozenWereld != 0){
    spelers = 1;
    spelStatus = AFTELLEN;
    
  }
  if(key === '2' && gekozenWereld != 0){
    spelers = 2;
    spelStatus = AFTELLEN;
    
  }
}
/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */
function preload() {
  bg = loadImage('afbeeldingen/achtergrond3.jpeg');
  bg2 = loadImage('afbeeldingen/spacebackground.jpg');
  bg3 = loadImage('afbeeldingen/restaurant5.jpg');
  startbg = loadImage('afbeeldingen/achtergrondbegin.jpg');
  orangebg = loadImage('afbeeldingen/starbg.png');
  blackbg = loadImage('afbeeldingen/blbg.jpeg');
  orangebg = loadImage('afbeeldingen/orange.jpeg');
  zeester = loadImage('afbeeldingen/Zeester.png');
  star = loadImage('afbeeldingen/star3.png');
  hamburger = loadImage('afbeeldingen/hamburger.png');
  kogelvis = loadImage('afbeeldingen/kogelvis.png');
  saturnus = loadImage('afbeeldingen/saturnus4.png');
  cookie = loadImage('afbeeldingen/cookie.webp');
  afval1 = loadImage('afbeeldingen/koraal1.png');
  afval2 = loadImage('afbeeldingen/koraal2.png');
  afval3 = loadImage('afbeeldingen/koraal3.png');
  afvallen = [afval1, afval2, afval3];
  ruimte1 = loadImage('afbeeldingen/alien.png');
  ruimte2 = loadImage('afbeeldingen/rocket3.png');
  ruimte3 = loadImage('afbeeldingen/rocket.webp');
  ruimtes = [ruimte1, ruimte2, ruimte3];
  eten1 = loadImage('afbeeldingen/milkshake4.png');
  eten2 = loadImage('afbeeldingen/cola.webp');
  eten3 = loadImage('afbeeldingen/frietjes.png');
  food = [eten1, eten2, eten3];
  gameover = loadImage('afbeeldingen/gameover.png');
  song = loadSound('muziekje.mp3');
  space = loadImage('afbeeldingen/spaceicon.png');
  water = loadImage('afbeeldingen/snorkel.avif');
  fastfood = loadImage('afbeeldingen/fficon.png');
  wasd = loadImage('afbeeldingen/wasd.png');
  pijltjes = loadImage('afbeeldingen/arrows.png');
  sterretje = loadImage('afbeeldingen/sterretje.png');
  // logo = loadImage('afbeeldingen/logo.png');
}
/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
  background(startbg);
  randoImg = random(afvallen)
  angleMode(DEGREES);
   spawnKoraal();
  
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */

function draw() {
  
  if (spelStatus === UITLEG) {
    spelerKeuze();
    fill(255,120,0);
    image(orangebg, 300, 150, 600, 400);
    //rect(400,150,400, 400);
    fill(0, 100, 0);
    aftellen = 3;
    rect(410, 460, 380, 80)
    fill(255, kleur[0], 255);
    rect(457.5, 365, 80, 80)
    fill(255, kleur[1], 255);
    rect(562.5, 365, 80, 80)
    fill(255, kleur[2], 255);
    rect(667.5, 365, 80, 80)
    fill(0,0,0);
    textSize(30);
    textFont("Arial");
    
    text("Welkom bij Flappy Star!", 442.5, 200);
    textSize(17);
    text("-Druk op pijltje omhoog om omhoog te gaan.", 420, 250);
    text("-Speler 2 gebruikt de toets w om omhoog te gaan", 420, 275)
    text("-Gebruik backspace om de highscore te resetten", 420, 300);
    text("-Klik op de muis om de muziek aan of uit te zetten", 420, 325);
    fill(255, 255, 255)
    text("Druk op 1 om alleen te spelen", 480, 490);
    text("Druk op 2 om met twee spelers te spelen", 450, 520)
    fill(0,0,0)
    text('Kies eerst een thema voor je begint:', 465, 352)
    image(space, 460,367.5, 75, 75)
    image(water, 565, 367.5, 75, 75)
    image(fastfood, 670, 367.5, 75, 75)
  }
  if(spelStatus === AFTELLEN){
    background(orangebg)
    fill(0,0,0)
    textSize(200);
    text(ceil(aftellen), 600, 400)
    aftellen -= 0.025
    if(aftellen <= 0){
      spelStatus = SPELEN;
    }
    if(gekozenWereld === 2){
      if(spelers === 2){
        image(zeester,250,300, 80, 80);
        image(pijltjes,250, 200, 80, 80);
        fill(0,0,0);
        textSize(20);
        text("speler 1", 250, 295);
        image(kogelvis, 1000, 300, 80, 80);
        image(wasd, 1000, 200, 80, 80);
        text("speler 2", 1000, 295);
      }
    };
    if(gekozenWereld === 1){
      if(spelers === 2){
        image(star,250,300, 80, 80);
        image(pijltjes,250, 200, 80, 80);
        textSize(20);
        text("speler 1", 250, 295);
        image(saturnus,1000,300, 80, 80);
        image(wasd, 1000, 200, 80, 80);
        text("speler 2", 1000, 295);
      }
    };
    if(gekozenWereld === 3){
      if(spelers === 2){
        image(hamburger, 250,300, 80, 80)
        image(pijltjes,250, 200, 80, 80);
        textSize(20);
        text("speler 1", 250, 295);
        image(cookie, 1000,300, 80,80);
        image(wasd, 1000, 200, 80, 80);
        text("speler 2", 1000, 295);
      }
    }
  }
  
  if (spelStatus === SPELEN) {
    doeAlles();
    tekenAlles();
    if (keyIsDown(8)){
      localStorage.setItem('highScore', 0)
    }
    
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    //fill(255, 120, 0);
    //rect(350, 200, 500, 300);
    background(startbg);
    image(gameover, 350, 200, 500, 300);
    fill(255, 255, 255);
    textFont('Oswald')
    textSize(30);
    fill(255, 255, 255);
    textFont('Courier New')
    textSize(25)
    if(spelers === 2){
      text(winnaar + ' heeft gewonnen!', 430, 100, 600, 25)
    }
    text('druk op enter om opnieuw te spelen', 340, 535, 600, 25)
    text('Je score is '+ score, 495, 150, 300, 25)
    if (keyIsDown(13)) {
      setup();
      spelStatus = UITLEG;
      score = 0;
      frameCount = 0;
    }
    
  }
  
}

