/**
 * Blocks for edu:bit servos and motors driver.
 */
//% weight=10 color=#ff8000 icon="\uf2db" block="Motors & Servos"
//% groups=['DC Motors', 'Servos']
namespace edubit_motors {
    // I2C slave address for PIC16F1937.
    const I2C_ADDRESS = 0x08;

    // Register address.
    const REG_ADD_SERVO_1 = 1;
    const REG_ADD_SERVO_2 = 2;
    const REG_ADD_SERVO_3 = 3;
    const REG_ADD_M1A = 4;
    const REG_ADD_M1B = 5;
    const REG_ADD_M2A = 6;
    const REG_ADD_M2B = 7;

    // Motor number.
    export enum MotorNumber {
        //% block=1
        Motor1,

        //% block=2
        Motor2
    }

    // Servo number.
    // Enum number = register address.
    export enum ServoNumber {
        //% block=1
        Servo1 = REG_ADD_SERVO_1,

        //% block=2
        Servo2 = REG_ADD_SERVO_2,

        //% block=3
        Servo3 = REG_ADD_SERVO_3
    };



    /**
     * Disable the servo.
     * @param servo The number of the servo. eg: Servo1, Servo2
     */
    //% group="Servos"
    //% blockGap=30
    //% blockId=edubit_disable_servo
    //% block="Disable servo %servo"
    //% value.min=450 value.max=2550
    export function disableServo(servo: ServoNumber): void {
        i2cWrite(servo, 0);
    }



    /**
     * Set the position for servo (0-180 degrees).
     * @param servo The number of the servo. eg: Servo1, Servo2
     * @param position Servo positon. eg: 90, 180
     */
    //% group="Servos"
    //% blockGap=8
    //% blockId=edubit_set_servo_position
    //% block="Set servo %servo position to %position degrees"
    //% position.min=0 position.max=180
    export function setServoPosition(servo: ServoNumber, position: number): void {
        position = edubit.limit(position, 0, 180);

        let pulseWidth = position * 20 / 18 + 50
        i2cWrite(servo, pulseWidth);
    }



    /**
     * Set the pulse width for servo (450-2550 microseconds).
     * @param servo The number of the servo. eg: Servo1, Servo2
     * @param pulseWidth Pulse width in microseconds. eg: 1500, 2000
     */
    //% group="Servos"
    //% blockGap=8
    //% blockId=edubit_set_servo_pulse_width
    //% block="Set servo %servo pulse width to %pulseWidth us"
    //% pulseWidth.min=450 pulseWidth.max=2550
    export function setServoPulseWidth(servo: ServoNumber, pulseWidth: number): void {
        pulseWidth = edubit.limit(pulseWidth, 450, 2550);
        i2cWrite(servo, pulseWidth / 10);
    }



    // I2C write to the register on PIC16F1937.
    function i2cWrite(register: number, value: number): void {
        let buffer = pins.createBuffer(2);
        buffer[0] = register;
        buffer[1] = value;
        pins.i2cWriteBuffer(I2C_ADDRESS, buffer);
    }
}
