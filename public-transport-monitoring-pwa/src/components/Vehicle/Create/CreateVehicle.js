import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './createVehicle.css';

const CreateVehicle = () => {
	const [brandName, setBrandName] = useState('');
	const [plateId, setPlateId] = useState('');
	const [capacitySize, setCapacitySize] = useState(0);

	const sendRequest = async () => {
		const req = await fetch('http://localhost:8080/vehicles', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				plate: plateId,
				capacity: capacitySize,
				brand: brandName
			})
		});

		const res = await req.json();

		if (res.plate !== undefined) {
			alert('Registado com sucesso.');
		} else {
			alert('Erro na criação do veículo.');
		}
	};

	return (
		<div className='CreateVehicle'>
			<Form>
				<Form.Group id='input' size='lg'>
					<Form.Label>Marca</Form.Label>
					<Form.Control
						autoFocus
						placeholder='Escreva aqui a marca do veículo'
						value={brandName}
						onChange={(e) => setBrandName(e.currentTarget.value)}
					/>
				</Form.Group>
				<Form.Group id='input' size='lg'>
					<Form.Label>Matrícula</Form.Label>
					<Form.Control
						value={plateId}
						onChange={(e) => setPlateId(e.currentTarget.value)}
						placeholder='Escreva aqui a matrícula do veículo'
					/>
				</Form.Group>
				<Form.Group id='input' size='lg'>
					<Form.Label>Capacidade</Form.Label>
					<Form.Control
						value={capacitySize}
						onChange={(e) => setCapacitySize(e.currentTarget.value)}
						placeholder='Escreva aqui a capacidade do veículo'
					/>
				</Form.Group>
				<Button
					variant='success'
					block
					size='lg'
					onClick={() => sendRequest()}
				>
					{' '}
					Cria Veículo{' '}
				</Button>
			</Form>
		</div>
	);
};

export default CreateVehicle;
