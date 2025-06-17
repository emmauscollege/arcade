/* Game opdrachtMore actions
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
const uitleg = 3;
const leftMap = 4;
const rightMap = 5;
const downMap = 6;
const gewonnen = 7;



var spelStatus = uitleg;
const w = 87;
const s = 83;
const a = 65;
const d = 68;


var spelerX = 600; // x-positie van speler
var spelerY = 500; // y-positie van speler

// start vijanden
var vijand1X = 600;
var vijand1Y = 100;
var vijand9X = 200;
var vijand9Y = 550;
var vijand10X = 300;
var vijand10Y = 700;


// downMap vijanden
var vijand2X = 400;
var vijand2Y = 20;
var vijand3X = 0;
var vijand3Y = 100;
var vijand4X = 700;
var vijand4Y = 250;

// rightMap vijanden
var vijand5X = 300;
var vijand5Y = 50;
var vijand6X = 600;
var vijand6Y = 700;
var vijand7X = 900;
var vijand7Y = 350;
var vijand8X = 1200;
var vijand8Y = 100;

var aanval = false; //aanval is niet gestart


var pijlen = [
  { x: 0, y: 500 },
  { x: -25, y: 520 },
  { x: -20, y: 540 },
  { x: -20, y: 560 },
  { x: 0, y: 580 },
  { x: 0, y: 100 },
{ x: -10, y: 400},
  { x: 0, y: 300 }
];


var sleutels = 0; // hoevel sleutels zijn er gepakt


var sleutel1Gepakt = false; // sleutel 1 is niet gepakt
var sleutel2Gepakt = false; // sleutel 2 is niet gepakt
var sleutel3Gepakt = false; // sleutel 3 is niet gepakt

var sleutel1X = 10;
var sleutel1Y = 350;
var sleutel2X = 600;
var sleutel2Y = 676;
var sleutel3X = 1200;
var sleutel3Y = 50;


var orangeDoor = true; // oranje deur kan open
var blueDoor = false; // blauwe deur niet open
var yellowDoor = false; // gele deur niet open
var limeDoor = false; //limoen deur is niet open


var greenDoor1X = 1240; 
var greenDoor1Y = 300;
var greenDoor2X = 600;
var greenDoor2Y = 0;
var greenDoor3X = 0;
var greenDoor3Y = 300;


var limeX = 600;
var limeY = 0;
var yellowX = 1240;
var yellowY = 300;
var blueX = 600;
var blueY = 680;
var orangeX = 0;
var orangeY = 300;


var randTouch1 = false; // onderrand niet geraakt 
var randTouch2 = true; // onderrand geraakt
var randTouch3 = false;//onderrand niet geraakt
var randTouch4 = true; // onderrand geraakt


var health = 100;  // health van speler

var amongus; //plaatje
var arrow; // plaatje
var goldenKey; //plaatje
var king; //plaatje
var freddy; //plaatje
var derp; // plaatje
var trophy; //plaatje
var achtergrond; // achtergrondafbeelding

// variabelen voor het startscherm animatie
var startTextX = 100; // huidige x-positie van de starttekst
var startTextY = 100; // huidige y-positie van de starttekst
var startTextVX = 3;  // snelheid in x-richting
var startTextVY = 3;  // snelheid in y-richting
var startBlinkTimer = 0;  // tijdstip waarop de tekst knippert
var startBlinkVisible = true; // of de tekst zichtbaar is
var startColors = ["green", "blue", "red", "yellow"]; // kleuren voor achtergrond
var startColorIndex = 0; // huidige index van de achtergrondkleur
var startColorTimer = 0;  // tijdstip waarop de achtergrondkleur wisselt





var jojo = new Audio('Audio/frojo.mp3');
var keySound = new Audio('Audio/discord.mp3');
var doorSound = new Audio('Audio/door.mp3');
var vineBoom = new Audio('Audio/vine-boom.mp3');
var laugh = new Audio('Audio/hehehehaw.mp3');
var honk = new Audio('Audio/honk.mp3');
var bell = new Audio('Audio/bell.mp3');
var suspense = new Audio('Audio/suspense.mp3');
var music = new Audio('Audio/music.mp3');

var sleutelMeldingTimer = 0; // tijdstip waarop melding start
var sleutelMeldingActief = false; // of melding wordt getoond

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler


if (keyIsDown(a) === true) {
    spelerX -=  6;
  }

  if (keyIsDown(d) === true) {
    spelerX +=  6;
  }

  if (keyIsDown(w) === true) {
    spelerY -= 6;
  }

  if (keyIsDown(s) === true) {
    spelerY += 6;
  }

if (spelerX <= 0) {
  spelerX = spelerX + 6
}

if (spelerX >= 1280) {
  spelerX = spelerX - 6
}

if (spelerY >= 720) {
  spelerY = spelerY - 6
}

if (spelerY <= 0) {
  spelerY = spelerY + 6
}
            



  // vijand
 if (spelerX - vijand1X >= 50) {
  vijand1X = vijand1X + 4;
}

 if (spelerX - vijand1X <= -50) {
 vijand1X = vijand1X - 4;

 }

 if (spelerY - vijand1Y >= 50) {
vijand1Y = vijand1Y + 4;

 }
  
 if (spelerY - vijand1Y <= -50) {
vijand1Y = vijand1Y - 4;

 }   
 

  // vijand 9
          
if (aanval === true) { 

if (spelerX - vijand9X >= 50) {
  vijand9X = vijand9X + 3.5;
}

 if (spelerX - vijand9X <= -50) {
 vijand9X = vijand9X - 3.5;

 }

 if (spelerY - vijand9Y >= 50) {
vijand9Y = vijand9Y + 3.5;

 }
  
 if (spelerY - vijand9Y <= -50) {
vijand9Y = vijand9Y - 3.5;

 }   



//vijand 10
 if (spelerX - vijand10X >= 125) {
  vijand10X = vijand10X + 3;
}

 if (spelerX - vijand10X <= -80) {
 vijand10X = vijand10X - 3;
 }

 if (spelerY - vijand10Y >=  80) {
vijand10Y = vijand10Y + 3;
 }
  
 if (spelerY - vijand10Y <= -80) {
vijand10Y = vijand10Y - 3;
 } 



}









};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand
if (spelerX - vijand1X < 50 &&
  spelerX - vijand1X > -50 &&
  spelerY - vijand1Y < 50 &&
  spelerY - vijand1Y > -50
) {vineBoom.play(); health -= 100};
  

if (aanval === true) {
// vijand 9
if (spelerX - vijand9X < 50 &&
  spelerX - vijand9X > -70 &&
  spelerY - vijand9Y < 100 &&
  spelerY - vijand9Y > -72
) {honk.play(); health -= 100};

if (spelerX - vijand10X < 220 &&
  spelerX - vijand10X > - 80 &&
  spelerY - vijand10Y < 220 &&
  spelerY - vijand10Y > - 80
) {laugh.play(); health -= 100};


}






// oranje deur

if (orangeDoor === true) {
if (spelerX < orangeX + 55 &&
    spelerX + 55 > orangeX &&
    spelerY < orangeY + 120 &&
    spelerY + 20 > orangeY) {
  spelStatus = leftMap;
  spelerX = 1200; // Reset speler positie in nieuw level
  spelerY = 350;
      doorSound.play();
}
};

//blauwe deur
if (blueDoor === true) {
if (spelerX < blueX + 125 &&
    spelerX + 20 > blueX &&
    spelerY < blueY + 120 &&
    spelerY + 20 > blueY) {
  spelStatus = downMap;
  spelerX = 600; // Reset speler positie in nieuw level
  spelerY = 0;
      doorSound.play();
}
};


//gele deur
if (yellowDoor === true) {
if (spelerX < yellowX + 50 &&
    spelerX + 50 > yellowX &&
    spelerY < yellowY + 120 &&
    spelerY + 20 > yellowY) {
  spelStatus = rightMap;
  spelerX = 0; // Reset speler positie in nieuw level
  spelerY = 350;
      doorSound.play();
}
};

//limoen deur
if (limeDoor === true) {

  if (spelerX < limeX + 125 &&
    spelerX + 20 > limeX &&
    spelerY < limeY + 120 &&
    spelerY + 20 > limeY) {
  spelStatus = gewonnen;
spelerX = 600;
spelerY = 680;



  jojo.play();  
  doorSound.play();
};

}


};





/**
 * Tekent spelscherm
 */

