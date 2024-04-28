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