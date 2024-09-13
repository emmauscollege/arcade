
/*
 * Settings to make your code better
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"



/* ********************************************* */
/* Game functions                                */
/* ********************************************* */

/**
 * Cheat voor de docent: geld + alle maps unlocked!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
function cheat() {
  changingData.coins = 1e10;
  changingData.mapLocked = [false, false, false, false, false, false, false, false];
}

/**
 * if click button is released
 */
function mouseReleased() {      
  mouseReleasedButton = true;
  mouseIsClicked = false;
}

/**
 * if the mouse has movedd
 */
function mouseMoved(){
  if(placeText === true) {
      placeText = false;
      placeButtons = true;
      controlStatus = PC;
  }
}

/*
/* calculate movement of everything
*/
var beweegAlles = function() {
  if(racing === true) {                                     //check of de spelers aan het racen zijn


    // the || (or) used in the if statements are and/or in this case because it also works if both things are true

    if(keyIsDown(Wkey) || keyIsDown(UpArrow)){              // check if the w key or the up arrow key is pressed
      if(velocity1 < maxvelocity) {                         // check if the velocity is smaller then the max velocity
        velocity1 += velocityIncreas*2;                     // increase the velocity by 2x(var velocityIncrease)
      }
    }
    if(keyIsDown(Skey) || keyIsDown(DownArrow)){            // check if the s ket or the down arrow key is pressed
      if(velocity1 > 0) {                                   // check if the car is moving
        velocity1 -= velocityIncreas;                       // decrease the velicity by (var velocityIncrease)
      }
    }

    if(keyIsDown(Dkey) || keyIsDown(RightArrow)) {          // check if the d key or the right arrow key is pressed
      if(velocity1 > 0) {                                   // check if the car is moving
        rotationP1 += 1.75-0.75*(velocity1/maxvelocity);    // rotate the car right based on the current speed and maximum velocity
      }
    }
    if(keyIsDown(Akey) || keyIsDown(LeftArrow)) {           // check if the a key or the left arrow key is pressed
      if(velocity1 > 0) {                                   // check if the car is moving
        rotationP1 -= 1.75-0.75*(velocity1/maxvelocity);    // rotate the car left based on the current speed and maximum velocity
      }
    }
   
    if(velocity1 > 0) {                                     // check if the velocity is greater then 0
      velocity1 -= velocityIncreas;                         // decrease the velocity by (var velocityIncrease)
    }
    if(velocity1 < 0) {                                     // check if the velocity is smaller then 0
      velocity1 = 0;                                        // set the velocity to 0
    }
    if(velocity1 > maxvelocity) {                           // check if the velocity is greater the the max velocity
      velocity1 -= 2*velocityIncreas;                       // decrease the velocity by 2x(var velocityIncrease)
    }


    // makes sure the rotation of the car is always a number between 0 and 360:

    while(rotationP1 > 360) {                               // as long as the rotation of the player is greater then 360
      rotationP1 -= 360;                                    // decrease the rotation of the player by 360
    }
    while(rotationP1 < 0) {                                 // as long as the rotation of the player is smaller then 0
      rotationP1 += 360;                                    // increase the rotation of the player by 360
    }


    // move the players position:
    
    player1Y -= cos(rotationP1) * velocity1;                // move the player's y position based on the player's rotation and velocity
    player1X += sin(rotationP1) * velocity1;                // move the player's x position based on the player's rotation and velocity
  }

  
}

/**
 * Checkt botsingen
 * laat de auto niet van de map rijden
 */
