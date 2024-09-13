var settings = function() {
    if(gameStatus != PAUSED && placeButtons === true) {
        var gearSize = 99;
        if((mouseX > 100-gearSize/2 && mouseX < 100+gearSize/2 && mouseY > 100-gearSize/2 && mouseY < 100+gearSize/2 && controlStatus === PC) || selectedButton === 0) {
            gearSize = 103;
            if(mouseIsPressed && controlStatus === PC) {
                gearSize = 99;
                if(mouseReleasedButton === true) {
                    mouseReleasedButton = false;
                    if(mapStatus != SETTINGS) {
                        mapStatus = SETTINGS;
                    }else{
                        mapStatus = PLAY;
                    }
                }
            }
        }
        push();
        translate(100, 100);
        image(imgSettingsGear, -gearSize/2, -gearSize/2, gearSize, gearSize);
        pop();
    }

    if(mapStatus === SETTINGS){
        var importButtonHeight = 380;
        var exportButtonHeight = 547;
        image(imgFrameBorder, 372, 255);
        text('Local Data:', 430, 340);
        if((mouseX > 430 && mouseX < 914 && controlStatus === PC) || selectedButton >= 4) {
            if((mouseY > 547 && mouseY < 647 && controlStatus === PC )|| selectedButton === 5) {
                exportButtonHeight = 542;
                if((mouseIsPressed && controlStatus === PC)) {
                    exportButtonHeight = 547;
                    storeItem('Save', changingData);
                    imported = 0;
                    exported = 3;
                }
            }
            if((mouseY > 380 && mouseY < 480 && controlStatus === PC )|| selectedButton === 4) {
                importButtonHeight = 375;
                if((mouseIsPressed && controlStatus === PC)) {
                    importButtonHeight = 380;
                    changingData = getItem('Save');
                    exported = 0;
                    imported = 3;
                }
            }
        }
        if(keyIsDown(ENTER)) {
          if(selectedButton === 5) {
            exportButtonHeight = 542;
          }else if(selectedButton === 4) {
            importButtonHeight = 375;
          }
        }
        if(imported > 1) {
            text('Data imported . . .', 460, 525);
            if( frameCount % 60 === 0) {
                imported--;
            }
        }
        if(exported > 1) {
            text('Data exported . . .', 460, 525);
            if(frameCount % 60 === 0) {
                exported--;
            }
        }
        image(imgStartMenuButtonLine, 430, 380, 484, 100);
        image(imgStartMenuButtonLine, 430, 547, 484, 100);
        image(imgStartMenuButton, 430, importButtonHeight, 484, 100);
        image(imgStartMenuButton, 430, exportButtonHeight, 484, 100);
        text('Import', 620, importButtonHeight+63);
        text('Export', 620, exportButtonHeight+63);
    }
}

//58