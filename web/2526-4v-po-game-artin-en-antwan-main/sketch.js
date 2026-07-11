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
const START = 3;
const WIN = 4;
var spelStatus = START;
var spelerAfbeelding;
var vijandAfbeelding;
var schietVijandAfbeelding;
var baasAfbeelding;
var kogelAfbeelding;
var vijandKogelAfbeelding;
var baasKogelAfbeelding;
var arenaAfbeelding;
var gameoverAfbeelding;
var winAfbeelding;
var achtergrondMuziek1;
var achtergrondMuziek2;
var achtergrondMuziek3;
var achtergrondMuziek4;
var achtergrondMuziek5;
var achtergrondMuziek6;
var kogelsX = [];
var kogelsY = [];
var kogelsVX = [];
var kogelsVY = [];
var vijandKogelsX = [];
var vijandKogelsY = [];
var vijandKogelsVX = [];
var vijandKogelsVY = [];
var baasKogelsX = [];
var baasKogelsY = [];
var baasKogelsVX = [];
var baasKogelsVY = [];
var vijandenX = [];
var vijandenY = [];
var vijandenHealth = [];
var groteVijandenX = [];
var groteVijandenY = [];
var groteVijandenHealth = [];
var kleineVijandenX = [];
var kleineVijandenY = [];
var kleineVijandenHealth = [];
var schietVijandenX = [];
var schietVijandenY = [];
var schietVijandenHealth = [];
var schietVijandenCooldown = [];
var baasX = [];
var baasY = [];
var baasHealth = [];
var baasCooldown = [];
var schietcooldown = 0;
var snelheidslevel = 0;
var afvuursnelheidslevel = 0;
var HPlevel = 0;
var dmgCD = 0;
var dmgCDlvl = 0;
var regen = 0;
var regenCD = 0;
var regenCDlvl = 0;
var dmg = 20;
var dmglvl = 0;
var tplvl = 0; //tp = teleport
var tpCD = 0;
var wave = 0;
var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler
var laatsteX = spelerX;
var laatsteY = spelerY;
var health =  100;  // health van speler
var punten = 0;
var wavetimer = 0;
var rage = 1;
var ragelvl = 0;
var lifesteallvl = 0;
var dmgreductionlevel = 0;
var timerdmg = 0;
var timersnelheid = 0;
var timerafvuursnelheid = 0;
var timerdmgreduction = 0;
var timertp = 0;
var timerdmgCD = 0;
var timerrage = 0;
var timerlifesteal = 0;
var timerregenCD = 0;

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
function snelheid() {
  return (4.5 + snelheidslevel * 0.5) * rage;
}

function startWave() {

  wave++;
  wavetimer = 250 + 500 * wave;

  var upgrade = Math.floor(Math.random() * 14) 
  if (upgrade === 0 || upgrade === 1 || upgrade === 2 ) {
    dmglvl ++;
    if (timerdmg === 0){ //we gebruiken timer voor de tekst bij een upgrade
      timerdmg = 100;
    }
  }
  else if (upgrade === 3 || upgrade === 4 ) {
    snelheidslevel ++;
    if (timersnelheid === 0){
      timersnelheid = 100;
    }
  }
  else if (upgrade === 5 && afvuursnelheidslevel < 3 || upgrade === 6 && afvuursnelheidslevel < 3 ) {
    afvuursnelheidslevel ++;
    if (timerafvuursnelheid === 0){
      timerafvuursnelheid = 100;
    }
  }
  else if (upgrade === 7 && dmgreductionlevel < 3 || upgrade === 8 && dmgreductionlevel < 3 ) {
    dmgreductionlevel ++;
    if (timerdmgreduction === 0){
      timerdmgreduction = 100;
    }
  }
  else if (upgrade === 9 && regenCDlvl < 3) {
    regenCDlvl ++;
    if (timerregenCD === 0){
      timerregenCD = 100;
    }
  }
  else if (upgrade === 10 && tplvl < 3) {
     tplvl++;
     if (timertp === 0){
      timertp = 100;
    }
  }
  else if (upgrade === 11) {
    dmgCDlvl++;
    if (timerdmgCD === 0){
      timerdmgCD = 100;
    }
  }
  else if (upgrade === 12) {
    ragelvl++;
    if (timerrage === 0){
      timerrage = 100;
    }
  }
  else if (upgrade === 13 && lifesteallvl < 3) {
    lifesteallvl++;
    if (timerlifesteal === 0){
      timerlifesteal = 100;
    }
  }

  for (var i = 1; i < wave * 1 + 1; i++) {
    spawnVijand();
  }

  for (var i = 6; i < wave; i++) {
  spawnGroteVijand();
  }

  for (var i = 9; i < wave; i++) {
  spawnKleineVijand();
  }

  for (var i = 3; i < wave; i++) {
  spawnSchietVijand();
  }
  
  if (wave === 15) {
  spawnBaas();
  }
}

