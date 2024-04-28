/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";


/* ******************* */
/* globale variabelen  */
/* ******************* */

// mogelijkheden voor de status van het spel
const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
const MAINMENU = 3;

var spelStatus = MAINMENU; // houdt de status van het spel bij


// mogelijkheden voor de richting van vijandjes en speler
const LEFT = 0;
const RIGHT = 1;


var animatieKlok = 0; // timer gebruikt om animaties te timen


var activeBackGround = backGround1; // achtergrond van de huidige kamer
var backGroundNumber = 1; // tijdelijke variabele om 1 van de 6 achtergronden te kiezen


var spelerX = 40; // x-positie van speler
var spelerY = 0; // y-positie van speler
var spelerSpeed = 6; // snelheid van speler
var spelerLeeft = true; // houdt bij of de speler leeft of dat het gameover is
var spelerDirection = RIGHT; // richting van de speler
var spelerWalking = false; // houdt bij of de speler aan het lopen is


var kogelX = spelerX + 40; // x-positie van kogel
var kogelY = spelerY; // y-positie van kogel
var kogelXOriginal = spelerX + 40; // orginele x-positie van kogel (volgt de speler)
var kogelYOriginal = spelerY;    // orginele y-positie van kogel (volgt de speler)
var kogelXDestination = 0; // x bestemminh van kogel
var kogelYDestination = 0; // y bestemming van kogel
var originalKogelSpeed = 11 ; // orginele snelheid van de kogel, onveranderd (als de kogel niet rechtvooruit gaat zijn de x en y snelheid verschillend)
var kogelXSpeed = 11; // x snelheid van kogel
var kogelYSpeed = 11; // y snelheid van kogel
var kogelDestinationReached = false; // houdt bij of de bestemming van de kogel is bereikt


var aantalVijanden = 4; // aantal vijanden in de kamer
var unRoundedVijandSize = 1; // niet afgeronde size van de vijand
var vijanden = []; // array met vijanden
var vijandX = [];   // array met x-posities van vijanden
var vijandY = [];   // array met y-posities van vijanden
var vijandSpeed = []; // array met snelheden van vijanden
var vijandScale = []; // array met de grootte van vijanden
var vijandLevens = []; // array met het aantal levens van vijanden
var vijandInvinsible = []; // array met of vijanden net zijn geraakt of niet
var vijandDirection = []; // array met de richtingen van vijanden
var vijandSize = []; // array met afgeronde sizes van vijanden

// tijdelijke variabelen gebruikt om de volgorde dat de vijanden worden getekend om te draaien
var temporaryVijanden = 0; 
var temporaryVijandX = 0; 
var temporaryVijandY = 0;  
var temporaryVijandSpeed = 0; 
var temporaryVijandScale = 0; 
var temporaryVijandLevens = 0;
var temporaryVijandInvinsible = 0;
var temporaryVijandDirection = 0;
var temporaryVijandSize = 0;


var splatterX = []; // array met de x-positie van de dode vijanden
var splatterY = []; // array met de y-positie van de dode vijanden
var splatterSize = []; // array met de size van de dode vijanden
var unroundedSplatterNumber = 0; // tijdelijke variabele om 1 van de 3 splatters die er per size zijn te kiezen
var splatterNumber = []; // array met het nummer van de splatter (1, 2 of 3)
var vijandDead = []; // array met of de vijanden dood zijn of niet


var kamer = 1; // huidige kamer


var vijandPunten = 0; // aantal behaalde punten voor het aantal verslagen vijandjes (+50 per small enemy, +100 per medium enemy, +150 per large enemy)
var kamerPunten = 0; // aantal behaalde punten voor het aantal verslagen levels (+400 x het nummer van de kamer)
var tijdPunten = 3000; // aantal behaalde punten voor de snelheid van het clearen van rooms (-50 per seconde, na 1 minuut 0 punten erbij)
var score = 0; // alle scores opgeteld


var mouseIsClicked = false; // houdt bij of de muis is ingedrukt


// plaatjes speler
var protagonistRightFrame1 = 0;
var protagonistRightWalkFrame2 = 0;
var protagonistRightWalkFrame3 = 0;
var protagonistRightIdleFrame2 = 0;
var protagonistRightIdleFrame3 = 0;

var protagonistLeftFrame1 = 0;
var protagonistLeftWalkFrame2 = 0;
var protagonistLeftWalkFrame3 = 0;
var protagonistLeftIdleFrame2 = 0;
var protagonistLeftIdleFrame3 = 0;

