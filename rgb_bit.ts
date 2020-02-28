/*******************************************************************************
 * Functions for edu:bit - RGB Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Possible pins for RGB Bit.
enum RgbBitPin {
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

// Number of LEDs in RGB Bit.
const RGB_BIT_LENGTH = 4;



/**
 * Blocks for RGB Bit.
 */
//% weight=12 color=#ff8000 icon="\uf110" block="RGB Bit"
namespace edubit_rgb_bit {
    // Colors array for each pixel.
    let colorsArray: number[] = [];
    for (let i = 0; i < RGB_BIT_LENGTH; i++) {
        colorsArray.push(0);
    }

    // Create a Neo Pixel object for RGB Bit.
    let rgbBit = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB);
    rgbBit.clear();

    // Reduce the default brightness.
    rgbBit.setBrightness(25);



    /**
     * Turn off all LEDs. 
     * @param pin Pin number for RGB Bit. eg: RgbBitPin.P15
     */
    //% blockGap=30
    //% blockId="edubit_rgbbit_clear"
    //% block="Clear RGB Bit || at pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function clear(pin: RgbBitPin = RgbBitPin.P15): void {
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            colorsArray[i] = 0;
        }

        rgbBit.setPin(<number>pin);
        rgbBit.clear();
        basic.pause(0);
    }


    /**
     * Show a rainbow pattern on all LEDs.
     * @param pin Pin number for RGB Bit. eg: RgbBitPin.P15
     */
    //% blockGap=8
    //% blockId="edubit_rgbbit_show_rainbow"
    //% block="Show rainbow on RGB Bit || at pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function showRainbow(pin: RgbBitPin = RgbBitPin.P15): void {
        colorsArray[0] = NeoPixelColors.Red;
        colorsArray[1] = NeoPixelColors.Yellow;
        colorsArray[2] = NeoPixelColors.Green;
        colorsArray[3] = NeoPixelColors.Indigo;

        rgbBit.setPin(<number>pin);
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            rgbBit.setPixelColor(i, colorsArray[i]);
        }

        rgbBit.show();
        basic.pause(0);
    }


    /**
     * Show the same color on all pixels. 
     * @param color RGB color of the pixel. eg: NeoPixelColors.Red
     * @param pin Pin number for RGB Bit. eg: RgbBitPin.P15
     */
    //% blockGap=8
    //% blockId="edubit_rgbbit_show_color"
    //% block="Set all RGB Bit pixels to %color || at pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function showColor(color: NeoPixelColors, pin: RgbBitPin = RgbBitPin.P15): void {
        rgbBit.setPin(<number>pin);
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            colorsArray[i] = <number>color;
        }
        rgbBit.showColor(<number>color);
        basic.pause(0);
    }


    /**
     * Show color on individual pixel.
     * @param pixel The pixel number we want to change the color. eg: 0, 1
     * @param color RGB color of the pixel. eg: NeoPixelColors.Red
     * @param pin Pin number for RGB Bit. eg: RgbBitPin.P15
     */
    //% blockGap=30
    //% blockId="edubit_rgbbit_set_pixel_color"
    //% block="Set RGB Bit pixel %pixel to %color || at pin %pin"
    //% pixel.min=0 pixel.max=3
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function setPixelColor(pixel: number, color: NeoPixelColors, pin: RgbBitPin = RgbBitPin.P15): void {
        rgbBit.setPin(<number>pin);
        colorsArray[pixel] = <number>color;
        rgbBit.setPixelColor(pixel, <number>color);
        rgbBit.show();
        basic.pause(0);
    }


    /**
     * Shift the pixels on RGB Bit (-3 to 3).
     * @param offset Number of pixels to shift. eg: 1
     * @param pin Pin number for RGB Bit. eg: RgbBitPin.P15
     */
    //% blockGap=8
    //% blockId="edubit_rgbbit_shift_pixels"
    //% block="Shift RGB Bit pixels by %offset || at pin %pin"
    //% offset.min=-3 offset.max=3
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function shiftPixels(offset: number, pin: RgbBitPin = RgbBitPin.P15): void {
        // Do nothing if offset is 0.
        if (offset == 0) {
            return;
        }

        // Shift forward.
        else if (offset > 0) {
            while (offset-- > 0) {
                for (let i = RGB_BIT_LENGTH - 1; i > 0; i--) {
                    colorsArray[i] = colorsArray[i - 1];
                }
                colorsArray[0] = 0;
            }
        }

        // Shift backward.
        else {
            offset = -offset;
            while (offset-- > 0) {
                for (let i = 0; i < RGB_BIT_LENGTH - 1; i++) {
                    colorsArray[i] = colorsArray[i + 1];
                }
                colorsArray[RGB_BIT_LENGTH - 1] = 0;
            }
        }


        rgbBit.setPin(<number>pin);

        // Show the new color.
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            rgbBit.setPixelColor(i, colorsArray[i]);
        }
        rgbBit.show();
        basic.pause(0);
    }


    /**
     * Rotate the pixels on RGB Bit (-3 to 3).
     * @param offset Number of pixels to rotate. eg: 1
     * @param pin Pin number for RGB Bit. eg: RgbBitPin.P15
     */
    //% blockGap=30
    //% blockId="edubit_rgbbit_rotate_pixels"
    //% block="Rotate RGB Bit pixels by %offset || at pin %pin"
    //% offset.min=-3 offset.max=3
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function rotatePixels(offset: number, pin: RgbBitPin = RgbBitPin.P15): void {
        // Do nothing if offset is 0.
        if (offset == 0) {
            return;
        }

        // Rotate forward.
        else if (offset > 0) {
            while (offset-- > 0) {
                let lastLed = colorsArray[RGB_BIT_LENGTH - 1];
                for (let i = RGB_BIT_LENGTH - 1; i > 0; i--) {
                    colorsArray[i] = colorsArray[i - 1];
                }
                colorsArray[0] = lastLed;
            }
        }

        // Rotate backward.
        else {
            offset = -offset;
            while (offset-- > 0) {
                let lastLed = colorsArray[0];
                for (let i = 0; i < RGB_BIT_LENGTH - 1; i++) {
                    colorsArray[i] = colorsArray[i + 1];
                }
                colorsArray[RGB_BIT_LENGTH - 1] = lastLed;
            }
        }


        rgbBit.setPin(<number>pin);

        // Show the new color.
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            rgbBit.setPixelColor(i, colorsArray[i]);
        }
        rgbBit.show();
        basic.pause(0);
    }


    /**
     * Set the brightness of the RGB Bit (0-255).
     * @param brightness pixel brightness. eg: 25, 50, 100
     * @param pin Pin number for RGB Bit. eg: RgbBitPin.P15
     */
    //% blockGap=8
    //% blockId="edubit_rgbbit_set_brightness"
    //% block="Set RGB Bit brightness to %brightness || at pin %pin"
    //% brightness.min=0 brightness.max=255
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function setBrightness(brightness: number, pin: RgbBitPin = RgbBitPin.P15): void {
        rgbBit.setPin(<number>pin);
        rgbBit.setBrightness(brightness);

        // Restore the original color.
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            rgbBit.setPixelColor(i, colorsArray[i]);
        }
        rgbBit.show();
        basic.pause(0);
    }
}

