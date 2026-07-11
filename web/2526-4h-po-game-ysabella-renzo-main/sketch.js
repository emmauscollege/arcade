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
// 
const WIN=3;
const INTRO = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = INTRO;

var balX = [500, 550, 600, 200, 300, 780, 900, 800, 1050, 550, 350];
var balY = [450, 450, 450, 560, 560, 500, 350, 200, 100, 250, 100];
var balGepakt = [false, false, false, false, false];

var appel1X = [250, 500, 700, 900, 1100, 250, 80,300,700, 500, 750, 500 ];
var appel1Y = [560, 500, 400, 300, 560, 400, 300, 200, 200, 300, 560, 560];
var appel1Gepakt = [false, false, false, false, false];




var groteAppelX = [130];
var groteAppelY = [170];
var groteAppelGepakt = [false];

var score=0;
var spelerX = 300;
var spelerY = 600;
var health = 100;
var speed = 4;

var vijandX = 1200;
var vijandY = 600;
var vijandLeeft = true;
var vijand2Leeft = true;
var vijand3Leeft = true;
var vijand2X=1750;
var richting2=18;
var vijand1X = 1500;  
var richting=2
var richting1=2
var imgAppel; 
var imgMaan;
var imgSter;
var opGrond = false;
var vlinderX = [450, 650, 850];
var vlinderY = [470, 370, 270];
var vlinderRichting = [2, -2, 2];
var vlinderLeeft = [true, true, true];
var imgNewVlinder
var imgOudVlinder
var imgVlinder
var level = 1;

var vijand1Y = 600;
var vijand2Y = 600;
var vijand3Y = 600;

var baasX = 900;
var baasY = 150;
var baasLeeft = true;
var baasLevens = 3;
var baasRichting = 4;

/* ********************************************* */
/* beweging                                     */
/* ********************************************* */

var val = 0;
var gravity = 0.5;
var grond = 600;

var trapX = [450, 650, 850, 200, 450, 30, 250, 650];
var trapY = [550, 450, 350, 450, 350, 350, 250, 250];

var trap2X = [750 , 880, 750, 1000, 500 , 300, 100];
var trap2Y = [550, 400, 250, 160, 300, 150, 250];

var trap3X = [600, 800, 600, 400];
var trap3Y = [550, 450, 350, 250 ];

function preload() {
  imgAppel = loadImage ('afbeeldingen/appel.png')
  imgMaan=loadImage('afbeeldingen/Unknown.jpeg')
  imgNewVlinder=loadImage('afbeeldingen/newVlinder.avif')
 imgVlinder = loadImage('afbeeldingen/Vlinder.png')
 imgSter = loadImage('afbeeldingen/ster.png')
}


var beweegAlles = function() {

  if (spelerX < 0) {
  spelerX = 0;
}
  

  // springen
  if (keyIsDown(32) && opGrond === true && val===0) {
    val = -12;
  }

  opGrond = false;

  // zwaartekracht
  val += gravity;
  spelerY += val;

  // grond check
  if (spelerY > grond) {
    spelerY = grond;
    val = 0;
    opGrond= true;
  }

  // links/rechts
  if (keyIsDown(65)) spelerX -= speed;
  if (keyIsDown(68)) spelerX += speed;
};

