class Player {
  constructor() {
    this.height = 32;
    this.width = 32;
    this.jumping = false;
    this.old_x = 100; // De oude_x wordt bijgehouden voor de botsing detectie, hiervoor is het namelijk van belang te weten vanaf welke kant de speler komt. Dit is mogelijk door middel van de oude x-locatie.
    this.old_y = height - 32 * 2 - 1; // Hetzelfde verhaal voor de oude_y. ^
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.x = 100;
    this.y = 500;

    this.frame_sets = [[0], [1, 2], [3], [4, 5]]; // Stilstaan rechts, lopen rechts, stilstaan links, lopen links (van links naar rechts).

    this.count = 0;
    this.delay = 0;
    this.frame = 0;
    this.frame_index = 0;
    this.frame_set = 0;

    this.spritesheet = loadImage('https://live.staticflickr.com/65535/47909011911_fdba18eed8_o.png');

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
    // Check of er op een toets in wordt gedrukt, als dat het geval is verander dan de speler's richting (of eventueel zet de beweging voort).
    if (keyIsDown(65)) { // LINKS (A)
      this.x_velocity -= 0.5;
      this.change(this.frame_sets[3], 12);
      this.dir = "left";
    }

    if (keyIsDown(68)) { // RECHTS (D)
      this.x_velocity += 0.60;
      this.change(this.frame_sets[1], 12);
      this.dir = "right";
    }

    if (keyIsDown(87) && !this.jumping) { // SPRINGEN (W)
      this.y_velocity -= 20;
      this.jumping = true;
    }

    if (this.dir == "left" && round(this.x_velocity) == 0) { // Als de speler stilstaat (links).
      this.change(this.frame_sets[2], 5);
    } else if (this.dir == "right" && round(this.x_velocity) == 0) { // Als de speler stilstaat (rechts).
      this.change(this.frame_sets[0], 5);
    }

  }

  update() {
    this.y_velocity += 2.3; // Zwaartekracht

    this.old_x = this.x;
    this.old_y = this.y;

    this.x += this.x_velocity;
    this.y += this.y_velocity;
    this.x_velocity *= 0.87 // Wrijving
    this.y_velocity *= 0.997 // Wrijving

    this.count++;

    if (this.count >= this.delay) {
      this.count = 0; // Reset de teller.

      if (this.frame_index == this.frame_set.length - 1) {
        this.frame_index = 0;
      } else {
        this.frame_index += 1;
      } // Reset de index waarde.
      this.frame = this.frame_set[this.frame_index]; // Verander de frame waarde.
    }
  }
}