var beweegAlles = function(){

  // speler

  if (keyIsDown(65) && !keyIsDown(87) && !keyIsDown(83))  {
    laatsteX = spelerX - 1;
    laatsteY = spelerY;
    spelerX -= snelheid();
  }

  if (keyIsDown(68) && !keyIsDown(87) && !keyIsDown(83))  {
    laatsteX = spelerX + 1;
    laatsteY = spelerY;
    spelerX += snelheid();
  }

  if (keyIsDown(87) && !keyIsDown(68) && !keyIsDown(65)) {
    laatsteY = spelerY - 1;
    laatsteX = spelerX;
    spelerY -= snelheid();
  }
  
  if (keyIsDown(83) && !keyIsDown(68) && !keyIsDown(65)) {
    laatsteY = spelerY + 1;
    laatsteX = spelerX;
    spelerY += snelheid();
  }

  if (keyIsDown(65) && keyIsDown(87) && !keyIsDown(83) && !keyIsDown(68)) {
    laatsteX = spelerX - 1;
    laatsteY = spelerY - 1;
    spelerX -= snelheid() * 0.707;  // we doen het * 0.707 omdat je anders 41% sneller diagonaal loopt.9
    spelerY -= snelheid() * 0.707;
  }

  if (keyIsDown(68) && keyIsDown(87) && !keyIsDown(83)   )  {
    laatsteX = spelerX + 1;
    laatsteY = spelerY - 1;
    spelerX += snelheid() * 0.707;
    spelerY -= snelheid() * 0.707;
  }

  if (keyIsDown(65) && keyIsDown(83) && !keyIsDown(68))  {
    laatsteX = spelerX - 1;
    laatsteY = spelerY + 1;
    spelerX -= snelheid() * 0.707;
    spelerY += snelheid() * 0.707;
  }

  if (keyIsDown(68) && keyIsDown(83))  {
    laatsteX = spelerX + 1;
    laatsteY = spelerY + 1;
    spelerX += snelheid() * 0.707;
    spelerY += snelheid() * 0.707;
  }

  if (spelerX < 23) {
    spelerX = 23;
    laatsteX = spelerX + 1;
    laatsteY = spelerY;
  }

  if (spelerX > 1253) {
    spelerX = 1253;
    laatsteX = spelerX - 1;
    laatsteY = spelerY;
  }

  if (spelerY < 32) {
    spelerY = 32;
    laatsteY = spelerY + 1;
    laatsteX = spelerX;
  }

  if (spelerY > 681) {
    spelerY = 681;
    laatsteY = spelerY - 1;
    laatsteX = spelerX;
  }

  // vijand

  for (var i = 0; i < vijandenX.length; i++) {

    var dx = spelerX - vijandenX[i];
    var dy = spelerY - vijandenY[i];

    var afstand = sqrt(dx * dx + dy * dy);

    if (afstand > 45) {
      var sx = dx / afstand * 2;
      var sy = dy / afstand * 2;

      vijandenX[i] += sx;
      vijandenY[i] += sy;
    }

    if (vijandenX[i] < 26) {
        vijandenX[i] = 26;
      }

    if (vijandenX[i] > 1280) {
      vijandenX[i] = 1280;
    }

    if (vijandenY[i] < 26) {
      vijandenY[i] = 26;
    }

    if (vijandenY[i] > 685) {
      vijandenY[i] = 685;
    }
  }

  for (var i = 0; i < groteVijandenX.length; i++) {

    var dx = spelerX - groteVijandenX[i];
    var dy = spelerY - groteVijandenY[i];

    var afstand = sqrt(dx * dx + dy * dy);

    if (afstand > 65) {
      var sx = dx / afstand * 1;
      var sy = dy / afstand * 1;

      groteVijandenX[i] += sx;
      groteVijandenY[i] += sy;
    }

    if (groteVijandenX[i] < 40) {
      groteVijandenX[i] = 40;
    }

    if (groteVijandenX[i] > 1240) {
     groteVijandenX[i] = 1240;
    }

    if (groteVijandenY[i] < 58) {
      groteVijandenY[i] = 58;
    }

    if (groteVijandenY[i] > 664) {
      groteVijandenY[i] = 664;
    }
  }

  for (var i = 0; i < kleineVijandenX.length; i++) {

    var dx = spelerX - kleineVijandenX[i];
    var dy = spelerY - kleineVijandenY[i];

    var afstand = sqrt(dx * dx + dy * dy);

    if (afstand > 25) {
      var sx = dx / afstand * 3.5;
      var sy = dy / afstand * 3.5;

      kleineVijandenX[i] += sx;
      kleineVijandenY[i] += sy;
    }

    if (kleineVijandenX[i] < 8) {
      kleineVijandenX[i] = 8;
    }

    if (kleineVijandenX[i] > 1273) {
      kleineVijandenX[i] = 1273;
    }

    if (kleineVijandenY[i] < 12) {
      kleineVijandenY[i] = 12;
    }

    if (kleineVijandenY[i] > 709) {
      kleineVijandenY[i] = 709;
    }
  }

  for (var i = 0; i < schietVijandenX.length; i++) {
    if (schietVijandenX[i] < 26) {
        schietVijandenX[i] = 26;
      }

      if (schietVijandenX[i] > 1270) {
        schietVijandenX[i] = 1270;
      }

      if (schietVijandenY[i] < 26) {
        schietVijandenY[i] = 26;
      }

      if (schietVijandenY[i] > 685) {
        schietVijandenY[i] = 685;
      }
  }

  for (var i = 0; i < baasX.length; i++) {

    var dx = spelerX - baasX[i];
    var dy = spelerY - baasY[i];

    var afstand = sqrt(dx * dx + dy * dy);

    if (afstand > 100) {
      baasX[i] += dx / afstand * 2.5;
      baasY[i] += dy / afstand * 2.5;
    }

    if (baasX[i] < 73) {
      baasX[i] = 73;
    }

    if (baasX[i] > 1203) {
      baasX[i] = 1203;
    }

    if (baasY[i] < 123) {
      baasY[i] = 123;
    }

    if (baasY[i] > 595) {
      baasY[i] = 595;
    }
  }
 
  // kogel
  
  if (keyIsDown(32) && spelStatus === SPELEN && (schietcooldown === 0)) {

    var dx = (spelerX - laatsteX);
    var dy = (spelerY - laatsteY);

    var richting = sqrt(dx * dx + dy * dy);

    var vx = (dx / richting) * 16;
    var vy = (dy / richting) * 16;

    kogelsX.push(spelerX);
    kogelsY.push(spelerY);

    kogelsVX.push(vx);
    kogelsVY.push(vy);

    schietcooldown += 20 - afvuursnelheidslevel * 4;
  }
  
  for (var i = 0; i < schietVijandenX.length; i++) {

    schietVijandenCooldown[i]--;

    if (schietVijandenCooldown[i] <= 0) {

      var dx = spelerX - schietVijandenX[i];
      var dy = spelerY - schietVijandenY[i];

      var richting = sqrt(dx * dx + dy * dy);

      var vx = dx / richting * 6;
      var vy = dy / richting * 6;

      vijandKogelsX.push(schietVijandenX[i]);
      vijandKogelsY.push(schietVijandenY[i]);

      vijandKogelsVX.push(vx);
      vijandKogelsVY.push(vy);

      schietVijandenCooldown[i] = Math.random() * 100 + 40;
    } 
  }

  for (var i = 0; i < baasX.length; i++) {

    baasCooldown[i]--;

    if (baasCooldown[i] <= 0) {

      var dx = spelerX - baasX[i];
      var dy = spelerY - baasY[i];

      var richting = sqrt(dx * dx + dy * dy);

      var vx = dx / richting * 6;
      var vy = dy / richting * 6;

      baasKogelsX.push(baasX[i]);
      baasKogelsY.push(baasY[i]);

      baasKogelsVX.push(vx);
      baasKogelsVY.push(vy);

      baasCooldown[i] = Math.random() * 50 + 20;
    } 
  }
}

