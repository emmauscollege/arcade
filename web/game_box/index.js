
let imgX = 700;

setup = function(){
  createCanvas(700, 200);
}
draw = function(){
  background(169,169,169);
  fill('lightgrey')
  textFont('MODERN');
  textSize(100);
  text('GameBox Made By Quinn Verschoor & Niels Schwedler', imgX, 130);
  imgX -= 2;
  if(imgX < -2400){
    imgX = 700;
  }
  fill('black')
  rect(0, 0, 700, 10);
  rect(0, 0, 10, 200);
  rect(0, 190, 700, 200);
  rect(690, 0, 700, 200)
}