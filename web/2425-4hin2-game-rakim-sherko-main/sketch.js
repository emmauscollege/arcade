/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */


// Load the image and create a p5.Image object.


/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path=".vscode/p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const menu = 0
const SPELEN = 1;
const GAMEOVER = 2;
const PAUSE = 3;
var spelStatus = menu
const KEY_Q = 81;
const Key_Left = 65;
const Key_right = 68;
const Key_up = 87;
const Key_Left2 = 74;
const Key_right2 = 76;
const Key_up2 = 73;
const Key_U = 85;
const Key_R = 82
const Key_P = 80
const grond = 450;
const key_e = 69;
const key_d = 68;
const key_q = 81;
const key_j = 74;
const key_l = 76;
const key_a = 65;
let toonSpeler = true;
let spelerImg;
let spelerImg_run;
let spelerimg_attack;
let spelerimg_runleft
let spelerImg2;
let spelerImg_run2;
let spelerimg_attack2;
let spelerimg_runright2;
var showControls = false;
var menuFont = false;
var menu_background = false;
var spelerX = 150; // x-positie van speler
var spelerY = 600; // y-positie van speler
var speler2X = 1050; // x-positie van speler2
var speler2Y = 600; // y-positie van speler2
var health = 100;  // health van speler 1
var healthlow = 50;
var healthlow2 = 50;
var health2 = 100; // health van speler 2
var botsing = false;
var Springsnelheid = 0;
var Springsnelheid2 = 0;
var SpringsnelheidStart = 20;
var zwaartekracht = 0.5;
var SpelerSpringt = false;
var Speler2Springt = false;
var img = false; // achtergrond plaatje
var Attack = 1;
var ATTACK_COOLDOWN = 100;
var ATTACK_DOING = false;
var ATTACK_TIMER_START = 5;
var attackTimer = 2;
var ATTACK_WAIT = true;
var COOLDOWN_TIMER = false;
var Attack2 = 1;
var ATTACK_COOLDOWN2 = 100;
var ATTACK_DOING2 = false;
var ATTACK_TIMER_START2 = 5;
var attackTimer2 = 2;
var ATTACK_WAIT2 = true;
var COOLDOWN_TIMER2 = false;
var kunai = false;
var kunai_cooldown = 500;
var kunai_wait = true;
var kunai_cooldown_timer = false;
var kunaiX = spelerX;
var kunaiY = spelerY;
var img_kunai_right = false;
var img_kunai_left = false;
var kunai_vliegt = false;
var kunai_cooldown2 = 500;
var kunai_wait2 = true;
var kunai_cooldown_timer2 = false;
var kunai2X = speler2X;
var kunai2Y = speler2Y;
var img_kunai_right2 = false;
var img_kunai_left2 = false;
var kunai_vliegt2 = false;
var key_o = 79;
var img_lose = false;
var img_win = false;
var img_play_again = false;
var img_pause = false
var key_space = 32;
var background_music;
var speler1_spritesheet;
var frameIndex = 0;
var totalFrames = 4; // Aantal frames in je sprite sheet
var frameWidth = 64;
var frameHeight = 128;
var frameSpeed = 5; // Hoe snel frames wisselen (lagere waarde = sneller)
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
//link

