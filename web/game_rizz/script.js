/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */

  /* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

// voor de arcade machine, 
// als je dit op true zet zullen 
// het uitleg scherm en de controls 
// zich aanpassen voor de arcade machine, 
// maar voor degene die dit spel beoordeeld, 
// u kunt dit negeren.
let arcade = true;

//keyCodes
let A = 65;
let D = 68;
let W = 87;
let S = 83;
let SPATIE = 32; //voor pijlen
let L_SHIFT = 16; //masker
let H = 72; //hitbox speler
let M = 77; // kaart
let ENTER = 13; // deuren openen +  menu
let C = 67; // bommen
let ESC = 27; //pauze menu / teruggaan
let E = 69; // healing
let X = 88; // arcade pijlen
let Q = 81; //zwaard en arcade pauze
let Z = 90; //arcade zwaard en enter
let R = 82; //arcade masker en heal

if(arcade){
  SPATIE = C; //arcade boog
  L_SHIFT = R; //arcade masker
  M = E; //arcade kaart
  ENTER = Z; //arcade deuren openen en menu
  C = X; //arcade bommen
  ESC = Q; //arcade pauze of terug
  E = R; //arcade healing
  Q = Z; //arcade zwaard
}

//richtingen
const BOVEN = Math.PI / 2;
const RECHTS_BOVEN = 3*Math.PI / 4;
const RECHTS = Math.PI;
const RECHTS_ONDER = -3*Math.PI/4;
const ONDER = -Math.PI / 2;
const LINKS_ONDER = -Math.PI / 4; 
const LINKS = 0;
const LINKS_BOVEN = Math.PI /4;

//SPELSTATUS
const UITLEG = -1;
const MENU = 0;
const SPELEN_PARTY = 1;
const GAMEOVER_PARTY = 2;
const SPELEN_FLAPPY = 3;
const GAMEOVER_FLAPPY = 4;
const EINDE_PARTY = 5;
const PAUZE = 6;
const SETTINGS = 7;
let spelStatus = UITLEG;
let vorigeSpelStatus = UITLEG;
let vorigeVorigeSpelStatus = UITLEG;

//menu dingen
let lastPressTime = 0;
const pressCooldown = 500;
let knopKleur1 = 'red';
let knopKleur2 = 'red';
let knopKleur3 = 'red';
const knop1 = {
  x:200,
  y:500,
  width:300,
  height:100,
  text: 'Rizz Party',
  selected: true
}
const knop2 = {
  x:600,
  y:500,
  width:400,
  height:100,
  text: 'Flappy Lebron',
  selected: false
}
const knop3 = {
  x: 400,
  y: 300,
  width: 300,
  height: 100,
  text: 'settings',
  selected: false
}

//kamerstatussen
const STARTKAMER = 0;
const NORMALE_KAMER0 = 1;
const NORMALE_KAMER1 = 2;
const NORMALE_KAMER2 = 3;
const NORMALE_KAMER3 = 4;
const NORMALE_KAMER4 = 5;
const NORMALE_KAMER5 = 6;
const NORMALE_KAMER6 = 7;
const NORMALE_KAMER7 = 8;
const NORMALE_KAMER8 = 9;
const NORMALE_KAMER9 = 10;
const NORMALE_KAMER10 = 11;
const NORMALE_KAMER11 = 12;
const SCHAT_KAMER0 = 13;
const SCHAT_KAMER1 = 14;
const SCHAT_KAMER2 = 15;
const SCHAT_KAMER3 = 16;
const EIND_KAMER = 17;
let kamerStatus = STARTKAMER;
let vorigeKamer = STARTKAMER;

//tileMaps van elke kamer
let kamers = [
  //startkamer
  [
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
    [3,3,3,3,3,3,3,0,0,3,3,3,3,3,3,3],
    [3,3,3,3,3,3,3,0,3,3,3,3,3,3,3,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [2,2,3,3,2,2,2,2,2,2,2,3,3,2,2,2],
    [4,4,2,2,4,4,4,4,4,4,4,2,2,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
  ],
  //normale kamer 0
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1]
  ],
  //normale kamer 1
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,5,5,1,1,1,1,1,1,1]
  ],
  //normale kamer 2
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1]
  ],
  //normale kamer 3
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1]
  ],
  //normale kamer 4
  [
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ],
  //normale kamer 5
  [
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ],
  //normale kamer 6
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1]
  ],
  //normale kamer 7
  [
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1]
  ],
  //normale kamer 8
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1]
  ],
  //normale kamer 9
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ],
  //normale kamer 10
  [
    [1,1,1,1,1,1,1,6,6,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1]
  ],
  //normale kamer 11
  [
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ],
  //schat kamer 0
  [
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ],
  //schat kamer 1
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ],
  //schat kamer 2
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ],
  //schat kamer 3
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ],
  //boss kamer
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ]
]

let schat0unlocked = false;
let schat1unlocked = false;
let schat2unlocked = false;
let schat3unlocked = false;

let speler = {
  x: 400,
  y: 375,
  vorigeX:400,
  vorigeY: 375,
  width: 80,
  height: 80,
  health: 100,
  snelheid: 4,
  schuinRem: -1.2,
  richting: RECHTS,
  mapX:620,
  mapY:565,
  angle: 0.1,
  ySnelheid: 0,
  zwaartekracht: 0.6,
  startYSnelheid: 8,
  magRechtsBewegen: true,
  magLinksBewegen: true,
  magBovenBewegen: true,
  magOnderBewegen: true,
  invincible: false,
  flashTimer: 0,
  sleutels: 0,
  maskUnlocked: false,
  masked: false
} 
let laatsteRichting = RECHTS;

let healing = {
  heal: 30,
  cooldown: 40,
  aantal: 2
}

let baas = {
  x: 800,
  y: 200,
  width: 200,
  height: 200,
  snelheid: 2,
  richting: 0,
  health: 300,
  attackCooldown: 200,
  damage: 30
}

let baasWapen = {
  x: [],
  y: [],
  width: 50,
  height: 50,
  snelheid: 7,
  richting: [],
  damage: 20
}

let vijand = {
  //x postities van elke vijand per kamer
  x: [
    [], //startkamer
    [800, 200, 300, 400], //normale kamer 0
    [1100], //normale kamer 1
    [], //normale kamer 2
    [200, 600, 800, 800], //normale kamer 3
    [200, 500, 700, 1000], //normale kamer 4
    [300], //normale kamer 5
    [100, 100], //normale kamer 6
    [680], //normale kamer 7
    [], //normale kamer 8
    [100], //normale kamer 9
    [200], //normale kamer 10
    [500], //normale kamer 11
    [], //schat kamer 0
    [], //schat kamer 1
    [], //schat kamer 2
    [], //schat kamer 3
    []  //eindkamer
  ],
  //y postities van elke vijand per kamer
  y: [
    [], //startkamer
    [200, 500, 140, 300], //normale kamer 0
    [500], //normale kamer 1
    [], //normale kamer 2
    [200, 400, 200, 500], //normale kamer 3
    [500, 200, 300, 200], //normale kamer 4
    [200], //normale kamer 5
    [300,380], //normale kamer 6
    [100], //normale kamer 7
    [], //normale kamer 8
    [360], //normale kamer 9
    [400], //normale kamer 10
    [500], //normale kamer 11
    [], //schat kamer 0
    [], //schat kamer 1
    [], //schat kamer 2
    [], //schat kamer 3
    []  // eindkamer
  ],
  heeftSleutel: [
    [], //startkamer
    [false, false, false, false], //normale kamer 0
    [false], //normale kamer 1
    [], //normale kamer 2
    [false, false, false, false], //normale kamer 3
    [false, false, false, false], //normale kamer 4
    [true], //normale kamer 5
    [false, false], //normale kamer 6
    [false], //normale kamer 7
    [], //normale kamer 8
    [false], //normale kamer 9
    [true], //normale kamer 10
    [false], //normale kamer 11
    [], //schat kamer 0
    [], //schat kamer 1
    [], //schat kamer 2
    [], //schat kamer 3
    []  // eindkamer
  ],
  width: 80,
  height: 80,
  snelheid: 2,
  richting: [0.5, 0.5, 0.5, 0.5, 0.5], // dit is er maar 5 omdat ik geen zin om dat ook per vijand per kamer te maken, en aangezien er toch nooit meer dan 5 vijanden per kamer zijn
  health: [
    [], //startkamer
    [100, 100, 100, 100], //normale kamer 0
    [100], //normale kamer 1
    [], //normale kamer 2
    [100, 100, 100, 100], //normale kamer 3
    [100, 100, 100, 100], //normale kamer 4
    [100], //normale kamer 5
    [100, 100], //normale kamer 6
    [100], //normale kamer 7
    [], //normale kamer 8
    [100], //normale kamer 9
    [100], //normale kamer 10
    [100], //normale kamer 11
    [], //schat kamer 0
    [], //schat kamer 1
    [], //schat kamer 2
    [], //schat kamer 3
    []  // eindkamer
  ],
  damage: 10
}
let damageTimer = 0;
let kamerGewisseld = {
  s2n8: false,
  s0n2: false
}

//pijl
let boogUnlocked = false;
let pijlen = {
 x: [],
 y: [],
 width: 46,
 height: 20,
 richting: [],
 cooldown: 40,
 aantal: 10,
 damage: 20
}
//bommem
let bomb = {
  x: [],
  y: [],
  width: 150,
  height: 170,
  timer: [],
  explosieTimer: 0,
  cooldown: 40,
  aantal: 3,
  unlocked: false,
  damage: 30,
  frameIndex: []
}
let bombImages = [];
let totalFrames = 5;

let geluid = [];
const sunshine = 0;
const sigma = 1;
const dood = 2;
const grr = 3;
const zoowee = 4;
let muziekAan = true;
let sfxAan = true;
let gif = [];
let img = [];
let pijlenImg = [];
const lebronLeftUp = 2;
const lebronRightUp = 3;
const lebronLeftDown = 0;
const lebronRightDown = 1;
const sand = 4;
const grass = 4;
const wall = 5;
const wc = 5;
const ground = 6;
const sea = 6;
const kaart = 7;
const dichteSchat = 15;
const openSchat = 9;
const primo = 8;
const homescreen = 9;
const keyWall = 11;
const sleutel = 12;
const bg = 10;
const flappySpeler = 14;
const sword = 13;
const amogus = 7;
const boog = 16;
const brokenWall = 17;
const bom = 18;
const boem = 19;
const pijl = 20;
const bgSettings = 21;
let k = 1;
let vorigeK = 1;
let p = 0;



let knopIngedruktVorige = {
  w: false,
  a: false,
  s: false,
  d: false,
  spatie: false,
  l_shift: false,
  h: false,
  m: false,

}

let knopIngedruktNu = {
  w: false,
  a: false,
  s: false,
  d: false,
  spatie: false,
  l_shift: false,
  h: false,
  m: false
}

let hitboxBool = false;
let kaartBool = false;



//tilemap proberen te maken

let rows = 9;
let cols = 16;
const tileSize = 80;
let tiles = [];
let tileImages = [];

let zwaard = {
  x: 600,
  y: 400,
  actief: false,
  draait: false,
  angle: 0, 
  angleStart: 0,
  cooldown: 0,
  width: 80,
  height: 20,
  unlocked: false,
  damage: 0.5, //dit is zo laag omdat er elke frame collision wordt gedetect en ik geen zin had om het aan te passen en een hele vijanden invincibility status te maken, en omdat het doel van het zwaard eerder knockback dan damage is
  knockback: 5
}

/** 
  *een fix voor het kopieren van de startFunctie, 
  *aangezien het steeds werd geupdated 
  *gevonden op stack overflow. 
  *ik weet zelf ook niet precies hoe het werkt, maar het werkt.
  *wat ik denk dat er gebeurd is dat hij de startwaardes kopieerd en een nieuw
  *object maakt die hij later terug kopieert
*/
function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    let arrCopy = [];
    for (let i = 0; i < obj.length; i++) {
      arrCopy[i] = deepCopy(obj[i]);
    }
    return arrCopy;
  }

  let objCopy = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      objCopy[key] = deepCopy(obj[key]);
    }
  }
  return objCopy;
}


