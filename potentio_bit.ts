/*******************************************************************************
 * Functions for edu:bit - Potentio Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Possible pins for Potentio Bit.
enum PotentioBitPin {
    //% block="P2*"
    P2 = AnalogPin.P2,
    P0 = AnalogPin.P0,
    P1 = AnalogPin.P1,
};

// Comparison type.
enum PotCompareType {
    //% block=">"
    MoreThan = 0,

    //% block="<"
    LessThan = 1
};



/**
 * Blocks for Potentio Bit.
 */
//% weight=14 color=#ff8000 icon="\uf01e" block="Potentio Bit"
namespace edubit_potentio_bit {
    // Indicate whether background function has been created.
    let bgFunctionCreated = false;

    // Event type.
    let eventType = 0;

    // Array for compare type, threshold and pin number.
    let compareTypesArray: PotCompareType[] = [];
    let thresholdsArray: number[] = [];
    let pinsArray: PotentioBitPin[] = [];

    // Array for old compare result.
    let oldCompareResult: boolean[] = [];



    /**
     * Return potentiometer value (0-1023).
     * @param pin Pin number for potentiometer.
     */
    //% blockGap=8
    //% blockId=edubit_read_pot_value
    //% block="potentiometer value %pin"
    export function readPotValue(pin: PotentioBitPin): number {
        return pins.analogReadPin(<number>pin);
    }


    /**
    * Compare the potentiometer value (0-1023) with a number and return the result (true/false).
    * @param pin Pin number for potentiometer.
    * @param compareType More than or less than.
    * @param threshold The value to compare with.
    */
    //% blockGap=30
    //% blockId=edubit_compare_potentiometer
    //% block="potentiometer value %pin %compareType %threshold"
    //% threshold.min=0 threshold.max=1023
    export function comparePot(pin: PotentioBitPin, compareType: PotCompareType, threshold: number, ): boolean {
        let result = false;
        switch (compareType) {
            case PotCompareType.MoreThan:
                if (readPotValue(pin) > threshold) {
                    result = true;
                }
                break;

            case PotCompareType.LessThan:
                if (readPotValue(pin) < threshold) {
                    result = true;
                }
                break;
        }
        return result;
    }


    /**
    * Compare the potentiometer value with a number and do something when true.
    * @param pin Pin number for potentiometer.
    * @param compareType More than or less than.
    * @param threshold The value to compare with.
    * @param handler The code to run when true.
    */
    //% blockGap=8
    //% blockId=edubit_potentiometer_event
    //% block="on potentiometer value %pin %compareType %threshold"
    //% threshold.min=0 threshold.max=1023
    export function onEvent(pin: PotentioBitPin, compareType: PotCompareType, threshold: number, handler: Action): void {
        // Use a new event type everytime a new event is create.
        eventType++;

        // Add the event info to the arrays.
        compareTypesArray.push(compareType);
        thresholdsArray.push(threshold);
        pinsArray.push(pin);

        // Create a placeholder for the old compare result.
        oldCompareResult.push(false);

        // Register the event.
        control.onEvent(getEventSource(pin), eventType, handler);

        // Create a function in background if haven't done so.
        // This function will check for pot value and raise the event if the condition is met.
        if (bgFunctionCreated == false) {
            control.inBackground(function () {

                while (true) {
                    // Loop for all the event created.
                    for (let i = 0; i < eventType; i++) {

                        // Check if the condition is met.
                        if (comparePot(pinsArray[i], compareTypesArray[i], thresholdsArray[i]) == true) {
                            // Raise the event if the compare result changed from false to true.
                            if (oldCompareResult[i] == false) {
                                control.raiseEvent(getEventSource(pinsArray[i]), i + 1);
                            }

                            // Save old compare result.
                            oldCompareResult[i] = true;
                        }
                        else {
                            // Save old compare result.
                            oldCompareResult[i] = false;
                        }
                        basic.pause(20)
                    }
                }

            });

            bgFunctionCreated = true;
        }

    }



    /**
    * Get the event source based on pin number.
    */
    function getEventSource(pin: PotentioBitPin): EventBusSource {
        // Get the event source based on pin number.
        switch (pin) {
            case PotentioBitPin.P0: return EventBusSource.MICROBIT_ID_IO_P0;
            case PotentioBitPin.P1: return EventBusSource.MICROBIT_ID_IO_P1;
            case PotentioBitPin.P2: return EventBusSource.MICROBIT_ID_IO_P2;
        }
        return null;
    }

}
