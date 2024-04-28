
function drawScene() {
  background('white');
  strokeWeight(10);
  //outlines
  line(0, canvasY, 0, 0);
  line(canvasX, 0, 0, 0);
  line(0, canvasY - 1, canvasX, canvasY - 1);
  line(canvasX - 1, 0, canvasX - 1, canvasY);
  //borderlines
  line(0, canvasY / 3, canvasX, canvasY / 3);
  line(0, canvasY / 3 * 2, canvasX, canvasY / 3 * 2);
  line(canvasX / 3, 0, canvasX / 3, canvasY);
  line(canvasX / 3 * 2, 0, canvasX / 3 * 2, canvasY);
}

function mousePressed() {
  if(gameIsWonP1 === false && gameIsWonP2 === false){
  //linksboven
  if (mouseX >= canvasX - canvasX && mouseX <= canvasX / 3 && mouseY >= canvasY - canvasY && mouseY <= canvasY / 3) {

    if (turn === 0) {
      if (used2[0][0] === 0 && used1[0][0] === 0) {
        p1[0][0] = 1;
        turn = 1;
        print(turn);
      }
    } else {
      if (used1[0][0] === 0 && used2[0][0] === 0) {
        p2[0][0] = 1;
        turn = 0;
        print(turn);
      }
    }
  }
  //middenboven
  if (mouseX >= canvasX / 3 && mouseX <= canvasX / 3 * 2 && mouseY >= canvasY - canvasY && mouseY <= canvasY / 3) {
    if (turn === 0) {
      if (used2[0][1] === 0 && used1[0][1] === 0) {
        p1[0][1] = 1;
        turn = 1;
        print(turn);
      }
    } else {
      if (used1[0][1] === 0 && used2[0][1] === 0) {
        p2[0][1] = 1;
        turn = 0;
        print(turn);
      }
    }
  }

  //rechtsboven
  if (mouseX >= canvasX / 3 * 2 && mouseX <= canvasX && mouseY >= canvasY - canvasY && mouseY <= canvasY / 3) {
    if (turn === 0) {
      if (used2[0][2] === 0 && used1[0][2] === 0) {
        p1[0][2] = 1;
        turn = 1;
      }
    } else {
      if (used1[0][2] === 0 && used2[0][2] === 0) {
        p2[0][2] = 1;
        turn = 0;
      }
    }
    print(turn);
  }

  //linksmidden
  if (mouseX >= canvasX - canvasX && mouseX <= canvasX / 3 && mouseY >= canvasY / 3 && mouseY <= canvasY / 3 * 2) {
    if (turn === 0) {
      if (used2[1][0] === 0 && used1[1][0] === 0) {
        p1[1][0] = 1;
        turn = 1;
      }
    } else {
      if (used1[1][0] === 0 && used2[1][0] === 0) {
        p2[1][0] = 1;
        turn = 0;
      }
    }

  }

  //middenmidden
  if (mouseX >= canvasX / 3 && mouseX <= canvasX / 3 * 2 && mouseY >= canvasY / 3 && mouseY <= canvasY / 3 * 2) {
    if (turn === 0) {
      if (used2[1][1] === 0 && used1[1][1] === 0) {
        p1[1][1] = 1;
        turn = 1;
      }
    } else {
      if (used1[1][1] === 0 && used2[1][1] === 0) {
        p2[1][1] = 1;
        turn = 0;
      }
    }
  }

  //rechtsmidden
  if (mouseX >= canvasX / 3 * 2 && mouseX <= canvasX && mouseY >= canvasY / 3 && mouseY <= canvasY / 3 * 2) {
    if (turn === 0) {
      if (used2[1][2] === 0 && used1[1][2] === 0) {
        p1[1][2] = 1;
        turn = 1;
      }
    } else {
      if (used1[1][2] === 0 && used2[1][2] === 0) {
        p2[1][2] = 1;
        turn = 0;
      }
    }
  }

  //linksonder
  if (mouseX >= canvasX - canvasX && mouseX <= canvasX / 3 && mouseY >= canvasY / 3 * 2 && mouseY <= canvasY) {
    if (turn === 0) {
      if (used2[2][0] === 0 && used1[2][0] === 0) {
        p1[2][0] = 1;
        turn = 1;
      }
    } else {
      if (used1[2][0] === 0 && used2[2][0] === 0) {
        p2[2][0] = 1;
        turn = 0;
      }
    }
  }

  //middenonder
  if (mouseX >= canvasX / 3 && mouseX <= canvasX / 3 * 2 && mouseY >= canvasY / 3 * 2 && mouseY <= canvasY) {
    if (turn === 0) {
      if (used2[2][1] === 0 && used1[2][1] === 0) {
        p1[2][1] = 1;
        turn = 1;
      }
    } else {
      if (used1[2][1] === 0 && used2[2][1] === 0) {
        p2[2][1] = 1;
        turn = 0;
      }
    }

  }

  //rechtsonder
  if (mouseX >= canvasX / 3 * 2 && mouseX <= canvasX && mouseY >= canvasY / 3 * 2 && mouseY <= canvasY) {
    if (turn === 0) {
      if (used2[2][2] === 0 && used1[2][2] === 0) {
        p1[2][2] = 1;
        turn = 1;
      }
    } else {
      if (used1[2][2] === 0 && used2[2][2] === 0) {
        p2[2][2] = 1;
        turn = 0;
      }
    }
  }


}
}

