import React, { useState }from 'react'
import { Accelerometer } from 'motion-sensors-polyfill';

const AccelerometerSensor = () => {
    const [x, setX] = useState('')
    const [y, setY] = useState('')
    const [z, setZ] = useState('')

    let accelerometer;

    if (typeof Accelerometer === "function") {
        accelerometer = new Accelerometer({ frequency: 60 });
        accelerometer.addEventListener('error', event => {
            if (event.error.name === 'NotAllowedError') {
                console.log("not allowed");
            } else if (event.error.name === 'NotReadableError') {
                console.log("cant read data");
            }
        });
        accelerometer.addEventListener('reading', (e) => { setX(e.target.x); setY(e.target.y); setZ(e.target.z) });
        accelerometer.start();
    }

    return (
        <div>
            <p>X: {x} | Y: {y} | Z: {z}</p>
        </div>
    )
}

export default AccelerometerSensor