var tekenAlles = function() {
  // achtergrond
image(achtergrond, 0, 0, width, height);



  // vijand
  image(amongus, vijand1X - 55, vijand1Y - 55, 100, 100);


// aanval
  if (aanval === true) {
image(freddy, vijand9X - 60, vijand9Y - 70, 100, 150);
image(king, vijand10X - 55, vijand10Y - 55, 250, 250);
  }




  

  // speler
 
image(derp, spelerX - 25, spelerY - 25, 50, 50);



  // deuren

if (sleutel3Gepakt === true) {
fill("lime");
rect(limeX, limeY, 100, 50);
}


if (sleutel2Gepakt === true) {
fill("yellow");
rect(yellowX, yellowY, 50, 100);
}

if (sleutel1Gepakt === true) {
fill("blue");
rect(blueX, blueY, 100, 50); }

fill("orange");
rect(orangeX, orangeY, 50, 100);




};








var beweegAllesLeftMap = function () {

if (keyIsDown(a) === true) {
    spelerX -= 6;
  }

  if (keyIsDown(d) === true) {
    spelerX += 6;
  }

  if (keyIsDown(w) === true) {
    spelerY -= 6;
  }

  if (keyIsDown(s) === true) {
    spelerY += 6;
  }

if (spelerX <= 0) {
  spelerX = spelerX + 6
}

if (spelerX >= 1280) {
  spelerX = spelerX - 6
}

if (spelerY >= 720) {
  spelerY = spelerY - 6
}

if (spelerY <= 0) {
  spelerY = spelerY + 6
}


for (var pijl of pijlen) {
  pijl.x += 10;
  if (pijl.x > 1380) {
    pijl.x = 0;
    pijl.y = random(0, 720);
  }
}


};


