let buttons = [];
let level = 1;

function setup() {
  createCanvas(850, 460).class('level_selector');
  for (y = 150; y < height; y += 150) {
    for (x = 55; x < width; x += 150) {
      buttons[level - 1] = createButton((level).toString()); // Voeg een button toe aan de array.
      buttons[level - 1].position(x, y); // Plaats de button op het scherm.
      buttons[level - 1].id(level - 1); // Maak een id aan, om te zorgem dat er gedetecteed kan worden welke button er is ingedrukt.
      buttons[level - 1].addClass("level_button"); // Maak een class aan om css styling toe te voegen.
      level++;
    }
  }
}

function draw() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].mousePressed(() => load_level(buttons[i].elt.id)); // Check of er op een button is geklikt.
  }
}

function link(url, winName, options) {
  winName && open(url, winName, options) || (location = url); // Link naar de juiste pagina met deze functie.
}

function load_level(level) {
  link('levels/lvl_' + level + '.html'); // Laad de juiste pagina op basis van het gekozen level.
}
