class Ghost {
  constructor(row, column, steps) {
    this.height = 32;
    this.width = 32;
    this.old_x = 0;
    this.old_y = 0;
    this.x_velocity = 0;
    this.start_y = row * 32;
    this.start_x = column * 32;
    this.y = this.start_y;
    this.x = this.start_x;
    this.destination = (column * 32) + (32 * steps/2);

    this.frame_sets = [[0, 1, 2, 3], [4, 5, 6, 7]]; // Stilstaan rechts, lopen rechts, stilstaan links, lopen links (van links naar rechts).
    this.count = 0;
    this.delay = 0;
    this.frame = 0;
    this.frame_index = 0;
    this.frame_set = 0;

    this.spritesheet = loadImage('https://live.staticflickr.com/65535/47929519417_8f8a1c3215_o.png');

    this.dir;
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

    if (this.x > this.destination) {
      this.x_velocity -= 0.005;
      this.dir = "left";
    } else if (this.x < this.destination) {
      this.x_velocity += 0.005;
      this.dir = "right";
    } else if (this.x == this.destination) {
      this.x_velocity *= -1;
    }

    if (this.x_velocity < 0) {
      this.change(this.frame_sets[0], 16);
    } else if (this.x_velocity > 0) {
      this.change(this.frame_sets[1], 16);
    }

  }

  update() {

    this.old_x = this.x;
    this.old_y = this.y;

    this.x += this.x_velocity;

    this.count++;

    if (this.count >= this.delay) {
      this.count = 0; // Reset de teller.

      if (this.frame_index == this.frame_set.length - 1) {
        this.frame_index = 0;
      } else {
        this.frame_index += 1;
      } // Reset de index waarde
      this.frame = this.frame_set[this.frame_index]; // Verander de frame waarde.
    }
  }
}
