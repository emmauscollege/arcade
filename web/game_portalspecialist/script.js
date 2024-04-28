/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const BEGIN = 0;
const SPELEN = 1;
const GAMEOVER = 2;
const WINKEL = 3;
const RESPAWNEN = 4;
var spelStatus = BEGIN;
var uitlegPlaatje = false;

var score = 0;
var highscore = 0;

var terugNaarMenu = false; // houdt bij of je net terug naar menu gaat
var naarWinkel = false; // houdt bij of je naar winkel gaat
var terugNaarGameOver = false;
var komtVanBeginScherm = false;

var vloerX = 640;
var vloerY = 625;

var vloerLengte = 800;
var vloerDikte = 300;

var spelerX = 600; // x-positie van speler
var spelerY = 560; // y-positie van speler
var spelerHoogte = 80;
var spelerOpGrond = true; 
var gerespawned = false;
var nuRespawnen = false;
var respawnTimer = 0;
var netGerespawned = false;
var netGerespawnedTimer = 0;

var spawnSnelheid = 999; // hoe lager hoe sneller 

var vijandenX = [300];
var vijandenY = [200];
var vijandDood = [false];

var grondVijandenX = [400];
var grondVijandenY = [591.25];
var grondVijandNetGespawned = [true];
var grondVijandLevens = [5];
var grondVijandPortalTimer = [0];
var spawnTimer = [0];
var geraaktTimer = [0];

var grondVijandHoogte = 67.5;
var grondVijandBreedte = 82.5;
var grondVijandSnelheid = 1;

var springIsBezig = false; // houd bij of je springt
var SpringPercentage = 100; // houd bij hoelang je springt

var SnelheidX = 4;
var vijandSnelheid = 1;

var portalHoogte = 100; // hoogte van portal
var portalBreedte = 50; // breedte van portal
var portal1X = 1000; // x-positie van portal 1
var portal1Y = 575; // y-positie van portal 1
var portal2X = 510; // x-positie van portal 2
var portal2Y = 385; // y-positie van portal 2
var komtVanPortal = false; // checkt of je net van portal komt
var komtVanPortalKogel = false;

var portal1Directie = false; // true is rechts, false is links
var portal2Directie = true; // true is rechts, false is links

var platformX = 580; // x-positie platform
var platformY = 450; // y-positie platform
var platformLengte = 300;
var platformDikte = 30;
var platformBotsing = false; // checkt of de player collide met het platform

var kometenX = [];
var kometenY = [];

var kometenGrootte = [25];
var kometenSnelheid = [2.5];
var kometenBezig = [false];
var nieuweKometen = [1];

var willekeurigNummers = [100];
var moeilijkheidGraad = 100000; // hoe lager hoe lastiger de game wordt
var hoeveelheidVijanden = 2; // hoe hoger hoe meer vijanden op elk moment in de game aanwezig is

var komeetGrootte = 25;

var middelpuntX = 300;
var middelpuntY = 500;

var zonHoek = 10;

var sterNummer = 0;
var sterGrootte;

var scoreBordLengte = 45;

var eenPuntX = [0];
var eenPuntY = [0];
var eenPuntZichtbaar = [false];
var eenPuntTimer = [0];

var driePuntenX = [0];
var driePuntenY = [0];
var driePuntenZichtbaar = [false];
var driePuntenTimer = [0];

var wapen = "spacePistool";

var spacePistoolSnelheid = 850;
var spacePistoolX = 0;
var spacePistoolY = -7.5;
var spacePistoolBreedte = 20;
var spacePistoolHoogte = 15;

var spaceWapenSnelheid = 550;
var spaceWapenX = 0;
var spaceWapenY = -13;
var spaceWapenBreedte = 30;
var spaceWapenHoogte = 20;

var spaceBeterWapenSnelheid = 300;
var spaceBeterWapenX = -10;
var spaceBeterWapenY = -10;
var spaceBeterWapenBreedte = 40;
var spaceBeterWapenHoogte = 16;

var spaceBesteWapenSnelheid = 0;
var spaceBesteWapenX = -5;
var spaceBesteWapenY = -10;
var spaceBesteWapenBreedte = 35;
var spaceBesteWapenHoogte = 25;

var magWeerSchieten = true;
var schietSnelheid = spacePistoolSnelheid; // in ms

var aantalMunten = 0;
var muntenTeller = 0; // Houdt bij hoeveel munten erbij moeten komen
var muntenRuimte = 1200; // Hoe groter aantalMunten wordt hoe kleiner dit getal moet worden
var nietGenoegMuntenTimer = 0;
var nietGenoegMuntenZichtbaar = false;

var spaceWapenGekocht = false;
var spaceBeterWapenGekocht = false;
var spaceBesteWapenGekocht = false;

// Plaatjes 
var backgroundImage = 0;
var spelerCrouch = 0;
var spelerJump = 0;
var crosshairImage = 0;
var startCursor = 0;
var startKnop = 0;
var startUitleg = 0;
var uitleg = 0;
var gameNaam = 0;
var menu = 0;
var retry = 0;
var gameOver = 0;
var respawn = 0;

var een = 0;
var twee = 0;
var drie = 0;

var vloer = 0;
var platform = 0;
var platformPoten = 0;

var laatsteDirectie = true; // true is recht, false is links
var vijandDirectie = true; // true is recht, false is links
var grondVijandDirectie = [false];

var spacePistool = 0;
var spaceWapen = 0;
var spaceBeterWapen = 0;
var spaceBesteWapen = 0;
var kogel = 0;

var loopImage0 = 0;
var loopImage1 = 0;
var loopImage2 = 0;
var loopImage3 = 0;
var loopImage4 = 0;
var loopImage5 = 0;
var loopImage6 = 0;
var loopImage7 = 0;

var spelerStaat = 0;

var vijand0 = 0;
var vijand1 = 0;
var vijand2 = 0;
var vijand3 = 0;

var grondVijand0 = 0;
var grondVijand1 = 0;
var grondVijand2 = 0;
var grondVijand3 = 0;
var grondVijandSpawn = 0;
var grondVijandDamage = 0;

var portalAnimatie0 = 0;
var portalAnimatie1 = 0;
var portalAnimatie2 = 0;
var portalAnimatie3 = 0;

var komeet0 = 0;
var komeet1 = 0;
var komeet2 = 0;
var komeet3 = 0;
var komeet4 = 0;
var komeet5 = 0;
var komeet6 = 0;
var komeet7 = 0;
var komeet8 = 0;
var komeet9 = 0;
var komeet10 = 0;

var scoreTijdensGame = 0;
var scoreBord = 0;
var highscoreBord = 0;

var eenPunt = 0;
var driePunten = 0;

var zon = 0;
var voorAchterGrond = 0;
var ster = 0;

var munt = 0;
var winkel = 0;
var winkelGroot = 0;
var wapenWinkel = 0;
var kopen = 0;
var equip = 0;
var equipped = 0;
var honderdMunten = 0;
var duizendMunten = 0;
var tienduizendMunten = 0;
var nietGenoegMunten = 0;

var loopAnimatie;
var portalAnimatie;
var komeetAnimatie;
var grondVijandAnimatie;

var vijandNummer = 0;
var vijandenNummers = [0];
var grondVijandenNummers = [0];
var arrayLoopNummer = 0;
var arrayPortalNummer = 0;
var kometenNummers = [0];
var komeetBezig = false; // houdt bij of er een komeet aanwezig is

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/*
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */

// vijand

// kogel

