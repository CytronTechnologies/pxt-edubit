//==============================================
// Servos and Motor Driver
//==============================================

// I2C slave address for PIC16F1937.
const I2C_ADDRESS = 0x08;

namespace edubit {
    // Enum number = register address.
    export enum ServoNumber {
        //% block=1
        Servo1 = 1,

        //% block=2
        Servo2 = 2,
        
        //% block=3
        Servo3 = 3
    };



    /**
     * Disable the servo.
     * @param servo The number of the servo. eg: Servo1
     */
    //% subcategory="Servos"
    //% blockGap=8
    //% blockId=edubit_disable_servo
    //% block="Disable servo %servo"
    //% servo.fieldEditor="gridpicker"
    //% value.min=450 value.max=2550
    export function disableServo(servo: ServoNumber): void {
        i2cWrite(servo, 0);
    }



    /**
     * Set the pulse width for servo.
     * @param servo The number of the servo. eg: Servo1
     * @param value Pulse width in microseconds. eg: 1500
     */
    //% subcategory="Servos"
    //% blockGap=8
    //% blockId=edubit_set_servo_pulse_width
    //% block="Set servo %servo pulse width to %value us"
    //% servo.fieldEditor="gridpicker"
    //% value.min=450 value.max=2550
    export function setServoPulseWidth(servo: ServoNumber, value: number): void {
        i2cWrite(servo, value / 10);
    }



    // I2C write to the register on PIC16F1937.
    function i2cWrite(register: number, value: number): void {
        let buffer = pins.createBuffer(2);
        buffer[0] = register;
        buffer[1] = value;
        pins.i2cWriteBuffer(I2C_ADDRESS, buffer);
    }
}
