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

    //% block="all"
    All = 1000,
};


// IO state.
enum DigitalIoState {
    //% block="off"
    Off = 0,

    //% block="on"
    On = 1,
}



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
     * Turn on/off the LED (On = 1, Off = 0).
     * @param color LED color.
     * @param state LED state.
     */
    //% weight=20
    //% blockGap=8
    //% blockId=edubit_set_led
    //% block="set LED %color to %state"
    //% state.shadow=edubit_digital_state_picker
    export function setLed(color: LedColor, state: number): void {
        // Limit the number.
        state = edubit.limit(state, 0, 1);

        // Save the pin state.
        switch (color) {
            case LedColor.Red: ledState.red = state; break;
            case LedColor.Yellow: ledState.yellow = state; break;
            case LedColor.Green: ledState.green = state; break;

            case LedColor.All:
                ledState.red = state;
                ledState.yellow = state;
                ledState.green = state;
                break;
        }

        // Write to pin.
        pins.digitalWritePin(<number>LedColor.Red, ledState.red);
        pins.digitalWritePin(<number>LedColor.Yellow, ledState.yellow);
        pins.digitalWritePin(<number>LedColor.Green, ledState.green);
    }



    /**
     * Toggle the LED.
     * @param color LED color.
     */
    //% weight=19
    //% blockGap=8
    //% blockId=edubit_toggle_led
    //% block="Toggle LED %color"
    export function toggleLed(color: LedColor): void {
        // Toggle the state.
        let state = 0;
        switch (color) {
            case LedColor.Red: ledState.red ^= 1; break;
            case LedColor.Yellow: ledState.yellow ^= 1; break;
            case LedColor.Green: ledState.green ^= 1; break;

            case LedColor.All:
                ledState.red ^= 1;
                ledState.yellow ^= 1;
                ledState.green ^= 1;
                break;
        }

        // Write to pin.
        setLed(LedColor.Red, ledState.red);
        setLed(LedColor.Yellow, ledState.yellow);
        setLed(LedColor.Green, ledState.green);
    }



    /**
     * Get the digital IO state field editor.
     * @param state Digital IO state. eg: DigitalIoState.On
     */
    //% blockHidden=true
    //% colorSecondary="#ff8000"
    //% blockId="edubit_digital_state_picker"
    //% block="%state"
    export function digitalStatePicker(state: DigitalIoState): number {
        return <number>state;
    }
}
