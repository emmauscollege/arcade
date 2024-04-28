#!/bin/bash

# kill webserver process
# not implemented yet
echo "Starting webserver"
python -m http.server 8000 --directory ~/web/ &

# kill deamon process
# not implemented yet
echo "Starting back to main menu deamon"
# not implemented yet

# kill browser process
# not implemented yet

echo "Starting webbrowser"
# chromium doesn't work (some bug it seems)
# chromium-browser --kiosk --app=https://localhost:8000/
# firefox --kiosk https://localhost:8000/ &
firefox http://localhost:8000/ &
