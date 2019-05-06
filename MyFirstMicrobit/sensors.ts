let mode = 0
input.onButtonPressed(Button.A, function () {
  mode = 1
  basic.clearScreen()
  music.playTone(523, music.beat(BeatFraction.Quarter))
})
input.onButtonPressed(Button.B, function () {
  mode = 2
  basic.clearScreen()
  music.playTone(659, music.beat(BeatFraction.Quarter))
 })
input.onButtonPressed(Button.AB, function () {
  mode = 3
  basic.clearScreen()
  music.playTone(784, music.beat(BeatFraction.Quarter))
})
led.setBrightness(32)
mode = 0
basic.forever(function () {
  if (mode == 0) {
    basic.showNumber(input.temperature())
  } else if (mode == 1) {
    basic.showNumber(input.acceleration(Dimension.Z))
  } else if (mode == 2) {
    basic.showNumber(input.lightLevel())
  }
})
