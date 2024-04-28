function Invaderbullet(x, y) {
  this.x = x;
  this.y = y;
  this.r = 2;
  this.toDelete = false;

  this.show = function () {
    fill('white');
    stroke('white');
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  this.move = function () {
    this.y = this.y + 7;
  }

  this.hit = function (ship) {
    if (this.x <= shipX + 20 && this.x >= shipX - 20 && this.y >= 575 && this.y <= 585) {
        return true;
      } else {
        return false;
      }
  }

    this.remove = function () {
      this.toDelete = true;
    }
}