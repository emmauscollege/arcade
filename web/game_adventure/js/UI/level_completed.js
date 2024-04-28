let restartButton;
let homeButton;
let nextLevel = localStorage.nextLevel;

function setup() {
  homeButton = createButton("Home");
  homeButton.position(320, 300);
  homeButton.addClass("gameover-button");
  restartButton = createButton("Volgende");
  restartButton.position(505, 300);
  restartButton.addClass("gameover-button");
}

function draw() {
  homeButton.mousePressed(() => link('index.html'));
  restartButton.mousePressed(() => redirectToLevel(nextLevel));
}

function link(url, winName, options) {
  winName && open(url, winName, options) || (location = url); // Link functie (overgenomen van de Processing library).

function redirectToLevel(level) {
  link('levels/lvl_' + level + '.html');
}
