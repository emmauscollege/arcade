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

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

// spelstatus
const MENU = 0;
const INLEIDING = 1;
const SPELEN = 2;
const GAMEOVER = 3;
const MAP = 4;
const CREDITS = 5;
let spelStatus = 0;

let mapCooldown = 50;
let startCooldown = 100;
let restartCooldown = 300;
// kamerstatus
const NORMALE_KAMER0 = 0;
const START_KAMER0 = 1;
const NORMALE_KAMER1 = 2;
const NORMALE_KAMER2 = 3;
const NORMALE_KAMER3 = 4;
const NORMALE_KAMER4 = 5;
const NORMALE_KAMER5 = 6;
const NORMALE_KAMER6 = 7;
const NORMALE_KAMER7 = 8;
const NORMALE_KAMER8 = 9;
const NORMALE_KAMER9 = 10;
const NORMALE_KAMER10 = 11;
const NORMALE_KAMER11 = 12;
const NORMALE_KAMER12 = 13;
const NORMALE_KAMER13 = 14;
const NORMALE_KAMER14 = 15;
const NORMALE_KAMER15 = 16;
const BOSS_KAMER = 17;
let kamerStatus = 1;
let vorigeKamer = 1;
let mapBlinkerCooldown = 50;


const BOVEN = 10;
const RECHTS = 11;
const ONDER = 12;
const LINKS = 13;
const LINKS_BOVEN = 14;
const LINKS_ONDER = 15;
const RECHTS_ONDER = 16;
const RECHTS_BOVEN = 17;

const FinaleBossBoven = 100;
const FinaleBossLinks = 101;
const FinaleBossRechts = 102;
const FinaleBossOnder = 103;

let FinaleBossPositie = FinaleBossBoven;

let teleporterenCooldown = 100;


let deathCooldown = 100;
let spelerRechtsKnockback = true
let spelerLinksKnockback = true
let spelerBovenKnockback = true
let spelerOnderKnockback = true
let spelerLength = 100;
let spelerWidth = 100;
let spelerSpeed = 5; // snelheid van de speler
let spelerSchuinRem = 2; // zorgt ervoor dat de speler schuin dezelfde snelheid heeft
let spelerX = 600; // x-positie van speler
let spelerY = 500; // y-positie van speler
let health = 100;  // health van speler
let maxHealth = 100; // maximale health van speler
let angle = 0;
let spelerSpin = false;

let vijandhealth = [];
let maxvijandHealth = 60;
let vijandX = [];
let vijandY = [];
let vijandRichting = [];
let damageCooldown = 0;

let rangedVijandhealth = [];
let maxRangedVijandHealth = 100;
let rangedVijandX = [];
let rangedVijandY = [];
let rangedVijandSchietRichting = [];
let rangedVijandKogelX = [];
let rangedVijandKogelY = [];
let rangedVijandKogelRichting = [];
let rangedVijandSchietCooldown = 50;

let Bosshealth
let maxBossHealth
let BossX 
let BossY 
let BossRichting

let FinaleBossX
let FinaleBossY
let FinaleBosshealth
let FinaleBossMaxhealth
let FinaleBossSchietRichting = [];
let FinaleBossKogelRichting = [];
let FinaleBossKogelX = [];
let FinaleBossKogelY = [];
let FinaleBossSchietCooldown = 40;

let pistoolGevonden = false;
let pistoolX
let pistoolY
let kogelsX = [];
let kogelsY = [];
let kogelsRichting = [];
let kogelCooldown = 0;
let ammunitie = 10;
let maxammunitie = 10;

let zwaardX
let zwaardY
let zwaardCooldown = 0;
let slashCooldown = 0;
let zwaardSlash = false;
let zwaardSlashLength = 175;
let zwaardSlashWidth = 175;
let zwaardGevonden = false;
let zwaardWidth = 60;
let zwaardLength = 60;

let schildX
let schildY
let schildGevonden = false;
let schildCooldown = 0;

let laatsteKey = BOVEN;

let punten = 0;

let image1; // gameover scherm plaatje
let image2; // poppetje
let image3; // zwaard
let image4; // zwaard slash
let image5; // ?
let image6; // ?
let image7; // ?
let image8; // heelzwartgat
let image9; // schild
let image10; 
let image11; // SpelMap
let image12; // firstboss
let image13; // secondphaseboss
let image14; // meleevijand
let image15; // rangedvijand
let image16; // magische vuurbal
let image17; // dode skelet


let deadSkeletonX
let deadSkeletonY

let A = 65;
let D = 68;
let W = 87;
let S = 83;
let R = 82;
let M = 77;
let C = 67;
let SPACE_BAR = 32;
let ENTER = 13;
let BACKSPACE = 8;
let spelerMagBovenBewegen = true
let spelerMagRechtsBewegen = true
let spelerMagLinksBewegen = true
let spelerMagOnderBewegen = true


let rows = 9; //tilemap
let cols = 16;
const tileSize = 80;
let tiles = [];
let tileImages = [];
//kamers
let kamers = [
  //normale kamer 0
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]
  ],
  //start kamer 1
  [
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  //normale kamer 2
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  //hoofd kamer 3 met beide knoppen niet ingedrukt
  [
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]
  ],
  //boven kamer 4
  [
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]
  ],
  //boven kamer 5
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]
  ],
  //boven kamer 6
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 3, 3, 3, 3, 3, 3, 3, 3 ,3 ,3 ,3 ,3, 0, 1],
    [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0],
    [0, 0, 3, 3, 3 ,3 ,3 ,3 ,3 ,3 ,3, 3, 3, 3, 0, 0],
    [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0],
    [1, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  //boven kamer 7
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
  ,
  //onder kamer 8
  [
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]
  ]
  ,
  //onder kamer 9
  [
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
  ,
  //onder kamer 10
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 3, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]
  ]
  ,
  //onder kamer 11
  [
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
  ,
  //onder kamer 12
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
  ,
  //Boss kamer 13
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
  ,
  // hoofdkamer3 met bovenste knop ingedrukt 14
  [
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]
  ],
    // hoofdkamer3 met onderste knop ingedrukt 15
  [
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]
  ],
    //hoofdkamer3 met beide knoppen ingedrukt 16
  [
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]
  ]
  ,
  //2e fase Boss kamer 17
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
]


/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