function spawnVijand() {
  var x, y;
  var afstand;

  do {
    x = random(50, width - 50);
    y = random(50, height - 50);

    var dx = x - spelerX;
    var dy = y - spelerY;
    afstand = sqrt(dx * dx + dy * dy);

  } while (afstand < 300);

  vijandenX.push(x);
  vijandenY.push(y);
  vijandenHealth.push(50);
}

function spawnGroteVijand() {
  var x, y;
  var afstand;

  do {
    x = random(50, width - 50);
    y = random(50, height - 50);

    var dx = x - spelerX;
    var dy = y - spelerY;
    afstand = sqrt(dx * dx + dy * dy);

  } while (afstand < 300);

  groteVijandenX.push(x);
  groteVijandenY.push(y);
  groteVijandenHealth.push(100);
}

function spawnKleineVijand() {
  var x, y;
  var afstand;

  do {
    x = random(50, width - 50);
    y = random(50, height - 50);

    var dx = x - spelerX;
    var dy = y - spelerY;
    afstand = sqrt(dx * dx + dy * dy);

  } while (afstand < 300);

  kleineVijandenX.push(x);
  kleineVijandenY.push(y);
  kleineVijandenHealth.push(20);
}

function spawnSchietVijand() {
  var x, y;
  var afstand;

  do {
    x = random(50, width - 50);
    y = random(50, height - 50);

    var dx = x - spelerX;
    var dy = y - spelerY;
    afstand = sqrt(dx * dx + dy * dy);

  } while (afstand < 300);

  schietVijandenX.push(x);
  schietVijandenY.push(y);
  schietVijandenHealth.push(40);
  schietVijandenCooldown.push(Math.random() * 100 + 40);
}