let spelerStart = deepCopy(speler);
let startStatus = deepCopy(kamerStatus);
let kamersStart = deepCopy(kamers);
let vijandStart = deepCopy(vijand);
let zwaardStart = deepCopy(zwaard);
let kaartStart = deepCopy(kaartBool);
let boogStart = deepCopy(boogUnlocked);
let pijlenStart = deepCopy(pijlen);
let bombStart = deepCopy(bomb);
let baasStart = deepCopy(baas);
let baasWapenStart = deepCopy(baasWapen);
let kamerGewisseldStart = deepCopy(kamerGewisseld);

let startParty = function() {
  speler = deepCopy(spelerStart);
  kamerStatus = deepCopy(startStatus);
  kamers = deepCopy(kamersStart);
  vijand = deepCopy(vijandStart);
  zwaard = deepCopy(zwaardStart);
  kaartBool = deepCopy(kaartStart);
  boogUnlocked = deepCopy(boogStart);
  pijlen = deepCopy(pijlenStart);
  bomb = deepCopy(bombStart);
  baas = deepCopy(baasStart);
  baasWapen = deepCopy(baasWapenStart);
  kamerGewisseld = deepCopy(kamerGewisseldStart);
  schat0unlocked = false;
  schat1unlocked = false;
  schat2unlocked = false;
  schat3unlocked = false;
}


let beweegAlles = function() {  
  if(keyIsDown(ESC) && millis() - lastPressTime > pressCooldown){
    vorigeSpelStatus = spelStatus;
    spelStatus = PAUZE;
    lastPressTime = millis()
  }
  zwaard.cooldown--;
  speler.width = 80
  speler.heigt = 80
  //vorige frame zaken
  knopIngedruktVorige.h = knopIngedruktNu.h;
  knopIngedruktVorige.l_shift = knopIngedruktNu.l_shift;
  
  tiles = kamers[kamerStatus];
  vorigeKamer = kamerStatus;

  //zwaard
  if(k === lebronLeftDown || k === lebronLeftUp){
    p = Math.PI;
  }else if(k === lebronRightDown || k === lebronRightUp){
    p = 0;
  }
  //zwaard
  if (keyIsDown(Q) && zwaard.cooldown < 0 && zwaard.unlocked && !speler.masked) { // q
    zwaard.actief = true;
   
    zwaard.angle = p;
    zwaard.cooldown = 30; 
  }
  if (zwaard.actief) {
    
      
      if(k === lebronLeftDown || k === lebronRightUp){
        zwaard.angle -= 0.1;
      }else if(k === lebronLeftUp || k === lebronRightDown){
        zwaard.angle += 0.1;
      }

      if(k === lebronLeftDown || k === lebronRightUp){
        if(zwaard.angle <= p - (Math.PI / 2)){
        
          zwaard.actief = false;
        }
      }else if(k === lebronLeftUp || k === lebronRightDown){
        if(zwaard.angle >= p + (Math.PI / 2)){
        
          zwaard.actief = false;
        }
      }
    
  }

  //richting voor schieten met muis

  speler.angle = atan2(speler.y + (speler.height / 2) - mouseY, speler.x + (speler.width / 2) - mouseX);
  
  // speler
  
   
    
    if(keyIsDown(W) && speler.magBovenBewegen){
      speler.y -= speler.snelheid;
      speler.richting = BOVEN;
    }  
     if(keyIsDown(A) && speler.magLinksBewegen){
      speler.x -= speler.snelheid;
      speler.richting = LINKS;
    }  
     if(keyIsDown(S) && speler.magOnderBewegen){
      speler.y += speler.snelheid;
      speler.richting = ONDER;
    }  
    if(keyIsDown(D) && speler.magRechtsBewegen){
      speler.x += speler.snelheid;
      speler.richting = RECHTS;
    }  
     if(keyIsDown(W)&&keyIsDown(D) && speler.magBovenBewegen && speler.magRechtsBewegen){
      speler.richting = RECHTS_BOVEN;
      speler.x += speler.schuinRem;
      speler.y -= speler.schuinRem;
      laatsteRichting = speler.richting;
    }
     if(keyIsDown(S)&&keyIsDown(D) && speler.magOnderBewegen && speler.magRechtsBewegen){
      speler.richting = RECHTS_ONDER;
      speler.x += speler.schuinRem;
      speler.y += speler.schuinRem;
      laatsteRichting = speler.richting;
    }
     if(keyIsDown(S)&&keyIsDown(A) && speler.magOnderBewegen && speler.magLinksBewegen){
      speler.richting = LINKS_ONDER;
      speler.y += speler.schuinRem;
      speler.x -= speler.schuinRem;
      laatsteRichting = speler.richting;
    }
    if(keyIsDown(W)&&keyIsDown(A) && speler.magBovenBewegen && speler.magLinksBewegen){
      speler.richting = LINKS_BOVEN;
      speler.x -= speler.schuinRem;
      speler.y -= speler.schuinRem;
      laatsteRichting = speler.richting;
    }

    
  
  //speler masker
  if(keyIsDown(L_SHIFT)  && speler.maskUnlocked){
    knopIngedruktNu.l_shift = true;
  }else{
    knopIngedruktNu.l_shift = false;
  }
  if(knopIngedruktNu.l_shift && !knopIngedruktVorige.l_shift){
    speler.masked = !speler.masked;
  }
  
  //kamer wisselen
  

  if(kamerStatus === STARTKAMER){
    if(speler.x < 0){
      speler.magLinksBewegen = false;
      speler.x = speler.x + speler.snelheid;
    }else {
      speler.magLinksBewegen = true
    }

    if(speler.x > 1200){
      speler.magRechtsBewegen = false;
      speler.x = speler.x - speler.snelheid;
    }else {
      speler.magRechtsBewegen = true;
    }
    if(speler.y < 0){
      speler.y = 640;
      kamerStatus = NORMALE_KAMER10;
      speler.mapY -= 90;
    }
  }else if(kamerStatus === NORMALE_KAMER0){
    if(speler.x > 1200){
      speler.x = 0;
      kamerStatus = NORMALE_KAMER1;
      speler.mapX += 90;
    }
    if(speler.y > 640){
      speler.y = 0;
      kamerStatus = NORMALE_KAMER4;
      speler.mapY += 90
    }
  }else if(kamerStatus === NORMALE_KAMER1){
    if(speler.x < 0){
     speler.x = 1200 
     kamerStatus = NORMALE_KAMER0;
     speler.mapX -= 90
    }
    if(speler.x > 1200){
      speler.x = 0;
      kamerStatus = NORMALE_KAMER2;
      speler.mapX += 90;
    }
    if(speler.y > 640){
      speler.y = 80;
      kamerStatus = EIND_KAMER;
      speler.mapY += 90
    }
  }else if(kamerStatus === NORMALE_KAMER2){
    if(speler.x < 0){
     speler.x = 1200 
     kamerStatus = NORMALE_KAMER1;
     speler.mapX -= 90
    }
    if(speler.y > 640){
      speler.y = 0;
      kamerStatus = SCHAT_KAMER0;
      speler.mapY += 90
    }
  }else if(kamerStatus === NORMALE_KAMER3){
    if(speler.x > 1200){
      speler.x = 0;
      kamerStatus = NORMALE_KAMER4;
      speler.mapX += 90;
    }
    if(speler.y > 640){
      speler.y = 0;
      kamerStatus = NORMALE_KAMER5;
      speler.mapY += 90
    }
  }else if(kamerStatus === NORMALE_KAMER4){
    if(speler.x < 0){
     speler.x = 1200 
     kamerStatus = NORMALE_KAMER3;
     speler.mapX -= 90
    }
    if(speler.y < 0){
      speler.y = 640;
      kamerStatus = NORMALE_KAMER0;
      speler.mapY -= 90;
    }
  }else if(kamerStatus === NORMALE_KAMER5){
    if(speler.x < 0){
     speler.x = 1200 
     kamerStatus = SCHAT_KAMER1;
     speler.mapX -= 90
    }
    if(speler.x > 1200){
      speler.x = 0;
      kamerStatus = NORMALE_KAMER6;
      speler.mapX += 90;
    }
    if(speler.y < 0){
      speler.y = 640;
      kamerStatus = NORMALE_KAMER3;
      speler.mapY -= 90;
    }
  }else if(kamerStatus === NORMALE_KAMER6){
    if(speler.x < 0){
     speler.x = 1200 
     kamerStatus = NORMALE_KAMER5;
     speler.mapX -= 90
    }
    if(speler.y > 640){
      speler.y = 0;
      kamerStatus = NORMALE_KAMER7;
      speler.mapY += 90
    }
  }else if(kamerStatus === NORMALE_KAMER7){
    if(speler.y < 0){
      speler.y = 640;
      kamerStatus = NORMALE_KAMER6;
      speler.mapY -= 90;
    }
    if(speler.y > 640){
      speler.y = 0;
      kamerStatus = NORMALE_KAMER10;
      speler.mapY += 90
    }
  }else if(kamerStatus === NORMALE_KAMER8){
    if(speler.x > 1200){
      speler.x = 0;
      kamerStatus = SCHAT_KAMER2;
      speler.mapX += 90;
    }
    if(speler.y > 640){
      speler.y = 0;
      kamerStatus = NORMALE_KAMER11;
      speler.mapY += 90
    }
  }else if(kamerStatus === NORMALE_KAMER9){
    if(speler.x < 0){
     speler.x = 1200;
      kamerStatus = SCHAT_KAMER3;
      speler.mapX -= 90;
    }
    if(speler.x > 1200){
      speler.x = 0;
      kamerStatus = NORMALE_KAMER10;
      speler.mapX += 90
    }
  }else if(kamerStatus === NORMALE_KAMER10){
    if(speler.x < 0){
     speler.x = 1200 
     kamerStatus = NORMALE_KAMER9;
     speler.mapX -= 90
    }
    if(speler.x > 1200){
      speler.x = 0;
      kamerStatus = NORMALE_KAMER11;
      speler.mapX += 90;
    }
    if(speler.y < 0){
      speler.y = 640;
      kamerStatus = NORMALE_KAMER7;
      speler.mapY -= 90;
    }
    if(speler.y > 640){
      speler.y = 0;
      kamerStatus = STARTKAMER;
      speler.mapY += 90
    }
  }else if(kamerStatus === NORMALE_KAMER11){
    if(speler.x < 0){
     speler.x = 1200 
     kamerStatus = NORMALE_KAMER10;
     speler.mapX -= 90
    }
    if(speler.y < 0){
      speler.y = 640;
      kamerStatus = NORMALE_KAMER8;
      speler.mapY -= 90;
    }
  }else if(kamerStatus === SCHAT_KAMER0){
    if(speler.y < 0){
      speler.y = 640;
      kamerStatus = NORMALE_KAMER2;
      speler.mapY -= 90
      if(!kamerGewisseld.s0n2){
        vijand.x[NORMALE_KAMER2] = [200];
        vijand.y[NORMALE_KAMER2] = [400];
        vijand.heeftSleutel[NORMALE_KAMER2] = [true];
        vijand.health[NORMALE_KAMER2] = [100];
        kamerGewisseld.s0n2 = true;
      }
    }
  }else if(kamerStatus === SCHAT_KAMER1){
    if(speler.x > 1200){
      speler.x = 0;
      kamerStatus = NORMALE_KAMER5;
      speler.mapX += 90;
    }
  }else if(kamerStatus === SCHAT_KAMER2){
    if(speler.x < 0){
      speler.x = 1200;
      kamerStatus = NORMALE_KAMER8;
      speler.mapX -= 90;
      if(!kamerGewisseld.s2n8){
        kamers[NORMALE_KAMER8][8][7] = 6;
        kamers[NORMALE_KAMER8][8][8] = 6;
        kamerGewisseld.s2n8 = true;
      }
    }
  }else if(kamerStatus === SCHAT_KAMER3){
    if(speler.x > 1200){
      speler.x = 0;
      kamerStatus = NORMALE_KAMER9;
      speler.mapX += 90;
    }
  }else if(kamerStatus === EIND_KAMER){
    if(speler.y < 0){
      speler.y = 640;
      kamerStatus = NORMALE_KAMER1;
      speler.mapY -= 90;
    }
  }
     
  //schat unlocken
  if(kamerStatus === SCHAT_KAMER0 && keyIsDown(ENTER) && !schat0unlocked){
    schat0unlocked = true;
    zwaard.unlocked = true;
  }
  if(kamerStatus === SCHAT_KAMER1 && keyIsDown(ENTER) && !schat1unlocked){
    schat1unlocked = true;
    speler.maskUnlocked = true;
  }
  if(kamerStatus === SCHAT_KAMER2 && keyIsDown(ENTER) && !schat2unlocked){
    schat2unlocked = true;
    bomb.unlocked = true;
  }
  if(kamerStatus === SCHAT_KAMER3 && keyIsDown(ENTER) && !schat3unlocked){
    schat3unlocked = true;
    boogUnlocked = true;
  }
  //pijl
  
    pijlen.cooldown--;

    for(let i = 0; i < pijlen.x.length; i++){
      pijlen.x[i] -= 8 * cos(pijlen.richting[i]);
      pijlen.y[i] -= 8 * sin(pijlen.richting[i]);
    
  }
    if(keyIsDown(SPATIE) && pijlen.cooldown < 0 && boogUnlocked && pijlen.aantal > 0 && !speler.masked){
      pijlen.x.push(speler.x + (speler.width / 2));
      pijlen.y.push(speler.y + (speler.height / 2));
      pijlen.richting.push(speler.richting);
      pijlen.cooldown = 50;
      pijlen.aantal--;
      geluid[zoowee].play();
    }
    if(mouseIsPressed && pijlen.cooldown < 0 && boogUnlocked && pijlen.aantal > 0 && !speler.masked && !arcade){
      pijlen.x.push(speler.x  + (speler.width / 2));
      pijlen.y.push(speler.y  + (speler.height / 2));
      pijlen.richting.push(speler.angle);
      pijlen.cooldown = 50;
      pijlen.aantal--;
      geluid[zoowee].play();
    }
  
  // vijand
  
    if(!speler.masked){
      for(let i = 0; i < vijand.x[kamerStatus].length; i++) {
        vijand.richting[i] = atan2(speler.y - vijand.y[kamerStatus][i], speler.x - vijand.x[kamerStatus][i]);
        vijand.x[kamerStatus][i] += vijand.snelheid * cos(vijand.richting[i]);
        vijand.y[kamerStatus][i] += vijand.snelheid * sin(vijand.richting[i]);
      }
    }
  
  //eindbaas
  if(kamerStatus === EIND_KAMER){
    baas.richting = atan2(speler.y + 40 - baas.y - 100, speler.x + 40 - baas.x - 100);
    baas.x += baas.snelheid * cos(baas.richting);
    baas.y += baas.snelheid * sin(baas.richting);
    //baaswapen
    baas.attackCooldown--;
    if(baas.attackCooldown < 0){
      baas.attackCooldown = 100;
      baasWapen.x.push(baas.x + 100);
      baasWapen.y.push(baas.y + 100);
      baasWapen.richting.push(baas.richting);
    }
    for(let i = 0; i < baasWapen.x.length; i++){
      baasWapen.x[i] += baasWapen.snelheid * cos(baasWapen.richting[i]);
      baasWapen.y[i] += baasWapen.snelheid * sin(baasWapen.richting[i]);
    }
  }
  
  //bommen
  for(let i = 0; i < bomb.x.length; i++){
    bomb.timer[i]--;
    bomb.frameIndex[i] = Math.floor(map(bomb.timer[i], 0, 150, totalFrames - 1, 0));
  }
  bomb.cooldown--;
  if(keyIsDown(C) && bomb.cooldown <= 0 && bomb.aantal > 0 && bomb.unlocked && !speler.masked){
    bomb.aantal--;
    bomb.x.push(speler.x);
    bomb.y.push(speler.y);
    bomb.timer.push(150);
    bomb.frameIndex.push(0);
    bomb.cooldown = 60;
    geluid[sigma].play();
  }
  //healing
  healing.cooldown--;
  if(keyIsDown(E) && healing.aantal > 0 && healing.cooldown < 0 && speler.health !== 100){
    healing.cooldown = 40;
    healing.aantal--;
    speler.health += healing.heal;
    if(speler.health > 100){
      speler.health = 100;
    }
  }
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en ...health
 */
//functie voor elke standaard botsingdetectie
function isCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
  return !(x2 > x1 + w1 ||
           x2 + w2 < x1 ||
           y2 > y1 + h1 ||
           y2 + h2 < y1);
}

