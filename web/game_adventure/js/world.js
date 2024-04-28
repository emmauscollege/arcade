class World {
  constructor() {
    // Basis informatie die voor elke gegenereerde wereld geldt.
    this.map; // Een variabele wat wordt aangepast zodra het level is geladen.
    this.rows = 30; // Het aantal rijen.
    this.columns = 20; // Het aantal kolommen.
    this.tile_size = 32; // Het aantal beschikbare tegels in de wereld (rijen x kolommen).

    // Alle beschikbare tegels (de plaatjes daarvan):
    this.day = loadImage('https://live.staticflickr.com/65535/46856297885_2fbdf50340_o.jpg');
    this.night = loadImage('https://live.staticflickr.com/65535/46983574324_fd9c2cd372_o.jpg');
    this.soil = loadImage('https://live.staticflickr.com/65535/46983574194_f121694baa_o.png');
    this.grass = loadImage('https://live.staticflickr.com/65535/46983574054_a23a71bdb0_o.png');
    this.lamp_bottom = loadImage('https://live.staticflickr.com/65535/33895656968_0fb4a08000_o.png');
    this.lamp_top = loadImage('https://live.staticflickr.com/65535/47720374242_f83b9588d0_o.png');
    this.flower = loadImage('https://live.staticflickr.com/65535/46983813184_e8f407e7e9_o.png');
    this.chest = loadImage('https://live.staticflickr.com/65535/33895942828_0c2bf28b1f_o.png');
    this.tree_0 = loadImage('https://live.staticflickr.com/65535/46984117644_6d4260e76a_o.png');
    this.tree_1 = loadImage('https://live.staticflickr.com/65535/46856848055_ecd9cecb86_o.png');
    this.tree_2 = loadImage('https://live.staticflickr.com/65535/46984117624_3a077dc6db_o.png');
    this.tree_3 = loadImage('https://live.staticflickr.com/65535/46984117564_c801b9708f_o.png');
    this.tree_4 = loadImage('https://live.staticflickr.com/65535/46856847955_63ed8e3d40_o.png');
    this.tree_5 = loadImage('https://live.staticflickr.com/65535/47720915582_b47996cf1c_o.png');
    this.tree_6 = loadImage('https://live.staticflickr.com/65535/40807802633_c8ee653102_o.png');
    this.tree_7 = loadImage('https://live.staticflickr.com/65535/40807456263_dd736ab014_o.png');
    this.tree_8 = loadImage('https://live.staticflickr.com/65535/46984480804_c222294206_o.png');
    this.tree_9 = loadImage('https://live.staticflickr.com/65535/46984480654_1b9010176f_o.png');
    this.tree_10 = loadImage('https://live.staticflickr.com/65535/40807456113_6c108ff2ba_o.png');
    this.tree_11 = loadImage('https://live.staticflickr.com/65535/46984480544_24a1fd3032_o.png');
  }

  // Hier worden de botsing detectie en de plaatjes met elkaar gecombineerd, in een bepaalde waarde die vervolgens weer bij een level gabruikt kan worden.
  load(lvl) {
    for (let r = 0; r < lvl.map.length; r++) {
      for(let c = 0; c < width/32; c++) {
        switch (lvl.map[r][c]) {
          case 1: //BOTSING TOP
            image(this.soil, c*32, r*32, 32, 32);
            break;
          case 2: //BOTSING LINKS
            image(this.soil, c*32, r*32, 32, 32);
            break;
          case 3: //BOTSING RECHTS
            image(this.soil, c*32, r*32, 32, 32);
            break;
          case 4:
            image(this.soil, c*32, r*32, 32, 32);
            break;
          case 5:
            image(this.grass, c*32, r*32, 32, 32);
            break;
          case 6:
            image(this.lamp_bottom, c*32, r*32, 32, 32);
            break;
          case 7:
            image(this.lamp_top, c*32, r*32, 32, 32);
            break;
          case 8:
            image(this.flower, c*32, r*32, 32, 32);
            break;
          case 9:
            image(this.chest, c*32, r*32, 32, 32);
            break;
          case 10:
            image(this.tree_0, c*32, r*32, 32, 32);
            break;
          case 11:
            image(this.tree_1, c*32, r*32, 32, 32);
            break;
          case 12:
            image(this.tree_2, c*32, r*32, 32, 32);
            break;
          case 13:
            image(this.tree_3, c*32, r*32, 32, 32);
            break;
          case 14:
            image(this.tree_4, c*32, r*32, 32, 32);
            break;
          case 15:
            image(this.tree_5, c*32, r*32, 32, 32);
            break;
          case 16:
            image(this.tree_6, c*32, r*32, 32, 32);
            break;
          case 17:
            image(this.tree_7, c*32, r*32, 32, 32);
            break;
          case 18:
            image(this.tree_8, c*32, r*32, 32, 32);
            break;
          case 19:
            image(this.tree_9, c*32, r*32, 32, 32);
            break;
          case 20:
            image(this.tree_10, c*32, r*32, 32, 32);
            break;
          case 21:
            image(this.tree_11, c*32, r*32, 32, 32);
            break;
        }
      }
    }
  }
}