var verwerkBotsingLeftMap = function() {
  // botsing speler tegen vijand
  for (var pijl of pijlen) {
  if (spelerX - pijl.x < 75 &&
      spelerX - pijl.x > -75 &&
      spelerY - pijl.y < 52 &&
      spelerY - pijl.y > -52) {
    vineBoom.play();
    health -= 100;
    
    } 
} 

 if (spelerX - sleutel1X < 65 &&
      spelerX - sleutel1X > -65 &&
      spelerY - sleutel1Y < 75 &&
      spelerY - sleutel1Y > -75) 
      {
        keySound.play();
        sleutel1Gepakt = true;
        blueDoor = true; //blauwe deur is open
        sleutel1X = -100; // verplaatst sleutel uit beeld
        sleutelMeldingActief = true;
        sleutelMeldingTimer = millis();
      }

};



var greenDoor1Botsing = function() {


if (spelerX < greenDoor1X + 50 &&
    spelerX + 50 > greenDoor1X &&
    spelerY < greenDoor1Y + 120 &&
    spelerY + 20 > greenDoor1Y) {
  spelStatus = SPELEN;
spelerX = 80;
spelerY = 400;
  vijand1X = 600;
  vijand1Y = 250;
      orangeDoor = false; // oranje deur is dicht

  doorSound.play();
};


};





  

