import './login.css'
import React , { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Login = () => {
    const storedJwt = localStorage.getItem('token');
    const [jwt ,setJwt] = useState(storedJwt || null);


    const getJwt = async () => {
        const res = await fetch('http://localhost:8080/login',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({"username": "user02",
            "password": "123"})
        })

        const test = await res.json()
        console.log(test)
        console.log('fiz pedido')
        
        localStorage.setItem('token', test.token);
        
        setJwt(test.token);
        console.log(test.token)
      };

    return (
        <div id="loginDiv" className="Login">
            <Form>
                <Form.Group id="input" size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control/>
                </Form.Group>
                <Form.Group id="input" size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"/>
                </Form.Group>
                <Button onClick={() => getJwt()} variant="success" block size="lg" > Login </Button>
                <div id="signupMsg">
                    <Form.Label>Não tem uma conta? <a href="/">Registe-se aqui.</a></Form.Label> {/*mudar para Link depois */}
                </div>
            </Form>
        </div>
    )
}



export default Login
