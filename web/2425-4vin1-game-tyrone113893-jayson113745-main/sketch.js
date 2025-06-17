///<reference path=".vscode/p5.global-mode.d.ts" />
"use strict";

const STARTSCHERM = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = STARTSCHERM;

var speler1FacingRight = true;
var speler2FacingRight = false;
let speler1DashAfstand = 40;
let speler2DashAfstand = 40;

let winnaar = "";
let timer = 60;
let laatsteTimerUpdate = 0;

const attackCooldownDuration = 3000;
let speler1AttackCooldownStart = 0;
let speler2AttackCooldownStart = 0;

let speler1LastHitTime = 0;
let speler2LastHitTime = 0;

let speler1Dashing = false;
let speler2Dashing = false;

let speler1Afterimages = [];
let speler2Afterimages = [];

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  j: { pressed: false },
  l: { pressed: false },
  q: { pressed: false },
  u: { pressed: false },
  z: { pressed: false },
  b: { pressed: false },
  n: { pressed: false },
  x: { pressed: false },
};

var speler1X, speler1Y, speler1height, speler1width, speler1attacking,
    speler1health, speler1dashwindow, speler1Blocking, speler1kleur, speler1attackcooldown;

var speler2X, speler2Y, speler2height, speler2width, speler2attacking,
    speler2health, speler2Blocking, speler2dashwindow, speler2attackcooldown;

function resetSpel() {
  speler1X = 100;
  speler1Y = 545;
  speler1height = 200;
  speler1width = 50;
  speler1attacking = false;
  speler1health = 100;
  speler1dashwindow = false;
  speler1Blocking = false;
  speler1kleur = "blue";
  speler1attackcooldown = false;
  speler1LastHitTime = 0;
  speler1AttackCooldownStart = 0;

  speler2X = 1180;
  speler2Y = 545;
  speler2height = 200;
  speler2width = 50;
  speler2attacking = false;
  speler2health = 100;
  speler2Blocking = false;
  speler2dashwindow = false;
  speler2attackcooldown = false;
  speler2LastHitTime = 0;
  speler2AttackCooldownStart = 0;

  timer = 60;
  laatsteTimerUpdate = millis();
  winnaar = "";
}

function tekenAmongUs(x, y, kleur, beweegt, attacking = false, facingRight = true) {
  push();
  translate(x, y);
  scale(1.5);

  let beenRotatie = beweegt ? sin(frameCount * 0.2) * 0.4 : 0;

  push();
  translate(-10, 0);
  rotate(beenRotatie);
  fill(kleur);
  rect(-5, 0, 10, 20, 5);
  pop();

  push();
  translate(10, 0);
  rotate(-beenRotatie);
  fill(kleur);
  rect(-5, 0, 10, 20, 5);
  pop();

  fill(kleur);
  stroke(0);
  strokeWeight(2);
  rect(-20, -50, 40, 60, 20);
  rect(20, -40, 12, 30, 10);

  fill(180, 220, 250);
  noStroke();
  ellipse(0, -30, 30, 20);

  if (attacking) {
    push();
    fill(kleur);
    stroke(0);
    strokeWeight(2);

    let pulse = abs(sin(frameCount * 0.4));
    let baseFistX = facingRight ? 40 : -40;
    let offset = facingRight ? pulse * 15 : -pulse * 15;

    translate(baseFistX + offset, 0);
    ellipse(0, 0, 25, 30);

    strokeWeight(3);
    line(-7, -5, -2, -10);
    line(-3, -6, 1, -12);
    line(1, -5, 5, -10);

    ellipse(facingRight ? -10 : 10, 5, 10, 8);

    pop();
  }

  pop();
}

function beweegAlles() {
  if (keys.a.pressed && !speler1attacking && !speler1Blocking) {
    speler1X -= speler1dashwindow ? 40 : 2;
    speler1FacingRight = false;
  }
  if (keys.d.pressed && !speler1attacking && !speler1Blocking) {
    speler1X += 3;
    speler1FacingRight = true;
  }
  if (keys.j.pressed && !speler2attacking && !speler2Blocking) {
    speler2X -= 3;
    speler2FacingRight = false;
  }
  if (keys.l.pressed && !speler2attacking && !speler2Blocking) {
    speler2X += speler2dashwindow ? 40 : 2;
    speler2FacingRight = true;
  }

  speler1X = constrain(speler1X, 0, width - speler1width);
  speler2X = constrain(speler2X, 0, width - speler2width);
}

