var beweegAlles = function() {
  image(imgSky,0, 0, width, height); // tekenen van de achtergrond
  attackCooldown--;
  //zwaard
  if (bewegen === true){ // of je kan bewegen ofniet
  if (attack === true ) { // of je kan attacken of niet
    if (keyIsDown(E) && spelerFacing === 'links'&& attackCooldown < 0 ){ // links aanvallen
      
      
      attackCooldown = 30

      
      
    } 

    if(attackCooldown < 30 && attackCooldown > 0 && spelerFacing === 'links'){ // links aanvallen
      image(strike2,speler.x - hitBoxX - 20,speler.y - 45,hitBoxX ,30)

      
      if (canvasStatus ===5 && bossX + bossWidth > speler.x - hitBoxX  && bossAlive === true ) { // boss aanvallen
        bossHealth -= 5;
        if(linksBoss === true && spelerFacing === 'rechts') { // knockback van de boss
          bossX += 15
        }

        if(linksBoss === true && spelerFacing === 'links') { // knockback van de boss
          bossX -= 15
        }
      }

      if (canvasStatus === 3 && wiz.x3 + wiz.width > speler.x - hitBoxX &&  wiz.x3 < speler.x) {  // wizard aanvallen
        wiz.health3 -=1
      }
      
     }

   if(attackCooldown < 30 && attackCooldown > 0 && spelerFacing === 'rechts'){  // rechts aanvallen
    image(strike, speler.x + 20,speler.y - 45,hitBoxX, 30)

    // boss damagen
    if (canvasStatus === 5 && speler.x  + speler.width+ hitBoxX > bossX && bossAlive === true && bossX > speler.x) {
      bossHealth -= 5;
      if(rechtsBoss === true && spelerFacing === 'links') {
        bossX -= 15
      }

      if(rechtsBoss === true && spelerFacing === 'rechts') {
        bossX += 7
      }
    }
    if (canvasStatus === 3 && speler.x  + speler.width+ hitBoxX > wiz.x3 && wiz.x3> speler.x) { 
      wiz.health3 -=1
    }
   
   }
    
    if (keyIsDown(E)  && spelerFacing === 'rechts' && attackCooldown < 0){
      
      
      attackCooldown = 30

      
    }
   
  }
    // hier bewegen we de speler
  
    if (keyIsDown(A) ) {
      spelerImg = loop1links;
      speler.x = speler.x- 3;
      spelerFacing = 'links';
      if (keyIsDown(X)) {
        
       
         spelerImg = loop2links;
        speler.x= speler.x  - 4;
       
      
        
       }
    } else if (keyIsDown (D)) {
      
      spelerImg = loop1rechts ; 
      speler.x = speler.x + 3;
      spelerFacing = 'rechts';
      if (keyIsDown(X)) {
        
        speler.x = speler.x + 4  
        spelerImg = loop2rechts;
        
        
       
       
      }
    } else  {
      
      if (spelerFacing === 'rechts'){
        spelerImg = staanRechts;
      } if (spelerFacing === 'links') 
      { spelerImg = staanLinks; };
    }

    

    
  
  
  // SPRINGEN
  if (hoogte === true) {
    springHoogte = 10;
  }

    if (keyIsDown(Z)&& !spaceCooldown && hoogte === true) {

     springSnelheid = springHoogte;

      spaceCooldown = true;
      jump1= true
    }
    
    if (spaceCooldown === true && jump1 === true) { // jump code
      
      speler.y = speler.y - springSnelheid;
      springSnelheid = springSnelheid - gFactor;
    }
    if (spaceCooldown === false && jump1 === false) { // jump code
      springSnelheid = 10;
      speler.y = speler.y + springSnelheid;
      springSnelheid = springSnelheid + gFactor;
    }
    
    if (speler.y > grond) { // hierdoor valt de speler niet door de grond en de spacecooldown wordt gereset
      jump1 = false;
      spaceCooldown = false;
      speler.y = grond;
      
    }
    if ( springSnelheid > 5 && jump1 === false) {
      springSnelheid = 5;
    }
    }
  
  }