function drawCC() {

  //circle LB
  if (p1[0][0] === 1 && used2[0][0] === 0) {
    fill('white');
    stroke('black');
    ellipse(canvasX / 3 / 2, canvasY / 3 / 2, 150, 150);
    used1[0][0] = 1;
  }
  //cross LB
  if (p2[0][0] === 1 && used1[0][0] === 0) {
    fill('white');
    stroke('black');
    line(canvasX / 3 / 4, canvasY / 3 / 4, canvasX / 3 / 4 * 3, canvasY / 3 / 4 * 3);
    line(canvasX / 3 / 4, canvasY / 3 / 4 * 3, canvasX / 3 / 4 * 3, canvasY / 3 / 4);
    used2[0][0] = 1;
  }


  //circle MB
  if (p1[0][1] === 1 && used2[0][1] === 0) {
    fill('white');
    stroke('black');
    ellipse(canvasX / 3 / 2 * 3, canvasY / 3 / 2, 150, 150);
    used1[0][1] = 1;

  }
  //cross MB
  if (p2[0][1] === 1 && used1[0][1] === 0) {
    fill('white');
    stroke('black');
    line(canvasX / 3 / 4 * 5, canvasY / 3 / 4, canvasX / 3 / 4 * 7, canvasY / 3 / 4 * 3);
    line(canvasX / 3 / 4 * 5, canvasY / 3 / 4 * 3, canvasX / 3 / 4 * 7, canvasY / 3 / 4);
    used2[0][1] = 1;

  }

  //circle RB
  if (p1[0][2] === 1 && used2[0][2] === 0) {
    fill('white');
    stroke('black');
    ellipse(canvasX / 3 / 2 * 5, canvasY / 3 / 2, 150, 150);
    used1[0][2] = 1;

  }
  //cross RB
  if (p2[0][2] === 1 && used1[0][2] === 0) {
    fill('white');
    stroke('black');
    line(canvasX / 3 / 4 * 9, canvasY / 3 / 4, canvasX / 3 / 4 * 11, canvasY / 3 / 4 * 3);
    line(canvasX / 3 / 4 * 9, canvasY / 3 / 4 * 3, canvasX / 3 / 4 * 11, canvasY / 3 / 4);
    used2[0][2] = 1;
  }

  //circle LM
  if (p1[1][0] === 1 && used2[1][0] === 0) {
    fill('white');
    stroke('black');
    ellipse(canvasX / 3 / 2, canvasY / 3 / 2 * 3, 150, 150);
    used1[1][0] = 1;
  }
  //cross LM
  if (p2[1][0] === 1 && used1[1][0] === 0) {
    fill('white');
    stroke('black');
    line(canvasX / 3 / 4, canvasY / 3 / 4 * 5, canvasX / 3 / 4 * 3, canvasY / 3 / 4 * 7);
    line(canvasX / 3 / 4, canvasY / 3 / 4 * 7, canvasX / 3 / 4 * 3, canvasY / 3 / 4 * 5);
    used2[1][0] = 1;
  }

  //circle MM
  if (p1[1][1] === 1 && used2[1][1] === 0) {
    fill('white');
    stroke('black');
    ellipse(canvasX / 3 / 2 * 3, canvasY / 3 / 2 * 3, 150, 150);
    used1[1][1] = 1;
  }
  //cross MM
  if (p2[1][1] === 1 && used1[1][1] === 0) {
    fill('white');
    stroke('black');
    line(canvasX / 3 / 4 * 5, canvasY / 3 / 4 * 5, canvasX / 3 / 4 * 7, canvasY / 3 / 4 * 7);
    line(canvasX / 3 / 4 * 5, canvasY / 3 / 4 * 7, canvasX / 3 / 4 * 7, canvasY / 3 / 4 * 5);
    used2[1][1] = 1;
  }

  //circle RM
  if (p1[1][2] === 1 && used2[1][2] === 0) {
    fill('white');
    stroke('black');
    ellipse(canvasX / 3 / 2 * 5, canvasY / 3 / 2 * 3, 150, 150);
    used1[1][2] = 1;
  }
  //cross RM
  if (p2[1][2] === 1 && used1[1][2] === 0) {
    fill('white');
    stroke('black');
    line(canvasX / 3 / 4 * 9, canvasY / 3 / 4 * 5, canvasX / 3 / 4 * 11, canvasY / 3 / 4 * 7);
    line(canvasX / 3 / 4 * 9, canvasY / 3 / 4 * 7, canvasX / 3 / 4 * 11, canvasY / 3 / 4 * 5);
    used2[1][2] = 1;
  }

  //circle LO 
  if (p1[2][0] === 1 && used2[2][0] === 0) {
    fill('white');
    stroke('black');
    ellipse(canvasX / 3 / 2, canvasY / 3 / 2 * 5, 150, 150);
    used1[2][0] = 1;
  }
  //cross LO
  if (p2[2][0] === 1 && used1[2][0] === 0) {
    fill('white');
    stroke('black');
    line(canvasX / 3 / 4, canvasY / 3 / 4 * 9, canvasX / 3 / 4 * 3, canvasY / 3 / 4 * 11);
    line(canvasX / 3 / 4, canvasY / 3 / 4 * 11, canvasX / 3 / 4 * 3, canvasY / 3 / 4 * 9);
    used2[2][0] = 1;
  }

  //cricle MO 
  if (p1[2][1] === 1 && used2[2][1] === 0) {
    fill('white');
    stroke('black');
    ellipse(canvasX / 3 / 2 * 3, canvasY / 3 / 2 * 5, 150, 150);
    used1[2][1] = 1;
  }
  //cross MO
  if (p2[2][1] === 1 && used1[2][1] === 0) {
    fill('white');
    stroke('black');
    line(canvasX / 3 / 4 * 5, canvasY / 3 / 4 * 9, canvasX / 3 / 4 * 7, canvasY / 3 / 4 * 11);
    line(canvasX / 3 / 4 * 5, canvasY / 3 / 4 * 11, canvasX / 3 / 4 * 7, canvasY / 3 / 4 * 9);
    used2[2][1] = 1;
  }

  //cricle LO 
  if (p1[2][2] === 1 && used2[2][2] === 0) {
    fill('white');
    stroke('black');
    ellipse(canvasX / 3 / 2 * 5, canvasY / 3 / 2 * 5, 150, 150);
    used1[2][2] = 1;
  }
  //cross LO
  if (p2[2][2] === 1 && used1[2][2] === 0) {
    fill('white');
    stroke('black');
    line(canvasX / 3 / 4 * 9, canvasY / 3 / 4 * 9, canvasX / 3 / 4 * 11, canvasY / 3 / 4 * 11);
    line(canvasX / 3 / 4 * 9, canvasY / 3 / 4 * 11, canvasX / 3 / 4 * 11, canvasY / 3 / 4 * 9);
    used2[2][2] = 1;
  }

}





