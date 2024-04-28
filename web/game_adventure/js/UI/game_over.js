let levelToReload;
let restartButton;
let restartLevel = localStorage.restartLevel;
let homeButton;

function setup() {
  homeButton = createButton("Home");
  homeButton.position(320, 300);
  homeButton.addClass("gameover-button");
  restartButton = createButton("Opnieuw");
  restartButton.position(505, 300);
  restartButton.addClass("gameover-button");
}

function draw() {
  homeButton.mousePressed(() => link('index.html'));
  restartButton.mousePressed(() => reloadLevel(restartLevel));
}

function link(url, winName, options) {
  winName && open(url, winName, options) || (location = url); // Link functie (overgenomen van de Processing library).

function reloadLevel(level) {
  link('levels/lvl_' + level + '.html');
}
