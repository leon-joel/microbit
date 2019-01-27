
/**
 * このファイルを使って、独自の関数やブロックを定義してください。
 * 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
 */


namespace MyLed {
  export enum Stat {
    Off = 0,
    On = 1,
  }
  export const imageA = createImageA()
  export const imageB = createImageB()
  export const imageC = createImageC()
  export const imageD = createImageD()
  export function createImageA(): Image{
    return images.createImage(`
        . # # . .
        # . . # .
        # . . # .
        # # # # .
        # . . # .
        `)
  }
  export function createImageB(): Image {
    return images.createImage(`
        # # # . .
        # . . # .
        # # # . .
        # . . # .
        # # # . .
        `)
  }
  export function createImageC(): Image {
    return images.createImage(`
        . # # # .
        # . . . .
        # . . . .
        # . . . .
        . # # # .
        `)
  }
  export function createImageD(): Image {
    return images.createImage(`
        # # # . .
        # . . # .
        # . . # .
        # . . # .
        # # # . .
        `)
  }
  export function clearLed() {
    plotAll(Stat.Off)
  }
  export function plotAll(v:Stat) {
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        if (v == Stat.Off) led.unplot(x, y)
        else led.plot(x, y)
      }
    }
  }
  export function plotRandom(){
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        const v = Math.randomRange(0, 1)
        if (v == 0) led.unplot(x, y)
        else led.plot(x, y)
      }
    }
  }

  export function showA() {
    MyLed.clearLed()
    // imageA.scrollImage(1, scrollMSec)
    MyLed.imageA.showImage(0)
  }
  export function showB() {
    MyLed.clearLed()
    MyLed.imageB.showImage(0)
  }
  export function showC() {
    MyLed.clearLed()
    MyLed.imageC.showImage(0)
  }
  export function showD() {
    MyLed.clearLed()
    MyLed.imageD.showImage(0)
  }

  // 外周ぐるぐるの全周LED数-1
  export const MaxOuterIdx = 15
  //   x -> 
  // y  0  1  2  3  4
  // ↓ 15           5
  //   14           6
  //   13           7
  //   12 11 10  9  8
  export function plotOuterLed(idx: number, v: Stat) {
    let x: number
    let y: number
    if (idx <= 4) {
      x = idx
      y = 0
    } else if (idx <= 7) {
      x = 4
      y = idx - 4
    } else if (idx <= 12) {
      x = 12 - idx
      y = 4
    } else if (idx <= 15) {
      x = 0
      y = 16 - idx
    }
    if (v == Stat.Off) led.unplot(x, y)
    else led.plot(x, y)
  }
  export function plotOuterLeds(aryIdx: number[]) {
    for (let i = 0; i < aryIdx.length; i++) {
      const v = aryIdx[i];
      plotOuterLed(i, v)
    }
  }
  export function clearOuterLed() {
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

  // 内側ぐるぐるの全周LED数-1
  export const MaxInnerIdx = 7
  //   x -> 
  // y  .  .  .  .  .
  // ↓  .  0  1  2  .
  //    .  7     3  .
  //    .  6  5  4  .
  //    .  .  .  .  .
  export function plotInnerLed(idx: number, v: Stat) {
    let x: number
    let y: number
    if (idx <= 2) {
      x = idx + 1
      y = 1
    } else if (idx <= 3) {
      x = 3
      y = idx - 1
    } else if (idx <= 6) {
      x = 7 - idx
      y = 3
    } else if (idx <= 7) {
      x = 1
      y = 9 - idx
    }
    if (v == Stat.Off) led.unplot(x, y)
    else led.plot(x, y)
  }
  export function plotInnerLeds(aryIdx: Stat[]) {
    for (let i = 0; i < aryIdx.length; i++) {
      const v = aryIdx[i];
      plotInnerLed(i, v)
    }
  }
  export function clearInnerLed() {
    led.unplot(1, 1)
    led.unplot(2, 1)
    led.unplot(3, 1)
    led.unplot(1, 2)
    led.unplot(3, 2)
    led.unplot(1, 3)
    led.unplot(2, 3)
    led.unplot(3, 3)
  }

  export const MaxLedIdx = 24
  //   x -> 
  // y  0  1  2  3  4
  // ↓  5  6  7  8  9
  //   10 11 12 13 14
  //   15 16 17 18 19
  //   20 21 22 23 24
  export function plotLeds(aryIdx: Stat[]) {
    for (let i = 0; i < aryIdx.length; i++) {
      const x = i % 5
      const y = Math.floor(i / 5)
      const v = aryIdx[i];
      if (v == Stat.On) led.plot(x, y)
      else led.unplot(x, y)
    }
  }
  export function xyToIndex(x:number, y:number) {
    return y * 5 + x
  }
  /**
   * TODO: ここに関数を記述してください
   * @param n ここでパラメーターの説明をしてください。, eg: 5
   * @param s ここでパラメーターの説明をしてください。, eg: "Hello"
   * @param e ここでパラメーターの説明をしてください。
   */
  //% block
  // export function foo(n: number, s: string, e: MyEnum): void {
  //   // Add code here
  // }

  /**
   * TODO: ここに関数を記述してください
   * @param value ここで値の説明をしてください。, eg: 5
   */
  //% block
  // export function fib(value: number): number {
  //   return value <= 1 ? value : fib(value - 1) + fib(value - 2);
  // }
}
namespace MyPad {
  export enum Touched {
    On = 0,
    Off = 1,
  }

  export function readPadA() {
    return pins.digitalReadPin(DigitalPin.P16)
  }
  export function readPadB() {
    return pins.digitalReadPin(DigitalPin.P1)
  }
  export function readPadC() {
    return pins.digitalReadPin(DigitalPin.P12)
  }
  export function readPadD() {
    return pins.digitalReadPin(DigitalPin.P2)
  }

}