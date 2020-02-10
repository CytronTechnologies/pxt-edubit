/*******************************************************************************
 * Functions for edu:bit output.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Possible pins for output.
enum OutputPin {
    //% block="LED - Green"
    GREEN_LED = DigitalPin.P13,
    //% block="LED - Red"
    RED_LED = DigitalPin.P14,
    P0 = DigitalPin.P0,
    P1 = DigitalPin.P1,
    P2 = DigitalPin.P2,
    P8 = DigitalPin.P8,
    P12 = DigitalPin.P12,
    P13 = DigitalPin.P13,
    P14 = DigitalPin.P14,
    P15 = DigitalPin.P15,
    P16 = DigitalPin.P16,
};



/**
 * Blocks for output.
 */
//% weight=20 color=#ff8000 icon="\uf2db" block="Output"
namespace edubit_output {

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
     * Set the output state.
     * @param pin Output pin. eg: OutputPin.GREEN_LED
     * @param state Output state. eg: 0, 1
     */
    //% blockGap=8
    //% blockId=edubit_set_output
    //% block="Set output %pin to %state"
    //% state.min=0 state.max=1
    export function setOutput(pin: OutputPin, state: number): void {
        // Save the pin state.
        switch (<number>pin) {
            case <number>DigitalPin.P0: pinsState.P0 = state; break;
            case <number>DigitalPin.P1: pinsState.P1 = state; break;
            case <number>DigitalPin.P2: pinsState.P2 = state; break;
            case <number>DigitalPin.P8: pinsState.P8 = state; break;
            case <number>DigitalPin.P12: pinsState.P12 = state; break;
            case <number>DigitalPin.P13: pinsState.P13 = state; break;
            case <number>DigitalPin.P14: pinsState.P14 = state; break;
            case <number>DigitalPin.P15: pinsState.P15 = state; break;
            case <number>DigitalPin.P16: pinsState.P16 = state; break;
        }

        // Write to pin.
        pins.digitalWritePin(<number>pin, state);
    }


    /**
     * Toggle the output.
     * @param pin Output pin. eg: OutputPin.GREEN_LED
     */
    //% blockGap=30
    //% blockId=edubit_toggle_output
    //% block="Toggle output %pin"
    export function toggleOutput(pin: OutputPin): void {
        // Read the pin state.
        let state = 0;
        switch (<number>pin) {
            case <number>DigitalPin.P0: state = pinsState.P0; break;
            case <number>DigitalPin.P1: state = pinsState.P1; break;
            case <number>DigitalPin.P2: state = pinsState.P2; break;
            case <number>DigitalPin.P8: state = pinsState.P8; break;
            case <number>DigitalPin.P12: state = pinsState.P12; break;
            case <number>DigitalPin.P13: state = pinsState.P13; break;
            case <number>DigitalPin.P14: state = pinsState.P14; break;
            case <number>DigitalPin.P15: state = pinsState.P15; break;
            case <number>DigitalPin.P16: state = pinsState.P16; break;
        }

        // Toggle the state and write to pin.
        state ^= 1;
        setOutput(<number>pin, state);
    }


    /**
    * Return output state (0 or 1).
    * @param pin Output pin. eg: OutputPin.GREEN_LED
    */
    //% blockGap=8
    //% blockId=edubit_read_output
    //% block="Read output %pin"
    export function readOutput(pin: OutputPin): number {
        let state = 0;
        switch (<number>pin) {
            case <number>DigitalPin.P0: state = pinsState.P0; break;
            case <number>DigitalPin.P1: state = pinsState.P1; break;
            case <number>DigitalPin.P2: state = pinsState.P2; break;
            case <number>DigitalPin.P8: state = pinsState.P8; break;
            case <number>DigitalPin.P12: state = pinsState.P12; break;
            case <number>DigitalPin.P13: state = pinsState.P13; break;
            case <number>DigitalPin.P14: state = pinsState.P14; break;
            case <number>DigitalPin.P15: state = pinsState.P15; break;
            case <number>DigitalPin.P16: state = pinsState.P16; break;
        }
        return state;
    }
}

