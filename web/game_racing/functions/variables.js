/* ********************************************* */
/* global variables                              */
/* ********************************************* */
//operating tools:
var testing = false;

// game status
const PLAY = 1;
const GAMEOVER = 2;
const MENU = 3;
const TUTORIAL = 4;
const SHOP = 6;
const PLAYMENU = 7;
const PAUSED = 8;
const MAPMENU = 9;
const FINISHED = 10;
const SETTINGS = 11;
    //
    var gameStatus = MENU;

// map status
var selectedMap = 0;
var mapPage = 1;
const TUTORIALMAP = 5;
    //
    var mapStatus = PLAY;

// control status
const PC = 12;
const ARCADE = 13;
    //
    var controlStatus = PLAY;

// game keys
  //racekeys
const Wkey = 87;
const Akey = 65;
const Skey = 83;
const Dkey = 68;
const UpArrow = 38;
const DownArrow = 40;
const LeftArrow = 37;
const RightArrow = 39;

  //special keys
const SPACE = 32;
const Bkey = 66;
const Ckey = 67;
const Mkey = 77;
const Pkey = 80;
const Rkey = 82;


  //typing keys
const Ekey = 69;
const Nkey = 78;
const Okey = 79;
const Qkey = 81;
const Ukey = 85;
const Xkey = 88;
const Zkey = 90;

//players
var lapCount = 1;
var selectedCar = 0;
var startMax = 10;
var maxvelocity = startMax;
var wallSpeed = 1;
var velocityIncreas = 0.1;
  //player 1
  var racing = false;
  let topLeft;
  let topRight;
  let bottomLeft;
  let bottomRight;
  var player1Car;
  var player1X = 255;
  var player1Y = 500;
  var player1XStart = [253, 253, 61, 61, 61, 637, 637, 637];
  var player1YStart = [508, 316, 700, 700, 508, 508, 508, 508];
  var velocity1 = 0;
  var rotationP1 = 0;
  var directionP1 = 0;

//map variables
var changingData = {
  stars: [0, 0, 0, 0, 0, 0, 0, 0],
  mapLocked: [false, false, false, true, true, true, true, true],
  highScore: [[false, false], [false, false], [false, false], [false, false], [false, false], [false, false], [false, false], [false, false]],
  purchased: [true, 50, 50, 50, 150, 750, 350, 350, 500, 500, 500],
  currentCharacterTut: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  currentLine: 1,
  coins: 0,
  
};
var starsRequired = [0, 0, 0, 4, 6, 9, 11, 14];
var beatTime = [
  [0, 0, 0],
  [29, 26, 24], //24
  [31, 28, 26], //26
  [38, 34, 31], //31
  [38, 34, 31], //31
  [33, 30, 28], //28
  [43, 39, 36], //36
  [43, 39, 36] //36
];
var coinsPerTime = [
  [20, 60, 180],
  [20, 60, 180],
  [20, 60, 180],
  [20, 60, 180],
  [20, 60, 180],
  [20, 60, 180],
  [20, 60, 180],
  [20, 60, 180]
  
];

// timers
var timer = 5;
var lapTimeSeconds = 0;
var lapTimeMiliSeconds = 0;

// menu variables
var earned = 0;
var imgTransparency;
var imgLock;
var imgClosed;
  //clicking for buttons
  var mouseIsClicked = false;
  var mouseReleasedButton = true;
  var menuButtonHeight = 300;
  var menuPausedButtonHeight = [300, 300, 300];
  //volume slider
  var slider1position = 0;
  var sliding1 = false;
  var imgSlidebar;
  var imgSlidebarButton;
  //stars
  var imgStarGrey;
  var imgStarYellow;
  //images
  var imgTypingBar;
  var imgSettingsGear;
  var imgCountdownSquare;
  var imgStartMenuButton;
  var imgStartMenuButtonLine;
  var imgArrowUp;
  var imgArrowDown;
  var imgArrowLeft;
  var imgArrowRight;
  var imgHomeButton;
  var imgFrameBorder;
  var imgCarBorder;
  var imgNextButton;
  var imgNextButtonLine;
  //selecting for arrows
  let selectedButton = 1;
  let selectedButtonHistory = 0;
  //typing welcome
  var stringMenu = 'Welcome . . .';
  var currentCharacter = 0;
  var placeButtons = false;
  var placeText = false;

// shop variables
var imgCoin;
  //buttonheight
  var buyButtonHeight = [];
  var nextButtonHeight = 280;
  //shop cars
  var shopCars = [];
  //shop position
  var posShop = 0;
  var targetPos = 0;

// play menu
var buttonHeight1 = 260;
var buttonHeight2 = 260;
var button1Selected = false;
var button2Selected = false;
var jitterItteration = 0;

