let imageA: Image = null
let imageB: Image = null
let imageC: Image = null
let imageD: Image = null
function initImages() {
  imageA = custom.createImageA()
  imageB = custom.createImageB()
  imageC = custom.createImageC()
  imageD = custom.createImageD()
}

let brightnessLed = 16
let scrollMSec = 300;
let padA = 0
let padB = 0
let padC = 0
let padD = 0
let cntPadA = 0
let cntPadB = 0
let cntPadC = 0
let cntPadD = 0
function initLed() {
  brightnessLed = 16
  led.setDisplayMode(DisplayMode.Greyscale)
  led.setBrightness(brightnessLed)
}
let neo: neopixel.Strip = null
let neoRange: neopixel.Strip = null
function initNeoPixel() {
  neo = neopixel.create(DigitalPin.P8, 4, NeoPixelMode.RGB)
  neo.setBrightness(16)
  neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
  neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Blue))
  neo.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
  neo.setPixelColor(3, neopixel.colors(NeoPixelColors.White))
  neo.show()
  // neoRange = neo.range(1, 3)
  // neoRange.showRainbow(1, 360)
}
function showA() {
  custom.clearLed()
  // imageA.scrollImage(1, scrollMSec)
  imageA.showImage(0)
}
function showB() {
  custom.clearLed()
  imageB.showImage(0)
}
function showC() {
  custom.clearLed()
  imageC.showImage(0)
}
function showD() {
  custom.clearLed()
  imageD.showImage(0)
}
function readPad() {
  padA = custom.readPadA()
  padB = custom.readPadB()
  padC = custom.readPadC()
  padD = custom.readPadD()
}
function countPad() {
  // 0:押されていた 1:押されていなかった
  if (padA == 0) ++cntPadA
  if (padB == 0) ++cntPadB
  if (padC == 0) ++cntPadC
  if (padD == 0) ++cntPadD
}
function playSound() {
  if (padA == 0){
    // music.playTone(Note.C, music.beat(BeatFraction.Whole))
    // music.playTone(Note.C, music.beat(BeatFraction.Eighth))
    music.playTone(Note.C, music.beat(BeatFraction.Quarter))
  } else if (padB == 0) {
    music.playTone(Note.E, music.beat(BeatFraction.Quarter))
    // music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
    // music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.OnceInBackground)
  } else if (padC == 0){
    music.playTone(Note.G, music.beat(BeatFraction.Quarter))
  } else if (padD == 0){
    music.playTone(Note.C5, music.beat(BeatFraction.Quarter))
  }
}
function displayScreen() {
  if (padA == 0) {
    showA()
  } else if (padB == 0) {
    showB()
  } else if (padC == 0) {
    showC()
  } else if (padD == 0) {
    showD()
  }
}
input.onButtonPressed(Button.A, function () {
  showA()
})
input.onButtonPressed(Button.B, function () {
  showB()
})
let exitLoop = 0
input.onButtonPressed(Button.AB, function () {
  exitLoop = 1
})
function exitFunc() {
  led.enable(false)
  neoRange = neo.range(0, 4)
  neoRange.showColor(neopixel.colors(NeoPixelColors.Black))
}
function main() {
  while (exitLoop == 0) {
    readPad()
    countPad()
    playSound()
    displayScreen()
    // basic.showNumber(cntPadA + cntPadB + cntPadC + cntPadD)
  }
}


initImages()
initLed()
initNeoPixel()

// 意味なし
// pins.setEvents(DigitalPin.P16, PinEventType.Touch)
// pins.setEvents(DigitalPin.P1, PinEventType.Edge)  // 変化
// pins.setEvents(DigitalPin.P12, PinEventType.Pulse)
// pins.setEvents(DigitalPin.P2, PinEventType.Touch)

led.setDisplayMode(DisplayMode.Greyscale)
led.setBrightness(brightnessLed)
// basic.showNumber(brightnessLed)
// basic.pause(100)
// brightnessLed *= 2
// led.setBrightness(brightnessLed)
// basic.showNumber(brightnessLed)
// basic.pause(100)
// brightnessLed *= 2
// led.setBrightness(brightnessLed)
// basic.showNumber(brightnessLed)
// basic.pause(100)
// brightnessLed *= 2
// led.setBrightness(brightnessLed)
// basic.showNumber(brightnessLed)
// brightnessLed = 255
// led.setBrightness(brightnessLed)
// basic.showNumber(brightnessLed)

// 
// control.inBackground(function () {
// })
music.setTempo(180)

// main()
// exitFunc()

basic.forever(function () {
  if (exitLoop == 0) {
    readPad()
    countPad()
    playSound()
    displayScreen()
  } else {
    exitFunc()
  }
})
