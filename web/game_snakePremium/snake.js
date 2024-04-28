function Snake(){
 this.x = 400;
 this.y = 400;
 this.xspeed = 1;
 this.yspeed = 0;
 this.totaal = 0;
 this.staart = [];

//richting
 this.richting = function(x, y){
 this.xspeed = x;
 this.yspeed = y;

 }
//als je dood gaat
 this.dood = function(){
  for (var i = 0; i < this.staart.length; i++ ){
  var pos = this.staart[i];
  var a = dist(this.x, this.y, pos.x, pos.y);
  if (a === 0) {
    this.totaal = 0;
    this.staart = [];
    levens = 0;
    snake.richting(0, 0);
   }
   
  
    
  }
  //rood scherm als dood
if(levens === 0) {
    status = 4;
  }


  if (status == 4 && mouseIsPressed){
    document.location.reload();
  }


 
}


 //lichaam langer als eet
 this.eet = function (pos) {
   var a = dist(this.x, this.y, pos.x, pos.y);
   if (a === 0) {
     punten++;
     this.totaal++;
     return true;
   } 
   else{
     return false;
   }
 }

//tegen steen aan
 this.stoot = function (x,y) {
   var a = dist(this.x, this.y, x,y);
   if (a < 5) {
     levens = 0;
     snake.richting(0, 0);
     
     return true;
   } 
   else{
     return false;
   }
 }


 this.update = function(){
 if (this.totaal === this.staart.length){
  for (var i = 0; i < this.staart.length-1; i++) {
     this.staart[i] = this.staart[i+1];
  }

 }
this.staart[this.totaal-1] = createVector(this.x, this.y);

  
//snelheid
  this.x = this.x + this.xspeed*scl;
  this.y = this.y + this.yspeed*scl;

  this.x = constrain (this.x, 0, width-scl);
  this.y = constrain (this.y, 0, height-scl);

  
 }

 this.beeld = function(){
  //lichaam
   fill(sin(tick/2)*122+122,cos(tick/30)*50+200,122);
  for (var i = 0; i < this.staart.length; i++) {
     rect(this.staart[i].x, this.staart[i].y, scl, scl);
  }
//hoofd
 fill(255);
rect(this.x, this.y, scl, scl);


}
}