// plaatje kogel
var kogelFrame1 = 0;

// plaatjes menu's
var mainMenu = 0;
var mainMenuHoverStart = 0;
var mainMenuHoverHowToPlay = 0;

var gameOver = 0;
var gameOverHoverMainMenu = 0;
var gameOverHoverRestart = 0;

var uitlegScherm = 0;
var uitlegSchermHoverBack = 0;

// plaatjes achtergronden
var backGround1 = 0;
var backGround2 = 0;
var backGround3 = 0;
var backGround4 = 0;
var backGround5 = 0;
var backGround6 = 0;

// plaatjes dode vijandjes
var smallSplatter1 = 0;
var smallSplatter2 = 0;
var smallSplatter3 = 0;

var mediumSplatter1 = 0;
var mediumSplatter2 = 0;
var mediumSplatter3 = 0;

var largeSplatter1 = 0;
var largeSplatter2 = 0;
var largeSplatter3 = 0;

// plaatjes vijanden
var smallSlimeLeftFrame1 = 0;
var smallSlimeLeftFrame2 = 0;
var smallSlimeRightFrame1 = 0;
var smallSlimeRightFrame2 = 0;

var mediumSlimeLeftFrame1 = 0;
var mediumSlimeLeftFrame2 = 0;
var mediumSlimeLeftFrame3 = 0;
var mediumSlimeRightFrame1 = 0;
var mediumSlimeRightFrame2 = 0;
var mediumSlimeRightFrame3 = 0;

var largeSlimeLeftFrame1 = 0;
var largeSlimeLeftFrame2 = 0;
var largeSlimeLeftFrame3 = 0;
var largeSlimeRightFrame1 = 0;
var largeSlimeRightFrame2 = 0;
var largeSlimeRightFrame3 = 0;

/* ******** */
/* functies */
/* ******** */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {

    image(activeBackGround, 0, 0, 1280, 720);

};

/**
 * Tekent de text voor de scores
 */
var scores = function () {

    textSize(30);
    textFont("fantasy");
    fill("white");
    text("room: " + kamer, (width/5)*0.25, 20, 500, 500);
    text("time: " + tijdPunten,  (width/5)*0.85, 20, 500, 500);
    text("room bonus: " + kamerPunten,  (width/5)*1.5, 20, 500, 500);
    text("enemies: " + vijandPunten,  (width/5)*2.7, 20, 500, 500);
    text("score: " + score,  (width/5)*3.75, 20, 500, 500);

};

/**
 *  de klok voor de animaties
 */
var animatieTimer = function () {

    animatieKlok = animatieKlok+1;
    if(animatieKlok === 30){animatieKlok = 0}

};


/**
 * Tekent de vijanden en de dode vijanden
 */
