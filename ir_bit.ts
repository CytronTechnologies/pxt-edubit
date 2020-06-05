/*******************************************************************************
 * Functions for edu:bit - IR Bit.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Default pin.
const IR_BIT_PIN = DigitalPin.P8;

// Event source.
const IR_BIT_EVENT_SOURCE = EventBusSource.MICROBIT_ID_IO_P8;

// Event type.
enum IrEventType {
    //% block="triggered"
    Rise = EventBusValue.MICROBIT_PIN_EVT_RISE,

    //% block="not triggered"
    Fall = EventBusValue.MICROBIT_PIN_EVT_FALL,
}



/**
 * Blocks for IR Bit.
 */
//% weight=13 color=#ff8000 icon="\uf05b" block="IR Bit"
namespace edubitIrBit {

    /**
     * Return IR sensor state (0 or 1).
     */
    //% weight=20
    //% blockGap=8
    //% blockId=edubit_read_ir_sensor
    //% block="IR sensor state"
    export function readIrSensor(): number {
        return pins.digitalReadPin(IR_BIT_PIN);
    }


    /**
     * Return true if IR sensor is triggered.
     */
    //% weight=19
    //% blockGap=40
    //% blockId=edubit_is_ir_sensor_triggered
    //% block="IR sensor triggered"
    export function isIrSensorTriggered(): boolean {
        if (pins.digitalReadPin(IR_BIT_PIN) != 0) {
            return true;
        }
        else {
            return false;
        }
    }


    /**
    * Do something when IR sensor is triggered / not triggered.
    * @param event Event type.
    * @param handler Code to run when the event is raised.
    */
    //% weight=18
    //% blockGap=8
    //% blockId=edubit_ir_sensor_event
    //% block="on IR sensor %event"
    export function onIrSensorEvent(event: IrEventType, handler: Action) {
        // Set the event type as edge triggered.
        pins.setEvents(IR_BIT_PIN, PinEventType.Edge);

        // Register the event.
        control.onEvent(IR_BIT_EVENT_SOURCE, <number>event, handler);
    }

}