var verwerkBotsing = function() {
  push();                                                           // create a new layer so the translation is only for this part
  translate(player1X, player1Y);                                    // move the 0, 0 postion to the player's x and y position
  topLeft = [                                                       // al 5 top left positions based on rotation for:
    [-26, -44],                                                     // rotation is exactly 0 degrees
    [-26-18*(rotationP1/90), -44+18*(rotationP1/90)],               // rotation is between 0 and 90 degrees
    [-26-18*((180-rotationP1)/90), -44+18*((180-rotationP1)/90)],   // rotation is between 90 and 180 degrees
    [-26-18*((rotationP1-180)/90), -44+18*((rotationP1-180)/90)],   // rotation is between 180 and 270 degrees
    [-26-18*((360-rotationP1)/90), -44+18*((360-rotationP1)/90)]    // rotation is between 270 and 360 degrees
  ];
  topRight = [                                                      // al 5 top right positions based on rotation for:
    [26, -44],                                                      // rotation is exactly 0 degrees
    [26+18*(rotationP1/90), -44+18*(rotationP1/90)],                // rotation is between 0 and 190 degrees
    [26+18*((180-rotationP1)/90), -44+18*((180-rotationP1)/90)],    // rotation is between 90 and 180 degrees
    [26+18*((rotationP1-180)/90), -44+18*((rotationP1-180)/90)],    // rotation is between 180 and 270 degrees
    [26+18*((360-rotationP1)/90), -44+18*((360-rotationP1)/90)]     // rotation is between 270 and 360 degrees
  ];
  bottomLeft = [                                                    // al 5 bottom left positions based on rotation for:
    [-26, 44],                                                      // rotation is exactly 0 degrees
    [-26-18*(rotationP1/90), 44-18*(rotationP1/90)],                // rotation is between 0 and 90 degrees
    [-26-18*((180-rotationP1)/90), 44-18*((180-rotationP1)/90)],    // rotation is between 90 and 180 degrees
    [-26-18*((rotationP1-180)/90), 44-18*((rotationP1-180)/90)],    // rotation is between 180 and 270 degrees
    [-26-18*((360-rotationP1)/90), 44-18*((360-rotationP1)/90)]     // rotation is between 270 and 360 degrees
  ];
  bottomRight = [                                                   // al 5 bottom right positions based on rotation for:
    [26, 44],                                                       // rotation is exactly 0 degrees
    [26+18*(rotationP1/90), 44-18*(rotationP1/90)],                 // rotation is between 0 and 90 degrees
    [26+18*((180-rotationP1)/90), 44-18*((180-rotationP1)/90)],     // rotation is between 90 and 180 degrees
    [26+18*((rotationP1-180)/90), 44-18*((rotationP1-180)/90)],     // rotation is between 180 and 270 degrees
    [26+18*((360-rotationP1)/90), 44-18*((360-rotationP1)/90)]      // rotation is between 270 and 360 degrees
  ];

  let int = 0;                                                      // set var (int) to 0
  if(rotationP1 <= 90 && rotationP1 > 0){                           // check if the rotation is between 0 and 90                
    int = 1;                                                        // change var (int) to 1
  }else if(rotationP1 <= 180 && rotationP1 > 90) {                  // check if the rotation is between 90 and 180 
    int = 2;                                                        // change var (int) to 1
  }else if(rotationP1 <= 270 && rotationP1 > 180) {                 // check if the rotation is between 180 and 270
    int = 3;                                                        // change var (int) to 1
  }else if(rotationP1 <= 360 && rotationP1 > 270) {                 // check if the rotation is between 270 and 360
    int = 4;                                                        // change var (int) to 1
  }

  if(player1Y+topLeft[int][1] < 0) {                                // check if the top left position of the car is hitting y = 0 (the top edge)
    maxvelocity = wallSpeed;                                        // set the max velocity to wall speed max
    player1Y = -topLeft[int][1];                                    // set the player's y position to the negative of the top left position
  }else if(player1Y+bottomRight[int][1] > 960) {                    // check if the bottom right position of the car is hitting y = 960 (the bottom edge)
    maxvelocity = wallSpeed;                                        // set the max velocity to wall speed max
    player1Y = 960-bottomRight[int][1];                             // set the player's y position to 960 - the bottom right position
  }else if(player1X+bottomLeft[int][0] < 0) {                       // check if the player's x position + the bottom left position of the car is hitting x = 0 (the left edge)
    maxvelocity = wallSpeed;                                        // set the max velocity to wall speed max
    player1X = -bottomLeft[int][0]                                  // set the player's x position to the negative of the bottom left position
  }else if(player1X+topRight[int][0] > 1344) {                      // check if the player's x position + the top right position of the var is hitting x = 1344 (the right edge)
    maxvelocity = wallSpeed;                                        // set the max velocity to wall speed max
    player1X = 1344-topRight[int][0];                               // set he player's x position to 1344 - the top right position
  }else{                                                            // if the car is not hitting an edge
    maxvelocity = startMax;                                         // set the max velocity back to the starting max velocity
  }
  pop();                                                            // go out of the layer where 0, 0 was the player's x and y position
  if(mapStatus != TUTORIALMAP) {                                    // check if the mapstatus is not equal to tutorialmap
    var mapPathLength = mapPaths[selectedMap].length-1;             // set map path length to the length of the selected map - 1
    for(var i = 0; i < mapPathLength; i++) {                        // loop for 0 to the length of (var mappathlength)
      if(mapPaths[selectedMap][i][2] === false) {                   // check if the selected map block is false (so not driven over yet)
        if(player1X > mapPaths[selectedMap][i][1]*192 && player1X < mapPaths[selectedMap][i][1]*192+192 && player1Y > mapPaths[selectedMap][i][0]*192 && mapPaths[selectedMap][i][0]*192+192){  // check if the player is on that block
          mapPaths[selectedMap][i][2] = true;                       // set the the selected map block to true (so driven over)
        }
      }
    }

    if(player1X > mapPaths[selectedMap][mapPathLength][1]*192 && player1X < mapPaths[selectedMap][mapPathLength][1]*192+192 && player1Y > mapPaths[selectedMap][mapPathLength][0]*192 && player1Y < mapPaths[selectedMap][mapPathLength][0]*192+90) { // check if the player is driving over the finish
      var finished = true;                                         // set the var (finished) to true
      for(var i = 0; i < mapPathLength; i++) {                     // loop for 0 to the length of (var mappathlength)
        if(mapPaths[selectedMap][i][2] === false) {                // if one of the blocks on the map is still false
          finished = false;                                        // set finished to false; (they didn't finish because they skipped a part)
        }
      }
      if(finished === true) {                                      // if finished is still true after the check
        if(lapCount < 3) {                                         // if the lap counter is below 3
          lapCount++                                               // add 1 to the lap counter
          finished = false;                                        // set finished to false
          for(var i = 0; i < mapPathLength; i++) {                 // loop for 0 to the length of (var mappathlength)
            mapPaths[selectedMap][i][2] = false;                   // set map block to false (so not driven over)
          }
        }else{                                                     // if the lapcount is equal to three
          gameStatus = FINISHED;                                   // set gamestatus to finished
        }
      }
    }
  }
};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  //map1 Tutorial + player1
  if(mapStatus != TUTORIALMAP && selectedMap != 0) {                      // if the map status is nog equal to tutorial map and selected map is not 0
      for(let i = 0; i < maps[0].length; i++) {                           // loop for the (height)length of the map
        for(let t = 0; t < maps[0][i].length; t++){                       // loop for the (width)length of the map
          image(maps[selectedMap][i][t], 192*t, 192*i, 192, 192);         // place an image at every block based on what block is in (var maps)
        }
      }

      racingTimer();                                                      // call the function racingTimer() at timer.js

      if (racing === true) {                                              // if racing is true
        push();                                                           // create a new layer for the translate and rotate
        translate(player1X, player1Y);                                    // move the 0, 0 to the player's x and y position
        rotate(rotationP1);                                               // rotate the car image based on var rotationP1
        image(shopCars[selectedCar], -26, -44, 52, 88);                   // place the selected car image at the position of the player
        pop();                                                            // go out of the layer
      }else {                                                             // if racing is not true
        image(shopCars[selectedCar], player1X-26, player1Y-44, 52, 88);   // place the selected car image at the position of the player
      }
  }

  if(mapStatus === TUTORIALMAP) {                                         // check if the map status if tutorial map
    //make the map
    for(let i = 0; i < maps[0].length; i++) {                             // loop for the (height)length of the map
      for(let t = 0; t < maps[0][i].length; t++){                         // loop for the (width)length of the map
        image(maps[0][i][t], 192*t, 192*i, 192, 192);                     // place an image at every block based on what block is in (var maps)
      }
    }

    racingTimer();                                                        // call the function racingTimer() at timer.js

    if (racing === true) {                                                // if racing is true
      push();                                                             // create a new layer for the translate and rotate
      translate(player1X, player1Y);                                      // move the 0, 0 to the player's x and y position
      rotate(rotationP1);                                                 // rotate the car image based on var rotationP1
      image(shopCars[selectedCar], -26, -44, 52, 88);                     // place the selected car image at the position of the player
      pop();                                                              // go out of the layer
    }else{                                                                // if racing is not true
      image(shopCars[selectedCar], player1X-26, player1Y-44, 52, 88);     // place the selected car image at the position of the player
    }
  }
}



