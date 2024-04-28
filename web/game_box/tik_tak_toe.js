var canvasX = 600;
var canvasY = 600;
var turn = 1;
var myVar;
var gameIsWonP1 = false;
var gameIsWonP2 = false;
var p1GameWonText = "Circle Wins!!!";
var p2GameWonText = "Cross Wins!!!";

var p1 = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
var p2 = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
var used1 = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
var used2 = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
setup = function () {
  createCanvas(canvasX, canvasY);

};

draw = function () {
  drawScene();//draws scene
  drawCC();//draws circle and cross
  isGameWon();//checks if game is won
  drawWinnerScreen();//draws winner screen
};






