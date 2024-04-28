/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const UITLEG = 1;                        // spelstatus: uitleg
const LEVELS = 2;                        // spelstatus: levels
const SPELEN = 3;                        // spelstatus: spelen
const GAMEOVER = 4;                      // spelstatus: gameover
const WIN = 5;                           // spelstatus: win
var spelStatus = UITLEG;                 // huidige spelstatus
const Space = 32;                        // spatiebalk
const Enter = 13;                        // enter
const Backspace = 8;                     // backspace
const keyW = 87;                         // W
const keyA = 65;                         // A
const keyD = 68;                         // D

// toetsen voor level selectie:
const Digit1 = 49;                       // 1 (qwerty-toetsenbord)
const Digit2 = 50;                       // 2 (qwerty-toetsenbord)
const Digit3 = 51;                       // 3 (qwerty-toetsenbord)
const Digit4 = 52;                       // 4 (qwerty-toetsenbord)
const Digit5 = 53;                       // 5 (qwerty-toetsenbord)
const Digit6 = 54;                       // 6 (qwerty-toetsenbord)
const Numpad1 = 97;                      // 1 (numpad)
const Numpad2 = 98;                      // 2 (numpad)
const Numpad3 = 99;                      // 3 (numpad)
const Numpad4 = 100;                     // 4 (numpad)
const Numpad5 = 101;                     // 5 (numpad)
const Numpad6 = 102;                     // 6 (numpad)
const toetsenbordCijfers = [Digit1,  Digit2,  Digit3,  Digit4,  Digit5,  Digit6];   // array met toetsenbordcijfers 1 t/m 6
const keypadCijfers =      [Numpad1, Numpad2, Numpad3, Numpad4, Numpad5, Numpad6];  // array met numpadcijfers 1 t/m 6

var pauze;                               // houdt bij of het spel gepauzeerd is
var huidigLevel;                         // houdt bij welk level op dit moment gespeeld wordt
var standaardLevel;                      // standaard level
var level1;                              // level 1
var level2;                              // level 2
var level3;                              // level 3
var level4;                              // level 4
var level5;                              // level 5
var level6;                              // level 6
var levelGeselecteerd = 0;               // houdt bij welk level geselecteerd is
var wereld1;                             // wereld 1

// level:            0      1      2      3      4      5      6       (level 0 = standaardLevel)
var levelVoltooid = [true,  false, false, false, false, false, false]; // houdt bij welke levels voltooid zijn (level 0 = standaardLevel, wordt automatisch voltooid)
var highscore =     [0,     0,     0,     0,     0,     0,     0,   ]; // hoogste score waarmee de speler een level heeft gehaald

// levelkaders:       1      2      3      4      5      6        (level 0 = standaardLevel)
var kaderPosX =     [380,   560,   740,   380,   560,   740  ];  // x-positie van elk kader
var kaderPosY =     [200,   200,   200,   370,   370,   370  ];  // y-positie van elk kader
var kaderKleur =    ["red", "red", "red", "red", "red", "red"];  // Kleur van de levelkaders is standaard rood (rood = niet voltooid, groen = voltooid)
const kaderGrootte = 150;                // Grootte van elk kader

// score:
var punten;                              // punten van de speler die zijn behaald door het oppakken van muntjes of het doden van een vijand
var score;                               // score van de speler (behaalde punten + resterende tijd x 2)

// geluiden:
var geluidenDempen;                      // houdt bij of de geluiden gedempt zijn
var algemeenMuziekje;                    // algemeen muziekje
var breekBlok_geluid;                    // geluid van een blok dat breekt
var botsing_geluid;                      // geluid van een botsing
var muntjeOpgepakt_geluid;               // geluid van een muntje dat opgepakt wordt
var powerupOpgepakt_geluid;              // geluid van een powerup die opgepakt wordt
var vuurbal_geluid;                      // geluid van een vuurbal
var finishStokGlijden_geluid;            // geluid van de speler die langs de finishpaal glijdt
var gameover_geluid;                     // geluid van gameover
var springenKlein_geluid;                // geluid van een kleine sprong
var springenGroot_geluid;                // geluid van een grote sprong
var spelerDood_geluid;                   // geluid van de speler die dood gaat
var vijandGedood_geluid;                 // geluid van een vijand die gedood wordt
var spelGepauzeerd_geluid;               // geluid van het pauzeren van het spel
var spelerGeraakt_geluid;                // geluid van de speler die door een buis gaat
var powerupVerschijnt_geluid;            // geluid van een powerup die verschijnt
var levelVoltooid_geluid;                // geluid van een level dat voltooid wordt
var tijdBijnaVoorbij_geluid;             // geluid van de tijd die bijna voorbij is
var wereldVoltooid_geluid;               // geluid van een wereld die voltooid wordt

// spritesheets/afbeeldingen:
var superMarioBrosLogo;                  // afbeelding van het Super Mario Bros logo
var superMarioBrosLogoX;                 // x-positie van het Super Mario Bros logo
var objectenSpritesheet;                 // spritesheet van objecten
var rechtsOrganismenSpritesheet;         // spritesheet van organismen naar rechts
var linksOrganismenSpritesheet;          // spritesheet van organismen naar links
var muntSpritesheet;                     // spritesheet van een munt
var wolkenSpritesheet;                   // spritesheet van wolken
var kasteel;                             // afbeelding van een kasteel
var scenerySpritesheet;                  // spritesheet van scenery
var vijandenSpritesheet;                 // spritesheet van vijanden
var audioAan;                            // afbeelding van een audio aan knop
var audioUit;                            // afbeelding van een audio uit knop

// finish:
var finishTopX;                          // x-positie van de top van de finishpaal
var finishTopY;                          // Y-positie van de top van de finishpaal
const finishTopBreedte = 38;             // breedte van de top van de finishpaal
const finishTopHoogte = 34;              // hoogte van de top van de finishpaal
var finishStokX;                         // x-positie van de stok van de finishpaal
var finishStokY;                         // Y-positie van de stok van de finishpaal
const finishStokBreedte = 10;            // breedte van de stok van de finishpaal
var finishStokHoogte;                    // hoogte van de stok van de finishpaal
let spelerOpFinishPaal;                  // houdt bij of de speler aan de finishpaal hangt
let finishPaalGeraakt;                   // houdt bij of de speler de finishpaal geraakt heeft

// wolken op de achtergrond:
var wolkenX;                             // x-positie van een wolk
var wolkenY;                             // Y-positie van een wolk
const wolkenBreedte = 2287*0.2;          // breedte van een wolk
const wolkenHoogte = 866*0.2;            // hoogte van een wolk

// speler gerelateerd:
const speler = {
  // algemeen:
  x: 0,                                  // x-positie van speler
  y: 0,                                  // y-positie van speler
  breedte: 48,                           // breedte van speler
  hoogte: 66,                            // hoogte van speler
  snelheid: 5,                           // snelheid van speler
  kijkRichting: "rechts",                // kijkRichting van speler
  beweegt: "niet",                       // houdt bij of speler beweegt (niet, links, rechts)
  levens: 1,                             // Levens van speler
  leeft: true,                           // houdt bij of speler leeft
  knippert: false,                       // houdt bij of speler knippert
  knipperTijd: 0,                        // houdt bij hoe lang speler knippert
  isGeraakt: false,                      // houdt bij of speler is geraakt door een vijand
  kanGeraaktWorden: true,                // houdt bij of speler geraakt kan worden
  opGoomba: false,                       // houdt bij of speler op een goomba staat
  status: "Mario",                       // status van speler (Mario, Super Mario, Fire Mario)
  wasGroot: false,                       // houdt bij of de speler in het vorige level groot finishte

  // spritelocaties:
  lopenRechtsX: 48,                      // x-locatie van de sprite: naar rechts lopende speler
  rennenRechtsX: 88,                     // x-locatie van de sprite: naar rechts rennende speler
  lopenLinksX: 372,                      // x-locatie van de sprite: naar links lopende speler
  rennenLinksX: 332,                     // x-locatie van de sprite: naar links rennende speler
  springenSpriteRX: 128,                 // x-locatie van de sprite: naar rechts springende speler
  springenSpriteLX: 292,                 // x-locatie van de sprite: naar links springende speler
  staanSpriteRX: 9,                      // x-locatie van de sprite: naar rechts kijkende stilstaande speler
  staanSpriteLX: 413,                    // x-locatie van de sprite: naar links kijkende stilstaande speler
  opFinishpaalSprite1X: 205,             // x-locatie van de sprite: speler op finishpaal
  opFinishpaalSprite2X: 245,             // x-locatie van de sprite: speler op finishpaal  
  dood: 88,                              // x-locatie van de sprite: speler is vermoord
  spriteY: 6,                            // y-locatie van alle speler sprites (standaard 6, kleine speler)
  spriteHoogte: 17,                      // hoogte van sprite in spritesheet
  spriteBreedte: 17,                     // breedte van sprite in spritesheet

  // animaties:
  animatieLengte: 0,                     // lengte van de animatie van de speler
  spriteL: 0,                            // sprite van de speler als hij naar links kijkt
  spriteR: 0,                            // sprite van de speler als hij naar rechts kijkt
  springenLinks: 0,                      // sprite van de speler als hij naar links springt
  springenRechts: 0,                     // sprite van de speler als hij naar rechts springt
  staanLinks: 0,                         // sprite van de speler als hij naar links staat
  staanRechts: 0,                        // sprite van de speler als hij naar rechts staat
  renAnimatieR: [],                      // animatie van de speler als hij naar rechts rent
  renAnimatieL: [],                      // animatie van de speler als hij naar links rent
  knippertAnimatieL: [],                 // animatie van de speler als hij knippert en naar links kijkt
  knippertAnimatieR: [],                 // animatie van de speler als hij knippert en naar rechts kijkt
  klimtAnimatie: [],                     // animatie van de speler als hij klimt
  klimt: 0,                              // sprite van de speler als hij klimt

  // springen:
  springt: false,                        // houdt bij of speler springt
  springSnelheid: 0,                     // de snelheid waarmee speler springt
  springHoogte: 14,                      // de hoogte waarmee speler springt
  valt: false,                           // houdt bij of speler valt (noodzakelijk voor de code die de goomba vermoord als speler op de goomba valt)

  // knoppen:
  springKnopIngedruktNu: false,          // houdt bij of een springknop nu is ingedrukt
  springKnopIngedruktVorige: false,      // houdt bij of een springknop vorige keer was ingedrukt
  knopLinksIngedrukt: false,             // houdt bij of een knop links is ingedrukt
  knopRechtsIngedrukt: false,            // houdt bij of een knop rechts is ingedrukt
  schietKnopIngedruktNu: false,          // houdt bij of een schietknop nu is ingedrukt
  schietKnopIngedruktVorige: false,      // houdt bij of een schietknop vorige keer was ingedrukt
  pauzeKnopIngedruktNu: false,           // houdt bij of een pauzeknop nu is ingedrukt
  pauzeKnopIngedruktVorige: false,       // houdt bij of een pauzeknop vorige keer was ingedrukt
  geluidKnopIngedruktNu: false,          // houdt bij of een geluidsknop nu is ingedrukt
  geluidKnopIngedruktVorige: false,      // houdt bij of een geluidsknop vorige keer was ingedrukt
}

// vuurbal gerelateerd:
const vuurbal = {
  // algemeen:
  x: [],                          // x-positie van een vuurbal
  y: [],                          // y-positie van een vuurbal
  hoogte: 23,                     // hoogte van een vuurbal
  breedte: 17,                    // breedte van een vuurbal
  snelheid: 5 + speler.snelheid,  // snelheid van een vuurbal
  richting: [],                   // richting van een vuurbal
  explodeert: [],                 // houdt bij of een vuurbal explodeert
  explosieTijd: [],               // houdt bij hoe lang een vuurbal explodeert

  // stuiteren:
  stuitert: [],                   // houdt bij of een vuurbal stuitert
  stuiterSnelheid: [],            // de snelheid waarmee een vuurbal stuitert
  stuiterHoogte: 5,               // de hoogte waarmee een vuurbal stuitert

  // spritelocaties:
  linksSpriteX: 25,               // x-locatie van de sprite: vuurbal links
  rechtsSpriteX: 40,              // x-locatie van de sprite: vuurbal rechts
  bovenSpriteY: 149,              // y-locatie van de sprite: vuurbal boven
  onderSpriteY: 164,              // y-locatie van de sprite: vuurbal onder
  explosieSmallSpriteX: 360,      // x-locatie van de sprite: kleine explosie
  explosieMediumSpriteX: 390,     // x-locatie van de sprite: middelgrote explosie
  explosieLargeSpriteX: 419,      // x-locatie van de sprite: grote explosie
  explosieSpriteY: 182,           // y-locatie van de sprite: kleine explosie

  spriteX: 0,                     // sprite vuurbal
  spriteY: 0,                     // sprite vuurbal
  spriteBreedte: 10,              // breedte van sprite in spritesheet
  spriteHoogte: 10,               // hoogte van sprite in spritesheet

  // animaties:
  animatieX: [],                  // animatie van een vuurbal
  animatieY: [],                  // animatie van een vuurbal
  animatieLengte: 0,              // lengte van de animatie van een vuurbal
  explosieAnimatie: [],           // animatie van een vuurbal die explodeert
}

// goomba gerelateerd:
const goomba = {
  x: [],                                 // x-positie van een goomba
  y: [],                                 // y-positie van een goomba
  breedte: 50,                           // breedte van elke goomba
  hoogte: 50,                            // hoogte van elke goomba
  snelheid: [],                           // snelheid van een goomba
  valt: [],                              // houdt bij of een goomba valt (true) of op iets staat (false)
  leeft: [],                             // houdt bij of een goomba leeft
  pad: [],                               // houdt bij of een goomba naar links of naar rechts gaat
  doodTijd: [],                          // houdt bij hoe lang een goomba dood is
  linkerpoot: 6,                         // x-locatie van de sprite: goomba met linkerpoot omhoog
  rechterpoot: 46,                       // x-locatie van de sprite: goomba met rechterpoot omhoog
  dood: 87,                              // x-locatie van de sprite: goomba dood geplet
  animatieLengte: 0,                     // lengte van de animatie van de goomba
  sprite: 0,                             // sprite van de goomba
  renAnimatie: []                        // array met sprites van de rennende goomba
}

// koopa gerelateerd:
const koopa = {
  x: [],                                 // x-positie van een koopa
  y: [],                                 // y-positie van een koopa
  breedte: 50,                           // breedte van elke koopa
  hoogte: 50,                            // hoogte van elke koopa
  snelheid: [],                          // snelheid van een koopa
  valt: [],                              // houdt bij of een koopa valt (true) of op iets staat (false)
  inSchild: [],                          // houdt bij of een koopa in zijn schild zit
  leeft: [],                             // houdt bij of een koopa leeft
  pad: [],                               // houdt bij of een koopa naar links of naar rechts gaat
  lopenLinksX: 179,                      // x-locatie van de sprite: koopa loopt naar links
  lopenRechtsX: 209,                     // x-locatie van de sprite: koopa loopt naar rechts
  rennenLinksX: 149,                     // x-locatie van de sprite: koopa rent naar links
  rennenRechtsX: 239,                    // x-locatie van de sprite: koopa rent naar rechts
  schelpZP: 359,                         // x-locatie van de sprite: koopa in schelp zonder pootjes
  schelpMP: 329,                         // x-locatie van de sprite: koopa in schelp met pootjes
  animatieLengte: 0,                     // lengte van de animatie van de koopa
  sprite: 0,                             // sprite van de koopa
  renAnimatieL: [],                      // array met sprites van de rennende koopa naar links
  renAnimatieR: [],                      // array met sprites van de rennende koopa naar rechts
  tollenAnimatie: []                     // array met sprites van de tollende koopa
}

// munt gerelateerd:
const munt = {
  x: [],                                 // x-positie van een munt
  y: [],                                 // y-positie van een munt
  breedte: 50,                           // breedte van een munt
  hoogte: 50,                            // hoogte van een munt
  sprite1: 0,                            // x-locatie van de sprite: munt voorkant
  sprite2: 191,                          // x-locatie van de sprite: munt beetje gedraaid
  sprite3: 385,                          // x-locatie van de sprite: munt schuin gedraaid
  sprite4: 585,                          // x-locatie van de sprite: munt 90 graden gedraaid
  sprite5: 795,                          // x-locatie van de sprite: munt vooraanzicht
  sprite6: 1000,                         // x-locatie van de sprite: munt vooraanzicht
  animatieLengte: 0,                     // lengte van de animatie van de munt
  sprite: 0,                             // sprite van de munt
  animatie: []                           // array met sprites van de munt
}

// buis gerelateerd:
const buis = {
  x: [],                                 // x-positie van een buis
  y: 570,                                // y-positie van elke buis
  breedte: 88,                           // breedte van elke buis
  hoogte: [],                            // hoogte van een buis
  ingangX: [],                           // x-positie van een buisingang
  ingangY: [],                           // y-positie van een buisingang
  ingangBreedte: 100,                    // breedte van elke buisingang
  ingangHoogte: 50                       // hoogte van elke buisingang
}

// platform gerelateerd:
const platform = {
  x: [],                                 // x-positie van een platform blok
  y: [],                                 // y-positie van een platform blok
  breedte: 50,                           // breedte van elk platform blok 
  hoogte: 50,                            // hoogte van elk platform blok
  stuiterTijd: [],                       // houdt bij hoe lang een platform blok stuitert                      
  standaardPositie: [],                  // standaard y-positie van een platform blok 
  stuitertPositie: []                    // y-positie van een stuiterend platform blok 
}

// hard blok gerelateerd:
const hardBlok = {
  x: [],                                 // x-positie van een hard blok
  y: [],                                 // y-positie van een hard blok
  breedte: 50,                           // breedte van elk hard blok
  hoogte: 50                             // hoogte van elk hard blok
}

// powerblok gerelateerd:
const powerBlok = {
  x: [],                                 // x-positie van een powerup blok
  y: [],                                 // y-positie van een powerup blok
  breedte: 50,                           // breedte van elk powerup blok 
  hoogte: 50,                            // hoogte van elk powerup blok
  stuiterTijd: [],                       // houdt bij hoe lang een powerup blok stuitert                      
  standaardPositie: [],                  // standaard y-positie van een powerup blok 
  stuitertPositie: [],                   // y-positie van een stuiterend powerup blok
  gebruikt: [],                          // duidt aan of een powerup blok al is aangeraakt vanaf de onderkant
  sprite1: 759,                          // x-locatie van de sprite: powerup blok
  sprite2: 792,                          // x-locatie van de sprite: powerup blok
  sprite3: 825,                          // x-locatie van de sprite: powerup blok
  animatieLengte: 0,                     // lengte van de animatie het een powerup blok
  sprite: 0,                             // sprite van van het powerup blok
  animatie: [],                          // array met sprites van het powerup blok
  inhoud: []                             // inhoud van powerup blok: powerup of munt
}

// powerup gerelateerd:
const powerup = {
  x: [],                                 // x-positie van een powerup
  y: [],                                 // y-positie van een powerup
  breedte: 50,                           // breedte van een powerup
  hoogte: 50,                            // hoogte van een powerup
  snelheid: 1,                           // snelheid van een powerup
  valt: [],                              // houdt bij of een powerup valt (true) of op iets staat (false)
  pad: [],                               // houdt bij of een powerup naar rechts (true) of naar links (false) gaat
  soort: [],                             // houdt bij welke powerup het is
  sprite1: 825,                          // x-locatie van de sprite: Fire Flower
  sprite2: 858,                          // x-locatie van de sprite: Fire Flower
  sprite3: 891,                          // x-locatie van de sprite: Fire Flower
  sprite4: 924,                          // x-locatie van de sprite: Fire Flower
  animatieLengte: 0,                     // lengte van de animatie het een Fire Flower
  sprite: 0,                             // sprite van van het Fire Flower
  animatie: []                           // array met sprites van het Fire Flower
}

// ondergrond gerelateerd:
const ondergrond = {
  x: [],                                 // x-positie van een ondergrond blok
  y: [670, 620, 570],                    // y-positie van elk ondergrond blok
  breedte: 50,                           // breedte van elk ondergrond blok
  hoogte: 50                             // hoogte van elk ondergrond blok
}

// lift gerelateerd:
const lift = {
  x: [],                                 // x-positie van een lift
  y: [],                                 // y-positie van een lift
  breedte: 200,                          // breedte van elke lift
  hoogte: 50,                            // hoogte van elke lift
  snelheid: 6,                           // snelheid van elke lift
  pad: [],                               // houdt bij of een lift naar boven of naar beneden gaat
  begin: [],                             // houdt bij of een lift aan het begin van zijn pad is
  eind: []                               // houdt bij of een lift aan het eind van zijn pad is
}

// bloem gerelateerd:
const bloem = {
  x: [],                                 // x-positie van een bloem
  y: [],                                 // y-positie van een bloem
  breedte: 68,                           // breedte van elke bloem
  hoogte: 96,                            // hoogte van elke bloem
  snelheid: 0.5,                         // snelheid van elke bloem
  pad: [],                               // houdt bij of een bloem naar boven of naar beneden gaat
  leeft: [],                             // houdt bij of een bloem leeft (true) of dood is (false)
  begin: [],                             // houdt bij of een bloem aan het begin van zijn pad is
  eind: [],                              // houdt bij of een bloem aan het eind van zijn pad is
  wachtTijd: [],                         // houdt bij hoelang een bloem in zijn onderste positie zit
  mondOpen: 287,                         // x-locatie van de sprite: bloem met mond open
  mondDicht: 247,                        // x-locatie van de sprite: bloem met mond dicht
  animatieLengte: 0,                     // lengte van de animatie van de bloem
  sprite: 0,                             // sprite van de bloem
  bijtAnimatie: []                       // array met sprites van de bijtende bloem
}

// zwaartekracht:
const zwaartekracht = 0.4;               // de zwaartekracht van alles

// tijd:
var tijd;                                // de tijd

// cheats:
var cheatsActief;

/* *********************************** */
/* functies die je gebruikt in je game */
/* *********************************** */

// console bericht:
console.log("Hoi, bedankt voor het spelen van ons spel! Ik zie dat je de console gebruikt.");
console.log("Er is eigenlijk geen manier om te voorkomen dat je wat probeert uit te vogelen, dus als je de veelvoorkomende cheats wilt aanzetten, voer dan hier 'cheats()' in. Als je de pagina refreshed staan de cheats weer uit. Veel plezier! :) ");

/**
 * Cheats activeren (voor docenten en andere mensen die de code bekijken)
 */
var cheats = function() {
  cheatsActief = true;                                      // cheats zijn actief
  speler.levens = Infinity;                                 // speler heeft oneindig veel levens
  speler.kanGeraaktWorden = false;                          // speler kan niet geraakt worden
  speler.snelheid = 10;                                     // speler rent 2x zo snel
  tijd = 3600;                                              // tijd is 3600 seconden (1 uur)
  levelVoltooid = [true, true, true, true, true, true, true, true, true, true, true]; // alle levels zijn beschikbaar
  return 'Cheats zijn actief!';                             // return een berichtje
}

/**
 * Updatet globale variabelen met posities van speler, vijanden, vuurballen, munten, powerups, liften, vloeren en buizen
 */