//botsing
var verwerkBotsing = function() {


  /* -------- VIJAND 1 -------- */
  if (level === 1) {
for (var i = 0; i < vlinderX.length; i++) {

  if (vlinderLeeft[i]) {

    let raakt =
      spelerX + 25 > vlinderX[i] &&
      spelerX - 25 < vlinderX[i] + 60 &&
      spelerY + 25 > vlinderY[i] &&
      spelerY - 25 < vlinderY[i] + 60;

    if (raakt) {

      if (spelerY < vlinderY[i] && val > 0) {
        vlinderLeeft[i] = false;
        score += 200;
        val = -10;
      } else {
        spelStatus = GAMEOVER;
      }
    }
  }
}
  }
  if (vijandLeeft) {

    let raaktVijand =
      spelerX > vijandX - 25 &&
      spelerX < vijandX + 75 &&
      spelerY > vijandY - 50 &&
      spelerY < vijandY + 50;

    if (raaktVijand) {

      if (spelerY < vijandY && val > 0) {
        vijandLeeft = false;
        val = -8;

      
        score+=100;

      } else {
        spelStatus = GAMEOVER;
      }
     
      
  }
}
if (level === 3 && baasLeeft) {

  let raaktBaas =
    spelerX + 25 > baasX &&
    spelerX - 25 < baasX + 120 &&
    spelerY + 25 > baasY &&
    spelerY - 25 < baasY + 80;

  if (raaktBaas) {

    if (spelerY < baasY && val > 0) {

      baasLevens--;
      val = -10;

      if (baasLevens <= 0) {
        baasLeeft = false;
        score += 500;
      }

    } else {
      spelStatus = GAMEOVER;
    }
  }
}
if (level === 3) {

  for (var i = 0; i < trap3X.length; i++) {

    var links = spelerX - 25;
    var rechts = spelerX + 25;
    var onder = spelerY + 25;

    if (
      onder > trap3Y[i] &&
      onder < trap3Y[i] + 20 &&
      rechts > trap3X[i] &&
      links < trap3X[i] + 80 &&
      val >= 0
    ) {
      spelerY = trap3Y[i] - 25;
      val = 0;
      opGrond = true;
    }
  }

}
  

  //VIJAND 2

  if (vijand2Leeft) {

    let raaktVijand2 =
      spelerX > vijand1X - 25 &&
      spelerX < vijand1X + 75 &&
      spelerY > vijandY - 50 &&
      spelerY < vijandY + 50;

    if (raaktVijand2) {

      if (spelerY < vijandY && val > 0) {
        vijand2Leeft = false;
        val = -8;
        score+=100;
      } else {
        spelStatus = GAMEOVER;
      }
    }
  }
   if (vijand3Leeft) {

    let raaktVijand3 =
      spelerX > vijand2X - 25 &&
      spelerX < vijand2X + 75 &&
      spelerY > vijandY - 50 &&
      spelerY < vijandY + 50;

    if (raaktVijand3) {

      if (spelerY < vijandY && val > 0) {
        vijand3Leeft = false;
        val = -8;
        score+=100;
      } else {
        spelStatus = GAMEOVER;
      }
    }
  }
};




