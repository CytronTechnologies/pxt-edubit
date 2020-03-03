/*******************************************************************************
 * Functions for edu:bit servos and motors driver.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

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


// Motor channel.
enum MotorChannel {
    M1 = 0,
    M2 = 1
};

// Motor direction.
enum MotorDirection {
    Forward = 0,
    Backward = 1
};

// Servo Channel.
enum ServoChannel {
    S1 = REG_ADD_SERVO_1,
    S2 = REG_ADD_SERVO_2,
    S3 = REG_ADD_SERVO_3
};



/**
 * Blocks for edu:bit servos and motors driver.
 */
//% weight=10 color=#ff8000 icon="\uf085" block="Motors & Servos"
//% groups=['DC Motors', 'Servos']
namespace edubitMotors {

    /**
     * Brake the motor
     * @param motor Motor channel. eg: Motor.M1, Motor.M2
     */
    //% group="DC Motors"
    //% blockGap=8
    //% blockId=edubit_brake_motor
    //% block="Brake motor %motor"
    export function brakeMotor(motor: MotorChannel): void {
        switch (motor) {
            case MotorChannel.M1:
                i2cWrite(REG_ADD_M1A, 0);
                i2cWrite(REG_ADD_M1B, 0);
                break;

            case MotorChannel.M2:
                i2cWrite(REG_ADD_M2A, 0);
                i2cWrite(REG_ADD_M2B, 0);
                break;
        }
    }


    /**
     * Run the motor forward or backward (Speed = 0-255).
     * @param motor Motor channel.
     * @param direction Motor direction.
     * @param speed Motor speed (0-255).
     */
    //% group="DC Motors"
    //% blockGap=40
    //% blockId=edubit_run_motor
    //% block="Run motor %motor %direction at speed %speed"
    //% speed.min=0 speed.max=255
    export function runMotor(motor: MotorChannel, direction: MotorDirection, speed: number): void {
        speed = edubit.limit(speed, 0, 255);
        switch (motor) {
            case MotorChannel.M1:
                if (direction == MotorDirection.Forward) {
                    i2cWrite(REG_ADD_M1A, speed);
                    i2cWrite(REG_ADD_M1B, 0);
                }
                else {
                    i2cWrite(REG_ADD_M1A, 0);
                    i2cWrite(REG_ADD_M1B, speed);
                }
                break;

            case MotorChannel.M2:
                if (direction == MotorDirection.Forward) {
                    i2cWrite(REG_ADD_M2A, speed);
                    i2cWrite(REG_ADD_M2B, 0);
                }
                else {
                    i2cWrite(REG_ADD_M2A, 0);
                    i2cWrite(REG_ADD_M2B, speed);
                }
                break;
        }
    }


    /**
     * Disable the servo.
     * @param servo Servo channel.
     */
    //% group="Servos"
    //% blockGap=40
    //% blockId=edubit_disable_servo
    //% block="Disable servo %servo"
    export function disableServo(servo: ServoChannel): void {
        i2cWrite(servo, 0);
    }


    /**
     * Set the position for servo (0-180 degrees).
     * @param servo Servo channel.
     * @param position Servo positon. eg: 90
     */
    //% group="Servos"
    //% blockGap=8
    //% blockId=edubit_set_servo_position
    //% block="Set servo %servo position to %position degrees"
    //% position.min=0 position.max=180
    export function setServoPosition(servo: ServoChannel, position: number): void {
        position = edubit.limit(position, 0, 180);

        let pulseWidth = position * 20 / 18 + 50
        i2cWrite(servo, pulseWidth);
    }


    /**
     * Set the pulse width for servo (450-2550 microseconds).
     * @param servo Servo channel.
     * @param pulseWidth Pulse width in microseconds. eg: 1500
     */
    //% group="Servos"
    //% blockGap=8
    //% blockId=edubit_set_servo_pulse_width
    //% block="Set servo %servo pulse width to %pulseWidth us"
    //% pulseWidth.min=450 pulseWidth.max=2550
    export function setServoPulseWidth(servo: ServoChannel, pulseWidth: number): void {
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
