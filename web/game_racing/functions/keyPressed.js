function keyPressed() {
  //
  if(placeText === true) {
    placeText = false;
    placeButtons = true;
    controlStatus = ARCADE;
  }else{
    /*
    * Right Arrow *
    */
    if(keyCode === RightArrow) {
      if(gameStatus === SHOP && controlStatus === ARCADE && selectedButtonHistory < changingData.purchased.length-1) { //shop
        selectedButton = selectedButtonHistory+1;
        selectedButtonHistory = selectedButton;
        targetPos = selectedButtonHistory*-375;
      }
      if(gameStatus === PLAYMENU && controlStatus === ARCADE) {
        if(button1Selected === true) {
          button1Selected = false;
          button2Selected = true;
        }else if(selectedButton === -1) {
          selectedButton = 1;
          button1Selected = true;
          button2Selected = false;
        }
      }
      if(gameStatus === TUTORIAL && controlStatus === ARCADE) {
        selectedButton = -2;
      }
      if(gameStatus === MAPMENU && controlStatus === ARCADE) {
        if(selectedButton < 2) {
          selectedButton++;
        }
      }
      if(gameStatus === FINISHED && controlStatus === ARCADE) {
        selectedButton = 0;
      }
    }

    /*
    * Left Arrow *
    */
    if(keyCode === LeftArrow) { //left arrow
      if(gameStatus === SHOP && controlStatus === ARCADE && selectedButtonHistory > -1) { //shop
        selectedButton = selectedButtonHistory-1;
        selectedButtonHistory = selectedButton;
        targetPos = selectedButtonHistory*-375;
        if(selectedButton <= -1) {
          selectedButton = 0;
        }
      }
      if(gameStatus === PLAYMENU && controlStatus === ARCADE) {
        if(button2Selected === true) {
          button1Selected = true;
          button2Selected = false;
        }else if(button1Selected === true) {
          selectedButton = -1;
          button1Selected = false;
        }else if(selectedButton === -2) {
          selectedButton = 1;
          button2Selected = true;
        }
      }
      if(gameStatus === TUTORIAL && controlStatus === ARCADE) {
        selectedButton = -1;
      }
      if(gameStatus === MAPMENU && controlStatus === ARCADE) {
        if(selectedButton > -1) {
          selectedButton--;
        }
      }
      if(gameStatus === FINISHED && controlStatus === ARCADE) {
        selectedButton = 1;
      }
    }

    /*
    *  Up Arrow *
    */
    if(keyCode === UpArrow) { //up arrow
      if((gameStatus === MENU && controlStatus === ARCADE && placeButtons === true) && ((selectedButton > 0 && mapStatus != SETTINGS) || (mapStatus === SETTINGS && selectedButton > 4))) { // start menu
        selectedButton--;
      }else if(selectedButton === 4 && mapStatus === SETTINGS) {
        selectedButton = 0;
      }
      if(gameStatus === SHOP) { //shop
        targetPos = selectedButtonHistory*-375;
        if(selectedButton === -1) {
          selectedButton = selectedButtonHistory;
        }
      }
    }

    /*
    * Down Arrow *
    */
    if(keyCode === DownArrow) { // down arrow
      if((gameStatus === MENU && controlStatus === ARCADE && placeButtons === true) && ((selectedButton < 3 && mapStatus != SETTINGS) || (selectedButton < 5 && mapStatus === SETTINGS && selectedButton != 0))) { // start menu
        selectedButton++;
      }else if(selectedButton === 0 && mapStatus === SETTINGS) {
        selectedButton = 4;
      }
      if(gameStatus === SHOP && controlStatus === ARCADE) { //shop
        selectedButton = -1;
        targetPos = selectedButtonHistory*-375;
      }
    }

    /*
    * S key *
    */
    if(keyCode === Skey) { // s key
      if(gameStatus === TUTORIAL && controlStatus === ARCADE && changingData.currentLine < 10) {
        setTimeout(() => {
          typingSpeed = 7;
        }, "100");
        buttonheight = 855;
      }
    }

    /*
    * B key *
    */
    if(keyCode === Bkey) {
      if(gameStatus === PLAYMENU) {
        selectedButton = 1;
      }
      if(gameStatus === TUTORIAL) {
        selectedButton = 2;
      }
      if(gameStatus === SHOP) {
        selectedButton = 3;
        targetPos = 0;
      }
      if(gameStatus != PLAY && gameStatus != PAUSED) {
        setTimeout(() => {
          gameStatus = MENU;
        }, "100");
      }
    }

    /*
    * C key *
    */
    if(keyCode === Ckey) { 
      if(gameStatus === TUTORIAL && controlStatus === ARCADE && changingData.currentLine >= 10) {
        setTimeout(() => {
          gameStatus = PLAY;
          mapStatus = TUTORIALMAP;
          mapPage = 0;
          player1X = player1XStart[mapPage];
          player1Y = player1YStart[mapPage];
        }, "100");
      }
      if(gameStatus === PAUSED) {
        gameStatus = PLAY;
      }
      if(gameStatus === PLAYMENU && button1Selected === true) {
        gameStatus = MAPMENU;
      }
    }

    /*
    * M key *
    */
    if(keyCode === Mkey) {
      if(gameStatus === PAUSED) {
        menuPausedButtonHeight[1] = 300;
        selectedMap = 0;
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
          timer = 5;                                                                          // reset the timer count to 5;
          maxvelocity = startMax;                                                             // set the maximum velocity to the starting max velocity
          racing = false;                                                                     // set racing to false
          if(mapStatus === TUTORIALMAP) {
            selectedButton = 2;
          }else{
            selectedButton = 1;
          }
          gameStatus = MENU;                                                                  // set the gamestatus to menu
          lapCount = 1;                                                                       // reset the lapcount to 1
          placeButtons = true;                                                                // set placebuttons to true
        }, "100");
      }
    }

    /*
    * P key *
    */
    if(keyCode === Pkey) {
      if(gameStatus === PLAY) {
        gameStatus = PAUSED;
      }else if(gameStatus === PAUSED) {
        gameStatus = PLAY;
      }
    }

    /*
    * R key *
    */
    if(keyCode === Rkey) {
      if(gameStatus === PAUSED) {
        menuPausedButtonHeight[2] = 300;
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
          gameStatus = PLAY;                                                                  // set the gamestatus to menu
          timer = 5;
          selectedButton = 1;                                                                 // set the selected button 1
          lapCount = 1;                                                                       // reset the lapcount to 1
          placeButtons = true;                                                                // set placebuttons to true
        }, "100");
      }
    }

    /*
    * Enter key *
    */
    if(keyCode === ENTER) { // enter key
      if(gameStatus === MENU && controlStatus === ARCADE) {
        if(selectedButton === 0) {
          if(mapStatus != SETTINGS) {
            mapStatus = SETTINGS;
            selectedButton = 4;
          }else{
            mapStatus = PLAY;
            selectedButton = 1;
          }
        }else if(selectedButton === 1) {
          selectedButton = 0;
          setTimeout(() => {
            gameStatus = PLAYMENU;
            button1Selected = true;
            button2Selected = false;
          }, "100");
        }else if(selectedButton === 2) {
          setTimeout(() => {
            gameStatus = TUTORIAL;
          }, "100");
          selectedButton = -1;
        }else if(selectedButton === 3) {
          setTimeout(() => {
            gameStatus = SHOP;
          }, "100");
          selectedButton = 0;
        }else if (selectedButton === 4) {
          changingData = getItem('Save');
          exported = 0;
          imported = 3;
        }else if (selectedButton === 5) {
          storeItem('Save', changingData);
          imported = 0;
          exported = 3;
        }
      }
      if(gameStatus === SHOP && controlStatus === ARCADE) {
        if(selectedButton >= 0 && selectedButton <= changingData.purchased.length) {
          buyButtonHeight[selectedButton] = 600;
          if(changingData.purchased[selectedButton] != false & changingData.purchased[selectedButton] != true) {                      // check if the car isn't purchased or selected already
            if(changingData.coins-changingData.purchased[selectedButton] >= 0) {                                         // check if you have enough coins
              changingData.coins -= changingData.purchased[selectedButton];                                              // remove the coins off of your account
              changingData.purchased[selectedButton] = false;                                               // set the car to purchased (false)
            }
          }else{                                                                  // for if the car has already been purchased:
            for(var t = 0; t < changingData.purchased.length; t++) {                           // loop through all cars again
              if(changingData.purchased[t] != true && changingData.purchased[t] != false){                  // check if the car has been selected
                changingData.purchased[t] = changingData.purchased[t];                                      // de-select it
              }else{
                changingData.purchased[t] = false;
              }
            }
            changingData.purchased[selectedButton] = true;                                                  // select the car that has been clicked
            selectedCar = selectedButton;                                                      // set the selected car to the integer so it can later be found
          }
        }
      }
      if(gameStatus === PLAYMENU) {
        if(button1Selected === true) {
          setTimeout(() => {
            gameStatus = MAPMENU;
          }, "100");
          selectedButton = 0;
        }
      }
      if(gameStatus === TUTORIAL) {
        if(selectedButton === -2) {
          buttonheight = 843;
          if(changingData.currentLine < 10) {
            typingSpeed = 7;
          }else{
            setTimeout(() => {
              gameStatus = PLAY;
              mapStatus = TUTORIALMAP;
              selectedMap = 0;
              player1X = player1XStart[selectedMap];
              player1Y = player1YStart[selectedMap];
            }, "100");
          }
        }
      }
      if(gameStatus === MAPMENU) {
        if(selectedButton === -1) {
          selectedButton = 1;
          gameStatus = MENU;
          mapPage = 1;
        }else if(selectedButton === 0) {
          if(changingData.mapLocked[mapPage] === false) {
            setTimeout(() => {
              mapStatus = PLAY;
              selectedMap = mapPage;
              player1X = player1XStart[selectedMap];
              player1Y = player1YStart[selectedMap];
              for(var i = 0; i < mapPaths[selectedMap].length; i++) {
                mapPaths[selectedMap][i][2] = false;
              }
              rotationP1 = 0;
              lapTimeMiliSeconds = 0;
              lapTimeSeconds = 0;
              velocity1 = 0;
              maxvelocity = startMax;
              racing = false;
              lapCount = 1;
              gameStatus = PLAY;
            }, "100");
          }
        }else if(selectedButton === 1) {
          if(mapPage > 1) {
            mapPage--;
          }
        }else if(selectedButton === 2) {
          if(mapPage+1 < maps.length) {
            mapPage++;
          }
        }
      }
      if(gameStatus === FINISHED) {
        if(selectedButton === 0) {
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
          gameStatus = MAPMENU;
          lapCount = 1;
          var totalStars = 0;
          for(var i = 0; i < changingData.stars.length-1; i++) {
            totalStars += changingData.stars[i];
          }
          for(var i = 0; i < starsRequired.length; i++) {
            if(totalStars >= starsRequired[i]) {
              changingData.mapLocked[i] = false;
            }
          }
        }
        if(selectedButton === 1) {
          changingData.coins += earned;
          earned = 0;
          player1X = player1XStart[selectedMap];
          player1Y = player1YStart[selectedMap];
          for(var i = 0; i < mapPaths[selectedMap].length; i++) {
            mapPaths[selectedMap][i][2] = false;
          }
          rotationP1 = 0;
          velocity1 = 0;
          selectedButton = 0;
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
    }
  }
}