//bewegen spelers
var beweegAlles = function () {
  console.log("botsing:" + botsing)

  //bewegen speler
  if ((keyIsDown(Key_Left) && botsing === false) ||
    (keyIsDown(Key_Left) && botsing == true && spelerX < speler2X)) {
    spelerX = spelerX - 6
  }
  //rechts
  if ((keyIsDown(Key_right) && botsing === false) ||
    (keyIsDown(Key_right) && botsing == true && spelerX > speler2X)) {
    spelerX = spelerX + 6
  }
  //springen speler 1
  if (SpelerSpringt === false && keyIsDown(Key_up)) {
    SpelerSpringt = true;
    Springsnelheid = SpringsnelheidStart
  }
  if (SpelerSpringt === true) {
    spelerY = spelerY - Springsnelheid;
    Springsnelheid = Springsnelheid - zwaartekracht;
  }
  if (spelerY > 610) {
    SpelerSpringt = false;
  }
  if (spelerY >= grond) {
    spelerY = grond
    SpelerSpringt = false;
    Springsnelheid = 0
  }
  //bewegen speler2
  if ((keyIsDown(Key_Left2) && botsing === false) ||
    (keyIsDown(Key_Left2) && botsing == true && speler2X < spelerX)) {
    speler2X = speler2X - 6
  }
  //rechts
  if ((keyIsDown(Key_right2) && botsing === false) ||
    (keyIsDown(Key_right2) && botsing == true && speler2X > spelerX)) {
    speler2X = speler2X + 6
  }

  //springen speler2
  if (Speler2Springt === false && keyIsDown(Key_up2)) {
    Speler2Springt = true;
    Springsnelheid2 = SpringsnelheidStart
  }
  if (Speler2Springt === true) {
    speler2Y = speler2Y - Springsnelheid2;
    Springsnelheid2 = Springsnelheid2 - zwaartekracht;
  }
  if (speler2Y >= grond) {
    speler2Y = grond
    Speler2Springt = false;
    Springsnelheid2 = 0
  }
  //randen
  //randen speler 1
  if (spelerX - 20 < 0) {
    spelerX = 20

  }
  if (spelerX + 80 > width) {
    spelerX = width - 80;

  }

  //randen speler 2
  if (speler2X - 20 < 0) {
    speler2X = 20

  }
  if (speler2X + 80 > width) {
    speler2X = width - 80;

  }

  // vijand

  // kunai

  if (kunai_vliegt === false && kunai_wait && keyIsDown(key_e)) {
    kunai_vliegt = true
    kunai_wait = false
    kunai_cooldown_timer = kunai_cooldown
    kunaiX = spelerX
    kunaiY = spelerY + 120
  }
  if (kunai_vliegt === true && spelerX < speler2X) {
    kunaiX = kunaiX + 20;
  }
  else {
    kunaiX = kunaiX - 20
  }
  if (kunai_vliegt === true &&
    kunaiX - 150 > width || kunaiX < 0) {
    kunai_vliegt = false
  }
  //kunai speler2
  if (kunai_vliegt2 === false && kunai_wait2 &&
    keyIsDown(key_o)) {
    kunai_vliegt2 = true
    kunai_wait2 = false
    kunai_cooldown_timer2 = kunai_cooldown2
    kunai2X = speler2X
    kunai2Y = speler2Y + 120
  }
  if (kunai_vliegt2 === true && speler2X < spelerX) {
    kunai2X = kunai2X + 20;
  }
  else {
    kunai2X = kunai2X - 20
  }
  if (kunai_vliegt2 === true &&
    kunai2X - 150 > width || kunai2X < 0) {
    kunai_vliegt2 = false
  }
};

