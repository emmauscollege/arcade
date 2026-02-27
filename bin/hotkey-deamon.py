# Restart arcade when F1-key is pressed
# Code taken from chatgpt
# https://chat.openai.com/share/a2460b8d-08f8-4580-bb59-adf84836ab3c

import subprocess
import time
import select
from threading import Thread, Lock
from evdev import InputDevice, categorize, ecodes, list_devices

IDLE_TIMEOUT_SECONDS = 600
lastKeyPressTime = time.monotonic()
last_key_lock = Lock()
idle_triggered = False

def run_script():
    print("Action triggered - running script...")
    subprocess.run(['/home/arcade/bin/arcade-home.sh'])

def update_last_keypress_time():
    global lastKeyPressTime, idle_triggered
    with last_key_lock:
        lastKeyPressTime = time.monotonic()
        idle_triggered = False

def check_idle_timeout():
    global idle_triggered
    with last_key_lock:
        elapsed = time.monotonic() - lastKeyPressTime
        if not idle_triggered and elapsed >= IDLE_TIMEOUT_SECONDS:
            idle_triggered = True
            return True
    return False

def listen_for_a_key(device):
    while True:
        ready, _, _ = select.select([device], [], [], 1.0)

        if ready:
            for event in device.read():
                if event.type == ecodes.EV_KEY:
                    key_event = categorize(event)
                    if key_event.keystate == key_event.key_down:
                        update_last_keypress_time()
                        if key_event.keycode in ('KEY_1', 'KEY_KP1'):
                            run_script()

        if check_idle_timeout():
            print("10 minutes without keypress detected - running script...")
            run_script()

def is_keyboard(device):
    try:
        capabilities = device.capabilities()
        # Check if the device has keys (this covers typical keyboards)
        return ecodes.EV_KEY in capabilities
    except IOError:
        # Device could not be accessed or does not support capabilities
        return False

def main():
    devices = [InputDevice(path) for path in list_devices()]
    keyboards = [device for device in devices if is_keyboard(device)]

    for keyboard in keyboards:
        print(f"Listening on {keyboard.name}")
        thread = Thread(target=listen_for_a_key, args=(keyboard,), daemon=True)
        thread.start()

    while True:
        time.sleep(60)

if __name__ == "__main__":
    main()