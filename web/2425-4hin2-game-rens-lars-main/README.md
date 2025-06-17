[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=19182060)
Deze repo is onderdeel van het vak informatica op het Emmauscollege Rotterdam.

[Meer info over deze opdracht](https://informatica.emmauscollege.nl/opdrachten/game/)

## Emmaus Arcade
Als je wilt dat je game geschikt is voor Emmaus Arcade, zorg dan voor het volgende:
- Zet alle bestanden die nodig zijn in je repository, inclusief plaatjes, geluiden en fonts.
- Maak geen wijzigingen in gegeven code in index.html en style.css. Als je iets toevoegt, geef dat dan duidelijk met commentaar aan.
- Zet een scherm-afbeelding van je game in `screenshot.jpg`. De afmeting moet ongeveer 300x188 pixels zijn.
- Gebruik voor de bediening van je spel alleen toetsen die op de Arcade zitten.<br>
  - Gebruik pijltjes, spatie en enter als je spel daar genoeg aan heeft. Het maakt dan niet uit of de speler de rode of blauwe controls gebruikt.
  - Kies de rode controls voor ingewikkelder spellen. Gebruik rood en blauw voor nog ingewikkelder spellen.
  - Bij spellen met 2 spelers kies je rood voor speler 1 en blauw voor speler 2.
  ```
  Rode joystick:           WASD & pijltjes
  Rode knop linksboven:    Q & enter
  Rode knop middenboven:   E 
  Rode knop rechtsboven:   R 
  Rode knop linksonder:    Z & spatie
  Rode knop middenonder:   X
  Rode knop rechtsonder:   C
  Blauwe joystick:         IJKL & pijltjes
  Blauwe knop linksboven:  U & enter
  Blauwe knop middenboven: O
  Blauwe knop rechtsboven: P
  Blauwe knop linksonder:  B & spatie
  Blauwe knop middenonder: N
  Blauwe knop rechtsonder: M
  ```

## Documentatie
- Khan Academy cursus JavaScript met p5js library <br>
https://www.khanacademy.org/computing/computer-programming/programming
- p5js reference <br>
https://p5js.org/reference/
- informatie van Emmauscollege over game opdracht <br>
https://informatica.emmauscollege.nl/opdrachten/game/
- cursus games programmeren (verdieping voor wie meer wil leren)
https://cs50.harvard.edu/games/2018/

## Credits
- Game template van het Emmauscollege Rotterdam <br>
        https://github.com/emmauscollege/4HV-game-template
- manifest.json <br>
        https://codelabs.developers.google.com/codelabs/your-first-pwapp/#3
- icon <br>
        http://www.iconarchive.com/show/android-lollipop-icons-by-dtafalonso/Play-Games-icon.html
- ...

## Plan voor de game
welke game: puzzel laser spel

Doel: Leid de laser naar het doelpunt door obstakels te verwijderen en spiegels strategisch te plaatsen.

Punten: Tijd en efficiëntie worden gemeten. Extra punten voor snelheid, gebruik van minder objecten, of andere uitdagingen.

Afgaan: Als de tijd om is of de laser tegen een verboden obstakel botst, verlies je het level.

Moeilijkheidsgraad: Meer obstakels, meer soorten spiegels, en dynamische objecten zoals bewegende reflectoren of brekende lasers.

Extra functies: Nieuwe objecten, lasers, en moeilijkere puzzels worden geïntroduceerd naarmate je vordert.

## Stappenplan

Stap 1: Speler Beweging (WASD en Pijltjes)
Stap 2: Zwaartekracht en Grond Detectie
Stap 3: Platformen Toevoegen
Stap 4: Laser Toevoegen en Besturen
Stap 5: Laser Reflectie (Basis)
Stap 6: Doelen Toevoegen
Stap 7: Timer en Tijdslimiet
Stap 8: Game Over Scherm
Stap 9: Nieuwe Objecten Toevoegen
Stap 10: Moeilijkheidsgraad en Niveaus