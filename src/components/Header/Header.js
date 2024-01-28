import React from 'react';
import './Header.css';
import Navbar from '../Navbar/Navbar';
function Header({ isAuthenticated, navigate, handleNavigationButtonClick, location }) {
  const navigationItems = isAuthenticated
  ? [
      { title: 'Фильмы', link: '/movies' },
      { title: 'Сохраненные фильмы', link: '/saved-movies' },
    ]
  : [
      { title: 'Регистрация', link: '/signup' },
      { title: 'Войти', link: '/signin' },
    ];
    const handleProfileButtonClick = () => {
      if (window.innerWidth <= 768) {
        handleNavigationButtonClick(); 
      } else {
        // Переход на страницу профиля на более крупных экранах
        navigate('/profile');
      }
    };
  return (
  <header className={`header ${isAuthenticated ? 'header_auth' : ''}`}>
    <div className="header__logo" onClick={() => navigate('/')}></div>
    <Navbar navigationItems={navigationItems} isAuthenticated={isAuthenticated} location={location}/> 
    {isAuthenticated && <button  className="header__profile" type="button" onClick={handleProfileButtonClick}>Аккаунт</button>}
  </header>
  );
}

export default Header;