/*******************************************************************************
 * Functions for edu:bit - Potentiometer Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Possible pins for potentiometer.
enum PotPin {
    //% block="P1 (Default)"
    P1 = AnalogPin.P1,
    P0 = AnalogPin.P0,
    P2 = AnalogPin.P2
};

// Comparison type.
enum PotCompareType {
    //% block=">"
    MoreThan = 0,

    //% block="<"
    LessThan = 1
};



/**
 * Blocks for Potentiometer Bit.
 */
//% weight=16 color=#ff8000 icon="\uf2db" block="Potentiometer Bit"
namespace edubit_pot {
    // Indicate whether background function has been created.
    let bgFunctionCreated = false;

    // Event type.
    let eventType = 0;

    // Array for compare type, threshold and pin number.
    let compareTypesArray: PotCompareType[] = [];
    let thresholdsArray: number[] = [];
    let pinsArray: PotPin[] = [];

    // Array for old compare result.
    let oldCompareResult: boolean[] = [];



    /**
     * Read potentiometer value (0-1023).
     * @param pin Pin number for potentiometer. eg: PotPin.P1
     */
    //% blockGap=30
    //% blockId=edubit_read_pot_value
    //% block="Read potentiometer || at pin %pin"
    //% pin.fieldEditor="gridpicker"
    export function readPotValue(pin: PotPin = PotPin.P1): number {
        return pins.analogReadPin(<number>pin);
    }


    /**
    * Registers code to run when a potentiometer event is detected.
    * @param compareType More than or less than. eg: PotCompareType.MoreThan
    * @param threshold The value to compare with. eg: 0, 512, 1023
    */
    //% blockGap=8
    //% blockId=edubit_potentiometer_event
    //% block="On potentiometer %compareType %threshold at pin %pin"
    //% pin.fieldEditor="gridpicker"
    //% threshold.min=0 threshold.max=1023
    export function onEvent(compareType: PotCompareType, threshold: number, pin: PotPin, handler: Action) {
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
                        if (compare(readPotValue(pinsArray[i]), compareTypesArray[i], thresholdsArray[i]) == true) {
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
    function getEventSource(pin: PotPin): EventBusSource {
        // Get the event source based on pin number.
        switch (pin) {
            case PotPin.P0: return EventBusSource.MICROBIT_ID_IO_P0;
            case PotPin.P1: return EventBusSource.MICROBIT_ID_IO_P1;
            case PotPin.P2: return EventBusSource.MICROBIT_ID_IO_P2;
        }
        return null;
    }


    /**
    * Compare a value with threshold and return the result based on comparison type.
    */
    function compare(value: number, compareType: PotCompareType, threshold: number): boolean {
        let result = false;
        switch (compareType) {
            case PotCompareType.MoreThan:
                if (value > threshold) {
                    result = true;
                }
                break;

            case PotCompareType.LessThan:
                if (value < threshold) {
                    result = true;
                }
                break;
        }
        return result;
    }

}