let verwerkBotsing = function() {
  // botsing speler tegen muren en zee
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        let tileIndex = tiles[y][x];
        if (tileIndex === 1 || tileIndex === 4 || tileIndex === 5 || tileIndex === 6) {
          let tileX = x * tileSize;
          let tileY = y * tileSize;
          
          if(speler.x + speler.width > tileX && speler.x < tileX + tileSize){
            //collision top
            if(speler.y + speler.height > tileY && speler.y + speler.height < tileY + 8){
              speler.y -= speler.snelheid;
              speler.magOnderBewegen = false;
            }else{
              speler.magOnderBewegen = true;
            }
            //collision bottom
            if(speler.y < tileY + tileSize && speler.y > tileY + tileSize - 8){
              speler.y += speler.snelheid;
              speler.magBovenBewegen = false;
            }else{
              speler.magBovenBewegen = true;
            }
          }else{
            speler.magOnderBewegen = true;
            speler.magBovenBewegen = true;
          }
          if(speler.y + speler.height > tileY && speler.y < tileY + tileSize){
            //collision right
            if(speler.x < tileX + tileSize && speler.x > tileX + tileSize - 8){
              speler.x += speler.snelheid;
              speler.magLinksBewegen = false;
            }else{
              speler.magLinksbewegen = true;
            }
            //collision left
            if(speler.x + speler.width < tileX + 8 && speler.x + speler.width > tileX){
              speler.x -= speler.snelheid;
              speler.magRechtsBewegen = false;
            }else{
              speler.magRechtsbewegen = true;
            }
          }else{
            speler.magRechtsBewegen = true;
            speler.magLinksBewegen = true;
          }
        }
    }
}


//kogel buiten scherm
for (let i = 0; i < pijlen.x.length; i++){
  if(pijlen.x[i] < 0 ||
    pijlen.x[i] > 1280 ||
    pijlen.y[i] < 0 ||
    pijlen.y[i] > 720
  ){
    pijlen.x.splice(i,1);
    pijlen.y.splice(i,1);
    pijlen.richting.splice(i,1);
  }
}
//kamer wisselt
if(vorigeKamer !== kamerStatus){
  pijlen.x.splice(0, pijlen.x.length);
  pijlen.y.splice(0, pijlen.y.length);
  pijlen.richting.splice(0, pijlen.richting.length);

  bomb.x.splice(0, bomb.x.length);
  bomb.y.splice(0, bomb.y.length);
  bomb.timer.splice(0, bomb.timer.length);
  bomb.frameIndex.splice(0, bomb.frameIndex.length);
}
  //botsing zwaard tegen vijand en eind baas
