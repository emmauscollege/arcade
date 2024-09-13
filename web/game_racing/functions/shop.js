
var shop = function(){
  if(targetPos - 1344 < (375*(changingData.purchased.length))*-1 -50){                         // if the target x-position + the width of the screen is smaller then the width of all shop car blocks: (its smaller because targetPos a negative number is)
    targetPos = 375*(changingData.purchased.length)*-1 + 1344 -50;                             // set the target x-position to the width of all shop car blocks
  }
  if(targetPos > 0) {                                                             // if the target postion is bigger then 0:
    targetPos = 0;                                                                // set the target postion to 0
  }
  if(posShop < targetPos){                                                        // if the x-position of the shop is smaller then the target postion of the shop:
    posShop += 40;                                                                // increas the x-position of the shop by 40 pixels 
  }
  if(posShop > targetPos){                                                        // if the x-position of the shop is bigger then the target postion of the shop:
    posShop -= 40;                                                                // decreas the x-position of the shop by 40 pixels
  }


for(var i = 0; i < changingData.purchased.length; i++) {                          // loop for all buttons (so all cars in the shop)    
  if(mouseY > 600 && mouseY < 680 && controlStatus === PC) {                                              // check if the mouse height is on the same height as the purchase button
      if(mouseX > posShop + 75 + 375*i && mouseX < posShop + 375 + 375*i && controlStatus === PC) {       // if the x-position of the mouse is on the purchase button, posShop is added so it accounts for the displacement of the shop when scolling
        // selectedButton = i;
        // selectedButtonHistory = i;
        buyButtonHeight[i] = 595;                                                 // move the button slightly up so you see it when hovering over
        if(mouseIsPressed) {                                                      // check if the mousebutton is pressed
          buyButtonHeight[i] = 600;                                               // move the button down so you see that you pressed it
          if(changingData.purchased[i] != false & changingData.purchased[i] != true) {                      // check if the car isn't purchased or selected already
            if(changingData.coins-changingData.purchased[i] >= 0) {                                         // check if you have enough coins
              changingData.coins -= changingData.purchased[i];                                              // remove the coins off of your account
              changingData.purchased[i] = false;                                               // set the car to purchased (false)
            }
          }else{                                                                  // for if the car has already been purchased:
            for(var t = 0; t < changingData.purchased.length; t++) {                           // loop through all cars again
              if(changingData.purchased[t] != true && changingData.purchased[t] != false){                  // check if the car has been selected
                changingData.purchased[t] = changingData.purchased[t];                                      // if it hasn't been bought, do nothing
              }else{
                changingData.purchased[t] = false;                                             // else de-select it
              }
            }
            changingData.purchased[i] = true;                                                  // select the car that has been clicked
            selectedCar = i;                                                      // set the selected car to the integer so it can be found later on
            randomcars[0] = Math.round(random(0, shopCars.length-1))
            randomcars[1] = Math.round(random(0, shopCars.length-1))
            while(randomcars[0] === selectedCar) {
              randomcars[0] = Math.round(random(0, shopCars.length-1))
            }
            while(randomcars[1] === selectedCar && randomcars[1] === randomcars[0]){
              randomcars[1] = Math.round(random(0, shopCars.length-1))
            }
          }
        }
      }else{
        buyButtonHeight[i] = 600;                                                 // revert the button to original height
      }
    
  }else{
    if(!keyIsDown(ENTER)) {                                                       // check if the enter key hasn't been pressed, if so:
      if(selectedButton === i) {                                                  // if the selectedbutton is the same as the integer it looping for:
        buyButtonHeight[i] = 595;                                                 // put the button 5 pixels up
      }else{
        buyButtonHeight[i] = 600;                                                 // else revert to original height
      }  
    }
  }
  image(imgStartMenuButtonLine, posShop + 75 + 375*i, 660, 300, 20);              // places the images that are behind the button
  image(imgStartMenuButton, posShop + 75 + 375*i, buyButtonHeight[i], 300, 80);   // places the images for the buttons
  image(imgCarBorder, posShop + 75 + 375*i, 280, 300, 300);                       // places the images for the car border (the square where the car is on)
  image(shopCars[i], posShop + 75 + 98 + 375*i, 342, 104, 176);                   // places all cars in the list (shopCars)
  if(changingData.purchased[i] != true && changingData.purchased[i] != false) {                             // check if the car hasn't been purchased if so:
    text(changingData.purchased[i], posShop + 75 + 155 + 377*i, buyButtonHeight[i] + 53);      // place the text with the price of the car
    image(imgCoin, posShop  + 75 + 95 + 377*i, buyButtonHeight[i] + 20, 40, 40);  // places the coin image
  }else if(changingData.purchased[i] === false){                                               // check if the car has been purchased but nog selected:
    text('Select', posShop + 75 + 98 + 377*i, buyButtonHeight[i] + 53);           // place the text: 'Select'
  }else if(changingData.purchased[i] === true){                                                // check if the car has been selected:
    text('Selected', posShop + 75 + 79 + 377*i, buyButtonHeight[i] + 53);         // place the text; 'Selected'
  }
}
  backButton(75, 845);                                                            // when pressed brings you back to the home menu (see backButton.js)
  
  push();                                                                         // making a new layer              
  textSize(50);                                                                   // changing the text size
  var txtCoins = changingData.coins;
  text(txtCoins, 1344-textWidth(txtCoins)-50, 95);                                // text of the amount of coins in you account
  image(imgCoin, 1344-textWidth(txtCoins)-150, 40, 75, 75);                       // places the coin image
  pop();                                                                          // going out of the new layer

  if(selectedButtonHistory < 0) {
    selectedButtonHistory = 0;
  }
  
}

function mouseWheel(event) {                                                      // function called when using the scroll wheel
  if(controlStatus === PC) {
    targetPos += event.delta/5;                                                     // add or substract from the target position based on wich direction the mouse wheel is scrolling
  }
}