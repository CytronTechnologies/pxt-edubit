/**
 * Blocks for edu:bit
 */
//% weight=0 color=#ff8000 icon="\uf2db" block="edu:bit"
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
    edubit.disableServo(edubit.ServoNumber.Servo1);
    edubit.disableServo(edubit.ServoNumber.Servo2);
    edubit.disableServo(edubit.ServoNumber.Servo3);
}