function resetGame() {
  spelerLength = 100;
  spelerWidth = 100;
  spelerSpeed = 7;
  spelerX = 600; // x-positie van speler
  spelerY = 500; // y-positie van speler
  health = 100;  // health van speler
  maxHealth = 100; // maximale health van speler

  vijandhealth = [];
  maxvijandHealth = 60;
  vijandX = [];
  vijandY = [];
  vijandRichting = [];
  damageCooldown = 0;

  rangedVijandhealth = [];
  maxRangedVijandHealth = 100;
  rangedVijandX = [];
  rangedVijandY = [];
  rangedVijandSchietRichting = [];
  rangedVijandKogelRichting = [];
  rangedVijandKogelX = [];
  rangedVijandKogelY = [];
  rangedVijandSchietCooldown = 50;


  Bosshealth = 1
  maxBossHealth = 1
  BossX = 10000
  BossY = 10000
  BossRichting

  punten = 0

  FinaleBossX = 10000
  FinaleBossY = 10000
  FinaleBosshealth = 10000000
  FinaleBossMaxhealth = 1000000
  FinaleBossSchietRichting = [];
  FinaleBossKogelRichting = [];
  FinaleBossKogelX = [];
  FinaleBossKogelY = [];
  FinaleBossSchietCooldown = 40;
  teleporterenCooldown = 100;
  
  pistoolX = 1000000
  pistoolY = 1000000
  kogelsX = [];
  kogelsY = [];
  kogelsRichting = [];
  kogelCooldown = 0;
  ammunitie = 100;
  maxammunitie = 100;

  laatsteKey = BOVEN;

  kamerStatus = 1
  vorigeKamer = 1

  zwaardGevonden = false
  zwaardX = 1000000
  zwaardY = 1000000
  zwaardLength = 60
  zwaardWidth = 60
  zwaardSlashLength = 175
  zwaardSlashWidth = 175
  zwaardSlash = false
  pistoolGevonden = false

  schildGevonden = false
  schildX = 10000000
  schildY = 10000000

  spelerRechtsKnockback = true
  spelerLinksKnockback = true
  spelerBovenKnockback = true
  spelerOnderKnockback = true
  angle = 0
  spelerSpin = false

  startCooldown = 100
  mapCooldown = 50
  deathCooldown = 100
  mapBlinkerCooldown = 50
  restartCooldown = 300
}

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
function beweegAlles() {
  tiles = kamers[kamerStatus];

  kogelCooldown--;
  zwaardCooldown--;
  slashCooldown--;
  
 
vorigeKamer = kamerStatus;


  // verwissel kamers
  if (kamerStatus === 0) {
    if (spelerY > 720) {

      kamerStatus = 1;
      spelerY = 0;
      
    }
  }

  if (kamerStatus === 1) {
    if (spelerX > 1280) {
      kamerStatus = 2;
      spelerX = 0;
      
      // vijandX = [500, 200, 900]
      // vijandY = [400, 300, 200]
      // vijandhealth = [60, 60, 60]
      
    }
    if (spelerY < 0) {

      kamerStatus = 0;
      spelerY = 720;
      
    }
  }

  if (kamerStatus === 2) {
    if (spelerX < 0) {
      kamerStatus = 1;
      spelerX = 1280;
     
    }
    if (spelerX > 1280) {
      kamerStatus = 3;
      spelerX = 0;
      
    }
  }

  if (kamerStatus === 3) {
    if (spelerX < 0) {
      kamerStatus = 2;
      spelerX = 1280;
      
      
    }
    if (spelerY < 0) {
      kamerStatus = 4;
      spelerY = 720;
      
      
    }
    if (spelerY > 720) {
      kamerStatus = 8;
      spelerY = 0;
      
    }
    if (spelerX > 1280) {
      kamerStatus = 13;
      spelerX = 200;
     
      Bosshealth = 600;
      maxBossHealth = 600;
      BossX = 640;
      BossY = 360;
    }
  }

  if (kamerStatus === 4) {
    if (spelerY > 720) {
      kamerStatus = 3;
      spelerY = 0;
     
    }
    if (spelerY < 0) {
      kamerStatus = 5;
      spelerY = 720;
      
    }
  }

  if (kamerStatus === 5) {
    if (spelerX < 0) {
      kamerStatus = 6;
      spelerX = 1280;
      
    }
    if (spelerY > 720) {
      kamerStatus = 4;
      spelerY = 0;
     
      // rangedVijandX = [200]
      // rangedVijandY = [400]
      // rangedVijandhealth = [100]
      
    }
  }

  if (kamerStatus === 6) {
    if (spelerX < 0) {
      kamerStatus = 7;
      spelerX = 1280;
     
    }
    if (spelerX > 1280) {
      kamerStatus = 5;
      spelerX = 0;
      
    }
  }

  if (kamerStatus === 7) {
    if (spelerX > 1280) {
      kamerStatus = 6;
      spelerX = 0;
      
    }
  }

  if (kamerStatus === 8) {
    if (spelerY < 0) {
      kamerStatus = 3;
      spelerY = 720;
      
    }
    if (spelerY > 720) {
      kamerStatus = 9;
      spelerY = 0;
      
    }
  }

  if (kamerStatus === 9) {
    if (spelerY < 0) {
      kamerStatus = 8;
      spelerY = 720;
      
    }
    if (spelerX < 0) {
      kamerStatus = 10;
      spelerX = 1280;
      
    }
  }

  if (kamerStatus === 10) {
    if (spelerY > 720) {
      kamerStatus = 11;
      spelerY = 0;
      
    }
    if (spelerX > 1280) {
      kamerStatus = 9;
      spelerX = 0;
     
    }
  }

  if (kamerStatus === 11) {
    if (spelerY < 0) {
      kamerStatus = 10;
      spelerY = 720;
     
    }
    if (spelerX > 1280) {
      kamerStatus = 12;
      spelerX = 0;
      
    }
  }

  if (kamerStatus === 12) {
    if (spelerX < 0) {
      kamerStatus = 11;
      spelerX = 1280;
      
    }
  }

  if (kamerStatus === 14) {
    if (spelerX < 0) {
      kamerStatus = 2;
      spelerX = 1280;
    
      
      
    }
    if (spelerY < 0) {
      kamerStatus = 4;
      spelerY = 720;
     
      
    }
    if (spelerY > 720) {
      kamerStatus = 8;
      spelerY = 0;
      
    }
    if (spelerX > 1280) {
      kamerStatus = 13;
      spelerX = 200;
      
      Bosshealth = 600;
      maxBossHealth = 600;
      BossX = 640;
      BossY = 360;
    }
  }
  if (kamerStatus === 15) {
    if (spelerX < 0) {
      kamerStatus = 2;
      spelerX = 1280;
     
      
    }
    if (spelerY < 0) {
      kamerStatus = 4;
      spelerY = 720;
      
      
    }
    if (spelerY > 720) {
      kamerStatus = 8;
      spelerY = 0;
      
    }
    if (spelerX > 1280) {
      kamerStatus = 13;
      spelerX = 200;
      
      Bosshealth = 600;
      maxBossHealth = 600;
      BossX = 640;
      BossY = 360;
    }
  }
  if (kamerStatus === 16) {
    if (spelerX < 0) {
      kamerStatus = 2;
      spelerX = 1280;
     
      
      
    }
    if (spelerY < 0) {
      kamerStatus = 4;
      spelerY = 720;
      
      
    }
    if (spelerY > 720) {
      kamerStatus = 8;
      spelerY = 0;
      
    }
    if (spelerX > 1280) {
      kamerStatus = 13;
      spelerX = 200;
      
      Bosshealth = 600;
      maxBossHealth = 600;
      BossX = 640;
      BossY = 360;
    }
  }

  if (kamerStatus === 17) {
      
      Bosshealth = 0;
      maxBossHealth = 0;
      BossX = 24000;
      BossY = 16000;
      

  }

//kogels weghalen kamerwissel
if(vorigeKamer !== kamerStatus){
  kogelsX.splice(0, 100)
  kogelsY.splice(0, 100)
  kogelsRichting.splice(0, 100)
  vijandX.splice(0, 100)
  vijandY.splice(0, 100)
  vijandRichting.splice(0, 100)
  vijandhealth.splice(0, 100)
  rangedVijandX.splice(0, 100)
  rangedVijandY.splice(0, 100)
  rangedVijandSchietRichting.splice(0, 100)
  rangedVijandhealth.splice(0, 100)
  rangedVijandX.splice(0, 100)
  rangedVijandY.splice(0, 100)
  rangedVijandSchietRichting.splice(0, 100)
  rangedVijandhealth.splice(0, 100)
  rangedVijandKogelX.splice(0, 10000)
  rangedVijandKogelY.splice(0, 10000)
  zwaardX = 10000000
  zwaardY = 1000000
  pistoolX = 10000000
  pistoolY = 10000000
  schildX = 10000000
  schildY = 10000000
  deadSkeletonX = 1000000
  deadSkeletonY = 1000000
  if (kamerStatus === 0){
    deadSkeletonX = 100;
    deadSkeletonY = 50;
    if (zwaardGevonden === false) {
    zwaardX = 190;
    zwaardY = 170;
    }
  }
  if (kamerStatus === 2){
    vijandX = [200,400,300];
    vijandY = [200,400,300];
    vijandhealth = [60,60,60];
  }
  if (kamerStatus === 4){
    rangedVijandX = [200];
    rangedVijandY = [200];
    rangedVijandhealth = [100];
    vijandX = [200,400,300];
    vijandY = [200,400,300];
    vijandhealth = [60,60,60];
  }
  if (kamerStatus === 5){
    rangedVijandX = [200];
    rangedVijandY = [200];
    rangedVijandhealth = [100];
    vijandX = [200];
    vijandY = [200];
    vijandhealth = [60];
  }
  if (kamerStatus === 7){
    vijandX = [200,400];
    vijandY = [200,400];
    vijandhealth = [60,60];
    deadSkeletonX = 100;
    deadSkeletonY = 50;
    if (pistoolGevonden === false) {
    pistoolX = 130;
    pistoolY = 180;
  }
}
if (kamerStatus === 9){
  rangedVijandX = [200];
  rangedVijandY = [200];
  rangedVijandhealth = [100];
  vijandX = [200,400,300];
  vijandY = [200,400,300];
  vijandhealth = [60,60,60];
}
if (kamerStatus === 11){
  rangedVijandX = [200];
  rangedVijandY = [200];
  rangedVijandhealth = [60];
  vijandX = [200,400,300];
  vijandY = [200,400,300];
  vijandhealth = [60,60,60];
}
  if (kamerStatus === 12){
    vijandX = [200 ,400];
    vijandY = [200, 400];
    vijandhealth = [60, 60];
    rangedVijandX = [200];
    rangedVijandY = [200];
    rangedVijandhealth = [100];
    deadSkeletonX = 950;
    deadSkeletonY = 50;
    if (schildGevonden === false) {
    schildX = 960;
    schildY = 180;
    }
  }
}

// wapens

if(kamerStatus === 0 && keyIsDown(ENTER) && zwaardX < spelerX + 150 && spelerY < zwaardY + 150 && spelerY > zwaardY - 150 && zwaardX > spelerX - 150){
  zwaardGevonden = true;
  zwaardX = 10000000
  zwaardY = 10000000
}

if(kamerStatus === 7 && keyIsDown(ENTER) && pistoolX < spelerX + 150 && spelerY < pistoolY + 150 && spelerY > pistoolY - 150 && pistoolX > spelerX - 150){
  pistoolGevonden = true;
  pistoolX = 10000000
  pistoolY = 10000000
}

if(kamerStatus === 12 && keyIsDown(ENTER) && schildX < spelerX + 150 && spelerY < schildY + 150 && spelerY > schildY - 150 && schildX > spelerX - 150){
  schildGevonden = true;
  schildX = 10000000
  schildY = 10000000
}


if (Bosshealth <= maxBossHealth/2 && Bosshealth > 0) {
  kamerStatus = 17;
  spelerX = 640;
  spelerY = 360;
  FinaleBossMaxhealth = 600;
    FinaleBosshealth = FinaleBossMaxhealth/2;
    FinaleBossX = 640;
    FinaleBossY = 100;
    FinaleBossKogelX = [];
    FinaleBossKogelY = [];
    FinaleBossSchietRichting = [];
}
// Boss gaat dood
  if (Bosshealth <= maxBossHealth/2 && Bosshealth > 0) {
    Bosshealth = 0
    BossX = 100000
    BossY = 100000
    punten = punten + 1000
  }

  // //FinaleBoss gaat dood
  // if (FinaleBosshealth <= 0) {
  //   FinaleBossX = 20000
  //   FinaleBossY = 20000
  //   FinaleBosshealth = 0
    
  // }

  // kogel
  for (let i = 0; i < kogelsX.length; i++) {
    if (kogelsRichting[i] === BOVEN) {
      kogelsY[i] = kogelsY[i] - 10
    }
    else if (kogelsRichting[i] === ONDER) {
      kogelsY[i] = kogelsY[i] + 10
    }
    else if (kogelsRichting[i] === RECHTS) {
      kogelsX[i] = kogelsX[i] + 10
    }
    else if (kogelsRichting[i] === LINKS) {
      kogelsX[i] = kogelsX[i] - 10
    }

    else if (kogelsRichting[i] === LINKS_BOVEN) {
      kogelsY[i] = kogelsY[i] - 10
      kogelsX[i] = kogelsX[i] - 10
    }
    else if (kogelsRichting[i] === RECHTS_BOVEN) {
      kogelsY[i] = kogelsY[i] - 10
      kogelsX[i] = kogelsX[i] + 10
    }
    else if (kogelsRichting[i] === LINKS_ONDER) {
      kogelsY[i] = kogelsY[i] + 10
      kogelsX[i] = kogelsX[i] - 10
    }
    else if (kogelsRichting[i] === RECHTS_ONDER) {
      kogelsY[i] = kogelsY[i] + 10
      kogelsX[i] = kogelsX[i] + 10
    }

  }

  for (let i = 0; i < kogelsX.length; i++) {
    if (kogelsX[i] > 1300 || kogelsY[i] > 800 || kogelsX[i] < - 1300 || kogelsY[i] < - 800) {
      kogelsX.splice(i, 1)
      kogelsY.splice(i, 1)
      kogelsRichting.splice(i, 1)
    }
  }

  if (keyIsDown(SPACE_BAR) && kogelCooldown < 0 && pistoolGevonden) {
    if (ammunitie > 0) {

      kogelsX.push(spelerX - 80);
      kogelsY.push(spelerY - 5);
      kogelsRichting.push(laatsteKey);
      ammunitie = ammunitie - 1;

      kogelCooldown = 30 
    }
  }

   // rangedvijanden schieten
      rangedVijandSchietCooldown--;
      for( let k = 0; k < rangedVijandX.length; k++) {
            rangedVijandSchietRichting[k] = atan2(spelerY - rangedVijandY[k], spelerX - rangedVijandX[k]);
            if (rangedVijandSchietCooldown < 0) {

              rangedVijandKogelX.push(rangedVijandX[k] + 10);
              rangedVijandKogelY.push(rangedVijandY[k] - 50);
              rangedVijandKogelRichting.push(rangedVijandSchietRichting[k])
              // rangedVijandSchietRichting.push(rangedVijandSchietRichting[k])
              rangedVijandSchietCooldown = 70;
            }
            for( let i = 0; i < rangedVijandKogelX.length; i++) {
              rangedVijandKogelX[i] += 10 * cos(rangedVijandKogelRichting[i]);
              rangedVijandKogelY[i] += 10 * sin(rangedVijandKogelRichting[i]);
            }
        }

    for (let i = 0; i < rangedVijandKogelX.length; i++) {
      if (rangedVijandKogelX[i] > spelerX - 50 && rangedVijandKogelY[i] > spelerY - 50 && rangedVijandKogelY[i] < spelerY + 50 && rangedVijandKogelX[i] < spelerX + 50) {
        rangedVijandKogelX.splice(i, 1)
        rangedVijandKogelY.splice(i, 1)
        rangedVijandSchietRichting.splice(i, 1)
        if (keyIsDown(C) && schildCooldown < 0 && schildGevonden) {
          schildCooldown = 50
          } else
        health = health - 30
       
      }
    }

// Finale Boss schieten
          if (FinaleBosshealth > 0 && kamerStatus === 17) {
              FinaleBossSchietCooldown--;
              
                FinaleBossSchietRichting = atan2(spelerY - FinaleBossY, spelerX - FinaleBossX);
                if (FinaleBossSchietCooldown < 0) {

                  FinaleBossKogelX.push(FinaleBossX);
                  FinaleBossKogelY.push(FinaleBossY);
                  FinaleBossKogelRichting.push(FinaleBossSchietRichting)
                  // rangedVijandSchietRichting.push(rangedVijandSchietRichting[k])
                  FinaleBossSchietCooldown = 2;
              }
            
            for( let i = 0; i < FinaleBossKogelX.length; i++) {
              FinaleBossKogelX[i] += 10 * cos(FinaleBossKogelRichting[i]);
              FinaleBossKogelY[i] += 10 * sin(FinaleBossKogelRichting[i]);
            }
        }


        
    for( let i = 0; i < FinaleBossKogelX.length; i++) {
      if (FinaleBossKogelX[i] > spelerX - 50 && FinaleBossKogelY[i] > spelerY - 50 && FinaleBossKogelY[i] < spelerY + 50 && FinaleBossKogelX[i] < spelerX + 50) {
        FinaleBossKogelX.splice(i, 1)
        FinaleBossKogelY.splice(i, 1)
        // FinaleBossSchietRichting.splice(1)
        if (keyIsDown(C) && schildCooldown < 0 && schildGevonden) {
          schildCooldown =10
          } else
        health = health - 2
        
      }
    }



  

  // vijand krijgt damage van zwaard
  if (keyIsDown(R) && zwaardCooldown < 0 && zwaardGevonden) {
    for (let i = 0; i < vijandhealth.length; i++) {
      //knockback naar rechts
      if (vijandX[i] < spelerX + 125 && spelerY < vijandY[i] + 100 && spelerY > vijandY[i] - 100 && vijandX[i] > spelerX) {
        vijandhealth[i] = vijandhealth[i] - 20
        vijandX[i] = vijandX[i] + 50
      }
      //knockback naar links
      if (vijandX[i] > spelerX - 125 && spelerY > vijandY[i] - 100 && spelerY < vijandY[i] + 100 && vijandX[i] < spelerX) {
        vijandhealth[i] = vijandhealth[i] - 20
        vijandX[i] = vijandX[i] - 50
      }
      //knockback naar boven
      if (vijandY[i] > spelerY - 125 && spelerX > vijandX[i] - 100 && spelerX < vijandX[i] + 100 && vijandY[i] < spelerY) {
        vijandhealth[i] = vijandhealth[i] - 20
        vijandY[i] = vijandY[i] - 50
      }
      //knockback naar onder
      if (vijandY[i] < spelerY + 125 && spelerX < vijandX[i] + 100 && spelerX > vijandX[i] - 100 && vijandY[i] > spelerY) {
        vijandhealth[i] = vijandhealth[i] - 20
        vijandY[i] = vijandY[i] + 50
      }
    }
    // geeft damage aan ranged vijanden
    for (let i = 0; i < rangedVijandhealth.length; i++) {
      
    
      if (rangedVijandX[i] < spelerX + 125 && rangedVijandX[i] > spelerX - 125 && rangedVijandY[i] > spelerY - 125 && rangedVijandY[i] < spelerY + 125) {
        rangedVijandhealth[i] = rangedVijandhealth[i] - 20
      }
    }

      if (BossX < spelerX + 125 && BossX > spelerX - 125 && BossY > spelerY - 125 && BossY < spelerY + 125) {
        Bosshealth = Bosshealth - 50
  }
  if (FinaleBossX < spelerX + 125 && FinaleBossX > spelerX - 125 && FinaleBossY > spelerY - 125 && FinaleBossY < spelerY + 125) {
    FinaleBosshealth = FinaleBosshealth - 50
  }
    zwaardSlash = true;
    slashCooldown = 20
    zwaardCooldown = 10
  }

  if (slashCooldown < 0 && zwaardSlash) {
    zwaardSlash = false;
  }

  // vijand gaat dood
  for (let i = 0; i < vijandhealth.length; i++) {
    if (vijandhealth[i] <= 0) {
      vijandhealth.splice(i, 1)
      vijandX.splice(i, 1)
      vijandY.splice(i, 1)
      punten = punten + 10
    }
  }

  // rangedvijand gaat dood
  for (let i = 0; i < rangedVijandhealth.length; i++) {
    if (rangedVijandhealth[i] <= 0) {
      rangedVijandhealth.splice(i, 1)
      rangedVijandX.splice(i, 1)
      rangedVijandY.splice(i, 1)
      punten = punten + 50
    }
  }
  
 


  // speler bewegen
  if ((keyIsDown(LEFT_ARROW) && spelerMagLinksBewegen) || (keyIsDown(A) && spelerMagLinksBewegen)) {
    spelerX = spelerX - spelerSpeed;
    laatsteKey = LINKS;
  }

  if ((keyIsDown(RIGHT_ARROW) && spelerMagRechtsBewegen) || (keyIsDown(D) && spelerMagRechtsBewegen)) {
    spelerX = spelerX + spelerSpeed;
    laatsteKey = RECHTS;
  }

  if ((keyIsDown(UP_ARROW) && spelerMagBovenBewegen) || (keyIsDown(W) && spelerMagBovenBewegen)) {
    spelerY = spelerY - spelerSpeed;
    laatsteKey = BOVEN;
  }

  if ((keyIsDown(DOWN_ARROW) && spelerMagOnderBewegen) || (keyIsDown(S) && spelerMagOnderBewegen)) {
    spelerY = spelerY + spelerSpeed;
    laatsteKey = ONDER;
  }

  if ((keyIsDown(LEFT_ARROW) && spelerMagLinksBewegen && keyIsDown(UP_ARROW) && spelerMagBovenBewegen) || (keyIsDown(A) && spelerMagLinksBewegen && keyIsDown(W) && spelerMagBovenBewegen)) {
    spelerX = spelerX + spelerSchuinRem;
    spelerY = spelerY + spelerSchuinRem;
    laatsteKey = LINKS_BOVEN;
  }

  if ((keyIsDown(RIGHT_ARROW) && spelerMagRechtsBewegen && keyIsDown(UP_ARROW) && spelerMagBovenBewegen) || (keyIsDown(D) && spelerMagRechtsBewegen && keyIsDown(W) && spelerMagBovenBewegen)) {
    spelerX = spelerX - spelerSchuinRem;
    spelerY = spelerY + spelerSchuinRem;
    laatsteKey = RECHTS_BOVEN;
  }

  if ((keyIsDown(LEFT_ARROW) && spelerMagLinksBewegen && keyIsDown(DOWN_ARROW) && spelerMagOnderBewegen) || (keyIsDown(A) && spelerMagLinksBewegen && keyIsDown(S) && spelerMagOnderBewegen)) {
    spelerX = spelerX + spelerSchuinRem;
    spelerY = spelerY - spelerSchuinRem;
    laatsteKey = LINKS_ONDER;
  }

  if ((keyIsDown(RIGHT_ARROW) && spelerMagRechtsBewegen && keyIsDown(DOWN_ARROW) && spelerMagOnderBewegen) || (keyIsDown(D) && spelerMagRechtsBewegen && keyIsDown(S) && spelerMagOnderBewegen)) {
    spelerX = spelerX - spelerSchuinRem;
    spelerY = spelerY - spelerSchuinRem;
    laatsteKey = RECHTS_ONDER;
  }

 



  //vijand

  // vijandenbewegen
//for (let i = 0; i < vijandX[kamerStatus].length; i++) {
  for (let i = 0; i < vijandX.length; i++) {
    if (!(vijandX[i] > spelerX - 75 && spelerY > vijandY[i] - 75 && spelerY < vijandY[i] + 75 && vijandX[i] < spelerX + 75)) {
      vijandRichting[i] = atan2(spelerY - vijandY[i], spelerX - vijandX[i]);
      vijandX[i] += 2.5 * cos(vijandRichting[i]);
      vijandY[i] += 2.5 * sin(vijandRichting[i]);
    }
  }

  if (Bosshealth >= maxBossHealth/2 && kamerStatus === 13){
    if (!(BossX > spelerX - 125 && spelerY > BossY - 125 && spelerY < BossY + 125 && BossX < spelerX + 125)) {
      BossRichting = atan2(spelerY - BossY, spelerX - BossX);
      BossX += 2.5 * cos(BossRichting);
      BossY += 2.5 * sin(BossRichting);
    }
  }

  if (kamerStatus === 17){
    teleporterenCooldown--;
    if (FinaleBossPositie === FinaleBossBoven && teleporterenCooldown < 0) {
      FinaleBossX = 100
      FinaleBossY = 360
      FinaleBossPositie = FinaleBossLinks
      teleporterenCooldown = 100
    }
    if (FinaleBossPositie === FinaleBossLinks && teleporterenCooldown < 0) {
      FinaleBossX = 640
      FinaleBossY = 650
      FinaleBossPositie = FinaleBossOnder
      teleporterenCooldown = 100
    }
    if (FinaleBossPositie === FinaleBossOnder && teleporterenCooldown < 0) {
      FinaleBossX = 1200
      FinaleBossY = 360
      FinaleBossPositie = FinaleBossRechts
      teleporterenCooldown = 100
    }
    if (FinaleBossPositie === FinaleBossRechts && teleporterenCooldown < 0) {
      FinaleBossX = 640
      FinaleBossY = 100
      FinaleBossPositie = FinaleBossBoven
      teleporterenCooldown = 100
    }
  }

  //vijanden schieten

  


  //bewegen(oud)
  // if (spelerX - vijandX >= 10 && spelerY - vijandY >= 10 || spelerX - vijandX <= -10 && spelerY - vijandY <= -10) {
  //     if(spelerX>vijandX){
  //     vijandX += 2;
  //     }
  //     if(spelerX<vijandX){
  //     vijandX -= 2;
  //     }
  //     if(spelerY>vijandY){
  //     vijandY += 2;
  //     }
  //     if(spelerY<vijandY){
  //     vijandY -= 2;
  //     }


}


