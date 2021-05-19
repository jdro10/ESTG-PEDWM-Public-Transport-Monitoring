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
                <img src={'/imgs/PTM.jpg'} alt="PTM"/>
            </div>
            <div class="slogan">
                <label style={{fontFamily: "Brush Script MT", color: "#4F7942", fontSize:"25px" }}>O seu meio de transporte favorito...</label>
            </div>
        </section>
    </div>
  )
}

export default Header
