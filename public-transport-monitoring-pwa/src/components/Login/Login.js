import './login.css'
import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Login = () => {
    return (
        <div id="loginDiv" className="Login">
            <Form>
                <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email"/>
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"/>
                </Form.Group>
                <Button variant="success" block size="lg" type="submit"> Login </Button>
                <div id="signupMsg">
                    <Form.Label>Não tem uma conta? <a href="/">Registe-se aqui.</a></Form.Label> {/*mudar para Link depois */}
                </div>
            </Form>
        </div>
    )
}

export default Login
