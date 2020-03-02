/**
 * Board initialization and helper function.
 */
namespace edubit {
    // Brake the motors.
    edubitMotors.brakeMotor(Motor.M1);
    edubitMotors.brakeMotor(Motor.M2);

    // Disable the servos.
    edubitMotors.disableServo(Servo.S1);
    edubitMotors.disableServo(Servo.S2);
    edubitMotors.disableServo(Servo.S3);



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
}