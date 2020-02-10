/*******************************************************************************
 * Functions for edu:bit - Color Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Possible pins for Color Bit.
enum ColorBitPin {
    //% block="P15 (Default)"
    P15 = DigitalPin.P15,
    P0 = DigitalPin.P0,
    P1 = DigitalPin.P1,
    P2 = DigitalPin.P2,
    P8 = DigitalPin.P8,
    P12 = DigitalPin.P12,
    P13 = DigitalPin.P13,
    P14 = DigitalPin.P14,
    P16 = DigitalPin.P16,
};

// Number of LEDs in Color Bit.
const COLOR_BIT_LENGTH = 4;



/**
 * Blocks for Color Bit.
 */
//% weight=11 color=#ff8000 icon="\uf2db" block="Color Bit"
namespace edubit_color {
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
     * Turn off all LEDs. 
     * @param pin Pin number for Color Bit. eg: ColorBitPin.P15
     */
    //% blockGap=30
    //% blockId="edubit_colorbit_clear"
    //% block="Clear ColorBit || at pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function clear(pin: ColorBitPin = ColorBitPin.P15): void {
        colorBit.setPin(<number>pin);
        colorBit.clear();
        basic.pause(0);
    }


    /**
     * Show a rainbow pattern on all LEDs.
     * @param pin Pin number for Color Bit. eg: ColorBitPin.P15
     */
    //% blockGap=8
    //% blockId="edubit_colorbit_show_rainbow"
    //% block="Show rainbow on ColorBit || at pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function showRainbow(pin: ColorBitPin = ColorBitPin.P15): void {
        colorsArray[0] = NeoPixelColors.Red;
        colorsArray[1] = NeoPixelColors.Yellow;
        colorsArray[2] = NeoPixelColors.Green;
        colorsArray[3] = NeoPixelColors.Indigo;

        colorBit.setPin(<number>pin);

        for (let i = 0; i < COLOR_BIT_LENGTH; i++) {
            colorBit.setPixelColor(i, colorsArray[i]);
        }

        colorBit.show();
        basic.pause(0);
    }


    /**
     * Show the same color on all LEDs. 
     * @param color RGB color of the LED. eg: NeoPixelColors.Red
     * @param pin Pin number for Color Bit. eg: ColorBitPin.P15
     */
    //% blockGap=8
    //% blockId="edubit_colorbit_show_color"
    //% block="Set all ColorBit LEDs to %color || at pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function showColor(color: NeoPixelColors, pin: ColorBitPin = ColorBitPin.P15): void {
        colorBit.setPin(<number>pin);
        for (let i = 0; i < COLOR_BIT_LENGTH; i++) {
            colorsArray[i] = <number>color;
        }
        colorBit.showColor(<number>color);
        basic.pause(0);
    }


    /**
     * Show color on individual LED.
     * @param pixel The LED number we want to change the color. eg: 0, 1
     * @param color RGB color of the LED. eg: NeoPixelColors.Red
     * @param pin Pin number for Color Bit. eg: ColorBitPin.P15
     */
    //% blockGap=30
    //% blockId="edubit_colorbit_set_pixel_color"
    //% block="Set ColorBit LED %pixel to %color || at pin %pin"
    //% pixel.min=0 pixel.max=3
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function setPixelColor(pixel: number, color: NeoPixelColors, pin: ColorBitPin = ColorBitPin.P15): void {
        colorBit.setPin(<number>pin);
        colorsArray[pixel] = <number>color;
        colorBit.setPixelColor(pixel, <number>color);
        colorBit.show();
        basic.pause(0);
    }


    /**
     * Set the brightness of the Color Bit (0-255).
     * @param brightness LED brightness. eg: 25, 50, 100
     * @param pin Pin number for Color Bit. eg: ColorBitPin.P15
     */
    //% blockGap=8
    //% blockId="edubit_colorbit_set_brightness"
    //% block="Set ColorBit brightness to %brightness || at pin %pin"
    //% brightness.min=0 brightness.max=255
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function setBrightness(brightness: number, pin: ColorBitPin = ColorBitPin.P15): void {
        colorBit.setPin(<number>pin);
        colorBit.setBrightness(brightness);

        // Restore the original color if that pixel is not rainbow color.
        for (let i = 0; i < COLOR_BIT_LENGTH; i++) {
            colorBit.setPixelColor(i, colorsArray[i]);
        }

        colorBit.show();
        basic.pause(0);
    }
}