var tekenAllesLeftMap = function() {
  // achtergrond
image(achtergrond, 0, 0, width, height);



  // vijand


for (var pijl of pijlen) {
  for (var offset = -70; offset <= -20; offset += 10) {
    image(arrow, pijl.x - 50, pijl.y + offset, 100, 100);
  }
}


  // speler
 
image(derp, spelerX - 25, spelerY - 25, 50, 50);


  // sleutel1
image(goldenKey, sleutel1X - 20, sleutel1Y - 55, 100, 100);


//deur
if (sleutel1Gepakt === true) {
  greenDoor1Botsing();
  fill("green");
  rect(greenDoor1X, greenDoor1Y, 50, 100);
  sleutels = 1;
}


};




 var beweegAllesDownMap = function() {

  //speler
if (keyIsDown(a) === true) {
    spelerX -= 6;
  }

  if (keyIsDown(d) === true) {
    spelerX += 6;
  }

  if (keyIsDown(w) === true) {
    spelerY -= 6;
  }

  if (keyIsDown(s) === true) {
    spelerY += 6;
  }

if (spelerX <= 0) {
  spelerX = spelerX + 6
}

if (spelerX >= 1280) {
  spelerX = spelerX - 6
}

if (spelerY >= 720) {
  spelerY = spelerY - 6
}

if (spelerY <= 0) {
  spelerY = spelerY + 6
}





//vijand 2

if (sleutel2Gepakt === true) {
 if (spelerX - vijand2X >= 125) {
  vijand2X = vijand2X + 3;
}

 if (spelerX - vijand2X <= -80) {
 vijand2X = vijand2X - 3;
 }

 if (spelerY - vijand2Y >=  80) {
vijand2Y = vijand2Y + 3;
 }
  
 if (spelerY - vijand2Y <= -80) {
vijand2Y = vijand2Y - 3;
 } 
 
//vijand 3
 if (spelerX - vijand3X >= 125) {
  vijand3X = vijand3X + 3;
}

 if (spelerX - vijand3X <= -80) {
 vijand3X = vijand3X - 3;
 }

 if (spelerY - vijand3Y >=  80) {
vijand3Y = vijand3Y + 3;
 }
  
 if (spelerY - vijand3Y <= -80) {
vijand3Y = vijand3Y - 3;
 } 


//vijand 4

 if (spelerX - vijand4X >= 125) {
  vijand4X = vijand4X + 3;
}

 if (spelerX - vijand4X <= -80) {
 vijand4X = vijand4X - 3;
 }

 if (spelerY - vijand4Y >=  80) {
vijand4Y = vijand4Y + 3;
 }
  
 if (spelerY - vijand4Y <= -80) {
vijand4Y = vijand4Y - 3;
 } 









}


 };





var verwerkBotsingDownMap = function() {


if (spelerX - sleutel2X < 65 &&
      spelerX - sleutel2X > -65 &&
      spelerY - sleutel2Y < 75 &&
      spelerY - sleutel2Y > -75) 
      {
       keySound.play();
        laugh.play();
        sleutel2Gepakt = true;
        sleutel2Y = -100; // verplaatst sleutel uit beeld
        sleutelMeldingActief = true;
        sleutelMeldingTimer = millis();

      }

if (sleutel2Gepakt === true) {
if (spelerX - vijand2X < 220 &&
  spelerX - vijand2X > - 80 &&
  spelerY - vijand2Y < 220 &&
  spelerY - vijand2Y > - 80
) {laugh.play(); health -= 100};


if (spelerX - vijand3X < 220 &&
  spelerX - vijand3X > - 80 &&
  spelerY - vijand3Y < 220 &&
  spelerY - vijand3Y > - 80
) {laugh.play(); health -= 100};


if (spelerX - vijand4X < 220 &&
  spelerX - vijand4X > - 80 &&
  spelerY - vijand4Y < 220 &&
  spelerY - vijand4Y > - 80
) {laugh.play(); health -= 100};

}


}; 






var greenDoor2Botsing = function() {

if (spelerX < greenDoor2X + 125 &&
    spelerX + 20 > greenDoor2X &&
    spelerY < greenDoor2Y + 120 &&
    spelerY + 20 > greenDoor2Y) {
  spelStatus = SPELEN;
spelerX = blueX;
spelerY = blueY;
  vijand1X = 600;
  vijand1Y = 250;
      orangeDoor = false; // oranje deur is dicht
      blueDoor = false; //blauwe deur is dicht
      yellowDoor = true; // gele deur is open
  doorSound.play();
};


};






