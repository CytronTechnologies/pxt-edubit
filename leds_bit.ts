/*******************************************************************************
 * Functions for edu:bit - LEDs Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Analog Input Pin.
enum LedPin {
    //% block="P13 (Green Default)"
    P13 = DigitalPin.P13,
    //% block="P14 (Red Default)"
    P14 = DigitalPin.P14,
    P0 = DigitalPin.P0,
    P1 = DigitalPin.P1,
    P2 = DigitalPin.P2,
    P8 = DigitalPin.P8,
    P12 = DigitalPin.P12,
    P15 = DigitalPin.P15,
    P16 = DigitalPin.P16,
};



/**
 * Blocks for LEDs Bit.
 */
//% weight=10 color=#ff8000 icon="\uf2db" block="LEDs Bit"
namespace edubit_leds {

    // State for each pin.
    let pinsState = {
        P0: 0,
        P1: 0,
        P2: 0,
        P8: 0,
        P12: 0,
        P13: 0,
        P14: 0,
        P15: 0,
        P16: 0
    };



    /**
     * Turn on/off the LED.
     * @param pin LED pin. eg: LedPin.P13
     * @param state LED state. eg: 0, 1
     */
    //% blockGap=8
    //% blockId=edubit_set_led
    //% block="Set LED %pin to %state"
    //% state.min=0 state.max=1
    export function setLed(pin: LedPin, state: number): void {
        // Save the pin state.
        switch (pin) {
            case LedPin.P0: pinsState.P0 = state; break;
            case LedPin.P1: pinsState.P1 = state; break;
            case LedPin.P2: pinsState.P2 = state; break;
            case LedPin.P8: pinsState.P8 = state; break;
            case LedPin.P12: pinsState.P12 = state; break;
            case LedPin.P13: pinsState.P13 = state; break;
            case LedPin.P14: pinsState.P14 = state; break;
            case LedPin.P15: pinsState.P15 = state; break;
            case LedPin.P16: pinsState.P16 = state; break;
        }

        // Write to pin.
        pins.digitalWritePin(<any>pin, state);
    }



    /**
     * Toggle the LED.
     * @param pin LED pin. eg: LedPin.P13
     */
    //% blockGap=8
    //% blockId=edubit_toggle_led
    //% block="Toggle LED %pin"
    export function toggleLed(pin: LedPin): void {
        // Read the pin state.
        let state = 0;
        switch (pin) {
            case LedPin.P0: state = pinsState.P0; break;
            case LedPin.P1: state = pinsState.P1; break;
            case LedPin.P2: state = pinsState.P2; break;
            case LedPin.P8: state = pinsState.P8; break;
            case LedPin.P12: state = pinsState.P12; break;
            case LedPin.P13: state = pinsState.P13; break;
            case LedPin.P14: state = pinsState.P14; break;
            case LedPin.P15: state = pinsState.P15; break;
            case LedPin.P16: state = pinsState.P16; break;
        }

        // Toggle the state and write to pin.
        state ^= 1;
        setLed(pin, state);
    }
}
