///<reference path=".vscode/p5.global-mode.d.ts" />
"use strict";

/* spelstatus */
const START = 0;
const SPELEN = 1;
const GAMEOVER = 2;
const GEWONNEN = 3;
let spelStatus = START;

/* paddle */
let paddleX = 640;
let paddleWidth = 100;
const paddleHeight = 20;
const paddleSnelheid = 7;
let paddleImg;

/* ballen */
let ballen = [];
let ballImg;

/* blokken */
let blokken = [];
let blokRijen;
const blokKolommen = 10;
const blokBreedte = 70;
const blokHoogte = 30;

/* power-ups */
let powerUps = [];

/* levels */
let level = 1;
const maxLevel = 3;

/* levens en score */
let levens = 3;
let score = 0;

/* toetsen */
let linksIngedrukt = false;
let rechtsIngedrukt = false;

/* highscores */
let highscores = {
  maxLevel: 1,
  maxScore: 0
};

/* afbeeldingen en geluid */
let startSchermImg;
let achtergrondImg;
let achtergrondMuziek;

/* preload: laad assets */
function preload() {
  startSchermImg = loadImage("neonblag.png");
  achtergrondImg = loadImage("vchera.png");
  paddleImg = loadImage("stylish_paddle.png");
  ballImg = loadImage("stylish_ball.png");
  achtergrondMuziek = loadSound("needynso.mp3");
}

/* opslag */
function slaOp() {
  highscores.maxLevel = max(highscores.maxLevel, level);
  highscores.maxScore = max(highscores.maxScore, score);
  localStorage.setItem("highscore", JSON.stringify(highscores));
}
function laadOp() {
  const data = localStorage.getItem("highscore");
  if (data) highscores = JSON.parse(data);
}

/* reset */
function resetBal() {
  ballen = [{
    x: 640,
    y: 500,
    vx: 4 + level,
    vy: -4 - level
  }];
}

function voegBalToe(x, y) {
  ballen.push({
    x: x ?? 640,
    y: y ?? 500,
    vx: 4 + random(-1, 1),
    vy: -4 - random(1)
  });
}

/* blokken maken */
function maakBlokken(niveau) {
  blokken = [];
  blokRijen = 3 + niveau * 2;
  for (let rij = 0; rij < blokRijen; rij++) {
    for (let kol = 0; kol < blokKolommen; kol++) {
      let x = 100 + kol * (blokBreedte + 10);
      let y = 50 + rij * (blokHoogte + 10);
      let plaats = false;
      if (niveau === 1) plaats = true;
      else if (niveau === 2 && (rij + kol) % 2 === 0) plaats = true;
      else if (niveau === 3 && (rij === 0 || rij === blokRijen - 1 || kol === 0 || kol === blokKolommen - 1)) plaats = true;
      if (plaats) {
        let tint = color(150 + rij * 10, 50, 255); // verschillende paarstinten
        blokken.push({ x, y, kapot: false, kleur: tint });
      }
    }
  }
}

/* beweging */
function beweegAlles() {
  if (linksIngedrukt) paddleX -= paddleSnelheid;
  if (rechtsIngedrukt) paddleX += paddleSnelheid;
  paddleX = constrain(paddleX, paddleWidth / 2, width - paddleWidth / 2);

  for (let i = ballen.length - 1; i >= 0; i--) {
    let bal = ballen[i];
    bal.x += bal.vx;
    bal.y += bal.vy;

    if (bal.x < 0 || bal.x > width) bal.vx *= -1;
    if (bal.y < 0) bal.vy *= -1;

    if (
      bal.y + 7 >= height - 50 &&
      bal.x > paddleX - paddleWidth / 2 &&
      bal.x < paddleX + paddleWidth / 2
    ) {
      bal.vy *= -1;
      bal.y = height - 50 - 7;
    }

    for (let b of blokken) {
      if (!b.kapot &&
        bal.x > b.x &&
        bal.x < b.x + blokBreedte &&
        bal.y > b.y &&
        bal.y < b.y + blokHoogte) {
        b.kapot = true;
        bal.vy *= -1;
        score += 10;

        if (random() < 0.2) {
          let soort = random(["groter", "extra", "leven"]);
          powerUps.push({ x: b.x + blokBreedte / 2, y: b.y, type: soort, actief: false });
        }
      }
    }

    if (bal.y > height) {
      ballen.splice(i, 1);
    }
  }

  for (let p of powerUps) {
    p.y += 4;
    if (
      p.y > height - 50 &&
      p.x > paddleX - paddleWidth / 2 &&
      p.x < paddleX + paddleWidth / 2 &&
      !p.actief
    ) {
      if (p.type === "groter") paddleWidth *= 1.3;
      else if (p.type === "leven") levens++;
      else if (p.type === "extra") voegBalToe();
      p.actief = true;
    }
  }
  powerUps = powerUps.filter(p => p.y < height && !p.actief);

  if (ballen.length === 0) {
    levens--;
    if (levens > 0) resetBal();
    else spelStatus = GAMEOVER;
  }

  let nogBlokken = blokken.some(b => !b.kapot);
  if (!nogBlokken) {
    if (level < maxLevel) {
      level++;
      levens++;
      maakBlokken(level);
      resetBal();
    } else {
      spelStatus = GEWONNEN;
    }
  }
}

