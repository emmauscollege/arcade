var particlesW = 20;
var particlesH = 20;

var p0 = true;
var p1 = true;
var p2 = true;
var p3 = true;
var p4 = true;

var pDirection0;
var pDirection1;
var pDirection2;
var pDirection3;
var pDirection4;

var pL0 = 1;
var pR0 = 2;

var pL1 = 1;
var pR1 = 2;

var pL2 = 1;
var pR2 = 2;

var pL3 = 1;
var pR3 = 2;

var pL4 = 1;
var pR4 = 2;

function bossFight() {
  if (spelerX > 130 && wallHeight[1] <= 900) {
    trapTriggered1 = true;
  }
  if (trapTriggered1 === true) {
     if (cutscene < 250){
      cutscene ++;
      image(cutsceneI, 0, 0, 1280, 720);
    }
    wallHeight[1] += 20;
    spaceship.pause();
    bossSound.play();
    if (enemyHealth > 0 && cutscene >=250) {
      // enemy shooting
      
      if (killX[2] < 0) {
        pDirection0 = pR0;
        p0 = false;
      }
      if (killX[2] > 1100) {
        pDirection0 = pL0
      }
      if (pDirection0 === pR0) {
        killX[2] += random(5, 20);
      }
      if (pDirection0 === pL0) {
        killX[2] -= random(5, 20);
      }

      //1
      if (killX[3] < 0) {
        pDirection1 = pR1;
        p1 = false;
      }
      if (killX[3] > 1100) {
        pDirection1 = pL1;
      }
      if (pDirection1 === pR1) {
        killX[3] += random(0, 12);
      }

      if (pDirection1 === pL1) {
        killX[3] -= random(0, 12);
      }
      //2
      if (killX[4] < 0) {
        pDirection2 = pR2;
        p2 = false;
      }
      if (killX[4] > 1100) {
        pDirection2 = pL2;
      }
      if (pDirection2 === pR2) {
        killX[4] += random(5, 15);
      }

      if (pDirection2 === pL2) {
        killX[4] -= random(5, 15);
      }
      //3
      if (killX[5] < 0) {
        pDirection3 = pR3;
        p3 = false;
      }
      if (killX[5] > 1100) {
        pDirection3 = pL3;
      }
      if (pDirection3 === pR3) {
        killX[5] += random(10, 20);
      }
      if (pDirection3 === pL3) {
        killX[5] -= random(10, 20);
      }
      //4
      if (killX[6] < 0) {
        pDirection4 = pR4;
        p4 = false;
      }
      if (killX[6] > 1100) {
        pDirection4 = pL4;
      }
      if (pDirection4 === pR4) {
        killX[6] += random(5, 13);
      }

      if (pDirection4 === pL4) {
        killX[6] -= random(5, 13);
      }


    }
  }
  enemy = enemyNormal;
  if (bulletX >= enemyX &&
    bulletX <= enemyX + enemyW &&
    spelerY >= enemyY
  ) {
    enemyHealth --;
    shoot = false
    bulletX = spelerX;
    enemy = enemyHurt;
  } 
  if (immune === true) {
    text(enemyHealth, 800, 300, 250, 250);
  }

  //image(enemy, enemyX, enemyY, enemyW, enemyH);

};