// speler
function CheckBeweegingSpeler() {
  // bukken
  if (keyIsDown(16) && (spelerOpGrond || platformBotsing)) {
    arrayLoopNummer = 8;
  }
  else if (keyIsDown(68) && !keyIsDown(65)) {
    spelerX = spelerX + SnelheidX;
    laatsteDirectie = true;
    if (arrayLoopNummer < 7){
      arrayLoopNummer += 0.25;
    }
    else{
      arrayLoopNummer = 0;
    }
  }
  else if (keyIsDown(65) && !keyIsDown(68)) {   
    spelerX = spelerX - SnelheidX;
    laatsteDirectie = false;
    if (arrayLoopNummer < 7){
      arrayLoopNummer  += 0.25;
    }
    else{
      arrayLoopNummer = 0;
    }
  }
  else{
    spelerHoogte = 80;
    arrayLoopNummer = 10;
  }
  //springen

  if (keyIsDown(32) && (spelerOpGrond === true || platformBotsing === true)) {
    springIsBezig = true;
  }

  if(springIsBezig === true) {
    SpringPercentage = SpringPercentage - 1;
    spelerY = spelerY - (SpringPercentage / 10);
    if(SpringPercentage <= 0) {
      springIsBezig = false
      SpringPercentage = 100;
    }
  }
}

function resetSchieten(){
  magWeerSchieten = true;
}

function mouseClicked() {
  if(spelStatus === SPELEN) {
    // je kan pas weer schieten na een vertraging
    if (magWeerSchieten){
      spelerSchieten(); 
      setTimeout(resetSchieten, schietSnelheid);
      magWeerSchieten = false;
    }

  }
}

function zwaartekracht() {
  //checkt of de speler ergens op staat
  if (spelerY < vloerY - 40 || (spelerX < vloerX - 400 || spelerX > vloerX + 400)){
    spelerOpGrond = false
    spelerY += 4;
  }
  else {
    spelerOpGrond = true
  }

}

//spaceWapen
var mouseDiffX = 0;
var mouseDiffY = 0;

var weaponX = 0;
var weaponY = 0;

var weaponOffsetX = 0
var weaponOffsetY = -20

var weaponDirectionDeg = 0;

var WV;

function berekenWapen() {

  mouseDiffX = mouseX - ( spelerX + weaponOffsetX );
  mouseDiffY = mouseY - ( spelerY + weaponOffsetY );

  var vectorLength = 22

  if(mouseX < spelerX) {
    vectorLength = vectorLength * -1;
  }


  weaponDirectionDeg = Math.atan(mouseDiffY / mouseDiffX)
  WV = p5.Vector.fromAngle(weaponDirectionDeg, vectorLength);
  
  weaponX = WV.x
  weaponY = WV.y

}

var kogels = new Array;
var kogelVector

var diffXKogel;
var diffYKogel;

var kogelX;
var kogelY;

var KogelVectorDirection;

var kogelSnelheid = 0.5

var rotated = Boolean

function spelerSchieten() {
  
  kogelX = WV.x + spelerX
  kogelY = WV.y + spelerY
  
  if (mouseX > spelerX) {
    diffXKogel = ( kogelX - spelerX) 
  } 
  else {
    diffXKogel = ( spelerX - kogelX) * -1 
  }

  if (mouseY > spelerY) {
    diffYKogel = ( kogelY - spelerY)
  }
  else {
    diffYKogel = ( spelerY - kogelY) * -1
  }

  diffXKogel *= kogelSnelheid
  diffYKogel *= kogelSnelheid

  if (mouseDiffX >= 0){
    //rotate x deg (5th of kogels)
    rotated = true
  }
  else {
    rotated = false
  }
  
  kogels.push([kogelX, kogelY, diffXKogel, diffYKogel, weaponDirectionDeg, rotated, komtVanPortal])
}

var LoopKogelX = 0;
var LoopKogelY = 0;

function berekenKogel() {
  for(var i = 0; i < kogels.length; i++) {
    LoopKogelX = kogels[i][0];
    LoopKogelY = kogels[i][1]
    
    //kogel      = kogel        +  Diff             
    //X
    kogels[i][0] = kogels[i][0] + ( kogels[i][2] )
    //Y
    kogels[i][1] = kogels[i][1] + ( kogels[i][3] )

    //Als buiten scherm, delete
    if(LoopKogelX < -50 || LoopKogelX > 2000) {
      kogels.splice(i, 1)
    }
    if(LoopKogelY < -50 || LoopKogelY > 1200) {
      kogels.splice(i, 1)
    }

    //checkt of kogel tegen platform aan gaat of niet
    if (LoopKogelY > platformY - 0.5 * platformDikte 
      && LoopKogelY < platformY + platformDikte * 0.5 
      && LoopKogelX < platformX + platformLengte * 0.5 
      && LoopKogelX > platformX - 0.5 * platformLengte)
      {
      kogels.splice(i, 1)
    }

    //checkt of kogel tegen vloer gaat
    if (LoopKogelY > vloerY
      && LoopKogelX < vloerX + vloerLengte * 0.5 
      && LoopKogelX > vloerX - 0.5 * vloerLengte)
      {
      kogels.splice(i, 1)
    }
  }
}
function tekenKogel() {
  fill("black")
  for(var i = 0; i < kogels.length; i++) {
    
    push()

    //zet origin naar kogels
    translate(kogels[i][0], kogels[i][1]);
    //no angle is used, but it doesnt work without it
    angleMode(RADIANS)

    rotate(kogels[i][4])

    if (kogels[i][5] == false){
      //draait kogel als ie links van speler is
      scale(-1);
    }

    //tekend image
    image(kogel,-10, -5, 20, 10);
    pop();
    
  }
}

//Portal
function resetPortal() {
  komtVanPortal = false;
} 

function resetGrondVijandTimer(){
  // dit zorgt ervoor dat de grondVijand niet gelijk terug teleporteerd
  for(var i = 0; i < grondVijandenX.length; i++){
    if (grondVijandPortalTimer[i] > 0){
      grondVijandPortalTimer[i]--; 
    }
    else{
      grondVijandPortalTimer[i] = 0;
    }
  }
}

function portal(x, y , voorwerp, arrayNummer){
  console.log(grondVijandSnelheid)
  if (x > (portal1X - 0.5 * portalBreedte) && 
      x < (portal1X + 0.5 * portalBreedte) && 
      y > (portal1Y - 0.5 * portalHoogte) && 
      y < (portal1Y + 0.5 * portalHoogte) && 
      komtVanPortal === false)
      {
    
    switch (voorwerp){
      case "speler" :
        spelerX = portal2X;
        spelerY = portal2Y + 0.5 * portalHoogte - 0.5 * spelerHoogte;
        komtVanPortal = true;
        setTimeout(resetPortal, 500);
        break;
      case "vijand" :
        vijandenX[arrayNummer] = portal2X;
        vijandenY[arrayNummer] = portal2Y;
        komtVanPortal = true;
        setTimeout(resetPortal, 500);
        break;
      case "grondVijand" :
        if (grondVijandPortalTimer[arrayNummer] === 0){
          grondVijandenX[arrayNummer] = portal2X;
          grondVijandenY[arrayNummer] = portal2Y + 0.5 * portalHoogte - 0.5 * grondVijandHoogte;
          grondVijandPortalTimer[arrayNummer] = 25;
        }
        break;
      
    }
  }
  else if (x > (portal2X - 0.5 * portalBreedte) &&
           x < (portal2X + 0.5 * portalBreedte) &&
           y > (portal2Y - 0.5 * portalHoogte) && 
           y < (portal2Y + 0.5 * portalHoogte) && 
           komtVanPortal === false){
    switch (voorwerp){
      case "speler" :
        spelerX = portal1X;
        spelerY = portal1Y + 0.5 * portalHoogte - 0.5 * spelerHoogte;
        komtVanPortal = true;
        setTimeout(resetPortal, 500);
        break;
      case "vijand" :
        vijandenX[arrayNummer] = portal1X;
        vijandenY[arrayNummer] = portal1Y;
        komtVanPortal = true;
        setTimeout(resetPortal, 500);
        break;
      case "grondVijand" :
        if (grondVijandPortalTimer[arrayNummer] === 0){
          grondVijandenX[arrayNummer] = portal1X;
          grondVijandenY[arrayNummer] = portal1Y + 0.5 * portalHoogte - 0.5 * grondVijandHoogte;
          grondVijandPortalTimer[arrayNummer] = 25;
        }
        break;
    }
  }
}