function spawnBaas() {
  var x, y;
  var afstand;

  do {
    x = random(50, width - 50);
    y = random(50, height - 50);

    var dx = x - spelerX;
    var dy = y - spelerY;
    afstand = sqrt(dx * dx + dy * dy);

  } while (afstand < 400);

  baasX.push(x);
  baasY.push(y);
  baasHealth.push(1500);
  baasCooldown.push(Math.random() * 50 + 20);
}

function doeDamage(aantal) {
  if (dmgCD === 0) {
    health -= Math.floor((1 - (dmgreductionlevel / 6)) * aantal);   // we hebben Math.floor toegevoegd, om kommagetallen bij je health te vermijden.
    dmgCD = 50 + dmgCDlvl * 50;
  }
}

var powerUps = function() {
  if (regenCD > 0) {
    regenCD --;
  }

  var tpafstand = 100 * tplvl;
  var snelheid = (4.5 + snelheidslevel * 0.5) * (rage - ragelvl * 0.2);

  if (health < (100 + HPlevel * 25) && regenCD === 0 && dmgCD === 0) {
    health += 1;
    regenCD = 50 - 10 * regenCDlvl;

    if (health > (100 + HPlevel * 25)) {
      health = 100 + HPlevel * 25;
    }

    if (health < 35 && ragelvl > 0) {
      rage = 1 + 0.25 * ragelvl;
    }
    else if (health > 35){
      rage = 1;
    }
  }

  if (keyIsDown(69) && tpCD === 0) {

    var dx = spelerX - laatsteX;
    var dy = spelerY - laatsteY;

    var lengte = sqrt(dx * dx + dy * dy);

    if (lengte > 0) {
      spelerX += (dx / lengte) * tpafstand;
      spelerY += (dy / lengte) * tpafstand;
    }

    tpCD = 300 - 50 * tplvl;
  }

  if (tpCD > 0) {
    tpCD--;
  }

  if (schietcooldown > 0) {
    schietcooldown --;
  }

  if (dmgCD > 0) {
    dmgCD--;
  }
}

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand

  for (var i = vijandenX.length - 1; i >= 0; i--) {
    if (spelerX + 20 > vijandenX[i] - 20 &&
        spelerX - 25 < vijandenX[i] + 20 &&
        spelerY + 40 > vijandenY[i] - 30 &&
        spelerY - 30 < vijandenY[i] + 30 &&
        dmgCD === 0) {

        doeDamage(20);
    }
  }

  for (var i = groteVijandenX.length - 1; i >= 0; i--) {
    if (spelerX + 30 > groteVijandenX[i] - 30 &&
        spelerX - 35 < groteVijandenX[i] + 30 &&
        spelerY + 50 > groteVijandenY[i] - 40 &&
        spelerY - 40 < groteVijandenY[i] + 40 &&
        dmgCD === 0) {

        doeDamage(30);
    }
  }

  for (var i = kleineVijandenX.length - 1; i >= 0; i--) {
    if (spelerX + 15 > kleineVijandenX[i] - 15 &&
        spelerX - 15 < kleineVijandenX[i] + 15 &&
        spelerY + 25 > kleineVijandenY[i] - 25 &&
        spelerY - 25 < kleineVijandenY[i] + 25 &&
        dmgCD === 0) {

        doeDamage(10);
    }
  }

  for (var i = schietVijandenX.length - 1; i >= 0; i--) {
    if (spelerX + 20 > schietVijandenX[i] - 20 &&
        spelerX - 25 < schietVijandenX[i] + 20 &&
        spelerY + 40 > schietVijandenY[i] - 30 &&
        spelerY - 30 < schietVijandenY[i] + 30 &&
        dmgCD === 0) {

        doeDamage(20);
    }
  }

  for (var i = baasX.length - 1; i >= 0; i--) {
    if (spelerX + 50 > baasX[i] - 50 &&
        spelerX - 50 < baasX[i] + 50 &&
        spelerY + 70 > baasY[i] - 70 &&
        spelerY - 70 < baasY[i] + 70 &&
        dmgCD === 0) {

        doeDamage(50);
    }
  }

  // botsing vijand tegen vijand
  for (var i = 0; i < vijandenX.length; i++) {
    for (var j = 0; j < vijandenX.length; j++) {

      if (i !== j) {

        var dx = vijandenX[i] - vijandenX[j];
        var dy = vijandenY[i] - vijandenY[j];

        var afstand = sqrt(dx * dx + dy * dy);

        if (afstand < 55 && afstand > 0) {
          vijandenX[i] += dx * 0.05;
          vijandenY[i] += dy * 0.05;
        }
      }
    }
  }

  for (var i = 0; i < groteVijandenX.length; i++) {
    for (var j = 0; j < groteVijandenX.length; j++) {

      if (i !== j) {

        var dx = groteVijandenX[i] - groteVijandenX[j];
        var dy = groteVijandenY[i] - groteVijandenY[j];

        var afstand = sqrt(dx * dx + dy * dy);

        if (afstand < 75 && afstand > 0) {
          groteVijandenX[i] += dx * 0.05;
          groteVijandenY[i] += dy * 0.05;
        }
      }
    }
  }

  for (var i = 0; i < kleineVijandenX.length; i++) {
    for (var j = 0; j < kleineVijandenX.length; j++) {

      if (i !== j) {

        var dx = kleineVijandenX[i] - kleineVijandenX[j];
        var dy = kleineVijandenY[i] - kleineVijandenY[j];

        var afstand = sqrt(dx * dx + dy * dy);

        if (afstand < 25 && afstand > 0) {
          kleineVijandenX[i] += dx * 0.05;
          kleineVijandenY[i] += dy * 0.05;
        }
      }
    }
  }

  // botsing kogel tegen vijand
  for (var i = 0; i < vijandenX.length; i++) {
    for(var j = kogelsX.length - 1; j >= 0; j--){
     if (kogelsX[j] + 15 > vijandenX[i] - 15 &&
        kogelsX[j] - 20 < vijandenX[i] + 20 &&
        kogelsY[j] + 20 > vijandenY[i] - 25 &&
        kogelsY[j] - 25 < vijandenY[i] + 20) {
        
        kogelsX.splice(j, 1)
        kogelsY.splice(j, 1)
        kogelsVX.splice(j, 1)
        kogelsVY.splice(j, 1)
        vijandenHealth[i] -= ((20 + dmglvl * 10) * rage);
        if (vijandenHealth[i] <= 0 && health < 100) {
          health += 1 * lifesteallvl;
          if (health > 100){
            health = 100;
          }
        }
      } 
      
    }
  }

  for (var i = vijandenX.length - 1; i >= 0; i--) {
    if (vijandenHealth[i] <= 0) {
      vijandenX.splice(i, 1);
      vijandenY.splice(i, 1);
      vijandenHealth.splice(i, 1);
      punten += 10;
    }
  }

  for (var i = 0; i < groteVijandenX.length; i++) {
    for(var j = kogelsX.length - 1; j >= 0; j--){
     if (kogelsX[j] + 25 > groteVijandenX[i] - 25 &&
        kogelsX[j] - 30 < groteVijandenX[i] + 30 &&
        kogelsY[j] + 30 > groteVijandenY[i] - 30 &&
        kogelsY[j] - 30 < groteVijandenY[i] + 30) {
        
        kogelsX.splice(j, 1)
        kogelsY.splice(j, 1)
        kogelsVX.splice(j, 1)
        kogelsVY.splice(j, 1)
        groteVijandenHealth[i] -= ((20 + dmglvl * 10) * rage);
      } 
    }
  }

  for (var i = groteVijandenX.length - 1; i >= 0; i--) {
    if (groteVijandenHealth[i] <= 0) {
      groteVijandenX.splice(i, 1);
      groteVijandenY.splice(i, 1);
      groteVijandenHealth.splice(i, 1);
      punten += 15;
    }
  }

  for (var i = 0; i < kleineVijandenX.length; i++) {
    for(var j = kogelsX.length - 1; j >= 0; j--){
     if (kogelsX[j] + 10 > kleineVijandenX[i] - 10 &&
        kogelsX[j] - 10 < kleineVijandenX[i] + 10 &&
        kogelsY[j] + 10 > kleineVijandenY[i] - 10 &&
        kogelsY[j] - 10 < kleineVijandenY[i] + 10) {
        
        kogelsX.splice(j, 1)
        kogelsY.splice(j, 1)
        kogelsVX.splice(j, 1)
        kogelsVY.splice(j, 1)
        kleineVijandenHealth[i] -= ((20 + dmglvl * 10) * rage);
      } 
    }
  }

  for (var i = kleineVijandenX.length - 1; i >= 0; i--) {
    if (kleineVijandenHealth[i] <= 0) {
      kleineVijandenX.splice(i, 1);
      kleineVijandenY.splice(i, 1);
      kleineVijandenHealth.splice(i, 1);
      punten += 15;
    }
  }

  for (var i = 0; i < schietVijandenX.length; i++) {
    for(var j = kogelsX.length - 1; j >= 0; j--){
     if (kogelsX[j] + 15 > schietVijandenX[i] - 15 &&
        kogelsX[j] - 20 < schietVijandenX[i] + 20 &&
        kogelsY[j] + 20 > schietVijandenY[i] - 25 &&
        kogelsY[j] - 25 < schietVijandenY[i] + 20) {
        
        kogelsX.splice(j, 1)
        kogelsY.splice(j, 1)
        kogelsVX.splice(j, 1)
        kogelsVY.splice(j, 1)
        schietVijandenHealth[i] -= ((20 + dmglvl * 10) * rage);
      } 
    }
  }

  for (var i = schietVijandenX.length - 1; i >= 0; i--) {
    if (schietVijandenHealth[i] <= 0) {
      schietVijandenX.splice(i, 1);
      schietVijandenY.splice(i, 1);
      schietVijandenHealth.splice(i, 1);
      punten += 20;
    }
  }

  for (var i = 0; i < baasX.length; i++) {
    for(var j = kogelsX.length - 1; j >= 0; j--){
     if (kogelsX[j] + 50 > baasX[i] - 50 &&
        kogelsX[j] - 50 < baasX[i] + 50 &&
        kogelsY[j] + 75 > baasY[i] - 75 &&
        kogelsY[j] - 75 < baasY[i] + 75) {
        
        kogelsX.splice(j, 1)
        kogelsY.splice(j, 1)
        kogelsVX.splice(j, 1)
        kogelsVY.splice(j, 1)
        baasHealth[i] -= ((20 + dmglvl * 10) * rage);
      } 
    }
  }

  for (var i = baasX.length - 1; i >= 0; i--) {
    if (baasHealth[i] <= 0) {
      baasX.splice(i, 1);
      baasY.splice(i, 1);
      baasHealth.splice(i, 1);
      punten += 1000;
      spelStatus = WIN;
    }
  }

  // botsing kogel tegen speler
  for(var j = vijandKogelsX.length - 1; j >= 0; j--){
    if (vijandKogelsX[j] + 15 > spelerX - 15 &&
      vijandKogelsX[j] - 15 < spelerX + 15 &&
      vijandKogelsY[j] + 15 > spelerY - 15 &&
      vijandKogelsY[j] - 15 < spelerY + 15) {
        
      vijandKogelsX.splice(j, 1)
      vijandKogelsY.splice(j, 1)
      vijandKogelsVX.splice(j, 1)
      vijandKogelsVY.splice(j, 1)
      doeDamage(20)
    }    
  }

  for(var j = baasKogelsX.length - 1; j >= 0; j--){
    if (baasKogelsX[j] + 15 > spelerX - 15 &&
      baasKogelsX[j] - 15 < spelerX + 15 &&
      baasKogelsY[j] + 15 > spelerY - 15 &&
      baasKogelsY[j] - 15 < spelerY + 15) {
        
      baasKogelsX.splice(j, 1)
      baasKogelsY.splice(j, 1)
      baasKogelsVX.splice(j, 1)
      baasKogelsVY.splice(j, 1)
      doeDamage(40)
    }    
  }
};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  image(arenaAfbeelding, 640, 360, 1500, 1500);

  // vijand
 for (var i = 0; i < vijandenX.length; i++) {
  image(vijandAfbeelding, vijandenX[i], vijandenY[i], 75, 75);

  fill(100);
  rect(vijandenX[i] - 25, vijandenY[i] - 50, 50, 6);

  fill('green');
  rect(vijandenX[i] - 25, vijandenY[i] - 50,
       (vijandenHealth[i] / 50) * 50, 6);
}

