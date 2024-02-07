import React, { useContext, useState } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import ValidationInput from '../ValidationInput/ValidationInput';
import CurrentUserContext from '../Contexts/CurrentUserContext';

const Profile = ({ setIsAuthenticated, navigate, isAuthenticated, handleNavigationButtonClick, location, isNavigationPopupOpen, closeAllPopups, setCurrentUser, handleUpdateUser, isEditing, setIsEditing }) => {

  const currentUser = useContext(CurrentUserContext);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

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

  const handleUpdateUserValidation = (e) => {
    // Валидация перед отправкой формы
    if (currentUser.name.length < 2) {
      setNameError('Имя должно содержать минимум 2 символа');
      setIsFormValid(false);
    } else {
      setNameError('');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(currentUser.email)) {
      setEmailError('Введите корректный адрес электронной почты');
      setIsFormValid(false);
    } else {
      setEmailError('');
    }

    // Если есть ошибки, прекратить выполнение
    if (nameError || emailError) {
      e.preventDefault();
      return;
    }

    // Если ошибок нет, продолжить сабмит
    handleUpdateUser(e);
  };

  return (
    <>
      <Header navigate={navigate} isAuthenticated={isAuthenticated} handleNavigationButtonClick={handleNavigationButtonClick} location={location} />
      <main>
        <form noValidate className="profile-form" onSubmit={handleUpdateUserValidation}>
          <h1 className="profile-form__title">Привет, {storedUserInfo}!</h1>
          <div className="profile-form__input-wrapper">
            <label className="profile-form__label" htmlFor="input-name">
              Имя
            </label>
            <ValidationInput
              id="input-name"
              label="Имя"
              type="text"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="40"
              onChange={(value, error) => {
                setCurrentUser({ ...currentUser, name: value });
                setNameError(error);
                setIsFormValid(!error);
              }}
              value={currentUser.name}
              error={nameError}
              cssClass="profile-form__input"
              errorText={nameError}
              cssClassError="profile-form__input-error"
              readOnly={!isEditing}
            />
          </div>
          <div className="profile-form__input-wrapper">
            <label className="profile-form__label" htmlFor="input-email">
              E-mail
            </label>
            <ValidationInput
              id="input-email"
              label="E-mail"
              type="email"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              onChange={(value, error) => {
                setCurrentUser({ ...currentUser, email: value });
                setEmailError(error);
                setIsFormValid(!error);
              }}
              value={currentUser.email}
              error={emailError}
              cssClass="profile-form__input"
              cssClassError="profile-form__input-error"
              readOnly={!isEditing}
            />
          </div>
          {isEditing ? (
            <button type="submit" className="profile-form__save-button" disabled={!isFormValid}>
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
      <Navigation isNavigationPopupOpen={isNavigationPopupOpen} location={location} closeAllPopups={closeAllPopups} />
    </>
  );
};

export default Profile;