if(zwaard.actief){
  
    if(k === lebronLeftUp){
      for(let i = 0; i < vijand.x[kamerStatus].length; i++){
      if(isCollision(speler.x - 60, speler.y - 60, zwaard.width, zwaard.height, vijand.x[kamerStatus][i], vijand.y[kamerStatus][i], vijand.width, vijand.height)){
        vijand.health[kamerStatus][i] -= zwaard.damage;
        vijand.x[kamerStatus][i] -= zwaard.knockback;
        vijand.y[kamerStatus][i] -= zwaard.knockback;
      }}
    if(kamerStatus === EIND_KAMER){
      if(isCollision(speler.x - 60, speler.y - 60, zwaard.width, zwaard.height, baas.x, baas.y, baas.width, baas.height)){  
        baas.x -= zwaard.knockback;
        baas.y -= zwaard.knockback;
      }
    for(let i = 0; i < baasWapen.x.length; i++){
      if(isCollision(speler.x - 60, speler.y - 60, zwaard.width, zwaard.height, baasWapen.x[i], baasWapen.y[i], baasWapen.width, baasWapen.height)){
        baasWapen.x.splice(i,1);
        baasWapen.y.splice(i,1);
        baasWapen.richting.splice(i,1);
        i--;
      }
    }
    }
    }else if(k === lebronLeftDown){
      for(let i = 0; i < vijand.x[kamerStatus].length; i++){
      if(isCollision(speler.x - 60, speler.y + speler.height, zwaard.width, zwaard.height, vijand.x[kamerStatus][i], vijand.y[kamerStatus][i], vijand.width, vijand.height)){
        vijand.health[kamerStatus][i] -= zwaard.damage;
        vijand.x[kamerStatus][i] -= zwaard.knockback;
        vijand.y[kamerStatus][i] += zwaard.knockback;
      }}
      if(kamerStatus === EIND_KAMER){
      if(isCollision(speler.x - 60, speler.y + speler.height, zwaard.width, zwaard.height, baas.x, baas.y, baas.width, baas.height)){
        baas.x -= zwaard.knockback;
        baas.y += zwaard.knockback;
      }
      for(let i = 0; i < baasWapen.x.length; i++){
        if(isCollision(speler.x - 60, speler.y + speler.height, zwaard.width, zwaard.height, baasWapen.x[i], baasWapen.y[i], baasWapen.width, baasWapen.height)){
          baasWapen.x.splice(i,1);
          baasWapen.y.splice(i,1);
          baasWapen.richting.splice(i,1);
          i--;
        }
      }
    }
    }else if(k === lebronRightUp){
      for(let i = 0; i < vijand.x[kamerStatus].length; i++){
      if(isCollision(speler.x + speler.width, speler.y - 60, zwaard.width, zwaard.height, vijand.x[kamerStatus][i], vijand.y[kamerStatus][i], vijand.width, vijand.height)){
        vijand.health[kamerStatus][i] -= zwaard.damage;
        vijand.x[kamerStatus][i] += zwaard.knockback;
        vijand.y[kamerStatus][i] -= zwaard.knockback;
      }}
      if(kamerStatus === EIND_KAMER){
      if(isCollision(speler.x + speler.width, speler.y - 60, zwaard.width, zwaard.height, baas.x, baas.y, baas.width, baas.height)){
        baas.x += zwaard.knockback;
        baas.y -= zwaard.knockback;
      }
      for(let i = 0; i < baasWapen.x.length; i++){
        if(isCollision(speler.x + speler.width, speler.y - 60, zwaard.width, zwaard.height, baasWapen.x[i], baasWapen.y[i], baasWapen.width, baasWapen.height)){
          baasWapen.x.splice(i,1);
          baasWapen.y.splice(i,1);
          baasWapen.richting.splice(i,1);
          i--;
        }
      }
    }
    }else if(k === lebronRightDown){
      for(let i = 0; i < vijand.x[kamerStatus].length; i++){
      if(isCollision(speler.x + speler.width, speler.y + speler.height, zwaard.width, zwaard.height, vijand.x[kamerStatus][i], vijand.y[kamerStatus][i], vijand.width, vijand.height)){
        vijand.health[kamerStatus][i] -= zwaard.damage;
        vijand.x[kamerStatus][i] += zwaard.knockback;
        vijand.y[kamerStatus][i] += zwaard.knockback;
      }}
      if(kamerStatus === EIND_KAMER){
      if(isCollision(speler.x + speler.width, speler.y + speler.height, zwaard.width, zwaard.height, baas.x, baas.y, baas.width, baas.height)){
        baas.x += zwaard.knockback;
        baas.y += zwaard.knockback;
      }
      for(let i = 0; i < baasWapen.x.length; i++){
        if(isCollision(speler.x + speler.width, speler.y + speler.height, zwaard.width, zwaard.height, baasWapen.x[i], baasWapen.y[i], baasWapen.width, baasWapen.height)){
          baasWapen.x.splice(i,1);
          baasWapen.y.splice(i,1);
          baasWapen.richting.splice(i,1);
          i--;
        }
      }
    }
    }
  
}
  //botsing kogel tegen alles
  for (let i = 0; i < pijlen.x.length; i++) {
    let removePijl = false;
  
    // Botsing met vijand
    for (let j = 0; j < vijand.x[kamerStatus].length; j++) {
      if (isCollision(
        pijlen.x[i], pijlen.y[i], pijlen.width, pijlen.height, 
        vijand.x[kamerStatus][j], vijand.y[kamerStatus][j], vijand.width, vijand.height)) {
  
        // Vijand health omlaag
        vijand.health[kamerStatus][j] -= pijlen.damage; 
  
        // Pijl verwijderen
        removePijl = true;
        break; // Stop met de loop omdat de collision is gedetecteerd
      }
    }
  if(kamerStatus === EIND_KAMER){
    // Botsing met baas
    if (!removePijl && isCollision(
      pijlen.x[i], pijlen.y[i], pijlen.width, pijlen.height,
      baas.x, baas.y, baas.width, baas.height)) {
      
      // Baas health omlaag
      baas.health -= pijlen.damage;
  
      // Pijl verwijderen
      removePijl = true;
    }
  
    // Botsing met baasWapen
    if (!removePijl) {
      for (let j = 0; j < baasWapen.x.length; j++) {
        if (isCollision(
          pijlen.x[i], pijlen.y[i], pijlen.width, pijlen.height, 
          baasWapen.x[j], baasWapen.y[j], baasWapen.width, baasWapen.height)) {
  
          // Baas wapen verwijderen
          baasWapen.x.splice(j, 1);
          baasWapen.y.splice(j, 1);
          baasWapen.richting.splice(j, 1);
          j--;
  
          // Pijl verwijderen
          removePijl = true;
          break;
        }
      }
    }
  }
    // Pijl verwijderen
    if (removePijl) {
      pijlen.x.splice(i, 1);
      pijlen.y.splice(i, 1);
      pijlen.richting.splice(i, 1);
      i--;
    }
  }
  //botsing speler en vijand
  damageTimer--;
  if(damageTimer <= 0 ){
    speler.invincible = false;
    speler.flashTimer = 0;
    for(let i = 0; i < vijand.x[kamerStatus].length; i++){
      if((speler.x + speler.width > vijand.x[kamerStatus][i] && speler.x < vijand.x[kamerStatus][i] + vijand.width && speler.y < vijand.y[kamerStatus][i] + vijand.height && speler.y + speler.height > vijand.y[kamerStatus][i]) && !speler.invincible){ 
        speler.health -= vijand.damage
        damageTimer = 80;
        speler.invincible = true;
        speler.flashTimer = 80;
        geluid[grr].play();
      }
    }
    if(kamerStatus === EIND_KAMER){
    if(isCollision(speler.x, speler.y, speler.width, speler.height, 
                    baas.x, baas.y, baas.width, baas.height)){
      speler.health -= baas.damage;
      damageTimer = 80;
      speler.invincible = true;
      speler.flashTimer = 80;
    }
  }
  } else if(speler.invincible){
    speler.flashTimer--;
  }
  //speler gebruikt sleutel voor deur
  if(speler.sleutels > 0 && keyIsDown(ENTER)){
    if(kamerStatus === NORMALE_KAMER1 && kamers[kamerStatus][8][7] !== 0 && kamers[kamerStatus][8][8] !== 0){
    speler.sleutels--;
    kamers[kamerStatus][8][7] = 0;
    kamers[kamerStatus][8][8] = 0;
    }
    if(kamerStatus === NORMALE_KAMER5 && kamers[kamerStatus][3][0] !== 0 && kamers[kamerStatus][4][0] !== 0){
      speler.sleutels--;
      kamers[kamerStatus][3][0] = 0;
      kamers[kamerStatus][4][0] = 0;
    }
    if(kamerStatus === NORMALE_KAMER10 && kamers[kamerStatus][3][15] !== 0 && kamers[kamerStatus][4][15] !== 0){
      speler.sleutels--;
      kamers[kamerStatus][3][15] = 0; 
      kamers[kamerStatus][4][15] = 0;
    }
  }

//bommem
  for(let i = 0; i < bomb.x.length; i++){
    if(bomb.timer[i] < 0){
      bomb.x.splice(i,1);
      bomb.y.splice(i,1);
      bomb.timer.splice(i,1);
      bomb.frameIndex.splice(i, 1);
      bomb.explosieTimer = 20;
      for(let j = 0; j < vijand.health[kamerStatus].length; j++){
        vijand.health[kamerStatus][j] -= bomb.damage;
      }
      if(kamerStatus === EIND_KAMER){
        baas.health -= bomb.damage;
      }
      for(let y = 0; y < rows; y++){
        for(let x = 0; x < cols; x++){
          let tileIndex = tiles[y][x];
          if(tileIndex === 6){
            kamers[kamerStatus][y][x] = 0;
          }
        }
      }
    }
  }
  bomb.explosieTimer--; 
  //als de health van de vijand lager dan 0 is gaat hij dood
  for(let i = 0; i < vijand.x[kamerStatus].length; i++){
 if (vijand.health[kamerStatus][i] <= 0) {
  if(vijand.heeftSleutel[kamerStatus][i]){
    speler.sleutels++;
  }
  geluid[dood].play();
  vijand.x[kamerStatus].splice(i, 1);
  vijand.y[kamerStatus].splice(i, 1);
  vijand.heeftSleutel[kamerStatus].splice(i, 1);
  vijand.richting.splice(i, 1);
  i--; 
  healing.aantal++;
  if(boogUnlocked){
    pijlen.aantal += 5;
  }
  if(bomb.unlocked){
    bomb.aantal += 1;
  }
}
  }
    
};

/**
 * Tekent spelscherm
 */
