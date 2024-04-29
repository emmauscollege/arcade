#!/bin/bash

echo "Stopping webserver if it was running"
kill $(ps aux | grep 'http.server' |grep -v 'grep'| awk '{print $2}')
# Details on the workings of previous command are as follows:
# The ps gives you the list of all the processes.
# The grep filters that based on your search string, grep -v returns all lines except the one(s) matched
# The awk just gives you the second field of each line, which is the PID.
# The $(x) construct means to execute x then take its output and put it on the command line. The output of that ps pipeline inside that construct above is the list of process IDs so you end up with a command like kill 1234 1122 7654.

echo "Starting webserver"
python -m http.server 8000 --directory ~/web/ &

echo "Stopping hotkey deamon if it was running"
kill $(ps aux | grep 'hotkey-deamon.py' |grep -v 'grep'| awk '{print $2}')
# Details on the workings of previous command are as follows:
# The ps gives you the list of all the processes.
# The grep filters that based on your search string, grep -v returns all lines except the one(s) matched
# The awk just gives you the second field of each line, which is the PID.
# The $(x) construct means to execute x then take its output and put it on the command line. The output of that ps pipeline inside that construct above is the list of process IDs so you end up with a command like kill 1234 1122 7654.


echo "Starting hotkey deamon"
python ~/bin/hotkey-deamon.py &

echo "Stopping webbrowser if it was running"
kill $(ps aux | grep 'firefox' |grep -v 'grep'| awk '{print $2}')
# Details on the workings of previous command are as follows:
# The ps gives you the list of all the processes.
# The grep filters that based on your search string, grep -v returns all lines except the one(s) matched
# The awk just gives you the second field of each line, which is the PID.
# The $(x) construct means to execute x then take its output and put it on the command line. The output of that ps pipeline inside that construct above is the list of process IDs so you end up with a command like kill 1234 1122 7654.


echo "Starting webbrowser"
# chromium doesn't work (some bug it seems)
# chromium-browser --kiosk --app=https://localhost:8000/
firefox --kiosk http://localhost:8000/ &
