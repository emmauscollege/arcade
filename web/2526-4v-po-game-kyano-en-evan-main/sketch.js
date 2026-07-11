const INTRO = 0;
const SPELEN = 1;
const GAMEOVER = 2;
const EXPLOSIE = 3;

var spelStatus = INTRO;

var explosieTimer = 0;
var geraaktIndex = -1;

var punten = 0;
var achievement = "";

/* 🏆 ACHIEVEMENTS */
var achievementMelding = "";
var achievementTimer = 0;
var laatsteAchievement = "";

/* ⚡ POWER-UPS */
var powerUpX = 650;
var powerUpY = -200;

var powerUpMelding = "";
var powerUpTimer = 0;
var powerUpColor = "yellow";

/* 🛡️ SHIELD */
var invincible = false;
var invincibleTimer = 0;

/* ⚡ SPEED BOOST */
var speedBoost = false;
var speedBoostTimer = 0;

/* 🐢 SLOW MOTION */
var slowMo = false;
var slowMoTimer = 0;

/* 💰 SCORE BOOST */
var scoreBoostTimer = 0;

/* 🌊 WAVE EFFECT */
var waveOffset = 0;

/* SPELER */
var spelerX = 650;
var spelerY = 600;

/* OBSTAKELS */
var obstakelX = [350, 950];
var obstakelY = [-50, -350];
var obstakelSnelheid = 2;

var magBewegen = true;

/* IMAGES */
var zelfgemaaktekoelkastImg;
var zelfgemaaktekoelkastExplosieImg;
var spelerAfbeelding;
var gameoverSpelerafbeelding;

/* ---------------- BEWEGEN ---------------- */

