import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';

const TripInfo = ({ trip }) => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    return (
        <div>
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
                                    <td>{trip.path.map(p => <p>{p}</p>)}</td>
                                    <td>{trip.hours.map(h => <p>{h}</p>)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                        <Button variant="success" onClick={handleClose}>Reservar</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    )
}

export default TripInfo;