let tekenAlles = function() {
  // achtergrond
  fill("green")
  rect(0,0,1280,720);

  //tilemap
  for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
          let tileIndex = tiles[y][x];
          image(tileImages[tileIndex], x * tileSize, y * tileSize, tileSize, tileSize);
      }
  }
  if(kamerStatus === SCHAT_KAMER0 && !schat0unlocked){
    image(img[dichteSchat], 600, 400, 80, 80);
  }else if(kamerStatus === SCHAT_KAMER0 && schat0unlocked){
    image(gif[openSchat], 600, 400, 80, 80);
  }
  if(kamerStatus === SCHAT_KAMER1 && !schat1unlocked){
    image(img[dichteSchat], 320, 320, 80, 80)
  }else if(kamerStatus === SCHAT_KAMER1 && schat1unlocked){
    image(gif[openSchat], 320, 320, 80, 80)
  }
  if(kamerStatus === SCHAT_KAMER2 && !schat2unlocked){
    image(img[dichteSchat], 880, 320, 80, 80);
   
  }else if(kamerStatus === SCHAT_KAMER2 && schat2unlocked){
    image(gif[openSchat], 880, 320, 80, 80)
  }
  if(kamerStatus === SCHAT_KAMER3 && !schat3unlocked){
    image(img[dichteSchat], 320, 320, 80, 80);
  }else if(kamerStatus === SCHAT_KAMER3 && schat3unlocked){
    image(gif[openSchat], 320, 320, 80, 80);
  }
  // vijand
 stroke("black")
 strokeWeight(1);
  for(let i = 0; i < vijand.x[kamerStatus].length; i++){
    image(img[primo], vijand.x[kamerStatus][i], vijand.y[kamerStatus][i], vijand.width, vijand.height);
    strokeWeight(3);
    stroke(0);
    noFill();
    rect(vijand.x[kamerStatus][i],vijand.y[kamerStatus][i] - 30, 202 / 2,25);
    noStroke();
    fill('red');
    rect(vijand.x[kamerStatus][i] + 1,vijand.y[kamerStatus][i] - 29,(vijand.health[kamerStatus][i] * 2) / 2, 23)
  }
  //eindbaas
  if(kamerStatus === EIND_KAMER){
    image(gif[wc], baas.x, baas.y, baas.height, baas.width);

  }
  //zwaard
  if(vorigeK !== k){
    zwaard.actief = false;
  }
  vorigeK = k
  if (zwaard.actief) {
    push();
    if(k === lebronLeftDown){
      translate(speler.x, speler.y + speler.height);
    }else if(k === lebronLeftUp){
      translate(speler.x, speler.y);
    }else if(k === lebronRightUp){
      translate(speler.x + speler.width, speler.y);
    }else if(k === lebronRightDown){
      translate(speler.x + speler.width, speler.y + speler.height);
    }
    rotate(zwaard.angle);
    image(img[sword], 0, -zwaard.height / 2, zwaard.width, zwaard.height);
    pop();
  }else if(zwaard.unlocked && !zwaard.actief && !speler.masked){
    image(img[sword], speler.x+10, speler.y + 20, zwaard.width,zwaard.height)
  }

   //boog
   if(boogUnlocked && !speler.masked){
    image(img[boog], speler.x + 20, speler.y + 20, 40,40)
  }

// speler
  
  if(speler.richting === RECHTS_BOVEN){
      k = lebronRightUp;
  }else if (speler.richting === LINKS_BOVEN){
    k = lebronLeftUp;
  }else if (speler.richting === RECHTS_ONDER){
    k = lebronRightDown;
  }else if (speler.richting === LINKS_ONDER){
    k = lebronLeftDown;
  }
  if(speler.richting === RECHTS){
    if(laatsteRichting === RECHTS_BOVEN || laatsteRichting === LINKS_BOVEN){
      k = lebronRightUp;
    }
    else if(laatsteRichting === RECHTS_ONDER || laatsteRichting === LINKS_ONDER){
      k = lebronRightDown;
    } 
  }
  if(speler.richting === LINKS){
    if(laatsteRichting === LINKS_BOVEN || laatsteRichting === RECHTS_BOVEN){
      k = lebronLeftUp;
    }
    else if(laatsteRichting === LINKS_ONDER || laatsteRichting === RECHTS_ONDER){
      k = lebronLeftDown;
    }
  }
  if(speler.richting === ONDER){
    if(laatsteRichting === RECHTS_ONDER || laatsteRichting === RECHTS_BOVEN){
      k = lebronRightDown;
    }
    else if(laatsteRichting === LINKS_ONDER || laatsteRichting === LINKS_BOVEN){
      k = lebronLeftDown;
    } 
  }
  if(speler.richting === BOVEN){
    if(laatsteRichting === LINKS_BOVEN || laatsteRichting === LINKS_ONDER){
      k = lebronLeftUp;               
    }
    else if(laatsteRichting === RECHTS_BOVEN || laatsteRichting === RECHTS_ONDER){
      k = lebronRightUp;
    } 
  }

  if(speler.masked){
  if (!keyIsPressed) {
    if (speler.invincible && speler.flashTimer % 10 < 5) {
      image(img[primo], speler.x, speler.y, speler.width, speler.height);
    } else if (!speler.invincible) {
      image(img[primo], speler.x, speler.y, speler.width, speler.height);
    }
  } else {
    if (speler.invincible && speler.flashTimer % 10 < 5) {
      image(gif[primo], speler.x, speler.y, speler.width, speler.height);
    } else if (!speler.invincible) {
      image(gif[primo], speler.x, speler.y, speler.width, speler.height);
    }
  }
}else{
  if (!keyIsPressed) {
    if (speler.invincible && speler.flashTimer % 10 < 5) {
      image(img[k], speler.x, speler.y, speler.width, speler.height);
    } else if (!speler.invincible) {
      image(img[k], speler.x, speler.y, speler.width, speler.height);
    }
  } else {
    if (speler.invincible && speler.flashTimer % 10 < 5) {
      image(gif[k], speler.x, speler.y, speler.width, speler.height);
    } else if (!speler.invincible) {
      image(gif[k], speler.x, speler.y, speler.width, speler.height);
    }
  }
}
  
  //bommen
  for(let i = 0; i < bomb.x.length; i++){
    image(bombImages[bomb.frameIndex[i]], bomb.x[i], bomb.y[i], bomb.width, bomb.height);
  }
  //explosie
  if(bomb.explosieTimer > 0){
    image(img[boem], 0,0,1280,720);
  }
  //pijlen
  
fill('red')
for(let i = 0; i < pijlen.x.length; i++){
  push();
  translate(pijlen.x[i], pijlen.y[i]);
  rotate(pijlen.richting[i] - Math.PI);
  image(img[pijl], 0, 0, pijlen.width, pijlen.height);
  pop();
}
  
  //baas wapen
  for(let i = 0; i < baasWapen.x.length; i++){
    image(gif[wc], baasWapen.x[i], baasWapen.y[i], baasWapen.width, baasWapen.height);
  }

  //baas health
  if(kamerStatus === EIND_KAMER){
    strokeWeight(3);
    stroke(0);
    noFill();
    rect(350, 65, 302, 32);
    noStroke();
    fill('red');
    rect(351, 66, baas.health, 30);
  }
// punten en health
fill('green')
text('healing potions: ' + healing.aantal, 50, 300, 500, 200);
if(boogUnlocked) {
  text('pijlen: '+ pijlen.aantal, 50,180,500,200);
}
if(speler.maskUnlocked) {
  text('masker: ' + (speler.masked ? 'aan' : 'uit'), 50, 220, 500, 200);
}
if(bomb.unlocked) {
  text('bommen: ' + bomb.aantal, 50, 260, 500, 200);
}
fill('black')
for(let i = 0; i < speler.sleutels; i++){
  image(img[sleutel], 80 * i + 30, 100, 80,80);
}
strokeWeight(3);
stroke(0);
noFill();
rect(60,65,202,25);
noStroke();
fill('green');
rect(61,66,speler.health * 2, 23)

//debug

if(keyIsDown(H)){
  knopIngedruktNu.h = true;
}else{
  knopIngedruktNu.h = false;
}
if(knopIngedruktNu.h && !knopIngedruktVorige.h){
  hitboxBool = !hitboxBool;
}
if(hitboxBool){
  noFill();
  stroke(2)
  rect(speler.x,speler.y,speler.width, speler.height);
}
//kaart

knopIngedruktVorige.m = knopIngedruktNu.m;
if(keyIsDown(M)){
  knopIngedruktNu.m = true;
} else{
  knopIngedruktNu.m = false;
}
if(knopIngedruktNu.m && !knopIngedruktVorige.m){
  kaartBool = !kaartBool;
}
if(kaartBool){
  image(img[kaart], 360,80,560,560);
  fill('#4FC2F6')
  rect(speler.mapX, speler.mapY, 40,40);
}
strokeWeight(5);
stroke(2)
fill(0,0,0,0);
if(!arcade){
  ellipse(mouseX, mouseY, 30,30);
}

};

let tekenUitleg = function() {
  fill('green');
  rect(0,0,1280,720);
  fill('black')
  textSize(30);
  text('welkom, dit is het uitlegscherm, klik op '+ (arcade ? 'links onderste knop' : 'enter') +' om door te gaan', 20, 0, 1280, 720);
  text('controls voor Party spel: klik op '+ (arcade ? 'middel bovenste knop' : 'M') +' om de kaart te openen', 20, 45, 1280, 720);
  text((arcade ? 'de joystick' : 'wasd') + ' om te bewegen, en gebruik '+ (arcade ? 'de knop linksonder' : 'enter') +' om deuren en schatkisten te openen. klik op '+ (arcade ? 'rechts bovenste knop' : 'E') +' om te healen', 20, 90, 1280, 720);
  text('boog: klik op '+ (arcade ? 'rechts onderste knop om in de richting waar je loopt te schieten' : 'spatie om in een van de 8 richtingen te schieten, en de muis doet elke richting'), 20, 175, 1280, 720);
  text('bom: klik op '+ (arcade ? 'middel onderste knop' : 'C') +' om een bom te plaatsen die gebroken muren opblaast en vijanden schade doet', 20, 260, 1280, 720);
  text('zwaard: het zwaard doet weinig schade, en is bedoeld voor knockback. het kan in de vier schuine richtingen zwaaien. gebruik ' + (arcade ? 'de knop links onder om het te zwaaien' : 'Q om het te zwaaien'), 20, 345, 1280, 720);
  text('masker: klik op '+ (arcade ? 'rechts bovenste knop' : 'shift') +' om het masker aan/uit te doen. dit zorgt ervoor dat vijanden je niet aanvallen', 20, 430, 1280, 720);
  text('voor Flappy spel klik op '+ (arcade ? 'de rechts onderste knop' : 'spatie') +' om te springen', 20, 515, 1280, 720);
  text('gebruik in het menu a & d of de muis om tussen de opties te wisselen', 20, 560, 1280, 720);
  text('klik op '+ (arcade ? 'de links bovenste knop' : 'escape') +' om naar het pauze menu gaan', 20, 615, 1280, 720);
  text('veel plezier', 20, 680, 1280, 720);

  if(keyIsDown(ENTER)){
    vorigeSpelStatus = spelStatus;
    spelStatus = MENU;
    lastPressTime = millis();
  }
}

