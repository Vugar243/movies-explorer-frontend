import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <p className="footer__copyright">&copy; 2024</p>
      <ul className="footer__list">
        <li className="footer__item">
          <a className="footer__item-link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
        </li>
        <li className="footer__item">
          <a className="footer__item-link" href="https://github.com/">Github</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;