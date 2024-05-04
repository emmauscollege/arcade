#!/bin/bash

# remove mouse cursor after 1 second
unclutter -idle 1 -root &

echo "Starting webserver"
python -m http.server 8000 --directory ~/web/ &

echo "Starting hotkey deamon"
python ~/bin/hotkey-deamon.py &

echo "Showing home page"
~/bin/arcade-home.sh