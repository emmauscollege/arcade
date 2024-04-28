/* Game opdracht 
   Versie 20190608.001, voor Emmauscollege Rotterdam
*/

/* globale variabelen die je gebruikt in je game
   */
console.log("start variabelen declareren"); // berichtje voor debuggen
var WegTempoY = 22; // snelheid in y-richting van strepen
var autoX = 250; // x-coordinaat auto
var olievlekX = 300;
var streepY = -100;
var geredenKM = 0;
var button;
let img_car;
let img_crash;

function preload() {
  img_car = loadImage('general_lee_120.png');
  img_crash = loadImage('oops_150.png');
}

/* functies die je gebruikt in je game
   */
// we gebruiken in dit voorbeeld geen functies
// Vraag: hoe kun je met functies de leesbaarheid van je code verbeteren?

/* setup
   de code in deze functie wordt één keer uitgevoerd door de p5 library, 
   zodra het spel geladen is in de browser
   */
function setup() {
  createCanvas(800, 500); // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  background("black"); // Kleur de achtergrond blauw, zodat je het kunt zien
  console.log("setup klaar"); // berichtje voor debuggen
  frameRate(45);
}



/* draw
   de code in deze functie wordt meerdere keren per seconde uitgevoerd door de p5 library, 
   nadat de setup functie klaar is
   */
function draw() {
  console.log("start draw"); // berichtje voor debuggen

  /* teken het speelveld, gebruik de globale variabelen
   */
  // achtergrond
  fill("white");
  rect(0, 0, 800, 500);
  fill("black");
  rect(0 + 10, 0 + 10, 800 - 2 * 10, 500 - 2 * 10);

  // weg
  fill("white");
  rect(260, streepY, 15, 100);
  rect(500, streepY, 15, 100);
  rect(60, 10, 10, 480);
  rect(720, 10, 10, 480);
  fill("green");
  rect(10, 10, 50, 480);
  rect(730, 10, 60, 480);

  // olievlek
  fill("grey");
  ellipse(olievlekX, streepY - 100, 100, 40);


  // auto
  // -60: muis in midden van auto
  image(img_car, autoX-60, 330);


  /* verwerk een stap in de tijd: 
     pas de waarden van de globale variabelen aan
   */
  // weg beweegt
  if (streepY > 500) {
    streepY = -100;
    // olievlek op een willekeurige plek op de weg
    olievlekX = Math.floor(Math.random() * 650) + 60;
  }
  streepY = streepY + WegTempoY;
  geredenKM = geredenKM + (WegTempoY / 1000);

  document.getElementById("KMstand").innerHTML = Math.round(geredenKM);


  /* verwerk invoer van toetsenbord / muis / touchscreen:
     pas de waarden van de globale variabelen aan
    */

  //muis besturing
  autoX = mouseX;



  /* controlleer of het spel klaar is
   */

  //auto buiten de baan na de eerste 5 km
  if (((autoX < 110) || (autoX > 680)) && (geredenKM > 5)) {
    //toon afbeelding als je buiten de baan raakt
    image(img_crash, autoX-80, 250);
    //stop het spel
    noLoop();
  }


  //auto raakt olievlek
  if ((autoX < olievlekX - 100) || (autoX > olievlekX + 100)) {
    
  }
  else if (streepY > 440) {
    //toon afbeelding dat de olievlek is geraakt
    image(img_crash, autoX-80, 250);  
    //stop het spel
    noLoop();  
  }

}



