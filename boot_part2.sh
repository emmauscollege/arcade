#!/bin/bash

echo "starting webserver"
python -m http.server 8000 --directory /home/arcade/emmaus-arcade-games-main/ &

echo "starting back to main menu deamon"
# not implemented yet

echo "starting webbrowser showing menu"
./menu-start.sh
