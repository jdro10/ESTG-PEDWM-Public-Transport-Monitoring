import React, { useEffect, useState } from 'react'
import { Table, Container } from 'react-bootstrap'

const Schedule = () => {
    const [listening, setListening] = useState(false);
    const [trips, setTrips] = useState([]);

    let eventSource = undefined;

    useEffect(() => {
        if (!listening) {
            eventSource = new EventSource('http://localhost:8080/allTrips');

            eventSource.onmessage = (event) => {
                setTrips(JSON.parse(event.data))
            };
            eventSource.onerror = (err) => {
                console.error('EventSource failed:', err);
                eventSource.close();
            };
            setListening(true);
        }

    }, [])

    let tableResponse;

    if (trips.length > 0 && trips !== undefined) {
        console.log(trips.map(trip => console.log(trip)))
        tableResponse = <Table striped borderless hover responsive='xl' width='200px'>
            <thead>
                <tr>
                    <th>Origem</th>
                    <th>Destino</th>
                    <th>Partida</th>
                    <th>Chegada</th>
                    <th>Preço</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {trips.map((trip) => (
                    <tr>
                        <td>{trip.path[0]}</td>
                        <td>{trip.path[trip.path.length - 1]}</td>
                        <td>{trip.hours[0]}</td>
                        <td>{trip.hours[trip.hours.length - 1]}</td>
                        <td>{trip.price} €</td>
                        <td>{trip.date}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    } else {
        tableResponse = <h1>A carregar viagens...</h1>
    }

    return (
        <div>
            <Container>
                {tableResponse}
            </Container>
        </div>
    )
}

export default Schedule
