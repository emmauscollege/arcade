var mapMenu = function() {
  var hoveringStars = false;
  var squareSize = 100;
  var starSize = 100;
  var starPos = [1344/2-((starSize+starSize/8)*2+starSize)/2, 40];
  var displace = [(1344-squareSize*7)/2, (960-squareSize*5)/2-50];
  var nextMapLeftY = [845, 845];
  var nextMapRightY = [845, 845];
  var playButtonXY = [1344/2-150, 845];
  var nextMapX = 1139;
  image(imgCarBorder, displace[0]-29, displace[1]-19, squareSize*7+66, squareSize*5+50);
  for(let i = 0; i < maps[mapPage].length; i++) {
    for(let t = 0; t < maps[mapPage][i].length; t++){
      image(maps[mapPage][i][t], squareSize*t+5+displace[0], squareSize*i+5+displace[1], squareSize, squareSize);
    }
  }
  if(changingData.mapLocked[mapPage] === true) {
    image(imgTransparency, displace[0]-29, displace[1]-19, squareSize*7+66, squareSize*5+50);
    image(imgLock, 1344/2-90, 300, 180, 220);
  }
  if(controlStatus === ARCADE) {
    if(selectedButton === 0) {
      playButtonXY[1] = 840;
    }else{
      playButtonXY[1] = 845;
    }
    if(selectedButton === 1) {
      nextMapLeftY[1] = 840;
    }else{
      nextMapLeftY[1] = 845;
    }
    if(selectedButton === 2) {
      nextMapRightY[1] = 840;
    }else{
      nextMapRightY[1] = 845;
    }
    if(keyIsDown(ENTER)) {
      if(selectedButton === 0) {
        playButtonXY[1] = 845;
      }else if(selectedButton === 1) {
        nextMapLeftY[1] = 845;
      }else if(selectedButton === 2) {
        nextMapRightY[1] = 845;
      }
    }
  }else if(controlStatus === PC) {
    
    if(mouseY > nextMapLeftY[0] && mouseY < nextMapLeftY[0]+60) {
      if(mouseX > nextMapX && mouseX < nextMapX + 60) {
        nextMapLeftY[1] = 840;
        if(mouseIsPressed) {
          nextMapLeftY[1] = 845;
          if(mouseIsClicked === false) {
            mouseIsClicked = true;
            if(mapPage > 1) {
              mapPage--;
            }
          }
        }
      }

      if(mouseX > nextMapX+70 && mouseX < nextMapX+130){
        nextMapRightY[1] = 840;
        if(mouseIsPressed) {
          nextMapRightY[1] = 845;
          if(mouseIsClicked === false) {
            mouseIsClicked = true;
            if(mapPage+1 < maps.length) {
              mapPage++;
            }
          }
        }
      }
    }
    
    if(mouseX > playButtonXY[0] && mouseX < playButtonXY[0]+300 && mouseY > playButtonXY[1] && mouseY < playButtonXY[1]+75) {
      playButtonXY[1] = 840;
      if(mouseIsPressed) {
        playButtonXY[1] = 845;
        if(changingData.mapLocked[mapPage] === false) {
          selectedMap = mapPage;
          gameStatus = PLAY;
          mapStatus = PLAY;
          player1X = player1XStart[selectedMap];
          player1Y = player1YStart[selectedMap];
        }
      }
    }

    if(mouseY > 40-starSize/4 && mouseY < 40+starSize && mouseX > starPos[0] && mouseX < 1344/2+((starSize+starSize/8)*2+starSize)/2) {
      starSize = 101;
      hoveringStars = true;
    }
  }

  image(imgStartMenuButtonLine, playButtonXY[0], 845, 300, 75)
  image(imgStartMenuButton, playButtonXY[0], playButtonXY[1], 300, 75);
  
  push();
  textSize(50);
  text('Play', playButtonXY[0]+100, playButtonXY[1]+55);
  pop();

  image(imgStartMenuButtonLine, nextMapX, nextMapLeftY[0], 60, 60);
  image(imgStartMenuButtonLine, nextMapX+70, nextMapRightY[0], 60, 60);
  image(imgCarBorder, nextMapX, nextMapLeftY[1], 60, 60);
  image(imgCarBorder, nextMapX+70, nextMapRightY[1], 60, 60);
  push();
  textSize(60);
  text('<', nextMapX+18, nextMapLeftY[1]+53);
  text('>', nextMapX+92, nextMapRightY[1]+53);
  pop();


  
  starPos = [1344/2-((starSize+starSize/8)*2+starSize)/2, 40];

  for(var i = 0; i < 3; i++) {
    if(i != 1) {
      if(i < changingData.stars[mapPage]) {
        image(imgStarYellow, starPos[0]+i*(starSize+starSize*1/8), starPos[1], starSize, starSize);
      }else{
        image(imgStarGrey, starPos[0]+i*(starSize+starSize*1/8), starPos[1], starSize, starSize);
      }
    }else{
      if(i < changingData.stars[mapPage]) {
        image(imgStarYellow, starPos[0]+i*(starSize+starSize*1/8), starPos[1]-(starSize/4), starSize, starSize);
      }else{
        image(imgStarGrey, starPos[0]+i*(starSize+starSize*1/8), starPos[1]-(starSize/4), starSize, starSize);
      }
    }
  }
  if(changingData.highScore[mapPage][0] === false) {
    text('Record: N/A', 322, 760);
  }else{
    text('Record: ' + changingData.highScore[mapPage][0] + '.' + changingData.highScore[mapPage][1] + 's', 322, 760);
  }
  if(changingData.stars[mapPage] === 0) {
    text('Coins earned: 0', 750, 760);
  }else{
    text('Coins earned: ' + coinsPerTime[mapPage][changingData.stars[mapPage]-1], 750, 760)
  }
  if(hoveringStars === true) {
    starSize = 30;
    image(imgCarBorder, mouseX, mouseY, 400, 170);
    image(imgStarYellow, mouseX+40, mouseY+25, starSize, starSize);
    image(imgStarYellow, mouseX+40, mouseY+75, starSize, starSize);
    image(imgStarYellow, mouseX+40+(starSize/2+starSize/8), mouseY-(starSize/4)+70, starSize, starSize);
    image(imgStarYellow, mouseX+40, mouseY+115, starSize, starSize);
    image(imgStarYellow, mouseX+40+2*(starSize/2+starSize/8), mouseY+115, starSize, starSize);
    image(imgStarYellow, mouseX+40+(starSize/2+starSize/8), mouseY-(starSize/4)+115, starSize, starSize);
    text('< ' + beatTime[mapPage][0] + ' s | ' + coinsPerTime[mapPage][0], mouseX+115, mouseY+50);
    text('< ' + beatTime[mapPage][1] + ' s | ' + coinsPerTime[mapPage][1], mouseX+115, mouseY+98);
    text('< ' + beatTime[mapPage][2] + ' s | ' + coinsPerTime[mapPage][2], mouseX+115, mouseY+145);
    for(var i = 0; i < 3; i++) {
      image(imgCoin, mouseX+330, mouseY+20+i*48, starSize, starSize);
    }
    

  }
  backButton(75, 845); 
  push();                                                                         // making a new layer              
  textSize(50);                                                                   // changing the text size
  var txtCoins = changingData.coins;
  text(txtCoins, 1344-textWidth(txtCoins)-50, 95);                                // text of the amount of coins in you account
  image(imgCoin, 1344-textWidth(txtCoins)-150, 40, 75, 75);                       // places the coin image
  pop();                                                                          // going out of the new layer
}
//518.5

//220.75
//539.25

//9w - 11h