var tekenVijand = function() {

    //tekent alle dode vijanden
    for(var i = 0; i < vijandDead.length; i++){

        if(vijandDead[i] === true){
            if(splatterSize[i] === 1){
                if(splatterNumber[i] === 1){image(smallSplatter1, splatterX[i], splatterY[i])}
                if(splatterNumber[i] === 2){image(smallSplatter2, splatterX[i], splatterY[i])}
                if(splatterNumber[i] === 3){image(smallSplatter3, splatterX[i], splatterY[i])}
            }
            if(splatterSize[i] === 2){
                if(splatterNumber[i] === 1){image(mediumSplatter1, splatterX[i], splatterY[i])}
                if(splatterNumber[i] === 2){image(mediumSplatter2, splatterX[i], splatterY[i])}
                if(splatterNumber[i] === 3){image(mediumSplatter3, splatterX[i], splatterY[i])}
            }
            if(splatterSize[i] === 3){
                if(splatterNumber[i] === 1){image(largeSplatter1, splatterX[i], splatterY[i])}
                if(splatterNumber[i] === 2){image(largeSplatter2, splatterX[i], splatterY[i])}
                if(splatterNumber[i] === 3){image(largeSplatter3, splatterX[i], splatterY[i])}
            }
        }

    }

    //tekent alle levende vijanden
    for(var i = 0; i < vijanden.length; i++){

        if(vijandDirection[i] === LEFT){
            if(vijandSize[i] === 1){
                if(animatieKlok < 18 ){image(smallSlimeLeftFrame1, vijandX[i], vijandY[i], vijandScale[i])}
                if(animatieKlok >= 18 ){image(smallSlimeLeftFrame2, vijandX[i], vijandY[i], vijandScale[i])}
            }
            if(vijandSize[i] === 2){
                if(animatieKlok < 12 ){image(mediumSlimeLeftFrame1, vijandX[i], vijandY[i], vijandScale[i])}
                if(animatieKlok >= 12 && animatieKlok < 18 ){image(mediumSlimeLeftFrame2, vijandX[i], vijandY[i], vijandScale[i])}
                if(animatieKlok >= 18 ){image(mediumSlimeLeftFrame3, vijandX[i], vijandY[i], vijandScale[i])}
            }
            if(vijandSize[i] === 3){
                if(animatieKlok < 12 ){image(largeSlimeLeftFrame1, vijandX[i], vijandY[i], vijandScale[i])}
                if(animatieKlok >= 12 && animatieKlok < 18 ){image(largeSlimeLeftFrame2, vijandX[i], vijandY[i], vijandScale[i])}
                if(animatieKlok >= 18 ){image(largeSlimeLeftFrame3, vijandX[i], vijandY[i], vijandScale[i])}
            }
        }
        
        if(vijandDirection[i] === RIGHT){
            if(vijandSize[i] === 1){
                if(animatieKlok < 18 ){image(smallSlimeRightFrame1, vijandX[i], vijandY[i], vijandScale[i])}
                if(animatieKlok >= 18 ){image(smallSlimeRightFrame2, vijandX[i], vijandY[i], vijandScale[i])}
            }
            if(vijandSize[i] === 2){
                if(animatieKlok < 12 ){image(mediumSlimeRightFrame1, vijandX[i], vijandY[i], vijandScale[i])}
                if(animatieKlok >= 12 && animatieKlok < 18 ){image(mediumSlimeRightFrame2, vijandX[i], vijandY[i], vijandScale[i])}
                if(animatieKlok >= 18 ){image(mediumSlimeRightFrame3, vijandX[i], vijandY[i], vijandScale[i])}
            }
            if(vijandSize[i] === 3){
                if(animatieKlok < 12 ){image(largeSlimeRightFrame1, vijandX[i], vijandY[i], vijandScale[i])}
                if(animatieKlok >= 12 && animatieKlok < 18 ){image(largeSlimeRightFrame2, vijandX[i], vijandY[i], vijandScale[i])}
                if(animatieKlok >= 18 ){image(largeSlimeRightFrame3, vijandX[i], vijandY[i], vijandScale[i])}
            }
        }

    }

};



/**
 * Tekent de kogel
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {

    image(kogelFrame1, x-17.5, y-17.5, 35);

};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
    
  if(spelerDirection === RIGHT && spelerWalking === true){
    if(animatieKlok < 5 || animatieKlok >= 15 && animatieKlok < 20){image(protagonistRightFrame1, x-105, y-75, 225)}
    if(animatieKlok >= 5 && animatieKlok < 10 || animatieKlok >= 20 && animatieKlok < 25){image(protagonistRightWalkFrame2, x-105, y-75, 225)}
    if(animatieKlok >= 10 && animatieKlok < 15 || animatieKlok >= 25 && animatieKlok < 30){image(protagonistRightWalkFrame3, x-105, y-75, 225)}
  }  

  if(spelerDirection === LEFT && spelerWalking === true){
    if(animatieKlok < 5 || animatieKlok >= 15 && animatieKlok < 20){image(protagonistLeftFrame1, x-105, y-75, 215)}
    if(animatieKlok >= 5 && animatieKlok < 10 || animatieKlok >= 20 && animatieKlok < 25){image(protagonistLeftWalkFrame2, x-105, y-75, 215)}
    if(animatieKlok >= 10 && animatieKlok < 15 || animatieKlok >= 25 && animatieKlok < 30){image(protagonistLeftWalkFrame3, x-105, y-75, 215)}
  }

  if(spelerDirection === RIGHT && spelerWalking === false){
    if(animatieKlok < 10){image(protagonistRightFrame1, x-105, y-75, 215)}
    if(animatieKlok >= 10 && animatieKlok < 20){image(protagonistRightIdleFrame2, x-105, y-75, 215)}
    if(animatieKlok >= 20 && animatieKlok < 30){image(protagonistRightIdleFrame3, x-105, y-75, 215)}
  }  

  if(spelerDirection === LEFT && spelerWalking === false){
    if(animatieKlok < 10){image(protagonistLeftFrame1, x-105, y-75, 215)}
    if(animatieKlok >= 10 && animatieKlok < 20){image(protagonistLeftIdleFrame2, x-105, y-75, 215)}
    if(animatieKlok >= 20 && animatieKlok < 30){image(protagonistLeftIdleFrame3, x-105, y-75, 215)}
  }
  

  
};


/**
 * beweegt de vijanden + verandert de volgorde van het tekenen aan de hand van de y-positie van de vijanden
 */
