import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import './reserveTrip.css';
import TripInfo from './TripInfo';

const ReserveTrip = ({ trips }) => {
    const [show, setShow] = useState(false);
    const [tripInfo, setTripInfo] = useState({});

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    return (
        <div id="tableDiv">
            { show ? <TripInfo trip={tripInfo}/> : '' }
            <Container>
                <Table striped borderless hover responsive="xl" width="200px">
                    <thead>
                        <tr>
                            <th>Origem</th>
                            <th>Destino</th>
                            <th>Partida</th>
                            <th>Chegada</th>
                            <th>Preço</th>
                            <th>Data</th>
                            <th>Detalhe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map(trip => (
                            <tr>
                                <td>{trip.path[0]}</td>
                                <td>{trip.path[trip.path.length - 1]}</td>
                                <td>{trip.hours[0]}</td>
                                <td>{trip.hours[trip.hours.length - 1]}</td>
                                <td>{trip.price} €</td>
                                <td>{trip.date}</td>
                                <td><Button variant="success" onClick={() => { handleShow(); setTripInfo(trip); }} >+</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container> 
        </div>
    )
}

export default ReserveTrip;
