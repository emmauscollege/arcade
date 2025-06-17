"use strict";

let speler;
let lasers = [];
let spiegels = [];
let zwaartekracht = 0.5;
let opGrond = false;
let huidigLevel = 0;
let scherm = "start";
let doelGeraakt = false;
let timer = 0;
let spiegelMenuActief = false;
let geselecteerdeSpiegelIndex = 0;

let achtergrondImg, platformImg, grondImg;
let avatarStandLinks, avatarStandRechts, avatarJumpLinks, avatarJumpRechts;
let spiegelImg;

function preload() {
  achtergrondImg = loadImage("fotos/achtergrond.png");
  platformImg = loadImage("fotos/platform.png");
  grondImg = loadImage("fotos/grond.png");
  avatarStandLinks = loadImage("fotos/avatar-standing-facing-left.png");
  avatarStandRechts = loadImage("fotos/avatar-standing-facing-right.png");
  avatarJumpLinks = loadImage("fotos/avatar-jumping-facing-left.png");
  avatarJumpRechts = loadImage("fotos/avatar-jumping-facing-right.png");
  spiegelImg = loadImage("fotos/spiegel.png");
}

let levels = [
  {
    platformen: [
      { x: 0, y: 670, w: 1280, h: 50, grond: true },
      { x: 150, y: 600, w: 150, h: 20 },
      { x: 400, y: 550, w: 120, h: 20 },
      { x: 650, y: 500, w: 100, h: 20 }
    ],
    doel: { x: 700, y: 470, w: 30, h: 30 },
    spiegels: [{ x: 300, y: 580, hoek: 45 }]
  },
  {

  platformen: [
    { x: 0, y: 670, w: 1280, h: 50, grond: true },
    { x: 200, y: 600, w: 100, h: 20 },
    { x: 600, y: 550, w: 150, h: 20 },
    { x: 900, y: 500, w: 100, h: 20 }
  ],
  doel: { x: 1100, y: 450, w: 30, h: 30 },
  spiegels: [
    { x: 350, y: 570, hoek: 45 },   // eerste spiegel
    { x: 450, y: 470, hoek: 45 }  // tweede spiegel
  ]


  },
  {
    platformen: [
      { x: 0, y: 670, w: 1280, h: 50, grond: true },
      { x: 200, y: 600, w: 90, h: 20 },
      { x: 450, y: 520, w: 50, h: 20 },
      { x: 300, y: 440, w: 70, h: 20 },
      { x: 300, y: 350, w: 50, h: 20 }
    ],
    doel: { x: 100, y: 40, w: 30, h: 30 },
    spiegels: [
      { x: 1050, y: 325, hoek: 90 },
      { x: 827.5, y:547.5, hoek: 90 },
      { x: 340, y: 60, hoek: 45 }
    ]
  }
];

levels.push(
  {
    platformen: [
      { x: 0, y: 670, w: 1280, h: 50, grond: true },
      { x: 200, y: 600, w: 100, h: 20 },
      { x: 400, y: 520, w: 80, h: 20 },
      { x: 600, y: 480, w: 120, h: 20 },
      { x: 900, y: 530, w: 150, h: 20 }
    ],
    doel: { x: 1100, y: 500, w: 30, h: 30 },
    spiegels: [
      { x: 350, y: 540, hoek: 135 },
      { x: 550, y: 460, hoek: 45 },
      { x: 800, y: 510, hoek: 90 }
    ]
  },
  {
    platformen: [
      { x: 0, y: 670, w: 1280, h: 50, grond: true },
      { x: 150, y: 620, w: 120, h: 20 },
      { x: 350, y: 570, w: 90, h: 20 },
      { x: 550, y: 520, w: 130, h: 20 },
      { x: 800, y: 460, w: 100, h: 20 }
    ],
    doel: { x: 1000, y: 430, w: 30, h: 30 },
    spiegels: [
      { x: 300, y: 600, hoek: 0 },
      { x: 500, y: 550, hoek: 45 },
      { x: 700, y: 490, hoek: 135 },
      { x: 900, y: 450, hoek: 90 }
    ]
  }
);

