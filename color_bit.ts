/**
 * Blocks for edu:bit NeoPixel Bit.
 */
//% weight=11 color=#ff8000 icon="\uf2db" block="NeoPixel (edu:bit)"
namespace edubit_neopixel {
    /**
     * Create a new NeoPixel driver for edu:bit
     *
    //% blockGap=8
    //% blockId="edubit_create_neopixel"
    //% block="edu:bit NeoPixel"
    export function createEdubitNeoPixel(): neopixel.Strip {
        let strip = new neopixel.Strip();
        let stride = 3;
        strip.buf = pins.createBuffer(4 * stride);
        strip.start = 0;
        strip._length = 4;
        strip._mode = NeoPixelMode.RGB;
        strip._matrixWidth = 0;
        strip.setBrightness(64);
        strip.setPin(DigitalPin.P15);
        return strip;
    }
*/

    let edubitNeoPixel = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB);

    /**
     * Shows a color on all LEDs. 
     * @param rgb RGB color of the LED
     */
    //% blockGap=8
    //% blockId="edubit_neopixel_show_color"
    //% block="NeoPixel show color %rgb=neopixel_colors"
    export function showColor(rgb: number): void {
        edubitNeoPixel.showColor(rgb);
    }
}