/**
 * Checkt botsingen

 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkAanval = function () {

  // speler1 attack 
  if (keyIsDown(KEY_Q) && Attack == ATTACK_WAIT) {
    Attack = ATTACK_DOING;
    console.log("player1: ATTACK_DOING")
    attackTimer = ATTACK_TIMER_START;
  }

  if (Attack == ATTACK_DOING) {
    attackTimer = attackTimer - 1;
  }

  if (Attack == ATTACK_DOING && attackTimer <= 0) {
    Attack = ATTACK_COOLDOWN;
    console.log("player1: ATTACK_COOLDOWN")
    COOLDOWN_TIMER = 10
  }
  if (Attack == ATTACK_COOLDOWN && COOLDOWN_TIMER < 0) {
    Attack = ATTACK_WAIT;
    console.log("speler1: ATTACK_WAIT")
  }
  if (Attack == ATTACK_COOLDOWN) {
    COOLDOWN_TIMER = COOLDOWN_TIMER - 1
  }

  // speler2 attack
  if (keyIsDown(Key_U) && Attack2 == ATTACK_WAIT2) {
    Attack2 = ATTACK_DOING2;
    console.log("player1: ATTACK_DOING2")
    attackTimer2 = ATTACK_TIMER_START2;
  }

  if (Attack2 == ATTACK_DOING2) {
    attackTimer2 = attackTimer2 - 1;
  }

  if (Attack2 == ATTACK_DOING2 && attackTimer2 <= 0) {
    Attack2 = ATTACK_COOLDOWN2;
    console.log("player1: ATTACK_COOLDOWN2")
    COOLDOWN_TIMER2 = 10
  }
  if (Attack2 == ATTACK_COOLDOWN2 && COOLDOWN_TIMER2 < 0) {
    Attack2 = ATTACK_WAIT2;
    console.log("speler1: ATTACK_WAIT2")
  }
  if (Attack2 == ATTACK_COOLDOWN2) {
    COOLDOWN_TIMER2 = COOLDOWN_TIMER2 - 1
  }

  // botsing speler tegen vijand
  if (spelerX - speler2X < 101 &&
    spelerX - speler2X > -101 &&
    spelerY - speler2Y < 231 &&
    spelerY - speler2Y > -231) {

    botsing = true;
    // attack speler 1
    if (Attack == ATTACK_DOING) {
      health2 = health2 - 1
    }
    // attack speler 2
    if (Attack2 == ATTACK_DOING2) {
      health = health - 1
    }
  }
  else {
    botsing = false;
  }
  if (health == 0) {
    spelStatus = GAMEOVER;
  }
  if (health2 == 0) {
    spelStatus = GAMEOVER;
  }
  //kunai speler
  if (kunai_wait === false) {
    kunai_cooldown_timer = kunai_cooldown_timer - 1
    console.log("Kunai cooldown timer:", kunai_cooldown_timer);
    if (kunai_cooldown_timer <= 0) {
      kunai_wait = true
      console.log("Kunai_wait");
    }
  }
  if (
    kunai_vliegt &&
    kunaiX + 120 > speler2X - 20 &&
    kunaiX < speler2X + 80 &&
    kunaiY + 120 > speler2Y - 75 &&
    kunaiY < speler2Y + 230
  ) {
    health2 = health2 - 15;
    if (health2 < 0) {
      health2 = 0

    }
    kunai_vliegt = false;
  }
  //speler2 kunai
  if (kunai_wait2 === false) {
    kunai_cooldown_timer2 = kunai_cooldown_timer2 - 1
    console.log("Kunai cooldown timer2:", kunai_cooldown_timer2);
    if (kunai_cooldown_timer2 <= 0) {
      kunai_wait2 = true
      console.log("Kunai_wait2");
    }
  }
  if (
    kunai_vliegt2 &&
    kunai2X + 120 > spelerX - 20 &&
    kunai2X < spelerX + 80 &&
    kunai2Y + 120 > spelerY - 75 &&
    kunai2Y < spelerY + 230
  ) {
    health = health - 15;
    if (health < 0) {
      health = 0

    }         // speler2 verliest 10 HP
    kunai_vliegt2 = false;  // kunai verdwijnt na botsing
  }
}



// botsing kogel tegen vijand

// update punten en health



/**
 * Tekent spelscherm
 */