let tekenMenu = function() {
  //achtergrond
  strokeWeight(5);
  stroke(2);
  image(img[homescreen], 0,0,1280,720);
  //text
  fill('red');
  textSize(200);
  text('Kies een spel!', 0,300);
  //knoppen
  textSize(50);
  if(!arcade){
    if(mouseX > knop1.x && 
    mouseX < knop1.x + knop1.width &&
    mouseY > knop1.y &&
    mouseY < knop1.y + knop1.height){
      knop1.selected = true;
      knop2.selected = false;
      knop3.selected = false;
    }else if(mouseX > knop2.x && 
      mouseX < knop2.x + knop2.width &&
      mouseY > knop2.y &&
      mouseY < knop2.y + knop2.height){
        knop2.selected = true;
        knop1.selected = false;
        knop3.selected = false;
    }else if(mouseX > knop3.x && 
        mouseX < knop3.x + knop3.width &&
        mouseY > knop3.y &&
        mouseY < knop3.y + knop3.height){
          knop3.selected = true;
          knop1.selected = false;
          knop2.selected = false;
    }
  }
  if(knop1.selected){
    if(keyIsDown(D)){
      knop1.selected = false;
      knop2.selected = true;
      knop3.selected = false;
    }
    if(keyIsDown(W)){
      knop1.selected = false;
      knop2.selected = false;
      knop3.selected = true;
    }
      knopKleur1 = 'blue'
      fill('black')
      rect(knop1.x - 20, knop1.y - 20, knop1.width + 40, knop1.height + 40);
      if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){
        vorigeSpelStatus = spelStatus;
        spelStatus = SPELEN_PARTY;
        startParty();
        lastPressTime = millis();
        
      }
  }else{
    knopKleur1 = 'red'
  }
  if(knop2.selected){
    if(keyIsDown(A)){
      knop1.selected = true;
      knop2.selected = false;
      knop3.selected = false;
    }
    if(keyIsDown(W)){
      knop1.selected = false;
      knop2.selected = false;
      knop3.selected = true;
    }
      knopKleur2 = 'blue'
      fill('black')
      rect(knop2.x - 20, knop2.y - 20, knop2.width + 40, knop2.height + 40);
      if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){
        vorigeSpelStatus = spelStatus;
        spelStatus = SPELEN_FLAPPY;
        startFlappy();
        lastPressTime = millis();
      }
  }else{
    knopKleur2 = 'red'
  }
  if(knop3.selected){
    if(keyIsDown(S)){
      knop3.selected = false;
      knop2.selected = false;
      knop1.selected = true;
    }
      knopKleur3 = 'blue'
      fill('black')
      rect(knop3.x - 20, knop3.y - 20, knop3.width + 40, knop3.height + 40);
      if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){
        vorigeSpelStatus = spelStatus;
        spelStatus = SETTINGS;
        lastPressTime = millis()
      }
  }else{
    knopKleur3 = 'red'
  }

  fill(knopKleur1);
  rect(knop1.x, knop1.y, knop1.width, knop1.height);
  fill('green');
  text(knop1.text, knop1.x, knop1.y + 50);

  fill(knopKleur2);
  rect(knop2.x, knop2.y, knop2.width, knop2.height);
  fill('green');
  text(knop2.text, knop2.x, knop2.y + 50);

  fill(knopKleur3);
  rect(knop3.x, knop3.y, knop3.width, knop3.height);
  fill('green');
  text(knop3.text, knop3.x, knop3.y + 50);
}
let gameOverKnop1 = {
  x:200,
  y:500,
  width:300,
  height:200,
  text: 'terug naar menu',
  selected: true,
  kleur: 'blue'
}
let gameOverKnop2 = {
  x:600,
  y:500,
  width:400,
  height:200,
  text: 'herstart Rizz Party',
  selected: false,
  kleur: 'red'
}


let gameOverParty = function(){
  image(img[homescreen], 0, 0, 1280, 720);
  if(!arcade){
  if(mouseX > gameOverKnop1.x && 
    mouseX < gameOverKnop1.x + gameOverKnop1.width &&
    mouseY > gameOverKnop1.y &&
    mouseY < gameOverKnop1.y + gameOverKnop1.height){
      gameOverKnop1.selected = true;
      gameOverKnop2.selected = false;
    }else if(mouseX > gameOverKnop2.x && 
      mouseX < gameOverKnop2.x + gameOverKnop2.width &&
      mouseY > gameOverKnop2.y &&
      mouseY < gameOverKnop2.y + gameOverKnop2.height){
        gameOverKnop2.selected = true;
        gameOverKnop1.selected =false;
      }
    }
  if(gameOverKnop1.selected){
    if(keyIsDown(D)){
      gameOverKnop1.selected = false;
      gameOverKnop2.selected = true;
    }
      gameOverKnop1.kleur = 'blue'
      fill('black')
      rect(gameOverKnop1.x - 20, gameOverKnop1.y - 20, gameOverKnop1.width + 40, gameOverKnop1.height + 40);
      if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){ 
        vorigeSpelStatus = spelStatus;
        spelStatus = MENU;
        lastPressTime = millis();
      }
  }else{
    gameOverKnop1.kleur = 'red'
  }
  if(gameOverKnop2.selected){
    if(keyIsDown(A)){
      gameOverKnop1.selected = true;
      gameOverKnop2.selected = false;
    }
      gameOverKnop2.kleur = 'blue'
      fill('black')
      rect(gameOverKnop2.x - 20, gameOverKnop2.y - 20, gameOverKnop2.width + 40, gameOverKnop2.height + 40);
      if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){ 
        vorigeSpelStatus = spelStatus;
        spelStatus = SPELEN_PARTY;
        startParty();
        lastPressTime = millis();
      }
  }else{
    gameOverKnop2.kleur = 'red'
  }


  fill(gameOverKnop1.kleur);
  rect(gameOverKnop1.x, gameOverKnop1.y, gameOverKnop1.width, gameOverKnop1.height);
  fill('green');
  text(gameOverKnop1.text, gameOverKnop1.x, gameOverKnop1.y + 50, gameOverKnop1.width);

  fill(gameOverKnop2.kleur);
  rect(gameOverKnop2.x, gameOverKnop2.y, gameOverKnop2.width, gameOverKnop2.height);
  fill('green');
  text(gameOverKnop2.text, gameOverKnop2.x, gameOverKnop2.y + 50, gameOverKnop2.width);
  text('game over', 400, 40);
}

let completeKnop1 = {
  x:200,
  y:500,
  width:300,
  height:200,
  text: 'terug naar menu',
  selected: true,
  kleur: 'blue'
}
let completeKnop2 = {
  x:600,
  y:500,
  width:400,
  height:200,
  text: 'herstart Rizz Party',
  selected: false,
  kleur: 'red'
}

let partyComplete = function(){
  image(img[homescreen], 0, 0, 1280, 720);
  if(!arcade){
  if(mouseX > completeKnop1.x && 
    mouseX < completeKnop1.x + completeKnop1.width &&
    mouseY > completeKnop1.y &&
    mouseY < completeKnop1.y + completeKnop1.height){
      completeKnop1.selected = true;
      completeKnop2.selected = false;
    }else if(mouseX > completeKnop2.x && 
      mouseX < completeKnop2.x + completeKnop2.width &&
      mouseY > completeKnop2.y &&
      mouseY < completeKnop2.y + completeKnop2.height){
        completeKnop2.selected = true;
        completeKnop1.selected =false;
      }
    }
  if(completeKnop1.selected){
    if(keyIsDown(D)){
      completeKnop1.selected = false;
      completeKnop2.selected = true;
    }
      completeKnop1.kleur = 'blue'
      fill('black')
      rect(completeKnop1.x - 20, completeKnop1.y - 20, completeKnop1.width + 40, completeKnop1.height + 40);
      if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){ 
        vorigeSpelStatus = spelStatus;
        spelStatus = MENU;
        lastPressTime = millis();
      }
  }else{
    completeKnop1.kleur = 'red'
  }
  if(completeKnop2.selected){
    if(keyIsDown(A)){
      completeKnop1.selected = true;
      completeKnop2.selected = false;
    }
      completeKnop2.kleur = 'blue'
      fill('black')
      rect(completeKnop2.x - 20, completeKnop2.y - 20, completeKnop2.width + 40, completeKnop2.height + 40);
      if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){ 
        vorigeSpelStatus = spelStatus;
        spelStatus = SPELEN_PARTY;
        startParty();
        lastPressTime = millis();
      }
  }else{
    completeKnop2.kleur = 'red'
  }


  fill(completeKnop1.kleur);
  rect(completeKnop1.x, completeKnop1.y, completeKnop1.width, completeKnop1.height);
  fill('green');
  text(completeKnop1.text, completeKnop1.x, completeKnop1.y + 50, completeKnop1.width);

  fill(completeKnop2.kleur);
  rect(completeKnop2.x, completeKnop2.y, completeKnop2.width, completeKnop2.height);
  fill('green');
  text(completeKnop2.text, completeKnop2.x, completeKnop2.y + 50, completeKnop2.width);
  text('goed gedaan', 400, 40);
}
  

  //variabelen voor Flappy Lebron
  let score = 0;
  let vijandFlappy = {
    x: [800, 1200, 1500, 1800, 2100],
    y: [320 +Math.floor(Math.random() * 250), 320 +Math.floor(Math.random() * 250), 320 +Math.floor(Math.random() * 250), 320 +Math.floor(Math.random() * 250), 320 +Math.floor(Math.random() * 250)],
    startX: [],
    startY: [],
    width: 80,
    height: 400,
    gat: 270 + 400,
    snelheid: 3.5,
    passed: [false, false, false, false, false]
  }

  let spelBegint = false;

  const MAX_ROTATION = Math.PI / 6; // Maximum rotation in radians (30 degrees)
  const MIN_ROTATION = -Math.PI / 4; // Minimum rotation in radians (-45 degrees)

  let spelBegintStart = deepCopy(spelBegint);
  let vijandFlappyStart = deepCopy(vijandFlappy);
  

let startFlappy = function(){
  speler = deepCopy(spelerStart);
  vijandFlappy = deepCopy(vijandFlappyStart);
  spelBegint = deepCopy(spelBegintStart);
  score = 0;
}


let beweegFlappy = function(){
  if(keyIsDown(ESC) && millis() - lastPressTime > pressCooldown){
    vorigeSpelStatus = spelStatus;
    spelStatus = PAUZE;
    lastPressTime = millis()
  }
  //speler
  speler.width = 30
  speler. height = 70
  speler.x = 300;     //zet speler.x op 300, zal niet veranderen gedurende het spel
  
  if (speler.ySnelheid < 0) {
    speler.angle = Math.max(MIN_ROTATION, speler.ySnelheid / -10);
} else {
    speler.angle = Math.min(MAX_ROTATION, speler.ySnelheid / 10);
}
  // start game en springen
  if(keyIsDown(SPATIE)){
    spelBegint = true;
    speler.ySnelheid = speler.startYSnelheid;
  }
  if(spelBegint){
   
    speler.y -= speler.ySnelheid;
    
    speler.ySnelheid -= speler.zwaartekracht;
  }
  //vijand
  if(spelBegint){
    for(let i = 0; i < vijandFlappy.x.length; i++){
      vijandFlappy.x[i] -= vijandFlappy.snelheid;
    }
    //maakt het spel sneller naarmate tijd verloopt
    vijandFlappy.snelheid += 0.002; 
  }
}


