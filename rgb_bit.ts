/*******************************************************************************
 * Functions for edu:bit - RGB Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Possible pins for RGB Bit.
enum RgbBitPin {
    //% block="P13*"
    P13 = DigitalPin.P13,
    P0 = DigitalPin.P0,
    P1 = DigitalPin.P1,
    P2 = DigitalPin.P2,
    P8 = DigitalPin.P8,
    P12 = DigitalPin.P12,
    P14 = DigitalPin.P14,
    P15 = DigitalPin.P15,
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
     * Turn off all pixels. 
     * @param pin Pin number for RGB Bit.
     */
    //% blockGap=30
    //% blockId="edubit_rgbbit_clear"
    //% block="clear all pixels on %pin"
    export function clear(pin: RgbBitPin): void {
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            colorsArray[i] = 0;
        }

        rgbBit.setPin(<number>pin);
        rgbBit.clear();
        basic.pause(0);
    }


    /**
     * Show a rainbow pattern on all pixels.
     * @param pin Pin number for RGB Bit.
     */
    //% blockGap=8
    //% blockId="edubit_rgbbit_show_rainbow"
    //% block="show rainbow colors on %pin"
    export function showRainbow(pin: RgbBitPin): void {
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
     * @param color RGB color of the pixel.
     * @param pin Pin number for RGB Bit.
     */
    //% blockGap=8
    //% blockId="edubit_rgbbit_show_color"
    //% block="set all pixels on %pin to %color"
    export function showColor(pin: RgbBitPin, color: NeoPixelColors): void {
        rgbBit.setPin(<number>pin);
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            colorsArray[i] = <number>color;
        }
        rgbBit.showColor(<number>color);
        basic.pause(0);
    }


    /**
     * Show color on individual pixel.
     * @param pixel The pixel number we want to change the color.
     * @param color RGB color of the pixel.
     * @param pin Pin number for RGB Bit.
     */
    //% blockGap=30
    //% blockId="edubit_rgbbit_set_pixel_color"
    //% block="set pixel %pixel on %pin to %color"
    //% pixel.min=0 pixel.max=3
    export function setPixelColor(pixel: number, pin: RgbBitPin, color: NeoPixelColors): void {
        rgbBit.setPin(<number>pin);
        colorsArray[pixel] = <number>color;
        rgbBit.setPixelColor(pixel, <number>color);
        rgbBit.show();
        basic.pause(0);
    }


    /**
     * Shift the pixels on RGB Bit (-3 to 3).
     * @param offset Number of pixels to shift.
     * @param pin Pin number for RGB Bit.
     */
    //% blockGap=8
    //% blockId="edubit_rgbbit_shift_pixels"
    //% block="shift pixels on %pin by %offset"
    //% offset.min=-3 offset.max=3
    export function shiftPixels(pin: RgbBitPin, offset: number): void {
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
     * @param offset Number of pixels to rotate.
     * @param pin Pin number for RGB Bit.
     */
    //% blockGap=30
    //% blockId="edubit_rgbbit_rotate_pixels"
    //% block="rotate pixels on %pin by %offset"
    //% offset.min=-3 offset.max=3
    export function rotatePixels(pin: RgbBitPin, offset: number): void {
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
     * @param brightness pixel brightness. eg: 25
     * @param pin Pin number for RGB Bit.
     */
    //% blockGap=8
    //% blockId="edubit_rgbbit_set_brightness"
    //% block="set brightness on %pin to %brightness"
    //% brightness.min=0 brightness.max=255
    export function setBrightness(pin: RgbBitPin, brightness: number): void {
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

