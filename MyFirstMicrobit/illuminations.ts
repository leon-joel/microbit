let brightnessLed = 16
function initLed() {
  brightnessLed = 16
  led.setDisplayMode(DisplayMode.Greyscale)
  led.setBrightness(brightnessLed)
}

let phase = 0
input.onButtonPressed(Button.AB, function () {
  phase = 2
  MyLed.clearLed()
})

initLed(); 

let cur = 0
// 内側ぐるぐるの点灯状況配列
let ledsInner: MyLed.Stat[] = []
// 同、外周
let ledsOuter: MyLed.Stat[] = []

basic.forever(function () {
  if (phase == 0){
    // 点灯状況配列を初期化（全部OFFに）
    for (let i = 0; i < MyLed.MaxOuterIdx+1; i++) {
      ledsOuter[i] = MyLed.Stat.Off
    }
    // 点灯する番号(idx)だけをOnにする
    for (let i = 0; i < MyLed.PlotOuterLen; i++) {
      ledsOuter[(cur / 2 + i) % (MyLed.MaxOuterIdx + 1)] = MyLed.Stat.On
    }
    MyLed.plotOuterLeds(ledsOuter)

    // 同、内周
    for (let i = 0; i < MyLed.MaxInnerIdx + 1; i++) {
      ledsInner[i] = MyLed.Stat.Off
    }
    for (let i = 0; i < MyLed.PlotInnerLen; i++) {
      ledsInner[(cur / 3 + i) % (MyLed.MaxInnerIdx + 1)] = MyLed.Stat.On
    }
    MyLed.plotInnerLeds(ledsInner)

    ++cur;
    basic.pause(10)  // 時々pause(0)を入れてあげないとスイッチ入力を拾えなくなる
  }
})
