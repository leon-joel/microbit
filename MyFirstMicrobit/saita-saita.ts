let D2 = 0
let C2 = 0
let queue: string[] = []
let A2 = 0
let B2 = 0
let B = 0
let A = 0
basic.forever(function () {
  A = pins.digitalReadPin(DigitalPin.P16)
  if (1 != A) {
    queue.push("A")
  }
  B = pins.digitalReadPin(DigitalPin.P1)
  if (1 != B) {
    queue.push("B")
  }
  led.plotBarGraph(
    A,
    10
  )
  if (queue.indexOf("A") >= 0 && queue.indexOf("B") >= 0) {
    music.playTone(262, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.rest(music.beat(BeatFraction.Whole))
    music.playTone(262, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.rest(music.beat(BeatFraction.Whole))
    music.playTone(392, music.beat(BeatFraction.Whole))
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(262, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.playTone(330, music.beat(BeatFraction.Whole))
    music.playTone(294, music.beat(BeatFraction.Whole))
    music.rest(music.beat(BeatFraction.Whole))
    queue = []
  }
})
