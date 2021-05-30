import React, { useState } from 'react';
import './createtrip.css';
import { Button, Badge, Form, DropdownButton, Dropdown } from 'react-bootstrap';

const CreateTrip = () => {
	const timeOptions = ['10:30', '12:30', '14:30', '16:30', '18:30', '20:30'];
	const stopOptions = [
		'Porto',
		'Rebordosa',
		'Paredes',
		'Maureles',
		'Felgueiras',
		'Braga',
		'Portimão'
	];

	const createTrip = async () => {
		const getToken = localStorage.getItem('token', getToken);

		const req = await fetch('http://localhost:8080/trips', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				'Authorization': 'Bearer ' + getToken
			},
			body: JSON.stringify({
				hours: timeOptionsChoose,
				path: stopOptionsChoose,
				driverId: driverId,
				vehiclePlate: vehicleId,
				price: price
			})
		});

		const res = await req.json();

		if (res[0].id !== undefined) {
			alert('Registada com sucesso.');
		} else {
			alert('Erro na criação da viagem.');
		}
	};

	function check(value1, value2) {
		return value1 === value2;
	}

	const [driverId, setDriverId] = useState('');
	const [vehicleId, setVehicleId] = useState('');
	const [price, setPrice] = useState(0.0);

	const [timeOptionsChoose, setTimeOptions] = useState([]);
	const [stopOptionsChoose, setStopOptions] = useState([]);

	return (
		<div id='createTripDiv' className='Createtrip p-3'>
			<Form>
				<div className='row w-100 my-1'>
					<div className='col-md-12'>
						<Form.Group id='input' size='lg' controlId='driverId'>
							<Form.Label>Condutor</Form.Label>
							<Form.Control
								autoFocus
								value={driverId}
								placeholder='Id do condutor'
								onChange={(e) =>
									setDriverId(e.currentTarget.value)
								}
							/>
						</Form.Group>
					</div>
				</div>

				<div className='row w-100 my-1'>
					<div className='col-md-12'>
						<Form.Group id='input' size='lg' controlId='vehicleId'>
							<Form.Label>Matrícula</Form.Label>
							<Form.Control
								placeholder='Matrícula do veículo'
								value={vehicleId}
								onChange={(e) =>
									setVehicleId(e.currentTarget.value)
								}
							/>
						</Form.Group>
					</div>
				</div>

				<div className='row w-100 my-1'>
					<div className='col-md-12'>
						<Form.Group id='input' size='lg' controlId='price'>
							<Form.Label>Preço da viagem</Form.Label>
							<Form.Control
								placeholder='Preço da viagem'
								value={price}
								onChange={(e) =>
									setPrice(e.currentTarget.value)
								}
							/>
						</Form.Group>
					</div>
				</div>

				<div className='row mb-2 w-100'>
					<div className='col-md-6 mb-2 mb-md-0'>
						<DropdownButton
							className='w-100'
							variant='success'
							id='dropdown-basic-button'
							title='Escolher horário'
						>
							{timeOptions.map((option) => {
								return (
									<Dropdown.Item
										key={option}
										onClick={(e) =>
											setTimeOptions([
												...timeOptionsChoose,
												option
											])
										}
									>
										{option}
									</Dropdown.Item>
								);
							})}
						</DropdownButton>
					</div>
					<div className='col-md-6'>
						<DropdownButton
							variant='success'
							id='dropdown-basic-button'
							title='Escolher paragens'
						>
							{stopOptions.map((option) => {
								return (
									<Dropdown.Item
										key={option}
										onClick={(e) =>
											setStopOptions((prevState) => [
												...prevState, // [1,2,3] => ...prevState
												option
											])
										}
									>
										{option}
									</Dropdown.Item>
								);
							})}
						</DropdownButton>
					</div>
				</div>

				<div className='row w-100 mb-2 align-items-center'>
					<div className='col-md-1'>
						<div className='font-weight-bold'>Paragens</div>
					</div>

					<div className='col-md-11'>
						{/* mb => margin botto mt => margin top */}
						<div className='badges'>
							{stopOptionsChoose.map((opt, index) => (
								<Badge
									key={index}
									variant='primary'
									// onClick={(e) =>
									// 	setStopOptions([
									// 		stopOptionsChoose.filter(
									// 			(x) => x === opt
									// 		)
									// 	])
									// }
								>
									{opt}
								</Badge>
							))}
						</div>
					</div>
				</div>

				<div className='row w-100 mb-2 align-items-center'>
					<div className='col-md-1'>
						<div className='font-weight-bold'>Horário</div>
					</div>

					<div className='col-md-11'>
						{/* mb => margin botto mt => margin top */}
						<div className='badges'>
							{timeOptionsChoose.map((opt, index) => (
								<Badge key={index} variant='primary'>
									{opt}
								</Badge>
							))}
						</div>
					</div>
				</div>

				<div className='row w-100'>
					<div className='col-md-12'>
						<Button
							variant='success'
							block
							size='lg'
							onClick={() => createTrip()}
						>
							{' '}
							Criar viagem{' '}
						</Button>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default CreateTrip;
