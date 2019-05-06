from microbit import *

while True:
    if pin0.is_touched():
        display.show(Image.HAPPY)
    elif button_b.is_pressed():
        display.clear()
        break
    elif button_a.is_pressed():
        display.show(Image.SMILE)
    else:
        display.show(Image.SAD)
