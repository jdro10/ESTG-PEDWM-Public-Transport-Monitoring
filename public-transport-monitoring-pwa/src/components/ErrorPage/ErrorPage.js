import React from 'react'
import { Button } from 'react-bootstrap'
import './errorpage.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="containerDiv">
            <h1>Não tem previlégios para aceder a esta página.</h1>
            <Link to="/searchtrip" ><Button variant="warning">Voltar à página inicial.</Button></Link>
        </div>
    )
}

export default ErrorPage