function verwerkBotsing() {
  let huidigeTijd = millis();
  let pulse1 = speler1attacking ? abs(sin(frameCount * 0.4)) : 0;
  let pulse2 = speler2attacking ? abs(sin(frameCount * 0.4)) : 0;

  let fist1X = speler1X + (speler1FacingRight ? 40 + pulse1 * 15 : -40 - pulse1 * 15);
  let fist1Y = speler1Y;
  let fist2X = speler2X + (speler2FacingRight ? 40 + pulse2 * 15 : -40 - pulse2 * 15);
  let fist2Y = speler2Y;

  let afstand1 = dist(fist1X, fist1Y, speler2X, speler2Y);
  let afstand2 = dist(fist2X, fist2Y, speler1X, speler1Y);

  if (speler1attacking && !speler2Blocking && !speler1attackcooldown && huidigeTijd - speler2LastHitTime > 750 && afstand1 < 50) {
    speler2health -= 20;
    speler2LastHitTime = huidigeTijd;
  }

  if (speler2attacking && !speler1Blocking && !speler2attackcooldown && huidigeTijd - speler1LastHitTime > 750 && afstand2 < 50) {
    speler1health -= 20;
    speler1LastHitTime = huidigeTijd;
  }
}

function tekenCooldowns() {
  fill(255);
  textAlign(LEFT);
  textSize(30);
  if (speler1attackcooldown) {
    let tijdOver = max(0, attackCooldownDuration - (millis() - speler1AttackCooldownStart));
    text("P1 Attack Cooldown: " + (tijdOver / 1000).toFixed(1) + "s", 50, 60);
  } else {
    text("P1 Attack Ready!", 50, 60);
  }

  textAlign(RIGHT);
  if (speler2attackcooldown) {
    let tijdOver = max(0, attackCooldownDuration - (millis() - speler2AttackCooldownStart));
    text("P2 Attack Cooldown: " + (tijdOver / 1000).toFixed(1) + "s", width - 50, 60);
  } else {
    text("P2 Attack Ready!", width - 50, 60);
  }
}

function tekenAlles() {
  fill(51, 153, 51);
  rect(0, 0, 1280, 720);
  fill(134, 89, 45);
  rect(0, 575, 1280, 750);

  let speler1Beweegt = keys.a.pressed || keys.d.pressed;
  let speler2Beweegt = keys.j.pressed || keys.l.pressed;

  if (speler1Blocking) {
    fill(173, 216, 230, 180);
    noStroke();
    rect(speler1X + (speler1FacingRight ? 35 : -60), speler1Y - 55, 25, 80, 10);
  }
  if (speler2Blocking) {
    fill(173, 216, 230, 180);
    noStroke();
    rect(speler2X + (speler2FacingRight ? 35 : -60), speler2Y - 55, 25, 80, 10);
  }

  let nu = millis();

  speler1Afterimages = speler1Afterimages.filter(img => nu - img.timestamp < 300);
  speler2Afterimages = speler2Afterimages.filter(img => nu - img.timestamp < 300);

  for (let img of speler1Afterimages) {
    push();
    let age = nu - img.timestamp;
    let alpha = map(age, 0, 300, 100, 0);
    tint(100, 100, 255, alpha);
    tekenAmongUs(img.x, img.y, img.kleur, false, false, img.facingRight);
    pop();
  }

  for (let img of speler2Afterimages) {
    push();
    let age = nu - img.timestamp;
    let alpha = map(age, 0, 300, 100, 0);
    tint(255, 100, 100, alpha);
    tekenAmongUs(img.x, img.y, img.kleur, false, false, img.facingRight);
    pop();
  }

  tekenAmongUs(speler1X, speler1Y, speler1kleur, speler1Beweegt, speler1attacking, speler1FacingRight);
  tekenAmongUs(speler2X, speler2Y, "red", speler2Beweegt, speler2attacking, speler2FacingRight);

  fill("white");
  textSize(40);
  textAlign(LEFT);
  text("Speler 1 HP: " + speler1health, 50, 30);
  textAlign(RIGHT);
  text("Speler 2 HP: " + speler2health, 1225, 30);

  tekenCooldowns();
  textSize(50);
  textAlign(CENTER);
  text("Tijd: " + timer + "s", width / 2, 30);
}