var tekenAlles = function () {

  if (spelerImg) {
    image(spelerImg, 0, 0);
  } else {
    background(255, 0, 0); // rood scherm als het niet geladen is
  }

  let sx = frameIndex * frameWidth;
  let sy = 0;
  image(speler1_spritesheet, spelerX - 20, spelerY - 75, 100, 200, sx, sy, frameWidth, frameHeight);

  // Update frame index
  if (frameCount % frameSpeed === 0) {
    frameIndex = (frameIndex + 1) % totalFrames;
  }
  //menu 



  // vijand


  // Draw the image.
  image(img, 0, 0, width, height);


  // kunai
  if (kunai_vliegt === true && spelerX < speler2X) {
    image(img_kunai_right, kunaiX, kunaiY - 80, 150, 150)
  }
  if (kunai_vliegt == true && spelerX > speler2X)
    image(img_kunai_left, kunaiX, kunaiY - 80, 150, 150)
  //kunai2
  if (kunai_vliegt2 === true && speler2X < spelerX) {
    image(img_kunai_right, kunai2X, kunai2Y - 80, 150, 150)
  }
  if (kunai_vliegt2 == true && speler2X > spelerX)
    image(img_kunai_left, kunai2X, kunai2Y - 80, 150, 150)
  // speler 1 



  // fill("blue"); rect(spelerX - 20, spelerY - 75, 100, 230); fill("black"); elipse(spelerX, spelerY, 30, 10);

  //speler 2

  // fill("red");rect(speler2X - 20, speler2Y - 75, 100, 230);fill("black");ellipse(speler2X, speler2Y, 30, 10);

  // punten en health

  fill("gray")
  rect(50, 80, 100 * 3, 30)

  if (health < 20) {
    fill("red");
  } else if (health < 50) {
    fill("yellow");
  } else {
    fill("green");
  }

  rect(50, 80, health * 3, 30);

  fill("gray")
  rect(930, 80, 100 * 3, 30)

  if (health2 < 20) {
    fill("red");
  } else if (health2 < 50) {
    fill("yellow");
  } else {
    fill("green");
  }

  rect(930, 80, health2 * 3, 30);


};

function tekenmenu() {
  image(menu_background, 0, 0, width, height)
  textAlign(CENTER);
  textSize(40);
  fill("black");
  textFont(menuFont)
  text(" Press-SPACE-to-Play", width / 2, height / 2 - 40);
  text("press-E-for-Controls", width / 2, height / 2 + 10);

  if (showControls) {

    fill(255, 255, 255, 230);
    stroke(0);
    strokeWeight(2);
    rect(width / 2 - 300, height / 2 - 180, 600, 320, 20);

    // Title
    noStroke();
    fill(0);
    textSize(32);
    text("Controls", width / 2, height / 2 - 130);

    // Controls list
    textSize(20);
    textAlign(LEFT);
    let x = width / 2 - 280;
    let y = height / 2 - 90;
    let spacing = 30;

    text("Player 1:", x, y);
    text("- Move Left: A", x, y + spacing);
    text("- Move Right: D", x, y + spacing * 2);
    text("- Jump: W", x, y + spacing * 3);
    text("- Melee Attack: Q", x, y + spacing * 4);
    text("- Throw Kunai: E", x, y + spacing * 5);
    text("- Pause Game: R ", x, y + spacing * 6);
    text("- Resume Game: C ", x, y + spacing * 7);

    text("Player 2:", x + 300, y);
    text("- Move Left: J", x + 300, y + spacing);
    text("- Move Right: L", x + 300, y + spacing * 2);
    text("- Jump: I", x + 300, y + spacing * 3);
    text("- Melee Attack: U", x + 300, y + spacing * 4);
    text("- Throw Kunai: O", x + 300, y + spacing * 5);
    text("- Throw Kunai: O", x + 300, y + spacing * 6);
    text("- Throw Kunai: O", x + 300, y + spacing * 7);
  }
}

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */
function preload() {

  spelerImg = loadImage("images/Naruto_Stand.gif");
  spelerimg_attack = loadImage("images/naruto_attack.gif")
  spelerImg_run = loadImage("images/naruto_run.gif")
  spelerimg_runleft = loadImage("images/naruto_run_left.gif")
  spelerImg2 = loadImage("images/sasuke_stand.gif")
  spelerimg_attack2 = loadImage("images/sasuke_attack.gif")
  spelerImg_run2 = loadImage("images/sasuke_run.gif")
  spelerimg_runright2 = loadImage("images/sasuke_run_right.gif")
  speler1_spritesheet = loadImage("images/speler1_spritesheet.png");
  background_music = loadSound("music/Turn_Over.mp3");
  img = loadImage('images/gameplay_background.gif');
  img_kunai_right = loadImage("images/kunai_right.png");
  img_kunai_left = loadImage("images/kunai_left.png");
  img_win = loadImage("images/win.png");
  img_lose = loadImage("images/lose.png");
  menu_background = loadImage("images/menu_background_image.png")
  menuFont = loadFont("font/njnaruto.ttf");
  img_pause = loadImage("images/pause.png");
}
/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */

