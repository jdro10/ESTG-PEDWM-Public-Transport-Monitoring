import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUp = () => {
    return (
        <div id="signUpDiv" className="Login">
            <Form>
                <Form.Group id="input" size="lg">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="exemplo123"/>
                </Form.Group>
                    <Form.Group id="input" size="lg">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="exemplo@gmail.com"/>
                </Form.Group>
                <Form.Group id="input" size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="********"/>
                </Form.Group>
                <Button variant="success" block size="lg" type="submit"> Registar </Button>
                <div id="signupMsg">
                    <Form.Label>Já está registado? <Link to='/'>Faça login aqui.</Link></Form.Label>
                </div>
            </Form>
        </div>
    )
}

export default SignUp