var beweegVijand = function() {

    for(var i = 0; i < vijanden.length; i++){

        // de vijand met de hoogste y-positie wordt het laatst getekend (die staat het meest naar voren op het scherm, dus die moet voor de achterste vijandjes getekend worden)
        if(vijandY[i] > vijandY[i+1]){
            temporaryVijanden = vijanden[i]; vijanden.splice(i, 1); vijanden.splice(i+1, 0, temporaryVijanden); temporaryVijanden = 0;
            temporaryVijandX = vijandX[i]; vijandX.splice(i, 1); vijandX.splice(i+1, 0, temporaryVijandX); temporaryVijandX = 0;
            temporaryVijandY = vijandY[i]; vijandY.splice(i, 1); vijandY.splice(i+1, 0, temporaryVijandY); temporaryVijandY = 0;
            temporaryVijandSpeed = vijandSpeed[i]; vijandSpeed.splice(i, 1); vijandSpeed.splice(i+1, 0, temporaryVijandSpeed); temporaryVijandSpeed = 0;
            temporaryVijandScale = vijandScale[i]; vijandScale.splice(i, 1); vijandScale.splice(i+1, 0, temporaryVijandScale); temporaryVijandScale= 0;
            temporaryVijandLevens = vijandLevens[i]; vijandLevens.splice(i, 1); vijandLevens.splice(i+1, 0, temporaryVijandLevens); temporaryVijandLevens = 0;
            temporaryVijandInvinsible = vijandInvinsible[i]; vijandInvinsible.splice(i, 1); vijandInvinsible.splice(i+1, 0, temporaryVijandInvinsible); temporaryVijandInvinsible = 0;
            temporaryVijandDirection = vijandDirection[i]; vijandDirection.splice(i, 1); vijandDirection.splice(i+1, 0, temporaryVijandDirection); temporaryVijandDirection = 0;
            temporaryVijandSize = vijandSize[i]; vijandSize.splice(i, 1); vijandSize.splice(i+1, 0, temporaryVijandSize); temporaryVijandSize = 0;
            i--;
        }

        //beweegt de vijanden richting de speler
        if(spelerX > vijandX[i]){
            vijandX[i] = vijandX[i] + vijandSpeed[i];
            vijandDirection[i] = RIGHT;
        }

        if(spelerX < vijandX[i]){
            vijandX[i] = vijandX[i] - vijandSpeed[i];
            vijandDirection[i] = LEFT;
        }

        if(spelerY > vijandY[i]){
            vijandY[i] = vijandY[i] + vijandSpeed[i];
        }

        if(spelerY < vijandY[i]){
            vijandY[i] = vijandY[i] - vijandSpeed[i];
        }

    }

};


/**
 * beweegt de kogel
 */
