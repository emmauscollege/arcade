# Emmaus Arcade

## install on rapberry pi
1. create `arcade-install.sh` on raspberry pi.
    - open terminal on raspberry pi (icon in top left corner)
    - enable ssh using `rasp-config`
    - use `hostname - I` to see IP-adress 
    - use `ssh x.x.x.x -l arcade` from any computer
    - use `nano arcade-install.sh` and copy-paste the file contents
2. `chmod +x arcade-install.sh` to make the file executable
3. `./arcade-install.sh` to install the arcade

## manual configuration 

## set desktop wallpaper
- do it manually through the GUI

## set the resolution of the pi to 1920x1080x50hz
- this setting is handy when testing the pi on other monitors
    - 4K leads to performance issues
    - 1920x1080x50hz is the same as the monitor in the arcade
- ndo it manually through the GUI or the rasp_config tool
- more info https://pimylifeup.com/raspberry-pi-screen-resolution/
