#!/bin/bash

# Ping Google's DNS to check for internet connectivity
if ping -c 1 8.8.8.8 &> /dev/null; then
    echo "Internet is connected."

    echo "Updating rapberry pi OS..."
    sudo apt -yq update
    sudo apt -yq upgrade
    sudo apt -yq install wget unzip 
    sudo apt -yq install unclutter # did this manually as it didn't seem to work somehouw
    sudo apt -yq install python3-pynput
    sudo apt -yq install python3-evdev

    echo "Updating arcade..."
    wget https://github.com/emmauscollege/arcade/archive/refs/heads/main.zip -O ~/Downloads/arcade.zip
    unzip -o ~/Downloads/arcade.zip -d ~/Downloads/
    rm -rf ~Downloads/arcade.zip
    rm -rf ~/web
    mv ~/Downloads/arcade-main/web ~/web
    rm -rf ~/bin
    mv ~/Downloads/arcade-main/bin ~/bin
    # copy files needed for auto-update, if it fails we still have to old version
    mkdir -p ~/.config/autostart/
    cp ~/Downloads/arcade-main/.config/autostart/arcade.desktop ~/.config/autostart/
    cp ~/Downloads/arcade-install.sh ~/arcade-install.sh.backup
    cp ~/Downloads/arcade-main/arcade-install.sh ~/arcade-install.sh
    # rm -rf ~/Downloads/arcade-main
else
    echo "No internet. Continue without update..."
fi

echo "Clearing browser cache"
rm -rf ~/.cache/chromium
rm -rf ~/.cache/mozilla

echo "Starting arcade..."
~/bin/arcade-start.sh

