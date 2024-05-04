#!/bin/bash

echo "Stopping webbrowser if it was running"
#kill $(ps aux | grep 'firefox' |grep -v 'grep'| awk '{print $2}')
kill $(ps aux | grep 'chromium-browser' |grep -v 'grep'| awk '{print $2}')
# Details on the workings of previous command are as follows:
# The ps gives you the list of all the processes.
# The grep filters that based on your search string, grep -v returns all lines except the one(s) matched
# The awk just gives you the second field of each line, which is the PID.
# The $(x) construct means to execute x then take its output and put it on the command line. The output of that ps pipeline inside that construct above is the list of process IDs so you end up with a command like kill 1234 1122 7654.


echo "Starting webbrowser"
#firefox --kiosk http://localhost:8000/ &
#next line opens links in small window, i don't know why, it is not what i want.
#chromium-browser --noerrdialogs --disable-infobars --kiosk http://localhost:8000/  &
#next line opens links in same kiosk
#chromium-browser --display=:0 --kiosk --incognito --window-position=0,0 https://reelyactive.github.io/diy/pi-kiosk/
#next line opens links in same kiosk
#chromium-browser --display=:0 --kiosk --incognito --window-position=0,0 https://informatica.emmauscollege.nl/
#next line opens links in small window, i don't know why, it is not what i want.
chromium-browser --display=:0 --kiosk --incognito --window-position=0,0  http://localhost:8000/
#
# it seems like the cause of the problem is something in the way that games are started from the index.html menu of the arcade
# aha found it: when using enter to go to the link, it opens in a new window. mouseclicking doesn't
# AHAHAHA: FOUND BUG: de drukknop om een spel te starten is shift en enter. Met shift/enter start je iets in een nieuw window.
# fix nog niet bedacht, maar dat komt wel (control mapping aanpassen kan, maar heeft vrij veel impact)