var beweegKogel = function() {

    //de setup van het schieten. Zorgt dat je maar 1 keer hoeft te klikken en bepaald een aantal variabelen. (we hebben niet gewoon "mouseClicked" gebruikt omdat het niet werkte (ook bij andere groepjes niet))
    if(mouseIsPressed && mouseIsClicked === false){     
        kogelXDestination = mouseX;
        kogelYDestination = mouseY;
        mouseIsClicked = true;

        // berekent de relatieve snelheid in de helft van de gevallen
        if(((kogelXDestination - kogelX) > (kogelYDestination - kogelY) && (kogelXDestination - kogelX) > 0) || ((kogelXDestination - kogelX) < (kogelYDestination - kogelY) && (kogelXDestination - kogelX) < 0)){
            if((kogelXDestination - kogelX) < 0){kogelXSpeed = -1 * originalKogelSpeed}
            kogelYSpeed = (kogelYDestination - kogelY) * (kogelXSpeed/(kogelXDestination-kogelX))
        }

        // berekent de relatieve snelheid in de andere helft van de gevallen
        else if (((kogelYDestination - kogelY) >= (kogelXDestination - kogelX) && (kogelYDestination - kogelY) > 0) || ((kogelYDestination - kogelY) <= (kogelXDestination - kogelX) && (kogelYDestination - kogelY) < 0)){
            if((kogelYDestination - kogelY) < 0){kogelYSpeed = -1 * originalKogelSpeed}
            kogelXSpeed = (kogelXDestination - kogelX) * (kogelYSpeed/(kogelYDestination-kogelY)); 
        }
    }

    //beweegt de kogel naar zijn bestemming
    if(mouseIsClicked === true && kogelDestinationReached === false){   
        if(kogelX < kogelXDestination){kogelX = kogelX + kogelXSpeed}
        if(kogelX > kogelXDestination){kogelX = kogelX + kogelXSpeed}
        if(kogelY < kogelYDestination){kogelY = kogelY + kogelYSpeed}
        if(kogelY > kogelYDestination){kogelY = kogelY + kogelYSpeed}
    }

    //checkt if de kogel bij zijn bestemming is aangekomen
    if(kogelX < kogelXDestination +originalKogelSpeed && kogelX > kogelXDestination -originalKogelSpeed && kogelY < kogelYDestination +originalKogelSpeed && kogelY > kogelYDestination -originalKogelSpeed && mouseIsClicked === true ){ 
        kogelDestinationReached = true;
        kogelXSpeed = originalKogelSpeed;
        kogelYSpeed = originalKogelSpeed;
    }

    //zorgt dat de kogel niet van het scherm afgaat
    if(kogelX > width -17.5 || kogelX < 17.5 ||kogelY > height -17.5 || kogelY < 17.5){
        kogelXSpeed = originalKogelSpeed;
        kogelYSpeed = originalKogelSpeed;
        kogelDestinationReached = true;
    }
   
    //zorgt dat de orginele positie van de kogel altijd bij de speler is
    if(spelerDirection === RIGHT){kogelXOriginal = spelerX + 40}
    if(spelerDirection === LEFT){kogelXOriginal = spelerX - 40}
    kogelYOriginal = spelerY;  

    //beweegt de kogel terug naar de speler als een boomerang nadat hij zijn bestemming heeft bereikt
    if (kogelDestinationReached === true && mouseIsClicked === true){
        if(kogelX < kogelXOriginal){kogelX = kogelX + originalKogelSpeed}
        if(kogelX > kogelXOriginal){kogelX = kogelX - originalKogelSpeed}
        if(kogelY < kogelYOriginal){kogelY = kogelY + originalKogelSpeed}
        if(kogelY > kogelYOriginal){kogelY = kogelY - originalKogelSpeed}
    }

    //kijkt of de kogel weer terug is bij de speler en reset dan een aantal variabelen
    if(kogelX < kogelXOriginal +originalKogelSpeed && kogelX > kogelXOriginal -originalKogelSpeed && kogelY < kogelYOriginal +originalKogelSpeed && kogelY > kogelYOriginal -originalKogelSpeed && mouseIsClicked === true ){ 
        mouseIsClicked = false;
        kogelDestinationReached = false;
        kogelX = kogelXOriginal;
        kogelY = kogelYOriginal;
    }

    //zorgt dat de kogel met de speler meebeweegt als hij niet aan het schieten is (en bijvoorbeeld net is omgedraaid)
    if(mouseIsClicked === false){
        if(kogelX < kogelXOriginal){kogelX = kogelX + originalKogelSpeed}
        if(kogelX > kogelXOriginal){kogelX = kogelX - originalKogelSpeed}
        if(kogelY < kogelYOriginal){kogelY = kogelY + originalKogelSpeed}
        if(kogelY > kogelYOriginal){kogelY = kogelY - originalKogelSpeed}
    }

};


/**
 * beweegt de speler
 */