/* tekenen */
function tekenAlles() {
  image(achtergrondImg, width / 2, height / 2, width, height);

  imageMode(CENTER);
  image(paddleImg, paddleX, height - 40, paddleWidth, paddleHeight);

  for (let b of ballen) {
    image(ballImg, b.x, b.y, 30, 30);
  }

  for (let b of blokken) {
    if (!b.kapot) {
      fill(b.kleur);
      rect(b.x, b.y, blokBreedte, blokHoogte);
    }
  }

  for (let p of powerUps) {
    if (p.type === "groter") fill("white");
    else if (p.type === "extra") fill("blue");
    else if (p.type === "leven") fill("green");
    ellipse(p.x, p.y, 20);
  }

  fill("white");
  textSize(24);
  text("Level: " + level, 50, height - 20);
  text("Levens: " + levens, 200, height - 20);
  text("Score: " + score, 350, height - 20);
}

function setup() {
  createCanvas(1280, 720);
  imageMode(CENTER);
  textAlign(CENTER);
}

function draw() {
  if (spelStatus === START) {
    image(startSchermImg, width / 2, height / 2, width, height);
    fill("white");
    textSize(50);
    text("Klik om te beginnen", width / 2, height - 80);
  } else if (spelStatus === SPELEN) {
    beweegAlles();
    tekenAlles();
  } else if (spelStatus === GAMEOVER) {
    if (achtergrondMuziek.isPlaying()) achtergrondMuziek.stop();
    background("black");
    fill("red");
    textSize(60);
    text("Game Over", width / 2, height / 2);
    textSize(30);
    text("Druk op ENTER om opnieuw te starten", width / 2, height / 2 + 60);
    slaOp();
  } else if (spelStatus === GEWONNEN) {
    if (achtergrondMuziek.isPlaying()) achtergrondMuziek.stop();
    background("black");
    fill("lime");
    textSize(60);
    text("Je hebt gewonnen!", width / 2, height / 2);
    textSize(30);
    text("Druk op ENTER om opnieuw te spelen", width / 2, height / 2 + 60);
    slaOp();
  }
}

function mousePressed() {
  if (spelStatus === START) {
    laadOp();
    level = 1;
    levens = 3;
    score = 0;
    powerUps = [];
    maakBlokken(level);
    resetBal();
    spelStatus = SPELEN;

    if (!achtergrondMuziek.isPlaying()) {
      achtergrondMuziek.setLoop(true);
      achtergrondMuziek.play();
    }
  }
}

function keyPressed() {
  if (key === "a" || key === "A") linksIngedrukt = true;
  if (key === "d" || key === "D") rechtsIngedrukt = true;
  if (keyCode === ENTER && (spelStatus === GAMEOVER || spelStatus === GEWONNEN)) {
    spelStatus = START;
  }
  if (spelStatus === START) {
    if (key === "q" || key === "Q" || key === "z" || key === "Z") {
      laadOp();
      level = 1;
      levens = 3;
      score = 0;
      powerUps = [];
      maakBlokken(level);
      resetBal();
      spelStatus = SPELEN;

      if (!achtergrondMuziek.isPlaying()) {
        achtergrondMuziek.setLoop(true);
        achtergrondMuziek.play();
      }
    }
  }
}

function keyReleased() {
  if (key === "a" || key === "A") linksIngedrukt = false;
  if (key === "d" || key === "D") rechtsIngedrukt = false;
}
