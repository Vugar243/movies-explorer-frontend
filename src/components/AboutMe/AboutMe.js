import React from 'react';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <h3 className="about-me__subtitle">Виталий</h3>
      <p className="about-me__description">Фронтенд-разработчик, 30 лет</p>
      <p className="about-me__additional-info">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
      <a className="about-me__link" href="https://github.com/Vugar243">Github</a>
      <div className="about-me__image"></div>
      <h4 className="about-me__portfolio-title">Портфолио</h4>
      <ul className="about-me__list">
        <li className="about-me__item">
          <a className="about-me__item-link" href="https://vugar243.github.io/how-to-learn/">Статичный сайт<p className="about-me__link-icon">↗</p></a>
        </li>
        <li className="about-me__item">
          <a className="about-me__item-link" href="https://vugar243.github.io/russian-travel/">Адаптивный сайт<p className="about-me__link-icon">↗</p></a>
        </li>
        <li className="about-me__item">
          <a className="about-me__item-link" href="https://vugar.nomoredomainsmonster.ru">Одностраничное приложение<p className="about-me__link-icon">↗</p></a>
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;