var tekenAllesDownMap = function () {

 // achtergrond
image(achtergrond, 0, 0, width, height);



  // vijand
 if (sleutel2Gepakt === true) {

image(king, vijand2X - 55, vijand2Y - 55, 250, 250);
image(king, vijand3X - 55, vijand3Y - 55, 250, 250);
image(king, vijand4X - 55, vijand4Y - 55, 250, 250);

} 




  // speler
 
image(derp, spelerX - 25, spelerY - 25, 50, 50);

 // sleutel2
image(goldenKey, sleutel2X - 20, sleutel2Y - 55, 100, 100);


//deur
if (sleutel2Gepakt === true) {
  greenDoor2Botsing();
  fill("green");
  rect(greenDoor2X, greenDoor2Y, 100, 50);
  sleutels = 2;
}


};












var beweegAllesRightMap = function() {


  //speler
if (keyIsDown(a) === true) {
    spelerX -= 6;
  }

  if (keyIsDown(d) === true) {
    spelerX += 6;
  }

  if (keyIsDown(w) === true) {
    spelerY -= 6;
  }

  if (keyIsDown(s) === true) {
    spelerY += 6;
  }

if (spelerX <= 0) {
  spelerX = spelerX + 6
}

if (spelerX >= 1280) {
  spelerX = spelerX - 6
}

if (spelerY >= 720) {
  spelerY = spelerY - 6
}

if (spelerY <= 0) {
  spelerY = spelerY + 6
}



  // vijand 5
  if (vijand5Y <= 50) { 
  randTouch1 = false;

}
 
 if   (randTouch1 === false) {
vijand5Y = vijand5Y + 6
 }


if (vijand5Y >= 700) {
randTouch1 = true; 
}

if (randTouch1 === true) {
vijand5Y = vijand5Y - 6;
}







  // vijand 6
  if (vijand6Y <= 50) { 
  randTouch2 = false;

}
 
 if   (randTouch2 === false) {
vijand6Y = vijand6Y + 9
 }


if (vijand6Y >= 700) {
randTouch2 = true; 
}

if (randTouch2 === true) {
vijand6Y = vijand6Y - 9;
}






  // vijand 7
  if (vijand7Y <= 50) { 
  randTouch3 = false;

}
 
 if   (randTouch3 === false) {
vijand7Y = vijand7Y + 15
 }


if (vijand7Y >= 700) {
randTouch3 = true; 
}

if (randTouch3 === true) {
vijand7Y = vijand7Y - 15;
}





// vijand 8
  if (vijand8Y <= 50) { 
  randTouch4 = false;

}
 
 if   (randTouch4 === false) {
vijand8Y = vijand8Y + 40
 }


if (vijand8Y >= 700) {
randTouch4 = true; 
}

if (randTouch4 === true) {
vijand8Y = vijand8Y - 40;
}





};











var verwerkBotsingRightMap = function() {

if (spelerX - sleutel3X < 65 &&
      spelerX - sleutel3X > -65 &&
      spelerY - sleutel3Y < 75 &&
      spelerY - sleutel3Y > -75) 
      {
        keySound.play();
        bell.play();
        sleutel3Gepakt = true;
        sleutel3X = -100; // verplaatst sleutel uit beeld
        sleutelMeldingActief = true;
        sleutelMeldingTimer = millis();
      }

      
// vijand 5
if (spelerX - vijand5X < 50 &&
  spelerX - vijand5X > -70 &&
  spelerY - vijand5Y < 100 &&
  spelerY - vijand5Y > -72
) {honk.play(); health -= 100};

// vijand 6
if (spelerX - vijand6X < 50 &&
  spelerX - vijand6X > -70 &&
  spelerY - vijand6Y < 100 &&
  spelerY - vijand6Y > -72
) {honk.play(); health -= 100};


// vijand 7
if (spelerX - vijand7X < 50 &&
  spelerX - vijand7X > -70 &&
  spelerY - vijand7Y < 100 &&
  spelerY - vijand7Y > -72
) {honk.play(); health -= 100};


// vijand 8
if (spelerX - vijand8X < 50 &&
  spelerX - vijand8X > -70 &&
  spelerY - vijand8Y < 100 &&
  spelerY - vijand8Y > -72
) {honk.play(); health -= 100};



};





