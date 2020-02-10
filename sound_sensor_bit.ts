/*******************************************************************************
 * Functions for edu:bit - Sound Sensor Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Possible digital pins for Sound sensor.
enum SoundSensorDigitalPin {
    //% block="P16 (Default)"
    P16 = DigitalPin.P16,
    P0 = DigitalPin.P0,
    P1 = DigitalPin.P1,
    P2 = DigitalPin.P2,
    P8 = DigitalPin.P8,
    P12 = DigitalPin.P12,
    P13 = DigitalPin.P13,
    P14 = DigitalPin.P14,
    P15 = DigitalPin.P15
}

// Possible analog pins for Sound sensor.
enum SoundSensorAnalogPin {
    //% block="P2 (Default)"
    P2 = AnalogPin.P2,
    P0 = AnalogPin.P0,
    P1 = AnalogPin.P1,
}

// Comparison type.
enum SoundSensorCompareType {
    //% block=">"
    MoreThan = 0,

    //% block="<"
    LessThan = 1
};



/**
 * Blocks for Sound Sensor Bit.
 */
//% weight=15 color=#ff8000 icon="\uf130" block="Sound Sensor"
//% groups=['Analog Input', 'Digital Input']
namespace edubit_sound_sensor {

    /**
     * Return sound sensor analog value (0-1023).
     * @param pin Pin number for sound sensor analog pin. eg: SoundSensorAnalogPin.P2
     */
    //% group="Analog Input"
    //% blockGap=8
    //% blockId=edubit_analog_read_sound_sensor
    //% block="Read loudness || at pin %pin"
    //% pin.fieldEditor="gridpicker"
    export function analogReadSoundSensor(pin: SoundSensorAnalogPin = SoundSensorAnalogPin.P2): number {
        return pins.analogReadPin(<number>pin);
    }


    /**
    * Compare the sound sensor analog value (0-1023) with a number and return the result (true/false).
    * @param compareType More than or less than. eg: SoundSensorCompareType.MoreThan
    * @param threshold The value to compare with. eg: 0, 512, 1023
    * @param pin Pin number for sound sensor analog pin. eg: SoundSensorAnalogPin.P2
    */
    //% group="Analog Input"
    //% blockGap=30
    //% blockId=edubit_analog_compare_sound_sensor
    //% block="Loudness %compareType %threshold || at pin %pin"
    //% pin.fieldEditor="gridpicker"
    //% threshold.min=0 threshold.max=1023
    export function analogCompareSoundSensor(compareType: SoundSensorCompareType, threshold: number, pin: SoundSensorAnalogPin = SoundSensorAnalogPin.P2): boolean {
        let result = false;
        switch (compareType) {
            case SoundSensorCompareType.MoreThan:
                if (analogReadSoundSensor(pin) > threshold) {
                    result = true;
                }
                break;

            case SoundSensorCompareType.LessThan:
                if (analogReadSoundSensor(pin) < threshold) {
                    result = true;
                }
                break;
        }
        return result;
    }


    /**
     * Return sound sensor digital state (0 or 1).
     * @param pin Pin number for sound sensor digital pin. eg: SoundSensorDigitalPin.P16
     */
    //% group="Digital Input"
    //% blockGap=8
    //% blockId=edubit_digital_read_sound_sensor
    //% block="Digital read sound sensor || at pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function digitalReadSoundSensor(pin: SoundSensorDigitalPin = SoundSensorDigitalPin.P16): number {
        return pins.digitalReadPin(<number>pin);
    }


    /**
     * Return true if sound sensor is triggered.
     * @param pin Pin number for sound sensor digital pin. eg: SoundSensorDigitalPin.P16
     */
    //% group="Digital Input"
    //% blockGap=30
    //% blockId=edubit_is_sound_sensor_triggered
    //% block="Sound sensor's triggered || at pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function isSoundSensorTriggered(pin: SoundSensorDigitalPin = SoundSensorDigitalPin.P16): boolean {
        if (pins.digitalReadPin(<number>pin) != 0) {
            return true;
        }
        else {
            return false;
        }
    }


    /**
    * Do something when sound sensor is triggered.
    * @param pin Pin number for sound sensor digital pin. eg: SoundSensorDigitalPin.P16
    */
    //% group="Digital Input"
    //% blockGap=8
    //% blockId=edubit_sound_sensor_event
    //% block="On sound sensor's triggered at pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=3
    export function onSoundSensorEvent(pin: SoundSensorDigitalPin, handler: Action) {
        // Set the event type as edge triggered.
        pins.setEvents(<number>pin, PinEventType.Edge);

        // Register the event.
        control.onEvent(getEventSource(pin), EventBusValue.MICROBIT_PIN_EVT_RISE, handler);
    }



    /**
    * Get the event source based on pin number.
    */
    function getEventSource(pin: SoundSensorDigitalPin): EventBusSource {
        // Get the event source based on pin number.
        switch (pin) {
            case SoundSensorDigitalPin.P0: return EventBusSource.MICROBIT_ID_IO_P0;
            case SoundSensorDigitalPin.P1: return EventBusSource.MICROBIT_ID_IO_P1;
            case SoundSensorDigitalPin.P2: return EventBusSource.MICROBIT_ID_IO_P2;
            case SoundSensorDigitalPin.P8: return EventBusSource.MICROBIT_ID_IO_P8;
            case SoundSensorDigitalPin.P12: return EventBusSource.MICROBIT_ID_IO_P12;
            case SoundSensorDigitalPin.P13: return EventBusSource.MICROBIT_ID_IO_P13;
            case SoundSensorDigitalPin.P14: return EventBusSource.MICROBIT_ID_IO_P14;
            case SoundSensorDigitalPin.P15: return EventBusSource.MICROBIT_ID_IO_P15;
            case SoundSensorDigitalPin.P16: return EventBusSource.MICROBIT_ID_IO_P16;
        }
        return null;
    }
}