function setup() {
  createCanvas(1280, 720);
  resetSpeler();
}

function draw() {
  background(achtergrondImg);

  if (scherm === "start") {
    tekenStartscherm();
  } else if (scherm === "uitleg") {
    tekenUitlegscherm();
  } else if (scherm === "menu") {
    tekenLevelMenu();
  } else if (scherm === "spel") {
    if (spiegelMenuActief) {
      // Spel met spiegelmenu actief
      beweegSpeler();
      beweegLasers();
      tekenPlatformen();
      tekenSpeler();
      tekenDoel();
      tekenSpiegels();
      tekenLasers();
      tekenSpiegelMenu();
      controleerBotsing();
      tekenResetKnop();
    } else {
      // Normaal spel
      if (doelGeraakt) {
        tekenDoelGeraakt();
        if (++timer > 120) {
          huidigLevel = (huidigLevel + 1) % levels.length;
          scherm = "menu";
          doelGeraakt = false;
          timer = 0;
        }
      } else {
        beweegSpeler();
        beweegLasers();
        tekenPlatformen();
        tekenSpeler();
        tekenDoel();
        tekenSpiegels();
        tekenLasers();
        controleerBotsing();
        tekenResetKnop();
      }
    }
  }
}

function beweegLasers() {
  let nieuweLasers = [];
  let lasersNieuw = [];

  for (let l of lasers) {
    l.x += l.dx;
    l.y += l.dy;

    let gereflecteerd = false;

    for (let s of spiegels) {
      let afstand = dist(l.x, l.y, s.x, s.y);
      if (afstand < 15 && !gereflecteerd) {
        let hoekRad = radians(s.hoek);
        let snelheid = 10;
        let dx = cos(hoekRad) * snelheid;
        let dy = sin(hoekRad) * snelheid;

        let offsetX = cos(hoekRad) * 20;
        let offsetY = sin(hoekRad) * 20;

        nieuweLasers.push({
          x: s.x + offsetX,
          y: s.y + offsetY,
          dx: dx,
          dy: dy
        });

        gereflecteerd = true;
        break;
      }
    }

    if (!gereflecteerd) {
      lasersNieuw.push(l);
    }
  }

  lasers = lasersNieuw.concat(nieuweLasers);
}

function tekenStartscherm() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("Welkom bij de Game", width / 2, height / 2 - 50);
  textSize(24);
  text("Druk op ENTER of rode knop linksboven om te starten", width / 2, height / 2 + 20);
  text("Druk op E of rode knop middenboven voor uitleg", width / 2, height / 2 + 60);
}

function tekenUitlegscherm() {
  background(30);
  fill(255);
  textSize(28);
  textAlign(LEFT, TOP);
  text(
`🔧 Uitleg en Besturing:

A/D of joystick links rechts          = beweeg speler

Laser:
- Spatie of  Rode knop linksonder:    = Schiet laser

Spiegels:
- R of rode knop rechtsboven          = Open/Sluit spiegel menu
- A/D of joystick                     = Selecteer spiegel
- E of rode knop middenboven          = Draai geselecteerde spiegel 45°
- ESC of rode knop rechtsonder        = Sluit spiegel menu

Druk ESC of rode knop rechtsonder om terug te gaan`,
    50, 50, width - 100, height - 100);
}

function tekenLevelMenu() {
  background(50);
  fill(255);
  textSize(36);
  textAlign(CENTER, TOP);
  text("Selecteer een level", width / 2, 40);

  for (let i = 0; i < levels.length; i++) {
    if (i === huidigLevel) {
      fill(255, 255, 0);
    } else {
      fill(255);
    }
    textSize(28);
    text("Level " + (i + 1), width / 2, 100 + i * 40);
  }

  fill(255);
  textSize(20);
  text("Gebruik pijltjestoetsen of joystick om te selecteren, ENTER of rode knop linksboven om te starten", width / 2, height - 60);
}