var greenDoor3Botsing = function() {

if (spelerX < greenDoor3X + 80 &&
    spelerX + 80 > greenDoor3X &&
    spelerY < greenDoor3Y + 120 &&
    spelerY + 20 > greenDoor3Y) {
  spelStatus = SPELEN;
spelerX = 1200;
spelerY = 300;
  vijand1X = 400;
  vijand1Y = 500;
      yellowDoor = false; // gele deur is dicht
      limeDoor = true; //limoen deur is open
     suspense.play();
  doorSound.play();
 aanval = true; //aanval is gestart
}


};











var tekenAllesRightMap = function() {


 // achtergrond
 image(achtergrond, 0, 0, width, height);



  // vijanden
 image(freddy, vijand5X - 60, vijand5Y - 70, 100, 150);
image(freddy, vijand6X - 60, vijand6Y - 70, 100, 150);
image(freddy, vijand7X - 60, vijand7Y - 70, 100, 150);
image(freddy, vijand8X - 60, vijand8Y - 70, 100, 150);




  // speler
 
image(derp, spelerX - 25, spelerY - 25, 50, 50);

 // sleutel3
image(goldenKey, sleutel3X - 20, sleutel3Y - 55, 100, 100);


//deur
if (sleutel3Gepakt === true) {
  greenDoor3Botsing();
  fill("green");
  rect(greenDoor3X, greenDoor3Y, 50, 100);
 sleutels = 3; // alle sleutels zijn gepakt
}



};




















 var tekenGewonnen = function(){

//achtergrond
fill("lime");
rect(0, 0, 1280, 720);


   
  // speler
 
image(derp, spelerX - 25, spelerY - 25, 50, 50);

//troffee
image(trophy, 500, 360, 200, 200);


 };

var toonSleutelMelding = function() {
  if (sleutelMeldingActief) {
    if (millis() - sleutelMeldingTimer < 2000) {
      textSize(40);
      fill("white");
      text("sleutel gevonden, ga door!", 300, 100);
    } else {
      sleutelMeldingActief = false;
    }
  }
};














/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */








/**
 * preload
 * de code in deze functie wordt één keer uitgevoerd voor setup
 * hier plaatje laden
 */

function preload() {
  //amongus = loadImage('Plaatjes/amongus-red.png');
  amongus = loadImage('Plaatjes/ghost.png');
  arrow = loadImage('Plaatjes/arrow.png');
  goldenKey = loadImage('Plaatjes/goldenKey.png');
  king = loadImage('Plaatjes/hehehehaw.png');
  freddy = loadImage('Plaatjes/freddy-plush.png');
  derp = loadImage('Plaatjes/prutser.png');
  trophy = loadImage('Plaatjes/trophy.png');
  achtergrond = loadImage('Plaatjes/achtergrond.jpg');
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
  
};








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
    textSize(30);
    fill("white");
    text("sleutels: " + sleutels, 100, 50);
    music.play();
    music.volume = 0.25; // volume muziek
    if (health <= 0) {
      spelStatus = GAMEOVER;
    }
  }


  if (spelStatus === leftMap) {
   beweegAllesLeftMap();
    verwerkBotsingLeftMap();
   tekenAllesLeftMap();
   textSize(30);
  fill("white");
text("sleutels: " + sleutels, 100, 50);
music.play();  
  music.volume = 0.1; // volume muziek
if (health <= 0) {
      spelStatus = GAMEOVER;
    }
  }


if (spelStatus === downMap) {
   beweegAllesDownMap();
    verwerkBotsingDownMap();
   tekenAllesDownMap();
   textSize(30);
  fill("white");
text("sleutels: " + sleutels, 100, 50);
music.play();    
music.volume = 0.1; // volume muziek
if (health <= 0) {
      spelStatus = GAMEOVER;
    }
  }


if (spelStatus === rightMap) {
  beweegAllesRightMap();
  verwerkBotsingRightMap();
  tekenAllesRightMap();
  textSize(30);
  fill("white");
text("sleutels: " + sleutels, 100, 50);
music.play(); 
music.volume = 0.1; // volume muziek    
if (health <= 0) {
      spelStatus = GAMEOVER;
    }
  }



