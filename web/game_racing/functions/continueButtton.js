/*
 * This file defines functions related to the continue button behavior.
 */

var continueButton = function(x,y) {
  var continueButtonHeight = y;                                                                   // height for the continuebutton is variable y
  if(gameStatus === PLAYMENU && controlStatus === PC) {                                           // if the status of the game is "PLAYMENU" and controlstatus is "PC"
    var continueButtonX = x;                                                                      // 
    var isJitter = false;                                                                         // Jitter is false
    if(mouseX > x && mouseX < x+200 && mouseY > y && mouseY < y+60 || selectedButton === -2) {    // if mouse is on the continuebutton or continuebutton is selected
      continueButtonHeight = y-5;                                                                 // height of the button goes minus five
      if(mouseIsPressed){                                                                         // if the mouse is pressed
        continueButtonHeight = y;                                                                 // the height of the button goes back to the standard
        if(button1Selected === true || button2Selected === true) {                                // if one of the two buttons is selected
          if(button2Selected === true) {                                                          // if button2 is selected
            isJitter = true;                                                                      // set Jitter to true
          }
        if(button1Selected === true) {                                                            // if button1 is selected
          setTimeout(() => {                                                                      // set a time out
            gameStatus = MAPMENU;                                                                 // status of te game is "MAPMENU"
          }, "100");                                                                              // time out is 100 ms
        }
      }else{                                                                                      // if no button is selected
        isJitter = true;                                                                          //  set Jitter to true
      }
    }
  }
  var jitterX = jitter(isJitter, continueButtonX);
  image(imgStartMenuButtonLine, jitterX, y+45, 250, 15);                                          // set image that is underneeth the button
  image(imgStartMenuButton, jitterX, continueButtonHeight, 250, 60);                              // 
    text('Continue [C]', jitterX+20, continueButtonHeight+41);
  }
  if(gameStatus === FINISHED) {
    if((mouseX > x && mouseX < x+350 && mouseY > y && mouseY < y+105 && controlStatus === PC) || selectedButton === 0) {
      if(controlStatus === PC) {
        selectedButton = 2;
      }
      continueButtonHeight = y - 5;
      if(mouseIsPressed && controlStatus === PC) {
        continueButtonHeight = y;
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
    }
    image(imgStartMenuButtonLine, x, y+78.75, 350, 26.25);
    image(imgStartMenuButton, x, continueButtonHeight, 350, 105);
    text('Continue [C]', x+30, continueButtonHeight+65);
  }
}

var jitter = function(isJitter, x){
    if(isJitter === true) {
        if(jitterItteration < 100) {
            jitterItteration++;
            return x+random(-5,5);
        }else{
            isJitter = false;
            jitterItteration = 0;
        }
    }else{
        return x;
    }
}

