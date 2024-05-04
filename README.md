# Emmaus Arcade

## install on rapberry pi
1. create `arcade-install.sh` on raspberry pi.
    - open terminal on raspberry pi (icon in top left corner)
    - enable ssh using `raspi-config`
    - use `hostname - I` to see IP-adress 
    - use `ssh x.x.x.x -l arcade` from any computer
    - use `nano arcade-install.sh` and copy-paste the file contents
2. `chmod +x arcade-install.sh` to make the file executable
3. `./arcade-install.sh` to install the arcade

## manual configuration 

## set windowmanager to X11 instead of Wayland
- Wayland is the newer and default one, but
    - Wayland has problems with kiosk mode of firefox and chromium-browser
    - Hiding the mouse with unclutter doesn't work with Wayland
- use `raspi-config` or the GUI

## set desktop wallpaper
- do it manually through the GUI