var beweegSpeler = function() {

    // beweegt de speler
    if(keyIsDown(68)){
        spelerX = spelerX + spelerSpeed;
        spelerDirection = RIGHT;
        spelerWalking = true;
    } 

    if(keyIsDown(65)){
        spelerX = spelerX - spelerSpeed;
        spelerDirection = LEFT;
        spelerWalking = true;
    } 

    if(keyIsDown(87)){
        spelerY = spelerY - spelerSpeed;
        spelerWalking = true;
    } 

    if(keyIsDown(83)){
        spelerY = spelerY + spelerSpeed;
        spelerWalking = true;
    } 

    if (keyIsDown(68) === false && keyIsDown(65) === false && keyIsDown(87) === false && keyIsDown(83) === false){spelerWalking = false}

    // zorgt dat de speler niet het scherm af kan lopen
    if(spelerX < 40){spelerX = spelerX + spelerSpeed}
    if(spelerX > width - 40){spelerX = spelerX - spelerSpeed}
    if(spelerY < 75){spelerY = spelerY + spelerSpeed}
    if(spelerY > height - 75){spelerY = spelerY - spelerSpeed}

};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

    for(var i = 0; i < vijanden.length; i++){
        
        // kijkt of de kogel in de vijand is
        if(kogelX < vijandX[i] +vijandScale[i] && kogelX > vijandX[i] && kogelY < vijandY[i] +vijandScale[i]/2 && kogelY > vijandY[i] && mouseIsClicked === true && vijandInvinsible[i] === false){
            vijandLevens[i] = vijandLevens[i] - 1;
            vijandInvinsible[i] = true;
            kogelDestinationReached = true;
        }

        // kijkt of de kogel weer buiten de vijand is, zodat je de vijand niet 50 x per seconde raakt terwijl de kogel in de vijand is
        if(kogelX > vijandX[i] +vijandScale[i] || kogelX < vijandX[i] && kogelY > vijandY[i] +vijandScale[i]/2 || kogelY < vijandY[i] && vijandInvinsible[i] === true){vijandInvinsible[i] = false}

        // delete de gegevens van de vijand, maakt de gegevens van de dode vijanden voegt punten toe (als de vijand dood is)
        if(vijandLevens[i] < 1){
            vijandDead.push(true);
            splatterX.push(vijandX[i]);
            splatterY.push(vijandY[i]);
            splatterSize.push(vijandSize[i]);
            unroundedSplatterNumber = random(0.51, 3.49);
            splatterNumber.push (Math.round(unroundedSplatterNumber));
            
            if(vijandSize[i] === 1){vijandPunten = vijandPunten +50}
            if(vijandSize[i] === 2){vijandPunten = vijandPunten +100}
            if(vijandSize[i] === 3){vijandPunten = vijandPunten +150}

            vijanden.splice(i, 1);
            vijandX.splice(i, 1);
            vijandY.splice(i, 1);
            vijandScale.splice(i, 1);
            vijandSpeed.splice(i, 1);
            vijandLevens.splice(i, 1);
            vijandInvinsible.splice(i, 1);                
            vijandDirection.splice(i, 1);
            vijandSize.splice(i, 1);
            i--;              
        }

    }
    
    return false;

};


/**
 * Zoekt uit of de speler is geraakt
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
    for(var i = 0; i < vijanden.length; i++){
        
        // kijkt of de vijand de speler raakt
        if(spelerX < vijandX[i] +(vijandScale[i]/100)*90 + 40 && spelerX > vijandX[i] -40 && spelerY < vijandY[i] +(vijandScale[i]/100)*45 +75 && spelerY > vijandY[i] -75){spelStatus = GAMEOVER}
    
    }

    return false;

};


/**
 * preload alle afbeeldingen
 */
