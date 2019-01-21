
/**
 * このファイルを使って、独自の関数やブロックを定義してください。
 * 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
 */

enum MyEnum {
  //% block="one"
  One,
  //% block="two"
  Two
}

/**
 * カスタムブロック
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {
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




  /**
   * TODO: ここに関数を記述してください
   * @param n ここでパラメーターの説明をしてください。, eg: 5
   * @param s ここでパラメーターの説明をしてください。, eg: "Hello"
   * @param e ここでパラメーターの説明をしてください。
   */
  //% block
  export function foo(n: number, s: string, e: MyEnum): void {
    // Add code here
  }

  /**
   * TODO: ここに関数を記述してください
   * @param value ここで値の説明をしてください。, eg: 5
   */
  //% block
  export function fib(value: number): number {
    return value <= 1 ? value : fib(value - 1) + fib(value - 2);
  }
}