function resetSpeler() {
  speler = {
    x: 50,
    y: 600,
    w: 30,
    h: 50,
    snelheidX: 0,
    snelheidY: 0,
    richting: "rechts",
    springen: false
  };
  lasers = [];
  // Laad spiegels van huidig level opnieuw in (reset positie & hoek)
  spiegels = levels[huidigLevel].spiegels.map(s => ({ x: s.x, y: s.y, hoek: s.hoek }));
  geselecteerdeSpiegelIndex = 0;
  spiegelMenuActief = false;
  doelGeraakt = false;
  timer = 0;
}

function tekenPlatformen() {
  for (let p of levels[huidigLevel].platformen) {
    if (p.grond) {
      image(grondImg, p.x, p.y, p.w, p.h);
    } else {
      image(platformImg, p.x, p.y, p.w, p.h);
    }
  }
}

function tekenSpeler() {
  let img;
  if (speler.snelheidY !== 0) {
    if (speler.richting === "rechts") {
      img = avatarJumpRechts;
    } else {
      img = avatarJumpLinks;
    }
  } else {
    if (speler.richting === "rechts") {
      img = avatarStandRechts;
    } else {
      img = avatarStandLinks;
    }
  }
  image(img, speler.x, speler.y, speler.w, speler.h);
}

function tekenDoel() {
  fill(0, 255, 0);
  rect(levels[huidigLevel].doel.x, levels[huidigLevel].doel.y,
    levels[huidigLevel].doel.w, levels[huidigLevel].doel.h);
}

function tekenDoelGeraakt() {
  background(0, 100, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("Level voltooid!", width / 2, height / 2);
}


  function beweegSpeler() {
  if (spiegelMenuActief) return; // Niet bewegen als menu open is

  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // A of linker pijl
    speler.snelheidX = -5;
    speler.richting = "links";
  } else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { // D of rechter pijl
    speler.snelheidX = 5;
    speler.richting = "rechts";
  } else {
    speler.snelheidX = 0;
  }

  speler.snelheidY += zwaartekracht;
  speler.x += speler.snelheidX;
  speler.y += speler.snelheidY;

  // Botsing met platformen
  let opPlatform = false;
  for (let p of levels[huidigLevel].platformen) {
    if (
      speler.x + speler.w > p.x &&
      speler.x < p.x + p.w &&
      speler.y + speler.h > p.y &&
      speler.y + speler.h < p.y + p.h &&
      speler.snelheidY >= 0
    ) {
      speler.y = p.y - speler.h;
      speler.snelheidY = 0;
      opPlatform = true;
    }
  }
  opGrond = opPlatform;
}

function controleerBotsing() {
  let doel = levels[huidigLevel].doel;

  for (let l of lasers) {
    if (
      l.x > doel.x &&
      l.x < doel.x + doel.w &&
      l.y > doel.y &&
      l.y < doel.y + doel.h
    ) {
      doelGeraakt = true;
      return;  // stop met checken als doel is geraakt
    }
  }
}


function tekenSpiegels() {
  for (let i = 0; i < spiegels.length; i++) {
    let s = spiegels[i];
    push();
    translate(s.x, s.y);
    rotate(radians(s.hoek));
    imageMode(CENTER);
    image(spiegelImg, 0, 0, 40, 40);
    pop();
  }
}

function tekenLasers() {
  fill(255, 0, 0);
  noStroke();
  for (let l of lasers) {
    ellipse(l.x, l.y, 10, 10);
  }
}

