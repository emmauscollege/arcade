
// startscherm
var startscherm = true;

//speler


var speler  = {
 y: 640, // speler y
 x: 300, // speler x
 width: 60, // speler width
 height: 75 // speler height
}




var imgPlatform; // afbeelding voor platform

var imgSky; // afbeelding voor de achtergrond
var imgKaas; // afbeelding voor de grond

var imgTempel; // afbeelding voor tempel


var Font; // variabel voor de main font
var Font2; // variabel voor de titel font
var loop1rechts; // afbeelding voor langzaam lopen naar rechts 
var loop2rechts; // afbeelding voor snel lopen naar rechts

var loop1links; // afbeelding voor langzaam lopen naar links
var loop2links; // afbeelding voor snel lopen naar links
var staanRechts; // afbeelding voor staan naar rechts kijkend
var staanLinks; // afbeelding voor naar links kijkend
var gifLava; // afbeelding voor  lava
var gifHeart; // afbeelding voor de hartjes van de speler
var imgCoin; // afbeelding voor  de coins
var spelerImg; // afbeelding voor de speler
var spelerFacing = 'rechts'; // variabele voor de kant waarop de speler kijkt
var imgArrow; // afbeelding voor de pijl naar rechts op het beginscherm
var imgArrow2; // afbeelding voor de pijl naar links op het beginscherm


// het ruimteship met plaatjes en posities
var imgShip;
const shipX = 50;
const shipY = 570;

// kristal
var imgSaber;
var lightsaberX = 600;
var lightsaberY = 480;

var lightsaberShown = 1; // variabel voor het laten zien van de lightsaber

//variabelen voor het springen
var grond = 640; // de grond y positie 
var spaceCooldown = false; // de cooldown van de jump
var springSnelheid = 10; // de begin snelheid van de sprong
var gFactor = 0.4; // de zwaartekracht

var hoogte = true;
var springHoogte = 10;

// Coins die je hebt (soort van score)
var amountCoins = 0;

// de keys die je indrukt met keycode
const X = 88;
const Z= 90;
const A = 65;
const D = 68;
const I = 73;
const E = 69;
const F = 70;
const UP = 38;
const DOWN = 40;

// of je de KeyBinds kan zien of niet
var tipsShown = 1;

// Canvas Update
var canvasStatus = 1;

// health van de speler
var health = 100;



//platformen, het nummmer geeft de canvas van het platform aan
var platform3X = [320,640,960,320,0,960,1120];
var platform3Y = [560,480,560,360,280,360,360];
var platformWidth = 160;
var platformHeight = 40;

var platform2X = [480,640,1120,960,1120];
var platform2Y = [550,550,550,280,280 ];



var platform4X = [0,960,640,320];
var platform4Y = [360,560,440,560];

var platform5X = [320,1120,620];
var platform5Y = [520,520,440];

var platform6X = [20,1000];
var platform6Y = [520,520];
// de grond
var grondX1 = [0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120, 1200, 1280];
var grondX2 = [0, 80, 160, 240];
var grondX4 = [0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120, 1200, 1280];

// alle sounds

const boss = new Audio ("SFX/boss.mp3");
const select = new Audio ("SFX/select.mp3");
const jump = new Audio ("SFX/sprong.mp3");
const startsong = new Audio ("SFX/startscherm.mp3");
const item = new Audio ("SFX/item.mp3");
const death = new Audio ("SFX/death.mp3");
const muziek = new Audio ("SFX/main.mp3");

const error = new Audio ("SFX/error.mp3");
const bosscry = new Audio ("SFX/bosssCry.mp3");
const coinSound = new Audio ("SFX/coinSound.mp3");



//boss informatie
var bossX = 650;
var bossY = 440;
var bossWidth = 300;
var bossHeight = 200;
var bossAlive = true;

var play; // start select van het beginscherm

var playscherm; // start het spel

var spaceX = 0; // coordinaten van de title
var survivalX = 1280; // coordinaten van de title

// bosshealth
var bossHealth = 500;
var jump1 = false; // jump variable

var light1 = false;

var saber1; // opstartende saber van het beginscherm
var saber2; // blinkende saber van het beginscherm

var lightImg; // lightsaber image

var dragonLinks; // plaatje draak naar links
var dragonRechts;  // plaatje draak naar rechts
var dragonImg; // dit wordt gebruikt om de draak afbeelding te draaien

var hitBoxY = 75; // hitbox width
var hitBoxX = 200; // hitbox height

// of je aan kan vallen
var attack = false;
var attackCooldown = 30;

//of de hitbox aan staat / te zien is
var active;
var active2;

var linksBoss = true; // links bewegen van de boss
var rechtsBoss = false; // rechts bewegen van de boss
var strike; // plaatje attack rechts
var strike2; // plaatje attack links




var pickup; // pickup van de saber

var fireball; // fireball


var minionLinks = true; // bewegen van de wizard naar links
var minionRechts = false;  // bewegen van de wizard naar links
// alles voor de wizard, x, y hoogte breedte en health
var wiz = {
    x3 : 1000,
    y3: 280,
    
    width : 80,
    height : 80,
    health3:10,
   

}
var wizImg; // afbeelding voor de wizard

var fireX  = 900; // x van eerste fireball
var fireX2  = 300;  // x van tweede fireball
var fireY = 560;  // y van fireball
var fireWidth = 80;  // breedte van eerste fireball
var fireHeight = 40;   // lengte van eerste fireball

var fireBegin = false // begin van de eerste fireball schieten
var fireBegin2 = false // begin van de tweede fireball schieten



var coin = { // alles over de coin, aangegeven per canvas
    can1x  : [600,800,1000],
    can1y :[580,580,580],
    can2x : [1120,1180,1240,1080,1020,960],
    can2y : [210,210,210,210,210,210],
    can3x : [960,1020,1080,960,1020,1080],
    can3y : [500,500,500,440,440,440],
    width : 40,
    height : 40,
    pickedUp1 : [1,1,1],
    pickedUp2 : [1,1,1,1,1,1],
    pickedUp3: [1,1,1,1,1,1]
}

var fireball2;

var lava = { // alles over de lava aangegeven per canvas
    x2 : [320,640,960],
    x3 : [320,640,960],
    x4 : [1,320,640,960],
    y : 630,
    width : 320,
    height : 90,

} 
 var move3Y = true; // bewegen van het platform op canvs 3
 
 var move = { // bewegen van de platforms op canvs 4
   y4 : [true,false ,true,false],
  
 } 

 var moveX61 = 'rechts'; // bewegen van het platform op canvs 6
 var moveX62 = 'links'; // bewegen van het platform op canvs 6
 var purpleEquip; // equip van de lightsaber

 var bewegen = true; // checkend of speler kan bewegen

 var victory; // checken of de speler heeft gewonnen

 var hoogte = true;