var beweegAlles = function() {

  if (((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && spelerX > 350) && magBewegen) {
    spelerX -= 300;
    magBewegen = false;
  }

  if (((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && spelerX < 950) && magBewegen) {
    spelerX += 300;
    magBewegen = false;
  }

  if (!keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
    magBewegen = true;
  }

  /* OBSTAKELS */
  for (var i = 0; i < obstakelY.length; i++) {
    obstakelY[i] += obstakelSnelheid;

    if (obstakelY[i] > 620) {
      var baan = floor(random(3));

      if (baan === 0) obstakelX[i] = 350;
      if (baan === 1) obstakelX[i] = 650;
      if (baan === 2) obstakelX[i] = 950;

      obstakelY[i] = -50;
    }
  }

  /* SPEED SCALING */
  var speedMultiplier = 1;
  if (speedBoost) speedMultiplier = 1.6;
  if (slowMo) speedMultiplier = 0.6;

  obstakelSnelheid += punten * 0.0002 * speedMultiplier;
  if (obstakelSnelheid > 16) obstakelSnelheid = 16;

  /* POWER-UP MOVE */
  powerUpY += 4;

  if (powerUpY > 720) {
    powerUpY = -200;
    powerUpX = random([350, 650, 950]);
  }
};

/* ---------------- COLLISIE ---------------- */

var verwerkBotsing = function() {

  /* POWER-UP */
  if (
    spelerX + 50 > powerUpX - 20 &&
    spelerX - 50 < powerUpX + 20 &&
    spelerY + 50 > powerUpY - 20 &&
    spelerY - 50 < powerUpY + 20 &&
    invincible === false
  ) {

    var roll = floor(random(4));

    /* 🛡️ SHIELD */
    if (roll === 0) {
      invincible = true;
      invincibleTimer = 300;
      powerUpMelding = "🛡️ SHIELD ACTIVE!";
      powerUpTimer = 120;
      powerUpColor = "blue";
    }

    /* ⚡ SPEED BOOST */
    if (roll === 1) {
      speedBoost = true;
      speedBoostTimer = 300;
      powerUpMelding = "⚡ SPEED BOOST!";
      powerUpTimer = 120;
      powerUpColor = "orange";
    }

    /* 🐢 SLOW MOTION */
    if (roll === 2) {
      slowMo = true;
      slowMoTimer = 300;
      powerUpMelding = "🐢 SLOW MOTION!";
      powerUpTimer = 120;
      powerUpColor = "cyan";
    }

    /* 💰 SCORE BOOST */
    if (roll === 3) {
      scoreBoostTimer = 300;
      powerUpMelding = "💰 SCORE BOOST!";
      powerUpTimer = 120;
      powerUpColor = "gold";
    }

    powerUpY = -200;
  }

  /* OBSTAKELS */
  for (var i = 0; i < obstakelX.length; i++) {

    if (
      spelerX + 99 > obstakelX[i] - 1 &&
      spelerX - 69 < obstakelX[i] + 1 &&
      spelerY + 99 > obstakelY[i] - 1 &&
      spelerY - 99 < obstakelY[i] + 1
    ) {

      if (invincible === false) {
        spelStatus = EXPLOSIE;
        explosieTimer = 50;
        geraaktIndex = i;
      }
    }
  }
};

/* ---------------- TEKENEN ---------------- */

var tekenAlles = function() {

  background(230, 220, 200);

  fill(180, 140, 100);
  rect(0, 500, width, 220);

  fill(120);
  rect(200, 300, 800, 100);

  fill(150, 100, 50);
  rect(220, 320, 150, 80);
  rect(400, 320, 150, 80);
  rect(580, 320, 150, 80);
  rect(760, 320, 150, 80);

  fill(230);
  rect(1000, 150, 150, 250);

  fill(100, 180, 255);
  rect(450, 100, 250, 120);

  fill(80);
  ellipse(355, 360, 10, 10);
  ellipse(535, 360, 10, 10);
  ellipse(715, 360, 10, 10);
  ellipse(895, 360, 10, 10);
  ellipse(1020, 275, 12, 12);

  /* POWER-UP */
  fill(powerUpColor);
  ellipse(powerUpX, powerUpY, 40, 40);

  /* OBSTAKELS */
  for (var i = 0; i < obstakelX.length; i++) {
    if (spelStatus === EXPLOSIE && i === geraaktIndex) {
      image(zelfgemaaktekoelkastExplosieImg, obstakelX[i] - 100, obstakelY[i] - 65, 200, 129);
    } else {
      image(zelfgemaaktekoelkastImg, obstakelX[i] - 35, obstakelY[i] - 60, 70, 110);
    }
  }

  /* SPELER */
  if (spelStatus === EXPLOSIE) {
    image(gameoverSpelerafbeelding, spelerX - 50, spelerY - 50, 100, 100);
  } else {
    image(spelerAfbeelding, spelerX - 50, spelerY - 50, 100, 100);
  }

  /* 🌊 SHIELD WAVE EFFECT */
  if (invincible === true) {

    waveOffset += 0.2;

    noFill();
    for (var i = 0; i < 6; i++) {
      stroke(0, 150, 255, 150 - i * 20);
      strokeWeight(3);

      ellipse(
        spelerX,
        spelerY,
        90 + sin(waveOffset + i) * 10,
        90 + sin(waveOffset + i) * 10
      );
    }

    noStroke();
  }

  /* UI */
  fill('black');
  textSize(25);
  textAlign(LEFT, TOP);
  text('Punten: ' + floor(punten), 20, 50);

  textSize(20);
  text('Achievement: ' + achievement, 20, 85);

  /* POWER-UP MELDING */
  if (powerUpTimer > 0) {
    fill(0, 150, 255);
    textAlign(CENTER, CENTER);
    textSize(30);
    text(powerUpMelding, width / 2, height / 2 - 200);
    powerUpTimer--;
  }

  /* ACHIEVEMENT POPUP */
  if (achievementTimer > 0) {
    fill(255, 215, 0);
    textAlign(CENTER, CENTER);
    textSize(30);
    text(achievementMelding, width / 2, height / 2);
    achievementTimer--;
  }
};

/* ---------------- PRELOAD ---------------- */

function preload() {
  spelerAfbeelding = loadImage("afbeeldingen/speler.png");
  gameoverSpelerafbeelding = loadImage("afbeeldingen/gameoverSpeler.png");
  zelfgemaaktekoelkastImg = loadImage("afbeeldingen/zelfgemaaktekoelkast.png");
  zelfgemaaktekoelkastExplosieImg = loadImage("afbeeldingen/zelfgemaaktekoelkastExplosie.png");
}

/* ---------------- SETUP ---------------- */

function setup() {
  createCanvas(1280, 720);
}

/* ---------------- DRAW ---------------- */

function draw() {

  if (spelStatus === INTRO) {
    background(0);
    fill('brown');
    textAlign(CENTER, CENTER);
    textSize(40);
    text('Ontwijk de koelkasten!', width / 2, height / 2 - 40);

    textSize(20);
    text('Druk SPATIE om te starten', width / 2, height / 2 + 20);

    if (keyIsDown(32)) spelStatus = SPELEN;
  }

  if (spelStatus === SPELEN) {

    beweegAlles();
    verwerkBotsing();
    tekenAlles();

    punten += 0.1;

    /* ACHIEVEMENTS */
    if (punten >= 100 && laatsteAchievement !== "Beginner") {
      achievement = "Beginner";
      achievementMelding = "🏆 Beginner!";
      achievementTimer = 120;
      laatsteAchievement = "Beginner";
    }

    if (punten >= 300 && laatsteAchievement !== "Koelkast Ontwijker") {
      achievement = "Koelkast Ontwijker";
      achievementMelding = "🏆 Koelkast Ontwijker!";
      achievementTimer = 120;
      laatsteAchievement = "Koelkast Ontwijker";
    }

    if (punten >= 600 && laatsteAchievement !== "Master Chef") {
      achievement = "Master Chef";
      achievementMelding = "🏆 Master Chef!";
      achievementTimer = 120;
      laatsteAchievement = "Master Chef";
    }

    if (punten >= 900 && laatsteAchievement !== "Koelkast Koning") {
      achievement = "Koelkast Koning";
      achievementMelding = "🏆 Koelkast Koning!";
      achievementTimer = 120;
      laatsteAchievement = "Koelkast Koning";
    }

    if (punten >= 1100 && laatsteAchievement !== "GODLY") {
      achievement = "GODLY";
      achievementMelding = "🔥 GODLY!";
      achievementTimer = 120;
      laatsteAchievement = "GODLY";
    }

    /* TIMERS */
    if (invincible) {
      invincibleTimer--;
      if (invincibleTimer <= 0) invincible = false;
    }

    if (speedBoost) {
      speedBoostTimer--;
      if (speedBoostTimer <= 0) speedBoost = false;
    }

    if (slowMo) {
      slowMoTimer--;
      if (slowMoTimer <= 0) slowMo = false;
    }

    if (scoreBoostTimer > 0) {
      scoreBoostTimer--;
    }
  }

  if (spelStatus === EXPLOSIE) {
    tekenAlles();
    explosieTimer--;

    if (explosieTimer <= 0) {
      spelStatus = GAMEOVER;
    }
  }

  if (spelStatus === GAMEOVER) {
    background(0);
    fill('red');
    textAlign(CENTER, CENTER);
    textSize(50);
    text('GAME OVER', width / 2, height / 2 - 40);

    fill('white');
    textSize(20);
    text('Score: ' + floor(punten), width / 2, height / 2 + 20);
    text('Druk ENTER om opnieuw te spelen', width / 2, height / 2 + 60);

    if (keyIsDown(ENTER)) {

      punten = 0;
      achievement = "";
      achievementMelding = "";
      laatsteAchievement = "";

      invincible = false;
      speedBoost = false;
      slowMo = false;

      invincibleTimer = 0;
      speedBoostTimer = 0;
      slowMoTimer = 0;
      scoreBoostTimer = 0;

      spelerX = 650;
      spelerY = 600;

      obstakelX = [350, 950];
      obstakelY = [-50, -350];
      obstakelSnelheid = 2;

      explosieTimer = 0;
      geraaktIndex = -1;

      spelStatus = INTRO;
    }
  }

  if (punten >= 1100) {
    fill(255, 255, 0, 80);
    rect(0, 0, width, height);

    fill('gold');
    textAlign(CENTER, CENTER);
    textSize(90);
    text('GODLY', width / 2, height / 2);
  }
}