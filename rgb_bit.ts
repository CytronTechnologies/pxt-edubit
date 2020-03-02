/*******************************************************************************
 * Functions for edu:bit - RGB Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Default pin.
const RGB_BIT_PIN = DigitalPin.P13;

// Number of LEDs in RGB Bit.
const RGB_BIT_LENGTH = 4;



/**
 * Blocks for RGB Bit.
 */
//% weight=12 color=#ff8000 icon="\uf110" block="RGB Bit"
namespace edubitRgbBit {
    // Colors array for each pixel.
    let colorsArray: number[] = [];
    for (let i = 0; i < RGB_BIT_LENGTH; i++) {
        colorsArray.push(0);
    }

    // Create a Neo Pixel object for RGB Bit.
    let rgbBit = neopixel.create(RGB_BIT_PIN, 4, NeoPixelMode.RGB);
    rgbBit.clear();

    // Reduce the default brightness.
    rgbBit.setBrightness(25);



    /**
     * Turn off all RGB pixels.
     */
    //% blockGap=8
    //% blockId="edubit_clear_pixels"
    //% block="clear all RGB pixels"
    export function clear(): void {
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            colorsArray[i] = 0;
        }

        rgbBit.clear();
        basic.pause(0);
    }


    /**
     * Set the brightness of the RGB pixels (0-255).
     * @param brightness Pixel brightness. eg: 25
     */
    //% blockGap=40
    //% blockId="edubit_set_brightness"
    //% block="set RGB pixels brightness to %brightness"
    //% brightness.min=0 brightness.max=255
    export function setBrightness(brightness: number): void {
        rgbBit.setBrightness(brightness);

        // Restore the original color.
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            rgbBit.setPixelColor(i, colorsArray[i]);
        }
        rgbBit.show();
        basic.pause(0);
    }


    /**
     * Show a rainbow pattern on all RGB pixels.
     */
    //% blockGap=8
    //% blockId="edubit_show_rainbow"
    //% block="show rainbow on RGB pixels"
    export function showRainbow(): void {
        colorsArray[0] = NeoPixelColors.Red;
        colorsArray[1] = NeoPixelColors.Yellow;
        colorsArray[2] = NeoPixelColors.Green;
        colorsArray[3] = NeoPixelColors.Indigo;

        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            rgbBit.setPixelColor(i, colorsArray[i]);
        }

        rgbBit.show();
        basic.pause(0);
    }


    /**
     * Show the same color on all RGB pixels. 
     * @param color RGB color of the pixel.
     */
    //% blockGap=8
    //% blockId="edubit_show_color"
    //% block="set all RGB pixels to %color"
    export function showColor(color: NeoPixelColors): void {
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            colorsArray[i] = <number>color;
        }
        rgbBit.showColor(<number>color);
        basic.pause(0);
    }


    /**
     * Show color on individual RGB pixel.
     * @param pixel The pixel number we want to change the color.
     * @param color RGB color of the pixel.
     */
    //% blockGap=40
    //% blockId="edubit_set_pixel_color"
    //% block="set RGB pixel %pixel to %color"
    //% pixel.min=0 pixel.max=3
    export function setPixelColor(pixel: number, color: NeoPixelColors): void {
        colorsArray[pixel] = <number>color;
        rgbBit.setPixelColor(pixel, <number>color);
        rgbBit.show();
        basic.pause(0);
    }


    /**
     * Shift the color of RGB pixels (-3 to 3).
     * @param offset Number of pixels to shift.
     */
    //% blockGap=8
    //% blockId="edubit_shift_pixels"
    //% block="shift RGB pixels color by %offset"
    //% offset.min=-3 offset.max=3
    export function shiftPixels(offset: number): void {
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


        // Show the new color.
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            rgbBit.setPixelColor(i, colorsArray[i]);
        }
        rgbBit.show();
        basic.pause(0);
    }


    /**
     * Rotate the color of RGB pixels(-3 to 3).
     * @param offset Number of pixels to rotate.
     */
    //% blockGap=30
    //% blockId="edubit_rotate_pixels"
    //% block="rotate RGB pixels color by %offset"
    //% offset.min=-3 offset.max=3
    export function rotatePixels(offset: number): void {
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


        // Show the new color.
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            rgbBit.setPixelColor(i, colorsArray[i]);
        }
        rgbBit.show();
        basic.pause(0);
    }

}

