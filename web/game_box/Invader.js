function Invader(x, y) {
  this.x = x;
  this.y = y;
  this.r = 10;
  this.xdir = 0.4;
  this.ydir = 0;
  this.toDelete = false;

  this.destroy = function () {
    this.toDelete = true;
  }

  this.move = function () {
    this.x = this.x + this.xdir;
    this.y = this.y + this.ydir;
  }

  this.show = function () {
    fill('green');
    stroke('green');
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  this.shiftDown = function () {
    this.xdir *= -1;
    this.y += 25
  }
}