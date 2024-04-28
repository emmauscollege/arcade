Deze repo is onderdeel van het vak informatica op het Emmauscollege Rotterdam.

[Meer info over deze opdracht](https://informatica.emmauscollege.nl/)

## Documentatie
- Khan Academy cursus JavaScript met p5js library <br>
https://www.khanacademy.org/computing/computer-programming/programming
- p5js reference <br>
https://p5js.org/reference/
- informatie van Emmauscollege over game opdracht <br>
https://emmauscollege.github.io/informatica/game/

## Credits
- Game template van het Emmauscollege Rotterdam <br>
        https://github.com/emmauscollege/4HV-game-template
- manifest.json <br>
        https://codelabs.developers.google.com/codelabs/your-first-pwapp/#3
- inspiratie voor game elementen en levels <br>
        https://supermario-game.com/nl
- geluidsbestanden <br>
        https://themushroomkingdom.net/media/smb/wav
- organismen spritesheet <br>
        https://www.nicepng.com/ourpic/u2q8e6a9q8w7q8y3_fireworks-sprite-sheet-png-super-mario-bros-star/
- objecten spritesheet <br>
        https://www.nicepng.com/ourpic/u2t4y3a9e6a9a9a9_mario-tile-sprite-sheet/
- sprite locaties vinden <br>
        https://getspritexy.netlify.app/
- detectie voor mobiele apparaten <br>
        https://stackoverflow.com/questions/3514784/how-to-detect-a-mobile-device-using-jquery#:~:text=if(%20/Android%7CwebOS%7CiPhone%7CiPad%7CiPod%7CBlackBerry%7CIEMobile%7COpera%20Mini/i.test(navigator.userAgent)%20)%20%7B%0A%20//%20some%20code..%0A%7D        
- algemene hulp tijdens het proces <br>
        informatica docenten: Sander van Geest en Arie Pieter Cammeraat

TODO:
Stap 1.
- [x] Maak index.html, style.css en script.js met canvas -> Aaron & Mohammed
- [x] Teken speler -> Aaron & Mohammed
- [x] Beweeg speler -> Aaron & Mohammed
- [x] Spring -> Aaron

stap 2:
- [x] Teken goomba -> Mohammed
- [x] Zorg dat goomba heen en weer beweegt -> Aaron
- [x] Detecteer botsing -> Mohammed
- [x] Zorg dat je af bent bij botsing -> Mohammed

stap 3:
- [x] Maak tijd -> Mohammed
- [x] Zorg dat je af kunt gaan door in void te vallen -> Mohammed
- [x] Maak uitlegscherm en game-overscherm -> Mohammed

stap 4:
1 blok waar ik:
- [x] Op kan blijven staan -> Mohammed
- [x] Op kan springen -> Mohammed
- [x] Vanaf kan vallen -> Mohammed
- [x] Veel blokken -> Mohammed
- [x] Afbeeldingen toevoegen -> Aaron & Mohammed
- [x] Gaten tussen twee platformen en ondergronden zien als gat en dus erin vallen -> Mohammed

stap 5:
- [x] Zorg ervoor dat munten verdwijnen wanneer ze opgepakt zijn -> Aaron (werkend gemaakt door Mohammed)
- [x] Zorg dat je punten kunt halen met opgepakte muntjes -> Aaron
- [x] Als je springt op de goomba, gaat de goomba dood -> Mohammed
- [x] Punten verdienen voor het vermoorden van een goomba -> Mohammed
- [x] Zorg dat je punten kunt halen met resterende tijd -> Mohammed
- [x] Zet punten op het scherm -> Aaron (werkend gemaakt door Mohammed)

game elementen (uitbreidingen):
- [x] Buizen uit grond -> Aaron (werkend gemaakt door Mohammed)
- [x] Botsing met buizen -> Aaron (werkend gemaakt door Mohammed)

- [x] Als goomba botst met buis of blok gaat goomba de andere kant op -> Mohammed
- [x] Als goomba botst met koopa of een andere goomba gaan ze beide de andere kant op -> Mohammed
- [x] Als goomba geraakt wordt door een vuurbal gaat goomba dood -> Mohammed
- [x] Als goomba geraakt wordt door een tollende koopa gaat goomba dood -> Mohammed
- [x] Goomba wordt vermoord als het staat op een geraakt platform -> Mohammed
- [x] Speler knippert bij aanraking met goomba -> Mohammed

- [x] Lift die omhoog en omlaag gaat -> Mohammed

- [X] Harde blokken trappen -> Mohammed

- [x] Vuurballen kunnen afschieten (met shift) als speler groot is -> Mohammed
- [x] Vuurballen vermoorden goomba -> Mohammed
- [x] Vuurbal explodeert bij botsing met goomba of zijkant buis/blok -> Mohammed
- [x] Als speler al een powerup actief heeft en nog één oppakt wordt speler fire mario en kan speler vuurballen afschieten -> Mohammed

- [x] Als koopa botst met buis of blok gaat koopa de andere kant op -> Mohammed
- [x] Als koopa botst met goomba of een andere koopa gaan ze beide de andere kant op -> Mohammed
- [x] Als koopa tollend botst met goomba gaat goomba dood -> Mohammed
- [x] koopa wordt vermoord als het staat op een geraakt platform -> Mohammed
- [x] koopa wordt vermoord als het geraakt wordt door een vuurbal -> Mohammed
- [x] koopa gaat in schild en staat stil als speler erop springt en gaat verder als schild als speler er weer op springt -> Mohammed
- [x] koopa gaat tollen in de kijkrichting van de speler als speler erop springt -> Mohammed
- [x] Speler knippert bij aanraking met koopa -> Mohammed

- [x] Cheats met control + c activeren of via console (1 uur tijd, onsterfelijk, 2x sneller rennen) -> Mohammed

animaties/graphics (uitbreidingen):
- [x] Soundeffects -> Mohammed
- [x] Mario tekst font -> Mohammed
- [x] Animatie bij finish -> Mohammed
- [x] Animatie bij vermoorden van goomba -> Mohammed
- [x] Animatie bij dood gaan door goomba -> Mohammed
- [x] Animatie bij botsing tegen onderkant platform -> Mohammed
- [x] Vuurbal ronddraai animatie -> Mohammed
- [x] Vuurbal explosie animatie -> Mohammed

mobile support (uitbreidingen):
- [x] Spel kan gespeeld worden op mobiele apparaten -> Mohammed
- [x] Fysieke knoppen op mobiele apparaten -> Mohammed

levels (uitbreidingen):
- [x] Levels kunnen gekozen worden, level 1 t/m 3 zijn bugloos speelbaar -> Mohammed
- [x] Highscore per level zichtbaar in level selectie scherm -> Mohammed
- [x] Level selectie met keyboard en keypad toetsen -> Mohammed

Taken voor Aaron in de meivakantie (geschreven door Mohammed, om Aarons achterstanden bij te werken):
Powerup:
- [x] Een blok waar een powerup uit komt als je van onderen ertegenaan botst. (Kijk naar de code die kijkt of je tegen een platform botst) -> Aaron
- [x] De powerup die uit dat blok komt is oppakbaar. (Lijkt op munt oppakken) -> Aaron
- [x] Als de speler die powerup oppakt, dan wordt de speler groter (grote mario sprite zit in spritesheet, kan ik mee helpen) -> Aaron
- [x] Als de speler groot is (en dus een powerup opgepakt heeft) en wordt geraakt door een goomba, wordt de speler kleiner, maar er gaat geen leven af (NB (van Aaron): oftewel var spelerGroot = true || false). (let op dat spelerKnippert code nogsteeds werkt) -> Aaron

Animaties powerups:
- [x] Kleurenanimatie van powerblok -> Aaron
- [x] Kleurenanimatie van Fire Flower -> Aaron
- [x] Munt uit powerblok (d.m.v. powerBlok.inhoud) -> Aaron

Piranha plant (bloem):
- [x] De bloem die uit de buis op en neer komt  (kijk naar goombapad en liftpad hoe je een op en neer code schrijft) Tip: teken de bloem voor de buis (boven de buis image in de code), zodat de bloem achter de buis vandaan komt. Hierdoor lijkt het alsof de bloem uit de buis komt. -> Aaron
- [x] Bijtanimatie van bloem -> Aaron
- [x] Als de speler de bloem raakt, gaat er één leven af. (Kijk hiervoor naar de goomba doden code) -> Aaron