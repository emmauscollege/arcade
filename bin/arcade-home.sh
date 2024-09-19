#!/bin/bash

echo "Stopping webbrowser if it was running"
#kill $(ps aux | grep 'firefox' |grep -v 'grep'| awk '{print $2}')
kill $(ps aux | grep 'chromium-browser' |grep -v 'grep'| awk '{print $2}')
# Details on the workings of previous command are as follows:
# The ps gives you the list of all the processes.
# The grep filters that based on your search string, grep -v returns all lines except the one(s) matched
# The awk just gives you the second field of each line, which is the PID.
# The $(x) construct means to execute x then take its output and put it on the command line. The output of that ps pipeline inside that construct above is the list of process IDs so you end up with a command like kill 1234 1122 7654.

# additional commands in an attempt to really kill browser processes
# the sound continueing after previous commands let to the assumption that the previous command is not working
pkill -KILL chromium
pkill -KILL chrome
pkill -KILL browser
pkill -9 chromium
pkill -9 chrome
pkill -9 browser

echo "Starting webbrowser"
#firefox --kiosk http://localhost:8000/ &
chromium-browser --noerrdialogs --disable-infobars --display=:0 --window-position=0,0 --incognito --kiosk http://localhost:8000/