/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
let verwerkBotsing = function () {
  // botsing speler tegen vijand
  damageCooldown--;
  //botsing speler muur
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let tileIndex = tiles[y][x];
      if (tileIndex === 1 || tileIndex === 2 || tileIndex === 4) {
        let tileX = x * tileSize;
        let tileY = y * tileSize;

        if (spelerX + 50 > tileX && spelerX - 50 < tileX + tileSize) {
          //collision of block(top)
          if (spelerY + 50 > tileY && spelerY + 50 < tileY + 8) {
            spelerY = tileY - 50;

            spelerMagOnderBewegen = false;
            spelerOnderKnockback = false;
          }

          else {
            spelerMagOnderBewegen = true;
            
          }
          //collision of block(bottom)
          if (spelerY < tileY + tileSize && spelerY > tileY + tileSize - 8) {
            spelerY = tileY + tileSize;
            spelerMagBovenBewegen = false;
            spelerBovenKnockback = false;
          }

          else {
            spelerMagBovenBewegen = true;
            
          }
        }

        else {
          spelerMagOnderBewegen = true;
          spelerMagBovenBewegen = true;
          
        }


        if (spelerY + 50 > tileY && spelerY < tileY + tileSize) {
          //collision of block(right)
          
          if (spelerX - 50 < tileX + tileSize && spelerX - 50 > tileX + tileSize - 12) {
            spelerX = tileX + 50 + tileSize;
            spelerMagLinksBewegen = false;
            spelerLinksKnockback = false;
          }
          else {
            spelerMagLinksBewegen = true;
          }

          //collision of block(left)
          

          if (spelerX + 50 > tileX && spelerX + 50 < tileX + 12) {
            spelerX = tileX - 50;
            spelerMagRechtsBewegen = false;
            spelerRechtsKnockback = false;
          }
          else {
            spelerMagRechtsBewegen = true;
          }
        }

        else {
          spelerMagRechtsBewegen = true;
          spelerMagLinksBewegen = true;
          

        }

        // knockback naar rechts
        if (spelerX + 70 > tileX) {
          spelerRechtsKnockback = false;
        }
        else 
          
          spelerRechtsKnockback = true;
        

          // knockback naar links (werkt soms niet)
        if (spelerX - 70 < tileX + tileSize && spelerX - 70 > tileX + tileSize - 12) {
          spelerLinksKnockback = false;
        }

        else if (spelerX - 70 >=  tileX + tileSize) {
          
          spelerLinksKnockback = true;}


          // knockback naar boven (werkt soms niet)
        if (spelerY - 70 < tileY + tileSize && spelerY - 70 > tileY + tileSize - 12) {
          spelerBovenKnockback = false;
        }
        else if (spelerY - 70 >=  tileY + tileSize){
         
          spelerBovenKnockback = true;
        }
          // knockback naar Onder
        if (spelerY + 70 > tileY) {
          spelerOnderKnockback = false;
        }
        else 
      
          spelerOnderKnockback = true;
      }

      if (tileIndex === 3) {
        let tileX = x * tileSize;
        let tileY = y * tileSize;
        
          if (spelerX < tileX + tileSize + 10 && spelerX + 10 > tileX && spelerY < tileY + tileSize && spelerY > tileY - 30) {
          deathCooldown--;
          spelerX = tileX + 0.5 * tileSize
          spelerY = tileY + 0.3 * tileSize
          spelerX = spelerX + 5
          spelerY = spelerY + 15
          spelerSpin = true;
          zwaardGevonden = false;
          pistoolGevonden = false;
          schildGevonden = false;
              if (spelerWidth > 0 && spelerLength > 0) {
                
                spelerLength = spelerLength - 0.8
                spelerWidth = spelerWidth - 0.8
                
                }
              if (deathCooldown < - 20){
                health = 0
              }  
        }
      }
      if (tileIndex === 2) {
        let tileX = x * tileSize;
        let tileY = y * tileSize;
            for (let i = 0; i < kogelsX.length; i++) {
              // bovenste tile verandert als je er op schiet
              if (kamerStatus === 3 || kamerStatus === 14) {
                if (kogelsX[i] > tileX - 50 && kogelsY[i] > tileY - 20 && kogelsY[i] < tileY + 80) {
                kogelsX.splice(i, 1)
                kogelsY.splice(i, 1)
                kogelsRichting.splice(i, 1)
                kamerStatus = 14
                }
              }
              if (kamerStatus === 15) {
                if (kogelsX[i] > tileX - 50 && kogelsY[i] > tileY - 20 && kogelsY[i] < tileY + 80) {
                kogelsX.splice(i, 1)
                kogelsY.splice(i, 1)
                kogelsRichting.splice(i, 1)
                kamerStatus = 16
                }
              }
            }
        }
      if (tileIndex === 4) {
        let tileX = x * tileSize;
        let tileY = y * tileSize;
            for (let i = 0; i < kogelsX.length; i++) {
              // onderste tile verandert als je er op schiet
              if (kamerStatus === 3 || kamerStatus === 15) {
                if (kogelsX[i] > tileX - 50 && kogelsY[i] > tileY - 20 && kogelsY[i] < tileY + 80) {
                kogelsX.splice(i, 1)
                kogelsY.splice(i, 1)
                kogelsRichting.splice(i, 1)
                kamerStatus = 15
              }
            }
            if (kamerStatus === 14) {
              if (kogelsX[i] > tileX - 50 && kogelsY[i] > tileY - 20 && kogelsY[i] < tileY + 80) {
              kogelsX.splice(i, 1)
              kogelsY.splice(i, 1)
              kogelsRichting.splice(i, 1)
              kamerStatus = 16
              }
            }
          }
      }
    }
  }
 
 
  // spelerdamage en knockback
  for (let i = 0; i < vijandX.length; i++) {
    if (damageCooldown <= 0) {
      if (vijandX[i] >= spelerX - 75 && vijandX[i] <= spelerX && spelerY <= vijandY[i] + 50 && spelerY > vijandY[i] - 50) {
        if (keyIsDown(C) && schildCooldown < 0 && schildGevonden) {
        schildCooldown = 50
        } else
        health = health - 10;
        damageCooldown = 50
        if (spelerRechtsKnockback === true) {
        spelerX = spelerX + 30
        }
      
      }
      if (vijandX[i] <= spelerX + 75 && vijandX[i] >= spelerX && spelerY <= vijandY[i] + 50 && spelerY > vijandY[i] - 50) {
        if (keyIsDown(C) && schildCooldown < 0 && schildGevonden) {
          schildCooldown = 50
        } else 
          health = health - 10;
          damageCooldown = 50
          if (spelerLinksKnockback === true) {
            spelerX = spelerX - 30
        }
      }

        if (vijandY[i] <= spelerY + 75 && vijandY[i] >= spelerY && spelerX <= vijandX[i] + 50 && spelerX > vijandX[i] - 50) {
          if (keyIsDown(C) && schildCooldown < 0 && schildGevonden) {
            schildCooldown = 50
          } else 
            health = health - 10;
            damageCooldown = 50
            if (spelerBovenKnockback === true) {
              spelerY = spelerY - 30
        }
      }
        if (vijandY[i] >= spelerY - 75 && vijandY[i] <= spelerY && spelerX <= vijandX[i] + 50 && spelerX > vijandX[i] - 50) {
          if (keyIsDown(C) && schildCooldown < 0 && schildGevonden) {
            schildCooldown = 50
          } else 
            health = health - 10;
            damageCooldown = 50
            if (spelerOnderKnockback === true) {
              spelerY = spelerY + 30
            }
      }
    }
  }
  
 
  
  //schild damage 
  // for (let i = 0; i < vijandX.length; i++) {
  //   // if (keyIsDown(C) && schildCooldown < 0 && schildGevonden) {
  //     if (vijandX[i] >= spelerX - 75 && vijandX[i] <= spelerX && spelerY <= vijandY[i] + 50 && spelerY > vijandY[i] - 50) {
  //       health = health - 0;
  //       schildCooldown = 10
  //   }
  //    else if (vijandX[i] <= spelerX + 75 && vijandX[i] >= spelerX && spelerY <= vijandY[i] + 50 && spelerY > vijandY[i] - 50) {
  //     health = health - 0;
  //     schildCooldown = 10
  //   }
  //    else if (vijandY[i] <= spelerY + 75 && vijandY[i] >= spelerY && spelerX <= vijandX[i] + 50 && spelerX > vijandX[i] - 50) {
  //     health = health - 0;
  //     schildCooldown = 10
  //   }
  //    else if (vijandY[i] >= spelerY - 75 && vijandY[i] <= spelerY && spelerX <= vijandX[i] + 50 && spelerX > vijandX[i] - 50) {
  //     health = health - 0;
  //     schildCooldown = 10
  //   }
  // // }
  // // else {
  // //   health = health - 10;
  // // }
