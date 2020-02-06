/*******************************************************************************
 * Functions for edu:bit - IR Sensor Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Possible pins for IR sensor.
enum IrSensorPin {
    //% block="P8 (Default)"
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

// Possible source for IR sensor event.
enum IrEventSource {
    //% block="P8 (Default)"
    P8 = EventBusSource.MICROBIT_ID_IO_P8,
    P0 = EventBusSource.MICROBIT_ID_IO_P0,
    P1 = EventBusSource.MICROBIT_ID_IO_P1,
    P2 = EventBusSource.MICROBIT_ID_IO_P2,
    P12 = EventBusSource.MICROBIT_ID_IO_P12,
    P13 = EventBusSource.MICROBIT_ID_IO_P13,
    P14 = EventBusSource.MICROBIT_ID_IO_P14,
    P15 = EventBusSource.MICROBIT_ID_IO_P15,
    P16 = EventBusSource.MICROBIT_ID_IO_P16,
}

// IR Event Type.
enum IrEventType {
    //% block="Not Triggered"
    Fall = EventBusValue.MICROBIT_PIN_EVT_FALL,

    //% block="Triggered"
    Rise = EventBusValue.MICROBIT_PIN_EVT_RISE,
}



/**
 * Blocks for Potentiometer Bit.
 */
//% weight=14 color=#ff8000 icon="\uf2db" block="IR Sensor Bit"
namespace edubit_ir_sensor {

    /**
     * Return IR sensor state (0 or 1).
     * @param pin Pin number for IR sensor. eg: IrSensorPin.P8
     */
    //% blockGap=8
    //% blockId=edubit_read_ir_sensor
    //% block="Read IR sensor || at pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    export function readIrSensorState(pin: IrSensorPin = IrSensorPin.P8): number {
        return pins.digitalReadPin(<any>pin);
    }


    /**
     * Return true if IR sensor is triggered.
     * @param pin Pin number for IR sensor. eg: IrSensorPin.P8
     */
    //% blockGap=30
    //% blockId=edubit_is_ir_sensor_triggered
    //% block="IR sensor's triggered || at pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    export function isIrSensorTriggered(pin: IrSensorPin = IrSensorPin.P8): boolean {
        if (pins.digitalReadPin(<any>pin) != 0) {
            return true;
        }
        else {
            return false;
        }
    }


    /**
    * Do something when IR sensor is triggered / not triggered.
    * @param event Event type. eg: IrEventType.Rise
    * @param src Event source. eg: IrEventSource.P8
    */
    //% blockGap=8
    //% blockId=edubit_ir_sensor_event
    //% block="On IR sensor %event at pin %src"
    //% src.fieldEditor="gridpicker"
    export function onIrSensorEvent(event: IrEventType, src: IrEventSource, handler: Action) {
        // Set the event type for the corresponding pin.
        switch (src) {
            case IrEventSource.P0: pins.setEvents(DigitalPin.P0, PinEventType.Edge); break;
            case IrEventSource.P1: pins.setEvents(DigitalPin.P1, PinEventType.Edge); break;
            case IrEventSource.P2: pins.setEvents(DigitalPin.P2, PinEventType.Edge); break;
            case IrEventSource.P8: pins.setEvents(DigitalPin.P8, PinEventType.Edge); break;
            case IrEventSource.P12: pins.setEvents(DigitalPin.P12, PinEventType.Edge); break;
            case IrEventSource.P13: pins.setEvents(DigitalPin.P13, PinEventType.Edge); break;
            case IrEventSource.P14: pins.setEvents(DigitalPin.P14, PinEventType.Edge); break;
            case IrEventSource.P15: pins.setEvents(DigitalPin.P15, PinEventType.Edge); break;
            case IrEventSource.P16: pins.setEvents(DigitalPin.P16, PinEventType.Edge); break;
        }

        // Register the event.
        control.onEvent(<number>src, <number>event, handler);
    }
}