function preload(){

    protagonistRightFrame1 = loadImage('images/protagonist right frame1.png');
    protagonistRightWalkFrame2 = loadImage('images/protagonist right walk frame2.png');
    protagonistRightWalkFrame3 = loadImage('images/protagonist right walk frame3.png');
    protagonistRightIdleFrame2 = loadImage('images/protagonist right idle frame2.png');
    protagonistRightIdleFrame3 = loadImage('images/protagonist right idle frame3.png');

    protagonistLeftFrame1 = loadImage('images/protagonist left frame1.png');
    protagonistLeftWalkFrame2 = loadImage('images/protagonist left walk frame2.png');
    protagonistLeftWalkFrame3 = loadImage('images/protagonist left walk frame3.png');
    protagonistLeftIdleFrame2 = loadImage('images/protagonist left idle frame2.png');
    protagonistLeftIdleFrame3 = loadImage('images/protagonist left idle frame3.png');

    kogelFrame1 = loadImage('images/kogel frame1.png');

    mainMenu = loadImage('images/main menu.png');
    mainMenuHoverStart = loadImage('images/main menu-hover-start.png');
    mainMenuHoverHowToPlay = loadImage('images/main menu-hover-howtoplay.png');

    gameOver = loadImage('images/game over.png');
    gameOverHoverMainMenu = loadImage('images/game over-hover-mainmenu.png');
    gameOverHoverRestart = loadImage('images/game over-hover-restart.png');

    uitlegScherm = loadImage('images/uitleg-scherm.png');
    uitlegSchermHoverBack = loadImage('images/uitleg-scherm-hover-button.png');

    backGround1 = loadImage('images/background1.png');
    backGround2 = loadImage('images/background2.png');
    backGround3 = loadImage('images/background3.png');
    backGround4 = loadImage('images/background4.png');
    backGround5 = loadImage('images/background5.png');
    backGround6 = loadImage('images/background6.png');

    smallSplatter1 = loadImage('images/small splatter1.png');
    smallSplatter2 = loadImage('images/small splatter2.png');
    smallSplatter3 = loadImage('images/small splatter3.png');

    mediumSplatter1 = loadImage('images/medium splatter1.png');
    mediumSplatter2 = loadImage('images/medium splatter2.png');
    mediumSplatter3 = loadImage('images/medium splatter3.png');

    largeSplatter1 = loadImage('images/large splatter1.png');
    largeSplatter2 = loadImage('images/large splatter2.png');
    largeSplatter3 = loadImage('images/large splatter3.png');

    smallSlimeLeftFrame1 = loadImage('images/small slime left frame 1.png');
    smallSlimeLeftFrame2 = loadImage('images/small slime left frame2.png');
    smallSlimeRightFrame1 = loadImage('images/small slime right frame1.png');
    smallSlimeRightFrame2 = loadImage('images/small slime right frame2.png');

    mediumSlimeLeftFrame1 = loadImage('images/medium slime left frame1.png');
    mediumSlimeLeftFrame2 = loadImage('images/medium slime left frame2.png');
    mediumSlimeLeftFrame3 = loadImage('images/medium slime left frame3.png');
    mediumSlimeRightFrame1 = loadImage('images/medium slime right frame1.png');
    mediumSlimeRightFrame2 = loadImage('images/medium slime right frame2.png');
    mediumSlimeRightFrame3 = loadImage('images/medium slime right frame3.png');

    largeSlimeLeftFrame1 = loadImage('images/large slime left frame1.png');
    largeSlimeLeftFrame2 = loadImage('images/large slime left frame2.png');
    largeSlimeLeftFrame3 = loadImage('images/large slime left frame3.png');
    largeSlimeRightFrame1 = loadImage('images/large slime right frame1.png');
    largeSlimeRightFrame2 = loadImage('images/large slime right frame2.png');
    largeSlimeRightFrame3 = loadImage('images/large slime right frame3.png');

};


/**
 * setup
 */
function setup() {

    // Maakt een canvas
    createCanvas(1280, 720);
  
    // berekent het aantal vijanden per kamer
    aantalVijanden = kamer + 4;

    //stelt een paar dingetjes in
    kogelX = spelerX + 65;
    kogelY = height/2;
    spelerY = height/2;

    // kiest een random achtergrond
    backGroundNumber = random(0.5, 6.5);
    backGroundNumber = Math.round(backGroundNumber);
    if(backGroundNumber ===1){activeBackGround = backGround1}
    if(backGroundNumber ===2){activeBackGround = backGround2}
    if(backGroundNumber ===3){activeBackGround = backGround3}
    if(backGroundNumber ===4){activeBackGround = backGround4}
    if(backGroundNumber ===5){activeBackGround = backGround5}
    if(backGroundNumber ===6){activeBackGround = backGround6}
  

    for(var i = 0; i < aantalVijanden; i++){
        
        // genereert een aantal random variabelen voor in de arrays van de vijanden
        vijanden.push("vijand"+ i);
        vijandX.push(random((width/100)*40, (width/100)*90));
        vijandY.push(random((height/100)*10, (height/100)*90));
        vijandDirection.push(LEFT);

        unRoundedVijandSize = random(0.5, 3.5);
        vijandSize.push(Math.round(unRoundedVijandSize));

        if(vijandSize[i] === 1){
            vijandSpeed.push(random(1, 1.5));
            vijandLevens.push(1);
            vijandScale.push(50);
        }

        if(vijandSize[i] === 2){
            vijandSpeed.push(random(1.5, 2));
            vijandLevens.push(2);
            vijandScale.push(90);           
        }

        if(vijandSize[i] === 3){
            vijandSpeed.push(random(2, 2.5));
            vijandLevens.push(3);
            vijandScale.push(130);
        }
    
        vijandInvinsible.push(false);

    }
  
};


