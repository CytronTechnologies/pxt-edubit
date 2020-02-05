/*******************************************************************************
 * Functions for edu:bit - Potentiometer Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Analog Input Pin.
enum PotPin {
    //% block="P1 (Default)"
    P1 = AnalogPin.P1,
    P0 = AnalogPin.P0,
    P2 = AnalogPin.P2
}

/**
 * Blocks for Potentiometer Bit.
 */
//% weight=10 color=#ff8000 icon="\uf2db" block="Potentiometer Bit"
namespace edubit_pot {

    /**
     * Read potentiometer value (0-1023).
     * @param pin Pin number for potentiometer. eg: PotPin.P1
     */
    //% blockGap=8
    //% blockId=edubit_read_pot_value
    //% block="Read potentiometer value (0-1023) || at pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    export function readPotValue(pin: PotPin = PotPin.P1): number {
        return pins.analogReadPin(<any>pin);
    }


    /**
     * Read potentiometer voltage in millivolts (0-3300).
     * @param pin Pin number for potentiometer. eg: PotPin.P1
     */
    //% blockGap=8
    //% blockId=edubit_read_pot_voltage
    //% block="Read potentiometer voltage (millivolts) || at pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    export function readPotVoltage(pin: PotPin = PotPin.P1): number {
        let raw = pins.analogReadPin(<any>pin);
        let mv = raw * 3300 / 1023;
        return mv;
    }
}
