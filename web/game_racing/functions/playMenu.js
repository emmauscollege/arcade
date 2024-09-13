var playMenu = function() {
    if(mouseY > 260 && mouseY < 630 && controlStatus === PC){
        if (mouseX > 272 && mouseX < 622) {
            buttonHeight1 = 255;
            if(mouseIsPressed){
                button1Selected = true;
                button2Selected = false;
            }
        }else{
            buttonHeight1 = 260;
        }
        if(mouseX > 722 && mouseX < 1072) {
            buttonHeight2 = 255;
            if(mouseIsPressed){
                button1Selected = false;
                button2Selected = true;
            }
        }else{
            buttonHeight2 = 260;
        }
    }else{
        buttonHeight1 = 260;
        buttonHeight2 = 260;
    }

    if(button1Selected === true) {
        buttonHeight1 = 250;
    }
    if(button2Selected === true) {
        buttonHeight2 = 250;
    }
    if(keyIsDown(ENTER)) {
        if(button1Selected === true) {
            buttonHeight1 = 280;
        }else if(button2Selected === true) {
            buttonHeight2 = 280;
        }
    }
    backButton(75, 845);
    continueButton(1000, 845);

    image(imgStartMenuButtonLine, 272, 430, 350, 200);
    image(imgStartMenuButtonLine, 722, 430, 350, 200);

    image(imgCarBorder, 272, buttonHeight1, 350, 350);
    image(imgCarBorder, 722, buttonHeight2, 350, 350);

    text('Singleplayer', 345, buttonHeight1 + 305);
    text('1v1', 871, buttonHeight2 + 305);

    push();
    translate(910, buttonHeight2+230);
    rotate(165);
    image(shopCars[randomcars[0]], 0, 0, 104, 176);
    pop();
    push();
    translate(880, buttonHeight2+80);
    rotate(-15);
    image(shopCars[randomcars[1]], 0, 0, 104, 176);
    pop();

    push();
    translate(360, buttonHeight1+90);
    rotate(-25);
    image(shopCars[selectedCar], 0, 0, 104, 176);
    pop();
    image(imgClosed, 722, buttonHeight2+100, 350, 250);

    push();                                                                         // making a new layer              
    textSize(50);                                                                   // changing the text size
    var txtCoins = changingData.coins;
    text(txtCoins, 1344-textWidth(txtCoins)-50, 95);                                // text of the amount of coins in you account
    image(imgCoin, 1344-textWidth(txtCoins)-150, 40, 75, 75);                       // places the coin image
    pop();                                                                          // going out of the new layer
    
}