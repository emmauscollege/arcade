var slidebar = function(x, y) {
    percentage = slider1position/195*100;
    var buttonSize = 24;
    var displace = [10, 6];

    if(mouseX > x+displace[0]+slider1position && mouseX < x+displace[0]+slider1position+24){
        buttonSize = 26;
        displace = [9, 7];
        if(mouseIsPressed) {
            buttonSize = 24;
            displace = [10, 6];
            sliding1 = true;
        }else{
            sliding1 = false;
        }
    }
    if(sliding1 === true) {
        slider1position = mouseX-(x+displace[0]+12);
        if(slider1position < 0) {
            slider1position = 0;
        }
        if(slider1position > 195) {
            slider1position = 195;
        }
    }
    text('volume: ' + round(slider1position/195*100), x, y-20);
    image(imgSlidebar, x, y, 240, 18);
    image(imgSlidebarButton, x+displace[0]+195*percentage/100, y-displace[1], buttonSize, buttonSize/4*5);
}
//120 9
//12 15
//x=10 - x=205