function portalKogels(x, y) {
  for(var i = 0; i < kogels.length; i++) {
    fill("white")
    text(kogels[i][6], 10, 10, 100, 100)

    x = kogels[i][0]
    y = kogels[i][1]
     
    if (x > (portal1X - 0.5 * portalBreedte) && 
        x < (portal1X + 0.5 * portalBreedte) && 
        y > (portal1Y - 0.5 * portalHoogte) && 
        y < (portal1Y + 0.5 * portalHoogte) && 
            kogels[i][6] === false)
        {
          timeoutKogelPortal(i)
          TeleportKogels(1, i)
          
          setTimeout(function() { resetKogelPortal(i); }, 100);

          return;
          
        }
    else if (x > (portal2X - 0.5 * portalBreedte) && 
        x < (portal2X + 0.5 * portalBreedte) && 
        y > (portal2Y - 0.5 * portalHoogte) && 
        y < (portal2Y + 0.5 * portalHoogte) && 
            kogels[i][6] === false)
        {
          timeoutKogelPortal(i)
          TeleportKogels(2, i)

          setTimeout(function() { resetKogelPortal(i); }, 100);

          return;
        }
  }
}

function resetKogelPortal(KogelArrayNummer) {
  try {
    kogels[KogelArrayNummer][6] = false;
  }
  catch {
    throw "shit code";
  }
}

function timeoutKogelPortal(KogelArrayNummer) {
  kogels[KogelArrayNummer][6] = true;
}

function TeleportKogels(IncomingPortal, KogelArrayNummer) {
  if(IncomingPortal === 1) {
    kogels[KogelArrayNummer][0] = portal2X;
    kogels[KogelArrayNummer][1] = portal2Y;
  }
  else {
    kogels[KogelArrayNummer][0] = portal1X;
    kogels[KogelArrayNummer][1] = portal1Y;
  }
}

function kogelOpVijandCheck() {
  //Kogel loop
  for(var i = 0; i < kogels.length; i++) {
    //Grondvijand botsing
    for(var j = 0; j < grondVijandenX.length; j++) {
      if (kogels[i][0] > grondVijandenX[j] - 0.5 * grondVijandBreedte &&
          kogels[i][0] < grondVijandenX[j] + 0.5 * grondVijandBreedte &&
        
          kogels[i][1] > grondVijandenY[j] - 0.1 * grondVijandHoogte &&
          kogels[i][1] < grondVijandenY[j] +  0.5 * grondVijandHoogte) 
          {
            if(grondVijandLevens[j] === 1) {
              score += 3;
              driePuntenX[j] = grondVijandenX[j];
              driePuntenY[j] = grondVijandenY[j];
              driePuntenZichtbaar[j] = true;

              grondVijandenX.splice(j, 1);
              grondVijandenY.splice(j, 1);
              grondVijandLevens.splice(j, 1);
              grondVijandDirectie.splice(j, 1);
              grondVijandNetGespawned.splice(j, 1);
              grondVijandenNummers.splice(j, 1);
              spawnTimer.splice(j, 1);
              geraaktTimer.splice(j, 1);
              grondVijandPortalTimer.splice(j,1);
            }
            else if (!grondVijandNetGespawned[j]){
              grondVijandLevens[j]--;
              grondVijandenNummers[j] = 4;
            }

            kogels.splice(i, 1);

            return;
          }
    }
  }
  for (var i = 0; i < kogels.length; i++){
     //Vijand botsing
     for (var j = 0; j < vijandenX.length; j++) {
      if (kogels[i][0] > vijandenX[j] - 55 &&
          kogels[i][0] < vijandenX[j] + 55 &&

          kogels[i][1] > vijandenY[j] - 45 &&
          kogels[i][1] < vijandenY[j] + 45) 
          {
            score++;
            eenPuntX[j] = vijandenX[j];
            eenPuntY[j] = vijandenY[j];
            eenPuntZichtbaar[j] = true;

            vijandDood[j] = true;
            vijandenX.splice(j, 1);
            vijandenY.splice(j, 1);
            vijandenNummers.splice(j, 1);
            kogels.splice(i, 1);

            return;
          }
      }
  }
}

function spawnVijanden(){
  // spawnt de vijanden (gebaseerd op een geluksfactor en daarnaast is altijd een minimaal aantal vijanden in het spel)
  spawnSnelheid -= 0.0001;
  if (random(350, 1000) > spawnSnelheid){
    vijandenX.push(random() < 0.5 ? 1 : 1279);
    vijandenY.push(random(50, 200));
  }
  else if (vijandenX.length < hoeveelheidVijanden + 1){
    vijandenX.push(random() < 0.5 ? 1 : 1279);
    vijandenY.push(random(50, 200));
  }
  if (random(0, 1000) > spawnSnelheid){
    grondVijandenX.push(random(vloerX - 0.4 * vloerLengte, vloerX + 0.3 * vloerLengte));
    grondVijandenY.push(591.25);
    grondVijandNetGespawned.push(true);
    grondVijandLevens.push(5);
  }
  else if (grondVijandenX.length < hoeveelheidVijanden){
    grondVijandenX.push(random(vloerX - 0.4 * vloerLengte, vloerX + 0.3 * vloerLengte));
    grondVijandenY.push(591.25);
    grondVijandNetGespawned.push(true);
    grondVijandLevens.push(5);
  }
}

