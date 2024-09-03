///<reference path="p5.global-mode.d.ts" />
"use strict"

// variabelen voor het managen van de spelStatus
const SPELEN = 1;
const GAMEOVER = 2;
const PAUSE = 3;
var spelStatus = SPELEN;

var pickupSysteem = function() { // pickupsysteem

  // oppakken lightsaber
  if (speler.x > 610 && speler.x < 665 && speler.y === grond && canvasStatus === 2 &&  (keyIsDown(E)) && lightsaberShown > 0) { 
    
     attack = true; // na het oppaken van de lightsaber kan je attacken
    lightsaberShown--; // de lightsaber verdwijnt van het scherm

    
      item.play(); // oppak geluid wordt hier gespeeld
        item.volume = 0.8;

  }
}

 /**
 * Tekent spelscherm
 */
var tekenAlles = function() { 

// tekenen van de canvassen
  // achtergrond bij canvas 1
  if (canvasStatus === 1) { // eerste canvas
   grond = 640;
  muziek.play(); // main theme van de game 
  muziek.volume = 0.3;
    for(var j = 0; j < grondX1.length; j++) { // tekenen van de grond
      image(imgKaas, grondX1[j], 640, 80, 80);
    }
   
    image(imgShip,  shipX, shipY, 200, 150); // de spaceship
    
    for ( var i = 0; i < coin.can1x.length; i++) { // tekenen en oppakken van de coins
     
      if (coin.pickedUp1[i] > 0) {
      image(imgCoin,coin.can1x[i],coin.can1y[i],coin.width,coin.height)
      
      if (speler.x  + 30> coin.can1x[i] && speler.x < coin.can1x[i] + coin.width && speler.y - speler.height <= coin.can1y[i] && speler.y > coin.can1y[i])  {
        amountCoins += 1;
        coin.pickedUp1[i]  -=1
        coinSound.play();
       }
    }
  }
  
  }

  if (canvasStatus === 2) { // canvas 2
grond = 640; 
    muziek.play();
    muziek.volume = 0.3;
    for ( var i = 0; i < coin.can2x.length; i++) { // tekenen en oppaken van de coins
      
      if (coin.pickedUp2[i] > 0) {
      image(imgCoin,coin.can2x[i],coin.can2y[i],coin.width,coin.height)
      
      if (speler.x  + 30> coin.can2x[i] && speler.x < coin.can2x[i] + coin.width && speler.y - speler.height <= coin.can2y[i] && speler.y > coin.can2y[i])  {
        amountCoins += 1;
        coin.pickedUp2[i]  -=1
        coinSound.play();
       }
    }
  }
    for (var i = 0; i < platform2X.length; i++) { // tekenen en collision van de platformen

      image(imgPlatform, platform2X[i], platform2Y[i], platformWidth, platformHeight );
  
      if (speler.x + 25>= platform2X[i] && speler.x -30 <= platform2X[i] + platformWidth && speler.y - 10 <= platform2Y[i]) {
        grond = platform2Y[i];
        
      }  

   
      }
     
    for(var h = 0; h < grondX2.length; h++) { // tekenen  van de grond
      image(imgKaas, grondX2[h], 640, 80, 80);
      
    
    }

    if (speler.x> 320 && speler.y === 640) { // je gaat gelijk dood als je de lava aanraakt en speler.x wordt naar het respwan punt gezet
      
      health = 0;
      speler.x = 50; 
      speler.y = 640;
     }

    //lava
    for ( var i = 0; i < lava.x2[i]; i++) { // tekenen van de lava
    image (gifLava, lava.x2[i],lava.y, lava.width, lava.height);
    }
    
    
    // tempel
    image(imgTempel,480,230,320,320) // tekenen van de tempel
  }


  if (canvasStatus === 3) { // level 3
    grond = 640;
    muziek.play(); // muziek afspelen
    muziek.volume = 0.3;
    for(var h = 0; h < grondX2.length; h++) { // tekenen van de grond
      image(imgKaas, grondX2[h], 640, 80, 80);
    }
    for ( var i = 0; i < coin.can3x.length; i++) { // tekenen en oppakken van de coins
     
      if (coin.pickedUp3[i] > 0) {
      image(imgCoin,coin.can3x[i],coin.can3y[i],coin.width,coin.height)
      
      if (speler.x  + 30> coin.can3x[i] && speler.x < coin.can3x[i] + coin.width && speler.y - speler.height <= coin.can3y[i] && speler.y > coin.can3y[i])  {
        amountCoins += 1;
        coin.pickedUp3[i]  -=1
        coinSound.play();
       }
    }
  }
    //lava
    for ( var i = 0; i < lava.x3[i]; i++) { // tekenen van de lava
      image (gifLava, lava.x3[i],lava.y, lava.width, lava.height);
      }
   
    
    if (speler.x> 320 && speler.y=== 640) { // gelijk dood als je de lava aanraakt en speler.x wordt gereset
      
      health = 0;
      speler.x = 50; 
      speler.y = 640;
     }
    
  // for-loop voor tekenen platformen
 
  for (var i = 0; i < platform3X.length; i++) { 
    
    image(imgPlatform, platform3X[i], platform3Y[i], platformWidth, platformHeight);

    if (speler.x + 25>= platform3X[i] && speler.x -30 <= platform3X[i] + platformWidth && speler.y <= platform3Y[i]) {
      grond = platform3Y[i];
       
    }  
  
    
    }
    for (var i = 0; i < platform3X.length; i++) { // tekenen van de bewegende platformen
      if (i === 1) { // Beweeg alleen platform3Y[1]
          if (move3Y === true) { // met behulp van de move3Y wordt er bepaald of het platform omhoog of omlaag beweegt
               platform3Y[i] -= 1;
          }
          if (platform3Y[i] < 280) {
              move3Y = false;
          }
          if (platform3Y[i] > 560) {
              move3Y = true;
          }
          if (!move3Y) {
              platform3Y[i] += 1;
          }
      }
  
      image(imgPlatform, platform3X[i], platform3Y[i], platformWidth, platformHeight); // tekenen van de platformen
  
      // Controleer botsing met platform[i]
      if (speler.x + 30 >= platform3X[i] && speler.x -30 <= platform3X[i] + platformWidth && speler.y - 10 <= platform3Y[i]) {
          grond = platform3Y[i];
         
      }
  }if (wiz.health3 > 0) { // tekenen van de wizard
  image(wizImg,wiz.x3,wiz.y3,wiz.width,wiz.height);

  // beweging van de wizard
    if(wiz.x3 < 960 ) { 
      minionLinks = false;
      minionRechts = true;
    }

    if (wiz.x3 + wiz.width > 1280) {
      minionLinks = true;
      minionRechts = false;
    }

    if(minionLinks === true) {
    wiz.x3 -= 2;
    }
    if(minionRechts === true) {
      wiz.x3+= 2;
      }
     // collision van de speler en de wiz resulteert in damge
      if (speler.x > wiz.x3  &&speler.x < wiz.x3+wiz.width&& speler.y > wiz.y3 && speler.y - speler.height <= wiz.y3+ wiz.height) {
        health -= 1;
      }
    }
  }
  if (canvasStatus === 4) {
    grond = 640;

    if (speler.y >= 640) {
      health = 0;
      speler.x = 20
      speler.y =  platform4Y[0] - 10
    }
    for ( var i = 0; i < lava.x4[i]; i++) { // tekenen van de lava
      image (gifLava, lava.x4[i],lava.y, lava.width, lava.height);
      }
    
    for (var i = 0; i < platform4X.length; i++) { // tekenen van de platformen

      image(imgPlatform, platform4X[i], platform4Y[i], platformWidth, platformHeight );
  
      if (speler.x + 30>= platform4X[i] && speler.x -30<= platform4X[i] + platformWidth && speler.y <= platform4Y[i]) {
        grond = platform4Y[i]; // dit zorgt ervoor dat de speler op de platformen kan staan

      }   
    
      }
      // beweging van de platformen, alleen [0]
      for (var k = 0; k < platform4X.length; k++) {
        if (k === 0) { 
            if (move.y4[k] === true) {
                platform4Y[k] -= 1;
            }
            if (platform4Y[k] < 100) {
                move.y4[k] = false;
            }
            if (platform4Y[k] > 560) {
                move.y4[k] = true;
            }
            if (!move.y4[k]) {
                platform4Y[k] += 1;
            }
        }
        if (k === 1) { 
          if (move.y4[k] === true) {
              platform4Y[k]-= 1;
          }
          if (platform4Y[k] < 100) {
              move.y4[k]= false;
          }
          if (platform4Y[k] > 560) {
              move.y4[k] = true;
          }
          if (!move.y4[k]) {
              platform4Y[k] += 1;
          }
      }

      if (k === 2) { 
        if (move.y4[k] === true) {
            platform4Y[k]-= 1;
        }
        if (platform4Y[k] < 100) {
            move.y4[k]= false;
        }
        if (platform4Y[k] > 560) {
            move.y4[k] = true;
        }
        if (!move.y4[k]) {
            platform4Y[k] += 1;
        }
    }

    if (k === 3) { 
      if (move.y4[k] === true) {
          platform4Y[k]-= 1;
      }
      if (platform4Y[k] < 100) {
          move.y4[k]= false;
      }
      if (platform4Y[k] > 560) {
          move.y4[k] = true;
      }
      if (!move.y4[k]) {
          platform4Y[k] += 1;
      }
  }
        image(imgPlatform, platform4X[k], platform4Y[k], platformWidth, platformHeight);
    
        // de speler kan hierdoor op dde platformen staan
        if (speler.x + 30 >= platform4X[k] && speler.x -30<= platform4X[k] + platformWidth && speler.y - 10 <= platform4Y[k]) {
            grond = platform4Y[k];
           
        }
    }
  


  }

 
  if (canvasStatus === 5) {
    grond = 640;
    
    muziek.pause(); // main theme wordt gestopt
    for (var k = 0; k < platform3X.length; k++) { // bewegen van de horizontaal bewegende platformen
      if (k === 0) { 
          if (moveX61 === 'rechts') {
               platform6X[k] += 3;
          }
          if (platform6X[k] > 480) {
              moveX61 = 'links';
          }
          if (platform6X[k] <= 0 ) {
              moveX61 = 'rechts';
          }
          if (moveX61 === 'links') {
              platform6X[k] -= 3;
          }
          

        }
      if (k === 1) { // bewegen van de horizontaal bewegende platformen
        if (moveX62 === 'rechts') {
             platform6X[k] += 3;
        }
        if (platform6X[k] >= 1120) {
           moveX62 = 'links';
           
        }
        if (platform6X[k] <= 640 ) {
            moveX62 = 'rechts';
        }
        if (moveX62 === 'links') {
            platform6X[k] -= 3;
        }
    }
      image(imgPlatform, platform6X[k], platform6Y[k], platformWidth, platformHeight);
  
      // collision met de platforms worden hier gechecked
      if (speler.x + 30 >= platform6X[k] && speler.x -30 <= platform6X[k] + platformWidth && speler.y - 10 <= platform6Y[k]) {
          grond = platform6Y[k];
         
      }
  }


   // begin van de fireball shooting process wordt hier gecontroleerd
if (fireBegin === false) {
  fireX = 900
}
if (fireBegin2 === false) {
  fireX2 = 300
}
   // de fireball wordt getekend en nadat de fireball de rand van het scherm raakt despawned het
   if (fireBegin === true && fireX >0) {
      
      
  
        image(fireball, fireX, fireY, fireWidth, fireHeight);
       fireX -= 4; // bewegen van de fireball
      
      }
       // de fireball wordt getekend en nadat de fireball de rand van het scherm raakt despawned het
      if (fireBegin2 === true && fireX2 + fireWidth <1280) {
     
      
  
        image(fireball2, fireX2, fireY, fireWidth, fireHeight);
       fireX2 += 4; // bewegen van de fireball
      
      }
     // damaga van de fireball
      if (speler.x > fireX && speler.x < fireX + fireWidth&& speler.y > fireY && speler.y - speler.height < fireY + fireHeight && fireBegin === true) {
        health -= 5;
      }

      if (speler.x > fireX2 && speler.x < fireX2 + fireWidth&& speler.y > fireY && speler.y - speler.height < fireY + fireHeight && fireBegin2 === true) {
        health -= 5;
      }
 // als de rand van het scherm wordt bereikt gaan de fireballs weg
    if (fireX < 10) {
      fireBegin = false;
    }

    if (fireX2 + fireWidth > 1270) {
      fireBegin2 = false;
    }
    
    for(var b = 0; b < grondX1.length; b++) { // tekenen van de grond
      image(imgKaas, grondX1[b], 640, 80, 80);
    }
   
    if (bossX < 10 && bossAlive){ // activeren van de fireball en kans voor de speler om de boss te raken

      
      fireBegin2 = true
      
      dragonImg= true 
      setTimeout(() => rechtsBoss = true,4000)
      linksBoss = false
      
     }
    

     if (bossX + bossWidth > 1270 && bossAlive) { // activeren van de fireball en kans voor de speler om de boss te raken
   
      fireBegin = true
      rechtsBoss = false
      dragonImg = false
      setTimeout(() => linksBoss = true,4000)
       } 

     if (rechtsBoss === true ) { // omdraaien van het plaatje van de draak en bewegen van de draak
      rechts();
       dragonImg = true;
        
     }
    
     if (linksBoss === true ) {  // omdraaien van het plaatje van de draak en bewegen van de draak
      links() ;
       dragonImg = false;
        
     }
     if (dragonImg) { // omdraaien van de draak naar rechts
      dragonImg = dragonRechts
     }
     if (!dragonImg) { // omdraaien van de draak naar links
      dragonImg = dragonLinks
     }
  
    if (bossAlive) { // draak wordt alleen getekend als hij leeft enn hp >0
      image(dragonImg, bossX, bossY, bossWidth,bossHeight);
      }
    
    boss.play(); 
    boss.volume = 0.5;
   
// damage die de draak op de speler doet
    if ( speler.x > bossX &&speler.x < bossX + bossWidth && speler.y > bossY && bossAlive === true){ //&& canvasStatus === 4
  
      health -= 1

    }

    // hp systeem van de draak weergegeven in blokjes
    if (bossHealth > 400) {
      fill('red')
      rect(1200, 300, 100, 100)
    }

    if (bossHealth > 300) {
      fill('red')
      rect(1100, 300, 100, 100)
    }
    if (bossHealth > 200) {
      fill('red')
      rect(1000, 300, 100, 100);

    }
    if (bossHealth > 100) {
      fill('red')
      rect(900, 300, 100, 100);
    }
    if (bossHealth > 0) {
      fill('red');
      rect(800, 300, 100, 100);
    } else {bossAlive = false;}
  

    // de speler zit vast op canvas 5 en kan dus niet ontsnappen
    if (speler.x > 1270) {
      speler.x = 1270
    
    }
    if (speler.x < 0) {
      speler.x = 0
    
    }


    if (!bossAlive) {
      // victory animation wordt gespeeld en het spel wordt gereset
      bewegen = false;
     
      setTimeout(() => { location.reload(); }, 5000);
      spelerImg = victory;
      //skbidi
    }
  }
   else {
    boss.pause();
  }


 
  // KeyBind tips

  if (tipsShown > 0) { // tips
  textSize(40);
  fill ('#FFF1E8');
  textFont(Font);
    
  text('A and D to move', 50, 100);
  text('X to sprint', 50, 130);
  text('Z to jump',50,160)
  text ('E to pickup and attack',50,190)
  text ('R to hide tips',50,220)
}
textSize(60);
fill ('#FFF1E8');
textFont(Font);
text( "SCORE: " + amountCoins,940,140)
text( "LEVEL: " + canvasStatus,940,200)
 
if (attack === true) {
  image(purpleEquip,50,50,128,128)
}
  // speler

 image(spelerImg, speler.x-30, speler.y-speler.height, speler.width, speler.height);

  // items om op te pakken
if (lightsaberShown > 0 && canvasStatus === 2) {
    image(imgSaber, lightsaberX, lightsaberY, 80, 80);
    
}

  // inventaris

 // ons health systeem, voor elke punt wordt er een hartje getekend
 if (health > 80) {
  image(gifHeart, 1200, 10, 80, 80);
 }
 if (health > 60) {
  image(gifHeart, 1150, 10, 80, 80);
 }
 if (health > 40) {
  image(gifHeart, 1100, 10, 80, 80);
 }
 if (health > 20) {
  image(gifHeart, 1050, 10, 80, 80);
 } 
 if (health > 0) {
  image(gifHeart, 1000, 10, 80, 80);
 }

}

