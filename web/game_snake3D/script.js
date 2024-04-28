// instellingen.

var screenWidth = 1280;
var screenHeight = 720;

var qWidth = 10;
var qHeight = 10;
var qTall = 10;
 
var constRectWidth = 25;
var constRectHeight = 15;

var xCenter = screenWidth/2;
var yCenter = 90;

var snakeInitLength = 3;
var snakeInterval = 10;

var appleColorRed = 50;
var appleColorGreen = 255;
var appleColorBlue = 50;
var appleID = 1;

// systeem variabelen.
var quadTop =  new Array(qWidth);
var quadLeft = new Array(qWidth);
var quadRight = new Array(qHeight);

var rectWidth = constRectWidth;
var rectHeight = constRectHeight;
var rectScaleWidth = 1;
var rectScaleHeight = 1;
var globalScale = 1;

var winner;
var countdown_ms = 0;
var no_input_tick = -1;
var no_input_tick2 = -1;
var tick = 0;
var time_ms = 0;
var gameState = 2;
var gameMode = 0;

var button1p;
var button2p;
var buttonreset;
var buttonmainmenu;
var button2pS;
var buttonA;
var buttonD;
var buttonJ;
var buttonL;

var snake1;
var snake2;

// positie class om terug te geven van functies.
class position {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
// snake class om alles van een snake in op te slaan.
// kleur, positie, richting en ID.
class snake {
  constructor(r,g,b,dirX,dirY,id,initx,inity){
    this.snakeColorRed = r;
    this.snakeColorGreen = g;
    this.snakeColorBlue = b;
    this.snakeArray = new Array(snakeInitLength);
    this.snakeDirX = dirX;
    this.snakeDirY = dirY;
    this.snakeID = id;
    for(var i = 0; i < snakeInitLength; i++){
      this.snakeArray[i] = new position(initx,inity);
    }
    if(this.snakeID != -1){
      setv(initx,inity,getside(initx,inity),this.snakeID);
    }
  }
}
// button class for knoppen. x,y width, height en text.
class button {
  constructor(x,y,w,h,text){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
  }
}
// deze functie geeft van een x en y index van een array loop de zijde
// waarop dit punt zich bevindt. dat kan zijn :
// -2 : punt is niet correct en ligt buiten veld.
// -1 : punt bevindt zich tussen het linker en rechter vlak in.
//  0 : punt bevindt zich op quadTop, bovenste vlak.
//  1 : punt bevindt zich op quadLeft, linker vlak.
//  2 : punt bevindt zich op quadRight, rechter vlak.
function getside(x, y) {
  if(x < 0 || y < 0 || x >= qWidth + qTall || y >= qHeight + qTall){
    return -2;
  }
  else if(x >= qWidth && y >= qHeight){
    return -1;
  }
  else if(x >= qWidth && y < qHeight) {
    return 2;
  }
  else if(x < qWidth && y >= qHeight) {
    return 1;
  }
  else if(x < qWidth && y < qHeight) {
    return 0;
  }
  else return -1;
}

// deze functie plaatst een waarde in een van de drie arrays
// die het speelveld aangeven. op basis van de zijde waarop het punt
// zich bevindt (verkregen met getside).
function setv(x, y, side_code, data) {
  if(side_code == 2){
    quadRight[y][x - qWidth] = data;
  }
  else if(side_code == 1) {
    quadLeft[x][y - qHeight] = data;
  }
  else if(side_code == 0) {
    quadTop[x][y] = data;
  }
}

// deze functie geeft een waarde in een van de drie arrays die het
// speeldveld aangeven. op basis van de zijde waarop het punt bevindt (verkregen met getside).
function getv(x, y, side_code) {
  if(side_code == 2) {
    return quadRight[y][x - qWidth];
  }
  else if(side_code == 1) {
    return quadLeft[x][y - qHeight];
  }
  else if(side_code == 0) {
    return quadTop[x][y];
  }
  else return -1;
}

// deze functie zet een x en y index van een array loop met de zijde code voor
// prestatie-doeleinden om in isometrische x en y coordinaten op het scherm. 
// de formule voor de coordinaten varieert op basis van de zijde van het punt.
function quadTransform(x,y,side_code){
  var pos = new position(0,0);
  if(side_code == 2){
    pos.x = xCenter + 0.5 * qWidth * rectWidth - 0.5 * y * rectWidth;
    pos.y = yCenter + 0.5 * qWidth * rectHeight + 0.5 * y * rectHeight + rectHeight * (x  - qWidth);
  }
  else if(side_code == 1) {
    pos.x = xCenter + 0.5 * x * rectWidth - 0.5 * qHeight * rectWidth;
    pos.y = yCenter + 0.5 * x * rectHeight + 0.5 * qHeight * rectHeight + rectHeight * (y - qHeight);
  }
  else if(side_code == 0) {
    pos.x = xCenter + 0.5 * x * rectWidth - 0.5 * y * rectWidth;
    pos.y = yCenter + 0.5 * x * rectHeight + 0.5 * y * rectHeight;
  }
  return pos;
}

// deze functie tekent met behulp van de x en y schermcoordinaten verkregen in quadTransform
// de quad die deel uitmaakt van de kubus. de quad heeft 4 hoekpunten die ieder berekent
// moeten worden. de formules voor het berekenen van de coordinaten van deze 4 hoekpunten 
// varieert op basis van de zijde waar de quad zich op bevindt (verkregen met getside).
function quadDraw(x,y,side_code){
  var pos1 = new position(0,0);
  var pos2 = new position(0,0);
  var pos3 = new position(0,0);
  var pos4 = new position(0,0);

  if(side_code == 2){
      pos1.x = x;
      pos1.y = y;

      pos2.x = x;
      pos2.y = y + rectHeight;

      pos3.x = x - 0.5 * rectWidth;
      pos3.y = y + 1.5 * rectHeight;

      pos4.x = x - 0.5 * rectWidth;
      pos4.y = y + 0.5 * rectHeight;

       quad(pos1.x,pos1.y,
            pos2.x,pos2.y,
            pos3.x,pos3.y,
            pos4.x,pos4.y);
  }
  if(side_code == 1){
      pos1.x = x;
      pos1.y = y;

      pos2.x = x + 0.5 * rectWidth;
      pos2.y = y + 0.5 * rectHeight;

      pos3.x = x + 0.5 * rectWidth;
      pos3.y = y + 1.5 * rectHeight;

      pos4.x = x;
      pos4.y = y + rectHeight;

      quad(pos1.x,pos1.y,
           pos2.x,pos2.y,
           pos3.x,pos3.y,
           pos4.x,pos4.y);
  }
  if(side_code == 0){
      pos1.x = x;
      pos1.y = y;

      pos2.x = x + 0.5 * rectWidth;
      pos2.y = y + 0.5 * rectHeight;

      pos3.x = x;
      pos3.y = y + rectHeight;

      pos4.x = x - 0.5 * rectWidth;
      pos4.y = y + 0.5 * rectHeight;

      quad(pos1.x,pos1.y,
           pos2.x,pos2.y,
           pos3.x,pos3.y,
           pos4.x,pos4.y);
  }
}

// deze functie geeft een voor het tekenen van de quad met quadDraw een fillcolor
// aan de quad om beeld te geven. de game-elementen hebben een andere kleur
// dan het lege veld zelf. de identificatie codes voor game-elementen staat opgeslagen 
// en kan worden verkregen met getv.
function quadColor(x,y,side_code){
  var array_data = getv(x,y,side_code);
  var color_gradient = 210 +(x+y) % 2* 40;

  var red = 0;
  var green = 0;
  var blue = 0;

  if(array_data == snake1.snakeID){
    red = snake1.snakeColorRed + 120 + 120 * sin(tick/60+x/4);
    green = snake1.snakeColorGreen + 50+ 100 * sin(tick/40-y/3);
    blue = snake1.snakeColorBlue + 60+ 120 * cos(tick/70+x/3+y/8);
  }
  else if((gameMode == 1 || gameMode == 2)&& array_data == snake2.snakeID){
    red = snake2.snakeColorRed + 60 - 60 * sin(tick/60-x/4);
    green = snake2.snakeColorGreen + 100 * sin(tick/30+y/3);
    blue = snake2.snakeColorBlue + 50 + 100 * cos(tick/60+x/3-y/8);
  }
  else if(array_data == appleID){
    red = appleColorRed +20+20*sin(tick/6+x/3);
    green = appleColorGreen -20+20 * sin(tick/6+y/4);
    blue = appleColorBlue +20 + 20 * cos(tick/6+x/4-y/7);
  }
  else {
    red = color_gradient + 45 * sin(tick/60+x/4);
    blue = color_gradient + 30 * sin(tick/40-y/3) ;
    green = color_gradient + 75 * cos(tick/70+x/3+y/8);
  }
  fill(red + gameState * 50,green - gameState * 50,blue - gameState * 50);
}

// deze functie beweegt een slang. de slang beweegt voor door steeds een nieuw coordinaat te
// berekenen voor het nieuwe hoofd. als dit punt is berekent worden er wat checks uitgevoerd. 
// vervolgens wordt aan het eind van de snakeArray ge-popt(staart slang weg) en 
// wordt een nieuw element vooraan toegevoegd als nieuw hoofd. gelijktijdig wordt de informatie
// in de 3 veld-arrays bijgewerkt.
// als de slang buiten het veld komt dan is het game over.
// als de slang in het tussenveld komt dan wisselen we de x en y coordinaten en veranderen
// we de bewegingsrichting van de slang om een wrap-effect aan te geven tussen het linker en
// rechter vlak.
function snakeMove(snake){
  var snakeCurrentHeadPosition = snake.snakeArray[0];
  var snakeNewHeadPosition = new position(snakeCurrentHeadPosition.x,snakeCurrentHeadPosition.y);
  var snakeTailPosition = snake.snakeArray[snake.snakeArray.length - 1];
  snakeNewHeadPosition.x += snake.snakeDirX;
  snakeNewHeadPosition.y += snake.snakeDirY;

  var new_head_side_code = getside(snakeNewHeadPosition.x,snakeNewHeadPosition.y);
  var current_head_side_code = getside(snakeCurrentHeadPosition.x,
  snakeCurrentHeadPosition.y);
  if(new_head_side_code == -2){
    gameOver();
    return -1;
  } 
  else {
    if(new_head_side_code == -1){ 
      if(current_head_side_code == 1){
        var ztall = snakeCurrentHeadPosition.y - qHeight;
        snakeNewHeadPosition.x = qWidth + ztall;
        snakeNewHeadPosition.y = qHeight - 1;
      }
      else if(current_head_side_code == 2){
        var ztall = snakeCurrentHeadPosition.x - qWidth;
        snakeNewHeadPosition.x = qWidth - 1;
        snakeNewHeadPosition.y = qHeight + ztall;
      }
      var old_xdir = snake.snakeDirX;
      var old_ydir = snake.snakeDirY;
      snake.snakeDirX = -old_ydir;
      snake.snakeDirY = -old_xdir;
    }
    new_head_side_code = getside(snakeNewHeadPosition.x,snakeNewHeadPosition.y);
    var current_head_array_data = getv(snakeCurrentHeadPosition.x,snakeCurrentHeadPosition.y,current_head_side_code);
    var new_head_array_data = getv(snakeNewHeadPosition.x,snakeNewHeadPosition.y,new_head_side_code);

    if(new_head_array_data == snake1.snakeID || new_head_array_data == snake2.snakeID){
      gameOver();
      return -1;
    }
    else if(new_head_array_data == appleID){
      pickApple(snake);
      
    }
    snake.snakeArray.pop();
    snake.snakeArray.unshift(snakeNewHeadPosition);
    var tail_side_code = getside(snakeTailPosition.x,snakeTailPosition.y);
    
    var prev = snake.snakeArray[snake.snakeArray.length -1];
    var prev2 = snake.snakeArray[snake.snakeArray.length - 2];
    if(gameMode == 0 || gameMode == 2)setv(snakeTailPosition.x,snakeTailPosition.y,tail_side_code,0);
    setv(snakeNewHeadPosition.x,snakeNewHeadPosition.y,new_head_side_code,snake.snakeID);
  }
}

// deze functie reset alle informatie in de arrays en bereidt alle
// andere variabelen voor op een nieuwe start.
function restartData(){
  if(gameMode == 0){
    qWidth = 5 + Math.round(10*Math.random());
    qHeight = 5 + Math.round(10*Math.random());
    qTall = 3 + Math.round(12 * Math.random());
  }
  else if(gameMode == 1){
    qWidth = 8 + Math.round(15*Math.random());
    qHeight = 8 + Math.round(15*Math.random());
    qTall = 4 + Math.round(16*Math.random());

  }
  else if(gameMode == 2){
    qWidth = 6 + Math.round(10*Math.random());
    qHeight = 6 + Math.round(10*Math.random());
    qTall = 4 + Math.round(12*Math.random());
  }
  quadTop =  new Array(qWidth);
  quadLeft = new Array(qWidth);
  quadRight = new Array(qHeight);
  var totalsize = qWidth + qHeight + qTall;
  globalScale = (10+10+10)/totalsize;
 
  for(var i = 0 ; i < qWidth; i++){
    quadTop[i] = new Array(qHeight);
  }
  for(var i = 0 ; i < qWidth; i++){
    quadLeft[i] = new Array(qTall);
  }
  for(var i = 0 ; i < qHeight; i++){
    quadRight[i] = new Array(qTall);
  }
  for(var y = 0; y < qHeight+qTall; y++) {
    for(var x = 0; x < qWidth+qTall; x++) {
      setv(x,y,getside(x,y),0);
    }
  }
  if(gameMode == 1){
    snakeInitLength = (qWidth + qTall) * (qHeight + qTall) - qTall * qTall;
    snake1 = new snake(255,0,0 ,0,1,2 ,Math.floor(qWidth+qTall*Math.random()),Math.floor((qHeight-1)*Math.random()));
    snake2 = new snake(0,0,255, 1,0 ,3 ,Math.floor((qWidth-1)*Math.random()),Math.floor(qHeight+qTall*Math.random()));
  }
  else if(gameMode == 0){
    snakeInitLength = 3;
    snake1 = new snake(255,0,0 ,0,1 ,2 ,Math.floor(qWidth*Math.random()),Math.floor(qHeight*Math.random()));
    snake2 = new snake(0,0,0, 0,0 ,-1,0,0);
    pickApple(snake1);
  }
  else if(gameMode == 2){
    snakeInitLength = 5;
    snake1 = new snake(255,0,0, 0,1, 2 ,Math.floor(qWidth*Math.random()),Math.floor(qHeight*Math.random()));
    snake2 = new snake(0,0,255 ,1,0 ,3, Math.floor((qWidth-1)*Math.random()),Math.floor(qHeight+qTall*Math.random()));
    pickApple(snake1);
  }
}
// aangeroepen als de slang zichzelf raakt of buiten het veld komt.
function gameOver(){
  gameState = 1;
}

// aangeroepen als de appel is gepakt. voeg een nieuw lichaamsdeel toe aan de slang en maak een nieuwe appel.
function pickApple(snake){
  var snakeTailPosition = snake.snakeArray[snake.snakeArray.length - 1];
  var newSnakeTailPosition = new position(snakeTailPosition.x,snakeTailPosition.y);
  snake.snakeArray.push(newSnakeTailPosition);
  
  while(true){
  var appleX = Math.floor((qWidth+qTall)*Math.random());
  var appleY = Math.floor((qHeight+qTall)*Math.random());

  if(appleX >= qWidth && appleY >= qHeight){
    var poll = Math.random(0,1);
    if(poll > 0.5){
      appleX = Math.floor(qWidth*Math.random());
    }
    else {
      appleY = Math.floor(qHeight*Math.random());
    }
  }
  var apple_side_code = getside(appleX,appleY);
  var apple_array_data = getv(appleX,appleY,apple_side_code);
  if(apple_array_data == 0){
    setv(appleX,appleY,getside(appleX,appleY),appleID);
    break;
  }
  }
}

// teken een knop van de button class. we checken eerst of de 
// x en y coordinaten van de muis binnen de knop is, we geven hem
// op basis daarvan een andere kleur. Als de muis is ingedrukt als
// de muis binnen de knop zit dan gaan we naar het volgende scherm op
// basis van de tekst die opgeslagen staat in de knop. We voegen bij bepaalde
// knoppen een vetraging toe om te voorkomen dat je gelijk een andere knop indrukt
// als je het volgende scherm betreed.
function drawButton(button){
  if(mouseX > button.x && mouseY > button.y && mouseX < button.x + button.w && mouseY < button.y + button.h){
    fill(255,255,255);
    if(mouseIsPressed && tick > no_input_tick){
      if(button.text === "classic"){
        no_input_tick = tick + 30;
        countdown_ms = time_ms + 3000;
        gameState = 0;
        gameMode = 0;
        restartData();
      }
      else if(button.text === "duel"){
        no_input_tick = tick + 30;
        countdown_ms = time_ms + 3000;
        gameState = 0;
        gameMode = 1;
        restartData();
      }
      else if(button.text === "again"){
        no_input_tick = tick + 30;
        countdown_ms = time_ms + 3000;
        gameState = 0;
        restartData();
      }
      else if(button.text === "menu"){
        no_input_tick = tick + 30;
        gameState = 2;
        restartData();
      }
      else if(button.text == "2snek"){
        no_input_tick = tick + 30;
        countdown_ms = time_ms + 3000;
        gameState = 0;
        gameMode = 2;
        restartData();
      }
  }
  }
  else {
    ambientColor(1);
  }
  rect(button.x,button.y,button.w,button.h);
  ambientColor(0);
  textSize(button.h/1.2);
  textFont
  text(button.text,button.x+button.w/4-button.text.length*5,button.y+button.h/1.3);
}
// deze functie verandert de slang(en) van richting als bepaalde toetsen worden
// ingedrukt.
keyPressed = function(){
  if(gameState == 0){
      if(gameMode >= 0){
      countdown_ms = 0;
      var old_xdir1 = snake1.snakeDirX;
      var old_ydir1 = snake1.snakeDirY;

      if(key == 'a'){
        snake1.snakeDirY = -old_xdir1;
        snake1.snakeDirX = old_ydir1;
      }
      if(key == 'd'){
       snake1.snakeDirY = old_xdir1;
       snake1.snakeDirX = -old_ydir1;
      }
      }
    if((gameMode == 1 || gameMode == 2)){
      var old_xdir2 = snake2.snakeDirX;
      var old_ydir2 = snake2.snakeDirY;
      
      if(key == 'j'){
        snake2.snakeDirY = -old_xdir2;
        snake2.snakeDirX = old_ydir2;
      }
      if(key == 'l'){
       snake2.snakeDirY = old_xdir2;
       snake2.snakeDirX = -old_ydir2;
      }
    }
  }
}

// initialiseert alle arrays en het canvas.

function setup() {
  textFont("consolas");
  var canvas = createCanvas(screenWidth,screenHeight); 

  restartData();

  button1p = new button(screenWidth/2-150,screenHeight/5,300,100,"classic");
  button2p = new button(screenWidth/2-150,screenHeight/5*2,300,100,"duel");
  buttonreset = new button(screenWidth/2-150,screenHeight/5,300,100,"again");
  buttonmainmenu = new button(screenWidth/2-150,screenHeight/5*2,300,100,"menu");
  buttonA = new button(10,screenHeight-110,100,100,"A");
  buttonD = new button(115,screenHeight-110,100,100,"D");
  buttonJ = new button(screenWidth - 110 - 105, screenHeight-110,100,100,"J");
  buttonL = new button(screenWidth- 110, screenHeight-110,100,100,"L");
  button2pS = new button(screenWidth/2-150,screenHeight/5*3,300,100,"2snek");
 
}
// zet de fill kleur naar een fadende regenboog kleur. De inverse om contrast te geven.
// bij knoppen bijvoorbeeld.
function ambientColor(inverse){
  if(inverse == 0){
    fill(200+55*sin(tick/100),155+100*cos(tick/100),200);
  }
  else {
    fill(255-200+55*sin(tick/100),255-155+100*cos(tick/100),255-200);
  }
}
// tekent het veld (met alle game-elementen). kan ook visuele effecten toevoegen zoals
// veranderen van de breedte en hoogte van de quads om een dynamisch effect te verkrijgen.
// we loopen door de arrays, verkrijgen de side_code,  en controleren over deze
// side_code binnen het veld zit. vervolgens berekenen we de isometrische coordinaten
// met quadTransform en uiteindelijk tekenen we de vierhoek met quadDraw en quadColor.
function drawMap(){
  rectScaleWidth = 1.9 + 0.12*sin(tick/30);
  rectScaleHeight = 1.9 + 0.08*cos(tick/30);
  rectWidth = constRectWidth * rectScaleWidth * globalScale;
  rectHeight = constRectHeight * rectScaleHeight * globalScale;
  for(var y = 0; y < qHeight+qTall; y++) {
    for(var x = 0; x < qWidth+qTall; x++) {
      var side_code = getside(x,y);
      var quad_pos = quadTransform(x,y,side_code);

      if(side_code >= 0){
        quadColor(x,y,side_code);
        quadDraw(quad_pos.x,quad_pos.y,side_code);
    }

    }
  }
}

// Teken het scherm op basis van de gameState (2 = menu, 1 = gameOver, 0 = spelen).
// ook op basis van de gameMode(0 = classic, 1 = duel, 2 = 2snek).
function draw () {
  clear();
  background(200+55*sin(tick/60),100+100*cos(tick/50),150+50*cos(tick/100));
  if(gameState == 2){
    strokeWeight(3);
    stroke(255,255,255);
    textSize(100);
    ambientColor(1);
    text("Snek",screenWidth/3,100);
    drawButton(button1p);
    drawButton(button2p);
    drawButton(button2pS);
  }
  else if(gameState == 1){
    noStroke();
    drawMap();

    stroke(255,255,255);
    strokeWeight(3);
    drawButton(buttonreset);
    drawButton(buttonmainmenu);

    if(gameMode == 0){
      textSize(40);
      fill(255,255,255);
      text("final score is "+(snake1.snakeArray.length-snakeInitLength-1),10,40);
    }
    else if(gameMode == 1 || gameMode == 2){
      textSize(40);
      fill(255,255,255);
      text(winner+" wins",10,40);
    } 
  }
  else if(gameState == 0){
    noStroke();
    if(time_ms < countdown_ms){
      drawButton(buttonA);
      drawButton(buttonD);
      if(gameMode == 1){
        drawButton(buttonJ);
        drawButton(buttonL);
      }
    }
    else if(tick%snakeInterval==0){
        var r1 = snakeMove(snake1);
        if(gameMode == 1 || gameMode == 2){
          var r2 = snakeMove(snake2);
          if(r1 < 0){
            winner = "blue";
            gameOver();
          }
          else if(r2 < 0){
            winner = "red";
            gameOver();
          }
        }
    }
    if(gameMode == 0){
      textSize(40);
      fill(255,122,122);
      text("score : "+(snake1.snakeArray.length-snakeInitLength-1),10,40);
    }
 
    else if(gameMode == 2){
      textSize(40);
      fill(255,122,122);
      text("red : "+(snake1.snakeArray.length-snakeInitLength-1),10,40);
      fill(122,122,255);
      text("blue: "+(snake2.snakeArray.length-snakeInitLength),10,80);
    }
    drawMap();
  }
  tick++;
  time_ms = millis();
  
}