from microbit import *
import math
import utime

while True:
    display.scroll("Press A!")
    if button_a.was_pressed():
        break

display.show(Image.SQUARE)
sleep(1000)

with open('hello.txt', 'w') as my_file:
    while True:
        if button_b.was_pressed():
            display.show(Image.HEART)
            sleep(2000)
            display.clear()
            break

        # 起動後の経過時間(ms): 加速度(g): 加速度ベクトル(x,y,z)
        t = utime.ticks_ms()
        xyz = accelerometer.get_values()
        length = math.sqrt(math.pow(xyz[0], 2) + math.pow(xyz[1], 2) + math.pow(xyz[2], 2))
        my_file.write(str(t) + ": " + str(length) + ": " + str(xyz) + "\n")
        display.show(Image.YES)
        # sleep(100)
        # display.clear()
        # sleep(100)
