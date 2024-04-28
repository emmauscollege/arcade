class Health {
  constructor() {
    this.health = 3;
    this.heart = loadImage('https://live.staticflickr.com/65535/47936848006_b9de995ba0_o.png');
  }

  collision(enemy, level) {
    this.count++
    if (player.x >= enemy.x -25 && player.x <= enemy.x + 25 && round(player.y) >= enemy.y && round(player.y) <= enemy.y + 32 && main_delay == 0) {
      this.health -= 1;
      main_delay = 60; // De vertraging is aanwezig om te voorkomen dat de speler meerdere levens verliest door even in de hitbox van de enemy te staan (dus je hebt de tijd om weg te lopen).
    }

    if (this.health <= 0) {
      localStorage.setItem("restartLevel", level.toString());
      link('../game_over.html');
    }
  }

  // Spreekt voor zich: toont het aantal hartjes op basis van de levens van de speler.
  display() {
    switch (this.health) {
      case 3:
        for (let i = 1; i < 4; i++) {
          image(this.heart, 670 - i * 45, 12, 32, 32);
        }
        break;
      case 2:
        for (let i = 1; i < 3; i++) {
          image(this.heart, 670 - i * 45, 12, 32, 32);
        }
        break;
      case 1:
        image(this.heart, 670 - 45, 12, 32, 32);
        break;
    }
  }
}
