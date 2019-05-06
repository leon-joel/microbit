from microbit import *
import random

names = ["Mary", "Yolanda", "Damien", "Alia", "Kushal", "Mei Xiu", "Zoltan"]

while True:
    # if button_b.is_pressed() にすると、displayしている時のpressが認識されないので
    # get_presses()でpress数を取得している
    # if 0 < button_b.get_presses():
    # それと同じことが was_pressed() で実現できる
    if button_b.was_pressed():
        display.clear()
        break
    elif button_a.was_pressed():
        # randrange: 0以上N未満の整数
        #answer = random.randrange(100) + random.random()
        # randint(1, 6): 1以上6以下の整数
        answer = random.randint(1, 6) + random.random()
        display.scroll(str(answer))
        display.show(Image.HEART)
        sleep(1000)
    else:
        display.scroll(random.choice(names))
        display.show(Image.HEART)
        sleep(3000)

