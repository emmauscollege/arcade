# Return to the menu when the home button (key 1) is pressed
# or after 3 minutes without any input

import select
import subprocess
import time
from evdev import InputDevice, ecodes, list_devices

IDLE_SECONDS = 180
HOME_KEYS = (ecodes.KEY_1, ecodes.KEY_KP1)


def open_keyboards():
    keyboards = []
    for path in list_devices():
        try:
            device = InputDevice(path)
            if ecodes.EV_KEY in device.capabilities():
                keyboards.append(device)
        except OSError:
            pass
    return keyboards


def go_home():
    subprocess.Popen(['/home/arcade/bin/arcade-home.sh'])


paths = None
last_input = time.monotonic()
last_home = 0
idle_done = False

while True:
    try:
        # (re)open input devices at start and when one is added or removed
        current = sorted(list_devices())
        if current != paths:
            paths = current
            keyboards = open_keyboards()

        ready, _, _ = select.select(keyboards, [], [], 1)
        now = time.monotonic()
        for device in ready:
            for event in device.read():
                if event.type == ecodes.EV_KEY:
                    last_input = now
                    idle_done = False
                    # ignore extra presses while the browser restarts
                    if event.value == 1 and event.code in HOME_KEYS and now - last_home > 3:
                        last_home = now
                        go_home()

        if not idle_done and now - last_input > IDLE_SECONDS:
            idle_done = True
            last_home = now
            go_home()

    except OSError:  # e.g. a USB device that briefly disconnects
        paths = None
        time.sleep(1)