function botsingFlappy() {
  // Verwijder en voeg vijanden toe & collision met speler
  for (let i = 0; i < vijandFlappy.x.length; i++) {
      let spelerX = speler.x - speler.width / 2; // een fix voor de collision, er waren wat bugs met de collision en dit vond ik op stack overflow
      let spelerY = speler.y - speler.height / 2;
      if (
          (spelerX + speler.width > vijandFlappy.x[i] &&
              spelerX < vijandFlappy.x[i] + vijandFlappy.width &&
              spelerY + speler.height > vijandFlappy.y[i] &&
              spelerY < vijandFlappy.y[i] + vijandFlappy.height) ||
          (spelerX + speler.width > vijandFlappy.x[i] &&
              spelerX < vijandFlappy.x[i] + vijandFlappy.width &&
              spelerY + speler.height > vijandFlappy.y[i] - vijandFlappy.gat &&
              spelerY < vijandFlappy.y[i] + vijandFlappy.height - vijandFlappy.gat)
      ) {
          speler.health = 0;
          gameOverKnop2.text = 'herstart flappy bird';
      }

      if(vijandFlappy.x[i] + vijandFlappy.width < 0){
        vijandFlappy.x.splice(i,1);
        vijandFlappy.y.splice(i,1);
        vijandFlappy.passed.splice(i,1);
        vijandFlappy.x.push(vijandFlappy.x[vijandFlappy.x.length - 1] + 300)
        vijandFlappy.y.push(320 +Math.floor(Math.random() * 250));
        vijandFlappy.passed.push(false);
      }
      if(speler.x > vijandFlappy.x[i] && !vijandFlappy.passed[i]){
        vijandFlappy.passed[i] = true;
        score++;
      }

  }
  if(speler.y > 720 || speler.y < 0){
    speler.health = 0;
  }

}




let tekenFlappy = function() {
  // Achtergrond
  background('blue');
  image(img[bg], 0, 0, 1280, 720)

  // Vijand
  for (let i = 0; i < vijandFlappy.x.length; i++) {
      image(img[wall], vijandFlappy.x[i], vijandFlappy.y[i], vijandFlappy.width, vijandFlappy.height);
      image(img[wall], vijandFlappy.x[i], vijandFlappy.y[i] - vijandFlappy.gat, vijandFlappy.width, vijandFlappy.height);
  }

  // Speler
  push();
  translate(speler.x, speler.y);
  rotate(speler.angle);
  imageMode(CENTER);
  image(img[flappySpeler], 0, 20, speler.width, speler.height);
  pop();

  textSize(50);
  text('score: '+ score, 50,200)
}




let gameOverFlappy = function(){
  image(img[homescreen], 0, 0, 1280, 720);
  text('score: '+ score, 50,200)
  if(!arcade){
if(mouseX > gameOverKnop1.x && 
  mouseX < gameOverKnop1.x + gameOverKnop1.width &&
  mouseY > gameOverKnop1.y &&
  mouseY < gameOverKnop1.y + gameOverKnop1.height){
    gameOverKnop1.selected = true;
    gameOverKnop2.selected = false;
  }else if(mouseX > gameOverKnop2.x && 
    mouseX < gameOverKnop2.x + gameOverKnop2.width &&
    mouseY > gameOverKnop2.y &&
    mouseY < gameOverKnop2.y + gameOverKnop2.height){
      gameOverKnop2.selected = true;
      gameOverKnop1.selected =false;
    }
  }
if(gameOverKnop1.selected){
  if(keyIsDown(D)){
    gameOverKnop1.selected = false;
    gameOverKnop2.selected = true;
  }
    gameOverKnop1.kleur = 'blue'
    fill('black')
    rect(gameOverKnop1.x - 20, gameOverKnop1.y - 20, gameOverKnop1.width + 40, gameOverKnop1.height + 40);
    if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){ 
      vorigeSpelStatus = spelStatus;
      spelStatus = MENU;
      lastPressTime = millis();
    }
}else{
  gameOverKnop1.kleur = 'red'
}
if(gameOverKnop2.selected){
  if(keyIsDown(A)){
    gameOverKnop1.selected = true;
    gameOverKnop2.selected = false;
  }
    gameOverKnop2.kleur = 'blue'
    fill('black')
    rect(gameOverKnop2.x - 20, gameOverKnop2.y - 20, gameOverKnop2.width + 40, gameOverKnop2.height + 40);
    if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){ 
      vorigeSpelStatus = spelStatus;
      spelStatus = SPELEN_FLAPPY
      startFlappy();
      lastPressTime = millis();
    }
}else{
  gameOverKnop2.kleur = 'red'
}


fill(gameOverKnop1.kleur);
rect(gameOverKnop1.x, gameOverKnop1.y, gameOverKnop1.width, gameOverKnop1.height);
fill('green');
text(gameOverKnop1.text, gameOverKnop1.x, gameOverKnop1.y + 50, gameOverKnop1.width);

fill(gameOverKnop2.kleur);
rect(gameOverKnop2.x, gameOverKnop2.y, gameOverKnop2.width, gameOverKnop2.height);
fill('green');
text(gameOverKnop2.text, gameOverKnop2.x, gameOverKnop2.y + 50, gameOverKnop1.width);
text('game over', 400, 40);
}


/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */
/**
 * preload voor laden fotos, gifs en audio.
 */
function preload() {
  img = [
    loadImage('images/lebronLeftDown.png'), 
    loadImage('images/lebronRightDown.png'), 
    loadImage('images/lebronLeftUp.png'), 
    loadImage('images/lebronRightUp.png'), 
    loadImage('images/sandBg.png'), 
    loadImage('images/wallBg.png'), 
    loadImage('images/groundBg.png'), 
    loadImage('images/dungeonMap.png'),
    loadImage('images/primo.png'),
    loadImage('images/homescreen.png'),
    loadImage('images/ohio.jpeg'),
    loadImage('images/sleutelWall.png'),
    loadImage('images/sleutel.png'),
    loadImage('images/zwaard.png'),
    loadImage('images/lebronRightDown2.png'),
    loadImage('images/closedTreasure.png'),
    loadImage('images/boog.png'),
    loadImage('images/BrokenWall.png'),
    loadImage('images/bomb.gif'),
    loadImage('images/boem.png'),
    loadImage('images/pijl.png'),
    loadImage('images/bgsettings.png')
  ];
  gif = [
    loadImage('gifs/lebronLeftDown.gif'), 
    loadImage('gifs/lebronRightDown.gif'), 
    loadImage('gifs/lebronLeftUp.gif'), 
    loadImage('gifs/lebronRightUp.gif'), 
    loadImage('gifs/grassBg.gif'), 
    loadImage('gifs/wc.gif'), 
    loadImage('gifs/sea.gif'),
    loadImage('gifs/amongus.gif'),
    loadImage('images/primo.png'),
    loadImage('gifs/treasure.gif')
  ];
  geluid = [
    new Audio('audio/sunshine.mp3'), 
    new Audio('audio/sigma.mp3'),
    new Audio('audio/primoDood.mp3'),
    new Audio('audio/primoGrr.mp3'),
    new Audio('audio/zoowee.mp3')
  ];
  for (let i = 0; i < totalFrames; i++) {
    bombImages[i] = loadImage(`images/bomb_frame_${i}.png`); // Template literal, voor meer info hierover zoek het op het internet op
  }
    tileImages = [img[ground], img[wall], img[sand], gif[grass], gif[sea], img[keyWall], img[brokenWall]];
};

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}


let settingsKnop1 = {
  x:200,
  y:500,
  width:300,
  height:200,
  text: 'geluid: ',
  selected: true,
  kleur: 'blue'
}
let settingsKnop2 = {
  x:600,
  y:500,
  width:400,
  height:200,
  text: 'sfx: ',
  selected: false,
  kleur: 'red'
}

/**
 * settings
 * regel geluid, sfx, enzovoort
 */
function settings(){
  image(img[bgSettings], 0, 0, 1280, 720);
  if(!arcade){
  if(mouseX > settingsKnop1.x && 
    mouseX < settingsKnop1.x + settingsKnop1.width &&
    mouseY > settingsKnop1.y &&
    mouseY < settingsKnop1.y + settingsKnop1.height){
      settingsKnop1.selected = true;
      settingsKnop2.selected = false;
    }else if(mouseX > settingsKnop2.x && 
      mouseX < settingsKnop2.x + settingsKnop2.width &&
      mouseY > settingsKnop2.y &&
      mouseY < settingsKnop2.y + settingsKnop2.height){
        settingsKnop2.selected = true;
        settingsKnop1.selected = false;
      }
    }
  if(settingsKnop1.selected){
    if(keyIsDown(D)){
      settingsKnop1.selected = false;
      settingsKnop2.selected = true;
    }
      settingsKnop1.kleur = 'blue'
      fill('black')
      rect(settingsKnop1.x - 20, settingsKnop1.y - 20, settingsKnop1.width + 40, settingsKnop1.height + 40);
      if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){ 
        muziekAan = !muziekAan;
        lastPressTime = millis();
      }
  }else{
    settingsKnop1.kleur = 'red'
  }
  if(settingsKnop2.selected){
    if(keyIsDown(A)){
      settingsKnop1.selected = true;
      settingsKnop2.selected = false;
    }
      settingsKnop2.kleur = 'blue'
      fill('black')
      rect(settingsKnop2.x - 20, settingsKnop2.y - 20, settingsKnop2.width + 40, settingsKnop2.height + 40);
      if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){ 
        sfxAan = !sfxAan;
        lastPressTime = millis();
      }
  }else{
    settingsKnop2.kleur = 'red'
  }
  
  
  fill(settingsKnop1.kleur);
  rect(settingsKnop1.x, settingsKnop1.y, settingsKnop1.width, settingsKnop1.height);
  fill('green');
  text(settingsKnop1.text + (muziekAan ? 'aan' : 'uit'), settingsKnop1.x, settingsKnop1.y + 50, settingsKnop1.width);
  
  fill(settingsKnop2.kleur);
  rect(settingsKnop2.x, settingsKnop2.y, settingsKnop2.width, settingsKnop2.height);
  fill('green');
  text(settingsKnop2.text + (sfxAan ? 'aan' : 'uit'), settingsKnop2.x, settingsKnop2.y + 50, settingsKnop1.width);
  text('settings', 400, 80);
  text('klik op escape om terug te gaan', 400, 160);
  if(keyIsDown(ESC) && millis() - lastPressTime > pressCooldown){
    spelStatus = vorigeSpelStatus;
    lastPressTime = millis();
    if(vorigeVorigeSpelStatus === SPELEN_FLAPPY){
      tekenFlappy();
    }else if(vorigeVorigeSpelStatus === SPELEN_PARTY){
      tekenAlles();
    }
  }
}