var checkGameOver = function() {
  
  return false;
};




function keyPressed () {

  if (key === 'q' ) { // toegang tot de main game
    if (startscherm === true) {
      
      if (playscherm === true ) {
     
        setTimeout(() => startscherm = false, 100);
      
      
    }
  }

}


 if (key === 'r') {
  tipsShown = 1 - tipsShown;
 }
 if (key === 'c') { // return naar het startscherm
  startscherm = true;
 }
}


function rechts () { // met deze functie beweegt de boss naar rechts
  bossX = bossX +5;
}
function links () { // met deze functie beweegt de boss naar rechts
  bossX = bossX -5;
}


////////// DE FUNCTIE VOOR HET STARTSCHERM /////////////
var start = function() {

  if (startscherm === true) {
    // alle muziekjes worden gestopt zodra je op het startscherm komt ,behalve natuurlijk de start muziek
     
      boss.pause();
      
      muziek.pause();
      if (!light1) {
       lightImg = saber2
      }
      
  
    setTimeout(() =>  light1 = true, 1050);

///////////// HET STARTSCHERM DAT VERSCHIJNT ///////////////////////
   if (light1) {
    lightImg = saber1
   }
    fill('black');
    rect(0, 0, 1280, 720);
    textSize (80);
      fill('#FFF1E8');
      textFont(Font);
     image(lightImg,333,140 ,615,90);
    

    text("PLAY", 524,500); // titelscherm
    text('PRESS q',457,600) // duidelijke command om het spel te starten
    
    textFont(Font2); // font voor het titelscherm
    text ("SPACE", spaceX,100); // titelscherm
    text("SURVIVAL", survivalX,320); // titelscherm
    
     
     spaceX = spaceX + 4;
     survivalX = survivalX - 10;

     if (survivalX < 192) { // de tekst schuif van de zijkant naar het midden van het scherm
      survivalX = 192;
     }
      if (spaceX > 336) { // de tekst schuif van de zijkant naar het midden van het scherm
        spaceX = 336;
      }

//////////// ALS JE DE KEY NAAR BENEDEN DOET KOMEN DE PIJLTJES EN SLOTJES ///////////

    if (key === 'q') { //met de pijltjes toetsen is het menu te navigeren
     play =true;
   
    } 

    
  
     
      if (play === true) { // scherm voor de main game
      image(imgArrow,222,440,80,80);
      image(imgArrow2,978,440,80,80);
      playscherm = true;
     
      }
     
  
     

  } 
  if (startscherm === false) {
    startsong.pause();
  }
     
  }

  

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/* Preload gebeurt voordat alle andere commands runnen,script.js
en voordat het visuele gedeelte van de game het doet.
*/

