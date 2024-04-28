class Finish {
  constructor(row, column, level) {
    this.x = column * 32;
    this.y = row * 32;
    this.nextLevel = level + 1;

    this.flag = loadImage('https://live.staticflickr.com/65535/48031885863_2e1bcb0c58_o.png');
  }

  show() {
    image(this.flag, this.x, this.y, 32, 32);
  }

  collision() {
    if (player.x >= this.x && player.x <= this.x + 32 && round(player.y) >= this.y && round(player.y) <= this.y + 32) {
      localStorage.setItem("nextLevel", this.nextLevel.toString());
      link('../level_completed.html');
    }
  }
}