for (var i = 0; i < groteVijandenX.length; i++) {
  image(vijandAfbeelding, groteVijandenX[i], groteVijandenY[i], 125, 125);

  fill(100);
  rect(groteVijandenX[i] - 25, groteVijandenY[i] - 75, 50, 6);

  fill('green');
  rect(groteVijandenX[i] - 25, groteVijandenY[i] - 75,
       (groteVijandenHealth[i] / 100) * 50, 6);
}

for (var i = 0; i < kleineVijandenX.length; i++) {
  image(vijandAfbeelding, kleineVijandenX[i], kleineVijandenY[i], 25, 25);

  fill(100);
  rect(kleineVijandenX[i] - 25, kleineVijandenY[i] - 25, 50, 6);

  fill('green');
  rect(kleineVijandenX[i] - 25, kleineVijandenY[i] - 25,
       (kleineVijandenHealth[i] / 20) * 50, 6);
}

for (var i = 0; i < schietVijandenX.length; i++) {
  image(schietVijandAfbeelding, schietVijandenX[i], schietVijandenY[i], 75, 75);

  fill(100);
  rect(schietVijandenX[i] - 25, schietVijandenY[i] - 50, 50, 6);

  fill('green');
  rect(schietVijandenX[i] - 25, schietVijandenY[i] - 50,
       (schietVijandenHealth[i] / 40) * 50, 6);
}

