import React from 'react'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DriverPageTrip = () => {
    const [tripId, setTripId] = useState('')

    return (
        <div className='flex-container root'>
            <div className='form-container'>
                <h1>Inicie uma viagem!</h1>
                <Form>
                    <Form.Group id='input' size='lg'>
                        <Form.Label>Introduza o id da viagem</Form.Label>
                        <Form.Control
                            type="text"
                            value={tripId}
                            onChange={(e) => setTripId(e.currentTarget.value)}
                            autoFocus
                            placeholder='id12931283b59230'
                        />
                    </Form.Group>
                    <Link to={{ pathname: "/driveradmin", state: { tripId: tripId } }}><Button
                        variant='primary'
                        block
                        size='lg'>
                        Começar
					</Button>
                    </Link>
                </Form>
            </div>
        </div>
    )
}

export default DriverPageTrip
