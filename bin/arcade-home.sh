#!/bin/bash

echo "Stopping webbrowser if it was running"
pkill -KILL chromium

echo "Starting webbrowser"
chromium-browser --noerrdialogs --disable-infobars --display=:0 --window-position=0,0 --incognito --password-store=basic --kiosk http://localhost:8000/
