#!/bin/bash

# Ping Google's DNS to check for internet connectivity
if ping -c 1 8.8.8.8 &> /dev/null; then
    echo "Internet is connected."
    echo "updating rapberry pi OS..."
    #not implemented yet
    echo "Updating arcade..."
    ~/emmaus-arcade-games-main/arcade-update.sh
else
    echo "No internet. Continue without update..."
fi

./boot_part2.sh
