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

function calcLedColors(id: number, patNum: number, detailNum: number) {
  let r = 0, g = 0, b = 0
  let pat = (id + patNum) % 4
  switch (pat) {
    default:
    case 0:
      r = detailNum
      g = detailNum
      b = 255 - detailNum
      break
    case 1:
      r = 255
      g = 255 - detailNum
      b = 0
      break
    case 2:
      r = 255 - detailNum
      g = detailNum
      b = 0
      break
    case 3:
      r = 0
      g = 255 - detailNum
      b = detailNum
      break
  }
  return { r: r, g: g, b: b }
}

enum LedMode {
  Gradation,
  Round,
  Blink,
  Off,
}

let ledMode = LedMode.Gradation
function openingShow(){
  let currentColor = initNeoBrightness
  let up = true
  const d = 8
  let cur = 0
  while (phase == 0) {
    if (ledMode == LedMode.Gradation){
      // グラデーションカラーで回転
      let patNum = Math.floor(cur / 256)
      // if (100 == cur || 200 == cur || 250 < cur) {
      //   basic.showNumber(cur)
      //   basic.showNumber(patNum)
      // }
      let detail = cur % 256
      for (let i = 0; i < 4; i++) {
        let c = calcLedColors(i, patNum, detail)
        neo.setPixelColor(i, neopixel.rgb(c.r, c.g, c.b))
      }
      neo.show()
      ++cur
      if (1024 <= cur) cur = 0
    
    } else if (ledMode == LedMode.Blink){
      // 輝度をUp/Down
      if (up) currentColor += d
      else currentColor -= d
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

    } else if (ledMode == LedMode.Round){
      const cols = [{ r: 255, g: 255, b: 0 }, { r: 0, g: 255, b: 255 }, { r: 255, g: 0, b: 255 }, { r: 255, g: 255, b: 255 }]
      let id = Math.floor(cur / 32) % 4
      let c = cols[Math.floor(cur / 256)]
      for (let i = 0; i < 4; i++) {
        if (id == i) {
          neo.setPixelColor(i, neopixel.rgb(c.r, c.g, c.b))
        } else {
          if (i == (id + 3) % 4)
            neo.setPixelColor(i, neopixel.rgb(c.r * 2 / 4, c.g * 2 / 4, c.b * 2 / 4))
          else if (i == (id + 2) % 4)
            neo.setPixelColor(i, neopixel.rgb(c.r * 1 / 4, c.g * 1 / 4, c.b * 1 / 4))
          else if (i == (id + 1) % 4)
            neo.setPixelColor(i, neopixel.rgb(c.r * 1 / 8, c.g * 1 / 8, c.b * 1 / 8))
        }
      }
      neo.show()
      ++cur
      if (1024 <= cur) cur = 0

    } else if (ledMode == LedMode.Off){
      neoRange = neo.range(0, 4)
      neoRange.showColor(neopixel.colors(NeoPixelColors.Black))
    }
    basic.pause(0)  // 時々pause(0)を入れてあげないとスイッチ入力を拾えなくなる
    
    readPad()
    playSound()
    if (padA == Pad.On) {
      ledMode = LedMode.Gradation
      // basic.showString("Gradation")
    }else if (padB == Pad.On) {
      ledMode = LedMode.Blink
      // basic.showString("Blink")
    }else if (padC == Pad.On) {
      ledMode = LedMode.Round
      // basic.showString("Round")
    }else if (padD == Pad.On) {
      ledMode = LedMode.Off
      // basic.showString("Off")
    }
    displayScreen()
  }
  
  // 輝度リストを使用して輝度をUp/Down
  // const colorList: number[] = [0, 2, 4, 8, 16, 32, 64, 128, 255, 128, 64, 32, 16, 8, 4, 2, 1];
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
let phase = 0
input.onButtonPressed(Button.A, function () {
  custom.showA()
  phase = 1
})
input.onButtonPressed(Button.B, function () {
  custom.showB()
  phase = 1
})
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
