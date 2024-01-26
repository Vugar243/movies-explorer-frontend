import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section id="aboutProject" className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__list">
        <li className="about-project__info">
          <h3 className="about-project__info-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__info-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__stage">
          <h3 className="about-project__stage-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__stage-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="about-project__timeline">
        <h3 className="about-project__timeline-item">1 неделя</h3>
        <h3 className="about-project__timeline-item">4 недели</h3>
      </div>
      <div className="about-project__skills">
        <p className="about-project__skill">Front-end</p>
        <p className="about-project__skill">Back-end</p>
      </div>
    </section>
  );
}

export default AboutProject;