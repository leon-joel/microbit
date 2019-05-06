from microbit import *

while True:
    if button_b.was_pressed():
        display.clear()
        break

    rx = accelerometer.get_x()
    if rx > 40:
        cx = 4
    elif rx > 20:
        cx = 3
    elif rx < -40:
        cx = 0
    elif rx < -20:
        cx = 1
    else:
        cx = 2

    ry = accelerometer.get_y()
    if ry > 40:
        cy = 4
    elif ry > 20:
        cy = 3
    elif ry < -40:
        cy = 0
    elif ry < -20:
        cy = 1
    else:
        cy = 2

    display.clear()
    display.set_pixel(cx, cy, 9)
    #display.scroll(cx + cy)
