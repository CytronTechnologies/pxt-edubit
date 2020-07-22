/**
 * Board initialization and helper function.
 */

// I2C slave address for PIC16F1937.
const I2C_ADDRESS = 0x08;

// Register address.
const REG_ADD_REVISION = 0;
const REG_ADD_SERVO_1 = 1;
const REG_ADD_SERVO_2 = 2;
const REG_ADD_SERVO_3 = 3;
const REG_ADD_M1A = 4;
const REG_ADD_M1B = 5;
const REG_ADD_M2A = 6;
const REG_ADD_M2B = 7;
const REG_ADD_LB_UTH = 8;
const REG_ADD_LB_LTH = 9;
const REG_ADD_OV_TH = 10;
const REG_ADD_VIN = 11;
const REG_ADD_PWR_STATE = 12;
const REG_ADD_LB_STATE = 13;
const REG_ADD_OV_STATE = 14;



namespace edubit {
    // Brake the motors.
    edubitMotors.brakeMotor(MotorChannel.M1);
    edubitMotors.brakeMotor(MotorChannel.M2);

    // Disable the servos.
    edubitMotors.disableServo(ServoChannel.S1);
    edubitMotors.disableServo(ServoChannel.S2);
    edubitMotors.disableServo(ServoChannel.S3);



    /**
     * Limit the range of a number.
     * @param value The number we want to limit.
     * @param min Minimum value of the number.
     * @param max Maximum value of the number.
     */
    //% blockHidden=true
    //% blockId=edubit_limit
    export function limit(value: number, min: number, max: number): number {
        if (value < min) {
            value = min;
        }
        else if (value > max) {
            value = max;
        }
        return value;
    }



    /**
     * I2C read from the register of PIC16F1937.
     * @param register Register address.
     */
    //% blockHidden=true
    //% blockId=edubit_i2c_read
    export function i2cRead(register: number): number {
        let value = 0;
        pins.i2cWriteNumber(I2C_ADDRESS, register, NumberFormat.UInt8LE, true);
        value = pins.i2cReadNumber(I2C_ADDRESS, NumberFormat.UInt8LE);
        return value;
    }



    /**
     * I2C write to the register of PIC16F1937.
     * @param register Register address.
     * @param data Data to write.
     */
    //% blockHidden=true
    //% blockId=edubit_i2c_write
    export function i2cWrite(register: number, data: number): void {
        let buffer = pins.createBuffer(2);
        buffer[0] = register;
        buffer[1] = data;
        pins.i2cWriteBuffer(I2C_ADDRESS, buffer);
    }

}