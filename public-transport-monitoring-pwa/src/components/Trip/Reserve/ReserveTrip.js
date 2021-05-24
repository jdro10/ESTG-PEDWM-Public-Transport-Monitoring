import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import './reserveTrip.css';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';

const ReserveTrip = () => {
    const [show, setShow] = useState(false);
    const [tripInfo, setTripInfo] = useState({
        path: [],
        hours: []
    });

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    const location = useLocation();
    const trips = location.state.trips

    const filteredTrips = []

    const filterTrips = trips.map(trip => {
        trip.path.map(tpath => tpath === 'Porto' ? filteredTrips.push(trip) : '')
    })

    return (
        <div id="tableDiv">
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
                        {filteredTrips.map(trip => (
                            <tr>
                                <td>{trip.path[0]}</td>
                                <td>{trip.path[trip.path.length - 1]}</td>
                                <td>{trip.hours[0]}</td>
                                <td>{trip.hours[trip.hours.length - 1]}</td>
                                <td>{trip.price} €</td>
                                <td>{trip.date}</td>
                                <td><Button variant="success" onClick={() => { handleShow(); setTripInfo({ path: trip.path, hours: trip.hours }); }} >+</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalhes</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Table striped borderless hover responsive="xl" width="200px">
                            <thead>
                                <tr>
                                    <th>Paragem</th>
                                    <th>Hora</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{ tripInfo.path.map(p => <p> { p } </p>) }</td>
                                    <td>{ tripInfo.hours.map(h => <p> { h } </p>) }</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { handleClose(); }}>Fechar</Button>
                        <Button variant="success" onClick={handleClose}>Reservar</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
            {console.log(tripInfo)}
        </div>
    )
}

export default ReserveTrip;
