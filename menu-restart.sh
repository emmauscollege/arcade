#!/bin/bash

# kill browser process
# not implemented yet

# restart browser
echo "starting webbrowser"
# chromium doesn't work (some bug it seems)
# chromium-browser --kiosk --app=https://localhost:8000/
firefox --kiosk https://localhost:8000/ &
