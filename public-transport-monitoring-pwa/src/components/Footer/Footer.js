import React from "react";
import "./footer.css";
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
  return (
    <footer>
      <section class="ft-main">
        <div class="ft-main-item">
          <h2 class="ft-title">Sobre</h2>
          <ul>
            <li>
              <a href="#">Paragens</a>
            </li>
            <li>
              <a href="#">Vantagens</a>
            </li>
            <li>
              <a href="#">Pontos de venda</a>
            </li>
            <li>
              <a href="#">Descontos</a>
            </li>
          </ul>
        </div>

        <div class="ft-main-item">
          <h2 class="ft-title">Alguma dúvida?</h2>
          <p>Insere o email e nós contactamos!</p>
          <form>
            <input
              type="email"
              name="email"
              placeholder="Introduz o teu email"
            />
            <input type="submit" value="Submeter" />
          </form>
        </div>
      </section>

      <section class="ft-social">
        <ul class="ft-social-list">
          <li>
            <a href="#">
              <i class="fa fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-youtube"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-instagram"></i>
            </a>
          </li>
        </ul>
      </section>

      <section class="ft-legal">
        <ul class="ft-legal-list">
          <li>
            <a href="#">Termos e Condições</a>
          </li>
          <li>
            <a href="#">Política de Privacidade</a>
          </li>
          <li>&copy; 2021 Copyright PTM</li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
