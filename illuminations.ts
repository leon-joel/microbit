let brightnessLed = 16
function initLed() {
  brightnessLed = 16
  led.setDisplayMode(DisplayMode.Greyscale)
  led.setBrightness(brightnessLed)
}

enum Led {
  Off = 0,
  On = 1,
}

//   x -> 
// y  0  1  2  3  4
// ↓ 15           5
//   14           6
//   13           7
//   12 11 10  9  8
function plotOuterLed(idx: number, v: Led){
  let x: number
  let y: number
  if (idx <= 4){
    x = idx
    y = 0
  }else if (idx <= 7){
    x = 4
    y = idx - 4
  }else if (idx <= 12){
    x = 12 - idx
    y = 4
  }else if (idx <= 15){
    x = 0
    y = 16 - idx
  }
  if (v == Led.Off) led.unplot(x, y)
  else led.plot(x, y)
}
function plotOuterLeds(aryIdx: number[]) {
  for (let i = 0; i < aryIdx.length; i++) {
    const v = aryIdx[i];
    plotOuterLed(i, v)
  }
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

//   x -> 
// y  .  .  .  .  .
// ↓  .  0  1  2  .
//    .  7     3  .
//    .  6  5  4  .
//    .  .  .  .  .
function plotInnerLed(idx: number, v: Led) {
  let x: number
  let y: number
  if (idx <= 2){
    x = idx + 1
    y = 1
  }else if (idx <= 3){
    x = 3
    y = idx - 1
  }else if (idx <= 6){
    x = 7 - idx
    y = 3
  }else if (idx <= 7){
    x = 1
    y = 9 - idx
  }
  if (v == Led.Off) led.unplot(x, y)
  else led.plot(x, y)
}
function plotInnerLeds(aryIdx: Led[]) {
  for (let i = 0; i < aryIdx.length; i++) {
    const v = aryIdx[i];
    plotInnerLed(i, v)
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
// 内側ぐるぐるの同時点灯数
const PlotInnerLen = 6
// 内側ぐるぐるの全周LED数-1
const MaxInnerIdx = 7
// 内側ぐるぐるの点灯状況配列
let ledsInner: Led[] = []

// 同、外周
const PlotOuterLen = 10
const MaxOuterIdx = 15
let ledsOuter: Led[] = []

basic.forever(function () {
  if (phase == 0){
    // 点灯状況配列を初期化（全部OFFに）
    for (let i = 0; i < MaxOuterIdx+1; i++) {
      ledsOuter[i] = Led.Off
    }
    // 点灯する番号(idx)だけをOnにする
    for (let i = 0; i < PlotOuterLen; i++) {
      ledsOuter[(cur / 2 + i) % (MaxOuterIdx + 1)] = Led.On
    }
    plotOuterLeds(ledsOuter)

    // 同、内周
    for (let i = 0; i < MaxInnerIdx + 1; i++) {
      ledsInner[i] = Led.Off
    }
    for (let i = 0; i < PlotInnerLen; i++) {
      ledsInner[(cur / 3 + i) % (MaxInnerIdx + 1)] = Led.On
    }
    plotInnerLeds(ledsInner)

    ++cur;
    basic.pause(10)  // 時々pause(0)を入れてあげないとスイッチ入力を拾えなくなる
  }
})
