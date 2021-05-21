import React from "react";
import "./header.css";


const Header = () => {
  return (
      <div>
        <ul className="navigation">
        <li>
            <a>Horários</a>
        </li>
        <li>
            <a>Bilhetes</a>
        </li>
        <li>
            <a>Como comprar</a>
        </li>
        <li>
            <a  style={{color: "#2ECC71"}}>
            Conta
            </a>
        </li>
        </ul>
        <section className="container">
            <div className="logo">
                <img src={'/imgs/TP.png'} alt="PTM" width="300px" height="150px"/>
            </div>
        </section>
    </div>
  )
}

export default Header
