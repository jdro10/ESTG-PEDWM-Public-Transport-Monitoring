import React, { useState, useEffect } from 'react'
import { Container, Card, Table, Button, Modal } from 'react-bootstrap'

const UserProfile = () => {
    const [userProfileData, setUserProfileData] = useState({
        "username": '',
        "email": '',
        "tripsReserved": []
    })
    const [show, setShow] = useState(false);
    const [trip, setTrip] = useState({
        path: [],
        hours: [],
        price: ''
    });

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    useEffect(() => {
        const getData = async () => {
            const fetchUserProfileData = await getUserProfileData();

            setUserProfileData({
                "username": fetchUserProfileData.username,
                "email": fetchUserProfileData.email,
                "tripsReserved": fetchUserProfileData.tripsReserved
            });
        }

        getData();

    }, [])

    const getUserProfileData = async () => {
        const req = await fetch('http://localhost:8080/users/profile/60aedde349e0a00483100e95')

        const data = await req.json();

        return data;
    }

    const fetchTripInfo = async () => {
        const req = await fetch('http://localhost:8080/trips/60aac58f35a2492458d9e334')

        const res = await req.json();

        setTrip(res);

        return res;
    }

    return (
        <Container>
            <Card style={{ width: '50rem' }}>
                <Card.Body>
                    <Card.Title>Username:</Card.Title>
                    <Card.Text>{userProfileData.username}</Card.Text>
                    <Card.Title>Email:</Card.Title>
                    <Card.Text>{userProfileData.email}</Card.Text>
                    <Card.Title>Viagens:</Card.Title>
                    <Card.Text>
                        <Table striped borderless hover responsive="xl" width="200px">
                            <thead>
                                <tr>
                                    <th>Data da viagem</th>
                                    <th>ID de reserva</th>
                                    <th>Detalhes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userProfileData.tripsReserved.map(trip => (
                                    <tr>
                                        <th> { trip.date }</th>
                                        <th> { trip.reservationId } </th>
                                        <th><Button variant="success" onClick={() => { handleShow(); fetchTripInfo(); }}>+</Button></th>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalhes</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Table striped borderless hover responsive="xl" width="200px">
                            <thead>
                                <tr>
                                    <th>Origem</th>
                                    <th>Destino</th>
                                    <th>Hora partida</th>
                                    <th>Hora chegada</th>
                                    <th>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{ trip.path[0] }</td>
                                    <td>{ trip.path[trip.path.length - 1] }</td>
                                    <td>{ trip.hours[0] }</td>
                                    <td>{ trip.hours[trip.hours.length - 1] }</td>
                                    <td>{ trip.price }</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { handleClose(); }}>Fechar</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </Container>
    )
}

export default UserProfile
