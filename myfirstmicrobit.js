let imageC: Image = null
let imageA: Image = null
function showA2() {
    imageA.scrollImage(1, 200)
}
function dispB2() {
    led.plot(0, 0)
    led.plot(1, 0)
    led.plot(2, 0)
    led.plot(3, 0)
    led.plot(0, 1)
    led.plot(4, 1)
    led.plot(0, 2)
    led.plot(1, 2)
    led.plot(2, 2)
    led.plot(3, 2)
    led.plot(0, 3)
    led.plot(4, 3)
    led.plot(0, 4)
    led.plot(1, 4)
    led.plot(2, 4)
    led.plot(3, 4)
}
function dispA2() {
    led.plot(2, 0)
    led.plot(1, 1)
    led.plot(3, 1)
    led.plot(0, 2)
    led.plot(4, 2)
    led.plot(0, 3)
    led.plot(4, 3)
    led.plot(0, 4)
    led.plot(4, 4)
    led.plot(1, 3)
    led.plot(2, 3)
    led.plot(3, 3)
}
function dispC2() {
    led.plot(1, 0)
    led.plot(2, 0)
    led.plot(3, 0)
    led.plot(0, 1)
    led.plot(0, 2)
    led.plot(0, 3)
    led.plot(1, 4)
    led.plot(2, 4)
    led.plot(3, 4)
}
function dispD2() {
    led.plot(0, 0)
    led.plot(1, 0)
    led.plot(2, 0)
    led.plot(3, 0)
    led.plot(0, 1)
    led.plot(4, 1)
    led.plot(0, 2)
    led.plot(4, 2)
    led.plot(0, 3)
    led.plot(4, 3)
    led.plot(0, 4)
    led.plot(1, 4)
    led.plot(2, 4)
    led.plot(3, 4)
}
input.onButtonPressed(Button.A, function () {
    showC()
})
input.onButtonPressed(Button.B, function () {
    showA2()
})
function showC() {
    imageC.scrollImage(1, 200)
}
function clearLed2() {
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
imageA = images.createImage(`
    . # # . .
    # . . # .
    # . . # .
    # # # # .
    # . . # .
    `)
imageC = images.createImage(`
    . # # # .
    # . . . .
    # . . . .
    # . . . .
    . # # # .
    `)
basic.forever(function () {
	
})
