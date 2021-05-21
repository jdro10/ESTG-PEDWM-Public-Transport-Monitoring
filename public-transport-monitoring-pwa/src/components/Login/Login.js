import './login.css'
import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
    return (
        <div id="loginDiv" className="Login">
            <Form>
                <Form.Group id="input" size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoFocus placeholder="examplo@gmail.com" />
                </Form.Group>
                <Form.Group id="input" size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="********" />
                </Form.Group>
                <Button variant="success" block size="lg" type="submit"> Login </Button>
                <div id="signupMsg">
                    <Form.Label>Não tem uma conta? <Link to='/signup'>Registe-se aqui.</Link></Form.Label>
                </div>
            </Form>
        </div>
    )
}

export default Login
