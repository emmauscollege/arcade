#!/bin/bash
sudo apt update
sudo apt install wget unzip
wget https://github.com/emmauscollege/emmaus-arcade-games/archive/refs/heads/main.zip -O /home/arcade/Download/emmaus-arcade-games.zip
unzip /home/arcade/Download/emmaus-arcade-games.zip
rm -rf /home/arcade/Download/emmaus-arcade-games.zip