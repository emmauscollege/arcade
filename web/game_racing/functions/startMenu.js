//starting menu with 
// play, tutorial and shop button

var startMenu = function() {
    if(placeButtons === true) {                                               
      placeText = false;
    }
    let currentString = stringMenu.substring(0, currentCharacter);
  
    // typing animation 'welcome . . .'
    text(currentString, (1344-textWidth(stringMenu))/2, 380); //x572
    if (currentCharacter < 14) {
      currentCharacter += 0.07;
    }else{
      if(placeButtons === false) {
        placeText = true;
      }
      currentCharacter -= 7;
    }
    //
  
    if(placeText === true && placeButtons === false) {
      var txtA = 'Press any key if you are playing on the arcade box.';
      var txtB = 'Move the mouse if you are playing on pc';
      text(txtA, 1344/2-textWidth(txtA)/2, 800);
      text(txtB, 1344/2-textWidth(txtB)/2, 850);
    }

    // play, and tutorial button
    if (placeButtons === true) {
      let heightPlayButton = 455;
      let heightTutorialButton = 595;
      let heightShopButton = 735;

      if(mouseX >= 472 && mouseX <= 872 && controlStatus === PC) {
        if(mouseY >= heightPlayButton && mouseY <= heightPlayButton+100 && controlStatus === PC) {
          selectedButton = 1;
          if(mouseIsPressed && mapStatus != SETTINGS) {
            setTimeout(() => {
              gameStatus = PLAYMENU;
            }, "100");
            selectedButton = 1;
            button1Selected = true;
            placeButtons = false;
          }
        }else if(mouseY >= heightTutorialButton && mouseY <= heightTutorialButton+100 && controlStatus === PC) {
          selectedButton = 2;
          if(mouseIsPressed && mapStatus != SETTINGS) {
            setTimeout(() => {
              gameStatus = TUTORIAL;
            }, "100");
            selectedButton = 2;
            placeButtons = false;
          }
        }else if(mouseY >= heightShopButton && mouseY <= heightShopButton+100 && controlStatus === PC) {
          selectedButton = 3;
          if(mouseIsPressed) {
            mapStatus = PLAY;
            setTimeout(() => {
              gameStatus = SHOP;
            }, "100");
            selectedButton = -2;
            placeButtons = false;
          }
        }
      }
  
      if (selectedButton === 1) {
        heightPlayButton = 450;
      }else{
        heightPlayButton = 455;
      }

      if (selectedButton === 2) {
        heightTutorialButton = 590;
      }else{
        heightTutorialButton = 595;
      }

      if (selectedButton === 3) {
        heightShopButton = 730;
      }else{
        heightShopButton = 735;
      }
      
  
      image(imgStartMenuButtonLine, 472, 540, 400, 15);
      image(imgStartMenuButton, 472, heightPlayButton, 400, 100);
      text('Play', 635, heightPlayButton+60);
  
      image(imgStartMenuButtonLine, 472, 680, 400, 15);
      image(imgStartMenuButton, 472, heightTutorialButton, 400, 100);
      text('Tutorial', 605, heightTutorialButton+60);

      image(imgStartMenuButtonLine, 472, 820, 400, 15);
      image(imgStartMenuButton, 472, heightShopButton, 400, 100);
      text('Shop', 635, heightShopButton+60);
      //
      push();                                                                         // making a new layer              
      textSize(50);                                                                   // changing the text size
      var txtCoins = changingData.coins;
      text(txtCoins, 1344-textWidth(txtCoins)-50, 95);                                // text of the amount of coins in you account
      image(imgCoin, 1344-textWidth(txtCoins)-150, 40, 75, 75);                       // places the coin image
      pop();                                                                          // going out of the new layer
    }
  }