var beweegAlles = function() {

  // cheats:
  if (cheatsActief === true) {
    // speler kan niet in de void vallen
    if (speler.y >= ondergrond.y[0]) {
      speler.springt = true;
      speler.springSnelheid = speler.springHoogte*1.5;
    }
  }
  // geluid:
  speler.geluidKnopIngedruktVorige = speler.geluidKnopIngedruktNu;
  if (keyIsDown(71) || (mouseIsPressed && mouseX >= 610 && mouseX <= 675 && mouseY >= 640 && mouseY <= 705)) {
    speler.geluidKnopIngedruktNu = true;
  }
  else {
    speler.geluidKnopIngedruktNu = false;
  }
  if ((speler.geluidKnopIngedruktNu === true && speler.geluidKnopIngedruktVorige === false)) {
    geluidenDempen = !geluidenDempen;    // geluidenDempen wordt het tegenovergestelde van wat het was
    
    algemeenMuziekje.muted = geluidenDempen;           // algemeen muziekje wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is 
    breekBlok_geluid.muted = geluidenDempen;           // geluid van een blok dat breekt wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    botsing_geluid.muted = geluidenDempen;             // botsing geluid wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    muntjeOpgepakt_geluid.muted = geluidenDempen;      // geluid van een muntje dat wordt opgepakt wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    powerupOpgepakt_geluid.muted = geluidenDempen;     // geluid van een powerup die wordt opgepakt wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    vuurbal_geluid.muted = geluidenDempen;             // vuurbal geluid wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    finishStokGlijden_geluid.muted = geluidenDempen;   // finishStokGlijden geluid wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    gameover_geluid.muted = geluidenDempen;            // gameover geluid wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    springenKlein_geluid.muted = geluidenDempen;       // springenKlein geluid wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    springenGroot_geluid.muted = geluidenDempen;       // springenGroot geluid wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    spelerDood_geluid.muted = geluidenDempen;          // spelerDood geluid wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    vijandGedood_geluid.muted = geluidenDempen;        // vijandGedood geluid wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    spelGepauzeerd_geluid.muted = geluidenDempen;      // spelGepauzeerd geluid wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    spelerGeraakt_geluid.muted = geluidenDempen;       // spelerGeraakt geluid wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    powerupVerschijnt_geluid.muted = geluidenDempen;   // powerupVerschijnt geluid wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    levelVoltooid_geluid.muted = geluidenDempen;       // levelVoltooid geluid wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    tijdBijnaVoorbij_geluid.muted = geluidenDempen;    // tijdBijnaVoorbij geluid wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
    wereldVoltooid_geluid.muted = geluidenDempen;      // wereldVoltooid geluid wordt gedempt als geluidenDempen true is en hoorbaar als geluidenDempen false is
  }

  // als de finish paal nog niet is geraakt en de speler leeft
  if (finishPaalGeraakt === false && speler.leeft === true) { 
    speler.springKnopIngedruktVorige = speler.springKnopIngedruktNu; // onthoudt of de spring knop in het vorige frame is ingedrukt
    speler.schietKnopIngedruktVorige = speler.schietKnopIngedruktNu; // onthoudt of de schiet knop in het vorige frame is ingedrukt

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { // als het een mobiel apparaat is (gevonden op: https://stackoverflow.com/questions/3514784/how-to-detect-a-mobile-device-using-jquery#:~:text=if(%20/Android%7CwebOS%7CiPhone%7CiPad%7CiPod%7CBlackBerry%7CIEMobile%7COpera%20Mini/i.test(navigator.userAgent)%20)%20%7B%0A%20//%20some%20code..%0A%7D)
      if (touches.length > 0) {
        for (var t = 0; t < touches.length; t++) {
          if (touches[t].x >= 200 && touches[t].x <= 300 && touches[t].y >= 570 && touches[t].y <= 720) {
            speler.schietKnopIngedruktNu = true;
          }
          else {
            speler.schietKnopIngedruktNu = false;
          }

          if (touches[t].x >= 0 && touches[t].x <= 150 && touches[t].y >= 570 && touches[t].y <= 720) { // op mobiel wordt op de springknop gedrukt
            speler.springKnopIngedruktNu = true;
          }
          else {
            speler.springKnopIngedruktNu = false;
          }

          if (touches[t].x >= 940 && touches[t].x <= 1050 && touches[t].y >= 570 && touches[t].y <= 720) { // op mobiel wordt op de knop links gedrukt
            speler.knopLinksIngedrukt = true;
          }

          if (touches[t].x >= 1100 && touches[t].x <= 1280 && touches[t].y >= 570 && touches[t].y <= 720) { // op mobiel wordt op de knop rechts gedrukt
            speler.knopRechtsIngedrukt = true;
          }
        }
      }
      else {
        speler.schietKnopIngedruktNu = false;
        speler.springKnopIngedruktNu = false;
        speler.knopLinksIngedrukt = false;
        speler.knopRechtsIngedrukt = false;
      }
    }
    else {
      if (keyIsDown(UP_ARROW) || keyIsDown(32) || keyIsDown(87)) { // pijltje omhoog, spatiebalk, of 'w' wordt ingedrukt
        speler.springKnopIngedruktNu = true;
      }
      else {
        speler.springKnopIngedruktNu = false;
      }
      if (keyIsDown(16)) {
        speler.schietKnopIngedruktNu = true;
      }
      else {
        speler.schietKnopIngedruktNu = false;
      }
    }
    // vuurbal schieten:
    if (speler.schietKnopIngedruktNu === true && speler.schietKnopIngedruktVorige === false && speler.status === "Fire Mario") {
      vuurbal.x.push(speler.x + speler.breedte/2);             // voegt de x-positie van de speler toe aan de x-positie van de vuurbal
      vuurbal.y.push(speler.y + speler.hoogte/2);              // voegt de y-positie van de speler toe aan de y-positie van de vuurbal
      if (speler.kijkRichting === "rechts") {
        vuurbal.richting.push("rechts");
      }
      else {
        vuurbal.richting.push("links");
      }
      vuurbal.explodeert.push(false);                          // de vuurbal explodeert niet
      vuurbal.explosieTijd.push(0);                            // de vuurbal explodeert niet
      vuurbal.stuitert.push(true);                             // de vuurbal stuitert
      vuurbal.stuiterSnelheid.push(vuurbal.stuiterHoogte);     // de stuiterSnelheid van de vuurbal is gelijk aan de stuiterHoogte
      vuurbal_geluid.play();                                   // speelt het vuurbal geluid af
    }

    // speler springt:
    if (speler.springt === false && speler.springKnopIngedruktNu === true && speler.springKnopIngedruktVorige === false) { // speler springt als de spring knop in het vorige frame niet is ingedrukt en in het huidige frame wel
      if (speler.status === "Mario") {
        springenKlein_geluid.play();                   // speelt het spring geluid af (kleine speler)
      }
      else {
        springenGroot_geluid.play();                   // speelt het spring geluid af (groote speler)
      }
      speler.springt = true;                           // speler begint met springen
      speler.springSnelheid = speler.springHoogte;     // speler springt met de springHoogte
    }

    // speler beweegt naar links:    
    if (speler.x >= 0 &&                                                                         // speler kan niet voorbij de linkerborder bewegen
       (((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && !keyIsDown(RIGHT_ARROW) && !keyIsDown(68)) || speler.knopLinksIngedrukt === true)) { // pijltje naar links of 'a' wordt ingedrukt
      
      speler.x -= speler.snelheid;                     // speler beweegt naar links
      speler.kijkRichting = "links";                   // speler kijkt naar links
      speler.beweegt = "links";                        // speler beweegt naar links
    }
    // speler beweegt naar rechts:
    else if (speler.x <= 640 &&                                                                         // speler kan niet voorbij de helft van het scherm bewegen
            (((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && !keyIsDown(LEFT_ARROW) && !keyIsDown(65)) || speler.knopRechtsIngedrukt === true)) {  // pijltje naar rechts of 'd' wordt ingedrukt

      speler.x += speler.snelheid;                     // speler beweegt naar rechts
      speler.kijkRichting = "rechts";                  // speler kijkt naar rechts
      speler.beweegt = "rechts";                       // speler beweegt naar rechts
    }
    // alles beweegt naar links, behalve de speler, waardoor er een scroll effect wordt gecreëerd:
    else if (speler.x >= 640 &&                                                                         // speler is bij de helft van het scherm
            (((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && !keyIsDown(65) && !keyIsDown(LEFT_ARROW)) || speler.knopRechtsIngedrukt === true)) {  // pijltje naar rechts of 'd' wordt ingedrukt
      speler.beweegt = "rechts";                       // speler beweegt naar rechts
      for (var i = 0; i < goomba.x.length; i++) {
        if (goomba.x[i] + goomba.breedte <= 0) {
          goomba.x.splice(i, 1);
          goomba.y.splice(i, 1);
          goomba.snelheid.splice(i, 1);
          goomba.valt.splice(i, 1);
          goomba.leeft.splice(i, 1);
          goomba.pad.splice(i, 1);
          goomba.doodTijd.splice(i, 1);
        }
        goomba.x[i] -= speler.snelheid;
      }
      for (var i = 0; i < koopa.x.length; i++) {
        if (koopa.x[i] + koopa.breedte <= 0) {
          koopa.x.splice(i, 1);
          koopa.y.splice(i, 1);
          koopa.snelheid.splice(i, 1);
          koopa.valt.splice(i, 1);
          koopa.inSchild.splice(i, 1);
          koopa.leeft.splice(i, 1);
          koopa.pad.splice(i, 1);
        }
        koopa.x[i] -= speler.snelheid;
      }
      for (var i = 0; i < ondergrond.x.length; i++) {
        if (ondergrond.x[i] + ondergrond.breedte <= 0) {
          ondergrond.x.splice(i, 1);
        }
        ondergrond.x[i] -= speler.snelheid;
      }
      for (var i = 0; i < platform.x.length; i++) {
        if (platform.x[i] + platform.breedte <= 0) {
          platform.x.splice(i, 1);
          platform.y.splice(i, 1);
          platform.stuiterTijd.splice(i, 1);
          platform.standaardPositie.splice(i, 1);
          platform.stuitertPositie.splice(i, 1);
        }
        platform.x[i] -= speler.snelheid;
      }
      for (var i = 0; i < hardBlok.x.length; i++) {
        if (hardBlok.x[i] + hardBlok.breedte <= 0) {
          hardBlok.x.splice(i, 1);
          hardBlok.y.splice(i, 1);
        }
        hardBlok.x[i] -= speler.snelheid;
      }
      for (var i = 0; i < powerBlok.x.length; i++) {
        if (powerBlok.x[i] + powerBlok.breedte <= 0) {
          powerBlok.x.splice(i, 1);
          powerBlok.y.splice(i, 1);
          powerBlok.stuiterTijd.splice(i, 1);
          powerBlok.standaardPositie.splice(i, 1);
          powerBlok.stuitertPositie.splice(i, 1);
          powerBlok.gebruikt.splice(i, 1);
          powerBlok.inhoud.splice(i, 1);
        }
        powerBlok.x[i] -= speler.snelheid;
      }
      for (var i = 0; i < powerup.x.length; i++) {
        if (powerup.x[i] + powerup.breedte <= 0) {
          powerup.x.splice(i, 1);
          powerup.y.splice(i, 1);
          powerup.valt.splice(i, 1);
          powerup.pad.splice(i, 1);
          powerup.soort.splice(i, 1);
        }
        powerup.x[i] -= speler.snelheid;
      }
      for (var i = 0; i < vuurbal.x.length; i++) {
        if (vuurbal.x[i] + vuurbal.breedte <= 0) {
          vuurbal.x.splice(i, 1);
          vuurbal.y.splice(i, 1);
          vuurbal.richting.splice(i, 1);
          vuurbal.explodeert.splice(i, 1);
          vuurbal.explosieTijd.splice(i, 1);
          vuurbal.stuitert.splice(i, 1);
          vuurbal.stuiterSnelheid.splice(i, 1);
        }
        vuurbal.x[i] -= speler.snelheid;
      }
      for (var i = 0; i < munt.x.length; i++) {
        if (munt.x[i] + munt.breedte <= 0) {
          munt.x.splice(i, 1);
          munt.y.splice(i, 1);
        }
        munt.x[i] -= speler.snelheid;
      }
      for (var i = 0; i < buis.ingangX.length; i++) {
        if (buis.ingangX[i] + buis.ingangBreedte <= 0) {
          buis.x.splice(i, 1);
          buis.hoogte.splice(i, 1);
          buis.ingangX.splice(i, 1);
          buis.ingangY.splice(i, 1);
        }
        buis.ingangX[i] -= speler.snelheid;
        buis.x[i] -= speler.snelheid;
      }      
      for (var i = 0; i < wolkenX.length; i++) {
        wolkenX[i] -= speler.snelheid*0.1;  // zorgt voor een parallel scroll effect
      }
      for (var i = 0; i < lift.x.length; i++) {
        if (lift.x[i] + lift.breedte <= 0) {
          lift.x.splice(i, 1);
          lift.y.splice(i, 1);
          lift.pad.splice(i, 1);
          lift.begin.splice(i, 1);
          lift.eind.splice(i, 1);
        }
        lift.x[i] -= speler.snelheid;
      }
      for (var i = 0; i < bloem.x.length; i++) {
        if (bloem.x[i] + bloem.breedte <= 0) {
          bloem.x.splice(i, 1);
          bloem.y.splice(i, 1);
          bloem.pad.splice(i, 1);
          bloem.begin.splice(i, 1);
          bloem.eind.splice(i, 1);
        }
        bloem.x[i] -= speler.snelheid;
      }
      superMarioBrosLogoX -= speler.snelheid;
      finishTopX -= speler.snelheid;
      finishStokX -= speler.snelheid;
    }
    else {
      speler.beweegt = "niet";
    }  
    
    // tijd gaat langzaam naar beneden:
    tijd -= (1/50);
    if (Math.round(tijd) === 10) {
      tijdBijnaVoorbij_geluid.play();
    }
  }

  if (speler.springt === true) {
    speler.y -= speler.springSnelheid;
    speler.springSnelheid -= zwaartekracht;

    // speler valt als de springSnelheid negatief is:
    if (speler.springSnelheid < 0) {
      speler.valt = true;
    }
  }

  // goomba
  for (var i = 0; i < goomba.x.length; i++) {
    if (goomba.x[i] <= 1280) {                           // goomba is in beeld
      goomba.snelheid[i] = 2;                            // goomba beweegt
    }

    if (goomba.valt[i] === true) {
      goomba.y[i] += goomba.snelheid[i]*6;
    }

    if (goomba.pad[i] === true) {
      goomba.x[i] += goomba.snelheid[i]; // goomba beweegt naar rechts
    }
    else {
      goomba.x[i] -= goomba.snelheid[i]; // goomba beweegt naar links
    }
  }   

  // koopa
  for (var i = 0; i < koopa.x.length; i++) {
    if (koopa.x[i] <= 1280) {                           // koopa is in beeld
      if (koopa.inSchild[i] === false) {
        koopa.snelheid[i] = 2;                          // koopa beweegt
      }
    }

    if (koopa.valt[i] === true) {
      if (koopa.inSchild[i] === false) {
        koopa.y[i] += koopa.snelheid[i]*6;
      }
      else {
        koopa.y[i] += koopa.snelheid[i];
      }
    }

    if (koopa.pad[i] === true) {
      koopa.x[i] += koopa.snelheid[i]; // koopa beweegt naar rechts
    }
    else {
      koopa.x[i] -= koopa.snelheid[i]; // koopa beweegt naar links
    }
  }

  // powerup
  for (var i = 0; i < powerup.x.length; i++) {
    if (powerup.valt[i] === true) {
      powerup.y[i] += powerup.snelheid*6;
    }

    if (powerup.soort[i] === "Mushroom") {
      if (powerup.pad[i] === true) {
        powerup.x[i] += powerup.snelheid; // powerup beweegt naar rechts
      }
      else {
        powerup.x[i] -= powerup.snelheid; // powerup beweegt naar links
      }
    }
  }

  // lift
  for (var i = 0; i < lift.y.length; i++) {
    if (lift.y[i] > lift.eind[i] ||  // als lift voorbij het einde van zijn pad gaat
      lift.y[i] < lift.begin[i]) {   // als lift voorbij het begin van zijn pad gaat
      lift.pad[i] = !lift.pad[i];    // lift verandert van richting
    }
    if (lift.pad[i] === true) {     
      lift.y[i] += lift.snelheid;    // lift beweegt naar beneden
    }
    else {
      lift.y[i] -= lift.snelheid;    // lift beweegt naar boven
    }
  }

  // bloem
  for (var i = 0; i < bloem.y.length; i++) {
    if (bloem.y[i] <= bloem.begin[i]) {
      bloem.pad[i] = true;
    }
    if (bloem.y[i] >= bloem.eind[i]) {
      bloem.pad[i] = false;
    }
        
    if (bloem.pad[i] === true) {     
      bloem.y[i] += bloem.snelheid;      // bloem beweegt naar beneden
      bloem.wachtTijd[i] = tijd;         // bloem wachttijd is huidige tijd
    }
    else if (bloem.wachtTijd[i] - tijd >= 2) {
      bloem.y[i] -= bloem.snelheid;      // bloem beweegt naar boven
    }
  }

  // vuurbal:
  for (var i = 0; i < vuurbal.x.length; i++) {
    if (vuurbal.explodeert[i] === false) {
      if (vuurbal.richting[i] === "rechts") {
        vuurbal.x[i] += vuurbal.snelheid; // vuurbal beweegt naar rechts
      }
      else {
        vuurbal.x[i] -= vuurbal.snelheid; // vuurbal beweegt naar links
      }

      if (vuurbal.stuitert[i] === true) {
        vuurbal.y[i] -= vuurbal.stuiterSnelheid[i];
        vuurbal.stuiterSnelheid[i] -= zwaartekracht;
      }
    }
  }

  // score
  score = punten + Math.round(tijd)*2;
};

/**
 * Checkt botsingen
 * Verwijdert opgepakte dingen en gedoodde vijanden
 * Updatet globale variabelen punten en levens
 */
var verwerkBotsing = function() {
  // goomba collision:
  for (var g = 0; g < goomba.x.length; g++) { 
    // botsing speler tegen goomba   
    if (speler.x - goomba.x[g] > -speler.breedte && goomba.x[g] - speler.x > -goomba.breedte && speler.y - goomba.y[g] > -speler.hoogte && goomba.y[g] - speler.y > -goomba.hoogte) {
      // als speler bovenop goomba springt, dan gaat goomba dood:
      if (speler.valt === true && speler.leeft === true) {
        goomba.leeft[g] = false;                       // goomba gaat dood
        speler.opGoomba = true;                        // speler staat op goomba
        speler.springt = true;                         // speler hopt omhoog
        speler.springSnelheid = speler.springHoogte-9; // speler hopt omhoog
        goomba.doodTijd[g] = tijd; 
      }
      // als speler tegen goomba aanloopt, dan gaat er een leven af:
      else {
        while (speler.kanGeraaktWorden === true) {
          if (speler.status !== "Mario") {
            spelerGeraakt_geluid.play();               // geluid van speler die geraakt is wordt afgespeeld
            speler.status = "Mario";
            speler.wasGroot = false;
            speler.y += 24;                            // omdat speler kleiner wordt, moet spelerY omlaag worden gezet met het hoogteverschil tussen Mario en Super Mario 
            speler.valt = false;
            speler.isGeraakt = true;                   // speler is geraakt
            speler.knipperTijd = tijd;
          }
          else {
            speler.levens -= 1;                        // speler verliest een leven
            speler.springSnelheid = speler.springHoogte;
          }
          speler.kanGeraaktWorden = false;             // speler kan niet meer geraakt worden
        }
      }  
    }
    
    // botsing goomba met andere goomba
    if (goomba.x[g] - goomba.x[g-1] > -goomba.breedte && goomba.x[g-1] - goomba.x[g] > -goomba.breedte && goomba.y[g-1] - goomba.y[g] > -goomba.hoogte && goomba.y[g] - goomba.y[g-1] > -goomba.hoogte) { 
      goomba.pad[g] = !goomba.pad[g];     // goomba 1 verandert van richting
      goomba.pad[g-1] = !goomba.pad[g-1]; // goomba 2 verandert van richting
    }

    // botsing goomba met koopa
    for (var k = 0; k < koopa.x.length; k++) {
      if (goomba.x[g] <= 1280 &&                                                                                                                                                              // als goomba in beeld is
          goomba.x[g] - koopa.x[k] > -goomba.breedte && koopa.x[k] - goomba.x[g] > -koopa.breedte && goomba.y[g] - koopa.y[k] > -goomba.hoogte && koopa.y[k] - goomba.y[g] > -koopa.hoogte) { // als goomba en koopa botsen
        if (koopa.inSchild[k] === true) {
          goomba.leeft[g] = false;            // goomba wordt gedood
          goomba.doodTijd[g] = tijd;          // doodtijd wordt opgeslagen
        }
        else { 
          goomba.pad[g] = !goomba.pad[g];     // goomba verandert van richting
          koopa.pad[k] = !koopa.pad[k];       // koopa verandert van richting
        }
      }
    }

    // als goomba dood is, dan verdwijnt goomba na 0.2 seconden:
    if (goomba.leeft[g] === false) {
      vijandGedood_geluid.play();                      // geluid van goomba die dood gaat wordt afgespeeld
      if (goomba.doodTijd[g] - tijd >= 0.2) {          // als goomba al 0.2 seconden dood is
        goomba.x.splice(g, 1);                         // goomba verdwijnt
        goomba.y.splice(g, 1);                         // goomba verdwijnt
        goomba.snelheid.splice(g, 1);                  // goomba verdwijnt
        goomba.valt.splice(g, 1);                      // goomba verdwijnt
        goomba.pad.splice(g, 1);                       // goomba verdwijnt
        goomba.leeft.splice(g, 1);                     // goomba verdwijnt
        goomba.doodTijd.splice(g, 1);                  // goomba verdwijnt
        speler.opGoomba = false;                       // speler staat niet meer op goomba
        punten += 100;                                 // speler krijgt 100 punten
      }
    }

    // als goomba in de void valt, dan verdwijnt goomba:
    if (goomba.y[g] > ondergrond.y[0] + ondergrond.hoogte) {
      goomba.x.splice(g, 1);                                // goomba verdwijnt
      goomba.y.splice(g, 1);                                // goomba verdwijnt
      goomba.snelheid.splice(g, 1);                         // goomba verdwijnt
      goomba.valt.splice(g, 1);                             // goomba verdwijnt
      goomba.pad.splice(g, 1);                              // goomba verdwijnt
      goomba.leeft.splice(g, 1);                            // goomba verdwijnt
      goomba.doodTijd.splice(g, 1);                         // goomba verdwijnt
    }

    // goomba op vloer detectie:
    let goombaOpVloer = false;
    for (var i = 0; i < ondergrond.x.length; i++) {
      for (var j = 0; j < ondergrond.y.length; j++) {
        if ((goomba.y[g] + goomba.hoogte >= platform.y[i] && goomba.y[g] + goomba.hoogte <= platform.y[i] + platform.hoogte/2 && goomba.x[g] + goomba.breedte >= platform.x[i] && goomba.x[g] <= platform.x[i] + platform.breedte ) ||                    // goomba op platform 
            (goomba.y[g] + goomba.hoogte >= hardBlok.y[i] && goomba.y[g] + goomba.hoogte <= hardBlok.y[i] + hardBlok.hoogte/2 && goomba.x[g] + goomba.breedte >= hardBlok.x[i] && goomba.x[g] <= hardBlok.x[i] + hardBlok.breedte ) ||                    // goomba op hardBlok   
            (goomba.y[g] + goomba.hoogte >= ondergrond.y[j] && goomba.y[g] + goomba.hoogte <= ondergrond.y[j] + ondergrond.hoogte/2 && goomba.x[g] + goomba.breedte >= ondergrond.x[i] && goomba.x[g] <= ondergrond.x[i] + ondergrond.breedte) ||         // goomba op ondergrond  
            (goomba.y[g] + goomba.hoogte >= buis.ingangY[i] - buis.ingangHoogte && goomba.y[g] + goomba.hoogte <= buis.ingangY[i] - buis.ingangHoogte/2 && goomba.x[g] + goomba.breedte >= buis.x[i] && goomba.x[g] <= buis.x[i] + buis.breedte) ||       // goomba op buis
            (goomba.y[g] + goomba.hoogte >= powerBlok.y[i] && goomba.y[g] + goomba.hoogte <= powerBlok.y[i] + powerBlok.hoogte/2 && goomba.x[g] + goomba.breedte >= powerBlok.x[i] && goomba.x[g] <= powerBlok.x[i] + powerBlok.breedte)) {               // goomba op powerblok  
      
          goombaOpVloer = true;                            // goomba staat op vloer
          if (goomba.y[g] + goomba.hoogte >= platform.y[i] && goomba.y[g] + goomba.hoogte <= platform.y[i] + platform.hoogte/2 && goomba.x[g] + goomba.breedte >= platform.x[i] && goomba.x[g] <= platform.x[i] + platform.breedte ) { // als goomba op platform staat
            goomba.y[g] = platform.y[i] - goomba.hoogte;   // goomba wordt op platform gezet
          }
          if (goomba.y[g] + goomba.hoogte >= hardBlok.y[i] && goomba.y[g] + goomba.hoogte <= hardBlok.y[i] + hardBlok.hoogte/2 && goomba.x[g] + goomba.breedte >= hardBlok.x[i] && goomba.x[g] <= hardBlok.x[i] + hardBlok.breedte ) { // als goomba op hardBlok staat
            goomba.y[g] = hardBlok.y[i] - goomba.hoogte;   // goomba wordt op hardBlok gezet
          }
          if (goomba.y[g] + goomba.hoogte >= ondergrond.y[2] && goomba.y[g] + goomba.hoogte <= ondergrond.y[2] + ondergrond.hoogte/2 && goomba.x[g] + goomba.breedte >= ondergrond.x[i] && goomba.x[g] <= ondergrond.x[i] + ondergrond.breedte) { // als goomba op ondergrond staat
            goomba.y[g] = ondergrond.y[2] - goomba.hoogte; // goomba wordt op ondergrond gezet
          }
          if (goomba.y[g] + goomba.hoogte >= buis.ingangY[i] - buis.ingangHoogte && goomba.y[g] + goomba.hoogte <= buis.ingangY[i] - buis.ingangHoogte/2 && goomba.x[g] + goomba.breedte >= buis.x[i] && goomba.x[g] <= buis.x[i] + buis.breedte) { // als goomba op buis staat
            goomba.y[g] = buis.ingangY[i] - buis.ingangHoogte - goomba.hoogte; // goomba wordt op buis gezet
          }
          if (goomba.y[g] + goomba.hoogte >= powerBlok.y[i] && goomba.y[g] + goomba.hoogte <= powerBlok.y[i] + powerBlok.hoogte/2 && goomba.x[g] + goomba.breedte >= powerBlok.x[i] && goomba.x[g] <= powerBlok.x[i] + powerBlok.breedte) { // als goomba op powerblok staat
            goomba.y[g] = powerBlok.y[i] - goomba.hoogte; // goomba wordt op powerblok gezet
          }
        }
        else if ((goomba.x[g] + goomba.breedte >= platform.x[i] && goomba.x[g] + goomba.breedte <= platform.x[i] + platform.breedte/2 && goomba.y[g] + goomba.hoogte >= platform.y[i] && goomba.y[g] <= platform.y[i] + platform.hoogte) ||               // botsing goomba met linkerkant platform  
                (goomba.x[g] + goomba.breedte >= hardBlok.x[i] && goomba.x[g] + goomba.breedte <= hardBlok.x[i] + hardBlok.breedte/2 && goomba.y[g] + goomba.hoogte >= hardBlok.y[i] && goomba.y[g] <= hardBlok.y[i] + hardBlok.hoogte) ||                // botsing goomba met linkerkant hardBlok  
                (goomba.x[g] + goomba.breedte >= ondergrond.x[i] && goomba.x[g] + goomba.breedte <= ondergrond.x[i] + ondergrond.breedte/2 && goomba.y[g] + goomba.hoogte >= ondergrond.y[j] && goomba.y[g] <= ondergrond.y[j] + ondergrond.hoogte) ||    // botsing goomba met linkerkant ondergrond
                (goomba.x[g] + goomba.breedte >= buis.x[i] && goomba.x[g] + goomba.breedte <= buis.x[i] + buis.breedte/4 && goomba.y[g] <= buis.ingangY[i] + buis.hoogte[i] && goomba.y[g] + goomba.hoogte >= buis.ingangY[i] - buis.ingangHoogte/2) ||   // botsing goomba met linkerkant buis
                (goomba.x[g] + goomba.breedte >= powerBlok.x[i] && goomba.x[g] + goomba.breedte <= powerBlok.x[i] + powerBlok.breedte/2 && goomba.y[g] + goomba.hoogte >= powerBlok.y[i] && goomba.y[g] <= powerBlok.y[i] + powerBlok.hoogte)) {          // botsing goomba met linkerkant powerblok

          goomba.pad[g] = false; // goomba gaat andere kant op (links)
        }
        else if ((goomba.x[g] <= platform.x[i] + platform.breedte && goomba.x[g] >= platform.x[i] + platform.breedte/2 && goomba.y[g] + goomba.hoogte >= platform.y[i] && goomba.y[g] <= platform.y[i] + platform.hoogte) ||                              // botsing goomba met rechterkant platform  
                (goomba.x[g] <= hardBlok.x[i] + hardBlok.breedte && goomba.x[g] >= hardBlok.x[i] + hardBlok.breedte/2 && goomba.y[g] + goomba.hoogte >= hardBlok.y[i] && goomba.y[g] <= hardBlok.y[i] + hardBlok.hoogte) ||                               // botsing goomba met rechterkant hardBlok  
                (goomba.x[g] <= ondergrond.x[i] + ondergrond.breedte && goomba.x[g] >= ondergrond.x[i] + ondergrond.breedte/2 && goomba.y[g] + goomba.hoogte >= ondergrond.y[j] && goomba.y[g] <= ondergrond.y[j] + ondergrond.hoogte) ||                 // botsing goomba met rechterkant ondergrond
                (goomba.x[g] <= buis.x[i] + buis.breedte && goomba.x[g] >= buis.x[i] + buis.breedte/4 && goomba.y[g] <= buis.ingangY[i] + buis.hoogte[i] && goomba.y[g] + goomba.hoogte >= buis.ingangY[i] - buis.ingangHoogte/2) ||                      // botsing goomba met rechterkant buis
                (goomba.x[g] <= powerBlok.x[i] + powerBlok.breedte && goomba.x[g] >= powerBlok.x[i] + powerBlok.breedte/2 && goomba.y[g] + goomba.hoogte >= powerBlok.y[i] && goomba.y[g] <= powerBlok.y[i] + powerBlok.hoogte)) {                        // botsing goomba met rechterkant powerblok

          goomba.pad[g] = true; // goomba gaat andere kant op (rechts)
        }
      }
    }
    if (goombaOpVloer === false) {
      goomba.valt[g] = true;                             // goomba valt
    }
    else {
      goomba.valt[g] = false;                            // goomba valt niet
    }
  }

  // koopa collision:
  for (var k = 0; k < koopa.x.length; k++) {
    // botsing speler tegen koopa
    if (speler.x - koopa.x[k] > -speler.breedte && koopa.x[k] - speler.x > -koopa.breedte && speler.y - koopa.y[k] > -speler.hoogte && koopa.y[k] - speler.y > -koopa.hoogte) {
      // als speler bovenop koopa springt, dan gaat koopa dood:
      if (speler.valt === true && speler.leeft === true) {
        vijandGedood_geluid.play();                    // geluid van koopa die geraakt wordt wordt afgespeeld
        speler.springt = true;                         // speler hopt omhoog
        speler.springSnelheid = speler.springHoogte/1.7; // speler hopt omhoog
        if (koopa.inSchild[k] === false) {
          koopa.inSchild[k] = true;                    // koopa gaat in schild
          koopa.snelheid[k] = 0;                       // koopa staat stil
        }
        else if (koopa.snelheid[k] === 0) {
          if (speler.kijkRichting === "rechts") {
            koopa.pad[k] = true;                       // koopa gaat naar rechts
          }
          else {
            koopa.pad[k] = false;                      // koopa gaat naar links
          }
          koopa.snelheid[k] = 12;                      // koopa gaat tollen
        }
        else if (koopa.snelheid[k] === 12) {
          koopa.snelheid[k] = 0;
        }
      }
      // als speler tegen koopa aanloopt, dan gaat er een leven af:
      else {
        while (speler.kanGeraaktWorden === true) {
          if (speler.status !== "Mario") {
            spelerGeraakt_geluid.play();               // geluid van speler die geraakt is wordt afgespeeld
            speler.status = "Mario";
            speler.wasGroot = false;
            speler.y += 24;                            // omdat speler kleiner wordt, moet spelerY omlaag worden gezet met het hoogteverschil tussen Mario en Super Mario
            speler.valt = false;
            speler.isGeraakt = true;                   // speler is geraakt
            speler.knipperTijd = tijd;
          }
          else {
            speler.levens -= 1;                        // speler verliest een leven
            speler.springSnelheid = speler.springHoogte;
          }
          speler.kanGeraaktWorden = false;             // speler kan niet meer geraakt worden
        }
      }
    }

    // botsing koopa met andere koopa:
    if (koopa.x[k] - koopa.x[k-1] > -koopa.breedte && koopa.x[k-1] - koopa.x[k] > -koopa.breedte && koopa.y[k] - koopa.y[k-1] > -koopa.hoogte && koopa.y[k-1] - koopa.y[k] > -koopa.hoogte) { 
      koopa.pad[k] = !koopa.pad[k];     // koopa 1 verandert van richting
      koopa.pad[k-1] = !koopa.pad[k-1]; // koopa 2 verandert van richting
    }

    // als koopa dood is, verdwijnt hij:
    if (koopa.leeft[k] === false) {
      vijandGedood_geluid.play();                      // geluid van koopa die dood gaat wordt afgespeeld
      koopa.x.splice(k, 1);                            // koopa verdwijnt
      koopa.y.splice(k, 1);                            // koopa verdwijnt
      koopa.valt.splice(k, 1);                         // koopa verdwijnt
      koopa.pad.splice(k, 1);                          // koopa verdwijnt
      koopa.leeft.splice(k, 1);                        // koopa verdwijnt
      punten += 100;                                   // speler krijgt 100 punten
    }

    if (koopa.y[k] > ondergrond.y[0] + ondergrond.hoogte) {   // als koopa in de void valt
      koopa.x.splice(k, 1);                            // koopa verdwijnt
      koopa.y.splice(k, 1);                            // koopa verdwijnt
      koopa.valt.splice(k, 1);                         // koopa verdwijnt
      koopa.snelheid.splice(k, 1);                     // koopa verdwijnt
      koopa.pad.splice(k, 1);                          // koopa verdwijnt
      koopa.leeft.splice(k, 1);                        // koopa verdwijnt
      koopa.inSchild.splice(k, 1);                     // koopa verdwijnt
    }

    // koopa op vloer detectie:
    let koopaOpVloer = false;
    for (var i = 0; i < ondergrond.x.length; i++) {
      for (var j = 0; j < ondergrond.y.length; j++) {
        if ((koopa.y[k] + koopa.hoogte >= platform.y[i] && koopa.y[k] + koopa.hoogte <= platform.y[i] + platform.hoogte/2 && koopa.x[k] + koopa.breedte >= platform.x[i] && koopa.x[k] <= platform.x[i] + platform.breedte ) ||                    // koopa op platform 
            (koopa.y[k] + koopa.hoogte >= hardBlok.y[i] && koopa.y[k] + koopa.hoogte <= hardBlok.y[i] + hardBlok.hoogte/2 && koopa.x[k] + koopa.breedte >= hardBlok.x[i] && koopa.x[k] <= hardBlok.x[i] + hardBlok.breedte ) ||                    // koopa op hardBlok   
            (koopa.y[k] + koopa.hoogte >= ondergrond.y[j] && koopa.y[k] + koopa.hoogte <= ondergrond.y[j] + ondergrond.hoogte/2 && koopa.x[k] + koopa.breedte >= ondergrond.x[i] && koopa.x[k] <= ondergrond.x[i] + ondergrond.breedte) ||         // koopa op ondergrond  
            (koopa.y[k] + koopa.hoogte >= buis.ingangY[i] - buis.ingangHoogte && koopa.y[k] + koopa.hoogte <= buis.ingangY[i] - buis.ingangHoogte/2 && koopa.x[k] + koopa.breedte >= buis.x[i] && koopa.x[k] <= buis.x[i] + buis.breedte) ||       // koopa op buis
            (koopa.y[k] + koopa.hoogte >= powerBlok.y[i] && koopa.y[k] + koopa.hoogte <= powerBlok.y[i] + powerBlok.hoogte/2 && koopa.x[k] + koopa.breedte >= powerBlok.x[i] && koopa.x[k] <= powerBlok.x[i] + powerBlok.breedte)) {               // koopa op powerblok  
      
          koopaOpVloer = true;                            // koopa staat op vloer
          if (koopa.y[k] + koopa.hoogte >= platform.y[i] && koopa.y[k] + koopa.hoogte <= platform.y[i] + platform.hoogte/2 && koopa.x[k] + koopa.breedte >= platform.x[i] && koopa.x[k] <= platform.x[i] + platform.breedte ) { // als koopa op platform staat
            koopa.y[k] = platform.y[i] - koopa.hoogte;   // koopa wordt op platform gezet
          }
          if (koopa.y[k] + koopa.hoogte >= hardBlok.y[i] && koopa.y[k] + koopa.hoogte <= hardBlok.y[i] + hardBlok.hoogte/2 && koopa.x[k] + koopa.breedte >= hardBlok.x[i] && koopa.x[k] <= hardBlok.x[i] + hardBlok.breedte ) { // als koopa op hardBlok staat
            koopa.y[k] = hardBlok.y[i] - koopa.hoogte;   // koopa wordt op hardBlok gezet
          }
          if (koopa.y[k] + koopa.hoogte >= ondergrond.y[2] && koopa.y[k] + koopa.hoogte <= ondergrond.y[2] + ondergrond.hoogte/2 && koopa.x[k] + koopa.breedte >= ondergrond.x[i] && koopa.x[k] <= ondergrond.x[i] + ondergrond.breedte) { // als koopa op ondergrond staat
            koopa.y[k] = ondergrond.y[2] - koopa.hoogte; // koopa wordt op ondergrond gezet
          }
          if (koopa.y[k] + koopa.hoogte >= buis.ingangY[i] - buis.ingangHoogte && koopa.y[k] + koopa.hoogte <= buis.ingangY[i] - buis.ingangHoogte/2 && koopa.x[k] + koopa.breedte >= buis.x[i] && koopa.x[k] <= buis.x[i] + buis.breedte) { // als koopa op buis staat
            koopa.y[k] = buis.ingangY[i] - buis.ingangHoogte - koopa.hoogte; // koopa wordt op buis gezet
          }
          if (koopa.y[k] + koopa.hoogte >= powerBlok.y[i] && koopa.y[k] + koopa.hoogte <= powerBlok.y[i] + powerBlok.hoogte/2 && koopa.x[k] + koopa.breedte >= powerBlok.x[i] && koopa.x[k] <= powerBlok.x[i] + powerBlok.breedte) { // als koopa op powerblok staat
            koopa.y[k] = powerBlok.y[i] - koopa.hoogte; // koopa wordt op powerblok gezet
          }
        }
        else if ((koopa.x[k] + koopa.breedte >= platform.x[i] && koopa.x[k] + koopa.breedte <= platform.x[i] + platform.breedte/2 && koopa.y[k] + koopa.hoogte >= platform.y[i] && koopa.y[k] <= platform.y[i] + platform.hoogte) ||               // botsing koopa met linkerkant platform  
                (koopa.x[k] + koopa.breedte >= hardBlok.x[i] && koopa.x[k] + koopa.breedte <= hardBlok.x[i] + hardBlok.breedte/2 && koopa.y[k] + koopa.hoogte >= hardBlok.y[i] && koopa.y[k] <= hardBlok.y[i] + hardBlok.hoogte) ||                // botsing koopa met linkerkant hardBlok  
                (koopa.x[k] + koopa.breedte >= ondergrond.x[i] && koopa.x[k] + koopa.breedte <= ondergrond.x[i] + ondergrond.breedte/2 && koopa.y[k] + koopa.hoogte >= ondergrond.y[j] && koopa.y[k] <= ondergrond.y[j] + ondergrond.hoogte) ||    // botsing koopa met linkerkant ondergrond
                (koopa.x[k] + koopa.breedte >= buis.x[i] && koopa.x[k] + koopa.breedte <= buis.x[i] + buis.breedte/4 && koopa.y[k] <= buis.ingangY[i] + buis.hoogte[i] && koopa.y[k] + koopa.hoogte >= buis.ingangY[i] - buis.ingangHoogte/2) ||   // botsing koopa met linkerkant buis
                (koopa.x[k] + koopa.breedte >= powerBlok.x[i] && koopa.x[k] + koopa.breedte <= powerBlok.x[i] + powerBlok.breedte/2 && koopa.y[k] + koopa.hoogte >= powerBlok.y[i] && koopa.y[k] <= powerBlok.y[i] + powerBlok.hoogte)) {          // botsing koopa met linkerkant powerblok

          koopa.pad[k] = false; // koopa gaat andere kant op (links)
        }
        else if ((koopa.x[k] <= platform.x[i] + platform.breedte && koopa.x[k] >= platform.x[i] + platform.breedte/2 && koopa.y[k] + koopa.hoogte >= platform.y[i] && koopa.y[k] <= platform.y[i] + platform.hoogte) ||                            // botsing koopa met rechterkant platform  
                (koopa.x[k] <= hardBlok.x[i] + hardBlok.breedte && koopa.x[k] >= hardBlok.x[i] + hardBlok.breedte/2 && koopa.y[k] + koopa.hoogte >= hardBlok.y[i] && koopa.y[k] <= hardBlok.y[i] + hardBlok.hoogte) ||                             // botsing koopa met rechterkant hardBlok  
                (koopa.x[k] <= ondergrond.x[i] + ondergrond.breedte && koopa.x[k] >= ondergrond.x[i] + ondergrond.breedte/2 && koopa.y[k] + koopa.hoogte >= ondergrond.y[j] && koopa.y[k] <= ondergrond.y[j] + ondergrond.hoogte) ||               // botsing koopa met rechterkant ondergrond
                (koopa.x[k] <= buis.x[i] + buis.breedte && koopa.x[k] >= buis.x[i] + buis.breedte/4 && koopa.y[k] <= buis.ingangY[i] + buis.hoogte[i] && koopa.y[k] + koopa.hoogte >= buis.ingangY[i] - buis.ingangHoogte/2) ||                    // botsing koopa met rechterkant buis
                (koopa.x[k] <= powerBlok.x[i] + powerBlok.breedte && koopa.x[k] >= powerBlok.x[i] + powerBlok.breedte/2 && koopa.y[k] + koopa.hoogte >= powerBlok.y[i] && koopa.y[k] <= powerBlok.y[i] + powerBlok.hoogte)) {                      // botsing koopa met rechterkant powerblok

          koopa.pad[k] = true; // koopa gaat andere kant op (rechts)
        }
      }
    }

    if (koopaOpVloer === false) {
      koopa.valt[k] = true;                             // koopa valt
    }
    else {
      koopa.valt[k] = false;                            // koopa valt niet
    }
  }
  
  // powerup collision:
  for (var p = 0; p < powerup.x.length; p++) {
    // botsing powerup met speler
    if (speler.x - powerup.x[p] > -speler.breedte && powerup.x[p] - speler.x > -powerup.breedte && speler.y - powerup.y[p] > -speler.hoogte && powerup.y[p] - speler.y > -powerup.hoogte) {
      powerupOpgepakt_geluid.play();                   // geluid van powerup die opgepakt wordt, wordt afgespeeld
      punten += 100;                                   // speler krijgt 100 punten
      if (speler.status === "Mario") {
        speler.status = "Super Mario";
        speler.y -= 24;                                // omdat speler groter wordt, moet spelerY omhoog worden gezet met het hoogteverschil tussen Mario en Super Mario 
      }
      else if (speler.status === "Super Mario") {
        speler.status = "Fire Mario";
      }
      powerup.x.splice(p, 1);                          // powerup verdwijnt
      powerup.y.splice(p, 1);                          // powerup verdwijnt         
      powerup.valt.splice(p, 1);                       // powerup verdwijnt
      powerup.pad.splice(p, 1);                        // powerup verdwijnt
      powerup.soort.splice(p, 1);                      // powerup verdwijnt
    }

    // als powerup in de void valt
    if (powerup.y[p] > ondergrond.y[0] + ondergrond.hoogte) {    
      powerup.x.splice(p, 1);                          // powerup verdwijnt
      powerup.y.splice(p, 1);                          // powerup verdwijnt
      powerup.valt.splice(p, 1);                       // powerup verdwijnt
      powerup.pad.splice(p, 1);                        // powerup verdwijnt
      powerup.soort.splice(p, 1);                      // powerup verdwijnt
    }

    // powerup op vloer detectie:
    let powerupOpVloer = false;
    for (var i = 0; i < ondergrond.x.length; i++) {
      for (var j = 0; j < ondergrond.y.length; j++) {
        if ((powerup.y[p] + powerup.hoogte >= platform.y[i] && powerup.y[p] + powerup.hoogte <= platform.y[i] + platform.hoogte/2 && powerup.x[p] + powerup.breedte >= platform.x[i] && powerup.x[p] <= platform.x[i] + platform.breedte ) ||                    // powerup op platform 
            (powerup.y[p] + powerup.hoogte >= hardBlok.y[i] && powerup.y[p] + powerup.hoogte <= hardBlok.y[i] + hardBlok.hoogte/2 && powerup.x[p] + powerup.breedte >= hardBlok.x[i] && powerup.x[p] <= hardBlok.x[i] + hardBlok.breedte ) ||                    // powerup op hardBlok   
            (powerup.y[p] + powerup.hoogte >= ondergrond.y[j] && powerup.y[p] + powerup.hoogte <= ondergrond.y[j] + ondergrond.hoogte/2 && powerup.x[p] + powerup.breedte >= ondergrond.x[i] && powerup.x[p] <= ondergrond.x[i] + ondergrond.breedte) ||         // powerup op ondergrond  
            (powerup.y[p] + powerup.hoogte >= buis.ingangY[i] - buis.ingangHoogte && powerup.y[p] + powerup.hoogte <= buis.ingangY[i] - buis.ingangHoogte/2 && powerup.x[p] + powerup.breedte >= buis.x[i] && powerup.x[p] <= buis.x[i] + buis.breedte) ||       // powerup op buis
            (powerup.y[p] + powerup.hoogte >= powerBlok.y[i] && powerup.y[p] + powerup.hoogte <= powerBlok.y[i] + powerBlok.hoogte/2 && powerup.x[p] + powerup.breedte >= powerBlok.x[i] && powerup.x[p] <= powerBlok.x[i] + powerBlok.breedte)) {               // powerup op powerblok  
      
          powerupOpVloer = true;                            // powerup staat op vloer
          if (powerup.y[p] + powerup.hoogte >= platform.y[i] && powerup.y[p] + powerup.hoogte <= platform.y[i] + platform.hoogte/2 && powerup.x[p] + powerup.breedte >= platform.x[i] && powerup.x[p] <= platform.x[i] + platform.breedte ) { // als powerup op platform staat
            powerup.y[p] = platform.y[i] - powerup.hoogte;   // powerup wordt op platform gezet
          }
          if (powerup.y[p] + powerup.hoogte >= hardBlok.y[i] && powerup.y[p] + powerup.hoogte <= hardBlok.y[i] + hardBlok.hoogte/2 && powerup.x[p] + powerup.breedte >= hardBlok.x[i] && powerup.x[p] <= hardBlok.x[i] + hardBlok.breedte ) { // als powerup op hardBlok staat
            powerup.y[p] = hardBlok.y[i] - powerup.hoogte;   // powerup wordt op hardBlok gezet
          }
          if (powerup.y[p] + powerup.hoogte >= ondergrond.y[2] && powerup.y[p] + powerup.hoogte <= ondergrond.y[2] + ondergrond.hoogte/2 && powerup.x[p] + powerup.breedte >= ondergrond.x[i] && powerup.x[p] <= ondergrond.x[i] + ondergrond.breedte) { // als powerup op ondergrond staat
            powerup.y[p] = ondergrond.y[2] - powerup.hoogte; // powerup wordt op ondergrond gezet
          }
          if (powerup.y[p] + powerup.hoogte >= buis.ingangY[i] - buis.ingangHoogte && powerup.y[p] + powerup.hoogte <= buis.ingangY[i] - buis.ingangHoogte/2 && powerup.x[p] + powerup.breedte >= buis.x[i] && powerup.x[p] <= buis.x[i] + buis.breedte) { // als powerup op buis staat
            powerup.y[p] = buis.ingangY[i] - buis.ingangHoogte - powerup.hoogte; // powerup wordt op buis gezet
          }
          if (powerup.y[p] + powerup.hoogte >= powerBlok.y[i] && powerup.y[p] + powerup.hoogte <= powerBlok.y[i] + powerBlok.hoogte/2 && powerup.x[p] + powerup.breedte >= powerBlok.x[i] && powerup.x[p] <= powerBlok.x[i] + powerBlok.breedte) { // als powerup op powerblok staat
            powerup.y[p] = powerBlok.y[i] - powerup.hoogte; // powerup wordt op powerblok gezet
          }
        }
        else if ((powerup.x[p] + powerup.breedte >= platform.x[i] && powerup.x[p] + powerup.breedte <= platform.x[i] + platform.breedte/2 && powerup.y[p] + powerup.hoogte >= platform.y[i] && powerup.y[p] <= platform.y[i] + platform.hoogte) ||               // botsing powerup met linkerkant platform  
                (powerup.x[p] + powerup.breedte >= hardBlok.x[i] && powerup.x[p] + powerup.breedte <= hardBlok.x[i] + hardBlok.breedte/2 && powerup.y[p] + powerup.hoogte >= hardBlok.y[i] && powerup.y[p] <= hardBlok.y[i] + hardBlok.hoogte) ||                // botsing powerup met linkerkant hardBlok  
                (powerup.x[p] + powerup.breedte >= ondergrond.x[i] && powerup.x[p] + powerup.breedte <= ondergrond.x[i] + ondergrond.breedte/2 && powerup.y[p] + powerup.hoogte >= ondergrond.y[j] && powerup.y[p] <= ondergrond.y[j] + ondergrond.hoogte) ||    // botsing powerup met linkerkant ondergrond
                (powerup.x[p] + powerup.breedte >= buis.x[i] && powerup.x[p] + powerup.breedte <= buis.x[i] + buis.breedte/4 && powerup.y[p] <= buis.ingangY[i] + buis.hoogte[i] && powerup.y[p] + powerup.hoogte >= buis.ingangY[i] - buis.ingangHoogte/2) ||   // botsing powerup met linkerkant buis
                (powerup.x[p] + powerup.breedte >= powerBlok.x[i] && powerup.x[p] + powerup.breedte <= powerBlok.x[i] + powerBlok.breedte/2 && powerup.y[p] + powerup.hoogte >= powerBlok.y[i] && powerup.y[p] <= powerBlok.y[i] + powerBlok.hoogte)) {          // botsing powerup met linkerkant powerblok

          powerup.pad[p] = false; // powerup gaat andere kant op (links)
        }
        else if ((powerup.x[p] <= platform.x[i] + platform.breedte && powerup.x[p] >= platform.x[i] + platform.breedte/2 && powerup.y[p] + powerup.hoogte >= platform.y[i] && powerup.y[p] <= platform.y[i] + platform.hoogte) ||                              // botsing powerup met rechterkant platform  
                (powerup.x[p] <= hardBlok.x[i] + hardBlok.breedte && powerup.x[p] >= hardBlok.x[i] + hardBlok.breedte/2 && powerup.y[p] + powerup.hoogte >= hardBlok.y[i] && powerup.y[p] <= hardBlok.y[i] + hardBlok.hoogte) ||                               // botsing powerup met rechterkant hardBlok  
                (powerup.x[p] <= ondergrond.x[i] + ondergrond.breedte && powerup.x[p] >= ondergrond.x[i] + ondergrond.breedte/2 && powerup.y[p] + powerup.hoogte >= ondergrond.y[j] && powerup.y[p] <= ondergrond.y[j] + ondergrond.hoogte) ||                 // botsing powerup met rechterkant ondergrond
                (powerup.x[p] <= buis.x[i] + buis.breedte && powerup.x[p] >= buis.x[i] + buis.breedte/4 && powerup.y[p] <= buis.ingangY[i] + buis.hoogte[i] && powerup.y[p] + powerup.hoogte >= buis.ingangY[i] - buis.ingangHoogte/2) ||                      // botsing powerup met rechterkant buis
                (powerup.x[p] <= powerBlok.x[i] + powerBlok.breedte && powerup.x[p] >= powerBlok.x[i] + powerBlok.breedte/2 && powerup.y[p] + powerup.hoogte >= powerBlok.y[i] && powerup.y[p] <= powerBlok.y[i] + powerBlok.hoogte)) {                        // botsing powerup met rechterkant powerblok

          powerup.pad[p] = true; // powerup gaat andere kant op (rechts)
        }
      }
    }

    if (powerupOpVloer === false) {
      powerup.valt[p] = true;                             // powerup valt
    }
    else {
      powerup.valt[p] = false;                            // powerup valt niet
    }
  }

  // vuurbal collision:
  for (var v = 0; v < vuurbal.x.length; v++) {
    let vuurbalOpVloer = false;
    if (vuurbal.explodeert[v] === false) {
      for (var i = 0; i < ondergrond.x.length; i++) {
        for (var j = 0; j < ondergrond.y.length; j++) {
          if ((vuurbal.y[v] + vuurbal.hoogte >= platform.y[i] && vuurbal.y[v] + vuurbal.hoogte <= platform.y[i] + platform.hoogte/2 && vuurbal.x[v] + vuurbal.breedte >= platform.x[i] && vuurbal.x[v] <= platform.x[i] + platform.breedte ) ||                // vuurbal op platform 
              (vuurbal.y[v] + vuurbal.hoogte >= hardBlok.y[i] && vuurbal.y[v] + vuurbal.hoogte <= hardBlok.y[i] + hardBlok.hoogte/2 && vuurbal.x[v] + vuurbal.breedte >= hardBlok.x[i] && vuurbal.x[v] <= hardBlok.x[i] + hardBlok.breedte ) ||                // vuurbal op hardBlok   
              (vuurbal.y[v] + vuurbal.hoogte >= ondergrond.y[2] && vuurbal.y[v] + vuurbal.hoogte <= ondergrond.y[2] + ondergrond.hoogte/2 && vuurbal.x[v] + vuurbal.breedte >= ondergrond.x[i] && vuurbal.x[v] <= ondergrond.x[i] + ondergrond.breedte) ||     // vuurbal op ondergrond  
              (vuurbal.y[v] + vuurbal.hoogte >= buis.ingangY[i] - buis.ingangHoogte && vuurbal.y[v] + vuurbal.hoogte <= buis.ingangY[i] - buis.ingangHoogte/2 && vuurbal.x[v] + vuurbal.breedte >= buis.x[i] && vuurbal.x[v] <= buis.x[i] + buis.breedte) ||   // vuurbal op buis
              (vuurbal.y[v] + vuurbal.hoogte >= powerBlok.y[i] && vuurbal.y[v] + vuurbal.hoogte <= powerBlok.y[i] + powerBlok.hoogte/2 && vuurbal.x[v] + vuurbal.breedte >= powerBlok.x[i] && vuurbal.x[v] <= powerBlok.x[i] + powerBlok.breedte)) {           // vuurbal op powerblok  
            vuurbalOpVloer = true;
          }
          else if ((vuurbal.x[v] + vuurbal.breedte >= platform.x[i] && vuurbal.x[v] + vuurbal.breedte <= platform.x[i] + platform.breedte/2 && vuurbal.y[v] + vuurbal.hoogte >= platform.y[i] && vuurbal.y[v] <= platform.y[i] + platform.hoogte) ||                // botsing vuurbal met linkerkant platform  
                  (vuurbal.x[v] + vuurbal.breedte >= hardBlok.x[i] && vuurbal.x[v] + vuurbal.breedte <= hardBlok.x[i] + hardBlok.breedte/2 && vuurbal.y[v] + vuurbal.hoogte >= hardBlok.y[i] && vuurbal.y[v] <= hardBlok.y[i] + hardBlok.hoogte) ||                // botsing vuurbal met linkerkant hardBlok  
                  (vuurbal.x[v] + vuurbal.breedte >= ondergrond.x[i] && vuurbal.x[v] + vuurbal.breedte <= ondergrond.x[i] + ondergrond.breedte/2 && vuurbal.y[v] + vuurbal.hoogte >= ondergrond.y[j] && vuurbal.y[v] <= ondergrond.y[j] + ondergrond.hoogte) ||          // botsing vuurbal met linkerkant ondergrond
                  (vuurbal.x[v] + vuurbal.breedte >= buis.x[i] && vuurbal.x[v] + vuurbal.breedte <= buis.x[i] + buis.breedte/4 && vuurbal.y[v] <= buis.ingangY[i] + buis.hoogte[i] && vuurbal.y[v] + vuurbal.hoogte >= buis.ingangY[i] - buis.ingangHoogte/2) ||   // botsing vuurbal met linkerkant buis
                  (vuurbal.x[v] + vuurbal.breedte >= powerBlok.x[i] && vuurbal.x[v] + vuurbal.breedte <= powerBlok.x[i] + powerBlok.breedte/2 && vuurbal.y[v] + vuurbal.hoogte >= powerBlok.y[i] && vuurbal.y[v] <= powerBlok.y[i] + powerBlok.hoogte)) {          // botsing vuurbal met linkerkant powerblok

            vuurbal.explodeert[v] = true;     // vuurbal explodeert
            vuurbal.explosieTijd[v] = tijd;   // explosie begint
          }
          else if ((vuurbal.x[v] <= platform.x[i] + platform.breedte && vuurbal.x[v] >= platform.x[i] + platform.breedte/2 && vuurbal.y[v] + vuurbal.hoogte >= platform.y[i] && vuurbal.y[v] <= platform.y[i] + platform.hoogte) ||              // botsing vuurbal met rechterkant platform  
                  (vuurbal.x[v] <= hardBlok.x[i] + hardBlok.breedte && vuurbal.x[v] >= hardBlok.x[i] + hardBlok.breedte/2 && vuurbal.y[v] + vuurbal.hoogte >= hardBlok.y[i] && vuurbal.y[v] <= hardBlok.y[i] + hardBlok.hoogte) ||              // botsing vuurbal met rechterkant hardBlok  
                  (vuurbal.x[v] <= ondergrond.x[i] + ondergrond.breedte && vuurbal.x[v] >= ondergrond.x[i] + ondergrond.breedte/2 && vuurbal.y[v] + vuurbal.hoogte >= ondergrond.y[j] && vuurbal.y[v] <= ondergrond.y[j] + ondergrond.hoogte) ||      // botsing vuurbal met rechterkant ondergrond
                  (vuurbal.x[v] <= buis.x[i] + buis.breedte && vuurbal.x[v] >= buis.x[i] + buis.breedte/4 && vuurbal.y[v] <= buis.ingangY[i] + buis.hoogte[i] && vuurbal.y[v] + vuurbal.hoogte >= buis.ingangY[i] - buis.ingangHoogte/2) ||     // botsing vuurbal met rechterkant buis
                  (vuurbal.x[v] <= powerBlok.x[i] + powerBlok.breedte && vuurbal.x[v] >= powerBlok.x[i] + powerBlok.breedte/2 && vuurbal.y[v] + vuurbal.hoogte >= powerBlok.y[i] && vuurbal.y[v] <= powerBlok.y[i] + powerBlok.hoogte)) {       // botsing vuurbal met rechterkant powerblok

            vuurbal.explodeert[v] = true;     // vuurbal explodeert
            vuurbal.explosieTijd[v] = tijd;   // explosie begint
          }
        }   
      }
    }

    // vuurbal raakt vloer
    if (vuurbalOpVloer === true) {
      vuurbal.stuiterSnelheid[v] = vuurbal.stuiterHoogte;
    }

    // vuurbal explodeert
    if (vuurbal.x[v] >= 1280 || vuurbal.explosieTijd[v] - tijd >= 0.5) {
      vuurbal.x.splice(v, 1);                        // vuurbal verdwijnt
      vuurbal.y.splice(v, 1);                        // vuurbal verdwijnt
      vuurbal.richting.splice(v, 1);                 // vuurbal verdwijnt
      vuurbal.explodeert.splice(v, 1);               // vuurbal verdwijnt
      vuurbal.stuitert.splice(v, 1);                 // vuurbal verdwijnt
      vuurbal.stuiterSnelheid.splice(v, 1);          // vuurbal verdwijnt
      vuurbal.explosieTijd.splice(v, 1);             // vuurbal verdwijnt
    }

    // botsing vuurbal met goomba
    for (var g = 0; g < goomba.x.length; g++) {
      if (vuurbal.explodeert[v] === false && goomba.leeft[g] === true && vuurbal.x[v] - goomba.x[g] > -vuurbal.breedte && goomba.x[g] - vuurbal.x[v] > -goomba.breedte && vuurbal.y[v] - goomba.y[g] > -vuurbal.hoogte && goomba.y[g] - vuurbal.y[v] > -goomba.hoogte) {
        vuurbal.explodeert[v] = true;                  // vuurbal explodeert
        vuurbal.explosieTijd[v] = tijd;                // explosieTijd wordt opgeslagen
        goomba.leeft[g] = false;                       // goomba gaat dood
        goomba.doodTijd[g] = tijd; 
      }
    }

    // botsing vuurbal met koopa
    for (var k = 0; k < koopa.x.length; k++) {
      if (vuurbal.explodeert[v] === false && vuurbal.x[v] - koopa.x[k] > -vuurbal.breedte && koopa.x[k] - vuurbal.x[v] > -koopa.breedte && vuurbal.y[v] - koopa.y[k] > -vuurbal.hoogte && koopa.y[k] - vuurbal.y[v] > -koopa.hoogte) {
        vuurbal.explodeert[v] = true;                  // vuurbal explodeert
        vuurbal.explosieTijd[v] = tijd;                // explosieTijd wordt opgeslagen
        koopa.leeft[k] = false;                        // koopa gaat dood
      }
    }

    // botsing vuurbal met bloem
    for (var b = 0; b < bloem.x.length; b++) {
      if (vuurbal.explodeert[v] === false && vuurbal.x[v] - bloem.x[b] > -vuurbal.breedte && bloem.x[b] - vuurbal.x[v] > -bloem.breedte && vuurbal.y[v] - bloem.y[b] > -vuurbal.hoogte && bloem.y[b] - vuurbal.y[v] > -bloem.hoogte) {
        vuurbal.explodeert[v] = true;                  // vuurbal explodeert
        vuurbal.explosieTijd[v] = tijd;                // explosieTijd wordt opgeslagen
        bloem.leeft[b] = false;                        // bloem gaat dood
      }
    }    
  }

  // bloem collision:
  for (var i = 0; i < bloem.x.length; i++) {    
    if (speler.x - bloem.x[i] > -speler.breedte && bloem.x[i] - speler.x > -bloem.breedte && speler.y - bloem.y[i] > -speler.hoogte && bloem.y[i] - speler.y > -bloem.hoogte) {
      // als speler tegen bloem aanloopt, dan gaat er een leven af:
      while (speler.kanGeraaktWorden === true) {
        if (speler.status !== "Mario") {
          speler.status = "Mario";
          speler.wasGroot = false;
          speler.y += 24;                              // omdat speler kleiner wordt, moet spelerY omlaag worden gezet met het hoogteverschil tussen Mario en Super Mario 
          speler.isGeraakt = true;                     // speler is geraakt
          speler.knipperTijd = tijd;
        }
        else {
          speler.levens -= 1;                          // speler verliest een leven
          speler.springSnelheid = speler.springHoogte;
        }
        speler.kanGeraaktWorden = false;               // speler kan niet meer geraakt worden
      }  
    }

    // als bloem dood is, verdwijnt hij:
    if (bloem.leeft[i] === false) {
      vijandGedood_geluid.play();                      // geluid van vijand die dood gaat wordt afgespeeld
      bloem.x.splice(i, 1);                            // bloem verdwijnt
      bloem.y.splice(i, 1);                            // bloem verdwijnt
      bloem.pad.splice(i, 1);                          // bloem verdwijnt
      bloem.begin.splice(i, 1);                        // bloem verdwijnt
      bloem.eind.splice(i, 1);                         // bloem verdwijnt
      bloem.leeft.splice(i, 1);                        // bloem verdwijnt
      punten += 100;                                   // speler krijgt 100 punten
    }
  }

  // botsing munt met speler:
  for (var i = 0; i < munt.x.length; i++) {
    if (speler.x - munt.x[i] > -speler.breedte && munt.x[i] - speler.x > -munt.breedte && speler.y - munt.y[i] > -speler.hoogte && munt.y[i] - speler.y > -munt.hoogte) {
      munt.x.splice(i, 1);                             // munt verdwijnt
      munt.y.splice(i, 1);                             // munt verdwijnt
      punten += 50;                                    // speler krijgt 50 punten
      muntjeOpgepakt_geluid.play();                    // geluid van muntje dat opgepakt wordt, wordt afgespeeld
    }
  }

  // als speler is geraakt door een vijand:
  if (speler.isGeraakt === true && speler.leeft === true) {
    if (speler.knipperTijd - tijd <= 4) {              // als speler minder dan 4 seconden geleden geraakt is
      speler.knippert = true;                          // speler knippert
    }
    else if (speler.knipperTijd - tijd >= 5) {         // als speler al 5 seconden geraakt is
      speler.kanGeraaktWorden = true;                  // speler kan weer geraakt worden
      speler.isGeraakt = false;                        // speler is niet meer geraakt
      speler.knipperTijd = 0;                          // knipperTijd wordt gereset
      speler.knippert = false;                         // speler knippert niet meer
    }

  }

  // als speler geen levens meer heeft:
  if (speler.levens <= 0 ) {
    speler.leeft = false;                              // speler is dood
  }

  // als speler dood is:
  if (speler.leeft === false) {
    algemeenMuziekje.pause();                          // algemeen muziekje stopt
    spelerDood_geluid.play();                          // geluid van speler die dood gaat wordt afgespeeld
    if (speler.springt === false) {
      speler.springSnelheid = speler.springHoogte/1.5; // speler hopt omhoog
    }
    speler.springt = true;                             // speler hopt omhoog
  }

  // Mario
  if (speler.status === "Mario") {
    speler.hoogte = 66;                             // hoogte Mario
    speler.breedte = 48;                            // breedte Mario
    speler.spriteY = 6;                             // y-locatie van alle Mario sprites
    speler.spriteBreedte = 17;                      // breedte van Mario sprites
    speler.spriteHoogte = 17;                       // hoogte van Mario sprites
  }
  // Super Mario en Fire Mario
  else if (speler.status === "Super Mario" || speler.status === "Fire Mario") {
    speler.hoogte = 90;                             // hoogte Super Mario & Fire Mario
    speler.breedte = 51;                            // breedte Super Mario & Fire Mario
    speler.spriteBreedte = 18;                      // breedte van Super Mario & Fire Mario sprites
    speler.spriteHoogte = 30;                       // hoogte van Super Mario & Fire Mario sprites
    if (speler.status === "Super Mario") {
      speler.spriteY = 80;                          // y-locatie van alle Super Mario sprites
    }
    else {
      speler.spriteY = 160;                         // y-locatie van alle Fire Mario sprites
    }
  }

  // botsing speler met finishpaal: hoe hoger op de paal, hoe meer punten je krijgt
  if (speler.x - finishTopX > -speler.breedte && finishTopX - speler.x > -finishTopBreedte) {
    algemeenMuziekje.pause();                          // algemeen muziekje stopt
    finishStokGlijden_geluid.play();                   // geluid van speler die glijdt van finishstok wordt afgespeeld
    spelerOpFinishPaal = true;                         // speler hangt aan finishpaal
    while (finishPaalGeraakt === false) {
      if (speler.y <= finishTopY + finishTopHoogte) {
        punten += 400;                                 // speler krijgt 400 punten
        finishPaalGeraakt = true;                      // finishpaal is geraakt
      }
      if (speler.y >= finishStokY && speler.y <= finishStokY + finishStokHoogte/3) {
        punten += 200;                                 // speler krijgt 200 punten
        finishPaalGeraakt = true;                      // finishpaal is geraakt
      }
      if (speler.y >= finishStokY + finishStokHoogte/3 && speler.y <= finishStokY + ((finishStokHoogte/3)*2)) {
        punten += 100;                                 // speler krijgt 100 punten
        finishPaalGeraakt = true;                      // finishpaal is geraakt
      }
      if (speler.y >= finishStokY + ((finishStokHoogte/3)*2) && speler.y <= finishStokY + finishStokHoogte) {
        punten += 50;                                  // speler krijgt 50 punten
        finishPaalGeraakt = true;                      // finishpaal is geraakt
      }
    }
    speler.springSnelheid = -speler.springHoogte/4;    // speler glijdt langs finishpaal naar beneden
    if (speler.y + speler.hoogte >= 520) {
      speler.springt = false;                          // speler springt niet
    }
  }
  else {
    spelerOpFinishPaal = false;                        // speler hangt niet aan finishpaal
  }

  // als speler onderaan de finishpaal is:
  if (finishPaalGeraakt === true && speler.springt === false) {
    finishStokGlijden_geluid.pause();                  // geluid van speler die glijdt van finishstok stopt
    algemeenMuziekje.pause();                          // algemeen muziekje stopt
    speler.x += speler.snelheid-1;                     // speler loopt naar rechts
    speler.beweegt = "rechts";                         // speler beweegt naar rechts
    levelVoltooid_geluid.play();                       // geluid van level dat voltooid is wordt afgespeeld
    if (speler.x >= finishTopX + 500) {                // als speler aan het einde van het level is
      spelStatus = WIN;                                // speler heeft gewonnen
    }
  }

  // speler op vloer detectie:
  let spelerOpVloer = false;
  if (speler.leeft === true) {
    for (var i = 0; i < ondergrond.x.length; i++) {
      for (var j = 0; j < ondergrond.y.length; j++) {

        if ((speler.y + speler.hoogte >= platform.y[i] && speler.y + speler.hoogte <= platform.y[i] + platform.hoogte / 4 && speler.x + speler.breedte >= platform.x[i]+6 && speler.x <= platform.x[i] + platform.breedte-6) ||                      // speler op platform  
            (speler.y + speler.hoogte >= hardBlok.y[i] && speler.y + speler.hoogte <= hardBlok.y[i] + hardBlok.hoogte / 4 && speler.x + speler.breedte >= hardBlok.x[i]+6 && speler.x <= hardBlok.x[i] + hardBlok.breedte-6) ||                      // speler op hardBlok  
            (speler.y + speler.hoogte >= ondergrond.y[j] && speler.y + speler.hoogte <= ondergrond.y[j] + ondergrond.hoogte / 4 && speler.x + speler.breedte >= ondergrond.x[i]+6 && speler.x <= ondergrond.x[i] + ondergrond.breedte-6) ||          // speler op ondergrond  
            (speler.y + speler.hoogte >= buis.ingangY[i] - buis.ingangHoogte && speler.y + speler.hoogte <= buis.ingangY[i] - buis.ingangHoogte*0.75 && speler.x + speler.breedte > buis.x[i] + 10 && speler.x < buis.x[i] + buis.breedte - 10) ||   // speler op buis
            (speler.y + speler.hoogte >= powerBlok.y[i] && speler.y + speler.hoogte <= powerBlok.y[i] + powerBlok.hoogte / 4 && speler.x + speler.breedte >= powerBlok.x[i]+6 && speler.x <= powerBlok.x[i] + powerBlok.breedte-6)) {                // speler op powerblok  
          spelerOpVloer = true;                            // speler staat op vloer
          if (speler.y + speler.hoogte >= platform.y[i] && speler.y + speler.hoogte <= platform.y[i] + platform.hoogte / 4 && speler.x + speler.breedte >= platform.x[i]+6 && speler.x <= platform.x[i] + platform.breedte-6) {
            speler.y = platform.y[i] - speler.hoogte;      // speler wordt op platform gezet
          }
          else if (speler.y + speler.hoogte >= hardBlok.y[i] && speler.y + speler.hoogte <= hardBlok.y[i] + hardBlok.hoogte / 4 && speler.x + speler.breedte >= hardBlok.x[i]+6 && speler.x <= hardBlok.x[i] + hardBlok.breedte-6) {
            speler.y = hardBlok.y[i] - speler.hoogte;      // speler wordt op hardBlok gezet
          }
          else if (speler.y + speler.hoogte >= ondergrond.y[j] && speler.y + speler.hoogte <= ondergrond.y[j] + ondergrond.hoogte / 4 && speler.x + speler.breedte >= ondergrond.x[i]+6 && speler.x <= ondergrond.x[i] + ondergrond.breedte-6) {
            speler.y = ondergrond.y[2] - speler.hoogte;       // speler wordt op ondergrond gezet
          }
          else if (speler.y + speler.hoogte >= buis.ingangY[i] - buis.ingangHoogte && speler.y + speler.hoogte <= buis.ingangY[i] - buis.ingangHoogte*0.75 && speler.x + speler.breedte > buis.x[i] + 10 && speler.x < buis.x[i] + buis.breedte - 10) {
            speler.y = buis.ingangY[i] - buis.ingangHoogte - speler.hoogte;   // speler wordt op buis gezet
          }
          else if (speler.y + speler.hoogte >= powerBlok.y[i] && speler.y + speler.hoogte <= powerBlok.y[i] + powerBlok.hoogte / 4 && speler.x + speler.breedte >= powerBlok.x[i]+6 && speler.x <= powerBlok.x[i] + powerBlok.breedte-6) {
            speler.y = powerBlok.y[i] - speler.hoogte;     // speler wordt op powerblok gezet
          }
        }    
        else if ((speler.y <= platform.y[i] + platform.hoogte && speler.y >= platform.y[i] + platform.hoogte/1.5 && speler.x + speler.breedte/2 > platform.x[i] && speler.x + speler.breedte/2 <= platform.x[i] + platform.breedte) ||          // botsing speler met onderkant platform
                (speler.y <= powerBlok.y[i] + powerBlok.hoogte && speler.y >= powerBlok.y[i] + powerBlok.hoogte/1.5 && speler.x + speler.breedte/2 > powerBlok.x[i] && speler.x + speler.breedte/2 <= powerBlok.x[i] + powerBlok.breedte)) {      // botsing speler met onderkant powerblok  
                              
          if (speler.x + speler.breedte/2 > platform.x[i] && speler.x + speler.breedte/2 <= platform.x[i] + platform.breedte) {
            for (var g = 0; g < goomba.x.length; g++) {   
              if (goomba.y[g] + goomba.hoogte >= platform.y[i] - platform.hoogte/3 && goomba.y[g] + goomba.hoogte <= platform.y[i] && goomba.x[g] + goomba.breedte/1.5 > platform.x[i] && goomba.x[g] + goomba.breedte/3 <= platform.x[i] + platform.breedte){      // als goomba op het blok staat dat wordt geraakt
                goomba.doodTijd[g] = tijd;
                goomba.leeft[g] = false;                     // goomba gaat dood
              }
            }
            for (var k = 0; k < koopa.x.length; k++) {
              if (koopa.y[k] + koopa.hoogte >= platform.y[i] - platform.hoogte/3 && koopa.y[k] + koopa.hoogte <= platform.y[i] && koopa.x[k] + koopa.breedte/1.5 > platform.x[i] && koopa.x[k] + koopa.breedte/3 <= platform.x[i] + platform.breedte){         // als koopa op het blok staat dat wordt geraakt
                koopa.leeft[k] = false;                      // koopa gaat dood
              }
            }
            speler.springSnelheid = -speler.springHoogte/2; // speler gaat naar beneden, omdat hij de onderkant van het platform raakt
            platform.stuiterTijd[i] = tijd;       
            platform.y[i] = platform.stuitertPositie[i];    // platform stuitert
          }
          else if (speler.x + speler.breedte/2 > powerBlok.x[i] && speler.x + speler.breedte/2 <= powerBlok.x[i] + powerBlok.breedte) {
            if (powerBlok.gebruikt[i] === false) {
              for (var g = 0; g < goomba.x.length; g++) {  
                if (goomba.y[g] + goomba.hoogte >= powerBlok.y[i] - powerBlok.hoogte/3 && goomba.y[g] + goomba.hoogte <= powerBlok.y[i] && goomba.x[g] + goomba.breedte/1.5 > powerBlok.x[i] && goomba.x[g] + goomba.breedte/3 <= powerBlok.x[i] + powerBlok.breedte) {  // als goomba op het blok staat dat wordt geraakt
                  goomba.doodTijd[g] = tijd;
                  goomba.leeft[g] = false;                     // goomba gaat dood
                }
              }
              for (var k = 0; k < koopa.x.length; k++) {
                if (koopa.y[k] + koopa.hoogte >= powerBlok.y[i] - powerBlok.hoogte/3 && koopa.y[k] + koopa.hoogte <= powerBlok.y[i] && koopa.x[k] + koopa.breedte/1.5 > powerBlok.x[i] && koopa.x[k] + koopa.breedte/3 <= powerBlok.x[i] + powerBlok.breedte) {     // als koopa op het blok staat dat wordt geraakt
                  koopa.leeft[k] = false;                      // koopa gaat dood
                }
              }
              powerBlok.stuiterTijd[i] = tijd;
              speler.springSnelheid = -speler.springHoogte/2;        
              powerBlok.y[i] = powerBlok.stuitertPositie[i];   // powerblok stuitert
              powerupVerschijnt_geluid.play();
              powerBlok.gebruikt[i] = true;
            }
            else {
              speler.springSnelheid = -speler.springHoogte/2;
            }
          }
        }
        else if ((speler.x + speler.breedte > platform.x[i] && speler.x + speler.breedte < platform.x[i] + platform.breedte/2 && speler.y + speler.hoogte > platform.y[i] && speler.y <= platform.y[i] + platform.hoogte) ||                // botsing speler met linkerkant platform  
                 (speler.x + speler.breedte > hardBlok.x[i] && speler.x + speler.breedte < hardBlok.x[i] + hardBlok.breedte/2 && speler.y + speler.hoogte > hardBlok.y[i] && speler.y <= hardBlok.y[i] + hardBlok.hoogte) ||                // botsing speler met linkerkant hardBlok  
                 (speler.x + speler.breedte > ondergrond.x[i] && speler.x + speler.breedte < ondergrond.x[i] + ondergrond.breedte/2 && speler.y + speler.hoogte > ondergrond.y[j] && speler.y <= ondergrond.y[j] + ondergrond.hoogte) ||          // botsing speler met linkerkant ondergrond
                 (speler.x + speler.breedte > buis.ingangX[i] && speler.x + speler.breedte < buis.ingangX[i] + buis.ingangBreedte/4 && speler.y <= buis.ingangY[i] + buis.hoogte[i] && speler.y + speler.hoogte > buis.ingangY[i] - buis.ingangHoogte*0.75) ||   // botsing speler met linkerkant buis
                 (speler.x + speler.breedte > powerBlok.x[i] && speler.x + speler.breedte < powerBlok.x[i] + powerBlok.breedte/2 && speler.y + speler.hoogte > powerBlok.y[i] && speler.y <= powerBlok.y[i] + powerBlok.hoogte)) {          // botsing speler met linkerkant powerblok
      
          speler.x -= speler.snelheid;                       // speler gaat uit het platform
        }
        else if ((speler.x < platform.x[i] + platform.breedte && speler.x > platform.x[i] + platform.breedte/2 && speler.y + speler.hoogte > platform.y[i] && speler.y <= platform.y[i] + platform.hoogte) ||              // botsing speler met rechterkant platform  
                 (speler.x < hardBlok.x[i] + hardBlok.breedte && speler.x > hardBlok.x[i] + hardBlok.breedte/2 && speler.y + speler.hoogte > hardBlok.y[i] && speler.y <= hardBlok.y[i] + hardBlok.hoogte) ||              // botsing speler met rechterkant hardBlok  
                 (speler.x < ondergrond.x[i] + ondergrond.breedte && speler.x > ondergrond.x[i] + ondergrond.breedte/2 && speler.y + speler.hoogte > ondergrond.y[j] && speler.y <= ondergrond.y[j] + ondergrond.hoogte) ||      // botsing speler met rechterkant ondergrond
                 (speler.x < buis.ingangX[i] + buis.ingangBreedte && speler.x > buis.ingangX[i] + buis.ingangBreedte*0.75 && speler.y <= buis.ingangY[i] + buis.hoogte[i] && speler.y + speler.hoogte > buis.ingangY[i] - buis.ingangHoogte*0.75) ||     // botsing speler met rechterkant buis
                 (speler.x < powerBlok.x[i] + powerBlok.breedte && speler.x > powerBlok.x[i] + powerBlok.breedte/2 && speler.y + speler.hoogte > powerBlok.y[i] && speler.y <= powerBlok.y[i] + powerBlok.hoogte)) {       // botsing speler met rechterkant powerblok
            
          speler.x += speler.snelheid;                       // speler gaat uit het platform
        }    
      }
    }
    for (var i = 0; i < platform.x.length; i++) {
      if (platform.stuiterTijd[i] - tijd >= 0.2) {         // als platform 0.2 seconden heeft gestuiterd
        if (speler.status === "Mario") {                   // als speler klein is
          botsing_geluid.play();                          // botsing geluid wordt afgespeeld                    
          platform.y[i] = platform.standaardPositie[i];    // platform staat weer op standaard positie
        }
        else {                                             // als speler groot is, wordt het platform verwijderd
          breekBlok_geluid.play();                         // breekblok geluid wordt afgespeeld
          platform.x.splice(i, 1);                         // platform wordt verwijderd
          platform.y.splice(i, 1);                         // platform wordt verwijderd 
          platform.stuiterTijd.splice(i, 1);               // platform wordt verwijderd
          platform.standaardPositie.splice(i, 1);          // platform wordt verwijderd
          platform.stuitertPositie.splice(i, 1);           // platform wordt verwijderd
        }
        platform.stuiterTijd[i] = 0;                       // stuiterTijd wordt gereset
      }
    }
    for (var i = 0; i < powerBlok.x.length; i++) {
      if (powerBlok.stuiterTijd[i] - tijd >= 0.2) {        // als powerblok 0.2 seconden heeft gestuiterd
        botsing_geluid.play();                             // botsing geluid wordt afgespeeld
        powerBlok.y[i] = powerBlok.standaardPositie[i];    // powerblok staat weer op standaard positie
        if (powerBlok.inhoud[i] === "powerup") {
        powerup.x.push(powerBlok.x[i]);                    // powerup komt tevoorschijn
        powerup.y.push(powerBlok.y[i] - powerup.breedte);  // ^
        powerup.valt.push(false);                          // ^
        powerup.pad.push(true);                            // ^
        if (speler.status === "Mario") {                   // als speler klein is
          powerup.soort.push("Mushroom");                  // mushroom komt tevoorschijn
        }
        else {                                             // als speler groot is
          powerup.soort.push("Fire Flower");               // Fire Flower komt tevoorschijn
        }
        }
        else {
          munt.x.push(powerBlok.x[i]);                    // munt komt tevoorschijn
          munt.y.push(powerBlok.y[i] - munt.breedte);  // ^
        }
        powerBlok.stuiterTijd[i] = 0;                      // stuiterTijd wordt gereset
      }
    }
  
    if (spelerOpVloer === true) {   // als speler op vloer staat
      speler.springt = false;                                // speler springt niet meer
      speler.valt = false;                                   // speler valt niet meer
      speler.springSnelheid = speler.springHoogte; 
    }
    else if (speler.springt === false) {                     // als speler niet springt
      speler.springt = true;                                 // speler springt
      speler.springSnelheid = zwaartekracht;
    }

    for (var i = 0; i < lift.y.length; i++) {
      // als speler op lift staat
      if (speler.y + speler.hoogte >= lift.y[i] && speler.y + speler.hoogte <= lift.y[i] + lift.hoogte && speler.x + speler.breedte >= lift.x[i] && speler.x <= lift.x[i] + lift.breedte) {
        speler.springt = false;                               // speler springt niet meer
        speler.springSnelheid = speler.springHoogte;
        speler.y = lift.y[i] - speler.hoogte + lift.snelheid; // speler gaat mee met lift
      }
    }
  }
};

/**
 * Tekent letterlijk alles
 */
var tekenAlles = function() {

  // achtergrond
  background('#6185f8'); // achtergrondkleur van het spel (blauw)

  // wolken op de achtergrond
  for (var i = 0; i < wolkenX.length; i++) {
    image(
      wolkenSpritesheet, wolkenX[i], wolkenY, wolkenBreedte, wolkenHoogte, 0, 0, 2287, 866
    );
  }

  // super mario bros logo
  image(
    superMarioBrosLogo, superMarioBrosLogoX, 100, 357, 180
  );

  // ondergrond
  for (var i = 0; i < ondergrond.x.length; i++) {
    for (var j = 0; j < ondergrond.y.length; j++) {
      image(
        objectenSpritesheet, ondergrond.x[i], ondergrond.y[j], ondergrond.breedte, ondergrond.hoogte, 0, 0, 32, 32
      );
    }
  }
    
  // lift
  for (var i = 0; i < lift.y.length; i++) {
    image(
      rechtsOrganismenSpritesheet, lift.x[i], lift.y[i], lift.breedte, lift.hoogte, 323, 327, 65, 17
    );
  }

  // bloem
  if (bloem.animatieLengte >= bloem.bijtAnimatie.length) {
    bloem.animatieLengte = 0;
  }
  bloem.sprite = bloem.bijtAnimatie[bloem.animatieLengte];
  for (var i = 0; i < bloem.y.length; i++) {
    image(
      rechtsOrganismenSpritesheet, bloem.x[i], bloem.y[i], bloem.breedte, bloem.hoogte, bloem.sprite, 323, 17, 24
    );
  }

  // platform
  for (var i = 0; i < platform.x.length; i++) {
    image(
      objectenSpritesheet, platform.x[i], platform.y[i], platform.breedte, platform.hoogte, 32, 0, 32, 32
    );
  }
  
  // hard blok
  for (var i = 0; i < hardBlok.x.length; i++) {
    image(
      objectenSpritesheet, hardBlok.x[i], hardBlok.y[i], hardBlok.breedte, hardBlok.hoogte, 0, 32, 32, 32
    );
  }

  // powerblok
  if (powerBlok.animatieLengte >= powerBlok.animatie.length) {
    powerBlok.animatieLengte = 0;
  }
  powerBlok.sprite = powerBlok.animatie[powerBlok.animatieLengte];
  for (var i = 0; i < powerBlok.x.length; i++) {
    if (powerBlok.gebruikt[i] === false) {
      image(
        objectenSpritesheet, powerBlok.x[i], powerBlok.y[i], powerBlok.breedte, powerBlok.hoogte, powerBlok.sprite, 0, 32, 32
      );
    }
    else {
      image(
        objectenSpritesheet, powerBlok.x[i], powerBlok.y[i], powerBlok.breedte, powerBlok.hoogte, 858, 0, 32, 32
      );
    }
  }

  // powerups:
  if (powerup.animatieLengte >= powerup.animatie.length) { // animaties Fire Flower
    powerup.animatieLengte = 0;
  }
  powerup.sprite = powerup.animatie[powerup.animatieLengte];
  for (var i = 0; i < powerup.y.length; i++) {
    if (powerup.soort[i] === "Mushroom") { // als speler Mario is
      // Mushroom (Super Mario):
      image(
        objectenSpritesheet, powerup.x[i], powerup.y[i], powerup.breedte, powerup.hoogte, 825, 297, 32, 32
      );
    }
    else {
      // Fire Flower (Fire Mario):
      image(
        objectenSpritesheet, powerup.x[i], powerup.y[i], powerup.breedte, powerup.hoogte, powerup.sprite, 330, 32, 32
      );
    }
  }

  // goomba
  if (goomba.animatieLengte >= goomba.renAnimatie.length) {
    goomba.animatieLengte = 0;
  }
  
  for (var i = 0; i < goomba.x.length; i++) {
    if (goomba.leeft[i] === false) {
      image(
        rechtsOrganismenSpritesheet, goomba.x[i], goomba.y[i]+26, 50, 25, goomba.dood, 250, 18, 10
      );
    }
    else {
      goomba.sprite = goomba.renAnimatie[goomba.animatieLengte];
      image(
        rechtsOrganismenSpritesheet, goomba.x[i], goomba.y[i], goomba.breedte, goomba.hoogte, goomba.sprite, 245, 20, 18
      );
    }
  }

  // koopa
  if (koopa.animatieLengte >= koopa.renAnimatieL.length) {
    koopa.animatieLengte = 0;
  }
  for (var i = 0; i < koopa.x.length; i++) {
    if (koopa.inSchild[i] === true) {
      koopa.sprite = koopa.tollenAnimatie[koopa.animatieLengte];
      image(
        vijandenSpritesheet, koopa.x[i], koopa.y[i], koopa.breedte, koopa.hoogte, koopa.sprite, 4, 18, 16
      );
    }
    else {
      if (koopa.pad[i] === true) {
        koopa.sprite = koopa.renAnimatieR[koopa.animatieLengte];
      }
      else {
        koopa.sprite = koopa.renAnimatieL[koopa.animatieLengte];
      }

      image(
        vijandenSpritesheet, koopa.x[i], koopa.y[i], koopa.breedte, koopa.hoogte, koopa.sprite, 0, 18, 24
      );
    }
  }

  // munten
  if (munt.animatieLengte >= munt.animatie.length) {
    munt.animatieLengte = 0;
  }
  munt.sprite = munt.animatie[munt.animatieLengte];
  for (var i = 0; i < munt.x.length; i++) {
    image(
      muntSpritesheet, munt.x[i], munt.y[i], munt.breedte, munt.hoogte, munt.sprite, 0, 172, 171
    );
  }

  // buis 
  for (var i = 0; i < buis.ingangX.length; i++) {
    image(
      objectenSpritesheet, buis.x[i], buis.y, buis.breedte, -buis.hoogte[i], 4, 297, 57, 32
    );    
  }
  // buisingang
  for (var i = 0; i < buis.ingangX.length; i++) {
    image(
      objectenSpritesheet, buis.ingangX[i], buis.ingangY[i], buis.ingangBreedte, -buis.ingangHoogte, 0, 264, 65, 31
    );
  }

  // finish bovenkant
  image(
    objectenSpritesheet, finishTopX, finishTopY, finishTopBreedte, finishTopHoogte, 534, 411, 19, 17
  );

  // finish stok
  image(
    objectenSpritesheet, finishStokX, finishStokY, finishStokBreedte, finishStokHoogte, 542, 429, 5, 31
  );

  // finish blok
  image(
    objectenSpritesheet, finishTopX-4, 520, hardBlok.breedte, hardBlok.hoogte, 0, 32, 32, 32
  );

  // kasteel eerste helft
  image(
    kasteel, finishTopX + 310, 570, 173, -422, 0, 0, 72, 176 
  );

  // vuurbal
  if (vuurbal.animatieLengte >= vuurbal.animatieX.length) {
    vuurbal.animatieLengte = 0;
  }
  for (var i = 0; i < vuurbal.x.length; i++) {
    if (vuurbal.explodeert[i] === true) {
      vuurbal.breedte = 26;                            // breedte van vuurbal explosie
      vuurbal.hoogte = 29;                             // hoogte van vuurbal explosie
      vuurbal.spriteBreedte = 17;                      // breedte van vuurbal explosie sprite
      vuurbal.spriteHoogte = 19;                       // hoogte van vuurbal explosie sprite
      vuurbal.spriteX = vuurbal.explosieAnimatie[vuurbal.animatieLengte];
      vuurbal.spriteY = vuurbal.explosieSpriteY;
    }
    else {
      vuurbal.breedte = 17;                            // breedte van vuurbal explosie
      vuurbal.hoogte = 23;                             // hoogte van vuurbal explosie
      vuurbal.spriteBreedte = 10;                      // breedte van vuurbal sprite
      vuurbal.spriteHoogte = 10;                       // hoogte van vuurbal sprite
      vuurbal.spriteX = vuurbal.animatieX[vuurbal.animatieLengte];
      vuurbal.spriteY = vuurbal.animatieY[vuurbal.animatieLengte];
    }

    image(
      vijandenSpritesheet, vuurbal.x[i], vuurbal.y[i], vuurbal.breedte, vuurbal.hoogte, vuurbal.spriteX, vuurbal.spriteY, vuurbal.spriteBreedte, vuurbal.spriteHoogte
    );
  }

  // speler
  if (speler.animatieLengte >= speler.renAnimatieR.length) {
    speler.animatieLengte = 0;
  }

  if (speler.knippert === false) {
    speler.spriteR = speler.renAnimatieR[speler.animatieLengte];
    speler.spriteL = speler.renAnimatieL[speler.animatieLengte];
    speler.staanRechts = speler.staanSpriteRX;
    speler.staanLinks = speler.staanSpriteLX;
    speler.springenRechts = speler.springenSpriteRX;
    speler.springenLinks = speler.springenSpriteLX;
  }
  else if (speler.knippert === true) {
    
    speler.staanRechts = speler.knippertAnimatieR.slice(0, 19);
    speler.staanLinks = speler.knippertAnimatieL.slice(0, 19);
    speler.staanRechts = speler.staanRechts[speler.animatieLengte];
    speler.staanLinks = speler.staanLinks[speler.animatieLengte];

    speler.spriteR = speler.knippertAnimatieR.slice(19, 38);
    speler.spriteL = speler.knippertAnimatieL.slice(19, 38);
    speler.spriteR = speler.spriteR[speler.animatieLengte];
    speler.spriteL = speler.spriteL[speler.animatieLengte];

    speler.springenRechts = speler.knippertAnimatieR.slice(38, 57);
    speler.springenLinks = speler.knippertAnimatieL.slice(38, 57);
    speler.springenRechts = speler.springenRechts[speler.animatieLengte];
    speler.springenLinks = speler.springenLinks[speler.animatieLengte];
  }

  if (spelerOpFinishPaal === true) {
    speler.klimt = speler.klimtAnimatie[speler.animatieLengte];
    if (speler.x < finishStokX) {
      image(
        rechtsOrganismenSpritesheet, speler.x, speler.y, speler.breedte, speler.hoogte, speler.klimt, speler.spriteY, speler.spriteBreedte, speler.spriteHoogte
      );
    }
    else if (speler.x > finishStokX) {
      image(
        linksOrganismenSpritesheet, speler.x, speler.y, speler.breedte, speler.hoogte, 213, speler.spriteY, speler.spriteBreedte, speler.spriteHoogte
      );
    }
  }

  else if (speler.leeft === false) {
    image(
      rechtsOrganismenSpritesheet, speler.x, speler.y, speler.breedte, speler.hoogte, speler.dood, 47, speler.spriteBreedte, speler.spriteHoogte
    );
  }

  else if (speler.opGoomba === true) {
    if (speler.kijkRichting === "rechts") {
      image(
        rechtsOrganismenSpritesheet, speler.x, speler.y, speler.breedte, speler.hoogte, speler.opFinishpaalSprite1X, speler.spriteY, speler.spriteBreedte, speler.spriteHoogte
      );
    }
    if (speler.kijkRichting === "links") {
      image(
        linksOrganismenSpritesheet, speler.x, speler.y, speler.breedte, speler.hoogte, 213, speler.spriteY, speler.spriteBreedte, speler.spriteHoogte
      );
    }
  }

  else if (speler.springt === true) {
    if (speler.kijkRichting === "rechts") {
      image(
        rechtsOrganismenSpritesheet, speler.x, speler.y, speler.breedte, speler.hoogte, speler.springenRechts, speler.spriteY, speler.spriteBreedte, speler.spriteHoogte
      );
    }
    if (speler.kijkRichting === "links") {
      image(
        linksOrganismenSpritesheet, speler.x, speler.y, speler.breedte, speler.hoogte, speler.springenLinks, speler.spriteY, speler.spriteBreedte, speler.spriteHoogte
      );
    }
  }
  else if (speler.beweegt === "links" && pauze === false && finishPaalGeraakt === false) {
    image(
      linksOrganismenSpritesheet, speler.x, speler.y, speler.breedte, speler.hoogte, speler.spriteL, speler.spriteY, speler.spriteBreedte, speler.spriteHoogte
    );
  }
  else if (speler.beweegt === "rechts" &&  pauze === false) {
    image(
      rechtsOrganismenSpritesheet, speler.x , speler.y, speler.breedte, speler.hoogte, speler.spriteR, speler.spriteY, speler.spriteBreedte, speler.spriteHoogte
    );
  }
  else if (speler.beweegt === "niet" || pauze === true) {
    if (speler.kijkRichting === "rechts") {
      image(
        rechtsOrganismenSpritesheet, speler.x, speler.y, speler.breedte, speler.hoogte, speler.staanRechts, speler.spriteY, speler.spriteBreedte, speler.spriteHoogte
      ); 
    }
    if (speler.kijkRichting === "links") {
      image(
        linksOrganismenSpritesheet, speler.x, speler.y, speler.breedte, speler.hoogte, speler.staanLinks, speler.spriteY, speler.spriteBreedte, speler.spriteHoogte
      ); 
    }
  }
  if (pauze === false) {
    speler.animatieLengte++;
    goomba.animatieLengte++;
    koopa.animatieLengte++;
    munt.animatieLengte++;
    vuurbal.animatieLengte++;
    bloem.animatieLengte++;
    powerBlok.animatieLengte++;
    powerup.animatieLengte++;
  }

  // kasteel tweede helft
  image(
    kasteel, finishTopX + 480, 570, 173, -422, 72, 0, 72, 176 
  );
  
  textSize(25);
  // tijd
  text("Tijd: " + Math.round(tijd) + "s", 100, 40);

  // levens
  text("Levens: " + speler.levens, 366, 40);

  // munten
  text("Level " + levelGeselecteerd, 640, 40);

  // score
  text("Score: " + score, 883, 40);

  // highscore
  text("Highscore: " + highscore[levelGeselecteerd], 1150, 40);
  
  // geluidenDempen knop:
  if (geluidenDempen === false) {
    image(
      audioAan, 610, 640, 65, 65
    );
  }
  else if (geluidenDempen === true) {
    image(
      audioUit, 610, 640, 65, 65
    );
  }

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // knoppen voor bewegen en schieten op mobiel :
    textSize(150);
    text("\u21E6", 1000, 690);  // links
    text("\u21E7", 75, 700);    // springen
    text("\u21E8", 1200, 690);  // rechts
    textSize(100);
    text("\uD83D\uDD2B", 250, 690) // vuurbal schieten
  }
};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() {
  // als de speler in de void valt of als de tijd op is
  if (speler.y >= ondergrond.y[0] + ondergrond.hoogte || tijd <= 0) {
    return true;
  }

  return false;
  
};

/* ****************************************************** */
/* preload(), setup() en draw() functies / hoofdprogramma */
/* ****************************************************** */

/**
 * preload
 * de media in deze functie wordt één keer ingeladen
 * zodra het spel geladen is in de browser
 */
function preload() {

  // spritesheets/afbeeldingen:
  superMarioBrosLogo = loadImage('media/afbeeldingen/superMarioBros-logo.png');
  rechtsOrganismenSpritesheet = loadImage('media/afbeeldingen/rechts-organismen-spritesheet.png');
  linksOrganismenSpritesheet = loadImage('media/afbeeldingen/links-organismen-spritesheet.png');
  objectenSpritesheet = loadImage('media/afbeeldingen/objecten-spritesheet.png');
  kasteel = loadImage('media/afbeeldingen/kasteel.png');
  muntSpritesheet = loadImage('media/afbeeldingen/munt-spritesheet.png');
  wolkenSpritesheet = loadImage('media/afbeeldingen/wolken-spritesheet.png');
  scenerySpritesheet = loadImage('media/afbeeldingen/scenery-spritesheet.png');
  vijandenSpritesheet = loadImage('media/afbeeldingen/vijanden-spritesheet.png');
  audioAan = loadImage('media/afbeeldingen/audio-aan.png');
  audioUit = loadImage('media/afbeeldingen/audio-uit.png');

  // geluid:
  algemeenMuziekje = new Audio('media/geluid/algemeen-muziekje.mp3');
  breekBlok_geluid = new Audio('media/geluid/breekBlok_geluid.wav');
  botsing_geluid = new Audio('media/geluid/botsing_geluid.wav');
  muntjeOpgepakt_geluid = new Audio('media/geluid/muntjeOpgepakt_geluid.wav');
  powerupOpgepakt_geluid = new Audio('media/geluid/powerupOpgepakt_geluid.wav');
  vuurbal_geluid = new Audio('media/geluid/vuurbal_geluid.wav');
  finishStokGlijden_geluid = new Audio('media/geluid/finishStokGlijden_geluid.wav');
  gameover_geluid = new Audio('media/geluid/gameover_geluid.wav');
  springenKlein_geluid = new Audio('media/geluid/springenKlein_geluid.wav');
  springenGroot_geluid = new Audio('media/geluid/springenGroot_geluid.wav');
  spelerDood_geluid = new Audio('media/geluid/spelerDood_geluid.wav');
  vijandGedood_geluid = new Audio('media/geluid/vijandGedood_geluid.wav');
  spelGepauzeerd_geluid = new Audio('media/geluid/spelGepauzeerd_geluid.wav');
  spelerGeraakt_geluid = new Audio('media/geluid/spelerGeraakt_geluid.wav');
  powerupVerschijnt_geluid = new Audio('media/geluid/powerupVerschijnt_geluid.wav');
  levelVoltooid_geluid = new Audio('media/geluid/levelVoltooid_geluid.wav');
  tijdBijnaVoorbij_geluid = new Audio('media/geluid/tijdBijnaVoorbij_geluid.wav');
  wereldVoltooid_geluid = new Audio('media/geluid/wereldVoltooid_geluid.wav');
};

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, nadat de preload functie klaar is
 */
function setup() {
  createCanvas(1280, 720);          // maak een canvas (speelveld) van 1280 x 720 pixels
  background('#6185f8');            // kleur de achtergrond blauw
  textFont('Super Mario Bros');     // font van de tekst is Super Mario Bros
  textAlign(CENTER);                // tekst is gecentreerd
  fill(0);                          // tekst is zwart

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { // als het een mobiel apparaat is
    fullscreen(true);               // zet het spel op fullscreen (gevonden op: https://p5js.org/reference/#/p5/fullscreen)
  }

  standaardLevel = {                // standaard level (level 0)
    // vloeren:
    platformX: [],                  // x-positie van een platform blok
    platformY: [],                  // y-positie van een platform blok
    hardBlokX: [],                  // x-positie van een hardblok
    hardBlokY: [],                  // y-positie van een hardblok
    powerBlokX: [],                 // x-positie van een powerblok
    powerBlokY: [],                 // y-positie van een powerblok
    powerBlokInhoud: [],            // inhoud van een powerblok
    ondergrondX: [                  // x-positie van een ondergrond
      0,    50,   100,  150,  200,  250,  300,  350,  400,  450,                  // ondergrond 1 t/m 10  
      500,  550,  600,  650,  700,  750,  800,  850,  900,  950,                  // ondergrond 11 t/m 20 
      1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450,                 // ondergrond 21 t/m 30 
      1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950,                 // ondergrond 31 t/m 40 
      2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450,                 // ondergrond 41 t/m 50 
      2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 2950,                 // ondergrond 51 t/m 60
      3000, 3050, 3100, 3150, 3200, 3250, 3300, 3350, 3400, 3450,                 // ondergrond 61 t/m 70 
      3500, 3550, 3600, 3650, 3700, 3750, 3800, 3850, 3900, 3950,                 // ondergrond 71 t/m 80 
      4000, 4050, 4100, 4150, 4200, 4250, 4300, 4350, 4400, 4450,                 // ondergrond 81 t/m 90 
      4500, 4550, 4600, 4650, 4700, 4750, 4800, 4850, 4900, 4950,                 // ondergrond 91 t/m 100 
      5000, 5050, 5100, 5150, 5200, 5250, 5300, 5350, 5400, 5450,                 // ondergrond 101 t/m 110
      5500, 5550, 5600, 5650, 5700, 5750, 5800, 5850, 5900, 5950,                 // ondergrond 111 t/m 120
      6000, 6050, 6100, 6150, 6200, 6250, 6300, 6350, 6400, 6450,                 // ondergrond 121 t/m 130
      6500, 6550, 6600, 6650, 6700, 6750, 6800, 6850, 6900, 6950,                 // ondergrond 131 t/m 140
      7000, 7050, 7100, 7150, 7200, 7250, 7300, 7350, 7400, 7450,                 // ondergrond 141 t/m 150
      7500, 7550, 7600, 7650, 7700, 7750, 7800, 7850, 7900, 7950,                 // ondergrond 151 t/m 160
      8000, 8050, 8100, 8150, 8200, 8250, 8300, 8350, 8400, 8450,                 // ondergrond 161 t/m 170
      8500, 8550, 8600, 8650, 8700, 8750, 8800, 8850, 8900, 8950,                 // ondergrond 171 t/m 180
      9000, 9050, 9100, 9150, 9200, 9250, 9300, 9350, 9400, 9450,                 // ondergrond 181 t/m 190
      9500, 9550, 9600, 9650, 9700, 9750, 9800, 9850, 9900, 9950,                 // ondergrond 191 t/m 200
      10000, 10050, 10100, 10150, 10200, 10250, 10300, 10350, 10400, 10450,       // ondergrond 201 t/m 210
      10500, 10550, 10600, 10650, 10700, 10750, 10800, 10850, 10900, 10950,       // ondergrond 211 t/m 220
      11000, 11050, 11100, 11150, 11200, 11250, 11300, 11350, 11400, 11450,       // ondergrond 221 t/m 230
      11500, 11550, 11600, 11650, 11700, 11750, 11800, 11850, 11900, 11950,       // ondergrond 231 t/m 240
      12000, 12050, 12100, 12150, 12200, 12250, 12300, 12350, 12400, 12450,       // ondergrond 241 t/m 250
      12500, 12550, 12600, 12650, 12700, 12750, 12800, 12850, 12900, 12950        // ondergrond 251 t/m 260
    ],
    // goomba:
    goombaX:        [],             // x-positie van een goomba
    goombaY:        [],             // y-positie van een goomba
    goombaPad:      [],             // goomba beweegt van links naar rechts (true) of andersom (false)
    // koopa:
    koopaX:         [],             // x-positie van een koopa
    koopaY:         [],             // y-positie van een koopa
    koopaPad:       [],             // koopa beweegt van links naar rechts (true) of andersom (false)
    // bloem:
    bloemX:     [],                 // x-positie van een bloem
    bloemY:     [],                 // y-positie van een bloem
    bloemBegin: [],                 // beginpositie van een bloem
    bloemEind:  [],                 // eindpositie van een bloem
    // buis:
    buisIngangX: [],                // x-positie van een buis ingang
    buisHoogte:  [],                // hoogte van een buis
    // lift:
    liftX:     [],                  // x-positie van een lift
    liftY:     [],                  // y-positie van een lift
    liftPad:   [],                  // lift beweegt van begin naar eind (true) of andersom (false)
    liftBegin: [],                  // begin positie van een lift
    liftEind:  [],                  // eind positie van een lift
  };

  level1 = {
    platformX: [                    // x-positie van een platform
      1400, 1500, 1600, 4450, 4550, 4600, 4650, 4700, 4750, 4800,
      4850, 4900, 5100, 5150, 5200, 5250, 5550, 5600, 6450, 6600,
      6650, 6700, 7000, 7050, 7100, 7150, 9000, 9050, 9150
    ], 
    platformY: [                    // y-positie van een platform
      350, 350, 350, 350, 350, 150, 150, 150, 150, 150,
      150, 150, 150, 150, 150, 350, 350, 350, 350, 150,
      150, 150, 150, 350, 350, 150, 350, 350, 350
    ],

    hardBlokX: [                    // x-positie van een hardblok
      7300, 
      7350, 7350,
      7400, 7400, 7400,
      7450, 7450, 7450, 7450,

      7600, 7600, 7600, 7600,
      7650, 7650, 7650, 
      7700, 7700,
      7750,

      8000, 
      8050, 8050,
      8100, 8100, 8100,
      8150, 8150, 8150, 8150,
      8200, 8200, 8200, 8200,

      8350, 8350, 8350, 8350,
      8400, 8400, 8400,
      8450, 8450,
      8500,

      9600,
      9650, 9650,
      9700, 9700, 9700,
      9750, 9750, 9750, 9750,
      9800, 9800, 9800, 9800, 9800,
      9850, 9850, 9850, 9850, 9850, 9850,
      9900, 9900, 9900, 9900, 9900, 9900, 9900,
      9950, 9950, 9950, 9950, 9950, 9950, 9950, 9950,
      10000,10000,10000,10000,10000,10000,10000,10000
    ],
    hardBlokY: [                    // y-positie van een hardblok
      520,
      520, 470,
      520, 470, 420,
      520, 470, 420, 370,

      520, 470, 420, 370, 
      520, 470, 420,
      520, 470,
      520,

      520,
      520, 470,
      520, 470, 420,
      520, 470, 420, 370,
      520, 470, 420, 370,

      520, 470, 420, 370,
      520, 470, 420,
      520, 470,
      520,

      520,
      520, 470,
      520, 470, 420,
      520, 470, 420, 370,
      520, 470, 420, 370, 320,
      520, 470, 420, 370, 320, 270,
      520, 470, 420, 370, 320, 270, 220,
      520, 470, 420, 370, 320, 270, 220, 170,
      520, 470, 420, 370, 320, 270, 220, 170
    ],

    powerBlokX: [                   // x-positie van een powerblok
      1200, 1450, 1500, 1550, 4500, 5250, 5850, 6000, 6000, 6150, 7050, 7100, 9100
    ], 
    powerBlokY: [                   // y-positie van een powerblok
      350, 350, 150, 350, 350, 150, 350, 350, 150, 350, 150, 150, 350
    ],
    powerBlokInhoud: [              // inhoud van een powerblok
      "munt", "powerup", "munt", "munt", "powerup", "munt", "munt", "munt", "powerup", "munt", "munt", "munt", "munt"
    ],

    ondergrondX: [                  // x-positie van een ondergrond
      0,    50,   100,  150,  200,  250,  300,  350,  400,  450,                  // ondergrond 1 t/m 10  
      500,  550,  600,  650,  700,  750,  800,  850,  900,  950,                  // ondergrond 11 t/m 20 
      1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450,                 // ondergrond 21 t/m 30 
      1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950,                 // ondergrond 31 t/m 40 
      2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450,                 // ondergrond 41 t/m 50 
      2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 2950,                 // ondergrond 51 t/m 60
      3000, 3050, 3100, 3150, 3200, 3250, 3300, 3350, 3400, 3450,                 // ondergrond 61 t/m 70 
      3500, 3550, 3600, 3650, 3700, 3750, 3800, 3850, 3900, 3950,                 // ondergrond 71 t/m 80 
      4000, /*4050, 4100,*/ 4150, 4200, 4250, 4300, 4350, 4400, 4450,             // ondergrond 81 t/m 90 
      4500, 4550, 4600, 4650, 4700, 4750, 4800, /*4850, 4900, 4950,*/             // ondergrond 91 t/m 100 
      5000, 5050, 5100, 5150, 5200, 5250, 5300, 5350, 5400, 5450,                 // ondergrond 101 t/m 110
      5500, 5550, 5600, 5650, 5700, 5750, 5800, 5850, 5900, 5950,                 // ondergrond 111 t/m 120
      6000, 6050, 6100, 6150, 6200, 6250, 6300, 6350, 6400, 6450,                 // ondergrond 121 t/m 130
      6500, 6550, 6600, 6650, 6700, 6750, 6800, 6850, 6900, 6950,                 // ondergrond 131 t/m 140
      7000, 7050, 7100, 7150, 7200, 7250, 7300, 7350, 7400, 7450,                 // ondergrond 141 t/m 150
      7500, 7550, 7600, 7650, 7700, 7750, 7800, 7850, 7900, 7950,                 // ondergrond 151 t/m 160
      8000, 8050, 8100, 8150, 8200, /*8250, 8300,*/ 8350, 8400, 8450,             // ondergrond 161 t/m 170
      8500, 8550, 8600, 8650, 8700, 8750, 8800, 8850, 8900, 8950,                 // ondergrond 171 t/m 180
      9000, 9050, 9100, 9150, 9200, 9250, 9300, 9350, 9400, 9450,                 // ondergrond 181 t/m 190
      9500, 9550, 9600, 9650, 9700, 9750, 9800, 9850, 9900, 9950,                 // ondergrond 191 t/m 200
      10000, 10050, 10100, 10150, 10200, 10250, 10300, 10350, 10400, 10450,       // ondergrond 201 t/m 210
      10500, 10550, 10600, 10650, 10700, 10750, 10800, 10850, 10900, 10950,       // ondergrond 211 t/m 220
      11000, 11050, 11100, 11150, 11200, 11250, 11300, 11350, 11400, 11450,       // ondergrond 221 t/m 230
      11500, 11550, 11600, 11650, 11700, 11750, 11800, 11850, 11900, 11950,       // ondergrond 231 t/m 240
      12000, 12050, 12100, 12150, 12200, 12250, 12300, 12350, 12400, 12450,       // ondergrond 241 t/m 250
      12500, 12550, 12600, 12650, 12700, 12750, 12800, 12850, 12900, 12950        // ondergrond 251 t/m 260
    ],
  
    // goomba:   1      2     3     4      5      6      7      8      9      10     11     12     13     14
    goombaX:   [1450,  2400, 2750, 3550,  4650,  4750,  5300,  5400,  6750,  6850,  6950,  7050,  9200,  9300 ], // x-positie van een goomba
    goombaY:   [520,   520,  520,  520,   100,   100,   520,   520,   520,   520,   520,   520,   520,   520  ], // y-positie van een goomba
    goombaPad: [false, true, true, false, false, false, false, false, false, false, false, false, false, false], // houdt bij of een goomba naar links (false) of rechts (true) gaat

    // koopa:         1
    koopaX:         [5750 ],                              // x-positie van een koopa
    koopaY:         [520  ],                              // y-positie van een koopa
    koopaPad:       [false],                              // koopa beweegt van links naar rechts (true) of andersom (false)

    // bloem:     1
    bloemX:     [8764],                                   // x-positie van een bloem
    bloemY:     [450 ],                                   // y-positie van een bloem
    bloemBegin: [374 ],                                   // beginpositie van een bloem
    bloemEind:  [474 ],                                   // eindpositie van een bloem

    // buis:      1     2     3     4     5     6
    buisIngangX: [1750, 2250, 2650, 3600, 8750, 9500],    // x-positie van een buisingang
    buisHoogte:  [50,   100,  150,  150,  55,   55  ],    // hoogte van een buis

    // lift:
    liftX:     [],                                        // x-positie van een lift
    liftY:     [],                                        // y-positie van een lift
    liftPad:   [],                                        // houdt bij of een lift naar boven of beneden gaat
    liftBegin: [],                                        // beginpositie van een lift
    liftEind:  [],                                        // eindpositie van een lift
  };

  level2 = {
    // vloeren:
    platformX: [                    // x-positie van een platform blok
      500,  550,  600, 700, 1500, 1550, 1650, 4400, 4650, 4700,
      5000, 5050, 5100, 5150, 5200, 5250, 5300, 5350, 5400, 5450,
      5500, 5550, 5600, 5650, 5700, 5750, 5800, 5850, 5900
    ],
    platformY: [                    // y-positie van een platform blok
      350, 350, 350, 350, 250, 250, 250, 350, 250, 250, 
      200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
      200, 200, 200, 200, 200, 250, 300, 300, 300
    ],
    hardBlokX: [                    // x-positie van een hardblok
      2100, 
      2250, 2250,
      2400, 2400, 2400,
      2550, 2550, 2550, 2550,
      2700, 2700, 2700, 2700, 2700,
      2850, 2850, 2850, 2850, 2850, 2850,
      3000, 3000, 3000, 3000, 3000, 3000, 3000,
      
      3150, 3150, 3150,

      9600,
      9650, 9650,
      9700, 9700, 9700,
      9750, 9750, 9750, 9750,
      9800, 9800, 9800, 9800, 9800,
      9850, 9850, 9850, 9850, 9850, 9850,
      9900, 9900, 9900, 9900, 9900, 9900, 9900,
      9950, 9950, 9950, 9950, 9950, 9950, 9950, 9950,
      10000,10000,10000,10000,10000,10000,10000,10000
    ],
    hardBlokY: [                    // y-positie van een hardblok
      520,
      520, 470,
      520, 470, 420,
      520, 470, 420, 370,
      520, 470, 420, 370, 320,
      520, 470, 420, 370, 320, 270,
      520, 470, 420, 370, 320, 270, 220,
       
      520, 470, 420,

      520,
      520, 470,
      520, 470, 420,
      520, 470, 420, 370,
      520, 470, 420, 370, 320,
      520, 470, 420, 370, 320, 270,
      520, 470, 420, 370, 320, 270, 220,
      520, 470, 420, 370, 320, 270, 220, 170,
      520, 470, 420, 370, 320, 270, 220, 170
    ],
    powerBlokX: [                   // x-positie van een powerblok
    650, 1600, 5150, 5350, 5400, 7200, 7500
    ],
    powerBlokY: [                   // y-positie van een powerblok
    350, 250, 50, 50, 50, 350, 350
    ],
    powerBlokInhoud: [              // inhoud van een powerblok
    "munt", "munt", "munt", "munt", "powerup","powerup", "munt"
    ],
    ondergrondX: [                  // x-positie van een ondergrond
      0,    50,   100,  150,  200,  250,  300,  350,  400,  450,                  // ondergrond 1 t/m 10  
      /*500,  550,*/  600,  /*650,  700,*/  750,  800,  850,  900,  950,          // ondergrond 11 t/m 20 
      1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450,                 // ondergrond 21 t/m 30 
      1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950,                 // ondergrond 31 t/m 40 
      2000, 2050, 2100, /*2150, 2200,*/ 2250, /*2300, 2350,*/ 2400, /*2450,       // ondergrond 41 t/m 50 
      2500,*/ 2550, /*2600, 2650,*/ 2700, /*2750, 2800,*/ 2850, /*2900, 2950,*/   // ondergrond 51 t/m 60
      3000, /*3050, 3100,*/ 3150, 3200, /*3250, 3300, 3350, 3400, 3450,           // ondergrond 61 t/m 70 
      3500, 3550, 3600, 3650, 3700,*/ 3750, 3800, 3850, 3900, 3950,               // ondergrond 71 t/m 80 
      4000, /*4050, 4100, 4150, 4200, 4250, 4300, 4350,*/ 4400, 4450,             // ondergrond 81 t/m 90 
      4500, 4550, 4600, 4650, 4700, 4750, 4800, 4850, 4900, 4950,                 // ondergrond 91 t/m 100 
      5000, 5050, 5100, 5150, 5200, 5250, 5300, 5350, 5400, 5450,                 // ondergrond 101 t/m 110
      5500, 5550, 5600, 5650, 5700, 5750, 5800, 5850, 5900, 5950,                 // ondergrond 111 t/m 120
      6000, 6050, 6100, 6150, 6200, 6250, 6300, 6350, 6400, 6450,                 // ondergrond 121 t/m 130
      6500, 6550, 6600, 6650, 6700, 6750, 6800, /*6850, 6900,*/ 6950,             // ondergrond 131 t/m 140
      7000, 7050, 7100, 7150, 7200, 7250, 7300, 7350, 7400, 7450,                 // ondergrond 141 t/m 150
      7500, 7550, 7600, 7650, 7700, 7750, 7800, 7850, 7900, 7950,                 // ondergrond 151 t/m 160
      8000, 8050, 8100, 8150, /*8200, 8250, 8300, 8350,*/ 8400, 8450,             // ondergrond 161 t/m 170
      /*8500, 8550, 8600, 8650, 8700, 8750, */8800,/* 8850, 8900, 8950,           // ondergrond 171 t/m 180
      9000, */9050,/* 9100, 9150, 9200, */9250, 9300, 9350, 9400, 9450,           // ondergrond 181 t/m 190
      9500, 9550, 9600, 9650, 9700, 9750, 9800, 9850, 9900, 9950,                 // ondergrond 191 t/m 200
      10000, 10050, 10100, 10150, 10200, 10250, 10300, 10350, 10400, 10450,       // ondergrond 201 t/m 210
      10500, 10550, 10600, 10650, 10700, 10750, 10800, 10850, 10900, 10950,       // ondergrond 211 t/m 220
      11000, 11050, 11100, 11150, 11200, 11250, 11300, 11350, 11400, 11450,       // ondergrond 221 t/m 230
      11500, 11550, 11600, 11650, 11700, 11750, 11800, 11850, 11900, 11950,       // ondergrond 231 t/m 240
      12000, 12050, 12100, 12150, 12200, 12250, 12300, 12350, 12400, 12450,       // ondergrond 241 t/m 250
      12500, 12550, 12600, 12650, 12700, 12750, 12800, 12850, 12900, 12950        // ondergrond 251 t/m 260
    ],
    // goomba:        1      2      3      4     5     6      7
    goombaX:        [1150,  1400,  4800,  5300, 5500, 6350,  7000],               // x-positie van een goomba
    goombaY:        [520,   520,   520,   520,  520,  520,   520 ],               // y-positie van een goomba
    goombaPad:      [true,  false, false, true, true, false, true],               // goomba beweegt van links naar rechts (true) of andersom (false)
    // koopa:         1
    koopaX:         [5000],                                                       // x-positie van een koopa
    koopaY:         [520 ],                                                       // y-positie van een koopa
    koopaPad:       [true],                                                       // koopa beweegt van links naar rechts (true) of andersom (false)
    // bloem:     1      2      3      4
    bloemX:     [1814,  4864,  8414,  9264 ],                                     // x-positie van een bloem
    bloemY:     [400,   400,   400,   400  ],                                     // y-positie van een bloem
    bloemBegin: [330,   330,   180,   330  ],                                     // beginpositie van een bloem
    bloemEind:  [474,   474,   474,   474  ],                                     // eindpositie van een bloem
    // buis:       1     2     3     4     5     6     7
    buisIngangX: [1050, 1800, 3950, 4850, 6400, 8400, 9250],                      // x-positie van een buis ingang
    buisHoogte:  [150,  100,  50,   100,  200,  250,  100 ],                      // hoogte van een buis
    // lift:     1       2
    liftX:     [3550,   8200 ],                                                   // x-positie van een lift
    liftY:     [570,    570  ],                                                   // y-positie van een lift
    liftPad:   [false,  false],                                                   // lift beweegt van begin naar eind (true) of andersom (false)
    liftBegin: [200,    250  ],                                                   // begin positie van een lift
    liftEind:  [570,    570  ],                                                   // eind positie van een lift
  };

  level3 = {
    // vloeren:
    platformX: [                    // x-positie van een platform blok
      450,  500,  550,  950,  1000, 1050, 1450, 1850, 1900, 1950,
      2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450,
      2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 2950,
      3000, 3050, 3100, 3150, 3200, 3250, 3300, 3350, 3400, 3450,
      6200, 6250, 7000, 7050, 7100, 7150, 7200, 7250, 7300, 7350,
      7400, 7450, 7500, 7550, 7600, 7650, 7750, 7800, 7850, 7900,
      7950, 8000, 8050, 8100, 8150, 8200, 8250, 8300, 8350, 8400,
      8450, 8500, 8550
    ],
    platformY: [                    // y-positie van een platform blok
      350, 350, 350, 250, 250, 250, 200, 200, 200, 200,
      200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
      200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
      200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
      100, 100, 200, 200, 200, 200, 200, 200, 200, 200,
      200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
      200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
      200, 200, 200
    ],
    hardBlokX: [                    // x-positie van een hardblok
      9600,
      9650, 9650,
      9700, 9700, 9700,
      9750, 9750, 9750, 9750,
      9800, 9800, 9800, 9800, 9800,
      9850, 9850, 9850, 9850, 9850, 9850,
      9900, 9900, 9900, 9900, 9900, 9900, 9900,
      9950, 9950, 9950, 9950, 9950, 9950, 9950, 9950,
      10000,10000,10000,10000,10000,10000,10000,10000
    ],
    hardBlokY: [                    // y-positie van een hardblok
      520,
      520, 470,
      520, 470, 420,
      520, 470, 420, 370,
      520, 470, 420, 370, 320,
      520, 470, 420, 370, 320, 270,
      520, 470, 420, 370, 320, 270, 220,
      520, 470, 420, 370, 320, 270, 220, 170,
      520, 470, 420, 370, 320, 270, 220, 170
    ],
    powerBlokX: [                   // x-positie van een powerblok
      2600, 4400, 4950, 5500, 7700
    ], 
    powerBlokY: [                   // y-positie van een powerblok
      50, 100, 100, 100, 200
    ],
    powerBlokInhoud: [              // inhoud van een powerblok
      "powerup", "munt", "munt", "munt", "powerup"
    ],
    ondergrondX: [                  // x-positie van een ondergrond
      0,    50,   100,  150,  200,  250,  300,  350,  400,  450,                  // ondergrond 1 t/m 10  
      500,  550,  600,  650,  700,  750,  800,  850,  900,  950,                  // ondergrond 11 t/m 20 
      1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450,                 // ondergrond 21 t/m 30 
      1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950,                 // ondergrond 31 t/m 40 
      2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450,                 // ondergrond 41 t/m 50 
      2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 2950,                 // ondergrond 51 t/m 60
      3000, 3050, 3100, 3150, 3200, 3250, 3300, 3350, 3400, 3450,                 // ondergrond 61 t/m 70 
      /*3500, 3550, 3600, 3650, 3700, 3750, 3800, 3850, 3900, 3950,               // ondergrond 71 t/m 80 
      4000, 4050, 4100, 4150, 4200, 4250, 4300, 4350, 4400, 4450,                 // ondergrond 81 t/m 90 
      4500, 4550, 4600, 4650, 4700, 4750, 4800, 4850, 4900, 4950,                 // ondergrond 91 t/m 100 
      5000, 5050, 5100, 5150, 5200, 5250, 5300, 5350, 5400, 5450,                 // ondergrond 101 t/m 110
      5500, 5550, 5600, 5650, 5700, 5750, 5800, 5850, 5900, 5950,                 // ondergrond 111 t/m 120
      6000, 6050, 6100, 6150, 6200, 6250, 6300, 6350, 6400, 6450,                 // ondergrond 121 t/m 130
      6500, 6550, 6600, 6650, 6700,*/ 6750, 6800, 6850, 6900, 6950,               // ondergrond 131 t/m 140
      7000, 7050, 7100, 7150, 7200, 7250, 7300, 7350, 7400, 7450,                 // ondergrond 141 t/m 150
      7500, 7550, 7600, 7650, 7700, 7750, 7800, 7850, 7900, 7950,                 // ondergrond 151 t/m 160
      8000, 8050, 8100, 8150, 8200, 8250, 8300, 8350, 8400, 8450,                 // ondergrond 161 t/m 170
      8500, 8550, 8600, 8650, 8700, 8750, 8800, 8850, 8900, 8950,                 // ondergrond 171 t/m 180
      9000, 9050, 9100, 9150, 9200, 9250, 9300, 9350, 9400, 9450,                 // ondergrond 181 t/m 190
      9500, 9550, 9600, 9650, 9700, 9750, 9800, 9850, 9900, 9950,                 // ondergrond 191 t/m 200
      10000, 10050, 10100, 10150, 10200, 10250, 10300, 10350, 10400, 10450,       // ondergrond 201 t/m 210
      10500, 10550, 10600, 10650, 10700, 10750, 10800, 10850, 10900, 10950,       // ondergrond 211 t/m 220
      11000, 11050, 11100, 11150, 11200, 11250, 11300, 11350, 11400, 11450,       // ondergrond 221 t/m 230
      11500, 11550, 11600, 11650, 11700, 11750, 11800, 11850, 11900, 11950,       // ondergrond 231 t/m 240
      12000, 12050, 12100, 12150, 12200, 12250, 12300, 12350, 12400, 12450,       // ondergrond 241 t/m 250
      12500, 12550, 12600, 12650, 12700, 12750, 12800, 12850, 12900, 12950        // ondergrond 251 t/m 260
    ],
    // goomba:     1      2     3      4     5      6      7     8      9    10
    goombaX:     [800,   1000, 2200,  2400, 2600,  3200,  7400, 7600,  7800, 8000 ],     // x-positie van een goomba
    goombaY:     [520,   520,  520,   520,  520,   150,   520,  520,   520,  350  ],     // y-positie van een goomba
    goombaPad:   [false, true, false, true, false, false, true, false, true, false],     // goomba beweegt van links naar rechts (true) of andersom (false)
    // koopa:      1      2     3      4     5      6     7      8
    koopaX:      [600,   2800, 2900,  3200, 7150,  8200, 8500,  8800],             // x-positie van een koopa
    koopaY:      [520,   150,  520,   520,  520,   520,  520,   520 ],             // y-positie van een koopa
    koopaPad:    [false, true, false, true, false, true, false, true],             // koopa beweegt van links naar rechts (true) of andersom (false)
    // bloem:      1     2     3     4     5     6
    bloemX:      [2014, 2714, 7014, 7314, 7514, 7714],                      // x-positie van een bloem
    bloemY:      [400,  300,  400,  300,  300,  400 ],                      // y-positie van een bloem
    bloemBegin:  [300,  300,  330,  380,  380,  250 ],                      // beginpositie van een bloem
    bloemEind:   [474,  474,  474,  474,  474,  474 ],                      // eindpositie van een bloem
    // buis:       1     2     3     4     5     6     7
    buisIngangX: [2000, 2700, 3400, 7000, 7300, 7500, 7700],                // x-positie van een buis ingang
    buisHoogte:  [150,  150,  150,  100,  55,   55,   200 ],                // hoogte van een buis
    // lift:       1      2     3      4     5
    liftX:       [3500,  4050, 4600,  5150, 5700 ],                         // x-positie van een lift
    liftY:       [570,   200,  570,   200,  570  ],                         // y-positie van een lift
    liftPad:     [false, true, false, true, false],                         // lift beweegt van begin naar eind (true) of andersom (false)
    liftBegin:   [200,   200,  200,   200,  200  ],                         // begin positie van een lift
    liftEind:    [570,   570,  570,   570,  570  ],                         // eind positie van een lift
  };

  level4 = {
    // vloeren:
    platformX: [                    // x-positie van een platform blok
      900,  1400, 1450, 1500, 1550, 1750, 1750, 1800, 2900, 2950, 
      3000, 3100, 3150, 4550, 4600, 4650, 5350, 7050, 7100, 7150, 
      7200, 7300, 7350, 7400, 7450, 7500, 7550, 7600, 7650, 8150, 
      8200, 8250, 8400, 8450, 8500, 8550, 8600, 8650, 8700, 8750, 
      8800, 8950
    ],
    platformY: [                    // y-positie van een platform blok
      350, 570, 570, 570, 570, 200, 350, 350, 350, 350,
      350, 350, 350, 350, 350, 350, 350, 350, 300, 250, 
      250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 
      250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 
      250, 250
    ],
    hardBlokX: [                    // x-positie van een hardblok
      1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300,

      9600,
      9650, 9650,
      9700, 9700, 9700,
      9750, 9750, 9750, 9750,
      9800, 9800, 9800, 9800, 9800,
      9850, 9850, 9850, 9850, 9850, 9850,
      9900, 9900, 9900, 9900, 9900, 9900, 9900,
      9950, 9950, 9950, 9950, 9950, 9950, 9950, 9950,
      10000,10000,10000,10000,10000,10000,10000,10000
    ],
    hardBlokY: [                    // y-positie van een hardblok
      370, 320, 270, 220, 170, 120, 70, 20,

      520,
      520, 470,
      520, 470, 420,
      520, 470, 420, 370,
      520, 470, 420, 370, 320,
      520, 470, 420, 370, 320, 270,
      520, 470, 420, 370, 320, 270, 220,
      520, 470, 420, 370, 320, 270, 220, 170,
      520, 470, 420, 370, 320, 270, 220, 170
    ],
    powerBlokX: [                   // x-positie van een powerblok
      1800, 3050, 4450, 4500, 7250, 8300, 8350
    ],
    powerBlokY: [                   // y-positie van een powerblok
      200, 350, 350, 350, 250, 250, 250
    ],
    powerBlokInhoud: [              // inhoud van een powerblok
      "munt", "munt", "munt", "powerup", "powerup", "munt", "munt"
    ],
    ondergrondX: [                  // x-positie van een ondergrond
      0,    50,   100,  150,  200,  250,  300,  350,  400,  450,                  // ondergrond 1 t/m 10  
      500,  550,  600,  650,  700,  /*750,  800,*/  850,  900,  950,              // ondergrond 11 t/m 20 
      1000, 1050, 1100, 1150, 1200, 1250, 1300, /*1350, 1400, 1450,               // ondergrond 21 t/m 30 
      1500, 1550, 1600, 1650, 1700,*/ 1750, 1800, 1850, 1900, 1950,               // ondergrond 31 t/m 40 
      2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450,                 // ondergrond 41 t/m 50 
      2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 2950,                 // ondergrond 51 t/m 60
      3000, 3050, 3100, 3150, 3200, 3250, 3300, 3350, 3400, 3450,                 // ondergrond 61 t/m 70 
      3500, 3550, 3600, 3650, 3700, 3750, 3800, 3850, 3900, /*3950,               // ondergrond 71 t/m 80 
      4000, 4050, 4100, 4150, 4200, 4250,*/ 4300, 4350, 4400, 4450,               // ondergrond 81 t/m 90 
      4500, 4550, 4600, 4650, 4700, 4750, 4800, /*4850, 4900, 4950,               // ondergrond 91 t/m 100 
      5000, 5050, 5100, 5150, 5200, 5250, 5300, 5350, 5400, 5450,                 // ondergrond 101 t/m 110
      5500, 5550, 5600, 5650, 5700, 5750, 5800, 5850, 5900, 5950,                 // ondergrond 111 t/m 120
      6000, 6050, 6100,*/ 6150, 6200, 6250, 6300, 6350, 6400, 6450,               // ondergrond 121 t/m 130
      6500, 6550, 6600, 6650, 6700, 6750, /*6800, 6850, 6900, 6950,               // ondergrond 131 t/m 140
      7000, 7050, 7100, 7150, 7200, 7250, 7300, */7350, 7400, 7450,               // ondergrond 141 t/m 150
      7500, 7550, 7600, 7650, 7700,/* 7750, 7800, 7850, 7900, 7950,               // ondergrond 151 t/m 160
      8000, 8050, 8100, 8150, 8200,*/ 8250, 8300, 8350, 8400, 8450,               // ondergrond 161 t/m 170
      8500, 8550, 8600, 8650, 8700, 8750, 8800,/* 8850, 8900, 8950,               // ondergrond 171 t/m 180
      9000, 9050, 9100, 9150,*/ 9200, 9250, 9300, 9350, 9400, 9450,               // ondergrond 181 t/m 190
      9500, 9550, 9600, 9650, 9700, 9750, 9800, 9850, 9900, 9950,                 // ondergrond 191 t/m 200
      10000, 10050, 10100, 10150, 10200, 10250, 10300, 10350, 10400, 10450,       // ondergrond 201 t/m 210
      10500, 10550, 10600, 10650, 10700, 10750, 10800, 10850, 10900, 10950,       // ondergrond 211 t/m 220
      11000, 11050, 11100, 11150, 11200, 11250, 11300, 11350, 11400, 11450,       // ondergrond 221 t/m 230
      11500, 11550, 11600, 11650, 11700, 11750, 11800, 11850, 11900, 11950,       // ondergrond 231 t/m 240
      12000, 12050, 12100, 12150, 12200, 12250, 12300, 12350, 12400, 12450,       // ondergrond 241 t/m 250
      12500, 12550, 12600, 12650, 12700, 12750, 12800, 12850, 12900, 12950        // ondergrond 251 t/m 260
    ],
    // goomba:        1     2     3      4      5      6      7
    goombaX:        [1000, 2250, 2550,  3550,  3650,  3750,  3850 ],               // x-positie van een goomba
    goombaY:        [520,  520,  520,   520,   520,   520,   520  ],               // y-positie van een goomba
    goombaPad:      [true, true, false, false, false, false, false],               // goomba beweegt van links naar rechts (true) of andersom (false)
    // koopa:         1      2      3     4
    koopaX:         [2050,  4600,  7100, 8900 ],                                   // x-positie van een koopa
    koopaY:         [520,   520,   200,  200  ],                                   // y-positie van een koopa
    koopaPad:       [false, false, true, false],                                   // koopa beweegt van links naar rechts (true) of andersom (false)
    // bloem:     1     2     3     4     5
    bloemX:     [1114, 2164, 6264, 6464, 6664],                                    // x-positie van een bloem
    bloemY:     [200,  400,  440,  350,  440 ],                                    // y-positie van een bloem
    bloemBegin: [130,  330,  330,  330,  330 ],                                    // beginpositie van een bloem
    bloemEind:  [474,  474,  474,  474,  474 ],                                    // eindpositie van een bloem
    // buis:       1     2     3     4     5     6     7
    buisIngangX: [1100, 2150, 2650, 3850, 6250, 6450, 6650],                       // x-positie van een buis ingang
    buisHoogte:  [300,  100,  50,   50,   100,  100,  100 ],                       // hoogte van een buis
    // lift:     1      2      3      4
    liftX:     [5150,  5500,  7000,  8000 ],                                       // x-positie van een lift
    liftY:     [570,   320,   570,   570  ],                                       // y-positie van een lift
    liftPad:   [false, false, false, false],                                       // lift beweegt van begin naar eind (true) of andersom (false)
    liftBegin: [320,   100,   420,   420  ],                                       // begin positie van een lift
    liftEind:  [570,   320,   620,   620  ],                                       // eind positie van een lift
  };

  level5 = {
    // vloeren:
    platformX: [                    // x-positie van een platform blok
      900,  1600, 1650, 1700, 1800, 1850, 1900, 1950, 2000,
      2050, 2100, 3800, 4700, 4750, 4800, 4850, 4900, 4950,
      5000, 5050, 5100, 5150, 5200, 5250, 5300, 5350, 5400,
      5450, 5500, 5550, 5600, 5650, 5700, 5750, 5800, 5850,
      5900, 5950, 6000, 6050, 6100, 6150, 6200, 6250, 6300,
      6350, 6400, 6450, 7250, 7300, 7350, 7400, 7450, 7500,
      7550, 7600, 7650
    ],
    platformY: [                    // y-positie van een platform blok
      320, 350, 350, 350, 350, 350, 350, 350, 350,
      350, 350, 300, 350, 350, 350, 350, 350, 350, 
      350, 350, 350, 300, 300, 250, 250, 200, 200,
      150, 150, 150, 150, 200, 200, 250, 250, 300,
      300, 350, 350, 350, 350, 350, 350, 350, 350,
      350, 350, 350, 350, 350, 350, 350, 350, 350,
      350, 350, 350
    ],
    hardBlokX: [                    // x-positie van een hardblok
      950, 950, 950, 950, 950,
      
      7750,
      7850,
      7950,
      8050,
      8150,
      8250,
      8350,
      8450,

      9600,
      9650, 9650,
      9700, 9700, 9700,
      9750, 9750, 9750, 9750,
      9800, 9800, 9800, 9800, 9800,
      9850, 9850, 9850, 9850, 9850, 9850,
      9900, 9900, 9900, 9900, 9900, 9900, 9900,
      9950, 9950, 9950, 9950, 9950, 9950, 9950, 9950,
      10000,10000,10000,10000,10000,10000,10000,10000
    ],
    hardBlokY: [                    // y-positie van een hardblok
      520, 470, 420, 370, 320,
      
      350,
      380,
      410,
      440,
      470,
      500,
      530,
      560,

      520,
      520, 470,
      520, 470, 420,
      520, 470, 420, 370,
      520, 470, 420, 370, 320,
      520, 470, 420, 370, 320, 270,
      520, 470, 420, 370, 320, 270, 220,
      520, 470, 420, 370, 320, 270, 220, 170,
      520, 470, 420, 370, 320, 270, 220, 170
    ],
    powerBlokX: [                   // x-positie van een powerblok
      800, 850, 1750, 9000, 9050, 9100
    ], 
    powerBlokY: [                   // y-positie van een powerblok
      320, 320, 350, 350, 350, 350
    ],
    powerBlokInhoud: [              // inhoud van een powerblok
      "munt", "munt", "powerup", "powerup", "munt", "munt"
    ],
    ondergrondX: [                  // x-positie van een ondergrond
      0,    50,   100,  150,  200,  250,  300,  350,  400,  450,                  // ondergrond 1 t/m 10  
      500,  550,  600,  650,  700,  750,  800,  850,  900,  950,                  // ondergrond 11 t/m 20 
      1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450,                 // ondergrond 21 t/m 30 
      1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950,                 // ondergrond 31 t/m 40 
      2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450,                 // ondergrond 41 t/m 50 
      2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 2950,                 // ondergrond 51 t/m 60
      3000, 3050, 3100, 3150, 3200, 3250, 3300, 3350, 3400, 3450,                 // ondergrond 61 t/m 70 
      3500, 3550, 3600, 3650, 3700, 3750, 3800, 3850, 3900, 3950,                 // ondergrond 71 t/m 80 
      4000, 4050, 4100, 4150, 4200, 4250, 4300, 4350, 4400, 4450,                 // ondergrond 81 t/m 90 
      4500, 4550, 4600, 4650, 4700, 4750, 4800, 4850, 4900, 4950,                 // ondergrond 91 t/m 100 
      5000, 5050, 5100, 5150, 5200, 5250, 5300, 5350, 5400, 5450,                 // ondergrond 101 t/m 110
      5500, 5550, 5600, 5650, 5700, 5750, 5800, 5850, 5900, 5950,                 // ondergrond 111 t/m 120
      6000, 6050, 6100, 6150, 6200, 6250, 6300, 6350, 6400, 6450,                 // ondergrond 121 t/m 130
      6500, 6550, 6600, 6650, 6700, 6750, 6800, 6850, /*6900, 6950,               // ondergrond 131 t/m 140
      7000, 7050, 7100, 7150, 7200, 7250, 7300, 7350, 7400, 7450,                 // ondergrond 141 t/m 150
      7500, 7550, 7600, 7650, 7700, 7750, 7800, 7850, 7900, 7950,                 // ondergrond 151 t/m 160
      8000, 8050, 8100, 8150, 8200, 8250, 8300, 8350, 8400, 8450,                 // ondergrond 161 t/m 170
      8500,*/ 8550, 8600, 8650, 8700, 8750, 8800, 8850, 8900, 8950,               // ondergrond 171 t/m 180
      9000, 9050, 9100, 9150, 9200, 9250, 9300, 9350, 9400, 9450,                 // ondergrond 181 t/m 190
      9500, 9550, 9600, 9650, 9700, 9750, 9800, 9850, 9900, 9950,                 // ondergrond 191 t/m 200
      10000, 10050, 10100, 10150, 10200, 10250, 10300, 10350, 10400, 10450,       // ondergrond 201 t/m 210
      10500, 10550, 10600, 10650, 10700, 10750, 10800, 10850, 10900, 10950,       // ondergrond 211 t/m 220
      11000, 11050, 11100, 11150, 11200, 11250, 11300, 11350, 11400, 11450,       // ondergrond 221 t/m 230
      11500, 11550, 11600, 11650, 11700, 11750, 11800, 11850, 11900, 11950,       // ondergrond 231 t/m 240
      12000, 12050, 12100, 12150, 12200, 12250, 12300, 12350, 12400, 12450,       // ondergrond 241 t/m 250
      12500, 12550, 12600, 12650, 12700, 12750, 12800, 12850, 12900, 12950        // ondergrond 251 t/m 260
    ],
    // goomba:        1     2     3     4      5
    goombaX:        [1350, 3800, 3900, 5500,  5600],                              // x-positie van een goomba
    goombaY:        [520,  520,  520,  100,   100 ],                              // y-positie van een goomba
    goombaPad:      [true, true, true, false, true],                              // goomba beweegt van links naar rechts (true) of andersom (false)
    // koopa:         1      2      3     4      5      6
    koopaX:         [1800,  1900,  4750, 6400,  8900,  9000 ],                    // x-positie van een koopa
    koopaY:         [520,   520,   300,  300,   520,   520  ],                    // y-positie van een koopa
    koopaPad:       [false, false, true, false, false, false],                    // koopa beweegt van links naar rechts (true) of andersom (false)
    // bloem:     1     2     3     4     5     6
    bloemX:     [1264, 2914, 3214, 4364, 5514, 8764],                             // x-positie van een bloem
    bloemY:     [400,  400,  400,  400,  400,  400 ],                             // y-positie van een bloem
    bloemBegin: [280,  330,  230,  330,  230,  330 ],                             // beginpositie van een bloem
    bloemEind:  [474,  474,  474,  474,  474,  474 ],                             // eindpositie van een bloem
    // buis:       1     2     3     4     5     6
    buisIngangX: [1250, 2900, 3200, 3700, 4350, 5500, 8750],                      // x-positie van een buis ingang
    buisHoogte:  [150,  100,  200,  50,   100,  200,  100 ],                      // hoogte van een buis
    // lift:     1
    liftX:     [6900 ],                                                           // x-positie van een lift
    liftY:     [570  ],                                                           // y-positie van een lift
    liftPad:   [false],                                                           // lift beweegt van begin naar eind (true) of andersom (false)
    liftBegin: [320  ],                                                           // begin positie van een lift
    liftEind:  [570  ],                                                           // eind positie van een lift
  };

  level6 = {
    // vloeren:
    platformX: [                    // x-positie van een platform blok
      2700, 2750, 2800, 2850, 2900, 2950, 3000, 3050, 3100,
      3150, 3200, 3250, 3300, 3350, 3400, 3450, 3500, 3550,
      3600, 3650, 3700, 3750, 3800, 3850, 3900, 4450, 4650,
      4800, 4900, 5000, 5050, 5150, 6350, 6400, 6450, 6500,
      6550, 6350, 6400, 6450, 6500, 6550, 6600, 6650, 6700,
      6750, 6800, 6850, 6900, 6950
    ],
    platformY: [                    // y-positie van een platform blok
      200, 200, 200, 200, 200, 200, 200, 200,
      200, 200, 200, 200, 200, 200, 200, 200,
      200, 200, 200, 200, 200, 200, 200, 200,
      200, 400, 350, 200, 300, 300, 300, 250,
      250, 250, 250, 250, 250, 100, 100, 100,
      100, 100, 250, 250, 250, 250, 250, 250,
      250, 250
    ],
    hardBlokX: [                    // x-positie van een hardblok
      1100, 
      1150, 1150,
      1200, 1200, 1200,
      1250, 1250, 1250, 1250,
      
      1350, 1350, 1350, 1350, 1350, 1350,
      1400, 1400, 1400, 1400, 1400, 1400, 1400,
      1450, 1450, 1450, 1450, 1450, 1450, 1450, 1450,
      1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500
    ],
    hardBlokY: [                    // y-positie van een hardblok
      520,
      520, 470,
      520, 470, 420,
      520, 470, 420, 370,
      
      520, 470, 420, 370, 320, 270,
      520, 470, 420, 370, 320, 270, 220,
      520, 470, 420, 370, 320, 270, 220, 170,
      520, 470, 420, 370, 320, 270, 220, 170
    ],
    powerBlokX: [                   // x-positie van een powerblok
      1950, 2000, 2050, 4900, 6750, 6900
    ],
    powerBlokY: [                   // y-positie van een powerblok
      350, 350, 350, 100, 100, 100
    ],
    powerBlokInhoud: [              // inhoud van een powerblok
      "munt", "powerup", "munt", "powerup", "munt", "munt"
    ],
    ondergrondX: [                  // x-positie van een ondergrond
      0,    50,   100,  150,  200,  250,  300,  350,  400,  450,                      // ondergrond 1 t/m 10  
      500,  550,  600,  650,  700,  750,  800,  850,  900,  950,                      // ondergrond 11 t/m 20 
      /*1000,*/ 1050, 1100, 1150, 1200, 1250, /*1300,*/ 1350, 1400, 1450,             // ondergrond 21 t/m 30 
      1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950,                     // ondergrond 31 t/m 40 
      2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450,                     // ondergrond 41 t/m 50 
      2500, 2550, 2600, 2650, 2700, 2750, /*2800, 2850,*/ 2900, 2950,                 // ondergrond 51 t/m 60
      3000, 3050, /*3100, 3150,*/ 3200, /*3250, 3300,*/ 3350, 3400, 3450,             // ondergrond 61 t/m 70 
      /*3500, 3550,*/ 3600, 3650, 3700, 3750, 3800, 3850, 3900, 3950,                 // ondergrond 71 t/m 80 
      4000, 4050, 4100, 4150, 4200, 4250, 4300, 4350, 4400, 4450,                     // ondergrond 81 t/m 90 
      4500, 4550, 4600, 4650, 4700, 4750, 4800, 4850, 4900, 4950,                     // ondergrond 91 t/m 100 
      5000, 5050, 5100, 5150, 5200, 5250, 5300, 5350, 5400, 5450,                     // ondergrond 101 t/m 110
      5500, 5550, 5600, /*5650, 5700, 5750, 5800, 5850, 5900, 5950,                   // ondergrond 111 t/m 120
      6000, 6050, 6100, 6150, 6200, 6250, 6300, 6350, 6400, 6450,                     // ondergrond 121 t/m 130
      6500, 6550, 6600, 6650, 6700, 6750, 6800, 6850, 6900, 6950,                     // ondergrond 131 t/m 140
      7000, 7050, 7100, 7150, 7200, 7250, 7300, 7350, 7400,*/ 7450,                   // ondergrond 141 t/m 150
      7500, 7550, 7600, 7650, 7700, 7750, 7800, 7850, 7900, 7950,                     // ondergrond 151 t/m 160
      8000, 8050, 8100, 8150, 8200, 8250, 8300, 8350, 8400, 8450,                     // ondergrond 161 t/m 170
      8500, 8550, 8600, 8650, 8700, 8750, /*8800, 8850,*/ 8900, 8950,                 // ondergrond 171 t/m 180
      /*9000, 9050,*/ 9100, 9150, /*9200, 9250,*/ 9300, 9350, /*9400, 9450,*/         // ondergrond 181 t/m 190
      9500, 9550, /*9600, 9650,*/ 9700, 9750, /*9800, 9850, 9900, */9950,             // ondergrond 191 t/m 200
      10000, /*10050, 10100, 10150, 10200, 10250,*/ 10300, 10350, 10400, 10450,       // ondergrond 201 t/m 210
      10500, 10550, 10600, 10650, 10700, 10750, 10800, 10850, 10900, 10950,           // ondergrond 211 t/m 220
      11000, 11050, 11100, 11150, 11200, 11250, 11300, 11350, 11400, 11450,           // ondergrond 221 t/m 230
      11500, 11550, 11600, 11650, 11700, 11750, 11800, 11850, 11900, 11950,           // ondergrond 231 t/m 240
      12000, 12050, 12100, 12150, 12200, 12250, 12300, 12350, 12400, 12450,           // ondergrond 241 t/m 250
      12500, 12550, 12600, 12650, 12700, 12750, 12800, 12850, 12900, 12950            // ondergrond 251 t/m 260
    ],
    // goomba:        1     2     3      4      5     6      7     8      9     10    11     12     13
    goombaX:        [1700, 1800, 2100,  2200,  2850, 3200,  3400, 3500,  3600, 4150, 4250,  8000,  8100 ],        // x-positie van een goomba
    goombaY:        [520,  520,  520,   520,   150,  150,   150,  150,   520,  520,  520,   520,   520  ],        // y-positie van een goomba
    goombaPad:      [true, true, false, false, true, false, true, false, true, true, false, false, false],        // goomba beweegt van links naar rechts (true) of andersom (false)
    // koopa:         1      2      3      4      5     6
    koopaX:         [850,   950,   5200,  5100,  7600, 7700],                                                     // x-positie van een koopa
    koopaY:         [520,   520,   520,   520,   520,  520],                                                      // y-positie van een koopa
    koopaPad:       [false, false, false, false, true, true],                                                     // koopa beweegt van links naar rechts (true) of andersom (false)
    // bloem:     1     2     3     4     5     6     7     8     9     10    11    12
    bloemX:     [1564, 2314, 4064, 5364, 5564, 8714, 8914, 9114, 9314, 9514, 9714, 9964],                         // x-positie van een bloem
    bloemY:     [400,  400,  400,  400,  400,  400,  400,  400,  400,  400,  400,  400 ],                         // y-positie van een bloem
    bloemBegin: [380,  230,  280,  230,  130,  380,  330,  280,  230,  180,  130,  80  ],                         // beginpositie van een bloem
    bloemEind:  [474,  474,  474,  474,  474,  474,  474,  474,  474,  474,  474,  474 ],                         // eindpositie van een bloem
    // buis:       1     2     3     4     5     6     7     8     9     10    11    12    13
    buisIngangX: [1550, 2300, 4050, 5350, 5550, 7500, 8700, 8900, 9100, 9300, 9500, 9700, 9950],                  // x-positie van een buis ingang
    buisHoogte:  [50,   200,  150,  200,  300,  150,  50,   100,  150,  200,  250,  300,  350 ],                  // hoogte van een buis
    // lift:     1
    liftX:     [6100 ],                                                                                           // x-positie van een lift
    liftY:     [570  ],                                                                                           // y-positie van een lift
    liftPad:   [false],                                                                                           // lift beweegt van begin naar eind (true) of andersom (false)
    liftBegin: [230  ],                                                                                           // begin positie van een lift
    liftEind:  [570  ],                                                                                           // eind positie van een lift
  };

  wereld1 = [standaardLevel, level1, level2, level3, level4, level5, level6];         // een array met alle levels van wereld 1
  huidigLevel = wereld1[levelGeselecteerd];                   // het huidige level wordt gelijkgesteld aan het level dat geselecteerd is
  
  // globale variabelen (die level specifiek zijn) worden bijgewerkt naar het huidige level:

  platform.x = huidigLevel.platformX;                         // x-positie van een platform
  platform.y = huidigLevel.platformY;                         // y-positie van een platform
  hardBlok.x = huidigLevel.hardBlokX;                         // x-positie van een hardblok
  hardBlok.y = huidigLevel.hardBlokY;                         // y-positie van een hardblok
  powerBlok.x = huidigLevel.powerBlokX;                       // x-positie van een powerblok
  powerBlok.y = huidigLevel.powerBlokY;                       // y-positie van een powerblok
  powerBlok.inhoud = huidigLevel.powerBlokInhoud;             // inhoud van de powerblokken (munt of powerup)
  ondergrond.x = huidigLevel.ondergrondX;                     // x-positie van een ondergrond
  goomba.x = huidigLevel.goombaX;                             // x-positie van een goomba
  goomba.y = huidigLevel.goombaY;                             // y-positie van een goomba
  goomba.pad = huidigLevel.goombaPad;                         // houdt bij of een goomba naar links of rechts gaat
  koopa.x = huidigLevel.koopaX;                               // x-positie van een koopa
  koopa.y = huidigLevel.koopaY;                               // y-positie van een koopa
  koopa.pad = huidigLevel.koopaPad;                           // houdt bij of een koopa naar links of rechts gaat
  bloem.x = huidigLevel.bloemX;                               // x-positie van een bloem
  bloem.y = huidigLevel.bloemY;                               // y-positie van een bloem
  bloem.begin = huidigLevel.bloemBegin;                       // beginpositie van een bloem
  bloem.eind = huidigLevel.bloemEind;                         // eindpositie van een bloem  
  buis.ingangX = huidigLevel.buisIngangX;                     // x-positie van een buisingang
  buis.hoogte = huidigLevel.buisHoogte;                       // hoogte van een buis
  lift.x = huidigLevel.liftX;                                 // x-positie van een lift
  lift.y = huidigLevel.liftY;                                 // y-positie van een lift
  lift.pad = huidigLevel.liftPad;                             // houdt bij of een lift naar boven of beneden gaat
  lift.begin = huidigLevel.liftBegin;                         // beginpositie van een lift
  lift.eind = huidigLevel.liftEind;                           // eindpositie van een lift

  // pauze:
  pauze = false;                                              // spel is standaard niet gepauzeerd

  // alle geluiden dempen:
  geluidenDempen = false;                                     // geluiden zijn standaard niet gedempt

  // alle geluiden resetten (geleerd van: https://www.w3schools.com/tags/ref_av_dom.asp)
  algemeenMuziekje.pause();                                   // algemeen muziekje wordt gepauzeerd
  breekBlok_geluid.pause();                                   // breekblok geluid wordt gepauzeerd
  botsing_geluid.pause();                                     // botsing geluid wordt gepauzeerd
  muntjeOpgepakt_geluid.pause();                              // muntje opgepakt geluid wordt gepauzeerd
  powerupOpgepakt_geluid.pause();                             // powerup opgepakt geluid wordt gepauzeerd
  vuurbal_geluid.pause();                                     // vuurbal geluid wordt gepauzeerd
  finishStokGlijden_geluid.pause();                           // finishstok glijden geluid wordt gepauzeerd
  gameover_geluid.pause();                                    // gameover geluid wordt gepauzeerd
  springenKlein_geluid.pause();                               // klein spring geluid wordt gepauzeerd
  springenGroot_geluid.pause();                               // groot spring geluid wordt gepauzeerd
  spelerDood_geluid.pause();                                  // speler dood geluid wordt gepauzeerd
  vijandGedood_geluid.pause();                                // goomba gedood geluid wordt gepauzeerd
  spelGepauzeerd_geluid.pause();                              // spel gepauzeerd geluid wordt gepauzeerd
  spelerGeraakt_geluid.pause();                               // speler door buis geluid wordt gepauzeerd
  powerupVerschijnt_geluid.pause();                           // powerup verschijnt geluid wordt gepauzeerd
  levelVoltooid_geluid.pause();                               // level voltooid geluid wordt gepauzeerd
  tijdBijnaVoorbij_geluid.pause();                            // tijd bijna voorbij geluid wordt gepauzeerd
  wereldVoltooid_geluid.pause();                              // wereld voltooid geluid wordt gepauzeerd

  algemeenMuziekje.currentTime = 0;                           // zet het algemene muziekje terug naar het begin
  breekBlok_geluid.currentTime = 0;                           // zet het breekblok geluid terug naar het begin
  botsing_geluid.currentTime = 0;                             // zet het botsing geluid terug naar het begin
  muntjeOpgepakt_geluid.currentTime = 0;                      // zet het muntje opgepakt geluid terug naar het begin
  powerupOpgepakt_geluid.currentTime = 0;                     // zet het powerup opgepakt geluid terug naar het begin
  vuurbal_geluid.currentTime = 0;                             // zet het vuurbal geluid terug naar het begin
  finishStokGlijden_geluid.currentTime = 0;                   // zet het finish stok glijden geluid terug naar het begin
  gameover_geluid.currentTime = 0;                            // zet het gameover geluid terug naar het begin
  springenKlein_geluid.currentTime = 0;                       // zet het kleine spring geluid terug naar het begin
  springenGroot_geluid.currentTime = 0;                       // zet het grote spring geluid terug naar het begin
  spelerDood_geluid.currentTime = 0;                          // zet het speler dood geluid terug naar het begin
  vijandGedood_geluid.currentTime = 0;                        // zet het goomba gedood geluid terug naar het begin
  spelGepauzeerd_geluid.currentTime = 0;                      // zet het spel gepauzeerd geluid terug naar het begin
  spelerGeraakt_geluid.currentTime = 0;                       // zet het speler door buis geluid terug naar het begin
  powerupVerschijnt_geluid.currentTime = 0;                   // zet het powerup verschijnt geluid terug naar het begin
  levelVoltooid_geluid.currentTime = 0;                       // zet het level voltooid geluid terug naar het begin
  tijdBijnaVoorbij_geluid.currentTime = 0;                    // zet het tijd bijna voorbij geluid terug naar het begin
  wereldVoltooid_geluid.currentTime = 0;                      // zet het wereld voltooid geluid terug naar het begin

  superMarioBrosLogoX = 200;                                  // x-positie van het Super Mario Bros logo

  // wolken:
  wolkenX = [                                                 // x-positie van de wolken
    0, wolkenBreedte, wolkenBreedte*2, wolkenBreedte*3, wolkenBreedte*4, wolkenBreedte*5, wolkenBreedte*6, 
  ];
  wolkenY = 45;                                               // y-positie van de wolken

  // speler gerelateerd:
  if (cheatsActief === true) {                                // als de cheats  actief zijn
    speler.levens = Infinity;                                 // speler heeft oneindig veel levens
    speler.kanGeraaktWorden = false;                          // speler kan niet geraakt worden
    speler.snelheid = 10;                                     // speler rent 2x zo snel
    tijd = 3600;                                              // tijd is 3600 seconden (1 uur)
  }
  else {
    speler.levens = 1;                                        // speler heeft 1 leven
    speler.kanGeraaktWorden = true;                           // speler kan geraakt worden
    speler.snelheid = 5;                                      // speler rent normaal
    tijd = 150;                                               // tijd is 150 seconden
  }
  speler.x = 0;                                               // x-positie van de speler wordt gereset naar 0
  speler.y = ondergrond.y[2] - speler.hoogte;                 // y-positie van de speler wordt gereset naar op de grond
  speler.kijkRichting = "rechts";                             // kijkrichting van de speler wordt gereset naar rechts
  speler.beweegt = "niet";                                    // speler beweegt standaard niet
  speler.knipperTijd = 0;                                     // knipper tijd van de speler wordt gereset naar 0 
  speler.knippert = false;                                    // speler knippert standaard niet
  speler.opGoomba = false;                                    // speler staat standaard niet op een goomba
  speler.isGeraakt = false;                                   // speler is standaard niet geraakt
  speler.leeft = true;                                        // speler leeft standaard
  speler.status = "Mario";                                    // speler is standaard Mario
  speler.renAnimatieR = [                                     // animatie van de speler als hij naar rechts rent
    speler.lopenRechtsX, speler.lopenRechtsX, speler.lopenRechtsX, speler.lopenRechtsX, speler.lopenRechtsX, speler.lopenRechtsX, speler.lopenRechtsX, speler.lopenRechtsX, 
    speler.rennenRechtsX, speler.rennenRechtsX, speler.rennenRechtsX, speler.rennenRechtsX, speler.rennenRechtsX, speler.rennenRechtsX, speler.rennenRechtsX, speler.rennenRechtsX
  ];
  speler.renAnimatieL = [                                     // animatie van de speler als hij naar links rent
    speler.lopenLinksX, speler.lopenLinksX, speler.lopenLinksX, speler.lopenLinksX, speler.lopenLinksX, speler.lopenLinksX, speler.lopenLinksX, speler.lopenLinksX, 
    speler.rennenLinksX, speler.rennenLinksX, speler.rennenLinksX, speler.rennenLinksX, speler.rennenLinksX, speler.rennenLinksX, speler.rennenLinksX, speler.rennenLinksX
  ];
  speler.knippertAnimatieL = [                                // animatie van de speler als hij naar links knippert
    // staand knipperen:
    speler.staanSpriteLX, speler.staanSpriteLX, speler.staanSpriteLX, speler.staanSpriteLX, speler.staanSpriteLX, speler.staanSpriteLX, speler.staanSpriteLX, speler.staanSpriteLX, 
    149, 149, 149,
    speler.staanSpriteLX, speler.staanSpriteLX, speler.staanSpriteLX, speler.staanSpriteLX, speler.staanSpriteLX, speler.staanSpriteLX, speler.staanSpriteLX, speler.staanSpriteLX,

    // lopend en rennend knipperen:
    speler.lopenLinksX, speler.lopenLinksX, speler.lopenLinksX, speler.lopenLinksX, speler.lopenLinksX, speler.lopenLinksX, speler.lopenLinksX, speler.lopenLinksX, 
    149, 149, 149,
    speler.rennenLinksX, speler.rennenLinksX, speler.rennenLinksX, speler.rennenLinksX, speler.rennenLinksX, speler.rennenLinksX, speler.rennenLinksX, speler.rennenLinksX,

    // springend knipperen:
    speler.springenSpriteLX, speler.springenSpriteLX, speler.springenSpriteLX, speler.springenSpriteLX, speler.springenSpriteLX, speler.springenSpriteLX, speler.springenSpriteLX, speler.springenSpriteLX, 
    149, 149, 149,
    speler.springenSpriteLX, speler.springenSpriteLX, speler.springenSpriteLX, speler.springenSpriteLX, speler.springenSpriteLX, speler.springenSpriteLX, speler.springenSpriteLX, speler.springenSpriteLX
  ];
  speler.knippertAnimatieR = [                                // animatie van de speler als hij naar rechts knippert
    // staand knipperen:
    speler.staanSpriteRX, speler.staanSpriteRX, speler.staanSpriteRX, speler.staanSpriteRX, speler.staanSpriteRX, speler.staanSpriteRX, speler.staanSpriteRX, speler.staanSpriteRX, 
    264, 264, 264,
    speler.staanSpriteRX, speler.staanSpriteRX, speler.staanSpriteRX, speler.staanSpriteRX, speler.staanSpriteRX, speler.staanSpriteRX, speler.staanSpriteRX, speler.staanSpriteRX,

    // lopend en rennend knipperen:
    speler.lopenRechtsX, speler.lopenRechtsX, speler.lopenRechtsX, speler.lopenRechtsX, speler.lopenRechtsX, speler.lopenRechtsX, speler.lopenRechtsX, speler.lopenRechtsX, 
    264, 264, 264,
    speler.rennenRechtsX, speler.rennenRechtsX, speler.rennenRechtsX, speler.rennenRechtsX, speler.rennenRechtsX, speler.rennenRechtsX, speler.rennenRechtsX, speler.rennenRechtsX,

    // springend knipperen:
    speler.springenSpriteRX, speler.springenSpriteRX, speler.springenSpriteRX, speler.springenSpriteRX, speler.springenSpriteRX, speler.springenSpriteRX, speler.springenSpriteRX, speler.springenSpriteRX, 
    264, 264, 264,
    speler.springenSpriteRX, speler.springenSpriteRX, speler.springenSpriteRX, speler.springenSpriteRX, speler.springenSpriteRX, speler.springenSpriteRX, speler.springenSpriteRX, speler.springenSpriteRX
  ];
  speler.klimtAnimatie = [                                    // animatie van de speler als hij klimt
    speler.opFinishpaalSprite1X, speler.opFinishpaalSprite1X, speler.opFinishpaalSprite1X, speler.opFinishpaalSprite1X, speler.opFinishpaalSprite1X, speler.opFinishpaalSprite1X, speler.opFinishpaalSprite1X, speler.opFinishpaalSprite1X,
    speler.opFinishpaalSprite2X, speler.opFinishpaalSprite2X, speler.opFinishpaalSprite2X, speler.opFinishpaalSprite2X, speler.opFinishpaalSprite2X, speler.opFinishpaalSprite2X, speler.opFinishpaalSprite2X, speler.opFinishpaalSprite2X
  ];
  speler.animatieLengte = 0;                                  // de lengte van de animatie van de speler wordt gereset naar 0

  // springen:
  speler.springt = false;                                     // speler springt standaard niet
  speler.springSnelheid = 0;                                  // de snelheid waarmee de speler springt wordt gereset naar 0
  speler.valt = false;                                        // speler valt standaard niet

  // knoppen:
  speler.springKnopIngedruktNu = false;                       // houdt bij of een springknop nu is ingedrukt
  speler.springKnopIngedruktVorige = false;                   // houdt bij of een springknop vorige keer was ingedrukt
  speler.schietKnopIngedruktNu = false;                       // houdt bij of een schietknop nu is ingedrukt
  speler.schietKnopIngedruktVorige = false;                   // houdt bij of een schietknop vorige keer was ingedrukt
  speler.pauzeKnopIngedruktNu = false;                        // houdt bij of een pauzeknop nu is ingedrukt
  speler.pauzeKnopIngedruktVorige = false;                    // houdt bij of een pauzeknop vorige keer was ingedrukt
  speler.geluidKnopIngedruktNu = false;                       // houdt bij of een geluidsknop nu is ingedrukt
  speler.geluidKnopIngedruktVorige = false;                   // houdt bij of een geluidsknop vorige keer was ingedrukt

  // vuurbal gerelateerd:
  vuurbal.x = [];                                             // x-positie van een vuurbal
  vuurbal.y = [];                                             // y-positie van een vuurbal
  vuurbal.hoogte = 23;                                        // hoogte van een vuurbal
  vuurbal.breedte = 17;                                       // breedte van een vuurbal
  vuurbal.richting = [];                                      // richting van een vuurbal
  vuurbal.explodeert = [];                                    // houdt bij of een vuurbal explodeert
  vuurbal.stuitert = [];                                      // houdt bij of een vuurbal stuitert
  vuurbal.stuiterSnelheid = [];                               // de snelheid waarmee een vuurbal stuitert
  vuurbal.stuiterHoogte = 5;                                  // de hoogte waarmee een vuurbal stuitert
  vuurbal.animatieX = [                                       // animatie van een vuurbal
    vuurbal.linksSpriteX, vuurbal.linksSpriteX, vuurbal.linksSpriteX, vuurbal.linksSpriteX, vuurbal.linksSpriteX, vuurbal.linksSpriteX, vuurbal.linksSpriteX, vuurbal.linksSpriteX,
    vuurbal.rechtsSpriteX, vuurbal.rechtsSpriteX, vuurbal.rechtsSpriteX, vuurbal.rechtsSpriteX, vuurbal.rechtsSpriteX, vuurbal.rechtsSpriteX, vuurbal.rechtsSpriteX, vuurbal.rechtsSpriteX,
    vuurbal.linksSpriteX, vuurbal.linksSpriteX, vuurbal.linksSpriteX, vuurbal.linksSpriteX, vuurbal.linksSpriteX, vuurbal.linksSpriteX, vuurbal.linksSpriteX, vuurbal.linksSpriteX, 
    vuurbal.rechtsSpriteX, vuurbal.rechtsSpriteX, vuurbal.rechtsSpriteX, vuurbal.rechtsSpriteX, vuurbal.rechtsSpriteX, vuurbal.rechtsSpriteX, vuurbal.rechtsSpriteX, vuurbal.rechtsSpriteX,
  ];
  vuurbal.animatieY = [                                       // animatie van een vuurbal
    vuurbal.bovenSpriteY, vuurbal.bovenSpriteY, vuurbal.bovenSpriteY, vuurbal.bovenSpriteY, vuurbal.bovenSpriteY, vuurbal.bovenSpriteY, vuurbal.bovenSpriteY, vuurbal.bovenSpriteY, 
    vuurbal.bovenSpriteY, vuurbal.bovenSpriteY, vuurbal.bovenSpriteY, vuurbal.bovenSpriteY, vuurbal.bovenSpriteY, vuurbal.bovenSpriteY, vuurbal.bovenSpriteY, vuurbal.bovenSpriteY, 
    vuurbal.onderSpriteY, vuurbal.onderSpriteY, vuurbal.onderSpriteY, vuurbal.onderSpriteY, vuurbal.onderSpriteY, vuurbal.onderSpriteY, vuurbal.onderSpriteY, vuurbal.onderSpriteY, 
    vuurbal.onderSpriteY, vuurbal.onderSpriteY, vuurbal.onderSpriteY, vuurbal.onderSpriteY, vuurbal.onderSpriteY, vuurbal.onderSpriteY, vuurbal.onderSpriteY, vuurbal.onderSpriteY, 
  ];
  vuurbal.explosieAnimatie = [                                // animatie van een vuurbal als hij explodeert
    vuurbal.explosieSmallSpriteX, vuurbal.explosieSmallSpriteX, vuurbal.explosieSmallSpriteX, vuurbal.explosieSmallSpriteX, vuurbal.explosieSmallSpriteX, vuurbal.explosieSmallSpriteX, vuurbal.explosieSmallSpriteX, vuurbal.explosieSmallSpriteX, vuurbal.explosieSmallSpriteX, vuurbal.explosieSmallSpriteX,  vuurbal.explosieSmallSpriteX,  vuurbal.explosieSmallSpriteX,  
    vuurbal.explosieMediumSpriteX, vuurbal.explosieMediumSpriteX, vuurbal.explosieMediumSpriteX, vuurbal.explosieMediumSpriteX, vuurbal.explosieMediumSpriteX, vuurbal.explosieMediumSpriteX, vuurbal.explosieMediumSpriteX, vuurbal.explosieMediumSpriteX, vuurbal.explosieMediumSpriteX, vuurbal.explosieMediumSpriteX, vuurbal.explosieMediumSpriteX, vuurbal.explosieMediumSpriteX, 
    vuurbal.explosieLargeSpriteX, vuurbal.explosieLargeSpriteX, vuurbal.explosieLargeSpriteX, vuurbal.explosieLargeSpriteX, vuurbal.explosieLargeSpriteX, vuurbal.explosieLargeSpriteX,vuurbal.explosieLargeSpriteX, vuurbal.explosieLargeSpriteX, vuurbal.explosieLargeSpriteX,  vuurbal.explosieLargeSpriteX,  vuurbal.explosieLargeSpriteX,  vuurbal.explosieLargeSpriteX,  
  ];
  vuurbal.animatieLengte = 0;                                 // lengte van de animatie van een vuurbal

  // goomba gerelateerd:
  goomba.doodTijd = [];                                       // goomba doodtijd array wordt geleegd
  goomba.valt = [];                                           // goomba valt array wordt geleegd
  goomba.leeft = [];                                          // goomba leeft array wordt geleegd
  goomba.snelheid = [];                                       // goomba snelheid array wordt geleegd
  for (var i = 0; i < goomba.y.length; i++) {
    goomba.doodTijd.push(0);                                  // goomba doodtijd array wordt gevuld met 0
    goomba.valt.push(false);                                  // goomba valt array wordt gevuld met false
    goomba.leeft.push(true);                                  // goomba leeft array wordt gevuld met true
    goomba.snelheid.push(0);                                  // goomba snelheid array wordt gevuld met 0 (goomba beweegt standaard niet, pas als mario in de buurt komt)
  }
  goomba.renAnimatie = [                                      // animatie van de goomba als hij rent
    goomba.linkerpoot, goomba.linkerpoot, goomba.linkerpoot, goomba.linkerpoot, goomba.linkerpoot, goomba.linkerpoot, goomba.linkerpoot, goomba.linkerpoot, 
    goomba.rechterpoot, goomba.rechterpoot, goomba.rechterpoot, goomba.rechterpoot, goomba.rechterpoot, goomba.rechterpoot, goomba.rechterpoot, goomba.rechterpoot
  ];
  goomba.animatieLengte = 0;                                  // de lengte van de animatie van de goomba wordt gereset naar 0

  // koopa gerelateerd:
  koopa.valt = [];                                            // koopa valt array wordt geleegd
  koopa.inSchild = [];                                        // koopa leeft array wordt geleegd
  koopa.leeft = [];                                           // koopa leeft array wordt geleegd
  koopa.snelheid = [];                                        // koopa snelheid array wordt geleegd
  for (var i = 0; i < koopa.y.length; i++) {
    koopa.valt.push(false);                                   // koopa valt array wordt gevuld met false
    koopa.inSchild.push(false);                               // koopa leeft array wordt gevuld met false
    koopa.leeft.push(true);                                   // koopa leeft array wordt gevuld met true
    koopa.snelheid.push(0);                                   // koopa snelheid array wordt gevuld met 0
  }
  koopa.renAnimatieR = [                                     // animatie van de koopa als hij naar rechts rent
    koopa.lopenRechtsX, koopa.lopenRechtsX, koopa.lopenRechtsX, koopa.lopenRechtsX, koopa.lopenRechtsX, koopa.lopenRechtsX, koopa.lopenRechtsX, koopa.lopenRechtsX, 
    koopa.rennenRechtsX, koopa.rennenRechtsX, koopa.rennenRechtsX, koopa.rennenRechtsX, koopa.rennenRechtsX, koopa.rennenRechtsX, koopa.rennenRechtsX, koopa.rennenRechtsX
  ];
  koopa.renAnimatieL = [                                     // animatie van de koopa als hij naar links rent
    koopa.lopenLinksX, koopa.lopenLinksX, koopa.lopenLinksX, koopa.lopenLinksX, koopa.lopenLinksX, koopa.lopenLinksX, koopa.lopenLinksX, koopa.lopenLinksX, 
    koopa.rennenLinksX, koopa.rennenLinksX, koopa.rennenLinksX, koopa.rennenLinksX, koopa.rennenLinksX, koopa.rennenLinksX, koopa.rennenLinksX, koopa.rennenLinksX
  ];
  koopa.tollenAnimatie = [                                   // animatie van de koopa als hij tolt
    koopa.schelpZP, koopa.schelpZP, koopa.schelpZP, koopa.schelpZP, koopa.schelpZP, koopa.schelpZP, koopa.schelpZP, koopa.schelpZP, 
    koopa.schelpMP, koopa.schelpMP, koopa.schelpMP, koopa.schelpMP, koopa.schelpMP, koopa.schelpMP, koopa.schelpMP, koopa.schelpMP
  ];
  koopa.animatieLengte = 0;                                  // de lengte van de animatie van de koopa wordt gereset naar 0
  
  // munt gerelateerd
  munt.x = [];
  munt.y = [];

  // bloem gerelateerd:
  bloem.leeft = [];                                           // bloem leeft array wordt geleegd
  bloem.wachtTijd = [];                                       // bloem wachttijd array wordt geleegd
  bloem.pad = [];                                             // bloem pad array wordt geleegd
  for (var i = 0; i < bloem.y.length; i++) {
    bloem.leeft.push(true);                                   // bloem leeft array wordt gevuld met true
    bloem.wachtTijd.push(0);                                  // bloem wachttijd array wordt gevuld met 0
    bloem.pad.push(true);                                    // bloem pad array wordt gevuld met true
  }
  bloem.bijtAnimatie = [                                      // animatie van de bloem
    bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen, bloem.mondOpen,
    bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht,  bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht, bloem.mondDicht
  ];
  bloem.animatieLengte = 0;                                   // de lengte van de animatie van de bloem wordt gereset naar 0

  // munt gerelateerd:
  munt.animatie = [                                           // animatie van de munt
    munt.sprite1, munt.sprite1, munt.sprite1, munt.sprite1, munt.sprite1, munt.sprite1, munt.sprite1, munt.sprite1,
    munt.sprite2, munt.sprite2, munt.sprite2, munt.sprite2, munt.sprite2, munt.sprite2, munt.sprite2, munt.sprite2,
    munt.sprite3, munt.sprite3, munt.sprite3, munt.sprite3, munt.sprite3, munt.sprite3, munt.sprite3, munt.sprite3,
    munt.sprite4, munt.sprite4, munt.sprite4, munt.sprite4, munt.sprite4, munt.sprite4, munt.sprite4, munt.sprite4,
    munt.sprite5, munt.sprite5, munt.sprite5, munt.sprite5, munt.sprite5, munt.sprite5, munt.sprite5, munt.sprite5,
    munt.sprite6, munt.sprite6, munt.sprite6, munt.sprite6, munt.sprite6, munt.sprite6, munt.sprite6, munt.sprite6
  ];
  munt.animatieLengte = 0;                                    // de lengte van de animatie van de munt wordt gereset naar 0

  // buis gerelateerd:
  buis.x = [];                                                // x-posities van de buizen worden gereset naar een lege array
  buis.ingangY = [];                                          // y-posities van de ingangen van de buizen worden gereset naar een lege array
  for (var i = 0; i < buis.ingangX.length; i++) {
    buis.x.push(buis.ingangX[i] + 6);                       // x-posities van de buizen worden toegevoegd aan de array
    buis.ingangY.push(buis.y - buis.hoogte[i]);             // y-posities van de ingangen van de buizen worden toegevoegd aan de array
  }

  // platformen:
  platform.standaardPositie = [];                             // standaard y-posities van de platformen worden gereset naar een lege array
  platform.stuitertPositie = [];                              // stuiter y-posities van de platformen worden gereset naar een lege array
  platform.stuiterTijd = [];                                  // stuiter tijden van de platformen worden gereset naar een lege array
  for (var i = 0; i < platform.y.length; i++) {
    platform.standaardPositie.push(platform.y[i]);                       // standaard y-posities van de platformen worden toegevoegd aan de array
    platform.stuitertPositie.push(platform.y[i] - platform.hoogte/3);    // stuiter y-posities van de platformen worden toegevoegd aan de array
    platform.stuiterTijd.push(0);                                        // stuiter tijden van de platformen worden toegevoegd aan de array
  }

  // powerblokken:
  powerBlok.standaardPositie = [];                            // standaard y-posities van de powerblokken worden gereset naar een lege array
  powerBlok.stuitertPositie = [];                             // stuiter y-posities van de powerblokken worden gereset naar een lege array
  powerBlok.stuiterTijd = [];                                 // stuiter tijden van de powerblokken worden gereset naar een lege array
  powerBlok.gebruikt = [];                                    // of de powerblokken gebruikt zijn wordt gereset naar een lege array
  for (var i = 0; i < powerBlok.y.length; i++) {
    powerBlok.standaardPositie.push(powerBlok.y[i]);                     // standaard y-posities van de powerblokken worden toegevoegd aan de array
    powerBlok.stuitertPositie.push(powerBlok.y[i] - powerBlok.hoogte/3); // stuiter y-posities van de powerblokken worden toegevoegd aan de array
    powerBlok.stuiterTijd.push(0);                                       // stuiter tijden van de powerblokken worden toegevoegd aan de array
    powerBlok.gebruikt.push(false);                                      // of de powerblokken gebruikt zijn wordt toegevoegd aan de array
  }

  powerBlok.animatie = [                                      // animatie van het powerup blok
    powerBlok.sprite1, powerBlok.sprite1, powerBlok.sprite1, powerBlok.sprite1, powerBlok.sprite1, powerBlok.sprite1, powerBlok.sprite1, powerBlok.sprite1, powerBlok.sprite1,
    powerBlok.sprite2, powerBlok.sprite2, powerBlok.sprite2, powerBlok.sprite2, powerBlok.sprite2, powerBlok.sprite2, powerBlok.sprite2, powerBlok.sprite2, powerBlok.sprite2,
    powerBlok.sprite3, powerBlok.sprite3, powerBlok.sprite3, powerBlok.sprite3, powerBlok.sprite3, powerBlok.sprite3, powerBlok.sprite3, powerBlok.sprite3, powerBlok.sprite3,
    powerBlok.sprite2, powerBlok.sprite2, powerBlok.sprite2, powerBlok.sprite2, powerBlok.sprite2, powerBlok.sprite2, powerBlok.sprite2, powerBlok.sprite2, powerBlok.sprite2,
    powerBlok.sprite1, powerBlok.sprite1, powerBlok.sprite1, powerBlok.sprite1, powerBlok.sprite1, powerBlok.sprite1, powerBlok.sprite1, powerBlok.sprite1, powerBlok.sprite1
  ];
  powerBlok.animatieLengte = 0;                               // de lengte van de animatie van de het powerup blok wordt gereset naar 0

  // powerups:
  powerup.x = [];
  powerup.y = [];
  powerup.valt = [];
  powerup.pad = [];
  powerup.soort = [];

  powerup.animatie = [                                        // animatie van Fire Flower
    powerup.sprite1, powerup.sprite1, powerup.sprite1, powerup.sprite1,
    powerup.sprite2, powerup.sprite2, powerup.sprite2, powerup.sprite2,
    powerup.sprite3, powerup.sprite3, powerup.sprite3, powerup.sprite3,
    powerup.sprite4, powerup.sprite4, powerup.sprite4, powerup.sprite4
  ];
  powerup.animatieLengte = 0;                                 // de lengte van de animatie van Fire Flower wordt gereset naar 0

  // finish
  finishTopX = 10454;                                             // x-positie van de finishTop
  finishTopY = 100;                                               // y-positie van de finishTop
  finishStokX = finishTopX + finishTopBreedte/2.4;                // x-positie van de finishStok
  finishStokY = finishTopY + finishTopHoogte;                     // y-positie van de finishStok
  finishStokHoogte = ondergrond.y[2] - finishTopY - finishTopHoogte; // hoogte van de finishStok
  finishPaalGeraakt = false;                                      // de finishPaal is standaard niet geraakt
  spelerOpFinishPaal = false;                                     // de speler hangt standaard niet aan de finishPaal
  punten = 0;                                                     // punten worden gereset naar 0
  score = 0;                                                      // score wordt gereset naar 0

};

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  background('#6185f8');

  // cheats activeren
  if (keyIsDown(CONTROL) && keyIsDown(67)) { // CTRL + C = cheats
    cheats();
    console.log(cheats());
  }

  if (spelStatus === UITLEG) {
    setup();
    // Uitleg van het spel:
    fill(0);
    textSize(40);
    text("Verzamel zoveel mogelijk muntjes, vermijd de vijanden en ren naar de finish!", 100, 100, 1100, 300);
    text("Gebruik de W, A, D toetsen of de pijltjes [↑ → ←] om Mario te verplaatsen.", 100, 300, 1050, 500);
    text("Gebruik shift [\u21E7] om te vuren, P om te pauzeren en G om het geluid te dempen.", 100, 500, 1100, 700);
    text("Levels [→]", 640, 700);

    if ((mouseIsPressed && mouseX >= 520 && mouseX <= 760 && mouseY >= 660) || keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
      spelStatus = LEVELS;
    }
  }
  else if (spelStatus === LEVELS) {
    levelGeselecteerd = 0;
    // Teken elk kader:
    for (var i = 0; i < kaderPosX.length; i++) {
      // Instructie:
      textSize(40);
      if (levelVoltooid[1] === false) {
        text("Een level wordt ontgrendeld wanneer je het voorgaande level hebt voltooid.", 100, 70, 1100, 120);
      }
      else {
        text("Kies hieronder welk level je wilt spelen:", 640, 150);      
      }

      fill(kaderKleur[i]);
      rect(kaderPosX[i], kaderPosY[i], kaderGrootte, kaderGrootte, 30, 30, 30, 30);  
      fill(0);
      if (levelVoltooid[i]) {
        textSize(50);
        text(i+1, kaderPosX[i] + kaderGrootte/2, kaderPosY[i] + kaderGrootte/1.6);
        textSize(15);
        text("Highscore:", kaderPosX[i] + kaderGrootte/2, kaderPosY[i] + kaderGrootte/1.2);
        text(highscore[i+1], kaderPosX[i] + kaderGrootte/2, kaderPosY[i] + kaderGrootte/1.05);
      }
      else {
        textSize(50);
        text("\ud83d\udd12", kaderPosX[i] + kaderGrootte/2, kaderPosY[i] + kaderGrootte/1.6);
      }

      if (levelVoltooid[i]) {
        if ((keyIsDown(toetsenbordCijfers[i]) || keyIsDown(keypadCijfers[i])) || // als de gebruiker het level nummer indrukt
            (mouseIsPressed && mouseX <= kaderPosX[i] + kaderGrootte && mouseX >= kaderPosX[i] && mouseY <= kaderPosY[i] + kaderGrootte && mouseY >= kaderPosY[i])) { // als de gebruiker op het kader klikt
          
          levelGeselecteerd = i+1;    // i+1 omdat standaardlevel niet geselecteerd kan/mag worden
          huidigLevel = wereld1[levelGeselecteerd];
          setup();
          spelStatus = SPELEN;
        }
      }
    }
    textSize(20);
    text("\u{1F7E9}: Voltooid", 300, 600);
    text("\u{1F7E5}: Niet voltooid", 640, 600);
    text("\ud83d\udd12: Vergrendeld", 980, 600);

    text("[←] Uitleg", 640, 700);

    if (keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
      spelStatus = UITLEG;
    }
  }
  else if (spelStatus === SPELEN) {
    speler.pauzeKnopIngedruktVorige = speler.pauzeKnopIngedruktNu;
    
    if (keyIsDown(80)) {
      speler.pauzeKnopIngedruktNu = true;
    }
    else {
      speler.pauzeKnopIngedruktNu = false;
    }

    if (speler.pauzeKnopIngedruktNu === true && speler.pauzeKnopIngedruktVorige === false && spelStatus === SPELEN && speler.leeft === true && finishPaalGeraakt === false) {
      if (pauze === false) {
      spelGepauzeerd_geluid.play();        // speelt het spelGepauzeerd geluid af
      }
      pauze = !pauze;                      // pauze wordt het tegenovergestelde van wat het was
    }    
    tekenAlles();
    if (pauze === false) {
      algemeenMuziekje.play();
      beweegAlles();
      verwerkBotsing();
    }
    else {
      algemeenMuziekje.pause();
      // Vervaag de achtergrond
      fill(0, 0, 0, 100);
      rect(0, 0, width, height);
  
      // Tekenen van "Paused" in het midden van het scherm
      fill(230);
      textSize(50);
      text("Paused", width/2, height/2);
      fill(0);
    }
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
      if (speler.levens <= 0 ) {
        spelerDood_geluid.play();
      }
      else {
        gameover_geluid.play();
      }
    }
  }
  else if (spelStatus === GAMEOVER) {
    algemeenMuziekje.pause();
    textSize(100);
    text("GAME OVER", 640, 200);
    
    textSize(30);
    if (speler.levens <= 0 || speler.y >= 720) {    // hp = 0 of speler is in de void gevallen
      text("Je bent dood gegaan!", 640, 300);
      text("Je hebt het " + (150 - Math.round(tijd)) + " seconden overleefd.", 640, 400);
    }
    else if (tijd <= 0) {         // tijd om
      text("Je tijd is op!", 640, 300);
      text("Je score was: " + score, 640, 400);
    }

    text("Enter " + "[\u23CE]: " + "Restart", 640, 500);
    text("Backspace " + "[\u232B]: " + "Uitleg", 640, 550);
    text("Spatie " + "[\u3000]: " + "Leveloverzicht", 640, 600);

    if (keyIsDown(13) || (mouseIsPressed && mouseX >= 470 && mouseX <= 800 && mouseY >= 470 && mouseY <= 500)) {
      setup();
      spelStatus = SPELEN;
    }
    else if (keyIsDown(8) || (mouseIsPressed && mouseX >= 440 && mouseX <= 830 && mouseY >= 520 && mouseY <= 550)) {
      spelStatus = UITLEG;
    }
    else if (keyIsDown(32) || (mouseIsPressed && mouseX >= 380 && mouseX <= 890 && mouseY >= 570 && mouseY <= 600)) {
      setup();
      spelStatus = LEVELS;
    }

  }
  else if (spelStatus === WIN) {
    algemeenMuziekje.pause();
    if (score > highscore[levelGeselecteerd]) {
      highscore[levelGeselecteerd] = score;
    }
    levelVoltooid[levelGeselecteerd] = true;
    kaderKleur[levelGeselecteerd-1] = "green";
    textSize(100);
    text("You win!", 640, 200);

    textSize(30);
    text("Je score is: " + score, 640, 300);
    text("Je hebt er " + (150 - Math.round(tijd)) + " seconden over gedaan.", 640, 400);
    text("Enter " + "[\u23CE]: " + "Restart", 640, 500);
    text("Backspace " + "[\u232B]: " + "Uitleg", 640, 550);
    text("Spatie " + "[\u3000]: " + "Leveloverzicht", 640, 600);
    text("Pijltje naar rechts [→]: volgend level", 640, 650);

    if (keyIsDown(13) || (mouseIsPressed && mouseX >= 470 && mouseX <= 800 && mouseY >= 470 && mouseY <= 500)) {
      setup();
      spelStatus = SPELEN;
    }
    else if (keyIsDown(8) || (mouseIsPressed && mouseX >= 440 && mouseX <= 830 && mouseY >= 520 && mouseY <= 550)) {
      spelStatus = UITLEG;
    }
    else if (keyIsDown(32) || (mouseIsPressed && mouseX >= 380 && mouseX <= 890 && mouseY >= 570 && mouseY <= 600)) {
      setup();
      spelStatus = LEVELS;
    }
    else if ((keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) || (mouseIsPressed && mouseX >= 280 && mouseX <= 1000 && mouseY >= 630 && mouseY <= 650)) {
      if (levelGeselecteerd !== wereld1.length-1) {
        speler.wasGroot = speler.status;
        levelGeselecteerd++;
        huidigLevel = wereld1[levelGeselecteerd];
        setup();
        if (speler.wasGroot === "Super Mario") {
          speler.status = "Super Mario";
        }
        else if (speler.wasGroot === "Fire Mario") {
          speler.status = "Fire Mario";
        }
        spelStatus = SPELEN;
      }
      else {
        setup();
        wereldVoltooid_geluid.play();
        spelStatus = LEVELS;
      }
    }
  }
};