for (var i = 0; i < baasX.length; i++) {
  image(baasAfbeelding, baasX[i], baasY[i], 250, 250);

  fill(100);
  rect(baasX[i] - 25, baasY[i] - 150, 50, 6);

  fill('green');
  rect(baasX[i] - 25, baasY[i] - 150,
       (baasHealth[i] / 1000) * 50, 6);
}

  // kogel
  for (var i = 0; i < kogelsX.length; i++) {
    image(kogelAfbeelding, kogelsX[i], kogelsY[i], 20, 20);
  }

  for (var i = 0; i < vijandKogelsX.length; i++) {
    image(vijandKogelAfbeelding, vijandKogelsX[i], vijandKogelsY[i], 20, 20);
  }

  for (var i = 0; i < baasKogelsX.length; i++) {
    image(baasKogelAfbeelding, baasKogelsX[i], baasKogelsY[i], 20, 20);
  }
  
  // speler
  image(spelerAfbeelding, spelerX, spelerY, 75, 75);

  fill(100);
  rect(spelerX - 25, spelerY - 50, 50, 6);

  fill('green');
  rect(spelerX - 25, spelerY - 50, (health / 100) * 50, 6);

  // punten en health

};

function preload() {
  spelerAfbeelding = loadImage('afbeeldingen/Bob.png');

    kogelAfbeelding = loadImage('afbeeldingen/kogel.png')

  vijandAfbeelding = loadImage('afbeeldingen/Piet.png');

  schietVijandAfbeelding = loadImage('afbeeldingen/schietende-Piet.png')

  baasAfbeelding = loadImage('afbeeldingen/baasPiet.png');

  vijandKogelAfbeelding = loadImage ('afbeeldingen/vijandKogel.png')

  baasKogelAfbeelding = loadImage ('afbeeldingen/baasKogel.png')

  arenaAfbeelding = loadImage('afbeeldingen/Arena.jpg')

  gameoverAfbeelding = loadImage('afbeeldingen/Gameover.jpg')

  winAfbeelding = loadImage('afbeeldingen/Win.jpg')

  achtergrondMuziek1 = loadSound('muziek/Checker Dance.mp3');
  achtergrondMuziek2 = loadSound('muziek/Dogsong.mp3');
  achtergrondMuziek3 = loadSound('muziek/sans.mp3');
  achtergrondMuziek4 = loadSound('muziek/Determination.mp3');
  achtergrondMuziek5 = loadSound('muziek/do not give up.mp3');
  achtergrondMuziek6 = loadSound('muziek/its showtime.mp3');
}

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */

