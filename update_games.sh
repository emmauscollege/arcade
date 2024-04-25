#!/bin/bash
sudo apt update
sudo apt install wget unzip
wget https://github.com/emmauscollege/emmaus-arcade-games/archive/refs/heads/main.zip -O Download/emmaus-arcade-games.zip
unzip Download/emmaus-arcade-games.zip
rm -rf Download/emmaus-arcade-games.zip