function tekenSpiegelMenu() {
  if (!spiegelMenuActief) return;

  let menuX = 10;
  let menuY = 10;
  let menuW = 320;
  let menuH = 180 + spiegels.length * 28;

  // Achtergrond met afgeronde hoeken
  fill(255, 255, 255, 230);
  stroke(0);
  strokeWeight(1);
  rect(menuX, menuY, menuW, menuH, 12);

  // Tekst
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);

  // Titel
  textSize(20);
  textStyle(BOLD);
  text("🪞 Spiegel Menu", menuX + 15, menuY + 15);

  // Instructies
  textStyle(NORMAL);
  textSize(14);
  let instructies = [
    "⬅️ / ➡️  of A/D     = Selecteer spiegel",
    "E                     = Draai geselecteerde spiegel",
    "R                     = Open/sluit menu",
    "ESC of Q        = Sluit menu"
  ];
  for (let i = 0; i < instructies.length; i++) {
    text(instructies[i], menuX + 15, menuY + 50 + i * 20);
  }

  // Spiegel lijst
  textSize(16);
  textStyle(BOLD);
  text("Spiegels:", menuX + 15, menuY + 140);

  for (let i = 0; i < spiegels.length; i++) {
    let s = spiegels[i];
    let entryY = menuY + 165 + i * 28;

    if (i === geselecteerdeSpiegelIndex) {
      fill(255, 255, 0, 180);
      rect(menuX + 10, entryY - 2, menuW - 20, 24, 6);
      fill(0);
    } else {
      fill(0);
    }

    textStyle(NORMAL);
    text(`Spiegel ${i + 1} — Hoek: ${s.hoek}°`, menuX + 20, entryY);
  }

  // Toon richtingpijl van geselecteerde spiegel
  let s = spiegels[geselecteerdeSpiegelIndex];
  push();
  translate(s.x, s.y);
  rotate(radians(s.hoek));
  stroke(255, 215, 0);
  strokeWeight(3);
  line(0, 0, 35, 0);
  line(35, 0, 28, -8);
  line(35, 0, 28, 8);
  pop();
}


function tekenResetKnop() {
  fill(200);
  rect(width - 110, 10, 100, 40, 8);
  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Reset Level, X of Rode knop middenonder", width - 60, 30);
}

function keyPressed() {
  if (scherm === "start") {
    if (keyCode === ENTER) {
      scherm = "menu";
    } else if (key === "e" || key === "E") {
      scherm = "uitleg";
    }
  } else if (scherm === "uitleg") {
    if (keyCode === ESCAPE) {
      scherm = "start";
    }
  } else if (scherm === "menu") {
    if (keyCode === ENTER) {
      scherm = "spel";
      resetSpeler();
    }
    if (keyCode === UP_ARROW) {
      huidigLevel = max(0, huidigLevel - 1);
    }
    if (keyCode === DOWN_ARROW) {
      huidigLevel = min(levels.length - 1, huidigLevel + 1);
    }
  } else if (scherm === "spel") {
    if (!spiegelMenuActief) {
      // Springen toevoegen
      if ((key === 'w' || keyCode === UP_ARROW) && opGrond) {
        speler.snelheidY = -10;
        opGrond = false;
      }

      // Laser schieten
      if (key === " " || key === "z" || key === "Z") {
        lasers.push({
          x: speler.x + speler.w / 2,
          y: speler.y + speler.h / 2,
          dx: speler.richting === "rechts" ? 10 : -10,
          dy: 0
        });
      }
    }

    // Spiegelmenu openen/sluiten
    if (key === 'r' || key === 'R') {
      spiegelMenuActief = !spiegelMenuActief;
    }

    if (spiegelMenuActief) {
      if (key === 'a' || keyCode === LEFT_ARROW) {
        geselecteerdeSpiegelIndex--;
        if (geselecteerdeSpiegelIndex < 0) {
          geselecteerdeSpiegelIndex = spiegels.length - 1;
        }
      }
      if (key === 'd' || keyCode === RIGHT_ARROW) {
        geselecteerdeSpiegelIndex++;
        if (geselecteerdeSpiegelIndex >= spiegels.length) {
          geselecteerdeSpiegelIndex = 0;
        }
      }
      if (key === 'e' || key === 'E') {
        // draai spiegel
        spiegels[geselecteerdeSpiegelIndex].hoek += 45;
        if (spiegels[geselecteerdeSpiegelIndex].hoek >= 360) {
          spiegels[geselecteerdeSpiegelIndex].hoek -= 360;
        }
      }
      if (key === 'c' || keyCode === ESCAPE) {
        spiegelMenuActief = false;
      }
    }

    // Reset level
    if (key === 'x' || key === 'X') {
      resetSpeler();
    }
  }
}

