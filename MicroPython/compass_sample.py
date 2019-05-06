from microbit import *

compass.calibrate()

while True:
    if button_a.was_pressed():
        compass.calibrate()
    elif button_b.was_pressed():
        display.clear()
        break

    needle = ((15 - compass.heading()) // 30) % 12
    display.show(Image.ALL_CLOCKS[needle])