/* ********************************************* */
/* tekenen                                      */
/* ********************************************* */
var tekenAlles = function() {
 function tekenWolk(x, y) {
  fill("white");
  noStroke();

  ellipse(x, y, 60, 40);
  ellipse(x + 30, y + 10, 70, 50);
  ellipse(x - 30, y + 10, 70, 50);
  ellipse(x, y + 20, 80, 45);
}

function tekenSter(x, y, grootte) {
  image(imgSter, x, y, grootte, grootte);
}
  if (spelStatus !== SPELEN) return;
 
if (spelStatus === SPELEN && spelerX >= 1250) {

  if (level === 3) {

    if (baasLeeft === false) {
      spelStatus = WIN;
    } else {
      // terug naar begin van level 3
      spelerX = 100;
      spelerY = 600;
    }

  } else {

    level = level + 1;

    spelerX = 100;
    spelerY = 600;

    vijandLeeft = true;
    vijand2Leeft = true;
    vijand3Leeft = true;

    vijandX = 1200;
    vijandY = 600;
    vijand1X = 1500;
  }
}
 

  if (level === 1) {
    background('SkyBlue');
    fill("green");
rect(0, 620, 1280, 100);

  tekenWolk(200, 120);
  tekenWolk(500, 80);
  tekenWolk(900, 150);

fill("brown");

for (var i = 0; i < trapX.length; i++) {
  rect(trapX[i], trapY[i], 150, 20);
}

for (var i = 0; i < trapX.length; i++) {

  var links = spelerX - 25;
  var rechts = spelerX + 25;
  var onder = spelerY + 25;

  // bovenop platform landen
  if (
    onder > trapY[i] &&
    onder < trapY[i] + 20 &&
    rechts > trapX[i] &&
    links < trapX[i] + 150 &&
    val >= 0
  ) {
    spelerY = trapY[i] - 25;
    val = 0;
    opGrond= true;
  }
}  
 if (level === 1) {
for (var i = 0; i < vlinderX.length; i++) {

  if (vlinderLeeft[i]) {

    vlinderX[i] += vlinderRichting[i];

    // rechte lijn (geen wobble)
    image(imgVlinder, vlinderX[i], vlinderY[i], 60, 60);

    // bounce links/rechts (Mario style)
    if (vlinderX[i] > 1100) vlinderRichting[i] = -2;
    if (vlinderX[i] < 200) vlinderRichting[i] = 2;
  }
}
 }
for (var i = 0; i < appel1X.length; i++) {
  if (!appel1Gepakt[i]) {
    image(imgAppel, appel1X[i], appel1Y[i], 50, 50);
  }

  if (
    !appel1Gepakt[i] &&
    spelerX > appel1X[i] &&
    spelerX < appel1X[i] + 50 &&
    spelerY > appel1Y[i] &&
    spelerY < appel1Y[i] + 50
  ) {
    appel1Gepakt[i] = true;
    score += 10;
  }
}

    if (vijandLeeft) {
      vijandLeeft=true;
      vijandX -=richting ;
      fill("pink");
      rect(vijandX, vijandY-25, 50, 50);
    }
  }


  if (level === 2) {
  background('SkyBlue');

    tekenWolk(150, 100);
  tekenWolk(600, 130);
  tekenWolk(1000, 90);

  for (var i = 0; i < groteAppelX.length; i++) {
  if (!groteAppelGepakt[i]) {
    image(imgAppel, groteAppelX[i], groteAppelY[i], 80, 80);
  }

  if (
    !groteAppelGepakt[i] &&
    spelerX > groteAppelX[i] &&
    spelerX < groteAppelX[i] + 80 &&
    spelerY > groteAppelY[i] &&
    spelerY < groteAppelY[i] + 80
  ) {
    groteAppelGepakt[i] = true;
    score += 50;
  }
}

fill("brown");
rect(500,500,200,50);
rect(650,550,50,75);

fill("brown");

for (var i = 0; i < trap2X.length; i++) {
  rect(trap2X[i], trap2Y[i], 150, 20);
}

for(var i = 0; i < balX.length; i++) {
  if (!balGepakt[i]) {
    image(imgAppel, balX[i], balY[i], 50, 50);
  }

  if (
    !balGepakt[i] &&
    spelerX > balX[i]  &&
    spelerX < balX[i] + 50 &&
    spelerY > balY[i]  &&
    spelerY < balY[i] + 50
  ) {
    balGepakt[i] = true;
    score += 10;
  }
}
for (var i = 0; i < trap2X.length; i++) {

  var links = spelerX - 25;
  var rechts = spelerX + 25;
  var onder = spelerY + 25;

  if (
    onder > trap2Y[i] &&
    onder < trap2Y[i] + 20 &&
    rechts > trap2X[i] &&
    links < trap2X[i] + 150 &&
    val >= 0
  ) {
    spelerY = trap2Y[i] - 25;
    val = 0;
    opGrond = true;
  }
}



  // grond
  fill("green");
  rect(0, 620, 1280, 100);

  /* ===== BLOK COLLISION ===== */

  // speler hitbox
  var links = spelerX - 25;
  var rechts = spelerX + 25;
  var boven = spelerY - 25;
  var onder = spelerY + 25;

  // blok hitbox
  var blokLinks = 500;
  var blokRechts = 700;
  var blokBoven = 500;
  var blokOnder = 550;

  // bovenop blok staan
  if (
    onder > blokBoven &&
    onder < blokBoven + 20 &&
    rechts > blokLinks &&
    links < blokRechts &&
    val >= 0
  ) {
    spelerY = blokBoven - 25;
    val = 0;
    opGrond = true;
  }

  // links tegen blok
  if (
    rechts > blokLinks &&
    links < blokLinks &&
    onder > blokBoven &&
    boven < blokOnder
  ) {
    spelerX = blokLinks - 25;
  }

  // rechts tegen blok
  if (
    links < blokRechts &&
    rechts > blokRechts &&
    onder > blokBoven &&
    boven < blokOnder
  ) {
    spelerX = blokRechts + 25;
  }

  /* ===== VIJAND 1 ===== */

  if (vijandLeeft) {
    vijandX += richting;

    if (vijandX >= 1200) {
      richting = -2;
    }

    if (vijandX <= 700) {
      richting = 2;
    }

    fill("pink");
    rect(vijandX, vijandY - 25, 50, 50);
  }

  /* ===== VIJAND 2 ===== */

  if (vijand2Leeft) {
    vijand1X += richting1;

    if (vijand1X >= 1200) {
      richting1 = -2;
    }

    if (vijand1X <= 700) {
      richting1 = 2;
    }

    fill("pink");
    rect(vijand1X, vijandY - 25, 50, 50);
  }
}
if (level === 3) {

  if (richting === 2) richting = 10;
  if (richting1 === 2) richting1 = 13;

 
  
  background('Blue');

  tekenSter(100, 80, 30);
tekenSter(250, 150, 20);
tekenSter(450, 60, 25);
tekenSter(700, 120, 35);
tekenSter(950, 90, 20);
tekenSter(1150, 170, 30);

  tekenWolk(200, 120);
tekenWolk(600, 80);
tekenWolk(900, 150);

  fill("brown");

for (var i = 0; i < trap3X.length; i++) {
  rect(trap3X[i], trap3Y[i], 80, 20);
}



if (baasLeeft) {
  baasX += baasRichting;

  if (baasX > 1100) baasRichting = -4;
  if (baasX < 400) baasRichting = 4;

  image(imgVlinder, baasX, baasY, 120, 120);
}
if (baasLeeft) {
  fill("white");
  textSize(20);
  text("Baas HP: " + baasLevens, 1050, 30);
}



  // grond
  fill("DarkGreen");
  rect(0, 620, 1280, 100);

  /* ===== BLOK COLLISION ===== */

  // speler hitbox
  var links = spelerX - 25;
  var rechts = spelerX + 25;
  var boven = spelerY - 25;
  var onder = spelerY + 25;

  // blok hitbox
 

  // bovenop blok staan
  
  // links tegen blok
  if (
    rechts > blokLinks &&
    links < blokLinks &&
    onder > blokBoven &&
    boven < blokOnder
  ) {
    spelerX = blokLinks - 25;
  }

  // rechts tegen blok
  if (
    links < blokRechts &&
    rechts > blokRechts &&
    onder > blokBoven &&
    boven < blokOnder
  ) {
    spelerX = blokRechts + 25;
  }

  /* ===== VIJAND 1 ===== */

  if (vijandLeeft) {
    vijandX += richting;

    if (vijandX >= 1200) {
      richting = -10;
    }

    if (vijandX <= 100) {
      richting = 10;
    }

    fill("black");
    rect(vijandX, vijandY - 25, 50, 50);
  }

  /* ===== VIJAND 2 ===== */

  if (vijand2Leeft) {
    vijand1X += richting1;

    if (vijand1X >= 1200) {
      richting1 = -13;
    }

    if (vijand1X <= 100) {
      richting1 = 13;
    }

    fill("black");
    rect(vijand1X, vijandY-25, 50, 50);
  }
  if (vijand3Leeft) {
    vijand2X += richting2;

    if (vijand2X >= 1200) {
      richting2 = -18;
    }

    if (vijand2X <= 100) {
      richting2 = 18;
    }

    fill("black");
    rect(vijand2X, vijandY-25, 50, 50);
  }
}


  /* ---------- SPELER ---------- */
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);

  fill("white");
  ellipse(spelerX, spelerY, 10, 10);
}

