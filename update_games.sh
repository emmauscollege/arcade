#!/bin/bash
sudo apt update
sudo apt install wget unzip
wget https://github.com/emmauscollege/emmaus-arcade-games/archive/refs/heads/main.zip -O ~/Downloads/emmaus-arcade-games-main.zip
unzip ~/Downloads/emmaus-arcade-games-main.zip
rm -rf ~/Downloads/emmaus-arcade-games-main.zip