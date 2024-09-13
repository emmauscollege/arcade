var finished = function(){
  push();                                                                                                                             //making a new layer
  textSize(50);                                                                                                                       //changing the text size
  text('Finished!', 1344/2-50*2, 160);                                                                                                //place text: 'Finished!'
  text('Record: ' + changingData.highScore[mapPage][0] + '.' + changingData.highScore[mapPage][1], 100, 210);                         //place text: 'Record:' + the current record
  text('Current Time: ' + lapTimeSeconds + '.' + round(lapTimeMiliSeconds), 100, 260);                                                //place text: 'Current time' + current lap time
  if(changingData.highScore[mapPage][0] === false) {    
    changingData.stars[mapPage] = 0;                                                                                                  //checking if highscore is set to false; never been set
    if(lapTimeSeconds < beatTime[mapPage][0] || (lapTimeSeconds === beatTime[mapPage][0] && round(lapTimeMiliSeconds) === 0)) {       //checking if lap time seconds is < then the time to beat for 1 star
      earned = coinsPerTime[mapPage][0];                                                                                              //set coin reward to reward for 1 star
      changingData.stars[mapPage] = 1;                                                                                                //set earned stars to 1
      if(lapTimeSeconds < beatTime[mapPage][1] || (lapTimeSeconds === beatTime[mapPage][1] && round(lapTimeMiliSeconds) === 0)) {     //checking if lap time seconds is < then the time to beat for 2 stars
        earned = coinsPerTime[mapPage][1];                                                                                            //set coin reward to reward for 2 stars
        changingData.stars[mapPage] = 2;                                                                                              //set earned stars to 2
        if(lapTimeSeconds < beatTime[mapPage][2] || (lapTimeSeconds === beatTime[mapPage][2] && round(lapTimeMiliSeconds) === 0)) {   //checking if lap time seconds is < then the time to beat for 3 star
          earned = coinsPerTime[mapPage][2];                                                                                          //set coin reward to reward for 3 stars
          changingData.stars[mapPage] = 3;                                                                                            //set earned stars to 3
        }
      }
    }
    changingData.highScore[mapPage][0] = lapTimeSeconds;                                                                              //setting the highscore seconds to current lap time seconds
    changingData.highScore[mapPage][1] = round(lapTimeMiliSeconds);                                                                   //setting the highscore miliseconds to current lap time miliseconds
  }else{                                                                                                                              //if highScore is not set to false; already set before
    if(lapTimeSeconds < changingData.highScore[mapPage][0] || (lapTimeSeconds === changingData.highScore[mapPage][0] && round(lapTimeMiliSeconds) <= changingData.highScore[mapPage][1])) {
      if(lapTimeSeconds < beatTime[mapPage][2] && changingData.stars === 0) {                                                         // checking if the lap tim seconds is smaller then the time needed to beat the map from 0 to 3 stars
        earned = coinsPerTime[mapPage][2];                                                                                            //set coins reward to reward for 3 stars
        changingData.stars[mapPage] = 3;                                                                                              // set the amount of stars for that map to 3
      }else if(lapTimeSeconds < beatTime[mapPage][2] & changingData.stars === 1) {                                                    // checking if the lap time seconds is smaller the nthe time needed to beat the map from 1 to 3 stars
        earned = coinsPerTime[mapPage][2]-coinsPerTime[mapPage][0];                                                                   //set coin reward to reward for 3 stars minus coin rewards for 1 star
        changingData.stars[mapPage] = 3;                                                                                              // set the amount of stars for that map to 3
      }else if(lapTimeSeconds < beatTime[mapPage][2] && changingData.stars[mapPage] === 2) {                                          // checking if the lap time seconds is 
        earned = coinsPerTime[mapPage][2]-coinsPerTime[mapPage][1];                                                                   //set coin reward to reward for 3 stars minus previous recieved coins
        changingData.stars[mapPage] = 3;                                                                                              // set the amount of stars for that map to 3
      }else if(lapTimeSeconds < beatTime[mapPage][1] && changingData.stars[mapPage] === 0) {                     
        earned = coinsPerTime[mapPage][1];                                                                                                            //set coins reward to reward for 2 stars
        changingData.stars[mapPage] = 2;                                                                                                                           //set earned stars to 2
      }else if(lapTimeSeconds < beatTime[mapPage][1] && changingData.stars[mapPage] === 1) {
        earned = coinsPerTime[mapPage][1]-coinsPerTime[mapPage][0];                                                                                   //set coin reward to reward for 2 stars minus previous recieved coins
        changingData.stars[mapPage] = 2;                                                                                                                           //set earned stars to 2
      }else if(lapTimeSeconds < beatTime[mapPage][0] && changingData.stars[mapPage] === 0) {
        earned = coinsPerTime[mapPage][0];                                                                                                            //set coin reward to reward for 1 star
        changingData.stars[mapPage] = 1;                                                                                                                           //set earned stars to 1
      }
      
      

      
      
      changingData.highScore[mapPage][0] = lapTimeSeconds;                                                                                                         //setting the highscore seconds to current lap time seconds
      changingData.highScore[mapPage][1] = round(lapTimeMiliSeconds);                                                                                              //setting the highscore miliseconds to current
    }
  }
  if(earned === 0) {
    earned = 1;
  }
  image(imgCoin, 100, 270, 40, 40);                                                                                                                    //place coin image
  text('Earned: ' + earned, 150, 310);                                                                                                                 //place text: 'Earned' + amount of coins earned
  image(imgCoin, 100, 320, 40, 40);                                                                                                                    //place coin image
  var total = changingData.coins+earned;                                                                                                                            //calculate total coins
  text('Total: ' + total, 150, 360);                                                                                                                   //place text: 'total' + amount of coins + amount of coins earned

  backButton(1344/2-350-25, 800);                                                                                                                      //place restart button
  continueButton(1344/2+25, 800);                                                                                                                      //place continue button
  pop();                                                                                                                                               //going out of new layer
}