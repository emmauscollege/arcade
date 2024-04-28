/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

// globale variabelen die je gebruikt in je game

const HOME = 0
const SPELEN = 1;
const GAMEOVER = 2;
var kleur1 = "green";
var kleur2 = "black";
var spelStatus = SPELEN;

// aantal behaalde punten
var score = 0;

var rotatieCompensatie1;
var rotatieCompensatie2;

/* huidigBlok is een twee-dimentionale array van 4 breed en 4 hoog
 * - Deze array houd de huidige blok, wat gebruikt en veranderd kan worden waar nodig
 * - De functie newhuidigBlok geeft een voorgegeven preset aan huidigBlok
 * - Metadata van huidigBlok (positie, rotatie, etc) word gehouden in de variabele huidigBlokPos
 */
var huidigBlok = Array.from(Array(4), () => new Array(4));

/* huidigBlokPos slaat belangerijke info op over de staat van de huidigBlok
 * - huidigBlokPos heeft 6 stukken info:
 * - 1: de y coordinaat van linksboven
 * - 2: de x coordinaat van linksboven
 * - 3: de rotatie (1 - 4, waarvan 1 geen rotatie is, en 4 driekwart gedraad is)
 * - 4: de soort tetromino
 * - 5: de y coordinaat van rechtsonder
 * - 6: de x coordinaat van rechtsonder
 */
var huidigBlokPos = new Array(6);

/* bord is een 16x10 twee-dimentionale array
 * - bord houd het bord vast, wat gebruikt word om te tekenen en om collision op te checken
*/
 var bord = Array.from(Array(20), () => new Array(10)); // 2D array - 16 hoog en 10 breed (staat 20 want collision is kut :))

