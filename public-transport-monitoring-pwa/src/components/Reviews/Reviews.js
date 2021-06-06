import { Card, Button, CardGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import ip from '../../config';

const Reviews = () => {
	const [listening, setListening] = useState(false);
	const [reviews, setReviews] = useState([]);

	let eventSource = undefined;

	useEffect(() => {
		if (!listening) {
			eventSource = new EventSource(`http://${ip}:8080/allReviews`);

			eventSource.onmessage = (event) => {
				setReviews(JSON.parse(event.data));
			};
			eventSource.onerror = (err) => {
				console.error('EventSource failed:', err);
				eventSource.close();
			};
			setListening(true);
		}
	}, []);

	let reviewResponse;

	if (reviews.length > 0 && reviews !== undefined) {
		console.log(reviews.map((review) => console.log(review)));
		reviewResponse = (
			<CardGroup>
				{reviews.map((review) => (
					<Card style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>Review:</Card.Title>
							<Card.Subtitle className='mb-2 text-muted'>
								{review.userId}
							</Card.Subtitle>
							<Card.Text>{review.message}</Card.Text>
						</Card.Body>
					</Card>
				))}
			</CardGroup>
		);
	} else {
		reviewResponse = <h1>A carregar opiniões...</h1>;
	}

	return <div>{reviewResponse}</div>;
};

export default Reviews;