function enemy() {
  // zorgt dat alle arrays gesynched blijven
  if (grondVijandenX.length > grondVijandenNummers.length){
    grondVijandenNummers.push(0);
    grondVijandDirectie.push(false);
    grondVijandPortalTimer.push(0);
    spawnTimer.push(0);
    geraaktTimer.push(0);
    driePuntenZichtbaar.push(false);
    driePuntenX.push(0);
    driePuntenY.push(0);
    driePuntenTimer.push(0);
  }

  if (vijandenX.length > vijandenNummers.length){
    vijandenNummers.push(0);
    vijandDood.push(false);
    eenPuntZichtbaar.push(false);
    eenPuntX.push(0);
    eenPuntY.push(0);
    eenPuntTimer.push(0);
  }

  // zorgt voor verandering uiterlijk als een vijand geraakt is en zo niet zorgt het voor een loop animatie
  for (var i = 0; i < grondVijandenNummers.length; i++){
    if (grondVijandenNummers[i] === 4){
      geraaktTimer[i]++;
      if (geraaktTimer[i] > 20){
        grondVijandenNummers[i] = 0;
        geraaktTimer[i] = 0;
      }
    }
    else if (grondVijandenNummers[i] < 3){
      grondVijandenNummers[i] += 0.08;
    }
    else{
      grondVijandenNummers[i] = 0;
    }

    //checkt of de grondVijand op de vloer staat en zorgt ervoor dat het niet verder kan dan de zijkanten van de vloer
    if (grondVijandenY[i] + 0.5  * grondVijandHoogte === vloerY){
      if (grondVijandenX[i] >= vloerX + 0.5 * vloerLengte){
        grondVijandDirectie[i] = true;
      }
      if (grondVijandenX[i] <= vloerX - 0.5 * vloerLengte){
        grondVijandDirectie[i] = false;
      }
    }

    //checkt of de grondVijand op het platform staat en zorgt ervoor dat het niet verder kan dan de zijkanten van het platform
    if (grondVijandenY[i] + 0.5 * grondVijandHoogte === platformY - 0.5 * platformDikte){
      if (grondVijandenX[i] >= platformX + 0.3 * platformLengte){
        grondVijandDirectie[i] = true;
      }
      if (grondVijandenX[i] <= platformX - 0.3 * platformLengte){
        grondVijandAnimatie[i] = false;
      }
    }

    // laat de grondVijand bewegen
    if (grondVijandDirectie[i] && !grondVijandNetGespawned[i]){
      grondVijandenX[i] -=  grondVijandSnelheid;
    }
    if (!grondVijandDirectie[i] && !grondVijandNetGespawned[i]){
      grondVijandenX[i] += grondVijandSnelheid;
    }  
  }

  // animeert de luchtvijand
  for (var i = 0; i < vijandenNummers.length; i++){
    if (vijandenNummers[i] < 3){
      vijandenNummers[i] += 0.065;
    }
    else{
      vijandenNummers[i] = 0;
    }
  }

  // beweegt de luchtvijand over de x-as
  for (var i = 0; i < vijandenX.length; i++){
    if (vijandenX[i] < spelerX){
     vijandenX[i] += vijandSnelheid + 0.5 * i;
   }
    else if (vijandenX[i] > spelerX){
     vijandenX[i] -= vijandSnelheid + 0.5 * i;
    }
  }

}


function vijandAanval(){
  // deze functie zorgt ervoor dat de vijand om een willekeurige tijd een komeet laat vallen

  if(moeilijkheidGraad > 50000){
    moeilijkheidGraad -= 1;
  }

  for (var i = 0; i < vijandenX.length; i++){
    willekeurigNummers[i] = random(1, 1000);

    if(!kometenBezig[i]){
      kometenX[i] = vijandenX[i];
      kometenY[i] = vijandenY[i];
    }
    if (vijandenX.length > kometenNummers.length){
      kometenNummers.push(0);
      kometenGrootte.push(25);
      kometenBezig.push(false);
      kometenSnelheid.push(2.5);
      nieuweKometen.push(1);
      willekeurigNummers.push(100);
    }

    if (kometenNummers[i] < 10){
      kometenNummers[i] += 0.15;
    }
    else {
     kometenNummers[i] = 0;
    }
    if (nieuweKometen[i] < moeilijkheidGraad){
      nieuweKometen[i] += random(0, willekeurigNummers[i]);
    }
    else {
      nieuweKometen[i] = 0;
      kometenGrootte[i] = random(20, 60);
      kometenSnelheid[i] = random(1.5, 5);
    }

    if (nieuweKometen[i] === 0 || kometenBezig[i]){
      kometenBezig[i] = true;
      kometenY[i] += kometenSnelheid[i];
      image(komeetAnimatie[round(kometenNummers[i])], kometenX[i] - komeetGrootte * 0.5, kometenY[i] - 0.75 * kometenGrootte[i], kometenGrootte[i], kometenGrootte[i] * 1.5);
      
      // stopt de komeet als die op de grond komt
      if ((kometenY[i] > 720 &&
          (kometenX[i] < vloerX - 0.5 * vloerLengte || 
          kometenX[i] > vloerX + 0.5 * vloerLengte)) || 
          (kometenY[i] > 585 && 
          kometenX[i] > vloerX - 0.5 * vloerLengte && 
          kometenX[i] < vloerX + 0.5 * vloerLengte) || 
          (kometenX[i] > platformX - 0.5 * platformLengte && 
          kometenX[i] < platformX + 0.5 * platformLengte && 
          kometenY[i] > platformY - 1.5 * platformDikte))
        {
          kometenBezig[i] = false;
          kometenX[i] = vijandenX[i];
          kometenY[i]= vijandenY[i];

          // als de vijand waarvan de komeet komt dood is, wordt de komeet verwijderd
          if (vijandDood[i] === true){
            vijandDood.splice(i, 1);
            kometenGrootte.splice(i, 1);
            kometenBezig.splice(i, 1);
            kometenNummers.splice(i, 1);
            kometenSnelheid.splice(i, 1);
            kometenX.splice(i, 1);
            kometenY.splice(i, 1);
          }
        }
    }
  }

}

