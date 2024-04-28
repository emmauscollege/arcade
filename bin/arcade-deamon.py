# not tested, copy paste from chatgpt


from gpiozero import Button
from signal import pause
import subprocess

def run_script():
    print("Button held for 5 seconds, running script...")
    subprocess.run(['/path/to/your/script.sh'])

button = Button(17)  # Adjust the pin number if different

button.when_held = run_script
button.hold_time = 5  # Time in seconds the button needs to be held

pause()  # Wait for events
----

from pynput import keyboard
import time

class EscKeyListener:
    def __init__(self):
        self.esc_pressed_time = None
        self.listener = keyboard.Listener(on_press=self.on_press, on_release=self.on_release)
        
    def on_press(self, key):
        if key == keyboard.Key.esc:
            if self.esc_pressed_time is None:
                # Record the time when ESC key is first pressed
                self.esc_pressed_time = time.time()
    
    def on_release(self, key):
        if key == keyboard.Key.esc and self.esc_pressed_time is not None:
            # Calculate how long the key was held
            held_time = time.time() - self.esc_pressed_time
            self.esc_pressed_time = None
            if held_time >= 5:
                # Trigger the action if the key was held for 5 or more seconds
                self.trigger_action()
                
    def trigger_action(self):
        print("ESC key was held down for 5 seconds. Action triggered!")
        # You can add any custom action here.
    
    def run(self):
        with self.listener as listener:
            listener.join()

if __name__ == "__main__":
    key_listener = EscKeyListener()
    key_listener.run()

pause()  # Wait for events

----
https://pypi.org/project/pynput/

from pynput import keyboard

def on_press(key):
    try:
        print('alphanumeric key {0} pressed'.format(
            key.char))
    except AttributeError:
        print('special key {0} pressed'.format(
            key))

def on_release(key):
    print('{0} released'.format(
        key))
    if key == keyboard.Key.esc:
        # Stop listener
        return False

# in a non-blocking fashion:
listener = keyboard.Listener(
    on_press=on_press,
    on_release=on_release)
listener.start()

pause()  # Wait for events