function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
  if (background_music) {
    background_music.loop();
  }
  // Kleur de achtergrond blauw, zodat je het kunt zien

}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === menu) {
    tekenmenu();
  }
  if (spelStatus === menu && keyIsDown(key_space)) {
    spelStatus = SPELEN;
  }
  if (keyIsDown(key_e)) {
    showControls = true;
  } else {
    showControls = false;
  }
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkAanval();
    tekenAlles();
    if (health <= 0) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER && health === 0) {
    image(img_win, 800, 100, 400, 300)
    image(img_lose, 100, 100, 400, 300)
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255);
    text("Press SPACE to play again", width / 2, height / 2 + 200);

  }
  if (spelStatus === GAMEOVER && health2 === 0) {
    image(img_lose, 800, 100, 400, 300)
    image(img_win, 100, 100, 400, 300)
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255);
    text("Press SPACE to play again", width / 2, height / 2 + 200);


  }

  if (spelStatus === GAMEOVER && keyIsDown(key_space)) { // 32 = SPACE
    // Reset all variables to initial state
    spelStatus = SPELEN;
    health = 100;
    health2 = 100;
    spelerX = 150;
    spelerY = grond;
    speler2X = 1050;
    speler2Y = grond;
    Attack = ATTACK_WAIT;
    Attack2 = ATTACK_WAIT2;
    kunai_vliegt = false;
    kunai_vliegt2 = false;
    kunai_wait = true;
    kunai_wait2 = true;
    // Reset cooldowns/timers
    COOLDOWN_TIMER = false;
    COOLDOWN_TIMER2 = false;
  }

  if (keyIsDown(82)) { // 82 = 'R'
    spelStatus = PAUSE;
  }

  if (spelStatus === PAUSE) {
    image(img_pause, 400, 110, 500, 400)
  }
  if (spelStatus === PAUSE && keyIsDown(67)) { // 67 = 'C'
    spelStatus = SPELEN;

  }
  if (keyIsDown(80)) { // 80 = 'P'
    spelStatus = PAUSE;
  }

  if (spelStatus === PAUSE) {
    image(img_pause, 400, 110, 500, 400)
  }
  if (spelStatus === PAUSE && keyIsDown(77)) { // 77 = 'M'
    spelStatus = SPELEN;
  }
  // SPELER 1 animatie
  if (keyIsDown(81)) {
    // Q ingedrukt → aanval
    image(spelerimg_attack, spelerX, spelerY, 200, 270);


  }
  else if (keyIsDown(68)) {
    // D ingedrukt → rennen
    image(spelerImg_run, spelerX, spelerY, 200, 270);
  }
  else if (keyIsDown(65)) {
    image(spelerimg_runleft, spelerX, spelerY - 10, 200, 270)
    
  }
  else {
    // Anders → gewone speler tonen
    image(spelerImg, spelerX, spelerY, 200, 230);
  }
  if (keyIsDown(81) && keyIsDown(68)) {
    spelerX = spelerX - 5.8
  }

  // speler 2 animatie


  if (keyIsDown(85)) {
    // U ingedrukt → aanval
    image(spelerimg_attack2, speler2X, speler2Y, 200, 270);


  }
  else if (keyIsDown(76)) {
    image(spelerimg_runright2, speler2X, speler2Y - 10, 200, 270)
  }
  else if (keyIsDown(74)) {
    // D ingedrukt → rennen
    image(spelerImg_run2, speler2X, speler2Y - 10, 200, 270);
  }
  else {
    // Anders → gewone speler tonen
    image(spelerImg2, speler2X, speler2Y - 5, 180, 270);
  }
  
  if (keyIsDown(85) && keyIsDown(74)) {
    speler2X = speler2X + 5.8

  }
}
