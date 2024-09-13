/*
 * Tutorial screen
 */
var tutorial = function() {
  if (mouseX > 1000 && mouseX < 1256 && mouseY > 850 && mouseY < 914 && controlStatus === PC) {
    buttonheight = 838;
    if (mouseIsPressed) {
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
    }else{
      buttonheight = 838;
    }
  }else{
    buttonheight = 843;
  }

  if(controlStatus === ARCADE) {
    if(selectedButton === -2) {
      buttonheight = 838;
    }else{
      buttonheight = 843;
    }
    if(keyIsDown(ENTER)) {
      buttonheight = 843;
    }
  }

  image(imgStartMenuButtonLine, 1000, 896);
  image(imgStartMenuButton, 1000, buttonheight);
  
  if (changingData.currentLine < 10) {
    text('Skip [S]', 1070, buttonheight + 43);
  }else{
    text('Continue [C]', 1025, buttonheight + 43);
  }
  
  tutorialTyping(1, 100)
  if(changingData.currentCharacterTut[0] >= stringTutorial[0].length) {
    changingData.currentLine = 2;
  }
  if(changingData.currentLine >= 2) {
    tutorialTyping(2, 150);
    if(changingData.currentCharacterTut[1] >= stringTutorial[1].length) {
      changingData.currentLine = 3;
    }
  }
  if(changingData.currentLine >= 3) {
    tutorialTyping(3, 250);
    if(changingData.currentCharacterTut[2] >= stringTutorial[2].length) {
      changingData.currentLine = 4;
    }
    if(changingData.currentCharacterTut[2] > 29) {
      image(imgArrowUp, 587, 223, 32, 32);
    }
  }
  if(changingData.currentLine >= 4) {
    tutorialTyping(4, 300);
    if(changingData.currentCharacterTut[3] >= stringTutorial[3].length) {
      changingData.currentLine = 5;
    }
    if(changingData.currentCharacterTut[3] > 25) {
      image(imgArrowDown, 492, 273, 32, 32);
    }
  }
  if(changingData.currentLine >= 5) {
    tutorialTyping(5, 350);
    if(changingData.currentCharacterTut[4] >= stringTutorial[4].length) {
      changingData.currentLine = 6;
    }
    if(changingData.currentCharacterTut[4] > 32) {
      image(imgArrowLeft, 611, 323, 32, 32);
    }
  }
  if(changingData.currentLine >= 6) {
    tutorialTyping(6, 400);
    if(changingData.currentCharacterTut[5] >= stringTutorial[5].length) {
      changingData.currentLine = 7;
    }
    if(changingData.currentCharacterTut[5] > 32) {
      image(imgArrowRight, 597, 373, 32, 32);
    }
  }
  if(changingData.currentLine >= 7) {
    tutorialTyping(7, 500);
    if(changingData.currentCharacterTut[6] >= stringTutorial[6].length) {
      changingData.currentLine = 8;
    }
  }
  if (changingData.currentLine >= 8) {
    tutorialTyping(8, 550);
    if(changingData.currentCharacterTut[7] >= stringTutorial[7].length) {
        changingData.currentLine = 9;
      }
    }
  if (changingData.currentLine >= 9) {
    tutorialTyping(9, 700);
    if(changingData.currentCharacterTut[8] >= stringTutorial[8].length) {
      changingData.currentLine = 10;
    }
  }
  backButton(75, 845);
  }

function tutorialTyping(currentLine, y) {
  text(stringTutorial[currentLine-1].substring(0, changingData.currentCharacterTut[currentLine-1]), 100, y);
  if(changingData.currentCharacterTut[currentLine-1] < stringTutorial[currentLine-1].length) {
    changingData.currentCharacterTut[currentLine-1] += typingSpeed;
  }
}