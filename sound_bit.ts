/*******************************************************************************
 * Functions for edu:bit - Sound Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Default pin.
const SOUND_BIT_PIN = AnalogPin.P1;

// Event source.
const SOUND_BIT_EVENT_SOURCE = EventBusSource.MICROBIT_ID_IO_P1;

// Comparison type.
enum SoundSensorCompareType {
    //% block=">"
    MoreThan = 0,

    //% block="<"
    LessThan = 1
};



/**
 * Blocks for Sound Bit.
 */
//% weight=15 color=#ff8000 icon="\uf130" block="Sound Bit"
namespace edubitSoundBit {
    // Indicate whether background function has been created.
    let bgFunctionCreated = false;

    // Event type.
    let eventType = 0;

    // Array for compare type and threshold.
    let compareTypesArray: SoundSensorCompareType[] = [];
    let thresholdsArray: number[] = [];

    // Array for old compare result.
    let oldCompareResult: boolean[] = [];



    /**
     * Return sound level (0-1023).
     * @param pin Pin number for sound sensor.
     */
    //% blockGap=8
    //% blockId=edubit_read_sound_sensor
    //% block="sound level"
    export function readSoundSensor(): number {
        return pins.analogReadPin(SOUND_BIT_PIN);
    }


    /**
    * Compare the sound level (0-1023) with a number and return the result (true/false).
    * @param compareType More than or less than.
    * @param threshold The value to compare with.
    */
    //% blockGap=40
    //% blockId=edubit_compare_sound_sensor
    //% block="sound level %compareType %threshold"
    //% threshold.min=0 threshold.max=1023
    export function compareSoundSensor(compareType: SoundSensorCompareType, threshold: number): boolean {
        let result = false;
        switch (compareType) {
            case SoundSensorCompareType.MoreThan:
                if (readSoundSensor() > threshold) {
                    result = true;
                }
                break;

            case SoundSensorCompareType.LessThan:
                if (readSoundSensor() < threshold) {
                    result = true;
                }
                break;
        }
        return result;
    }



    /**
    * Compare the sound level value with a number and do something when true.
    * @param compareType More than or less than.
    * @param threshold The value to compare with.
    * @param handler Code to run when the event is raised.
    */
    //% blockGap=8
    //% blockId=edubit_sound_sensor_event
    //% block="on sound level %compareType %threshold"
    //% threshold.min=0 threshold.max=1023
    export function onEventAdvanced(compareType: SoundSensorCompareType, threshold: number, handler: Action): void {
        // Use a new event type everytime a new event is create.
        eventType++;

        // Add the event info to the arrays.
        compareTypesArray.push(compareType);
        thresholdsArray.push(threshold);

        // Create a placeholder for the old compare result.
        oldCompareResult.push(false);

        // Register the event.
        control.onEvent(SOUND_BIT_EVENT_SOURCE, eventType, handler);

        // Create a function in background if haven't done so.
        // This function will check for pot value and raise the event if the condition is met.
        if (bgFunctionCreated == false) {
            control.inBackground(function () {

                while (true) {
                    // Loop for all the event created.
                    for (let i = 0; i < eventType; i++) {

                        // Check if the condition is met.
                        if (compareSoundSensor(compareTypesArray[i], thresholdsArray[i]) == true) {
                            // Raise the event if the compare result changed from false to true.
                            if (oldCompareResult[i] == false) {
                                control.raiseEvent(SOUND_BIT_EVENT_SOURCE, i + 1);
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

