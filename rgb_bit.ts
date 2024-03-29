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

// RGB Colors
enum RgbColors {
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xFF00FF,
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000
}



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
    //% weight=20
    //% blockGap=8
    //% blockId="edubit_clear_pixels"
    //% block="clear all RGB pixels"
    export function clear(): void {
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            colorsArray[i] = 0;
        }

        rgbBit.clear();
        rgbBit.show();
        basic.pause(0);
    }


    /**
     * Set the brightness of the RGB pixels (0-255).
     * @param brightness Pixel brightness. eg: 25
     */
    //% weight=19
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
    //% weight=18
    //% blockGap=8
    //% blockId="edubit_show_rainbow"
    //% block="show rainbow on RGB pixels"
    export function showRainbow(): void {
        colorsArray[0] = RgbColors.Red;
        colorsArray[1] = RgbColors.Yellow;
        colorsArray[2] = RgbColors.Green;
        colorsArray[3] = RgbColors.Indigo;

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
    //% weight=17
    //% blockGap=8
    //% blockId="edubit_show_color"
    //% block="set all RGB pixels to %color"
    //% color.shadow="colorNumberPicker"
    export function showColor(color: number): void {
        for (let i = 0; i < RGB_BIT_LENGTH; i++) {
            colorsArray[i] = color;
        }
        rgbBit.showColor(color);
        basic.pause(0);
    }


    /**
     * Show color on individual RGB pixel.
     * @param pixel The pixel number we want to change the color.
     * @param color RGB color of the pixel.
     */
    //% weight=16
    //% blockGap=40
    //% blockId="edubit_set_pixel_color"
    //% block="set RGB pixel %pixel to %color"
    //% color.shadow="colorNumberPicker"
    //% pixel.min=0 pixel.max=3
    export function setPixelColor(pixel: number, color: number): void {
        colorsArray[pixel] = color;
        rgbBit.setPixelColor(pixel, color);
        rgbBit.show();
        basic.pause(0);
    }


    /**
     * Shift the color of RGB pixels (-3 to 3).
     * @param offset Number of pixels to shift. eg: 1
     */
    //% weight=15
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
     * @param offset Number of pixels to rotate. eg: 1
     */
    //% weight=14
    //% blockGap=50
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


    /**
     * Return the RGB value of a known color.
    */
    //% weight=13
    //% blockGap=8
    //% blockId="edubit_colors"
    //% block="%color"
    export function colors(color: RgbColors): number {
        return <number>color;
    }


    /**
     * Converts red, green, blue channels into a RGB color.
     * @param red Value of the red channel (0 - 255). eg: 255
     * @param green Value of the green channel (0 - 255). eg: 255
     * @param blue Value of the blue channel (0 - 255). eg: 255
     */
    //% weight=12
    //% blockGap=30
    //% blockId="edubit_rgb_value"
    //% block="red %red green %green blue %blue"
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    export function rgb(red: number, green: number, blue: number): number {
        // Limit the value.
        red = edubit.limit(red, 0, 255);
        green = edubit.limit(green, 0, 255);
        blue = edubit.limit(blue, 0, 255);

        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }


    /** 
     * Helper to converts hexadecimal to integer.
    */
    function convert_hex_to_int(hex_color: string): number {
        return parseInt(hex_color, 16)
    }
    

    /** 
     * Converts hexadecimal string to color format.
     * @param color Hex value (0x000000 - 0xFFFFFF). eg: "FFFFFF"
    */
    //% weight=11
    //% blockGap=8
    //% blockId="edubit_colors_hex"
    //% block="#|%color"
    //% advanced=true
    export function colors_hex(color: string): number {
        if (color.length == 6) {
            return edubit.limit(convert_hex_to_int(color), 0, 16777215)
        }
        return 0x000000
    }


    /** 
     * Converts red, green, blue channels in hexadecimal into RGB color.
     * @param red Hex value of the red channel (0x00 - 0xFF). eg: "FF"
     * @param green Hex value of the green channel (0x00 - 0xFF). eg: "FF"
     * @param blue Hex value of the blue channel (0x00 - 0xFF). eg: "FF"
    */
    //% weight=10
    //% blockGap=50
    //% blockId="edubit_rgb_value_hex"
    //% block="red %red green %green blue %blue"
    //% advanced=true
    export function rgb_hex(red: string, green: string, blue: string): number {
        return edubitRgbBit.rgb(convert_hex_to_int(red), convert_hex_to_int(green), convert_hex_to_int(blue))
    }
}
