#!/bin/bash

# Ping Google's DNS to check for internet connectivity
if ping -c 1 8.8.8.8 &> /dev/null; then
    echo "Internet is connected."

    echo "Updating rapberry pi OS..."
    sudo apt update
    sudo apt install wget unzip
    pip3 install pynput
    
    echo "Updating arcade..."
    wget https://github.com/emmauscollege/arcade/archive/refs/heads/main.zip -O ~/Downloads/arcade.zip
    unzip ~/Downloads/arcade.zip -d ~/Downloads/ -o
    rm -rf ~Downloads/arcade.zip
    rm -rf ~/web
    mv ~/Downloads/arcade-main/web ~/web
    rm -rf ~/bin
    mv ~/Downloads/arcade-main/bin ~/bin
    # copy files needed for auto-update, if it fails we still have to old version
    cp ~/Downloads/arcade-main/.config/autostart/arcade.desktop ~/.config/autostart/
    cp ~/Downloads/arcade-main/arcade-install.sh ~/arcade-install.sh
    rm -rf ~/Downloads/arcade-main
else
    echo "No internet. Continue without update..."
fi

echo "Starting arcade..."
~/bin/arcade-start.sh

