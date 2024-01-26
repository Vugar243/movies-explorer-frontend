import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ isNavigationPopupOpen, location, closeAllPopups }) => {
  return (
    <div className={`popup ${isNavigationPopupOpen ? 'open-popup' : ''}`}>
      <nav className="navigation">
        <button className="navigation__close-button" onClick={closeAllPopups}></button>
        <ul className="navigation__list">
          <li className="navigation__item">
            <NavLink to="/" className={`navigation__link ${location.pathname === '/' ? 'navigation-link_active' : ''}`} onClick={closeAllPopups}>Главная</NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to="/movies" className={`navigation__link ${location.pathname === '/movies' ? 'navigation-link_active' : ''}`}onClick={closeAllPopups}>Фильмы</NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to="/saved-movies" className={`navigation__link ${location.pathname === '/saved-movies' ? 'navigation-link_active' : ''}`}onClick={closeAllPopups}>Сохранённые фильмы</NavLink>
          </li>
          <li className="navigation__item">
          <NavLink to="/profile" className="navigation__link" onClick={closeAllPopups}></NavLink>
          </li>
        </ul>
      </nav>
    </div>  
  );
}

export default Navigation;

