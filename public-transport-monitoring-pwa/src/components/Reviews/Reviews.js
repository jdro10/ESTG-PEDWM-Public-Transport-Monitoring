import { Card, Button, CardGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import ip from '../../config';

const Reviews = () => {
	const [listening, setListening] = useState(false);
	const [reviews, setReviews] = useState([]);

	const [isLoading, setIsloading] = useState(true);

	let eventSource = undefined;

	useEffect(() => {
		if (!listening) {
			eventSource = new EventSource(`http://${ip}:8080/allReviews`);

			eventSource.onmessage = (event) => {
				setReviews(JSON.parse(event.data));
				setIsloading(false);
			};
			eventSource.onerror = (err) => {
				console.error('EventSource failed:', err);
				eventSource.close();
			};

			setListening(true);
		}
	});

	// let reviewResponse;

	// if (reviews.length > 0 && reviews !== undefined) {
	// 	console.log(reviews.map((review) => console.log(review)));
	// 	reviewResponse = (
	// 		<div >
	// 			{reviews.map((review) => (
	// 				<Card style={{ width: '18rem' }}>
	// 					<Card.Body>
	// 						<Card.Title>Review:</Card.Title>
	// 						<Card.Subtitle className='mb-2 text-muted'>
	// 							{review.userId}
	// 						</Card.Subtitle>
	// 						<Card.Text>{review.message}</Card.Text>
	// 					</Card.Body>
	// 				</Card>
	// 			))}
	// 		</div>
	// 	);
	// } else {
	// 	reviewResponse = <h1>A carregar opiniões...</h1>;
	// }

	return (
		<div style={{ maxWidth: '1400px', margin: '0 auto' }}>
			{isLoading && <h2>Está carregando cara!</h2>}

			{!isLoading && (
				<div className='row'>
					{reviews.map((review) => (
						<div className='col-md-4'>
							<Card
								style={{
									border: '0',
									borderRadius: '5px',
									boxShadow: '0 0 5px rgba(0,0,0,0.15)'
								}}
							>
								<Card.Body>
									<Card.Title>Review:</Card.Title>
									<Card.Subtitle className='mb-2 text-muted'>
										{review.userId}
									</Card.Subtitle>
									<Card.Text>{review.message}</Card.Text>
								</Card.Body>
							</Card>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Reviews;
