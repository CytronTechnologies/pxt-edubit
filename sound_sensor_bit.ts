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



/**
 * Blocks for Sound Sensor Bit.
 */
//% weight=15 color=#ff8000 icon="\uf2db" block="Sound Sensor Bit"
namespace edubit_sound_sensor {

    /**
     * Return sound sensor digital state (0 or 1).
     * @param pin Pin number for sound sensor digital pin. eg: SoundSensorDigitalPin.P16
     */
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
    //% blockGap=8
    //% blockId=edubit_sound_sensor_event
    //% block="On sound sensor triggered at pin %pin"
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

