let brightnessLed = 16
let scrollMSec = 300
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
let neo: neopixel.Strip = neopixel.create(DigitalPin.P8, 4, NeoPixelMode.RGB)
let neoRange: neopixel.Strip = null
const initNeoBrightness = 16
function initNeoPixel() {
  neo.setBrightness(initNeoBrightness)
  neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
  neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Blue))
  neo.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
  neo.setPixelColor(3, neopixel.colors(NeoPixelColors.White))
  neo.show()
  // neoRange = neo.range(1, 3)
  // neoRange.showRainbow(1, 360)
}

let currentColor = initNeoBrightness
let d = 8
let up = true
let colorList: number[] = [0, 2, 4, 8, 16, 32, 64, 128, 255, 128, 64, 32, 16, 8, 4, 2, 1];
function openingShow(){
  while (phase == 0){
    if (up){
      currentColor += d
    }else{
      currentColor -= d
    }
    if (up && 255 < currentColor){
      up = false
      currentColor = 255
    }else if (!up && currentColor < 8){
      up = true
      currentColor = 8
    }
    
    neo.setPixelColor(0, neopixel.rgb(currentColor, 0, 0))
    neo.setPixelColor(1, neopixel.rgb(0, currentColor, 0))
    neo.setPixelColor(2, neopixel.rgb(0, 0, currentColor))
    neo.setPixelColor(3, neopixel.rgb(currentColor, currentColor, 0))
    neo.show()
    basic.pause(100)
  }
  // for (let col of colorList) {
  //   neo.setPixelColor(0, neopixel.rgb(col, 0, 0))
  //   neo.setPixelColor(1, neopixel.rgb(0, col, 0))
  //   neo.setPixelColor(2, neopixel.rgb(0, 0, col))
  //   neo.setPixelColor(3, neopixel.rgb(col, col, 0))
  //   neo.show()
  //   basic.pause(100)
  // }
  initNeoPixel()
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
    music.playTone(Note.C, music.beat(BeatFraction.Half))
    // music.playTone(Note.C, music.beat(BeatFraction.Eighth))
    // music.playTone(Note.C, music.beat(BeatFraction.Quarter))
    // music.playTone(Note.C, music.beat(BeatFraction.Half))
  } else if (padB == 0) {
    music.playTone(Note.E, music.beat(BeatFraction.Half))
    // music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
    // music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.OnceInBackground)
  } else if (padC == 0){
    music.playTone(Note.G, music.beat(BeatFraction.Half))
  } else if (padD == 0){
    music.playTone(Note.C5, music.beat(BeatFraction.Half))
  }
}
function displayScreen() {
  if (padA == 0) {
    custom.showA()
  } else if (padB == 0) {
    custom.showB()
  } else if (padC == 0) {
    custom.showC()
  } else if (padD == 0) {
    custom.showD()
  }
}
input.onButtonPressed(Button.A, function () {
  custom.showA()
  phase = 1
})
input.onButtonPressed(Button.B, function () {
  custom.showB()
  phase = 1
})
let phase = 0
input.onButtonPressed(Button.AB, function () {
  phase = 2
})
function exitFunc() {
  led.enable(false)
  neoRange = neo.range(0, 4)
  neoRange.showColor(neopixel.colors(NeoPixelColors.Black))
}

// initImages()
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
music.setTempo(150)

// main()
// exitFunc()

basic.forever(function () {
  if (phase == 0) {
    openingShow()
  }else if (phase == 1) {
    readPad()
    countPad()
    playSound()
    displayScreen()
  } else {
    exitFunc()
  }
})