const pauzeKnop1 = {
  x:250,
  y:150,
  width:300,
  height:150,
  text: 'doorgaan',
  selected: true,
  kleur: 'blue'
}

const pauzeKnop2 = {
  x:730,
  y:150,
  width:300,
  height:150,
  text: 'herstarten',
  selected: false,
  kleur: 'red'
}

const pauzeKnop3 = {
  x:250,
  y:420,
  width:300,
  height:150,
  text: 'instellingen',
  selected: false,
  kleur: 'red'
}

const pauzeKnop4 = {
  x:730,
  y:420,
  width:300,
  height:150,
  text: 'terug naar menu',
  selected: false,
  kleur: 'red'
}
/**
 * pause functie
 * om terug naar hoofdmenu te gaan of naar instellingen te gaan
 */
function pause() {
  fill('green');
  rect(200, 100, 880, 520);
  if(keyIsDown(ESC) && millis() - lastPressTime > pressCooldown){
    if(vorigeSpelStatus === PAUZE){
      spelStatus = vorigeVorigeSpelStatus;
    }else{
      spelStatus = vorigeSpelStatus;
    }
    lastPressTime = millis()
  }
if(!arcade){
  if(mouseX > pauzeKnop1.x && 
    mouseX < pauzeKnop1.x + pauzeKnop1.width &&
    mouseY > pauzeKnop1.y &&
    mouseY < pauzeKnop1.y + pauzeKnop1.height){
      pauzeKnop1.selected = true;
      pauzeKnop2.selected = false;
      pauzeKnop3.selected = false;
      pauzeKnop4.selected = false;
  }else if(mouseX > pauzeKnop2.x && 
      mouseX < pauzeKnop2.x + pauzeKnop2.width &&
      mouseY > pauzeKnop2.y &&
      mouseY < pauzeKnop2.y + pauzeKnop2.height){
        pauzeKnop2.selected = true;
        pauzeKnop1.selected = false;
        pauzeKnop3.selected = false;
        pauzeKnop4.selected = false;
  }else if(mouseX > pauzeKnop3.x && 
        mouseX < pauzeKnop3.x + pauzeKnop3.width &&
        mouseY > pauzeKnop3.y &&
        mouseY < pauzeKnop3.y + pauzeKnop3.height){
          pauzeKnop3.selected = true;
          pauzeKnop1.selected = false;
          pauzeKnop2.selected = false;
          pauzeKnop4.selected = false;
  }else if(mouseX > pauzeKnop4.x && 
      mouseX < pauzeKnop4.x + pauzeKnop4.width &&
      mouseY > pauzeKnop4.y &&
      mouseY < pauzeKnop4.y + pauzeKnop4.height){
        pauzeKnop4.selected = true;
        pauzeKnop1.selected = false;
        pauzeKnop2.selected = false;
        pauzeKnop3.selected = false;
  }
}
  
  if(pauzeKnop1.selected){
    if(keyIsDown(D)){
      pauzeKnop2.selected = true;
      pauzeKnop1.selected = false;
      pauzeKnop3.selected = false;
      pauzeKnop4.selected = false;
    }
    if(keyIsDown(S)){
      pauzeKnop3.selected = true;
      pauzeKnop1.selected = false;
      pauzeKnop2.selected = false;
      pauzeKnop4.selected = false;
    }
      pauzeKnop1.kleur = 'blue'
      fill('black')
      rect(pauzeKnop1.x - 20, pauzeKnop1.y - 20, pauzeKnop1.width + 40, pauzeKnop1.height + 40);
      if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){ 
        if(vorigeSpelStatus === PAUZE){
          spelStatus = vorigeVorigeSpelStatus;
        }else{
          spelStatus = vorigeSpelStatus;
        }
        lastPressTime = millis();
      }
  }else{
    pauzeKnop1.kleur = 'red'
  }
  if(pauzeKnop2.selected){
    if(keyIsDown(A)){
      pauzeKnop1.selected = true;
      pauzeKnop2.selected = false;
      pauzeKnop3.selected = false;
      pauzeKnop4.selected = false;
    }
    if(keyIsDown(S)){
      pauzeKnop4.selected = true;
      pauzeKnop1.selected = false;
      pauzeKnop2.selected = false;
      pauzeKnop3.selected = false;
    }
      pauzeKnop2.kleur = 'blue'
      fill('black')
      rect(pauzeKnop2.x - 20, pauzeKnop2.y - 20, pauzeKnop2.width + 40, pauzeKnop2.height + 40);
      if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){ 
        spelStatus = vorigeSpelStatus
        if(spelStatus === SPELEN_PARTY){
          startParty();
        }
        if(spelStatus === SPELEN_FLAPPY){
          startFlappy();
        }
        lastPressTime = millis();
      }
  }else{
    pauzeKnop2.kleur = 'red'
  }
  if(pauzeKnop3.selected){
    if(keyIsDown(D)){
      pauzeKnop4.selected = true;
      pauzeKnop1.selected = false;
      pauzeKnop2.selected = false;
      pauzeKnop3.selected = false;
    }
    if(keyIsDown(W)){
      pauzeKnop1.selected = true;
      pauzeKnop2.selected = false;
      pauzeKnop3.selected = false;
      pauzeKnop4.selected = false;
    }
      pauzeKnop3.kleur = 'blue'
      fill('black')
      rect(pauzeKnop3.x - 20, pauzeKnop3.y - 20, pauzeKnop3.width + 40, pauzeKnop3.height + 40);
      if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){ 
        
        //dit is zodat het wisselen tussen settings menu, hoofdmenu en het andere spel nog werkt, aan deze elf regels code heb ik (jasper) 30 minuten gezeten
        if(vorigeVorigeSpelStatus === SPELEN_PARTY){
          if(vorigeSpelStatus !== SPELEN_PARTY){
            vorigeVorigeSpelStatus = vorigeSpelStatus;
          }
        }else if(vorigeVorigeSpelStatus === SPELEN_FLAPPY){
          if(vorigeSpelStatus !== SPELEN_FLAPPY){
            vorigeVorigeSpelStatus = vorigeSpelStatus;
          }
        }
        if((vorigeVorigeSpelStatus !== SPELEN_PARTY) && 
           (vorigeVorigeSpelStatus !== SPELEN_FLAPPY)){
            vorigeVorigeSpelStatus = vorigeSpelStatus;
        }
        
        vorigeSpelStatus = spelStatus;
        spelStatus = SETTINGS;
        lastPressTime = millis();
      }
  }else{
    pauzeKnop3.kleur = 'red'
  }
  if(pauzeKnop4.selected){
    if(keyIsDown(A)){
      pauzeKnop3.selected = true;
      pauzeKnop1.selected = false;
      pauzeKnop2.selected = false;
      pauzeKnop4.selected = false;
    }
    if(keyIsDown(W)){
      pauzeKnop2.selected = true;
      pauzeKnop1.selected = false;
      pauzeKnop3.selected = false;
      pauzeKnop4.selected = false;
    }
      pauzeKnop4.kleur = 'blue'
      fill('black')
      rect(pauzeKnop4.x - 20, pauzeKnop4.y - 20, pauzeKnop4.width + 40, pauzeKnop4.height + 40);
      if((mouseIsPressed || keyIsDown(ENTER)) && millis() - lastPressTime > pressCooldown){ 
        spelStatus = MENU;
        lastPressTime = millis();
      }
  }else{
    pauzeKnop4.kleur = 'red'
  }



  fill(pauzeKnop1.kleur);
  rect(pauzeKnop1.x, pauzeKnop1.y, pauzeKnop1.width, pauzeKnop1.height);
  fill('green');
  text(pauzeKnop1.text, pauzeKnop1.x, pauzeKnop1.y + 50, pauzeKnop1.width);
  
  fill(pauzeKnop2.kleur);
  rect(pauzeKnop2.x, pauzeKnop2.y, pauzeKnop2.width, pauzeKnop2.height);
  fill('green');
  text(pauzeKnop2.text, pauzeKnop2.x, pauzeKnop2.y + 50, pauzeKnop1.width);

  fill(pauzeKnop3.kleur);
  rect(pauzeKnop3.x, pauzeKnop3.y, pauzeKnop3.width, pauzeKnop3.height);
  fill('green');
  text(pauzeKnop3.text, pauzeKnop3.x, pauzeKnop3.y + 50, pauzeKnop3.width);
  
  fill(pauzeKnop4.kleur);
  rect(pauzeKnop4.x, pauzeKnop4.y, pauzeKnop4.width, pauzeKnop4.height);
  fill('green');
  text(pauzeKnop4.text, pauzeKnop4.x, pauzeKnop4.y + 25, pauzeKnop4.width);
}
/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if(muziekAan){
    geluid[sunshine].volume = 0.5;
  }else{
    geluid[sunshine].volume = 0;
  }
  if(sfxAan){
    for(let i = 1; i < geluid.length; i++){
      geluid[i].volume = 1;
    }
  }else{
    for(let i = 1; i < geluid.length; i++){
      geluid[i].volume = 0;
    }
  }
  
  if(spelStatus === PAUZE){
    pause();
  }
  if(spelStatus === SETTINGS){
    settings();
  }
  if(spelStatus === UITLEG){
    tekenUitleg();
  }
  if(spelStatus === MENU){
    tekenMenu();
  }
  if (spelStatus === SPELEN_PARTY) {
    if(!kaartBool){
      beweegAlles();
      verwerkBotsing();
    }
    tekenAlles();
    geluid[sunshine].play();
    
    if (speler.health <= 0) {
      gameOverKnop2.text = 'herstart Rizz Party'
      spelStatus = GAMEOVER_PARTY;
    }
    if(baas.health <= 0){
      spelStatus = EINDE_PARTY;
    lastPressTime = millis();
    }

  }
  if(spelStatus === SPELEN_FLAPPY){
    beweegFlappy();
    botsingFlappy();
    tekenFlappy();
    
    geluid[sunshine].play();
    if (speler.health <= 0) {
      spelStatus = GAMEOVER_FLAPPY;
    }
  }
  if (spelStatus === GAMEOVER_PARTY) {
    // teken game-over scherm
    gameOverParty();
  }
  if(spelStatus === GAMEOVER_FLAPPY){
    gameOverKnop2.text = 'herstart Flappy Lebron'
    gameOverFlappy();
  }
  if(spelStatus === EINDE_PARTY){
    partyComplete();
  }
}
