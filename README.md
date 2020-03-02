# EDU:BIT Extension for Microsoft MakeCode

This library provides the driver for [**EDU:BIT** EDU Training & Project Kit for micro:bit](https://www.cytron.io/micro:bit/p-edu-bit).<br />

## Music Bit

### ~ hint
Music Bit works with the default ``||Music||`` blocks that comes with MakeCode.
### ~

Play melody once at program start-up.

```blocks
music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
```

## Sound Bit

Showing sound level.

```blocks
basic.forever(function () {
    basic.showNumber(edubitSoundBit.readSoundSensor())
})
```

Showing sad face when it's too noisy.

```blocks
basic.forever(function () {
    if (edubitSoundBit.compareSoundSensor(SoundSensorCompareType.MoreThan, 512)) {
        basic.showIcon(IconNames.Sad)
    } else {
        basic.clearScreen()
    }
})
```

Counting claps.

```blocks
let count = 0
edubitSoundBit.onEvent(SoundSensorCompareType.MoreThan, 512, function () {
    count += 1
})
```
## Potentio Bit

Ploting graph to show the potentiometer value.

```blocks
basic.forever(function () {
    led.plotBarGraph(
    edubitPotentioBit.readPotValue(),
    1023
    )
})
```

Showing heart shape when the potentiometer is turned to the max.

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


## TODO

- [ ] Add a reference for your blocks here
- [ ] Add "icon.png" image (300x200) in the root folder
- [ ] Add "- beta" to the GitHub project description if you are still iterating it.
- [ ] Turn on your automated build on https://travis-ci.org
- [ ] Use "pxt bump" to create a tagged release on GitHub
- [ ] On GitHub, create a new file named LICENSE. Select the MIT License template.
- [ ] Get your package reviewed and approved https://makecode.microbit.org/extensions/approval

Read more at https://makecode.microbit.org/extensions

## Supported targets

* for PXT/microbit