/**
 * draw
 */
function draw() {

    switch (spelStatus){

    case MAINMENU:

        //kijkt of de muis boven de knop zit en verandert de achtergrond op basis van dat
        if(mouseX > 845 && mouseX < 1070 && mouseY > 500 && mouseY < 535){
            image(mainMenuHoverHowToPlay, 0, 0);
            if(mouseIsPressed === true){spelStatus = UITLEG}
        }

        else if(mouseX > 205 && mouseX < 430 && mouseY > 500 && mouseY < 535){
            image(mainMenuHoverStart, 0, 0)
            if(mouseIsPressed === true){spelStatus = SPELEN}
        }

        else{image(mainMenu, 0, 0)}

    break;

    case UITLEG:

        //kijkt of de muis boven de knop zit en verandert de achtergrond op basis van dat
        if(mouseX > 10 && mouseX < 65 && mouseY > 650 && mouseY < 705){
            image(uitlegSchermHoverBack, 0, 0);
            if(mouseIsPressed === true){spelStatus = MAINMENU}
        }

        else{image(uitlegScherm, 0, 0)}

    break;
    
    case SPELEN:

        animatieTimer();

        beweegKogel();
        beweegVijand();
        beweegSpeler();

        checkVijandGeraakt();
        checkSpelerGeraakt();

        tekenVeld();
        tekenVijand();
        tekenSpeler(spelerX, spelerY);
        tekenKogel(kogelX, kogelY);

        scores();  

        //haalt elke seconde punten van de tijdsbonus af
        if (vijanden.length > 0 && tijdPunten >0){tijdPunten = tijdPunten -1}

        // berekent de kamerbonus
        kamerPunten = kamer * 400;
        
        //kijkt of alle vijanden in de kamer dood zijn, reset een aantal variabelen en berekent de score
        if (vijanden.length === 0 && spelerX > ((width/32)*31.5)-80 && spelerY > (height/9)* 3 && spelerY < (height/9)* 5 ){            
            score = score + tijdPunten + kamerPunten + vijandPunten;
            kamer = kamer + 1;

            setup();
            
            vijandPunten = 0;
            kamerPunten = 0;
            tijdPunten = 3000;
            
            spelerX = 40;
            spelerLeeft = true;

            splatterX.splice(0, splatterX.length);
            splatterY.splice(0, splatterY.length);
            splatterSize.splice(0, splatterSize.length);
            vijandDead.splice(0, vijandDead.length);
        } 

    break;
      
    case GAMEOVER:

        //reset een aantal variabelen
        for(var i = 0; i < vijanden.length; i++){

            vijanden.splice(i, 1);
            vijandX.splice(i, 1);
            vijandY.splice(i, 1);
            vijandScale.splice(i, 1);
            vijandSpeed.splice(i, 1);
            vijandLevens.splice(i, 1);
            vijandInvinsible.splice(i, 1);
            vijandDirection.splice(i, 1);
            vijandSize.splice(i, 1);
            i--;

        }

        kamer = 1;
        
        setup();
        
        vijandPunten = 0;
        kamerPunten = 0;
        tijdPunten = 3000;

        spelerX = 40;
        spelerLeeft = true;

        splatterX.splice(0, splatterX.length);
        splatterY.splice(0, splatterY.length);
        splatterSize.splice(0, splatterSize.length);
        vijandDead.splice(0, vijandDead.length);
     
        //kijkt of de muis boven de knop zit en verandert de achtergrond op basis van dat + tekent de totale score op het game over scherm
        textSize(30);
        textFont("fantasy");
        fill("white");
      
        if(mouseX > 1050 && mouseX < 1180 && mouseY > 425 && mouseY < 445){
            image(gameOverHoverRestart, 0, 0);
            text("score: " + score,  (width/5)*0.25, 20, 500, 500);
            if(mouseIsPressed === true){
                score = 0;
                spelStatus = SPELEN
            }
        }

        else if(mouseX > 1060 && mouseX < 1170 && mouseY > 475 && mouseY < 525){
            image(gameOverHoverMainMenu, 0, 0)
            text("score: " + score,  (width/5)*0.25, 20, 500, 500);
            if(mouseIsPressed === true){
                score = 0;
                spelStatus = MAINMENU
            }
        }

        else{
            image(gameOver, 0, 0)
            text("score: " + score,  (width/5)*0.25, 20, 500, 500);
        }
                   
    break;
   
  }

};
