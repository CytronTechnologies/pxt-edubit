/*******************************************************************************
 * Functions for edu:bit input.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Possible pins for digital input.
enum DigitalInputPin {
    //% block="IR Sensor"
    IR = DigitalPin.P8,
    //% block="Sound Sensor"
    SOUND = DigitalPin.P16,
    P0 = DigitalPin.P0,
    P1 = DigitalPin.P1,
    P2 = DigitalPin.P2,
    P8 = DigitalPin.P8,
    P12 = DigitalPin.P12,
    P13 = DigitalPin.P13,
    P14 = DigitalPin.P14,
    P15 = DigitalPin.P15,
    P16 = DigitalPin.P16,
}

// Possible pins for analog input.
enum AnalogInputPin {
    //% block="Potentiometer"
    POT = AnalogPin.P1,
    //% block="Sound Sensor"
    SOUND = AnalogPin.P2,
    P0 = AnalogPin.P0,
    P1 = AnalogPin.P1,
    P2 = AnalogPin.P2,
}

// Analog input comparison type.
enum AnalogInputCompareType {
    //% block=">"
    MoreThan = 0,

    //% block="<"
    LessThan = 1
};

// Digital input trigger state.
enum DigitalInputTriggerState {
    //% block="High"
    High = 1,
    //% block="Low"
    Low = 0,
}



/**
 * Blocks for input
 */
//% weight=21 color=#ff8000 icon="\uf060" block="Input"
//% groups=['Analog Input', 'Digital Input']
namespace edubit_input {
    // Indicate whether background function has been created.
    let bgFunctionCreated = false;

    // Event type.
    let AnalogEventType = 0;

    // Array for compare type, threshold and pin number.
    let compareTypesArray: AnalogInputCompareType[] = [];
    let thresholdsArray: number[] = [];
    let pinsArray: AnalogInputPin[] = [];

    // Array for old compare result.
    let oldCompareResult: boolean[] = [];



    /**
     * Return analog input value (0-1023).
     * @param pin Pin number for analog input. eg: AnalogInputPin.POT
     */
    //% group="Analog Input"
    //% blockGap=8
    //% blockId=edubit_read_analog_input
    //% block="Read analog input %pin"
    export function readAnalogInput(pin: AnalogInputPin): number {
        return pins.analogReadPin(<number>pin);
    }


    /**
    * Compare the analog input value (0-1023) with a number and return the result (true/false).
    * @param pin Pin number for analog input. eg: AnalogInputPin.POT
    * @param compareType More than or less than. eg: AnalogInputCompareType.MoreThan
    * @param threshold The value to compare with. eg: 0, 512, 1023
    */
    //% group="Analog Input"
    //% blockGap=30
    //% blockId=edubit_compare_analog_input
    //% block="Analog input %pin %compareType %threshold"
    //% threshold.min=0 threshold.max=1023
    export function compareAnalogInput(pin: AnalogInputPin, compareType: AnalogInputCompareType, threshold: number): boolean {
        let result = false;
        switch (compareType) {
            case AnalogInputCompareType.MoreThan:
                if (readAnalogInput(pin) > threshold) {
                    result = true;
                }
                break;

            case AnalogInputCompareType.LessThan:
                if (readAnalogInput(pin) < threshold) {
                    result = true;
                }
                break;
        }
        return result;
    }


