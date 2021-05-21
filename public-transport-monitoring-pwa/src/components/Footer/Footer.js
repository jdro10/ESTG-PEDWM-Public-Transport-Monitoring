import React from "react";
import "./footer.css";
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
  return (
    <footer>
      <section className="ft-main">
        <div className="ft-main-item">
          <h2 className="ft-title">Sobre</h2>
          <ul>
            <li>
              <a>Paragens</a>
            </li>
            <li>
              <a>Vantagens</a>
            </li>
            <li>
              <a>Pontos de venda</a>
            </li>
            <li>
              <a>Descontos</a>
            </li>
          </ul>
        </div>

        <div className="ft-main-item">
          <h2 className="ft-title">Alguma dúvida?</h2>
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

      <section className="ft-social">
        <ul className="ft-social-list">
          <li>
            <a>
              <i className="fa fa-facebook"></i>
            </a>
          </li>
          <li>
            <a>
              <i className="fa fa-youtube"></i>
            </a>
          </li>
          <li>
            <a>
              <i className="fa fa-instagram"></i>
            </a>
          </li>
        </ul>
      </section>

      <section className="ft-legal">
        <ul className="ft-legal-list">
          <li>
            <a>Termos e Condições</a>
          </li>
          <li>
            <a>Política de Privacidade</a>
          </li>
          <li>&copy; 2021 Copyright PTM</li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