/* ********************************************* */
/* setup & draw                                 */
/* ********************************************* */
function setup() {
  createCanvas(1280, 720);
}

function draw() {

  if (spelStatus === WIN) {
  background("#ffcfed");

  fill("#d50091");
  textSize(60);
  textAlign(CENTER, CENTER);
  text("GEFELICITEERD JE HEBT GEWONNEN!", 640, 300);

  tekenWolk(150, 100);
  tekenWolk(450, 80);
  tekenWolk(750, 140);
  tekenWolk(1050, 100);

  textSize(20);
  text("spatie om opnieuw te starten", 640, 380);

  image(imgVlinder, 200, 150, 80, 80);
image(imgVlinder, 950, 180, 80, 80);
image(imgVlinder, 350, 80, 60, 60);

textSize(25);

if (score >= 1500) {
  text("Perfect gespeeld! ⭐⭐⭐", width / 2, 420);
} else if (score >= 750) {
  text("Geweldig gedaan! ⭐⭐", width / 2, 420);
} else {
  text("Goed gespeeld! ⭐", width / 2, 420);
}
}

  

  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();

      fill("white");
  textSize(20);
  text("Score: " + score, 55, 30);

  if (level === 1) {
  text("Doel: pak alle appels 🍎", 130, 55);
  text("Doel: Versla de vlinders", 125, 85);
}

if (level === 2) {
  text("Doel: pak de grote appel ", 130, 55);
}

  if (level === 3) {
  if (baasLeeft) {
    text("Versla de baas!", 105, 55);
  } else {
    text("Ontsnap!", 55, 55);
  }
}
 if (health <= 0) {
      spelStatus = GAMEOVER;
    }
  }

  if (spelStatus === GAMEOVER) {
    background("black");
    fill("white");
    textSize(50);
    text("GAME OVER :(", 650, 350);
    text("Druk spatie om opnieuw te spelen", 650, 400);
  } 

  function tekenWolk(x, y) {
  noStroke();
  fill("#FFFFFF");

  ellipse(x, y, 60, 40);
  ellipse(x + 30, y + 10, 70, 50);
  ellipse(x - 30, y + 10, 70, 50);
  ellipse(x, y + 20, 80, 45);
}



  if (spelStatus === INTRO) {
  // teken een startscherm
  noStroke();
  background('#ebc8d9');

  tekenWolk(150, 120);
tekenWolk(450, 80);
tekenWolk(750, 140);
tekenWolk(1050, 100);

  
 fill("green");
rect(0, 620, 1280, 100);
fill("white");
  rect(275, 575, 50, 50);

  fill("white");
  ellipse(300, spelerY, 10, 10);
  fill('#C2185B');
  textAlign(CENTER, CENTER);
  textSize(60);
  text('Vlinder Escape ', width / 2, height / 2 - 40);
  textSize(20);
  text('Druk op SPATIE om te starten', width / 2, height / 2 + 20);

  fill("white");
textSize(20);
text("🍎 Pak appels voor punten", width/2, 430);
text("🦋 Spring op vijanden om ze te verslaan", width/2, 460);
text(" Bereik en versla de baas 🏅", width/2, 490);

image(imgAppel,600, 540, 100,100)
image(imgVlinder, 100, 100, 100, 100);

 
   
}
};

