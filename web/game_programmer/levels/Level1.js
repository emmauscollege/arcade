var trapslvl1 = function () {

  // traps trigger
  if (spelerX >= 255) {
    trapTriggered2 = true;
  }
  if (spelerX >= 360) {
    trapTriggered1 = true;
  }
  if (spelerX >= 652) {
    apple3 = true;
  }
  if (spelerX >= 760) {
    apple5 = true;
  }
  if (spelerX >= 905) {
    apple10 = true;
  }
  if (floorHeight === 580) {
    apple12 = true;
  }
  if (floorHeight === 150 && spelerX === 1265) {
    miniSpike = true;
  }
  if (floorHeight === 150 && spelerX === 950) {
    spikeWall = true;
  }
  if (spelerY <= 430 && spelerY >= 260 && spelerX <= 790 && spelerX >= 720 && platX[8] >= 680) {
    beweegPlatform = true;
  }
  if (spelerY <= 290 && spelerY >= 230 && spelerX <= 320 && spelerX >= 150) {
    kill20Right = true;
  }
  if (spelerY <= 150 && spelerX >= 340) {
    kill20Up = true;
  }
  if (spelerY < 500 && spelerX < 1090) {
    kill22L = true;
  }

  //traps move after trigger
  if (trapTriggered2 === true) {
    killY[1] += 10;
    drawSpikeYDown[0] += 10;
  }
  if (trapTriggered1 === true && killX[2] <= 360) {
    killX[2] += 10;
    drawSpikeXUp[3] += 10;
    drawSpikeXUp[4] += 10;
  }
  if (apple3 === true) {
    killY[3] += 12;
    drawAppleY[0] += 12;
  }
  if (apple5 === true && killHeight[5] <= 70) {
    killHeight[5] += 30;
    drawAppleHeight[2] += 30;
  }
  if (apple10 === true) {
    killY[10] += 15;
    drawAppleY[7] += 15;
  }
  if (apple12 === true) {
    killX[12] += 7;
    drawAppleX[9] += 7;
  }
  if (miniSpike === true) {
    killY[15] -= 10;
  }

  // spikeWall
  if (spikeWall === true) {
    killX[16] -= 8;
    drawSpikeXLeft[0] -= 8;
    drawSpikeXLeft[1] -= 8;
    drawSpikeXLeft[2] -= 8;
    drawSpikeXLeft[3] -= 8;
    drawSpikeXLeft[4] -= 8;
  }
  if (spikeWall === true && killX[16] === 520) {
    spikeWall = false;
  }
  if (killX[16] === 520) {
    timer -= 1;
  }
  if (timer === 0) {
    killX[16] += 8;
    drawSpikeXLeft[0] += 8;
    drawSpikeXLeft[1] += 8;
    drawSpikeXLeft[2] += 8;
    drawSpikeXLeft[3] += 8;
    drawSpikeXLeft[4] += 8;
  }

  // trapPlatform
  if (beweegPlatform === true && platX[7] >= 640) {
    platX[7] -= 10;
  }
  if (beweegPlatform === true) {
    beweegPlatform = false;
  }

  // 2StageSpike
  if (kill20Right === true && killX[20] <= 380) {
    killX[20] += 7;
    drawSpikeXRight[0] += 7;
  }
  if (kill20Up === true) {
    killY[20] -= 10;
    drawSpikeYRight[0] -= 10;
  }

  // 2StageSpike 2
  if (kill22L === true && drawSpikeXUp[39] > 1030 && move22 === true) {
    killX[22] -= 15;
    drawSpikeXUp[39] -= 15;
  }

  if (spelerX >= 980 && spelerY < 145 && drawSpikeYUp[39] > 126) {
    killY[22] -= 15;
    drawSpikeYUp[39] -= 15;

    move22 = false;
  }
  if (drawSpikeYUp[39] <= 126) {
    timer2 -= 10;

  }
  if (timer2 <= 0) {
    killX[22] += 10;
    drawSpikeXUp[39] += 10;
  }
};
