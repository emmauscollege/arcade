# Emmaus Arcade

Here you find information on the Arcade build by tutors at Emmauscollege Rotterdam around May 2024. We build it to make our students even more enthousiastic to learn coding. We also use it as a showcase of what our students can do. The games are created as part of an assignment by our students of 4-havo and 4-vwo (aged around 15) attending the computer-science course.

## Installation instruction
0. Buy a Rapberry Pi 5
1. Copy `arcade-install.sh` to Raspberry Pi.
    - open terminal on Raspberry Pi (icon in top left corner)
    - enable ssh using `raspi-config`
    - use `hostname - I` to see IP-adress 
    - use `ssh x.x.x.x -l arcade` from any computer
    - use `nano arcade-install.sh` and copy-paste the file contents
2. `chmod +x arcade-install.sh` to make the file executable
3. `./arcade-install.sh` to install the arcade
4. Use `raspi-config` to set X11 as default window manager
    - Wayland is default and newer than X11, but (status May 2024)
    - Wayland has problems with kiosk mode of firefox and chromium-browser and
    - hiding the mouse with unclutter doesn't work with Wayland 
5. Optional: Use the GUI to set a desktop wallpaper

## Hardware explained
### Rasberry Pi 5
We use a Raspberry Pi 5 with 8GB RAM, mounted in the official casing and a 64GB memory-card with Raspberry Pi OS pre-installed. A model with 4GB will probably do just as well for this application. 
### Controls
The joysticks and buttons are connected to an ipac. The ipac emulates a keyboard. The ipac is connected to the Raspberry Pi.
### Monitor
The monitor is connected via hdmi. The resolotion of the monitor is full-hd (1920 x 1080 pixels). A higher resolution more quickly results in performance issues on the Raspberry Pi when running more complex or inefficiently coded games.
### Audio
The speakers are connected to the headphones output of the monitor. We use a computer speaker set with a volume control button accessable through the backdoor of the cabinet.
### Cabinet
The cabinet is designed and milled by a supplier in the area. We screwed the plates together, added the T-mold and mounted the electronics.

## Software explained
### Games
The games programmed in JavaScript using the p5js library. Games are made by our students from 4-vwo and 4-havo (aged around 15). The p5js library and all other files needed to run the game are available locally on our Arcade. The must be playable using keyboard input acoording to the control-keyboard mapping of our Arcade.

### Menu
The menu is a webpage. Selection of the game works by manipulating the active element on the page. This can be done using the controls or any other keyboard.

### Home button
Returning from the game to the menu is done by pushing the home button. A python programm `hotkey-deamon.py` is running in the background to make this happen. This way, we are not depending on the game to be able to correctly return to the main menu.

### Upgrade script
`arcade-install.sh` autostarts when booting the Arcade, after the GUI has started. If internet is available, the script re-installs downloads the latest version of the arcade from github.

### Start script
`./bin/arcade-start.sh` is launched by `arcade-install`. It starts the webserver that serves the menu and game files and it starts the hotkey-daemon.

### Home script
`./bin/arcade-home.sh` is launched by `arcade-start` after reboot or by `hotkey-daemon.py` after pressing the home button. It kills all running webbrowsers and starts a new webbrowser in kiosk-mode (full screen) opening the menu page.



