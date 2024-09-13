var backButton = function(x, y) {
  var backButtonHeight = y;
  if(gameStatus === MENU || gameStatus === SHOP || gameStatus === PLAYMENU || gameStatus === TUTORIAL || gameStatus === MAPMENU) { 
    if((mouseX > x && mouseX < x+200 && mouseY > y && mouseY < y+60 && controlStatus === PC) || selectedButton === -1) {
      backButtonHeight = y-5;
      if(mouseIsPressed && controlStatus === PC){
        backButtonHeight = y;
        if(gameStatus === SHOP) {
          targetPos = 0;
        }
        placeButtons = true;
        setTimeout(() => {
          gameStatus = MENU;
          selectedButton = 1;
        }, "100");
      }else if(keyIsDown(ENTER)) {
        if(selectedButton === -1) {
          backButtonHeight = y;
          placeButtons = true;
          setTimeout(() => {
            if(gameStatus === PLAYMENU) {
               selectedButton = 1;
            }
            if(gameStatus === TUTORIAL) {
              selectedButton = 2;
            }
            if(gameStatus === SHOP) {
              selectedButton = 3;
            }
            gameStatus = MENU;
            selectedButtonHistory = 1;
          }, "100");
        }else{
          backButtonHeight = y-5;
        }
      }else{
        backButtonHeight = y-5;
      }
    }else{
      backButtonHeight = y;
    }
    image(imgStartMenuButtonLine, x, y+45, 200, 15);
    image(imgStartMenuButton, x, backButtonHeight, 200, 60);
    text('Back [B]', x+30, backButtonHeight+41);
  }
  if(gameStatus === PLAY || gameStatus === PAUSED) {                                            // if the gamestatus is set tot play or gamestatus is set to paused
    if(mouseX > x && mouseX < x+80 && mouseY > y && mouseY < y+80 && controlStatus === PC) {    // if mouse x and y is on the button and the controlstatus is set to pc
      backButtonHeight = y-5;                                                                   // change the height of the back button
      if(mouseIsPressed){                                                                       // if the mouse is pressed
        if(gameStatus === PLAY) {                                                               // if the gamestatus is play
          if(mouseReleasedButton === true) {                                                    // if the mouse wasn't pressed before
            gameStatus = PAUSED;                                                                // set the gamestatus to paused
          }
        }else if(gameStatus === PAUSED) {                                                       // if the gamestatus is paused
          if(mouseReleasedButton === true) {                                                    // if the mouse wasn't pressed before
            gameStatus = PLAY;                                                                  // set the gamestatus to play
          }
        }
        backButtonHeight = y;                                                                   // change the height of the back button
        mouseReleasedButton = false;                                                            // set the mouse to pressed
      }else{                                                                                    // if the mouse is not pressed
        backButtonHeight = y-5;                                                                 // change the height of the back button
      }
    }else{                                                                                      // if the mouse is not on the button
      backButtonHeight = y;                                                                     // change the height of the back button
    }
    image(imgStartMenuButtonLine, x, y, 80, 80);                                                // place the image underline
    image(imgCarBorder, x, backButtonHeight, 80, 80);                                           // place the car border image
    image(imgHomeButton, x+15, backButtonHeight+15, 50, 50);                                    // place the home button image
  }
  if(gameStatus === PAUSED) {                                                                   // if the gamestatus is set to paused
    if(mouseX > 472 && mouseX < 872 && controlStatus === PC){                                   // if the mouse x is on one of the three buttons and the controlstatus is set to pc
      // continue button
      if(mouseY > 300 && mouseY < 400 && controlStatus === PC){                                 // if the mouse y is on the button and the controlstatus is set to pc
        menuPausedButtonHeight [0] = 300-5;                                                     // change the button height
        if(mouseIsPressed){                                                                     // if the mouse key is pressed
          menuPausedButtonHeight[0] = 300;                                                      // change the button height
          setTimeout(() => {                                                                    // set a timeout for 100 ms
            gameStatus = PLAY;                                                                  // change the gamestatus to play
          }, "100");
        }
      }else{                                                                                    // if the mouse y is not on one of the buttons
        menuPausedButtonHeight [0] = 300;                                                       // change the button height
      }
      // menu button
      if(mouseY > 430 && mouseY < 530 && controlStatus === PC){                                 // if the mouse y is on the button and the controlstatus is set to pc
        menuPausedButtonHeight [1] = 300-5;                                                     // change the button height
        if(mouseIsPressed){                                                                     // if the mouse ket is pressed
          menuPausedButtonHeight[1] = 300;                                                      // change the button height
          // resetting all variables for a race
          setTimeout(() => {                                                                    // set a timeout for 100 ms
            player1X = player1XStart[selectedMap];                                              // set the player's x position to the starting x position for that map
            player1Y = player1YStart[selectedMap];                                              // set the player's y position to the starting y position for that map
            for(var i = 0; i < mapPaths[selectedMap].length; i++) {                             // loop for the length of the map path
              mapPaths[selectedMap][i][2] = false;                                              // set the current map path to false (not driven over)
            }
            rotationP1 = 0;                                                                     // reset the rotation of the player's car
            lapTimeMiliSeconds = 0;                                                             // reset the timer's miliseconds
            lapTimeSeconds = 0;                                                                 // reset the timer's seconds
            velocity1 = 0;                                                                      // set the player's velocity to 0
            maxvelocity = startMax;                                                             // set the maximum velocity to the starting max velocity
            racing = false;                                                                     // set racing to false
            gameStatus = MENU;                                                                  // set the gamestatus to menu
            selectedButton = 1;                                                                 // set the selected button 1
            lapCount = 1;                                                                       // reset the lapcount to 1
            placeButtons = true;                                                                // set placebuttons to true
          }, "100");
        }
      }else{                                                                                    // if the mouse is not on the y of the button
        menuPausedButtonHeight [1] = 300;                                                       // change the button height
      }
      // reset button
      if(mouseY > 560 && mouseY < 660 && controlStatus === PC){                                 // if the mouse is on the y position of the button and the controlstatus is set to pc
        menuPausedButtonHeight [2] = 300-5;                                                     // change the button height
        if(mouseIsPressed){                                                                     // if the mouse key is pressed
          menuPausedButtonHeight[2] = 300;                                                      // change the button height
          setTimeout(() => {                                                                    // set a timeout for 100 ms
            player1X = player1XStart[selectedMap];                                              // set the player's x position to the starting x position for that map
            player1Y = player1YStart[selectedMap];                                              // set the player's y position to the starting y position for that map
            for(var i = 0; i < mapPaths[selectedMap].length; i++) {                             // loop for the length of the map path
              mapPaths[selectedMap][i][2] = false;                                              // set the current map path to false (not driven over)
            }
            rotationP1 = 0;                                                                     // reset the rotation of the player's car
            lapTimeMiliSeconds = 0;                                                             // reset the timer's miliseconds
            lapTimeSeconds = 0;                                                                 // reset the timer's seconds
            velocity1 = 0;                                                                      // set the player's velocity to 0
            maxvelocity = startMax;                                                             // set the maximum velocity to the starting max velocity
            racing = false;                                                                     // set racing to false
            gameStatus =  PLAY;                                                                 // set the gamestatus to play
            lapCount = 1;                                                                       // reset the lapcount to 1
          }, "100");
        }
      }else {
        menuPausedButtonHeight [2] = 300;
      }
  }else{
    menuPausedButtonHeight [0] = 300;
    menuPausedButtonHeight [1] = 300;
    menuPausedButtonHeight [2] = 300;
  }
    image(imgFrameBorder, 372, 255);
    image(imgStartMenuButtonLine, 472, 385, 400, 15);
    image(imgStartMenuButtonLine,472, 385+130, 400, 15);
    image(imgStartMenuButtonLine,472, 385+260, 400, 15);
    image(imgStartMenuButton, 472, menuPausedButtonHeight [0], 400, 100);
    image(imgStartMenuButton, 472, menuPausedButtonHeight [1] + 130, 400, 100);
    image(imgStartMenuButton, 472, menuPausedButtonHeight [2] + 260, 400, 100);
    text('Continue [C]', 575, menuPausedButtonHeight [0] +36, 400, 100);
    text('Menu [M]', 606, menuPausedButtonHeight[1] +166, 400, 100);
    text('Restart [R]', 580, menuPausedButtonHeight[2] +296, 400,100); 
  }
  if(gameStatus === FINISHED) {
    if((mouseX > x && mouseX < x+350 && mouseY > y && mouseY < y+105 && controlStatus === PC) || selectedButton === 1) {
      if(controlStatus === PC) {
        selectedButton = 2;
      }
      backButtonHeight = y - 5;
      if(mouseIsPressed && controlStatus === PC) {
        backButtonHeight = y;
        changingData.coins += earned;
        earned = 0;
        player1X = player1XStart[selectedMap];
        player1Y = player1YStart[selectedMap];
        for(var i = 0; i < mapPaths[selectedMap].length; i++) {
          mapPaths[selectedMap][i][2] = false;
        }
        rotationP1 = 0;
        velocity1 = 0;
        lapTimeMiliSeconds = 0;
        lapTimeSeconds = 0;
        maxvelocity = startMax;
        racing = false;
        gameStatus = PLAY;
        lapCount = 1;
        var totalStars = 0;
        for(var i = 0; i < changingData.stars.length; i++) {
          totalStars += changingData.stars[i];
        }
        for(var i = 0; i < starsRequired.length-1; i++) {
          if(totalStars >= starsRequired[i]) {
            changingData.mapLocked[i] = false;
          }
        }
      }
    }
    image(imgStartMenuButtonLine, x, y+78.75, 350, 26.25);
    image(imgStartMenuButton, x, backButtonHeight, 350, 105);
    text('Restart [R]', x+40, backButtonHeight+65);
  }
}