function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  imageMode(CENTER);
  image(arenaAfbeelding, 640, 360, 1500, 1500);

}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */

function resetSpel() {
  spelerX = 600;
  spelerY = 600;

  health = 100;
  punten = 0;

  kogelsX = [];
  kogelsY = [];
  kogelsVX = [];
  kogelsVY = [];

  vijandKogelsX = [];
  vijandKogelsY = [];
  vijandKogelsVX = [];
  vijandKogelsVY = [];

  baasKogelsX = [];
  baasKogelsY = [];
  baasKogelsVX = [];
  baasKogelsVY = [];

  vijandenX = [];
  vijandenY = [];
  vijandenHealth = [];

  groteVijandenX = [];
  groteVijandenY = [];
  groteVijandenHealth = [];

  kleineVijandenX = [];
  kleineVijandenY = [];
  kleineVijandenHealth = [];

  schietVijandenX = [];
  schietVijandenY = [];
  schietVijandenHealth = [];
  schietVijandenCooldown = [];

  baasX = [];
  baasY = [];
  baasHealth = [];
  baasCooldown = [];

  schietcooldown = 0;
  snelheidslevel = 0;
  afvuursnelheidslevel = 0;
  HPlevel = 0;
  dmgCD = 0;
  dmgCDlvl = 0;
  regen = 0;
  regenCD = 0;
  regenCDlvl = 0;
  dmg = 20;
  dmglvl = 0;
  tplvl = 0; 
  tpCD = 0;
  wave = 0;
  wavetimer = 0;
  rage = 1;
  ragelvl = 0;
  lifesteallvl = 0;
  dmgreductionlevel = 0;
  timerdmg = 0;
  timersnelheid = 0;
  timerafvuursnelheid = 0;
  timerdmgreduction = 0;
  timertp = 0;
  timerdmgCD = 0;
  timerrage = 0;
  timerlifesteal = 0;
  timerregenCD = 0;

  wave = 0;
  startWave();

  spelStatus = SPELEN;
}

