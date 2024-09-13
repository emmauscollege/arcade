var racingTimer = function() {
  if(racing === false) {
    if(timer > 0) {                                                               // Check if the variable 'timer' is about 0
      image(imgCountdownSquare, 642-48, 70, 96, 96);                              // placing the grey sqaure where the numbers are placed on
      push();                                                                     // making a new layer
      if( frameCount % 60 == 0) {                                               // modulo, divide by 60 with no rest
        timer--;                                                                // remove 1 second of the timer
      }
      textSize(60);                                                               // changing the text size
      text(timer, 644-textWidth(timer)/2, 140);                                                        // placing the text/number
      pop();                                                                      // going out of the new layer
    }else{                                                                        // if the timer is not bigger than 0 (it ended)
      timer = 5;                                                                  // put the timer back to 5 seconds
      racing = true;                                                              // turn on racing
    }
  }else{
    if(gameStatus != PAUSED) {
      if(frameCount%1===0){
        if(lapTimeMiliSeconds < 100){
          lapTimeMiliSeconds += 1.666666666667;
        }else{
          lapTimeMiliSeconds = 0;
          lapTimeSeconds++;
        }
      }
    }
    
    if(mapStatus != TUTORIALMAP) {
      image(imgCarBorder, 1344/2+5, 50, 200, 100);
      image(imgCarBorder, 1344/2-250, 50, 200, 100);
      push();                                                                        
      textSize(50);                                                                                     //change textsize to 50   
      
      text(lapTimeSeconds + '.' + round(lapTimeMiliSeconds), 780-textWidth(lapTimeSeconds + '.' + round(lapTimeMiliSeconds))/2, 120);                             //text for the laptime
      text(lapCount + '/3', 490, 120);                      
      pop();
    }else{
      image(imgCarBorder, 1344/2-100, 50, 200, 100);
      push();         
      textSize(60);                                                                                     // changing the text size                                                               
      text(lapTimeSeconds + '.' + round(lapTimeMiliSeconds), 625-textWidth(lapTimeSeconds + '.' + round(lapTimeMiliSeconds))/2, 120);                             //text for the laptime
      pop();
    }
  }
}