    /**
    * Compare the analog input value (0-1023) with a number and do something when true.
    * @param pin Pin number for analog input. eg: AnalogInputPin.POT
    * @param compareType More than or less than. eg: AnalogInputCompareType.MoreThan
    * @param threshold The value to compare with. eg: 0, 512, 1023
    */
    //% group="Analog Input"
    //% blockGap=8
    //% blockId=edubit_on_analog_input_event
    //% block="On analog input %pin %compareType %threshold"
    //% threshold.min=0 threshold.max=1023
    export function onAnalogInputEvent(pin: AnalogInputPin, compareType: AnalogInputCompareType, threshold: number, handler: Action): void {
        // Use a new event type everytime a new event is create.
        AnalogEventType++;

        // Add the event info to the arrays.
        compareTypesArray.push(compareType);
        thresholdsArray.push(threshold);
        pinsArray.push(pin);

        // Create a placeholder for the old compare result.
        oldCompareResult.push(false);

        // Register the event.
        control.onEvent(getAnalogEventSource(pin), AnalogEventType, handler);

        // Create a function in background if haven't done so.
        // This function will check for pot value and raise the event if the condition is met.
        if (bgFunctionCreated == false) {
            control.inBackground(function () {

                while (true) {
                    // Loop for all the event created.
                    for (let i = 0; i < AnalogEventType; i++) {

                        // Check if the condition is met.
                        if (compareAnalogInput(pinsArray[i], compareTypesArray[i], thresholdsArray[i]) == true) {
                            // Raise the event if the compare result changed from false to true.
                            if (oldCompareResult[i] == false) {
                                control.raiseEvent(getAnalogEventSource(pinsArray[i]), i + 1);
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
    * Get the analog input event source based on pin number.
    */
    function getAnalogEventSource(pin: AnalogInputPin): EventBusSource {
        // Get the event source based on pin number.
        switch (<number>pin) {
            case <number>AnalogPin.P0: return EventBusSource.MICROBIT_ID_IO_P0;
            case <number>AnalogPin.P1: return EventBusSource.MICROBIT_ID_IO_P1;
            case <number>AnalogPin.P2: return EventBusSource.MICROBIT_ID_IO_P2;
        }
        return null;
    }







    /**
     * Return digital input state (0 or 1).
     * @param pin Pin number for digital input. eg: DigitalInputPin.IR
     */
    //% group="Digital Input"
    //% blockGap=8
    //% blockId=edubit_read_digital_input
    //% block="Read digital input %pin"
    export function readDigitalInput(pin: DigitalInputPin): number {
        return pins.digitalReadPin(<number>pin);
    }


    /**
     * Return true if digital input is triggered.
     * @param pin Pin number for digital input. eg: DigitalInputPin.IR
     * @param triggerState Digital input trigger state. eg: DigitalInputTriggerState.High
     */
    //% group="Digital Input"
    //% blockGap=30
    //% blockId=edubit_is_digital_input_triggered
    //% block="Digital input %pin is %triggerState"
    export function isDigitalInputHigh(pin: DigitalInputPin, triggerState: DigitalInputTriggerState): boolean {
        if (pins.digitalReadPin(<number>pin) == <number>triggerState) {
            return true;
        }
        else {
            return false;
        }
    }


    /**
    * Do something when digital input is triggered.
    * @param pin Pin number for digital input. eg: DigitalInputPin.IR
    * @param triggerState Digital input trigger state. eg: DigitalInputTriggerState.High
    */
    //% group="Digital Input"
    //% blockGap=8
    //% blockId=edubit_on_digital_input_event
    //% block="On digital Input %pin is %triggerState"
    export function onDigitalInputEvent(pin: DigitalInputPin, triggerState: DigitalInputTriggerState, handler: Action) {
        // Set the event type as edge triggered.
        pins.setEvents(<number>pin, PinEventType.Edge);

        // Get the event type.
        let digitalEventType = EventBusValue.MICROBIT_PIN_EVT_FALL;
        if (triggerState == DigitalInputTriggerState.High) {
            digitalEventType = EventBusValue.MICROBIT_PIN_EVT_RISE;
        }

        // Register the event.
        control.onEvent(getDigitalEventSource(pin), digitalEventType, handler);
    }



    /**
    * Get the digital input event source based on pin number.
    */
    function getDigitalEventSource(pin: DigitalInputPin): EventBusSource {
        // Get the event source based on pin number.
        switch (<number>pin) {
            case <number>DigitalPin.P0: return EventBusSource.MICROBIT_ID_IO_P0;
            case <number>DigitalPin.P1: return EventBusSource.MICROBIT_ID_IO_P1;
            case <number>DigitalPin.P2: return EventBusSource.MICROBIT_ID_IO_P2;
            case <number>DigitalPin.P8: return EventBusSource.MICROBIT_ID_IO_P8;
            case <number>DigitalPin.P12: return EventBusSource.MICROBIT_ID_IO_P12;
            case <number>DigitalPin.P13: return EventBusSource.MICROBIT_ID_IO_P13;
            case <number>DigitalPin.P14: return EventBusSource.MICROBIT_ID_IO_P14;
            case <number>DigitalPin.P15: return EventBusSource.MICROBIT_ID_IO_P15;
            case <number>DigitalPin.P16: return EventBusSource.MICROBIT_ID_IO_P16;
        }
        return null;
    }


}
