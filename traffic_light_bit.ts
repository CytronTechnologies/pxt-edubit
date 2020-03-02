/*******************************************************************************
 * Functions for edu:bit - Traffic Light Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Color for traffic light LED.
enum LedColor {
    //% block="red"
    Red = DigitalPin.P14,

    //% block="yellow"
    Yellow = DigitalPin.P15,

    //% block="green"
    Green = DigitalPin.P16,
};



/**
 * Blocks for Traffic Light Bit.
 */
//% weight=11 color=#ff8000 icon="\uf0eb" block="Traffic Light Bit"
namespace edubitTrafficLightBit {

    // State for each pin.
    let ledState = {
        red: 0,
        yellow: 0,
        green: 0
    };



    /**
     * Turn on/off the LED.
     * @param color LED color.
     * @param state LED state.
     */
    //% blockGap=8
    //% blockId=edubit_set_led
    //% block="set LED %color to %state"
    //% state.min=0 state.max=1
    export function setLed(color: LedColor, state: number): void {
        // Save the pin state.
        switch (color) {
            case LedColor.Red:    ledState.red = state;    break;
            case LedColor.Yellow: ledState.yellow = state; break;
            case LedColor.Green:  ledState.green = state;  break;
        }

        // Write to pin.
        pins.digitalWritePin(<number>color, state);
    }



    /**
     * Toggle the LED.
     * @param color LED color.
     */
    //% blockGap=8
    //% blockId=edubit_toggle_led
    //% block="Toggle LED %color"
    export function toggleLed(color: LedColor): void {
        // Read the pin state.
        let state = 0;
        switch (color) {
            case LedColor.Red:    state = ledState.red;    break;
            case LedColor.Yellow: state = ledState.yellow; break;
            case LedColor.Green:  state = ledState.green;  break;
        }

        // Toggle the state and write to pin.
        state ^= 1;
        setLed(color, state);
    }
}
