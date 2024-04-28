function Ship() {
  this.x = width / 2;

  this.show = function () {
    stroke('white');
    fill('white');
    rectMode(CENTER);
    rect(this.x, 585, 40, 5);
    rect(this.x, 580, 30, 5);
    rect(this.x, 575, 10, 5);
  }

  this.move = function (dir) {
    if(this.x < 20 ){
      this.x = 20;
    }
    if(this.x > 680){
      this.x = 680;
    }
    this.x += dir * 3;
  }

  this.getX = function () {
    return this.x;
  }
}