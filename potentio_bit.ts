/*******************************************************************************
 * Functions for edu:bit - Potentio Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Default pin.
const POTENTIO_BIT_PIN = AnalogPin.P2;

// Event source.
const POTENTIO_BIT_EVENT_SOURCE = EventBusSource.MICROBIT_ID_IO_P2;

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
namespace edubitPotentioBit {
    // Indicate whether background function has been created.
    let bgFunctionCreated = false;

    // Event type.
    let eventType = 0;

    // Array for compare type and threshold.
    let compareTypesArray: PotCompareType[] = [];
    let thresholdsArray: number[] = [];

    // Array for old compare result.
    let oldCompareResult: boolean[] = [];



    /**
     * Return potentiometer value (0-1023).
     */
    //% weight=20
    //% blockGap=8
    //% blockId=edubit_read_pot_value
    //% block="potentiometer value"
    export function readPotValue(): number {
        return pins.analogReadPin(POTENTIO_BIT_PIN);
    }


    /**
    * Compare the potentiometer value (0-1023) with a number and return the result (true/false).
    * @param compareType More than or less than.
    * @param threshold The value to compare with. eg: 512
    */
    //% weight=19
    //% blockGap=40
    //% blockId=edubit_compare_pot_value
    //% block="potentiometer value %compareType %threshold"
    //% threshold.min=0 threshold.max=1023
    export function comparePot(compareType: PotCompareType, threshold: number, ): boolean {
        let result = false;
        switch (compareType) {
            case PotCompareType.MoreThan:
                if (readPotValue() > threshold) {
                    result = true;
                }
                break;

            case PotCompareType.LessThan:
                if (readPotValue() < threshold) {
                    result = true;
                }
                break;
        }
        return result;
    }


    /**
    * Compare the potentiometer value with a number and do something when true.
    * @param compareType More than or less than.
    * @param threshold The value to compare with. eg: 512
    * @param handler Code to run when the event is raised.
    */
    //% weight=18
    //% blockGap=8
    //% blockId=edubit_potentiometer_event
    //% block="on potentiometer value %compareType %threshold"
    //% threshold.min=0 threshold.max=1023
    export function onEvent(compareType: PotCompareType, threshold: number, handler: Action): void {
        // Use a new event type everytime a new event is create.
        eventType++;

        // Add the event info to the arrays.
        compareTypesArray.push(compareType);
        thresholdsArray.push(threshold);

        // Create a placeholder for the old compare result.
        oldCompareResult.push(false);

        // Register the event.
        control.onEvent(POTENTIO_BIT_EVENT_SOURCE, eventType, handler);

        // Create a function in background if haven't done so.
        // This function will check for pot value and raise the event if the condition is met.
        if (bgFunctionCreated == false) {
            control.inBackground(function () {

                while (true) {
                    // Loop for all the event created.
                    for (let i = 0; i < eventType; i++) {

                        // Check if the condition is met.
                        if (comparePot(compareTypesArray[i], thresholdsArray[i]) == true) {
                            // Raise the event if the compare result changed from false to true.
                            if (oldCompareResult[i] == false) {
                                control.raiseEvent(POTENTIO_BIT_EVENT_SOURCE, i + 1);
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

}