/* ****************************************************** */
/* preload(), setup() en draw() functies / hoofdprogramma */
/* ****************************************************** */

/**
 * preload all images
 * code in this function is only called once
 */
function preload() {
  //start menu images
  imgTypingBar = loadImage('images/menu/typingBar.png');
  imgSettingsGear = loadImage('images/menu/settingsGear.png');
  imgTransparency = loadImage('images/menu/transparency.png');
  imgLock = loadImage('images/menu/lock.png')
  imgClosed = loadImage('images/menu/closed.png');
  imgSlidebar = loadImage('images/menu/slidebar.png');
  imgSlidebarButton = loadImage('images/menu/slidebarButton.png')
  imgStarGrey = loadImage('images/menu/starGrey.png');
  imgStarYellow = loadImage('images/menu/starYellow.png');
  imgStartMenuButton = loadImage('images/menu/MenuButton.png');
  imgStartMenuButtonLine = loadImage('images/menu/MenuButtonLine.png');
  imgArrowUp = loadImage('images/menu/arrowUp.png');
  imgArrowDown = loadImage('images/menu/arrowDown.png');
  imgArrowLeft = loadImage('images/menu/arrowLeft.png');
  imgArrowRight = loadImage('images/menu/arrowRight.png');
  imgCountdownSquare = loadImage('images/menu/countdownSquare.png');
  imgHomeButton = loadImage('images/menu/homeButton.png');
  imgFrameBorder = loadImage('images/menu/frameBorder.png');

  //shop images
  imgCarBorder = loadImage('images/menu/carBorder.png');
  imgNextButton = loadImage('images/menu/nextButton.png');
  imgNextButtonLine = loadImage('images/menu/nextButtonLine.png');
  imgCoin = loadImage('images/menu/coin.png');

  //racetrack map 1
  imgRaceTrackGrass = loadImage('images/racetrack/raceTrackGrass.png');
  imgRaceTrackFinishUp = loadImage('images/racetrack/raceTrackFinishUp.png');
  imgRaceTrackDown = loadImage('images/racetrack/raceTrackDown.png');
  imgRaceTrackUp = loadImage('images/racetrack/raceTrackUp.png');
  imgRaceTrackLeft = loadImage('images/racetrack/raceTrackLeft.png');
  imgRaceTrackRight = loadImage('images/racetrack/raceTrackRight.png');
  imgRaceTrackCorner1 = loadImage('images/racetrack/raceTrackCorner1.png');
  imgRaceTrackCorner2 = loadImage('images/racetrack/raceTrackCorner2.png');
  imgRaceTrackCorner3 = loadImage('images/racetrack/raceTrackCorner3.png');
  imgRaceTrackCorner4 = loadImage('images/racetrack/raceTrackCorner4.png');
  imgRaceTrackCorner5 = loadImage('images/racetrack/raceTrackCorner5.png');
  imgRaceTrackCorner6 = loadImage('images/racetrack/raceTrackCorner6.png');
  imgRaceTrackCorner7 = loadImage('images/racetrack/raceTrackCorner7.png');
  imgRaceTrackCorner8 = loadImage('images/racetrack/raceTrackCorner8.png');

  //race cars
  imgRaceCarGreenWhite = loadImage('images/raceCars/raceCarGreenWhite.png');
  imgRaceCarBlueWhite = loadImage('images/raceCars/raceCarBlueWhite.png');
  imgRaceCarPinkWhite = loadImage('images/raceCars/raceCarPinkWhite.png');
  imgRaceCarSpiderMan = loadImage('images/raceCars/raceCarSpiderMan.png');
  imgRaceCarNederland = loadImage('images/raceCars/raceCarNederland.png');
  imgRaceCarRedWhite = loadImage('images/raceCars/raceCarRedWhite.png');
  imgRaceCarBarcelona = loadImage('images/raceCars/raceCarBarcelona.png');
  imgRaceCarFerrari = loadImage('images/raceCars/raceCarFerrari.png');
  imgRaceCarAtleticoMadrid = loadImage('images/raceCars/raceCarAtleticoMadrid.png');
  imgRaceCarRealMadrid = loadImage('images/raceCars/raceCarRealMadrid.png');
  imgRaceCarMercedez = loadImage('images/raceCars/raceCarMercedez.png');


  //soundseffects 
}
/**
 * setup
 * code in this function is called only once
 */
