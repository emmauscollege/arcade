#!/bin/bash

# Ping Google's DNS to check for internet connectivity
if ping -c 1 8.8.8.8 &> /dev/null; then
    echo "Internet is connected."
    echo "updating rapberry pi OS..."
    #not implemented yet
    echo "Updating games..."
    update_games.sh
else
    echo "No internet. Using locally stored games..."
fi

echo "starting webbrowser"
chromium-browser --kiosk --app=file://home/arcade/emmaus-arcade-games-main/index.html