function keyPressed() {
  if (spelStatus === INTRO && key === ' ') {
    spelStatus = SPELEN;
  }


  if (spelStatus === GAMEOVER && key === ' ') {

    spelerX = 300;
    spelerY = 600;

    level = 1;
    score = 0;

   balGepakt = [false, false, false, false, false];
  appel1Gepakt = [false, false, false, false, false];
  groteAppelGepakt = [false];

  baasLeeft = true;
baasLevens = 3;
baasX = 900;

   vlinderLeeft = [true, true, true];
vlinderX = [450, 650, 850];
vlinderY = [470, 370, 270];

    vijandLeeft = true;
    vijand2Leeft = true;

    vijand3Leeft = true;
vijand2X = 1750;
richting2 = 18;

    vijandX = 1200;
    vijandY = 600;
    vijand1X = 1500;

    richting = 2;     // snelheid vijand 1
richting1 = 2;    // snelheid vijand 2
richting2 = 18;   // snelheid vijand 3

    spelStatus = SPELEN;
  }

  if (spelStatus === WIN && key === ' ') {
  spelStatus = INTRO;
  level= 1;

  spelerX = 300;
  spelerY = 600;

  // vijanden resetten
  vijandLeeft = true;
  vijand2Leeft = true;
  vijand3Leeft = true;

  vijandX = 1200;
  vijandY = 600;
  vijand1X = 1500;
  vijand2X = 1750;

  richting = 2;
  richting1 = 2;
  richting2 = 18;

  // appels resetten
  balGepakt = [false, false, false, false, false];
  appel1Gepakt = [false, false, false, false, false];
  groteAppelGepakt = [false];

  baasLeeft = true;
baasLevens = 3;
baasX = 900;

  // vlinders resetten
  vlinderLeeft = [true, true, true];
  vlinderX = [450, 650, 850];
  vlinderY = [470, 370, 270];
 

  score = 0;
}
  };
