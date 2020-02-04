/**
 * Board initialization.
 */
namespace edubit {
    // Initialize the IO pins.
    pins.P0.digitalRead();
    pins.P1.digitalRead();
    pins.P2.digitalRead();

    pins.P8.digitalRead();
    pins.P12.digitalRead();
    pins.P13.digitalRead();
    pins.P14.digitalRead();
    pins.P15.digitalRead();
    pins.P16.digitalRead();



    // Disable the servos.
    edubit_motors.disableServo(edubit_motors.ServoNumber.Servo1);
    edubit_motors.disableServo(edubit_motors.ServoNumber.Servo2);
    edubit_motors.disableServo(edubit_motors.ServoNumber.Servo3);
}