/**
 * Checkt botsingen
 * Verwijdert neergeschoten vijanden
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  // timer zodat je als je respawnt je niet gelijk dood kan
  if (netGerespawned){
    netGerespawnedTimer++;
    if (netGerespawnedTimer > 180){
      netGerespawned = false;
    }
  }

  // zorgt ervoor dat de speler niet door het platform en de vloer kan gaan
  if (spelerY > 585){
    if (spelerX < vloerX - 400){
      spelerX = constrain(spelerX, 0, vloerX - 420);
    }
    if (spelerX > vloerX + 400){
      spelerX = constrain(spelerX, vloerX + 420, 1280);
    }
  }
  
  if ( spelerY < platformY + 0.5 * platformDikte && spelerY > platformY - 0.5 * platformDikte){
    if ( spelerX < platformX){
      spelerX = constrain(spelerX, 0 , platformX - 0.5 * platformLengte);
    }
    if ( spelerX > platformX){
      spelerX = constrain(spelerX, platformX + 0.5 * platformLengte, 1280);
    }
  }
  if (spelerX > platformX - 0.5 * platformLengte && spelerX < platformX + 0.5 * platformLengte){
    if (spelerY > platformY){
      spelerY = constrain(spelerY, platformY + 0.5 * platformDikte + 0.5 * spelerHoogte, vloerY);
    }
    else if (spelerY < platformY){
      spelerY = constrain(spelerY, 0, platformY - 0.5 * platformDikte - 0.5 * spelerHoogte);
    }

  }

  //speler botsing met platform
  if (spelerY === platformY - 0.5 * platformDikte - 0.5 * spelerHoogte){
    platformBotsing = true;
  } 
  else {
    platformBotsing = false;
  }
  
  if (spelerX > platformX - 0.5 * platformLengte && 
    spelerX < platformX + 0.5 * platformLengte && 
    spelerY <= platformY + 0.5 * platformDikte + 0.5 * spelerHoogte &&
    spelerY > platformY){
    SpringPercentage = 25;
  }

  // botsing speler tegen vijand
  for (var i = 0; i < vijandenX.length; i++){
    vijandenX[i] = constrain(vijandenX[i], 0, 1280);
    if (spelerX - 25 < (kometenX[i] + 0.5 * kometenGrootte[i]) 
    && spelerX + 25 > (kometenX[i] - 0.5 * kometenGrootte[i]) 
    && spelerY - 25 < (kometenY[i] + 0.5 * kometenGrootte[i]) 
    && spelerY + 25 > (kometenY[i] - 0.5 * kometenGrootte[i])
    && !netGerespawned) {
      if (!gerespawned){
        spelStatus = RESPAWNEN;
      }
      else{
        spelStatus = GAMEOVER;
        setTimeout(eind, 1000);
      }
    }
    if ( (spelerX + 25) > (vijandenX[i] - 25) && (spelerX - 25) < (vijandenX[i] + 25) && (spelerY - 25) < (vijandenY[i] + 25) && (spelerY + 25) > (vijandenY[i]  - 25) || spelerY > 720 && !netGerespawned) {
      if (!gerespawned){
        spelStatus = RESPAWNEN;
      }
      else{
        spelStatus = GAMEOVER;
        setTimeout(eind, 1000);
      }
    }
  }

  // botsing speler met grondVijand
  for (var i = 0; i < grondVijandenX.length; i++){
    if (spelerX - 25 < (grondVijandenX[i] + 0.5 * grondVijandBreedte) 
    && spelerX + 25 > (grondVijandenX[i] - 0.5 * grondVijandBreedte) 
    && spelerY - 25 < (grondVijandenY[i] + 0.5 * grondVijandHoogte) 
    && spelerY + 25 > (grondVijandenY[i] - 0.5 * grondVijandHoogte) 
    && !grondVijandNetGespawned[i]
    && !netGerespawned) {
      if (!gerespawned){
        spelStatus = RESPAWNEN;
      }
      else{
        spelStatus = GAMEOVER;
        setTimeout(eind, 1000);
      }
    }
  }

};


var huidigWapen = spacePistool
var huidigWapenSnelheid = spacePistoolSnelheid
var huidigWapenX = spacePistoolX
var huidigWapenY = spacePistoolY
var huidigWapenBreedte = spacePistoolBreedte
var huidigWapenHoogte = spacePistoolHoogte
function tekenWapen() {
  
  push()
  translate(spelerX, spelerY)

  /*
  //offset on player
  if(laatsteDirectie === true) {
    translate (-20, -15)
  }
  else(
    translate (20, -15)
  )
  */
  
  //scale to size
  angleMode(RADIANS)
  scale(1.6)

  if(mouseDiffX < 0) {
    scale(-1, -1)
  }

  //rotate
  rotate(weaponDirectionDeg)
  if (wapen === "spacePistool"){
    huidigWapen = spacePistool;
    huidigWapenSnelheid = spacePistoolSnelheid;
    huidigWapenX = spacePistoolX;
    huidigWapenY = spacePistoolY;
    huidigWapenBreedte = spacePistoolBreedte;
    huidigWapenHoogte = spacePistoolHoogte;
  }
  else if (wapen === "spaceWapen"){
    huidigWapen = spaceWapen;
    huidigWapenSnelheid = spaceWapenSnelheid;
    huidigWapenX = spaceWapenX;
    huidigWapenY = spaceWapenY;
    huidigWapenBreedte = spaceWapenBreedte;
    huidigWapenHoogte = spaceWapenHoogte;
  }
  else if (wapen === "spaceBeterWapen"){
    huidigWapen = spaceBeterWapen;
    huidigWapenSnelheid = spaceBeterWapenSnelheid;
    huidigWapenX = spaceBeterWapenX;
    huidigWapenY = spaceBeterWapenY;
    huidigWapenBreedte = spaceBeterWapenBreedte;
    huidigWapenHoogte = spaceBeterWapenHoogte;
  }
  else if (wapen === "spaceBesteWapen"){
    huidigWapen = spaceBesteWapen;
    huidigWapenSnelheid = spaceBesteWapenSnelheid;
    huidigWapenX = spaceBesteWapenX;
    huidigWapenY = spaceBesteWapenY;
    huidigWapenBreedte = spaceBesteWapenBreedte;
    huidigWapenHoogte = spaceBesteWapenHoogte;
  }
  

  schietSnelheid = huidigWapenSnelheid;
  if(mouseDiffX < 0) {
    scale(1, -1)
  }
  image(huidigWapen, huidigWapenX, huidigWapenY, huidigWapenBreedte, huidigWapenHoogte);
  
  pop();
}

function achtergrond(){
  // tekent de achtergrond (inclusief de animaties op de achtergrond)
  angleMode(DEGREES);

  // laat de zon sneller bewegen als die niet in zicht is
  if (zonHoek < 360){
    zonHoek += 0.01;
    if (zonHoek > 155 && zonHoek < 360){
      zonHoek += 0.5;
    }
  }
  else{
    zonHoek = 0;
  }

  sterGrootte = random(5,25);

  if (sterNummer < 10000){
    sterNummer += random(1, 100);
  }
  else{
    sterNummer = 0;
  }

  // achtergrond
  image(backgroundImage, 0 ,0 , 1280, 720);

  // tekent de zon
  push();
  translate(middelpuntX, middelpuntY);
  rotate(zonHoek);
  image(zon, -250 ,-50, 35, 35);
  pop();
  
  if (sterNummer === 0){
    image(ster, random(0, 750), random(0, 200), sterGrootte, sterGrootte);
  }
  
  image(voorAchterGrond, 0, 0, 1280, 720);
}



/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  
  // vloer
  image(vloer, vloerX - 400, vloerY, 800, 300);
  image(platformPoten, platformX - 0.5 * platformLengte, platformY - 0.5 * platformDikte, 320, 192);
  image(platform, platformX - 0.5 * platformLengte, platformY - 0.5 * platformDikte, platformLengte, platformDikte);

  // portals
  if (arrayPortalNummer < 3)
  {
    arrayPortalNummer += 0.15;
  }
  else {
    arrayPortalNummer = 0;
  }

  push();
  translate(portal1X, portal1Y);
  if (portal1Directie) {
    scale(-1,1);
  }
  image(portalAnimatie[round(arrayPortalNummer)], - portalBreedte * 0.5, - portalHoogte * 0.5, portalBreedte, portalHoogte);
  pop();

  push();
  translate(portal2X, portal2Y);
  if (portal2Directie) {
    scale(-1,1);
  }
  image(portalAnimatie[round(arrayPortalNummer)], - portalBreedte * 0.5, - portalHoogte * 0.5, portalBreedte, portalHoogte);
  pop();

  // vijand
  for (var i = 0; i < vijandenX.length; i++){
    push();
    translate(vijandenX[i], vijandenY[i]);
    image(vijandAnimatie[round(vijandenNummers[i])], -55, -45, 110, 90);
    pop();     
  }

  // grondvijand
  for (var i = 0; i < grondVijandenNummers.length; i++){
    push();
    translate(grondVijandenX[i], grondVijandenY[i]);
    if (!grondVijandDirectie[i]) {
      scale(-1,1);
    }
    if (grondVijandNetGespawned[i]){
      image(grondVijandSpawn, -41.25, -33.75, grondVijandBreedte, grondVijandHoogte);
      spawnTimer[i]++;
      if (spawnTimer[i] > 180){
        grondVijandNetGespawned[i] = false;
        spawnTimer[i] = 0;
      }
    }
    else {
      image(grondVijandAnimatie[round(grondVijandenNummers[i])], -41.25, -33.75, grondVijandBreedte, grondVijandHoogte);
    }
    pop();     
  }

  // speler
  push();
  translate(spelerX, spelerY);
  if (!laatsteDirectie) {
    scale(-1,1);
  }
  image(loopAnimatie[round(arrayLoopNummer)], -40, -40, 80, 80);
  pop();
  

  // crosshair
  image(crosshairImage, mouseX - 15, mouseY - 15, 30, 30);

  // punten
  score += 1/60;

  // laat 1 punt erbij zien als je een luchtvijand dood
  for (var i = 0; i < eenPuntX.length; i++){
    push();
    translate(eenPuntX[i], eenPuntY[i]);
    if (eenPuntZichtbaar[i]){
      eenPuntTimer[i]++;
      image(eenPunt, 0, 0, 20, 20);
      if (eenPuntTimer[i] > 60){
        eenPuntX.splice(i, 1);
        eenPuntY.splice(i, 1);
        eenPuntZichtbaar.splice(i, 1);
        eenPuntTimer.splice(i, 1);
      }
    }
    pop();
  }

  // laat 3 punten erbij zien als je een grondVijand dood
  for (var i = 0; i < driePuntenX.length; i++){
    push();
    translate(driePuntenX[i], driePuntenY[i]);
    if (driePuntenZichtbaar[i]){
      driePuntenTimer[i]++;
      image(driePunten, 0, 0, 20, 20);
      if (driePuntenTimer[i] > 60){
        driePuntenX.splice(i, 1);
        driePuntenY.splice(i, 1);
        driePuntenZichtbaar.splice(i, 1);
        driePuntenTimer.splice(i, 1);
      }
    }
    pop();
  }

  // checkt de score en zorgt dat de game lastiger wordt
  if (score < 9.5){
    scoreBordLengte = 40;
    hoeveelheidVijanden = 1;
  }
  if (score >= 9.5){
    scoreBordLengte = 55;
    hoeveelheidVijanden = 2
  }
  if (score >= 99.5){
    scoreBordLengte = 75;
    hoeveelheidVijanden = 3;
    grondVijandSnelheid = 1.2;
  }
  if (score >= 999.5){
    scoreBordLengte = 90;
    hoeveelheidVijanden = 4;
    grondVijandSnelheid = 1.4;
  }
  image(scoreTijdensGame, 0, 0, scoreBordLengte, 50);
  textSize(35);
  fill('black');
  text(round(score), 10, 35);

  muntenTeller = round(score);
};


