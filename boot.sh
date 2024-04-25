#!/bin/bash

# Ping Google's DNS to check for internet connectivity
if ping -c 1 8.8.8.8 &> /dev/null; then
    echo "Internet is connected."
    echo "updating rapberry pi OS..."
    #not implemented yet
    echo "Updating games..."
    ~/emmaus-arcade-games-main/update_games.sh
else
    echo "No internet. Using locally stored games..."
fi

echo "starting webserver"
python -m http.server 8000 --directory /home/arcade/emmaus-arcade-games-main/ &

echo "starting back to main menu deamon"
# not implemented yet

echo "starting webbrowser"
# chromium doesn't work (some bug it seems)
# chromium-browser --kiosk --app=https://localhost:8000/
# firefox --kiosk https://localhost:8000/ &
firefox https://localhost:8000/ &
