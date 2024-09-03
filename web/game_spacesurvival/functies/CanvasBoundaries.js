var verwerkBotsing = function() {
  
    // check of de speler naar het volgende canvas kan gaan
    if (speler.x> 1275) { 
      speler.x = 40;
      canvasStatus++;
     }
     
    if (speler.x <10 && canvasStatus !== 1) {
      speler.x = 1260;
      canvasStatus--;
    }
    if (speler.x < 10 && canvasStatus === 1) {
      speler.x = 10;
    }
    if (canvasStatus === 3 && speler.x > 1260 && speler.y <= 350) {
      
      speler.x = 1260;
    }
  
    if (canvasStatus === 5 && bossAlive === true && speler.x> 1260) {
      
      speler.x = 1260;
    }
    if (canvasStatus === 5 && bossAlive === true && speler.x < 20  ) {
      
      speler.x= 20;
    }
  
   };