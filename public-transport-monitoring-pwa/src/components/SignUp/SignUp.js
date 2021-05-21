import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = async (username, email, password) => {
        const req = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "userName": username,
                "password": password,
                "email": email
            })
        });

        const res = await req.json()

        alert("registado!" + res.id);
    }

    return (
        <div id="signUpDiv" className="Login">
            <Form>
                <Form.Group id="input" size="lg">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="exemplo123" value={username} onChange={(e) => setUsername(e.currentTarget.value) }/>
                </Form.Group>
                    <Form.Group id="input" size="lg">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="exemplo@gmail.com" value={email} onChange={(e) => setEmail(e.currentTarget.value) }/>
                </Form.Group>
                <Form.Group id="input" size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.currentTarget.value) }/>
                </Form.Group>
                <Button onClick={() => signUp(username, email, password)} variant="success" block size="lg" type="submit"> Registar </Button>
                <div id="signupMsg">
                    <Form.Label>Já está registado? <Link to='/'>Faça login aqui.</Link></Form.Label>
                </div>
            </Form>
        </div>
    )
}

export default SignUp