// tutorial variables
let stringTutorial = [
  'When playing singleplayer, the goal is to beat your highscore!', 
  'If you are playing 1v1 you must beat your opponent!',
  'To go forward press [W] or [  ]',
  'To brake press [S] or [  ]',
  'Stear left by pressing [A] or [   ],',
  'and to go right, press [D] or [   ]',
  'If you are playing 1v1, one player uses [WASD]',
  'and the other the arrow keys.',
  'Good luck and have fun!'];
let typingSpeed = 0.5;
let buttonheight = 843;

// racetrack images
var imgRaceTrackGrass;
var imgRaceTrackFinishUp;
var imgRaceTrackFinishDown;
var imgRaceTrackFinishLeft;
var imgRaceTrackFinishRight;
var imgRaceTrackDown;
var imgRaceTrackUp;
var imgRaceTrackRight;
var imgRaceTrackLeft;
var imgRaceTrackCorner1;
var imgRaceTrackCorner2;
var imgRaceTrackCorner3;
var imgRaceTrackCorner4;
var imgRaceTrackCorner5;
var imgRaceTrackCorner6;
var imgRaceTrackCorner7;
var imgRaceTrackCorner8;
var maps = [[], [], [], [], [], [], [], []];
var mapPaths = [[],  //y, x
                [[0, 1, false], [0, 2, false], [0, 3, false], [0, 4, false], [0, 5, false], [1, 5, false], [2, 5, false], [2, 6, false], [3, 6, false], [4, 6, false], [4, 5, false], [4, 4, false], [4, 3, false], [4, 2, false], [4, 1, false], [4, 0, false], [3, 0, false], [2, 0, false], [2, 1, false], [1, 1, false]], 
                [[2, 0, false], [1, 0, false], [0, 0, false], [0, 1, false], [0, 2, false], [1, 2, false], [2, 2, false], [2, 3, false], [2, 4, false], [2, 4, false], [2, 5, false], [2, 6, false], [3, 6, false], [4, 6, false], [4, 5, false], [4, 4, false], [4, 3, false], [4, 2, false], [4, 1, false], [4, 0, false], [3, 0, false]],
                [[2, 0, false], [1, 0, false], [0, 0, false], [0, 1, false], [0, 2, false], [1, 2, false], [2, 2, false], [2, 3, false], [2, 4, false], [1, 4, false], [0, 4, false], [0, 5, false], [0, 6, false], [1, 6, false], [2, 6, false], [3, 6, false], [4, 6, false], [4, 5, false], [4, 4, false], [4, 3, false], [4, 2, false], [4, 1, false], [4, 0, false], [3, 0, false]],
                [[1, 0, false], [0, 0, false], [0, 1, false], [0, 2, false], [1, 2, false], [2, 2, false], [2, 3, false], [2, 4, false], [1, 4, false], [0, 4, false], [0, 5, false], [0, 6, false], [1, 6, false], [2, 6, false], [3, 6, false], [3, 5, false], [3, 4, false], [4, 4, false], [4, 3, false], [4, 2, false], [4, 1, false], [3, 1, false], [3, 0, false], [2, 0, false]],
                [[1, 3, false], [0, 3, false], [0, 4, false], [0, 5, false], [0, 6, false], [1, 6, false], [2, 6, false], [3, 6, false], [3, 5, false], [3, 4, false], [4, 4, false], [4, 3, false], [4, 2, false], [4, 1, false], [4, 0, false], [3, 0, false], [3, 1, false], [3, 2, false], [3, 3, false], [2, 3, false]],
                [[1, 3, false], [0, 3, false], [0, 4, false], [0, 5, false], [0, 6, false], [1, 6, false], [2, 6, false], [3, 6, false], [3, 5, false], [3, 4, false], [4, 4, false], [4, 3, false], [4, 2, false], [4, 1, false], [4, 0, false], [3, 0, false], [2, 0, false], [1, 0, false], [0, 0, false], [0, 1, false], [1, 1, false], [2, 1, false], [2, 2, false], [3, 2, false], [3, 3, false], [2, 3, false]],
                [[1, 3, false], [0, 3, false], [0, 4, false], [0, 5, false], [0, 6, false], [1, 6, false], [2, 6, false], [3, 6, false], [3, 5, false], [3, 4, false], [4, 4, false], [4, 3, false], [4, 2, false], [4, 1, false], [4, 0, false], [3, 0, false], [2, 0, false], [2, 1, false], [2, 2, false], [3, 2, false], [3, 3, false], [2, 3, false]]
              ];
              
//race cars
var imgRaceCarGreenWhite;
var imgRaceCarBlueWhite;
var imgRaceCarPinkWhite;
var imgRaceCarSpiderMan;
var imgRaceCarNederland;
var imgRaceCarRedWhite;
var imgRaceCarFerrari;
var imgRaceCarMercedez;
var imgRaceCarBarcelona;
var imgRaceCarRealMadrid;
var imgRaceCarAtleticoMadrid;
var randomcars = [0, 0];


var imported = 0;
var exported = 0;

//soundeffects
  var countdownFx;