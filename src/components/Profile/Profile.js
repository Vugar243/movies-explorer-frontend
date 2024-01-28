import React, { useState } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

const Profile = ({ navigate, isAuthenticated, handleNavigationButtonClick, location, isNavigationPopupOpen, closeAllPopups }) => {
  const [name, setName] = useState(''); // Состояние для имени
  const [email, setEmail] = useState(''); // Состояние для почты
  const [isEditing, setIsEditing] = useState(false); // Состояние для режима редактирования

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEditing(false); // Выход из режима редактирования после сохранения
  };

  return (
    <>
      <Header navigate={navigate} isAuthenticated={isAuthenticated} handleNavigationButtonClick={handleNavigationButtonClick} location={location} />
      <main>
        <form noValidate className="profile-form" onSubmit={handleSubmit}>
          <h1 className="profile-form__title">Привет, Виталий!</h1>
          <div className="profile-form__input-wrapper">
            <label className="profile-form__label" htmlFor="input-name">
              Имя
            </label>
            <input
              id="input-name"
              className="profile-form__input"
              type="text"
              value={name}
              onChange={handleNameChange}
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
              value={email}
              onChange={handleEmailChange}
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
              <button type="button" className="profile-form__exit-button">Выйти из аккаунта</button>
            </>
          )}
        </form>
      </main>
      <Navigation isNavigationPopupOpen={isNavigationPopupOpen}  location={location} closeAllPopups={closeAllPopups} />
    </>
  );
};

export default Profile;
