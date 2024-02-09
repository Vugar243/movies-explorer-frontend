import React, { useContext, useState, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import CurrentUserContext from '../Contexts/CurrentUserContext';

const Profile = ({
  setIsAuthenticated,
  navigate,
  isAuthenticated,
  handleNavigationButtonClick,
  location,
  isNavigationPopupOpen,
  closeAllPopups,
  setCurrentUser,
  handleUpdateUser,
  isEditing,
  setIsEditing,
  isProfileUpdated
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    // Проверяем, изменились ли данные профиля
    const isNameChanged = currentUser.name !== currentUser.originalName;
    const isEmailChanged = currentUser.email !== currentUser.originalEmail;
    setIsFormValid(isNameChanged || isEmailChanged);
  }, [currentUser]);


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
    const nameValidation = currentUser.name.length >= 2;
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentUser.email);

    setNameError(nameValidation ? '' : 'Имя должно содержать минимум 2 символа');
    setEmailError(emailValidation ? '' : 'Введите корректный адрес электронной почты');
    setIsFormValid(nameValidation && emailValidation);

    // Если есть ошибки, прекратить выполнение
    if (!nameValidation || !emailValidation) {
      e.preventDefault();
      return;
    }

    // Если ошибок нет, продолжить сабмит
    handleUpdateUser(e);
  };

  return (
    <>
      <Header
        navigate={navigate}
        isAuthenticated={isAuthenticated}
        handleNavigationButtonClick={handleNavigationButtonClick}
        location={location}
      />
      <main>
        <form noValidate className="profile-form" onSubmit={handleUpdateUserValidation}>
          <h1 className="profile-form__title">Привет, {storedUserInfo}!</h1>
          <div className="profile-form__input-wrapper">
            <label className="profile-form__label" htmlFor="input-name">
              Имя
            </label>
            <input
              id="input-name"
              type="text"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="40"
              onChange={(e) => {
                setCurrentUser({ ...currentUser, name: e.target.value });
                setNameError(e.target.value.length >= 2 ? '' : 'Имя должно содержать минимум 2 символа');
                setIsFormValid(e.target.value.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentUser.email));
              }}
              value={currentUser.name}
              className="profile-form__input"
              readOnly={!isEditing}
            />
            {nameError && <span className="profile-form__input-error">{nameError}</span>}
          </div>
          <div className="profile-form__input-wrapper">
            <label className="profile-form__label" htmlFor="input-email">
              E-mail
            </label>
            <input
              id="input-email"
              type="email"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              onChange={(e) => {
                setCurrentUser({ ...currentUser, email: e.target.value });
                setEmailError(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value) ? '' : 'Введите корректный адрес электронной почты');
                setIsFormValid(currentUser.name.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value));
              }}
              value={currentUser.email}
              className="profile-form__input"
              readOnly={!isEditing}
            />
            {emailError && <span className="profile-form__input-error">{emailError}</span>}
          </div>
          {isProfileUpdated && <span className="search-form__isprofile-updated">{isProfileUpdated}</span>}
          {isEditing ? (
            <button type="submit" className="profile-form__save-button" disabled={!isFormValid}>
              Сохранить
            </button>
          ) : (
            <>
              <button type="button" className="profile-form__edit-button" onClick={handleEditClick}>
                Редактировать{' '}
              </button>
              <button type="button" className="profile-form__exit-button" onClick={handleLogout}>
                Выйти из аккаунта
              </button>
            </>
          )}
        </form>
      </main>
      <Navigation isNavigationPopupOpen={isNavigationPopupOpen} location={location} closeAllPopups={closeAllPopups} />
    </>
  );
};

export default Profile;

