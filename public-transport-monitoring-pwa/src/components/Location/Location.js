import { Accelerometer } from 'motion-sensors-polyfill';
import React, { useState, useEffect, PropTypes } from 'react';

const Location = () => {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [x, setX] = useState('')
    const [y, setY] = useState('')
    const [z, setZ] = useState('')

    const location = navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    })

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
            <h3> Latitude: {latitude} Longitude: {longitude}</h3>
            <h1>X: {x} | Y: {y} | Z: {z}</h1>
        </div>
    )
}

export default Location