const TetriminoVariaties = [  // Alle verschillende soorten blokjes die je kunt hebben
    [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // Straight tetromino
    [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // Square tetromino
    [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // T-tetromino
    [[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // J-tetromino
    [[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // L-tetromino
    [[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], // S-tetromino
    [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]]  // Z-tetromino
];

/* 
 * Alle functies die aan het begin gedaan moeten woredn
 */

/* setup
   de code in deze functie wordt één keer uitgevoerd door
   de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
    // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
    createCanvas(1280, 720);

    // Kleur de achtergrond wit, zodat je het kunt zien
    background(kleur2);
    stroke(kleur1);

    spelStatus = HOME;

    //Zet alle variabelen naar de beginstand
    reset();
}

// Reset het spel naar beginstand
var reset = function () {
    // Zet var bord naar 0
    for (var i = 0; i < bord.length; i++) {       
        for (var j = 0; j < bord[0].length; j++) {
            bord[i][j] = 0;
        }
    }

    // Pakt een nieuw blok
    newhuidigBlok();
}

// Pakt een nieuw huidigBlok
var newhuidigBlok = function (tetrimino = Math.floor(Math.random() * 7)) {

    // Pakt een random waarde van 1 tot 7
    // De const TetriminoVariaties (lijn 29) heeft 7 verschillende arrays voor blokken
    // Deze var neemt dus 1 van de 7 blokken
    var randomTetrimino = tetrimino; 

    // Zet de net gepakte tetrimino in de huidigBlok
    huidigBlok = TetriminoVariaties[randomTetrimino];

    // Reset de huidigBlokPos Variabele naar de beginstand
    // Zie lijn 72 voor de 
    huidigBlokPos = [0, 4, 1, randomTetrimino, 0, 0];
}

/*
 * Alle functies die huidigBlok veranderen
 */

// Draait het blok
var draaiBlok = function () {
    // Tijdelijke variabele om huidigBlok mee op te slaan
    // Aan het einde van de functie word huidigBlok overschreven door deze var
    var TemphuidigBlok = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    // Gaat na welk soort tetromino het is en draait het blok
    // Ik weet dat dit inefficient is
    // Normale blokken (T, J, L, S, Z)
    if(huidigBlokPos[3] > 1) {                    
        TemphuidigBlok[0][2] = huidigBlok[0][0];
        TemphuidigBlok[2][2] = huidigBlok[0][2];
        TemphuidigBlok[2][0] = huidigBlok[2][2];
        TemphuidigBlok[0][0] = huidigBlok[2][0];

        TemphuidigBlok[1][2] = huidigBlok[0][1];
        TemphuidigBlok[2][1] = huidigBlok[1][2];
        TemphuidigBlok[1][0] = huidigBlok[2][1];
        TemphuidigBlok[0][1] = huidigBlok[1][0];
        TemphuidigBlok[1][1] = 1;


    } 
    // Straight Tetrimino
    else if (huidigBlokPos[3] === 0) {          
        TemphuidigBlok[0][0] = huidigBlok[0][0];
        TemphuidigBlok[1][0] = huidigBlok[0][1];
        TemphuidigBlok[2][0] = huidigBlok[0][2];
        TemphuidigBlok[3][0] = huidigBlok[0][3];

        TemphuidigBlok[0][0] = huidigBlok[0][0];
        TemphuidigBlok[0][1] = huidigBlok[1][0];
        TemphuidigBlok[0][2] = huidigBlok[2][0];
        TemphuidigBlok[0][3] = huidigBlok[3][0];


    }
    // Square Tetrimino 
    else {                                    
        TemphuidigBlok = [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    }

    // Hier word de huidigBlok overschreven door TemphuidigBlok
    huidigBlok = TemphuidigBlok;

    // Update de rotatievariabele in huidigBlokPos
    if (huidigBlokPos[2] === 4) {
        huidigBlokPos[2] = 1;
    } else {
        huidigBlokPos[2]++;
    }
}

// Zet het blok vast in het bord
var plaatsBlok = function() {
    
    // Zet huidigBlok in het bord (Gepakt van de eerste for loop in de draw functie)
    for (var i = 0; i < huidigBlok.length; i++) {
        for (var j = 0; j < huidigBlok[i].length; j++) {
            if (huidigBlok[i][j] === 1) {
                bord[huidigBlokPos[0] + i][huidigBlokPos[1] + j] = 1;
            }
        }
    }

    // Pakt een nieuw blok
    newhuidigBlok();
}

/* 
 * Alle functies die dingen berekenen
 */

// Berekent met variabelen waar het meest rechtse en onderste punt is van huidigBlok
var berekenRechtsOnderPos = function () {

    // Straight
    if (huidigBlokPos[3] === 0) {

        //Kijkt naar de verschillende mogelijke rotaties
        switch (huidigBlokPos[2]) {
            // Blok staat evenwijdig naar de grond, x waarde heeft 3 verschil, y waarde heeft geen verschil
            case 1:
                huidigBlokPos[4] = huidigBlokPos[0];
                huidigBlokPos[5] = huidigBlokPos[1] + 3;
                break;
            // Blok staat loodrecht aan grond, x waarde heeft geen verschil, y waarde heeft 3 verschil
            case 2:
                huidigBlokPos[4] = huidigBlokPos[0] + 3;
                huidigBlokPos[5] = huidigBlokPos[1];
                break;
            // Blok staat evenwijdig naar de grond, x waarde heeft 3 verschil, y waarde heeft geen verschil
            case 3:
                huidigBlokPos[4] = huidigBlokPos[0];
                huidigBlokPos[5] = huidigBlokPos[1] + 3;
                break;
            // Blok staat loodrecht aan grond, x waarde heeft geen verschil, y waarde heeft 3 verschil
            case 4:
                huidigBlokPos[4] = huidigBlokPos[0] + 3;
                huidigBlokPos[5] = huidigBlokPos[1];
                break;
        }
    }


    // Alle blokken met een 3x3 grid (2 - 7)
    else if (huidigBlokPos[3] != 0 || 1) {
         switch (huidigBlokPos[2]) {
             case 1:
                 huidigBlokPos[4] = huidigBlokPos[0] + 1;
                 huidigBlokPos[5] = huidigBlokPos[1] + 2;
                 break;
             case 2:
                 huidigBlokPos[4] = huidigBlokPos[0] + 2;
                 huidigBlokPos[5] = huidigBlokPos[1] + 1;
                 break;
             case 3:
                 huidigBlokPos[4] = huidigBlokPos[0] + 1;
                 huidigBlokPos[5] = huidigBlokPos[1] + 2;
                 break;
             case 4:
                 huidigBlokPos[4] = huidigBlokPos[0] + 2;
                 huidigBlokPos[5] = huidigBlokPos[1] + 1;
                 break;
         }
    }

    // Square, blijft altijd hetzelfde
    else {
        huidigBlokPos[4] = huidigBlokPos[0] + 1;
        huidigBlokPos[5] = huidigBlokPos[1] + 1;
    }
}

// Check of huidigBlok iets raakt
var checkBotsing = function () {
    berekenRechtsOnderPos();

    // als de huidigBlok de grond raakt
    if (huidigBlokPos[4] === 15) {
        plaatsBlok();
    };

    // als de huidigBlok een ander blok raakt
    for (var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++) {
            if (bord[huidigBlokPos[0] + j + 1][i + huidigBlokPos[1]] === 1 && huidigBlok[j][i] === 1) {
                plaatsBlok();
                break;
            };
        };
    };


    // Checkt of er lijnen gevuld zijn en haalt ze dan weg
    // Loopt door alle lijnen
    for(var i = 0; i < bord.length; i++) {
        // Checkt of ze vol zijn
        if(bord[i].toString() == "1,1,1,1,1,1,1,1,1,1"){ // Geen idee wrm maar js wilt dat je eerst de array naar een string maakt maar het normaal doen wil hij niet :(

            // Haalt de volledige rij weg
            bord[i] = [0,0,0,0,0,0,0,0,0,0];

            // Zet alle rijen erboven goed
            for(var x = 0; x < i; x++){
                bord[i - x] = bord[i - x - 1] 
            }
            bord[0] = [0,0,0,0,0,0,0,0,0,0];

            // Voegt 1 punt toe
            score++;

            // Veranderd de kleuren
            // @ts-ignore
            kleur1 = color(random(120, 180), random(120, 180), random(120, 180));
            // @ts-ignore
            kleur2 = color(random(0, 100), random(0, 100), random(0, 100)); 
        }
    }

    // Checkt of je verloren hebt
    for(var i = 0; i < 4; i++){
        if(bord[0 || 1][3 + i] === 1) {
            spelStatus = GAMEOVER;
        } 
    }
};

// Kijkt hoeveel de huidigBlok afwijkt van de 4x4 grid 
// Is nodig om gedraaide blokken bij de randen te kunnen krijgen
// Omdat blokken draaien vanaf het middelpunt gebeurt, kan het zijn dat de meest linker kant van het blok verder rechts is dan de 4x4 grid van de array
var berekenRotatieCompensatie = function () {
    if(huidigBlokPos[3] === 0) { // Straight
        switch (huidigBlokPos[2]) {
            case 1:
                rotatieCompensatie1 = 0;
                rotatieCompensatie2 = -1;
                break;
            case 2:
                rotatieCompensatie1 = 0;
                rotatieCompensatie2 = 2;
                break;
            case 3:
                rotatieCompensatie1 = 0;
                rotatieCompensatie2 = -1;
                break;
            case 4:
                rotatieCompensatie1 = 0;
                rotatieCompensatie2 = 2;
                break;
        }

    } else if(huidigBlokPos[3] === 1) { // Square
        rotatieCompensatie1 = 0;
        rotatieCompensatie2 = 1;

    } else {
        switch (huidigBlokPos[2]) {
            case 1:
                rotatieCompensatie1 = 0;
                rotatieCompensatie2 = 0;
                break;
            case 2:
                rotatieCompensatie1 = 1;
                rotatieCompensatie2 = 0;
                break;
            case 3:
                rotatieCompensatie1 = 0;
                rotatieCompensatie2 = 0;
                break;
            case 4:
                rotatieCompensatie1 = 0;
                rotatieCompensatie2 = 1;
                break;
        }
    }
}

/*
 * Overige functies
 */

// Blokken vasthouden lmao
var holdBlok;
var tempHoldBlok;
var hold = function () {
    if (-1 < holdBlok && holdBlok < 8) {
        tempHoldBlok = holdBlok;
        holdBlok = huidigBlokPos[3];
        newhuidigBlok(tempHoldBlok);

    } else {
        holdBlok = huidigBlokPos[3];
        newhuidigBlok;
    }
}

// Controls
function keyPressed() {
    switch (keyCode) {
        // blokkenrotatie (x)
        case 88:
            draaiBlok();
            break;

        // blok naar links bewegen
        case 37:
            if (huidigBlokPos[1] + rotatieCompensatie1 > 0) {
                huidigBlokPos[1]--;
            }
            break;

        // blok naar rechts bewegen
        case 39:
            if (huidigBlokPos[1] - rotatieCompensatie2 < 7) {
                huidigBlokPos[1]++;
            }
            break;

        // Blok naar beneden
        case 40:
            huidigBlokPos[0]++;
            checkBotsing();
            break;
        // Hard drop (pijltje naar boven)
        case 38:
            do {
                huidigBlokPos[0]++;
                checkBotsing();
            } while(huidigBlokPos[0] != 0)
            break;
        // Hard drop (space)
        case 32:
            do {
                huidigBlokPos[0]++;
                checkBotsing();
            } while(huidigBlokPos[0] != 0)
            break;
        // Hold (c)
        case 67:
            hold();
            break;
        // Press enter to play stuff
        case 13:
            reset();
            spelStatus = SPELEN;
            break;
    }
}

/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
    // Tekent de achtergrond
    fill(kleur2)
    rect(0, 0, 1280, 720)
    switch (spelStatus) {
        case HOME:
            // Home menu tekenen

            textSize(40);
            fill(kleur1);
            text("TETRIS", 550, 240, 426, 240);
            text("Druk op enter om te spelen :)", 426, 360, 426, 240);
            break;

        case SPELEN:
            // Zet het huidige blokje in het bord (niet permanent, wordt na het tekenen van het bord er weer uit gehaald)
            // Loopt door de hele huidigBlok array
            for(var i = 0; i < huidigBlok.length; i++){
                for(var j = 0; j < huidigBlok[i].length; j++){
                    // Als een nummer 1 is, zet hij die ook in het bord
                    if (huidigBlok[i][j] === 1) {
                        bord[huidigBlokPos[0]+i][huidigBlokPos[1] + j] = 1;
                    }
                }
            }

            // Tekent het bord
            // Loopt door heel het bord array
            for (var i = 0; i < 16; i++) {
                for (var j = 0; j < 10; j++) {
                    // Als een nummer 1 is, zet hij de kleuren naar vol
                    // als het nummer 0 is, zet hij de kleuren naar leeg
                    if (bord[i][j] === 1) {
                        stroke(kleur2);
                        fill(kleur1);
                    } else {
                        stroke(kleur1);
                        fill(kleur2);
                    }
                    // Tekent veld per blokje
                    rect(j * 45 + 426, i * 45, 45, 45);
                }
            }

            // Precies hetzelfde als voor de draw, maar dan zet hij het naar 0, zodat hij niet het bord opneemt wanneer het blokje op een andere positie is
            for(var i = 0; i < huidigBlok.length; i++){
               for(var j = 0; j < huidigBlok[i].length; j++){
                    if (huidigBlok[i][j] === 1) {
                       bord[huidigBlokPos[0]+i][huidigBlokPos[1] + j] = 0;
                    }
               }
            }

            // Deze functie doet iets aan het begin van elke seconden
            if (frameCount % 50 == 0) {
                // Beweegt het blok naar beneden
                huidigBlokPos[0]++;
            }
            // Deze functie doet iets aan het einde van elke seconden
            if (frameCount % 50 == 49) {
                // Berekent heel veel nodige dingen
                checkBotsing();
                berekenRechtsOnderPos();
                berekenRotatieCompensatie();
            }

            // Tekent de score
            stroke(kleur2);
            fill(kleur2);
            rect(100, 100, 200, 100);
            stroke(kleur2);
            fill(kleur1);
            textSize(50);
            text("Score: " + score, 100, 100, 1000, 100);
            text("Controls:", 100, 400, 1000, 100);
            textSize(30);
            text("Pijljes om te bewegen", 100, 450, 1000, 100);
            text("X om te draaien", 100, 485, 1000, 100);

            // Tekent het vastgehouden blok
            stroke(kleur1);
            fill(kleur2);
            rect(100, 200, 100, 100)
            if (-1 < holdBlok && holdBlok < 8) {
                for (var y = 0; y < 4; y++) {
                    for (var x = 0; x < 2; x++) {
                        if (TetriminoVariaties[holdBlok][x][y] === 1) {
                            noStroke();
                            fill(kleur1);
                        } else {
                            stroke(kleur2);
                            fill(kleur2);
                        }
                        rect(125 + (25 * x), 210 + (25 * y), 25, 25);
                    }
                }
            }
            stroke(kleur1);
            line(100, 300, 200, 300)
            break;

        case GAMEOVER: {
            // Tekent het bord
            for (var i = 0; i < 16; i++) {      // bord is 16 hoog
                for (var j = 0; j < 10; j++) {  // bord is 10 breed
                    if (bord[i][j] === 1) {
                        stroke(kleur2);
                        fill(kleur1);
                    } else {
                        stroke(kleur1);
                        fill(kleur2);
                    }
                    rect(j * 45 + 426, i * 45, 45, 45); // Tekent veld per blokje
                }
            }

            // Tekent de overlay
            fill(kleur2);
            rect(320, 130, 640, 360)
            textSize(100);
            fill(kleur1);
            stroke(kleur2);
            text("GAME OVER", 340, 160, 1000, 1000);
            textSize(50);
            text("Score: " + score, 550, 300, 1000, 1000);
            text("Press enter to restart", 410, 390, 1000, 1000)
            stroke(kleur1);
            fill(kleur2);
            break;
        }   
    }
}