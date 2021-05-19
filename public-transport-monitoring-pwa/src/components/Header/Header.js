import React from "react";
import "./header.css";


const Header = () => {
  return (
      <div>
        <ul class="navigation">
        <li>
            <a href="#">Horários</a>
        </li>
        <li>
            <a href="#">Bilhetes</a>
        </li>
        <li>
            <a href="#">Como comprar</a>
        </li>
        <li>
            <a href="#" style={{color: "#2ECC71"}}>
            Conta
            </a>
        </li>
        </ul>
        <section class="container">
            <div class="logo">
                <img src={'/imgs/PTM.jpg'} alt="PTM" width="200px" height="150px"/>
            </div>
        </section>
    </div>
  )
}

export default Header