function tekenBeginScherm(){
  achtergrond();

  // tekent de knopjes op beginscherm
  if (uitlegPlaatje === true){
    image(uitleg, 640 - 150, 350 - 150, 300, 300);
    fill("black")
    textSize(12);
    text("Het doel van Portal Specialist is om zo lang \nmogelijk te overleven terwijl je vijanden verslaat. \nGebruik je A en D knop \nom naar links en rechts te bewegen. \nGebruik je SHIFT en SPATIE \nom te bukken en te springen.", 510, 320);
  }
  else{
    image(startKnop, 640 - 0.5 * 193.3, 450 - 33, 193.3, 66);
    image(startUitleg, 640 - 0.5 * 193.3, 550 - 33, 193.3, 66);
    image(winkel, 640 - 0.5 * 193.3, 650 - 33, 193.3, 66)
  }
  fill("white");
  textSize(40);
  text(round(aantalMunten), muntenRuimte, 35);
  image(munt, 1240, 0, 40, 40);
  image(gameNaam, 640 - 339, 100 - 64, 678, 128);
  image(startCursor, mouseX - 30, mouseY - 40, 40, 50);
}

function start() {

  // zorgt ervoor dat de bij het beginscherm de knopjes werken
  terugNaarMenu = false;
  if(mouseX > 640 - 0.5 * 193,3 && mouseX < 640 + 193.3 * 0.5 && mouseY > 450 - 33 && mouseY < 450 + 33 && mouseIsPressed){
    spelStatus = SPELEN;
  }
  if(mouseX > 640 - 0.5 * 193,3 && mouseX < 640 + 193.3 * 0.5 && mouseY > 550 - 33 && mouseY < 550 + 33 && mouseIsPressed){
    uitlegPlaatje = true;
  }
  if(mouseX > 640 - 0.5 * 193,3 && mouseX < 640 + 193.3 * 0.5 && mouseY > 650 - 33 && mouseY < 650 + 33 && mouseIsPressed){
    naarWinkel = true;
    komtVanBeginScherm = true;
    spelStatus = WINKEL;
  }
  if (mouseX > 720 && mouseX < 770 && mouseY > 230 && mouseY < 280 && mouseIsPressed){
    uitlegPlaatje = false;
  }
}

function eind() {
  // zorgt ervoor dat de bij het eindscherm knopjes werken
  terugNaarGameOver = false;
  if(mouseX > 640 - 0.5 * 193,3 && mouseX < 640 + 193.3 * 0.5 && mouseY > 450 - 33 && mouseY < 450 + 33 && mouseIsPressed){
    if (muntenTeller > 0){
      aantalMunten += muntenTeller;
    }
    spelerX = 600;
    spelerY = 560;
    score = 0;
    vijandenX = [0];
    vijandenY = [200];
    vijandenNummers = [0];
    grondVijandenX = [350];
    grondVijandenY = [591.25];
    grondVijandLevens = [5];
    grondVijandNetGespawned = [true];
    grondVijandenNummers = [0];
    eenPuntZichtbaar= [false];
    driePuntenZichtbaar= [false];
    spawnSnelheid = 999;
    gerespawned = false;
    for(var i = 0; i < kometenBezig.length; i++){
      kometenBezig[i] = false;
    }
    kogels.splice(0, kogels.length);
    spelStatus = SPELEN;
  }
  if(mouseX > 640 - 0.5 * 193,3 && mouseX < 640 + 193.3 * 0.5 && mouseY > 550 - 33 && mouseY < 550 + 33 && mouseIsPressed){
    terugNaarMenu = true;
    spelStatus = BEGIN;
  }
  if(mouseX > 640 - 0.5 * 193,3 && mouseX < 640 + 193.3 * 0.5 && mouseY > 650 - 33 && mouseY < 650 + 33 && mouseIsPressed){
    naarWinkel = true;
    spelStatus = WINKEL;
  }
}

function tekenGameOver(){
  achtergrond();
  
  // tekent het eindscherm
  image(scoreBord, 640 - 150, 350 - 50, 300, 100);
  fill("black");
  textSize(40);
  text(round(score), 695, 365);
  image(highscoreBord, 0, 0, 200, 60);
  textSize(20);
  text(round(highscore), 160, 35);
  image(retry, 640 - 0.5 * 193.3, 450 - 33, 193.3, 66);
  image(menu, 640 - 0.5 * 193.3, 550 - 33, 193.3, 66);
  image(winkel, 640 - 0.5 * 193.3, 650 - 33, 193.3, 66)
  image(gameOver, 640 - 339, 100 - 64, 678, 128);

  fill("white");
  textSize(40);
  text(round(aantalMunten), muntenRuimte, 35);
  image(munt, 1240, 0, 40, 40);

  image(startCursor, mouseX - 30, mouseY - 40, 40, 50);
}

function tekenWinkel(){
  achtergrond();

  // tekent het winkelscherm
  image(winkelGroot, 640 - 339, 100 - 64, 678, 128);
  image(menu, 640 - 0.5 * 193.3, 650 - 33, 193.3, 66);
  image(wapenWinkel, 640 - 419, 375 - 74, 838, 148);

  // checkt welk wapen je aan hebt en welke je hebt gekocht om te bepalen welke knop het moet laten zien
  if (wapen === "spacePistool"){
    image(equipped, 365 - 60, 490 - 25, 120, 50);
  }
  else{
    image(equip, 365 - 60, 490 - 25, 120, 50);
  }

  if (!spaceWapenGekocht){
    image(kopen, 555 - 60, 490 - 25, 120, 50);
    image(honderdMunten, 565, 410, 50, 20);
  }
  else{
    if (wapen === "spaceWapen"){
      image(equipped, 555 - 60, 490 - 25, 120, 50);
    }
    else{
      image(equip, 555 - 60, 490 - 25, 120, 50);
    }
  }
  if (!spaceBeterWapenGekocht){
    image(kopen, 735 - 60, 490 - 25, 120, 50);
    image(duizendMunten, 750, 410, 50, 20);
  }
  else{
    if (wapen === "spaceBeterWapen"){
      image(equipped, 735 - 60, 490 - 25, 120, 50);
    }
    else{
      image(equip, 735 - 60, 490 - 25, 120, 50);
    }
  }
  if (!spaceBesteWapenGekocht){
    image(kopen, 915 - 60, 490 - 25, 120, 50);
    image(tienduizendMunten, 935, 410, 50, 20);
  }
  else{
    if (wapen === "spaceBesteWapen"){
      image(equipped, 915 - 60, 490 - 25, 120, 50);
    }
    else{
      image(equip, 915 - 60, 490 - 25, 120, 50);
    }
  }

  // laat je aantal munten zien
  fill("white");
  textSize(40);
  text(round(aantalMunten), muntenRuimte, 35);
  image(munt, 1240, 0, 40, 40);

  // laat zien dat je te weinig munten hebt om iets te kopen
  if (nietGenoegMuntenZichtbaar){
    image(nietGenoegMunten, 640 - 339, 300 - 64, 678, 128);
    nietGenoegMuntenTimer++;
    if (nietGenoegMuntenTimer > 150){
      nietGenoegMuntenZichtbaar = false;
      nietGenoegMuntenTimer = 0;
    }
  }

  image(startCursor, mouseX - 30, mouseY - 40, 40, 50);
}

