let imageA: Image = null
let imageB: Image = null
let imageC: Image = null
let imageD: Image = null
function initImages() {
  imageA = images.createImage(`
        . # # . .
        # . . # .
        # . . # .
        # # # # .
        # . . # .
        `)
  imageB = images.createImage(`
        # # # . .
        # . . # .
        # # # . .
        # . . # .
        # # # . .
        `)
  imageC = images.createImage(`
        . # # # .
        # . . . .
        # . . . .
        # . . . .
        . # # # .
        `)
  imageD = images.createImage(`
        # # # . .
        # . . # .
        # . . # .
        # . . # .
        # # # . .
        `)
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
  neo.show()
  neoRange = neo.range(1, 3)
  neoRange.showRainbow(1, 360)
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
    basic.showNumber(cntPadA + cntPadB + cntPadC + cntPadD)
  }
}


function showA() {
  clearLed()
  imageA.scrollImage(1, scrollMSec)
}
function showB() {
  clearLed()
  imageB.scrollImage(1, scrollMSec)
}
function showC() {
  clearLed()
  imageC.scrollImage(1, scrollMSec)
}
function showD() {
  clearLed()
  imageD.scrollImage(1, scrollMSec)
}
function clearLed() {
    led.unplot(0, 0)
    led.unplot(1, 0)
    led.unplot(2, 0)
    led.unplot(3, 0)
    led.unplot(4, 0)
    led.unplot(0, 1)
    led.unplot(1, 1)
    led.unplot(2, 1)
    led.unplot(3, 1)
    led.unplot(4, 1)
    led.unplot(0, 1)
    led.unplot(1, 2)
    led.unplot(2, 2)
    led.unplot(3, 2)
    led.unplot(4, 2)
    led.unplot(0, 3)
    led.unplot(1, 3)
    led.unplot(2, 3)
    led.unplot(3, 3)
    led.unplot(4, 3)
    led.unplot(0, 4)
    led.unplot(1, 4)
    led.unplot(2, 4)
    led.unplot(3, 4)
    led.unplot(4, 4)
}
function readPad() {
  padA = pins.digitalReadPin(DigitalPin.P16)
  padB = pins.digitalReadPin(DigitalPin.P1)
  padC = pins.digitalReadPin(DigitalPin.P12)
  padD = pins.digitalReadPin(DigitalPin.P2)
}
function countPad() {
  if (padA == 0) ++cntPadA
  if (padB == 0) ++cntPadB
  if (padC == 0) ++cntPadC
  if (padD == 0) ++cntPadD
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

main()
exitFunc()

// basic.forever(function () {
//   if (exitLoop == 0) {
//     readPad()
//     countPad()
//     basic.showNumber(cntPadA + cntPadB + cntPadC + cntPadD)
//   } else {
//     exitFunc()
//   }
// })
