# restart arcade when a certain key is hold down for more than a certain number of seconds
# more info at https://pypi.org/project/pynput/

from pynput import keyboard
from signal import pause
import subprocess
import time

esc_pressed_time = None

def run_script():
    print("Button held for 5 seconds, running ~/bin/arcade-start.sh")
    subprocess.run(['~/bin/arcade-start.sh'])

def on_press(key):
    global esc_pressed_time  
    try:
        print('alphanumeric key {0} pressed'.format(key.char))
    except AttributeError:
        print('special key {0} pressed'.format(key))
    if key == keyboard.Key.esc:
        if esc_pressed_time is None:
            # Record the time when ESC key is first pressed
            esc_pressed_time = time.time()

def on_release(key):
    global esc_pressed_time 
    print('{0} released'.format(key))
    if key == keyboard.Key.esc and esc_pressed_time is not None:
        # Calculate how long the key was held
        held_time = time.time() - esc_pressed_time
        esc_pressed_time = None
        if held_time >= 3:
            # Trigger the action if the key was held for 3 or more seconds
            run_script()


# listen in a non-blocking fashion:
listener = keyboard.Listener(
    on_press=on_press,
    on_release=on_release)
listener.start()

print('Hotkey is listening')

pause()  # Wait for events