function preload() { // hier worden alle plaatjes geladen
  
  imgShip = loadImage('afbeeldingen/ship.png'); // plaatje voor het ruimte schip
  imgSaber = loadImage('afbeeldingen/lightsaber.png'); // plaatje voor de paarse lightsaber
  imgPlatform = loadImage('afbeeldingen/platform.png'); // plaatje voor platform
  imgTempel = loadImage ('afbeeldingen/tempel.png'); // plaatje voor tempel waar lightsaber in ligt
  imgSky = loadImage('gifs/sky.gif'); // plaatje voor achtergrodn
  imgKaas= loadImage('afbeeldingen/kaas.png'); // plaatje voor grond
  imgArrow = loadImage('gifs/arrow.gif'); // pijl 1
  imgArrow2 = loadImage('gifs/arrow2.gif'); // pijl 2 
  loop1rechts = loadImage('gifs/walkrslow.gif'); // spelr gif voor loops rechts
  loop2rechts = loadImage('gifs/walkrfast.gif'); // speler gif voor sprint rechts
  loop1links = loadImage('gifs/walklslow.gif'); // speler gif voor loop links
  loop2links = loadImage('gifs/walklfast.gif'); // speler gif voor sprint links
  staanRechts= loadImage('gifs/newastro.gif'); // gifs voor astro (speler) staan rechts
  staanLinks = loadImage('gifs/newastro2.gif'); // gifs voor astro (speler) staan links


  gifLava = loadImage('gifs/lava.gif'); // plaatje voor de lava
  gifHeart = loadImage('gifs/Heart.gif'); // plaatje voor de hartjes 

 
  imgCoin = loadImage('gifs/coin.gif'); // plaatje voor de coins
  spelerImg = staanRechts; // variabele voor het plaatje voor de speler
  saber1 = loadImage('gifs/screen1.gif'); // lightsaber start op
  saber2 = loadImage('gifs/screen2.gif'); // lightsaber is opgestart en blinked
 
  dragonLinks = loadImage('gifs/draakLinks.gif'); // afbeelding voor draak links
  dragonRechts = loadImage('gifs/draakRechts.gif'); // plaatje voor draak rechts
  strike = loadImage('afbeeldingen/strike.png'); // eerste attack plaatje voor rechts
  strike2 = loadImage('afbeeldingen/strike2.png'); // tweede attack plaatje voor links
  fireball = loadImage('afbeeldingen/fireball.png'); // eerste plaatje voor de fireball
  fireball2 = loadImage('afbeeldingen/fireball2.png'); // tweede plaatje voor de fireball
  wizImg = loadImage('afbeeldingen/wiz.png'); // plaatje voor de wizard
  purpleEquip = loadImage('afbeeldingen/purpleEquip.png'); // laten zien dat je de lightsaber op het gepakt
  victory = loadImage('gifs/victory.gif'); // victory dance van de speler nadat je het spel hebt uitgespeeld
  // fonts
  Font = loadFont('pixel.ttf'); // standaard font
  Font2 = loadFont('Pixelmania.ttf'); // font voor het titelscherm
}


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
 
}
/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */


function draw() {

  if (spelStatus === SPELEN) {
    if (startscherm === false) {
    death.pause();
     beweegAlles();
     pickupSysteem();
     verwerkBotsing();
     tekenAlles();
     
    }
    start();
    if (startscherm === true ) {
   
    
    startsong.play();
    startsong.volume = 0.5;
    }
    if (health <= 0) {
     
      spelStatus = GAMEOVER;

    }
   }
   
   if (spelStatus === GAMEOVER) {
   muziek.pause();
   boss.pause();
    death.play();
    
    
    textSize(180);
    fill('#FF004D');
    textFont(Font);
    background('black');
    text('GAME OVER', 65, 335);
   
   
    amountCoins = 0;
    bossHealth =500;

    setTimeout(() => {health = 100; spelStatus = SPELEN;}, 4000);

  }
  
}