// }
  if (keyIsDown(C) && schildGevonden) {
  schildCooldown--;
}
  // botsing kogel en knockback tegen vijand

   for (let i = 0; i < kogelsX.length; i++) {
     for (let j = 0; j < vijandX.length; j++) {
      // knockback naar rechts
      if (kogelsX[i] > vijandX[j] - 75 && kogelsY[i] > vijandY[j] - 50 && kogelsY[i] < vijandY[j] + 50 && kogelsX[i] < vijandX[j]) {
        kogelsX.splice(i, 1)
        kogelsY.splice(i, 1)
        kogelsRichting.splice(i, 1)
        vijandhealth[j] = vijandhealth[j] - 20;
        vijandX[j] = vijandX[j] + 50
      }
      // knockback naar links
      if (kogelsX[i] < vijandX[j] + 75 && kogelsY[i] < vijandY[j] + 50 && kogelsY[i] > vijandY[j] - 50 && kogelsX[i] > vijandX[j]) {
        kogelsX.splice(i, 1)
        kogelsY.splice(i, 1)
        kogelsRichting.splice(i, 1)
        vijandhealth[j] = vijandhealth[j] - 20;
        vijandX[j] = vijandX[j] - 50
      }
      // knockback naar boven
      if (kogelsY[i] < vijandY[j] + 75 && kogelsX[i] < vijandX[j] + 50 && kogelsX[i] > vijandX[j] - 50 && kogelsY[i] > vijandY[j]) {
        kogelsX.splice(i, 1)
        kogelsY.splice(i, 1)
        kogelsRichting.splice(i, 1)
        vijandhealth[j] = vijandhealth[j] - 20;
        vijandY[j] = vijandY[j] - 50
      }
      // knockback naar Onder
      if (kogelsY[i] > vijandY[j] -75 && kogelsX[i] > vijandX[j] - 50 && kogelsX[i] < vijandX[j] + 50 && kogelsY[i] < vijandY[j]) {
        kogelsX.splice(i, 1)
        kogelsY.splice(i, 1)
        kogelsRichting.splice(i, 1)
        vijandhealth[j] = vijandhealth[j] - 20;
        vijandY[j] = vijandY[j] + 50
      }
    }

   for (let j = 0; j < rangedVijandX.length; j++) {
     // rangedvijand krijgt damage met pistool
     if (kogelsX[i] > rangedVijandX[j] - 50 && kogelsY[i] > rangedVijandY[j] - 50 && kogelsY[i] < rangedVijandY[j] + 50 && kogelsX[i] < rangedVijandX[j] + 50) {
      kogelsX.splice(i, 1)
      kogelsY.splice(i, 1)
      kogelsRichting.splice(i, 1)
      rangedVijandhealth[j] = rangedVijandhealth[j] - 20;
      
      }
    }
    if (kogelsX[i] > BossX - 100 && kogelsY[i] > BossY - 100 && kogelsY[i] < BossY + 100 && kogelsX[i] < BossX + 100) {
      kogelsX.splice(i, 1)
      kogelsY.splice(i, 1)
      kogelsRichting.splice(i, 1)
      Bosshealth = Bosshealth - 50;
      
      }

      if (kogelsX[i] > FinaleBossX - 100 && kogelsY[i] > FinaleBossY - 100 && kogelsY[i] < FinaleBossY + 100 && kogelsX[i] < FinaleBossX + 100) {
        kogelsX.splice(i, 1)
        kogelsY.splice(i, 1)
        kogelsRichting.splice(i, 1)
        FinaleBosshealth = FinaleBosshealth - 50;
        
        }
  }

  // botsing vijand tegen vijand (? hulp nodig)



}