function isGameWon() {

  //LB_MB_RB
  //circle
  if (p1[0][0] === 1 && p1[0][1] === 1 && p1[0][2] === 1) {
    gameIsWonP1 = true;
  }
  //cross
  if (p2[0][0] === 1 && p2[0][1] === 1 && p2[0][2] === 1) {
    gameIsWonP2 = true;
  }

  //LM_MM_RM
  //circle
  if (p1[1][0] === 1 && p1[1][1] === 1 && p1[1][2] === 1) {
    gameIsWonP1 = true;

  }
  if (p2[1][0] === 1 && p2[1][1] === 1 && p2[1][2] === 1) {
    gameIsWonP2 = true;
  }

  //LO_MO_RO
  //circle
  if (p1[2][0] === 1 && p1[2][1] === 1 && p1[2][2] === 1) {
    gameIsWonP1 = true;
  }
  if (p2[2][0] === 1 && p2[2][1] === 1 && p2[2][2] === 1) {
     gameIsWonP2 = true;
  }

  //LB_LM_LO
  //circle
  if (p1[0][0] === 1 && p1[1][0] === 1 && p1[2][0] === 1) {
    gameIsWonP1 = true;
  }
  if (p2[0][0] === 1 && p2[1][0] === 1 && p2[2][0] === 1) {
    gameIsWonP2 = true;
  }

  //MB_MM_MO
  if (p1[0][1] === 1 && p1[1][1] === 1 && p1[2][1] === 1) {
    gameIsWonP1 = true;
  }
  if (p2[0][1] === 1 && p2[1][1] === 1 && p2[2][1] === 1) {
    gameIsWonP2 = true;
  }

  //RB_RM_RO
  if (p1[0][2] === 1 && p1[1][2] === 1 && p1[2][2] === 1) {
    gameIsWonP1 = true;
  }
  if (p2[0][2] === 1 && p2[1][2] === 1 && p2[2][2] === 1) {
    gameIsWonP2 = true;
  }

  //LO_MM_RB
  if (p1[2][0] === 1 && p1[1][1] === 1 && p1[0][2] === 1) {
    gameIsWonP1 = true;
  }
  if (p2[2][0] === 1 && p2[1][1] === 1 && p2[0][2] === 1) {
    gameIsWonP2 = true;
  }

  //LB_MM_RO
  if (p1[0][0] === 1 && p1[1][1] === 1 && p1[2][2] === 1) {
    gameIsWonP1 = true;
  }
  if (p2[0][0] === 1 && p2[1][1] === 1 && p2[2][2] === 1) {
    gameIsWonP2 = true;
  }
  print(gameIsWonP1);
}


function drawWinnerScreen() {

  if (gameIsWonP1 === true) {
    fill('aqua');
    textSize(60);
    textFont('modern');
    text(p1GameWonText, canvasX / 2 / 2, canvasY / 2);
    print('hello');
  }
  if (gameIsWonP2 === true) {
    fill('aqua');
    textSize(60);
    textFont('modern');
    text(p2GameWonText, canvasX / 2 / 2, canvasY / 2);
    print('hello');
  }
}