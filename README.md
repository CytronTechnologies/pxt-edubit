# EDU:BIT Extension for Microsoft MakeCode

This code provides the driver for [**EDU:BIT** Training & Project Kit for micro:bit](https://www.cytron.io/p-edubit). EDU:BIT works with **micro:bit V1 & V2**.
  
**EDU:BIT** is specially designed to encourage kids to explore STEAM and learn coding. It comes with a booklet covering 10+1 hands-on coding lessons, which have been creatively structured to introduce programming basics in a fun and engaging manner. Each chapter features a classic childhood game such as Rock Paper Scissors, Snakes and Ladders, Twister, and Simon Says. Follow the step-by-step guide to build the games and then have fun playing with your friends!  
  
![EDU:BIT](https://raw.githubusercontent.com/CytronTechnologies/pxt-edubit/master/icon.png)
  
## Educational Resources
Visit [EDU:BIT Resource Hub](https://sites.google.com/cytron.io/edubit-resource-hub/) if you need further assistance with EDU:BIT and its lessons.
  
  
## Adding the Extension in MakeCode Editor  
* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project** and give your project a meaningful name
* click on **Extensions** under the gearwheel :gear: menu
* search for '**edubit**' or "**https://github.com/cytrontechnologies/pxt-edubit**" 
* click on the edubit card to install the extension
  
  
# Examples  
## Music Bit
> Music Bit works with the default ``||Music||`` blocks that comes with MakeCode.
Play melody once at program start-up.
  
```blocks
music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
```
  
## Sound Bit
Show sound level.
  
```blocks
basic.forever(function () {
    basic.showNumber(edubitSoundBit.readSoundSensor())
})
```
  
Show sad face when it's too noisy.
  
```blocks
basic.forever(function () {
    if (edubitSoundBit.compareSoundSensor(SoundSensorCompareType.MoreThan, 512)) {
        basic.showIcon(IconNames.Sad)
    } else {
        basic.clearScreen()
    }
})
```
  
Count claps.
  
```blocks
let count = 0
edubitSoundBit.onEvent(SoundSensorCompareType.MoreThan, 512, function () {
    count += 1
})
```
  
## Potentio Bit
Plot graph to show the potentiometer value.
  
```blocks
basic.forever(function () {
    led.plotBarGraph(
    edubitPotentioBit.readPotValue(),
    1023
    )
})
```
  
Show heart shape when the potentiometer is turned to the max.
  
```blocks
basic.forever(function () {
    if (edubitPotentioBit.comparePot(PotCompareType.MoreThan, 1000)) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.clearScreen()
    }
})
```
  
Another way of showing heart shape when the potentiometer is turned to the max.
  
```blocks
edubitPotentioBit.onEvent(PotCompareType.MoreThan, 1000, function () {
    basic.showIcon(IconNames.Heart)
})
edubitPotentioBit.onEvent(PotCompareType.LessThan, 1000, function () {
    basic.clearScreen()
})
```
  
## IR Bit
Show the IR sensor state.
  
```blocks
basic.forever(function () {
    basic.showNumber(edubitIrBit.readIrSensor())
})
```
  
Show a target symbol when an object is detected.
  
```blocks
basic.forever(function () {
    if (true) {
        basic.showIcon(IconNames.Target)
    } else {
        basic.clearScreen()
    }
})
```
  
Play a melody everytime an object is detected.

```blocks
edubitIrBit.onIrSensorEvent(IrEventType.Rise, function () {
    music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
})
```
  
## RGB Bit
Clear all RGB pixels.
  
```blocks
edubitRgbBit.clear()
```
  
Show rainbow color on all RGB pixels and change the brightness to maximum.
  
```blocks
edubitRgbBit.showRainbow()
edubitRgbBit.setBrightness(255)
```
  
Show color green on all RGB pixels and change the color one by one to red.
  
```blocks
edubitRgbBit.showColor(0x00ff00)
basic.pause(1000)
edubitRgbBit.setPixelColor(0, 0xff0000)
basic.pause(500)
edubitRgbBit.setPixelColor(1, 0xff0000)
basic.pause(500)
edubitRgbBit.setPixelColor(2, 0xff0000)
basic.pause(500)
edubitRgbBit.setPixelColor(3, 0xff0000)
```
  
Show rainbow color and shift it out one by one.
  
```blocks
edubitRgbBit.showRainbow()
basic.pause(500)
edubitRgbBit.shiftPixels(1)
basic.pause(500)
edubitRgbBit.shiftPixels(1)
basic.pause(500)
edubitRgbBit.shiftPixels(1)
basic.pause(500)
edubitRgbBit.shiftPixels(1)
```
  
Show rainbow color and rotate it.
  
```blocks
edubitRgbBit.showRainbow()
basic.forever(function () {
    edubitRgbBit.rotatePixels(1)
    basic.pause(500)
})
```
  
## Traffic Light Bit
Blink the yellow LED.
  
```blocks
basic.forever(function () {
    edubitTrafficLightBit.toggleLed(LedColor.Yellow)
    basic.pause(500)
})
```
  
Show running light on the LEDs.
  
```blocks
basic.forever(function () {
    edubitTrafficLightBit.setLed(LedColor.Red, 1)
    edubitTrafficLightBit.setLed(LedColor.Yellow, 0)
    edubitTrafficLightBit.setLed(LedColor.Green, 0)
    basic.pause(200)
    edubitTrafficLightBit.setLed(LedColor.Red, 0)
    edubitTrafficLightBit.setLed(LedColor.Yellow, 1)
    edubitTrafficLightBit.setLed(LedColor.Green, 0)
    basic.pause(200)
    edubitTrafficLightBit.setLed(LedColor.Red, 0)
    edubitTrafficLightBit.setLed(LedColor.Yellow, 0)
    edubitTrafficLightBit.setLed(LedColor.Green, 1)
    basic.pause(200)
})
```
  
## Button Bit
> Button Bit is connected in parallel with micro:bit button A and B.
> It works with the default ``||Input||`` blocks that comes with MakeCode.
Play melody when button A is pressed.
  
```blocks
input.onButtonPressed(Button.A, function () {
    music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once)
})
```
  
### DC Motors
Run Motor 1 forward at 50% speed when button A is pressed, brake the motor when button B is pressed.
  
```blocks
input.onButtonPressed(Button.A, function () {
    edubitMotors.runMotor(MotorChannel.M1, MotorDirection.Forward, 127)
})
input.onButtonPressed(Button.B, function () {
    edubitMotors.brakeMotor(MotorChannel.M1)
})
```
  
### Servos
Button A pressed - Rotate Servo 1 to 0 degree.
Button B pressed - Rotate Servo 1 to 180 degree.
Button A+B pressed - Disable Servo 1. No pulse is sent to Servo 1 and it can be rotated by hand.
  
```blocks
input.onButtonPressed(Button.A, function () {
    edubitMotors.setServoPosition(ServoChannel.S1, 0)
})
input.onButtonPressed(Button.B, function () {
    edubitMotors.setServoPosition(ServoChannel.S1, 180)
})
input.onButtonPressed(Button.AB, function () {
    edubitMotors.disableServo(ServoChannel.S1)
})
```
  
  
## License
MIT  
  
  
## Supported targets
* for PXT/microbit  
  
  
> Open this page at [https://cytrontechnologies.github.io/pxt-edubit/](https://cytrontechnologies.github.io/pxt-edubit/)  
  
  
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>  