/**
 * Tekent spelscherm
 */
let tekenAlles = function () {
  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');

  // achtergrond
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let tileIndex = tiles[y][x];
      image(tileImages[tileIndex], x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
  // vijanden 
  for (let i = 0; i < vijandX.length; i++) {
    image(image14, vijandX[i] - 50, vijandY[i] - 50, 100, 100);
  }

  for (let i = 0; i < rangedVijandX.length; i++) {
    image(image15, rangedVijandX[i] - 60, rangedVijandY[i] - 60, 125, 125);
  }

  // Boss tekening
    image(image12, BossX - 100, BossY - 100, 200, 200)

    //FinaleBoss tekening
    image(image13, FinaleBossX - 100, FinaleBossY - 100, 200, 200)

  // speler
  if (spelerSpin === false) {
    image(image2, spelerX - 50, spelerY - 50, spelerWidth, spelerLength); 
}
// zorgt ervoor dat de speler draait als die in een gat valt
  if (spelerSpin === true) {
    push();
          angle = angle + 4
          translate(spelerX,spelerY);
          rotate(angle);
          imageMode(CENTER);
          rectMode(CENTER);
          image(image2,0,0,spelerWidth,spelerLength);
          pop();
  }


  // kogel
  fill("red")
  for (let i = 0; i < kogelsX.length; i++) {
    ellipse(kogelsX[i], kogelsY[i], 15, 15) // image moet nog komen
  }

  //rangedvijandkogel
  
  for (let i = 0; i < rangedVijandKogelX.length; i++) {
    image(image16,rangedVijandKogelX[i], rangedVijandKogelY[i], 40, 40) // image moet nog komen
  }

  //finaleBossKogel
 
  for (let i = 0; i < FinaleBossKogelX.length; i++) {
    image(image16, FinaleBossKogelX[i], FinaleBossKogelY[i], 40, 40) // image moet nog komen
  }
  // if (kogelIsZichtbaar === true) {
  //   fill("red")
  //   ellipse(kogelX, kogelY, 20, 20)

  //   console.log("tekent kogel")
  // }

  //pistool

  image(image1, pistoolX, pistoolY, 70, 70);

  if (pistoolGevonden) {
    image(image1, spelerX - 90, spelerY - 20, 65, 65);
  }
  //zwaard
  image(image3, zwaardX, zwaardY, zwaardWidth, zwaardLength);

  if (zwaardGevonden && zwaardSlash === false) {
    image(image3, spelerX + 20, spelerY - 20, zwaardWidth, zwaardLength);
  }

  if (zwaardSlash) {
    image(image4, spelerX - 40, spelerY - 120, zwaardSlashWidth, zwaardSlashLength);
  }

  image(image9, schildX, schildY, 80, 80);

  if(schildGevonden && keyIsDown(C) && schildCooldown <= 0) {
    image(image9, spelerX - 68, spelerY - 20, 75, 75)
  }

  image(image17, deadSkeletonX, deadSkeletonY, 225, 225);

  // punten en health
}

let drawHealth = function () {

  // speler gezondheidsbalk
  strokeWeight(3);
  stroke(0);
  noFill();
  rect(60, 65, maxHealth * 2, 25);
  noStroke();
  fill('red');
  rect(61, 66, health * 2, 23);

  // vijand gezondheidsbalk
  for (let i = 0; i < vijandhealth.length; i++) {
    if (vijandhealth[i] < 60) {
      strokeWeight(3);
      stroke(0);
      noFill();
      rect(vijandX[i] - 75, vijandY[i] - 100, maxvijandHealth * 2, 20);
      noStroke();
      fill('green');
      rect(vijandX[i] - 75, vijandY[i] - 100, vijandhealth[i] * 2, 18);

    }
  }

   // rangedVijand gezondheidsbalk
   for (let i = 0; i < rangedVijandhealth.length; i++) {
    if (rangedVijandhealth[i] < 100) {
      strokeWeight(3);
      stroke(0);
      noFill();
      rect(rangedVijandX[i] - 75, rangedVijandY[i] - 100, maxRangedVijandHealth * 2, 20);
      noStroke();
      fill('green');
      rect(rangedVijandX[i] - 75, rangedVijandY[i] - 100, rangedVijandhealth[i] * 2, 18);
    }
  }

  
    if (Bosshealth > 0) {
      strokeWeight(3);
      stroke(0);
      noFill();
      rect(BossX - 75, BossY - 100, maxBossHealth * 2, 20);
      noStroke();
      fill('green');
      rect(BossX - 75, BossY - 100, Bosshealth * 2, 18);

  }

  if (FinaleBosshealth > 0) {
    strokeWeight(3);
    stroke(0);
    noFill();
    rect(FinaleBossX - 75, FinaleBossY - 100, FinaleBossMaxhealth * 2, 20);
    noStroke();
    fill('green');
    rect(FinaleBossX - 75, FinaleBossY - 100, FinaleBosshealth * 2, 18);

}
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

  angleMode(DEGREES);

}

function preload() {
  image1 = loadImage('afbeeldingen/pistool.png');
  image2 = loadImage('afbeeldingen/spritepoppetje.png');
  image3 = loadImage('afbeeldingen/sword.png');
  image4 = loadImage('afbeeldingen/swordslash.gif');
  image5 = loadImage('afbeeldingen/sea.gif');
  image6 = loadImage('afbeeldingen/groundBg.png');
  image7 = loadImage('afbeeldingen/roodwit.png');
  image8 = loadImage('afbeeldingen/heelzwartgat.png');
  image9 = loadImage('afbeeldingen/schild.png');
  image10 = loadImage('afbeeldingen/roodwit.png');
  image11 = loadImage('afbeeldingen/SpelMap.png');
  image12 = loadImage('afbeeldingen/firstPhaseBoss.png');
  image13 = loadImage('afbeeldingen/secondPhaseBoss.png');
  image14 = loadImage('afbeeldingen/meleevijand.png');
  image15 = loadImage('afbeeldingen/rangedvijand.png');
  image16 = loadImage('afbeeldingen/fireball.gif');
  image17 = loadImage('afbeeldingen/deadskeleton.png');
  tileImages = [image5, image6, image7, image8, image10]
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === 0) {
    startCooldown--;
    // teken Main Menu
    background('green');
    fill('black');
    textFont('mineCraft');
    textSize(100);
    text('Main Menu', 100, 180);
    
    if (startCooldown < 40) {
      textSize(50);
      fill('red');
      text('PRESS <ENTER>', 300, 580);
      if (keyIsDown(ENTER) && startCooldown < 20) {
        spelStatus = 1;
        startCooldown = 50
      }
    }
  }

  if (spelStatus === 1) {
    // teken Game-Inleiding
    startCooldown--;
    background('green')
    fill('yellow');
    textSize(30);
    text('Er was eens een held afkomstig uit een vredig dorp', 40, 300);
    text('Op een dag begonnen vreemde wezens het dorp aan te vallen en waren er geen overlevenden', 40, 330);
    text('De held was machteloos en kwam als enige levend weg', 40, 360);
    text('De vreemde wezens werden geleid door een keizer', 40, 390);
    text('Gedreven door woede en wraak zoekt hij de keizer en vindt uiteindelijk zijn locatie', 40, 420);
    text('De held reist ernaar toe met het doel zijn volk te wreken', 40, 450);
    text('[M om het spel te pauzeren en de map te bekijken]', 50, 480);
    

    if (startCooldown < 30) {
      textSize(50);
      text('Press <Enter> To Continue', 40, 600);
      if (keyIsDown(ENTER) && startCooldown < 0) {
        resetGame();
        spelStatus = 2

      }
    }
  }

  if (spelStatus === 2) {
    mapCooldown--
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    drawHealth(); // healthbar
    if (pistoolGevonden) {
      textSize(45)
      fill('red')
      let ammostring = ammunitie + " / " + maxammunitie
      text(ammostring, 1100, 600);
    }
    if (keyIsDown(M) && mapCooldown < 30) {
      spelStatus = 4;
      mapCooldown = 50;
    }
    if (health <= 0) {
      spelStatus = 3;
    }
    if (FinaleBosshealth <= 0) {
      spelStatus = 5;
    }
  }

  if (spelStatus === 3) {
    // teken game-over scherm
    background('red');
    textFont('mineCraft');
    textSize(100);
    fill('black')
    text('GAME OVER', 350, 180);
    textSize(30);
    text('TRY AGAIN: <ENTER>', 220, 380);
    text('QUIT GAME: <BACKSPACE>', 620, 380);
    text('punten:' + punten, 620, 680);
    //image(image1, 500, 50, 600, 600);
    if (keyIsDown(ENTER)) {
      resetGame();
      spelStatus = 2;
    }
    if (keyIsDown(BACKSPACE)) {
      resetGame();
      spelStatus = 0;
    }

  }

  if (spelStatus === 4) {
    mapCooldown--
    mapBlinkerCooldown--
    background('black');
    fill('white')
    textSize(50);
    text('MAP', 600, 100);
    textSize(100);
    text('PAUZE', 50, 150);
    textSize(20)
    text('WASD of pijltjes om  te bewegen', 50, 180);
    text('R om zwaard te slaan', 50, 210);
    text('Spatie om kogels te schieten', 50, 240);
    text('C om schild te gebruiken', 50, 270);
    text('Enter om items op te pakken', 50, 300);
    textSize(13)
    text('schiet op de rood witte blokken om een geheime deur te openen', 50, 330);
    image(image11, 400, 130, 700, 550);

    if (kamerStatus === 0) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 435, 270, 50, 50)
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
      ;
    }
    if (kamerStatus === 1 ) {
      if (mapBlinkerCooldown > 0) {
      image(image2, 435, 360, 50, 50);
      }
      if (mapBlinkerCooldown < - 30) {
      mapBlinkerCooldown = 60
      }
    }
    if (kamerStatus === 2) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 525, 360, 50, 50);
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
      
    }
    if (kamerStatus === 3) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 635, 360, 50, 50);
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
      
    }
    if (kamerStatus === 4) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 635, 270, 50, 50);
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
      
    }
    if (kamerStatus === 5) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 635, 180, 50, 50);
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
     
    }
    if (kamerStatus === 6) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 535, 180, 50, 50);
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
      
    }
    if (kamerStatus === 7) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 435, 180, 50, 50);
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
      
    }
    if (kamerStatus === 8) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 635, 440, 50, 50);
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
      
    }
    if (kamerStatus === 9) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 635, 520, 50, 50);
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
      
    }
    if (kamerStatus === 10) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 535, 520, 50, 50);
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
      
    }
    if (kamerStatus === 11) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 535, 615, 50, 50);
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
      
    }
    if (kamerStatus === 12) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 650, 615, 50, 50);
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
      
    }
    if (kamerStatus === 13) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 825, 360, 50, 50)
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
    }
    if (kamerStatus === 14) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 635, 360, 50, 50);
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
      
    }
    if (kamerStatus === 15) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 635, 360, 50, 50);
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
     
    }
    if (kamerStatus === 16) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 635, 360, 50, 50);
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
      
    }
    if (kamerStatus === 17) {
      if (mapBlinkerCooldown > 0) {
        image(image2, 825, 360, 50, 50)
        }
        if (mapBlinkerCooldown < - 30) {
        mapBlinkerCooldown = 60
        }
    }
    if (keyIsDown(M) && mapCooldown < 30) {
      mapCooldown = 50;
      spelStatus = 2
    }
  }
  if (spelStatus === 5) {
    restartCooldown--;
    // teken game-over scherm
    background('green');
    textFont('mineCraft');
    textSize(100);
    fill('white')
    text('CREDITS', 410, 100);
    textSize(30);
    text('ARON VAN DER VRING :)', 220, 180);
    text('YASSINE BENHADDOU :D', 620, 280);
    textSize(20);
    text('SPECIAL THANKS TO', 300, 400);
    text('JASPER GEERSE', 600, 400);
    text('NOAH DINH POLL', 600, 500);
    text('AYOUB ACHATBI', 600, 600);
    if (restartCooldown < 0) {
      fill('red');
      textSize(30);
      text('PRESS <ENTER> TO RESTART',600,700);
      if (keyIsDown(ENTER) && restartCooldown < - 10) {
        resetGame();
        spelStatus = 0;
      }
    }
  }
}