function winkelKnopjes(){

  // zorgt ervoor dat de bij het winkelscherm de knopjes werken
  naarWinkel = false;

  // menu knop
  if(mouseX > 640 - 0.5 * 193,3 && mouseX < 640 + 193.3 * 0.5 && mouseY > 650 - 33 && mouseY < 650 + 33 && mouseIsPressed){
    if (komtVanBeginScherm){
      komtVanBeginScherm = false;
      terugNaarMenu = true;
      spelStatus = BEGIN;
    }
    else{
      terugNaarGameOver = true;
      spelStatus = GAMEOVER;
    }
  }

  // kopen spaceWapen
  if(mouseX > 555 - 60 && mouseX < 640 + 60 && mouseY > 490 - 25 && mouseY < 490 + 25 && mouseIsPressed && !spaceWapenGekocht){
    if (aantalMunten >= 100){
      aantalMunten -= 100;
      spaceWapenGekocht = true;
    }
    else{
      nietGenoegMuntenZichtbaar = true;
    }
  }

  // kopen spaceBeterWapen
  if(mouseX > 735 - 60 && mouseX < 735 + 60 && mouseY > 490 - 25 && mouseY < 490 + 25 && mouseIsPressed && !spaceBeterWapenGekocht){
    if (aantalMunten >= 1000){
      aantalMunten -= 1000;
      spaceBeterWapenGekocht = true;
    }
    else{
      nietGenoegMuntenZichtbaar = true;
    }
  }

  // kopen spaceBesteWapen
  if(mouseX > 915 - 60 && mouseX < 915 + 60 && mouseY > 490 - 25 && mouseY < 490 + 25 && mouseIsPressed && !spaceBesteWapenGekocht){
    if (aantalMunten >= 10000){
      aantalMunten -= 10000;
      spaceBesteWapenGekocht = true;
    }
    else{
      nietGenoegMuntenZichtbaar = true;
    }
  }

  // equippen spacePistool
  if(mouseX > 365 - 60 && mouseX < 365 + 60 && mouseY > 490 - 25 && mouseY < 490 + 25 && mouseIsPressed){
    wapen = "spacePistool";
  }

  // equippen spaceWapen
  if(mouseX > 555 - 60 && mouseX < 640 + 60 && mouseY > 490 - 25 && mouseY < 490 + 25 && mouseIsPressed && spaceWapenGekocht){
    wapen = "spaceWapen";
  }

  // equippen spaceBeterWapen
  if(mouseX > 735 - 60 && mouseX < 735 + 60 && mouseY > 490 - 25 && mouseY < 490 + 25 && mouseIsPressed && spaceBeterWapenGekocht){
    wapen = "spaceBeterWapen";
  }

  // equippen spaceBesteWapen
  if(mouseX > 915 - 60 && mouseX < 915 + 60 && mouseY > 490 - 25 && mouseY < 490 + 25 && mouseIsPressed && spaceBesteWapenGekocht){
    wapen = "spaceBesteWapen";
  }
}

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */

function preload() {
  backgroundImage = loadImage('images/background.jpg');

  crosshairImage = loadImage('images/crosshair.png');
  startCursor = loadImage('images/startScherm/startCursor.png');
  startKnop = loadImage('images/startScherm/startKnop.png');
  startUitleg = loadImage('images/startScherm/startUitleg.png');
  uitleg = loadImage('images/startScherm/uitleg.png');
  gameNaam = loadImage('images/startScherm/gameNaam.png');
  menu = loadImage('images/startScherm/menu.png');
  retry = loadImage('images/startScherm/retry.png');
  gameOver = loadImage('images/startScherm/gameOver.png');
  respawn = loadImage('images/respawn.png');
  een = loadImage('images/een.png');
  twee = loadImage('images/twee.png');
  drie = loadImage('images/drie.png');

  vloer = loadImage('images/vloer.png');
  platform = loadImage('images/platform.png');
  platformPoten = loadImage('images/platformPoten.png');

  spelerJump = loadImage('images/spaceSoldierJump.png');
  spelerCrouch = loadImage('images/spaceSoldierCrouch.png');

  loopImage0 = loadImage('images/spelerAnimaties/spaceSoldier0.png');
  loopImage1 = loadImage('images/spelerAnimaties/spaceSoldier1.png');
  loopImage2 = loadImage('images/spelerAnimaties/spaceSoldier2.png');
  loopImage3 = loadImage('images/spelerAnimaties/spaceSoldier3.png');
  loopImage4 = loadImage('images/spelerAnimaties/spaceSoldier4.png');
  loopImage5 = loadImage('images/spelerAnimaties/spaceSoldier5.png');
  loopImage6 = loadImage('images/spelerAnimaties/spaceSoldier6.png');
  loopImage7 = loadImage('images/spelerAnimaties/spaceSoldier7.png');
  spelerStaat = loadImage('images/spelerAnimaties/spaceSoldier8.png');

  spacePistool = loadImage('images/wapens/spacePistool.png');
  spaceWapen = loadImage('images/wapens/spaceWapen.png');
  spaceBeterWapen = loadImage('images/wapens/spaceBeterWapen.png');
  spaceBesteWapen = loadImage('images/wapens/spaceBesteWapen.png');
  kogel = loadImage('images/kogel.png');

  portalAnimatie0 = loadImage('images/portalAnimatie/portalAnimatie0.png');
  portalAnimatie1 = loadImage('images/portalAnimatie/portalAnimatie1.png');
  portalAnimatie2 = loadImage('images/portalAnimatie/portalAnimatie2.png');
  portalAnimatie3 = loadImage('images/portalAnimatie/portalAnimatie3.png');

  vijand0 = loadImage('images/vijandAnimatie/vijand0.png');
  vijand1 = loadImage('images/vijandAnimatie/vijand1.png');
  vijand2 = loadImage('images/vijandAnimatie/vijand2.png');
  vijand3 = loadImage('images/vijandAnimatie/vijand3.png');

  grondVijand0 = loadImage('images/grondVijandAnimatie/grondVijand0.png');
  grondVijand1 = loadImage('images/grondVijandAnimatie/grondVijand1.png');
  grondVijand2 = loadImage('images/grondVijandAnimatie/grondVijand2.png');
  grondVijand3 = loadImage('images/grondVijandAnimatie/grondVijand3.png');
  grondVijandSpawn = loadImage('images/grondVijandAnimatie/grondVijandSpawn.png');
  grondVijandDamage = loadImage('images/grondVijandAnimatie/grondVijandDamage.png');

  komeet0 = loadImage('images/komeetAnimatie/meteor0.png');
  komeet1 = loadImage('images/komeetAnimatie/meteor1.png');
  komeet2 = loadImage('images/komeetAnimatie/meteor2.png');
  komeet3 = loadImage('images/komeetAnimatie/meteor3.png');
  komeet4 = loadImage('images/komeetAnimatie/meteor4.png');
  komeet5 = loadImage('images/komeetAnimatie/meteor5.png');
  komeet6 = loadImage('images/komeetAnimatie/meteor6.png');
  komeet7 = loadImage('images/komeetAnimatie/meteor7.png');
  komeet8 = loadImage('images/komeetAnimatie/meteor8.png');
  komeet9 = loadImage('images/komeetAnimatie/meteor9.png');
  komeet10 = loadImage('images/komeetAnimatie/meteor10.png');

  zon = loadImage('images/zon.png');
  voorAchterGrond = loadImage('images/voorachtergrond.png');
  ster = loadImage('images/ster.png');

  munt = loadImage('images/winkel/munt.png');
  winkel = loadImage('images/winkel/winkel.png');
  winkelGroot = loadImage('images/winkel/winkelGroot.png');
  wapenWinkel = loadImage('images/winkel/wapenWinkel.png');
  kopen = loadImage('images/winkel/kopen.png');
  equip = loadImage('images/winkel/equip.png');
  equipped = loadImage('images/winkel/equipped.png');
  honderdMunten = loadImage('images/winkel/honderdMunten.png');
  duizendMunten = loadImage('images/winkel/duizendMunten.png');
  tienduizendMunten = loadImage('images/winkel/tienduizendMunten.png');
  nietGenoegMunten = loadImage('images/winkel/nietGenoegMunten.png');

  scoreTijdensGame = loadImage('images/scoreTijdensGame.png');
  scoreBord = loadImage('images/scoreBord.png');
  highscoreBord = loadImage('images/highscoreBord.png');
  eenPunt = loadImage('images/+1.png');
  driePunten = loadImage('images/+3.png');
}

