import React, { useState } from 'react';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
import './createtrip.css';
import { Button, Badge, Form, DropdownButton, Dropdown } from 'react-bootstrap';

const CreateTrip = () => {
	const timeOptions = ['10:30', '14:30'];
	const stopOptions = ['Porto', 'Rebordosa', 'Paredes'];

	const [timeOptionsChoose, setTimeOptions] = useState();
	const [stopOptionsChoose, setStopOptions] = useState([]);

	return (
		<div id='createTripDiv' className='Createtrip p-3'>
			<Form>
				<div className='row w-100 my-1'>
					<div className='col-md-12'>
						<Form.Group id='input' size='lg' controlId='email'>
							<Form.Label>Username</Form.Label>
							<Form.Control autoFocus placeholder='exemplo' />
						</Form.Group>
					</div>
				</div>

				<div className='row w-100 my-1'>
					<div className='col-md-12'>
						<Form.Group id='input' size='lg' controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='********'
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
							onClick={() => console.log(stopOptionsChoose)}
						>
							{' '}
							Login{' '}
						</Button>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default CreateTrip;
