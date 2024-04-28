class Coin {
  constructor(row, column) {
    this.height = 32;
    this.width = 32;
    this.x = column * 32; // Bepaal de x-waarde d.m.v. de kolom parameter.
    this.y = row * 32; // Bepaal de y-waarde d.m.v. de rij parameter.

    this.frame_sets = [
      [0, 1, 2, 3, 4, 5] // De beschikbare 'states' waarin de munt zich kan bevinden (dus frames).
    ];

    this.count = 0;
    this.delay = 0;
    this.frame = 0;
    this.frame_index = 0;
    this.frame_set = 0;

    this.spritesheet = loadImage('https://live.staticflickr.com/65535/47945608603_27db21a84c_o.png');
  }

  change(frame_set, delay) {
    if (this.frame_set != frame_set) {
      this.count = 0;
      this.delay = delay;
      this.frame_index = 0;
      this.frame_set = frame_set;
      this.frame = this.frame_set[this.frame_index];
    }

  }

  show() {
    image(this.spritesheet, this.x, this.y, 32, 32, this.frame * 32, 0, 32, 32);
  }

  move() {
    this.change(this.frame_sets[0], 12);
  }

  // Update de munt met animatie.
  update(level) {
    this.count++;

    if (this.count >= this.delay) {
      this.count = 0; //Reset de teller.

      if (this.frame_index == this.frame_set.length - 1) {
        this.frame_index = 0;
      } else {
        this.frame_index += 1;
      } // Reset de index waarde.
      this.frame = this.frame_set[this.frame_index]; // Verander de frame-waarde.
    }


    if (player.x >= this.x && player.x <= this.x + 32 && round(player.y) >= this.y && round(player.y) <= this.y + 32) {
      for (let i = 0; i < level.coins.length; i++) {
        if (this.x == level.coins[i].x) { // Bepaal bij welk muntje de speler zich bevindt.
          level.coins.splice(i, 1);
          level.score++;
        }
      }
    }
  }
}
