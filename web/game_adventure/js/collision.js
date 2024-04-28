class Collision {
  constructor() {
    this.tile_c;
    this.tile_r;
    this.value_at_tile;
  }

  run(lvl) {

    function leftCollision(object, column) {

      if (object.x_velocity > 0) { // Check of de speler naar rechts loopt.
        let left = column * world.tile_size; // Bereken de linker kant van de tegel waarmee de speler botst.

        if (object.x + object.width * 0.5 > left && object.old_x + object.width * 0.5 <= left) { // Als de speler aan de rechter kant van het object was, maar nu naar links is bewogen.

          object.x_velocity = 0; // Stop met bewegen
          object.old_x = object.x = left - object.width * 0.5 - 0.001; // Plaats het object buiten het botsing gebied.
          // De - 0.001 is er eigenlijk alleen om ervoor te zorgen dat de speler zich niet meer in het botsing gebied bevindt, meer niet ;).

          return true;

        }

      }

      return false;

    }

    function rightCollision(object, column) {
      if (object.x_velocity < 0) {

        let right = (column + 1) * world.tile_size;

        if (object.x + object.width * 0.5 < right && object.old_x + object.width * 0.5 >= right) {

          object.x_velocity = 0;
          object.old_x = object.x = right - object.width * 0.5;

          return true;

        }

      }
      return false;
    }


    function topCollision(object, row) {
      if (object.y_velocity > 0) {
        let top = row * world.tile_size;

        if (object.y + object.height > top && object.old_y + object.height <= top) {
          object.jumping = false;
          object.y_velocity = 0;
          object.old_y = object.y = top - object.height - 0.01;

          return true;
        }
      }
      return false;
    }

    // Check of de speler zich richting de buitenkant van het gameveld begeeft, om dit te voorkomen wordt de x-positie van de speler aangepast.
    if (player.x <= 0) { // Linker kant
      player.x = 0;

    } else if (player.x >= width - 32) { // Rechter kant
      player.x = width - 32;

    }

    this.tile_c = floor((player.x + player.width * 0.5) / world.tile_size);
    this.tile_r = floor((player.y + player.height) / world.tile_size);
    this.value_at_tile = lvl.map[this.tile_r][this.tile_c];

    if (this.value_at_tile == !0) {

      // Vervolgens wordt er één van de onderstaande functies opgeroepen om de botsing detectie te starten, dit wordt gedaan met de waarden van de tegels die in het veld zijn geplaatst (zie 'world.js' voor de waarden).
      switch (this.value_at_tile) {
        case 1:
          topCollision(player, this.tile_r);
          break;
        case 2:
          leftCollision(player, this.tile_c);
          break;
        case 3:
          rightCollision(player, this.tile_c);
          break;
      }

    }
    this.tile_c = floor((player.x + player.width * 0.5) / world.tile_size);
    this.tile_r = floor((player.y + player.height) / world.tile_size);
    this.value_at_tile = lvl.map[this.tile_r][this.tile_c];

    if (this.value_at_tile != 0) {
      switch (this.value_at_tile) {
        case 1:
          topCollision(player, this.tile_r);
          leftCollision(player, this.tile_c);
          break;
        case 2:
          leftCollision(player, this.tile_c);
          break;
        case 3:
          rightCollision(player, this.tile_c);
          break;
      }
    }
  }
}