window.addEventListener("keydown", (Event) => {
  switch (Event.key) {
    case "d": keys.d.pressed = true; break;
    case "a": keys.a.pressed = true; break;
    case "q":
      if (!speler1attackcooldown) {
        keys.q.pressed = true;
        speler1attacking = true;
        speler1AttackCooldownStart = millis();
        setTimeout(() => {
          speler1attacking = false;
          speler1attackcooldown = true;
        }, 100);
        setTimeout(() => {
          speler1attackcooldown = false;
        }, attackCooldownDuration);
      }
      break;
    case "z":
      keys.z.pressed = true;
      if (!speler1attacking && !speler1Blocking) {
        let dx = speler1FacingRight ? speler1DashAfstand : -speler1DashAfstand;
        speler1X = constrain(speler1X + dx, 0, width - speler1width);
        speler1Dashing = true;

        speler1Afterimages.push({
          x: speler1X - dx * 0.5,
          y: speler1Y,
          kleur: speler1kleur,
          timestamp: millis(),
          facingRight: speler1FacingRight,
        });

        setTimeout(() => {
          speler1Dashing = false;
        }, 100);
      }
      break;
    case "x":
      keys.x.pressed = true;
      speler1Blocking = true;
      break;

    case "l": keys.l.pressed = true; break;
    case "j": keys.j.pressed = true; break;
    case "u":
      if (!speler2attackcooldown) {
        keys.u.pressed = true;
        speler2attacking = true;
        speler2AttackCooldownStart = millis();
        setTimeout(() => {
          speler2attacking = false;
          speler2attackcooldown = true;
        }, 100);
        setTimeout(() => {
          speler2attackcooldown = false;
        }, attackCooldownDuration);
      }
      break;
    case "b":
      keys.b.pressed = true;
      if (!speler2attacking && !speler2Blocking) {
        let dx = speler2FacingRight ? speler2DashAfstand : -speler2DashAfstand;
        speler2X = constrain(speler2X + dx, 0, width - speler2width);
        speler2Dashing = true;

        speler2Afterimages.push({
          x: speler2X - dx * 0.5,
          y: speler2Y,
          kleur: "red",
          timestamp: millis(),
          facingRight: speler2FacingRight,
        });

        setTimeout(() => {
          speler2Dashing = false;
        }, 100);
      }
      break;
    case "n":
      keys.n.pressed = true;
      speler2Blocking = true;
      break;
  }
});

window.addEventListener("keyup", (Event) => {
  switch (Event.key) {
    case "d": keys.d.pressed = false; break;
    case "a": keys.a.pressed = false; break;
    case "q": keys.q.pressed = false; break;
    case "z": keys.z.pressed = false; speler1Blocking = false; break;
    case "x": keys.x.pressed = false; speler1Blocking = false; break;

    case "l": keys.l.pressed = false; break;
    case "j": keys.j.pressed = false; break;
    case "u": keys.u.pressed = false; break;
    case "b": keys.b.pressed = false; break;
    case "n": keys.n.pressed = false; speler2Blocking = false; break;
  }
});

function updateTimer() {
  if (millis() - laatsteTimerUpdate > 1000 && spelStatus === SPELEN) {
    timer--;
    laatsteTimerUpdate = millis();

    if (timer <= 0) {
      if (speler1health > speler2health) {
        winnaar = "Speler 1 wint!";
      } else if (speler2health > speler1health) {
        winnaar = "Speler 2 wint!";
      } else {
        winnaar = "Gelijkspel!";
      }
      spelStatus = GAMEOVER;
    }
  }
}

function setup() {
  createCanvas(1280, 720);
  resetSpel();
}

function draw() {
  background(200);

  switch (spelStatus) {
    case STARTSCHERM:
      fill("black");
      textSize(125);
    textFont("courier new");
    textAlign(CENTER, TOP);
    text("Among Us Combat", width / 2, 10);

    textSize(50);
    text("_______________________________________", width / 2, 175);
    text("Controls", width / 2, 175);
    text("Player 1", 200, 175);
    text("Move: A + D", 200, 275);
    text("Dash: Z", 200, 375);
    text("Attack: Q", 200, 475);
    text("Block: X", 200, 575);

    text("Player 2", 1080, 175);
    text("Move: J + L", 1080, 275);
    text("Dash: B", 1080, 375);
    text("Attack: U", 1080, 475);
    text("Block: N", 1080, 575);
      textAlign(CENTER, CENTER);
      text("Druk op X om te starten", width / 2, 670);
      if (keyIsDown(88)) {  // X-toets
        spelStatus = SPELEN;
      }
      break;

    case SPELEN:
      beweegAlles();
      verwerkBotsing();
      updateTimer();
      tekenAlles();

      if (speler1health <= 0) {
        winnaar = "Speler 2 wint!";
        spelStatus = GAMEOVER;
      } else if (speler2health <= 0) {
        winnaar = "Speler 1 wint!";
        spelStatus = GAMEOVER;
      }
      break;

    case GAMEOVER:
      fill("black");
      textSize(80);
      textAlign(CENTER, CENTER);
      text(winnaar, width / 2, height / 2 - 50);
      textSize(40);
      text("Druk op X om opnieuw te spelen", width / 2, height / 2 + 50);
      if (keyIsDown(88)) {  // X-toets
        resetSpel();
        spelStatus = SPELEN;
      }
      break;
  }
}
