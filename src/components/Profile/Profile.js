import React, { useContext } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import CurrentUserContext from '../Contexts/CurrentUserContext';

const Profile = ({ setIsAuthenticated, navigate, isAuthenticated, handleNavigationButtonClick, location, isNavigationPopupOpen, closeAllPopups, setCurrentUser, handleUpdateUser, isEditing, setIsEditing }) => {

  const currentUser = useContext(CurrentUserContext);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  
  

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('shortMoviesOnly');
    localStorage.removeItem('movies');
    navigate('/'); // Перенаправляем пользователя на главную страницу
  };
  let storedUserInfo = localStorage.getItem('userInfo');

  return (
    <>
      <Header navigate={navigate} isAuthenticated={isAuthenticated} handleNavigationButtonClick={handleNavigationButtonClick} location={location} />
      <main>
        <form noValidate className="profile-form" onSubmit={handleUpdateUser}>
          <h1 className="profile-form__title">Привет, {storedUserInfo}!</h1>
          <div className="profile-form__input-wrapper">
            <label className="profile-form__label" htmlFor="input-name">
              Имя
            </label>
            <input
              id="input-name"
              className="profile-form__input"
              type="text"
              value={currentUser.name}
              onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              readOnly={!isEditing}
              required
            />
          </div>
          <div className="profile-form__input-wrapper">
            <label className="profile-form__label" htmlFor="input-email">
              E-mail
            </label>
            <input
              id="input-email"
              className="profile-form__input"
              type="email"
              value={currentUser.email}
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              readOnly={!isEditing}
              required
            />
          </div>
          {isEditing ? (
            <button type="submit" className="profile-form__save-button">
              Сохранить
            </button>
          ) : (
            <>
              <button type="button" className="profile-form__edit-button" onClick={handleEditClick}>Редактировать{' '}</button>
              <button type="button" className="profile-form__exit-button" onClick={handleLogout}>Выйти из аккаунта</button>
            </>
          )}
        </form>
      </main>
      <Navigation isNavigationPopupOpen={isNavigationPopupOpen}  location={location} closeAllPopups={closeAllPopups} />
    </>
  );
};

export default Profile;