if (spelStatus === gewonnen) {
  music.pause();
  music.currentTime = 0; // reset muziek
  tekenGewonnen();
  fill("black");
  textSize(100);
  text("JE HEBT GEWONNNNENN!", 0, 250);  
  textSize(50);
  text("druk spatie om opnieuw te spelen", 300, 335);
  if(keyIsDown(32)){
    spelStatus = uitleg;
  }

}








 if (spelStatus === GAMEOVER) {
    // teken game-over scherm
  
  music.pause();
   music.currentTime = 0; // reset muziek
    textSize(50);
  fill("white");
  text("GAME OVER, klik spatie", 100, 100);
  if(keyIsDown(32)){
    spelStatus = uitleg;
  }
}


if (spelStatus === uitleg) {
  // verander achtergrondkleur elke 2 seconden
  if (millis() - startColorTimer > 2000) {
    startColorIndex = (startColorIndex + 1) % startColors.length;
    startColorTimer = millis();
  }
  fill(startColors[startColorIndex]);
  rect(0, 0, 1280, 720);

  // beweeg en laat de achtergrondtekst knipperen
  startTextX += startTextVX;
  startTextY += startTextVY;
  if (startTextX < 0 || startTextX > width) {
    startTextVX = random(-5, 5);
    startTextX = constrain(startTextX, 0, width);
  }
  if (startTextY < 0 || startTextY > height) {
    startTextVY = random(-5, 5);
    startTextY = constrain(startTextY, 0, height);
  }
  if (millis() - startBlinkTimer > 500) {
    startBlinkVisible = !startBlinkVisible;
    startBlinkTimer = millis();
  }
  if (startBlinkVisible) {
    textSize(80);
    fill(255, 255, 255, 150);
    textAlign(CENTER, CENTER);
    text("Apollo & Maxim", startTextX, startTextY);
  }

  textAlign(LEFT, BASELINE);
  textSize(40);
  fill("white");
  text("Druk enter en beweeg meteen, vind de sleutels om te ontsnappen.", 70, 350);
  text("Gebruik ASWD om te bewegen, je hebt maar 1 leven.", 70, 400);
 if(keyIsDown(13)) {

spelerX = 600;
  spelerY = 500;

  // start vijand
  vijand1X = 600;
  vijand1Y = 100;

 vijand9X = 200;
 vijand9Y = 550;

vijand10X = 300;
vijand10Y = 700;



//leftMap pijlen
for (var pijl of pijlen) {
pijl.x = 0;
    pijl.y = random(0, 720);
     pijlen = [
   { x: 0, y: 500 },
  { x: -25, y: 520 },
  { x: -20, y: 540 },
  { x: -20, y: 560 },
  { x: 0, y: 580 },
  { x: 0, y: 100 },
  { x: -10, y: 400},
  { x: 0, y: 300 },
  
]; }

 // downMap vijanden
  vijand2X = 400;
 vijand2Y = 20;

 vijand3X = 0;
 vijand3Y = 100;

 vijand4X = 700;
 vijand4Y = 250;

 // rightMap vijanden
 vijand5X = 300;
vijand5Y = 50;

 vijand6X = 600;
 vijand6Y = 700;

 vijand7X = 900;
 vijand7Y = 350;

 vijand8X = 1200;
 vijand8Y = 100;



 aanval = false; //aanval start niet

 sleutel1Gepakt = false; // sleutel 1 is niet gepakt
sleutel2Gepakt = false; // sleutel 2 is niet gepakt
 sleutel3Gepakt = false; // sleutel 3 is niet gepakt 

sleutels = 0; // reset sleutels

 sleutel1X = 10;
  sleutel1Y = 350;

sleutel2X = 600;
  sleutel2Y = 676;

 sleutel3X = 1200;
 sleutel3Y = 50;


randTouch1 = false; // onderrand niet geraakt 
randTouch2 = true; // onderrand geraakt
randTouch3 = false;//onderrand niet geraakt
randTouch4 = true; // onderrand geraakt



orangeDoor = true; // oranje deur kan open
blueDoor = false; //blauwe deur kan niet open
yellowDoor = false; // gele deur niet open
limeDoor = false; //limoen deur is niet open




health = 100;
  spelStatus = SPELEN;

 }
  toonSleutelMelding();
 }
} 
