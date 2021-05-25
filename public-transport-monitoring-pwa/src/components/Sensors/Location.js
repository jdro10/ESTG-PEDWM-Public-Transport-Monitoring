import React, { useState } from 'react';

const Location = () => {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    
    const location = navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    })

    return (
        <div>
            <p> Latitude: {latitude} Longitude: {longitude}</p>
        </div>
    )
}

export default Location