function setup() { 
  // sets up all maps in the maps array
  maps[0][0] = [imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass];
  maps[0][1] = [imgRaceTrackGrass, imgRaceTrackCorner1, imgRaceTrackRight, imgRaceTrackRight, imgRaceTrackRight, imgRaceTrackCorner2, imgRaceTrackGrass];
  maps[0][2] = [imgRaceTrackGrass, imgRaceTrackFinishUp, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackDown, imgRaceTrackGrass];
  maps[0][3] = [imgRaceTrackGrass, imgRaceTrackCorner4, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackCorner3, imgRaceTrackGrass];
  maps[0][4] = [imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass];
  
  maps[1][0] = [imgRaceTrackGrass, imgRaceTrackCorner1, imgRaceTrackRight, imgRaceTrackRight, imgRaceTrackRight, imgRaceTrackCorner2, imgRaceTrackGrass];
  maps[1][1] = [imgRaceTrackGrass, imgRaceTrackFinishUp, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackDown, imgRaceTrackGrass];
  maps[1][2] = [imgRaceTrackCorner1, imgRaceTrackCorner7, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackCorner8, imgRaceTrackCorner2];
  maps[1][3] = [imgRaceTrackUp, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackDown];
  maps[1][4] = [imgRaceTrackCorner4, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackCorner3];

  maps[2][0] = [imgRaceTrackCorner1, imgRaceTrackRight, imgRaceTrackCorner2, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass];
  maps[2][1] = [imgRaceTrackUp, imgRaceTrackGrass, imgRaceTrackDown, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass];
  maps[2][2] = [imgRaceTrackUp, imgRaceTrackGrass, imgRaceTrackCorner8, imgRaceTrackRight, imgRaceTrackRight, imgRaceTrackRight, imgRaceTrackCorner2];
  maps[2][3] = [imgRaceTrackFinishUp, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackDown];
  maps[2][4] = [imgRaceTrackCorner4, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackCorner3];

  maps[3][0] = [imgRaceTrackCorner1, imgRaceTrackRight, imgRaceTrackCorner2, imgRaceTrackGrass, imgRaceTrackCorner1, imgRaceTrackRight, imgRaceTrackCorner2];
  maps[3][1] = [imgRaceTrackUp, imgRaceTrackGrass, imgRaceTrackDown, imgRaceTrackGrass, imgRaceTrackUp, imgRaceTrackGrass, imgRaceTrackDown];
  maps[3][2] = [imgRaceTrackUp, imgRaceTrackGrass, imgRaceTrackCorner8, imgRaceTrackRight, imgRaceTrackCorner7, imgRaceTrackGrass, imgRaceTrackDown];
  maps[3][3] = [imgRaceTrackFinishUp, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackDown];
  maps[3][4] = [imgRaceTrackCorner4, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackCorner3];

  maps[4][0] = [imgRaceTrackCorner1, imgRaceTrackRight, imgRaceTrackCorner2, imgRaceTrackGrass, imgRaceTrackCorner1, imgRaceTrackRight, imgRaceTrackCorner2];
  maps[4][1] = [imgRaceTrackUp, imgRaceTrackGrass, imgRaceTrackDown, imgRaceTrackGrass, imgRaceTrackUp, imgRaceTrackGrass, imgRaceTrackDown];
  maps[4][2] = [imgRaceTrackFinishUp, imgRaceTrackGrass, imgRaceTrackCorner8, imgRaceTrackRight, imgRaceTrackCorner7, imgRaceTrackGrass, imgRaceTrackDown];
  maps[4][3] = [imgRaceTrackCorner4, imgRaceTrackCorner6, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackCorner5, imgRaceTrackLeft, imgRaceTrackCorner3];
  maps[4][4] = [imgRaceTrackGrass, imgRaceTrackCorner4, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackCorner3, imgRaceTrackGrass, imgRaceTrackGrass];

  maps[5][0] = [imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackCorner1, imgRaceTrackRight, imgRaceTrackRight, imgRaceTrackCorner2];
  maps[5][1] = [imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackUp, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackDown];
  maps[5][2] = [imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackFinishUp, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackDown];
  maps[5][3] = [imgRaceTrackCorner1, imgRaceTrackRight, imgRaceTrackRight, imgRaceTrackCorner7, imgRaceTrackCorner5, imgRaceTrackLeft, imgRaceTrackCorner3];
  maps[5][4] = [imgRaceTrackCorner4, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackCorner3, imgRaceTrackGrass, imgRaceTrackGrass];

  maps[6][0] = [imgRaceTrackCorner1, imgRaceTrackCorner2, imgRaceTrackGrass, imgRaceTrackCorner1, imgRaceTrackRight, imgRaceTrackRight, imgRaceTrackCorner2];
  maps[6][1] = [imgRaceTrackUp, imgRaceTrackDown, imgRaceTrackGrass, imgRaceTrackUp, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackDown];
  maps[6][2] = [imgRaceTrackUp, imgRaceTrackCorner8, imgRaceTrackCorner2, imgRaceTrackFinishUp, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackDown];
  maps[6][3] = [imgRaceTrackUp, imgRaceTrackGrass, imgRaceTrackCorner8, imgRaceTrackCorner7, imgRaceTrackCorner5, imgRaceTrackLeft, imgRaceTrackCorner3];
  maps[6][4] = [imgRaceTrackCorner4, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackCorner3, imgRaceTrackGrass, imgRaceTrackGrass];

  maps[7][0] = [imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackCorner1, imgRaceTrackRight, imgRaceTrackRight, imgRaceTrackCorner2];
  maps[7][1] = [imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackUp, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackDown];
  maps[7][2] = [imgRaceTrackCorner1, imgRaceTrackRight, imgRaceTrackCorner2, imgRaceTrackFinishUp, imgRaceTrackGrass, imgRaceTrackGrass, imgRaceTrackDown];
  maps[7][3] = [imgRaceTrackUp, imgRaceTrackGrass, imgRaceTrackCorner8, imgRaceTrackCorner7, imgRaceTrackCorner5, imgRaceTrackLeft, imgRaceTrackCorner3];
  maps[7][4] = [imgRaceTrackCorner4, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackLeft, imgRaceTrackCorner3, imgRaceTrackGrass, imgRaceTrackGrass];

  // change the angle mode from RADIANS to DEGREES
  angleMode(DEGREES);

  // loads the font with the right text size
  loadFont('Minecraft.ttf', pixelFont => { 
    fill('white');                                                            // set the font color to white
    textFont(pixelFont);                                                      // set the font to var pixelfont
    textSize(36);                                                             // set the text size to 36

  })

  // loads the cars in
  changingData.purchased[0] = true;                                           // makes the first car already purchased
  shopCars = [imgRaceCarGreenWhite, imgRaceCarBlueWhite, imgRaceCarPinkWhite, imgRaceCarRedWhite, imgRaceCarNederland, imgRaceCarSpiderMan, imgRaceCarFerrari, imgRaceCarMercedez, imgRaceCarBarcelona, imgRaceCarAtleticoMadrid, imgRaceCarRealMadrid];
  
  // preloads 2 random cars to be placed in right the playmenu button
  randomcars[0] = Math.round(random(0, shopCars.length-1))                    // choose a random number between 0 and the shopcars length -1
  randomcars[1] = Math.round(random(0, shopCars.length-1))                    // choose a random number between 0 and the shopcars length -1
  while(randomcars[0] === selectedCar) {                                      // as long as the randomcar is the same as the selected car
    randomcars[0] = Math.round(random(0, shopCars.length-1))                  // choose a random number between 0 and the shopcars length -1
  }
  while(randomcars[1] === selectedCar || randomcars[1] === randomcars[0]){    // as long as the randomcar is the same as the selected car and the randomcar is the same as the first random car
    randomcars[1] = Math.round(random(0, shopCars.length-1))                  // choose a random number between 0 and the shopcars length -1
  }
  



  createCanvas(1344, 960);                                                    // create the canvas with a width of 1344 pixels and a height of 960 pixels
}

