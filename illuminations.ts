let brightnessLed = 16
function initLed() {
  brightnessLed = 16
  led.setDisplayMode(DisplayMode.Greyscale)
  led.setBrightness(brightnessLed)
}
//   x -> 
// y  0  1  2  3  4
// ↓ 15           5
//   14           6
//   13           7
//   12 11 10  9  8
function plotOuterLed(idx: number){
  if (idx <= 4)
    led.plot(idx, 0)
  else if (idx <= 7)
    led.plot(4, idx - 4)
  else if (idx <= 12)
    led.plot(12 - idx , 4)
  else if (idx <= 15)
    led.plot(0, 16 - idx)
}
function clearOuterLed() {
  led.unplot(0, 0)
  led.unplot(1, 0)
  led.unplot(2, 0)
  led.unplot(3, 0)
  led.unplot(4, 0)
  led.unplot(0, 1)
  led.unplot(4, 1)
  led.unplot(0, 2)
  led.unplot(4, 2)
  led.unplot(0, 3)
  led.unplot(4, 3)
  led.unplot(0, 4)
  led.unplot(1, 4)
  led.unplot(2, 4)
  led.unplot(3, 4)
  led.unplot(4, 4)
}
function plotOuterLeds(aryIdx: number[]){
  clearOuterLed()
  for (const idx of aryIdx) {
    plotOuterLed(idx)
  }
}

//   x -> 
// y  .  .  .  .  .
// ↓  .  0  1  2  .
//    .  7     3  .
//    .  6  5  4  .
//    .  .  .  .  .
function plotInnerLed(idx: number) {
  if (idx <= 2)
    led.plot(idx + 1, 1)
  else if (idx <= 3)
    led.plot(3, idx - 1)
  else if (idx <= 6)
    led.plot(7 - idx, 3)
  else if (idx <= 7)
    led.plot(1, 9 - idx)
}
function plotInnerLeds(aryIdx: number[]) {
  clearInnerLed()
  for (const idx of aryIdx) {
    plotInnerLed(idx)
  }
}
function clearInnerLed() {
  led.unplot(1, 1)
  led.unplot(2, 1)
  led.unplot(3, 1)
  led.unplot(1, 2)
  led.unplot(3, 2)
  led.unplot(1, 3)
  led.unplot(2, 3)
  led.unplot(3, 3)
}

let phase = 0
input.onButtonPressed(Button.AB, function () {
  phase = 2
  custom.clearLed()
})

initLed();

let cur = 0
const PlotOuterLen = 10
const MaxOuterIdx = 15
let ledsOuter: number[] = []
const PlotInnerLen = 6
const MaxInnerIdx = 7
let ledsInner: number[] = []
basic.forever(function () {
  if (phase == 0){
    for (let i = 0; i < PlotOuterLen; i++) {
      ledsOuter[i] = (cur/2 + i) % (MaxOuterIdx + 1)
    }
    plotOuterLeds(ledsOuter)

    for (let i = 0; i < PlotInnerLen; i++) {
      ledsInner[i] = (cur / 3 + i) % (MaxInnerIdx + 1)
    }
    plotInnerLeds(ledsInner)

    ++cur;
    basic.pause(10)  // 時々pause(0)を入れてあげないとスイッチ入力を拾えなくなる
  }
})
