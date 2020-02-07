const COLOR_BIT_LENGTH = 4;

/**
 * Blocks for Color Bit.
 */
//% weight=11 color=#ff8000 icon="\uf2db" block="Color Bit"
namespace edubit_color {
    // Showing rainbow color?
    let isRainbow = false;

    // Colors array for each LED.
    let colorsArray: number[] = [];
    for (let i = 0; i < COLOR_BIT_LENGTH; i++) {
        colorsArray.push(0);
    }

    // Create a Neo Pixel object for Color Bit.
    let colorBit = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB);
    colorBit.clear();

    // Reduce the default brightness.
    colorBit.setBrightness(25);



    /**
     * Shows the same color on all LEDs. 
     * @param color RGB color of the LED. eg: NeoPixelColors.Red
     */
    //% blockGap=8
    //% blockId="edubit_colorbit_show_color"
    //% block="ColorBit show color %rgb"
    export function showColor(color: NeoPixelColors): void {
        isRainbow = false;
        for (let i = 0; i < COLOR_BIT_LENGTH; i++) {
            colorsArray[i] = <number>color;
        }
        colorBit.showColor(<number>color);
    }


    /**
     * Shows a rainbow pattern on all LEDs.
     */
    //% blockGap=8
    //% blockId="edubit_colorbit_show_rainbow"
    //% block="ColorBit show rainbow"
    export function showRainbow(): void {
        isRainbow = true;
        colorBit.showRainbow(1, 360 / COLOR_BIT_LENGTH * (COLOR_BIT_LENGTH - 1));
    }


    /**
     * Set the brightness of the Color Bit (0-255).
     * @param brightness LED brightness. eg: 50, 100
     */
    //% blockGap=8
    //% blockId="edubit_colorbit_set_brightness"
    //% block="ColorBit set brightness %brightness"
    //% brightness.min=0 brightness.max=255
    export function setBrightness(brightness: number): void {
        colorBit.setBrightness(brightness);

        // Restore the original color.
        if (isRainbow) {
            colorBit.showRainbow(1, 360 / COLOR_BIT_LENGTH * (COLOR_BIT_LENGTH - 1));
        }
        else {
            for (let i = 0; i < COLOR_BIT_LENGTH; i++) {
                colorBit.setPixelColor(i, colorsArray[i]);
            }
            colorBit.show();
        }
    }
}