/**
 * draw
 * the code in this function is being called 60 times a second
 */

function draw() {
  background(168, 230, 29);                                                 // color the background
  
  if (gameStatus === MENU) {                                                // if the gamestatus in menu
    startMenu();                                                            // cal the function startMenu() in startMenu.js
    settings();                                                             // call the function settings() in settings.js
  }

  if (gameStatus === TUTORIAL) {                                             // if the gamestatus is tutorial
    tutorial();                                                              // call the function tutorial() in tutorial.js
  }

  if (gameStatus === PLAYMENU) {                                             // if the gamestatus is playmenu
    playMenu();                                                              // call the function playMenu() in playMenu.js
  }

  if (gameStatus === SHOP) {                                                 // if the gameStatus is shop
    shop();                                                                  // call the function shop() in shop.js
  }

  if (gameStatus === PLAY) {                                                 // if the gamestatus is play
    beweegAlles();                                                           // call the function beweegAlles() in script.js
    verwerkBotsing();                                                        // call the function verwerkBotsing() in script.js
    tekenAlles();                                                            // call the function tekenAlles() in script.js
    backButton(1234, 30);                                                    // call the function backButton with parameter 1234 and 30 in backButton.js
  }

  if (gameStatus === PAUSED) {                                                // if the gamestatus is paused
    tekenAlles();                                                             // call the function tekenAlles() at script.js
    backButton(1234, 30);                                                     // call the function backButton with parameters 1234 and 30 in backButton.js
  }

  if(gameStatus === MAPMENU) {                                                // if the gamestatus is mapmenu
    mapMenu();                                                                // call the function mapMenu() in mapMenu.js
  }

  if(gameStatus === FINISHED) {                                               // if the gamestatus is finished
    finished();                                                               // call the function finished() in finished.js
  }
  
  // this was created to instantly go to the tutorial game so you didn't have to go thru the entire menu
  if(testing === true) {                                                      // if testing is true
    gameStatus = PLAY;                                                        // set gamestatus to play  
    mapStatus = TUTORIALMAP;                                                  // set mapstatus to tutorial map
    racing = true;                                                            // set racing to true
    mouseXY();                                                                // when you press the x key it shows the x and y position of your cursor
    sliderbar(100, 100);                                                      // this was created for fun and adds nothing to the game; it's just a slider bar
  }
}