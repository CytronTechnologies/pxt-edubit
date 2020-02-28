/*******************************************************************************
 * Functions for edu:bit - IR Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Possible pins for IR Bit.
enum IrBitPin {
    //% block="P8*"
    P8 = DigitalPin.P8,
    P0 = DigitalPin.P0,
    P1 = DigitalPin.P1,
    P2 = DigitalPin.P2,
    P12 = DigitalPin.P12,
    P13 = DigitalPin.P13,
    P14 = DigitalPin.P14,
    P15 = DigitalPin.P15,
    P16 = DigitalPin.P16,
}

// IR sensor Event Type.
enum IrEventType {
    //% block="Triggered"
    Rise = EventBusValue.MICROBIT_PIN_EVT_RISE,

    //% block="Not Triggered"
    Fall = EventBusValue.MICROBIT_PIN_EVT_FALL,
}



/**
 * Blocks for IR Bit.
 */
//% weight=13 color=#ff8000 icon="\uf05b" block="IR Bit"
namespace edubit_ir_bit {

    /**
     * Return IR sensor state (0 or 1).
     * @param pin Pin number for IR Bit.
     */
    //% blockGap=8
    //% blockId=edubit_read_ir_sensor
    //% block="IR sensor state %pin"
    export function readIrSensor(pin: IrBitPin): number {
        return pins.digitalReadPin(<number>pin);
    }


    /**
     * Return true if IR sensor is triggered.
     * @param pin Pin number for IR Bit.
     */
    //% blockGap=30
    //% blockId=edubit_is_ir_sensor_triggered
    //% block="IR sensor %pin triggered"
    export function isIrSensorTriggered(pin: IrBitPin): boolean {
        if (pins.digitalReadPin(<number>pin) != 0) {
            return true;
        }
        else {
            return false;
        }
    }


    /**
    * Do something when IR sensor is triggered / not triggered.
    * @param pin Pin number for IR Bit.
    * @param event Event type.
    */
    //% blockGap=8
    //% blockId=edubit_ir_sensor_event
    //% block="on IR sensor %pin %event"
    export function onIrSensorEvent(pin: IrBitPin, event: IrEventType, handler: Action) {
        // Set the event type as edge triggered.
        pins.setEvents(<number>pin, PinEventType.Edge);

        // Register the event.
        control.onEvent(getEventSource(pin), <number>event, handler);
    }



    /**
    * Get the event source based on pin number.
    */
    function getEventSource(pin: IrBitPin): EventBusSource {
        // Get the event source based on pin number.
        switch (pin) {
            case IrBitPin.P0: return EventBusSource.MICROBIT_ID_IO_P0;
            case IrBitPin.P1: return EventBusSource.MICROBIT_ID_IO_P1;
            case IrBitPin.P2: return EventBusSource.MICROBIT_ID_IO_P2;
            case IrBitPin.P8: return EventBusSource.MICROBIT_ID_IO_P8;
            case IrBitPin.P12: return EventBusSource.MICROBIT_ID_IO_P12;
            case IrBitPin.P13: return EventBusSource.MICROBIT_ID_IO_P13;
            case IrBitPin.P14: return EventBusSource.MICROBIT_ID_IO_P14;
            case IrBitPin.P15: return EventBusSource.MICROBIT_ID_IO_P15;
            case IrBitPin.P16: return EventBusSource.MICROBIT_ID_IO_P16;
        }
        return null;
    }
}
