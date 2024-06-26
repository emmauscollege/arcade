# Restart arcade when F1-key is pressed
# Code taken from chatgpt
# https://chat.openai.com/share/a2460b8d-08f8-4580-bb59-adf84836ab3c

import subprocess
from evdev import InputDevice, categorize, ecodes, list_devices

def run_script():
    print("F1 key pressed - running script...")
    subprocess.run(['/home/arcade/bin/arcade-home.sh'])

def listen_for_a_key(device):
    for event in device.read_loop():
        if event.type == ecodes.EV_KEY:
            key_event = categorize(event)
            if key_event.keystate == key_event.key_down:
                if key_event.keycode == 'KEY_F1':
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
        # Use threading to listen on multiple keyboards
        from threading import Thread
        thread = Thread(target=listen_for_a_key, args=(keyboard,))
        thread.start()

if __name__ == "__main__":
    main()