function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    powerUps();

    fill('white');
    textSize(20);
    textAlign(LEFT, TOP);
    stroke('black');
    strokeWeight(4);

    if (timerdmg > 0){
    text("+Damage", 700, 20);
    timerdmg--;
    }

    if (timersnelheid > 0){
    text("+Speed", 700, 20);
    timersnelheid--;
    }

    if (timerdmgCD > 0){
    text("+Shield", 700, 20);
    timerdmgCD--;
    }

    if (timerdmgreduction > 0){
    text("+Damage reduction", 700, 20);
    timerdmgreduction--;
    }

    if (timerlifesteal > 0){
    text("+Lifesteal", 700, 20);
    timerlifesteal--;
    }

    if (timerrage > 0){
    text("+Rage", 700, 20);
    timerrage--;
    }

    if (timerafvuursnelheid > 0){
    text("+Shooting speed", 700, 20);
    timerafvuursnelheid--;
    }

    if (timertp > 0){
    text("+Teleport", 700, 20);
    timertp--;
    }

    text('Punten:' + punten, 10, 10);
    text('Health:' + health , 10, 40);

    if (tplvl >= 1) {
      text('Teleport: E', 10, 640);
    }
      
    strokeWeight(2);
    text('Walk: WASD', 10, 670);
    text('Shoot: Space', 10, 700);

    if (wave <= 14) {
      textSize(40);
      text('Wave:' + wave, 530, 10)
    }
    if (wave === 15) {
      textSize(40);
      text('Final Wave', 560, 10)
    }

    for (var i = 0; i < kogelsX.length; i++) {
       kogelsX[i] += kogelsVX[i];
       kogelsY[i] += kogelsVY[i];
    }

    for (var i = 0; i < vijandKogelsX.length; i++) {
      vijandKogelsX[i] += vijandKogelsVX[i];
      vijandKogelsY[i] += vijandKogelsVY[i];
    }

    for (var i = 0; i < baasKogelsX.length; i++) {
      baasKogelsX[i] += baasKogelsVX[i];
      baasKogelsY[i] += baasKogelsVY[i];
    }

    if (spelStatus === SPELEN && (vijandenX.length === 0 && groteVijandenX.length === 0 && kleineVijandenX.length === 0 && schietVijandenX.length === 0) || spelStatus === SPELEN && wavetimer === 0) {
      startWave();
    }

    wavetimer--;
  }

  if (spelStatus === SPELEN) {

    if(!achtergrondMuziek1.isPlaying()) {
        achtergrondMuziek1.loop();
    }

    if(achtergrondMuziek2.isPlaying()) {
        achtergrondMuziek2.stop();
    }

    if(achtergrondMuziek3.isPlaying()) {
        achtergrondMuziek3.stop();
    }

    if(achtergrondMuziek4.isPlaying()) {
        achtergrondMuziek4.stop();
    }

    if(achtergrondMuziek5.isPlaying()) {
        achtergrondMuziek5.stop();
    }

    if(achtergrondMuziek6.isPlaying()) {
      achtergrondMuziek6.stop();
    }
  }

  if (spelStatus === GAMEOVER) {

    if(!achtergrondMuziek2.isPlaying() && wave < 6) {
        achtergrondMuziek2.loop();
    }
    else if(!achtergrondMuziek4.isPlaying() &&  wave >= 6 && wave < 11) {
        achtergrondMuziek4.loop();
    }
    else if(!achtergrondMuziek5.isPlaying() && wave > 10) {
        achtergrondMuziek5.loop();
    }
    if(achtergrondMuziek1.isPlaying()) {
        achtergrondMuziek1.stop();
    }
  }

  if (spelStatus === START) {

    if(!achtergrondMuziek3.isPlaying()) {
      achtergrondMuziek3.loop();
    }

  }

  if (spelStatus === WIN) {

    if(!achtergrondMuziek6.isPlaying()) {
      achtergrondMuziek6.loop();
    }

    if(achtergrondMuziek1.isPlaying()) {
      achtergrondMuziek1.stop();
    }


  }

  if (health <= 0) {
    spelStatus = GAMEOVER;
  }
    
  if (spelStatus === START) {

    image(spelerAfbeelding, spelerX, spelerY, 75, 75);
      
    textAlign(LEFT, TOP)
    fill('white');
    stroke('black');
    
    strokeWeight(4);
    textSize(80);
    text('-AA Productions', 315, 230);

    strokeWeight(2);
    textSize(20);
    text('Get a random upgrade every wave!', 450, 350);

    strokeWeight(3);
    textSize(30);
    text('Press Enter to play', 475, 450);

    textSize(20);
    strokeWeight(1);
    text('Walk: WASD', 10, 670);
    text('Shoot: Space', 10, 700);
  }

  if (spelStatus === START && keyIsDown(13)) {
    resetSpel();
  }

  if (spelStatus === GAMEOVER) {
    image(gameoverAfbeelding, 640, 360, 1280, 720);
    
    textSize(30);
    fill('white');
    text('Press Enter to play again', 800, 620);
    text('Score:' + punten, 570, 10);

    if (wave < 6) {
      textSize(15);
      fill('red');
      text('Can you actually try next time?', 120, 620);
    }
    
    else if (wave > 5 && wave < 11) {
      textSize(15);
      fill('yellow');
      text('Great progress!', 120, 620);
    }

    else {
      textSize(15);
      fill('green');
      text('Do not give up! You are almost there!', 120, 620);
    }
  }

  if (spelStatus === GAMEOVER && keyIsDown(13)) {
    resetSpel();
  }

  if (spelStatus === WIN && keyIsDown(13)) {
    resetSpel();
  }

  if (spelStatus === WIN) {
    image(winAfbeelding, 640, 360, 1280, 720);

    textSize(30);
    fill('white');
    text('Press Enter to play again', 460, 620);
    text('Score:' + punten, 570, 10);
  }
}