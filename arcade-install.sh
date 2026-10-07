#!/bin/bash

# Wait until the network is up (it may still be connecting right after boot)
# and check with https instead of ping, because ping is often blocked
echo "Checking internet connection..."
nm-online -s -q -t 60
online=no
for i in 1 2 3 4 5; do
    if wget -q --spider --tries=1 --timeout=10 https://github.com; then
        online=yes
        break
    fi
    sleep 3
done

if [ $online = yes ]; then
    echo "Internet is connected."

    echo "Updating arcade..."
    rm -rf ~/Downloads/arcade.zip ~/Downloads/arcade-main
    # only replace the current version if the download is complete
    if wget -q https://github.com/emmauscollege/arcade/archive/refs/heads/main.zip -O ~/Downloads/arcade.zip &&
        unzip -qo ~/Downloads/arcade.zip -d ~/Downloads/ &&
        [ -d ~/Downloads/arcade-main/web ] && [ -d ~/Downloads/arcade-main/bin ]; then
        rm -rf ~/web ~/bin
        mv ~/Downloads/arcade-main/web ~/web
        mv ~/Downloads/arcade-main/bin ~/bin
        mkdir -p ~/.config/autostart/
        cp ~/Downloads/arcade-main/.config/autostart/arcade.desktop ~/.config/autostart/
        # mv instead of cp, so this script is not overwritten while it runs
        mv ~/Downloads/arcade-main/arcade-install.sh ~/arcade-install.sh
    else
        echo "Download failed. Continue with current version..."
    fi

    echo "Updating raspberry pi OS..."
    sudo apt-get -yq update
    sudo DEBIAN_FRONTEND=noninteractive apt-get -yq -o Dpkg::Options::=--force-confold upgrade
    sudo apt-get -yq install wget unzip unclutter python3-evdev
else
    echo "No internet. Continue without update..."
fi

echo "Clearing browser cache"
rm -rf ~/.cache/chromium
rm -rf ~/.cache/mozilla

echo "Starting arcade..."
~/bin/arcade-start.sh