function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
  frameRate(60);

  loopAnimatie = [loopImage0, loopImage1, loopImage2, loopImage3, loopImage4, loopImage5, loopImage6, loopImage7, spelerCrouch, spelerJump, spelerStaat];
  portalAnimatie = [portalAnimatie0, portalAnimatie1, portalAnimatie2, portalAnimatie3];
  komeetAnimatie = [komeet0, komeet1, komeet2, komeet3, komeet4, komeet5, komeet6, komeet7, komeet8, komeet9, komeet10];
  vijandAnimatie = [vijand0, vijand1, vijand2, vijand3];
  grondVijandAnimatie = [grondVijand0, grondVijand1, grondVijand2, grondVijand3, grondVijandDamage];
  

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}

/**
 * draw
 * de code in deze functie wordt 60 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    zwaartekracht();
    CheckBeweegingSpeler();
    verwerkBotsing()
    berekenWapen();
    berekenKogel();
    kogelOpVijandCheck();
    resetGrondVijandTimer();
    portal(spelerX, spelerY, "speler");
    portal(kogelX, kogelY, "kogel");
    for (var i = 0; i < vijandenX.length; i++){
      portal(vijandenX[i], vijandenY[i], i, "vijand", i);
    }
    for (var j = 0; j < grondVijandenX.length; j++){
      portal(grondVijandenX[j], grondVijandenY[j], "grondVijand", j);
    }
    portalKogels();
    spawnVijanden();
    enemy();

    achtergrond();
    tekenAlles();
    vijandAanval();
    tekenKogel();
    tekenWapen();
    }

    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  else if (spelStatus === RESPAWNEN){
    achtergrond();
    tekenAlles();
    vijandAanval();
    tekenKogel();
    tekenWapen();

    // zorgt ervoor dat de score niet omhoog blijft gaan
    score -= 1/60;

    if (!nuRespawnen){
    image(respawn, 640 - 339, 350 - 128, 678, 256);
    }

    // zorgt ervoor dat je kan respawnen als je op het vinkje klikt
    if (mouseX > 830 - 40 && mouseX < 830 + 40 && mouseY > 450 - 40 && mouseY < 450 + 40 && mouseIsPressed && !gerespawned){
      if (aantalMunten  >= 500){
        nuRespawnen = true;
        aantalMunten -= 500;
        gerespawned = true;
      }
      else{
        nietGenoegMuntenZichtbaar = true;
      }
    }
    else if (mouseX > 910 - 40 && mouseX < 910 + 40 && mouseY > 450 - 40 && mouseY < 450 + 40 && mouseIsPressed){
      spelStatus = GAMEOVER;
      setTimeout(eind, 1000);
    }

    // tekent een timer voor wanneer je respawnt
    if (nuRespawnen === true){
      respawnTimer++;
      if (respawnTimer < 60){
        image(drie, 640 - 50, 360 - 50, 100, 100);
      }
      else if (respawnTimer < 120){
        image(twee, 640 - 50, 360 - 50, 100, 100);
      }
      else if (respawnTimer < 180){
        image(een, 640 - 50, 360 - 50, 100, 100);
      }
      if (respawnTimer > 180){
        spelStatus = SPELEN;
        respawnTimer = 0;
        nuRespawnen = false;
        netGerespawned = true;
      }
    }

    // laat zien dat je te weinig munten hebt om een respawn te kopen
    if (nietGenoegMuntenZichtbaar){
      image(nietGenoegMunten, 640 - 339, 300 - 64, 678, 128);
      nietGenoegMuntenTimer++;
      if (nietGenoegMuntenTimer > 150){
        nietGenoegMuntenZichtbaar = false;
        nietGenoegMuntenTimer = 0;
      }
    }

    // laat het aantal munten zien
    fill("white");
    textSize(40);
    text(round(aantalMunten), muntenRuimte, 35);
    image(munt, 1240, 0, 40, 40);

    image(startCursor, mouseX - 30, mouseY - 40, 40, 50);
    }
  else if (spelStatus === BEGIN){
    if (muntenTeller >= 0){
      muntenTeller -= 0.2;
      aantalMunten += 0.2;
    }

    if (terugNaarMenu === true){
      setTimeout(start, 500);
    }
    else{
      start();
    }
    tekenBeginScherm();
  }
  else if (spelStatus === GAMEOVER) {
    // teken game-over scherm

    // verandert highscore
    if (score > highscore){
      highscore = score;
    }
    // score bij munten optellen
    if (muntenTeller >= 0){
      muntenTeller -= 0.2;
      aantalMunten += 0.2;
    }

    // checkt grootte voor tekst
    if (aantalMunten < 9.5){
      muntenRuimte = 1200;
    }
    if (aantalMunten > 9.5){
      muntenRuimte = 1180;
    }
    if (aantalMunten > 99.5){
      muntenRuimte = 1160;
    }
    if (aantalMunten > 999.5){
      muntenRuimte = 1140;
    }
    if (aantalMunten > 9999.5){
      muntenRuimte = 1120;
    }

    if (terugNaarGameOver === true){
      setTimeout(eind, 500);
    }
    else{
      eind();
    }
    tekenGameOver();
  }
  else if (spelStatus === WINKEL){
    // tekent het winkel scherm
    if (muntenTeller >= 0){
      muntenTeller -= 0.2;
      aantalMunten += 0.2;
    }

    if (naarWinkel === true){
      setTimeout(winkelKnopjes, 500);
    }
    else{
      winkelKnopjes();
    }

    tekenWinkel();
  }
}

