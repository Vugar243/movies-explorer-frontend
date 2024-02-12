import React, { useContext, useState, useEffect } from 'react';
import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import CurrentUserContext from '../Contexts/CurrentUserContext';

const Register = ({ navigate, setCurrentUser, handleRegister, registerError }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleNameChange = (value) => {
    setCurrentUser({ ...currentUser, name: value });

    // Валидация имени
    setNameError(value.length >= 2 ? '' : 'Имя должно содержать минимум 2 символа');
  };

  const handleEmailChange = (value) => {
    setCurrentUser({ ...currentUser, email: value });

    // Валидация email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailPattern.test(value) ? '' : 'Введите корректный адрес электронной почты');
  };

  const handlePasswordChange = (value) => {
    setCurrentUser({ ...currentUser, password: value });

    // Валидация пароля
    setPasswordError(value.length >= 2 ? '' : 'Пароль должен содержать минимум 2 символа');
  };

  useEffect(() => {
    // Проверка наличия ошибок в каждом поле
    const hasNameError = !!nameError;
    const hasEmailError = !!emailError;
    const hasPasswordError = !!passwordError;

    // Проверка наличия значений в каждом поле
    const hasNameValue = !!currentUser.name.trim();
    const hasEmailValue = !!currentUser.email.trim();
    const hasPasswordValue = !!currentUser.password.trim();

    // Обновление состояния формы в зависимости от наличия ошибок и значений
    setIsFormValid(!hasNameError && !hasEmailError && !hasPasswordError && hasNameValue && hasEmailValue && hasPasswordValue);
  }, [nameError, emailError, passwordError, currentUser]);

  return (
    <main>
      <AuthForm
        onFormSubmit={handleRegister}
        submitButtonClass="auth-form__submit-btn-register"
        navigate={navigate}
        disabled={!isFormValid}
        title="Добро пожаловать!"
        submitButtonText="Зарегистрироваться"
        link="/signin"
        linkText="Войти"
        text="Уже зарегистрированы?"
      >
        <div className="auth-form__input-wrapper">
          <label className="auth-form__label" htmlFor="name">
            Имя
          </label>
          <input
            id="name"
            type="text"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            onChange={(e) => handleNameChange(e.target.value)}
            value={currentUser.name}
            className="auth-form__input"
          />
          {nameError && <span className="auth-form__input-error">{nameError}</span>}
        </div>
        <div className="auth-form__input-wrapper">
          <label className="auth-form__label" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            required
            minLength="2"
            maxLength="40"
            onChange={(e) => handleEmailChange(e.target.value)}
            value={currentUser.email}
            className="auth-form__input"
          />
          {emailError && <span className="auth-form__input-error">{emailError}</span>}
        </div>
        <div className="auth-form__input-wrapper">
          <label className="auth-form__label" htmlFor="password">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            required
            minLength="2"
            maxLength="40"
            onChange={(e) => handlePasswordChange(e.target.value)}
            value={currentUser.password}
            className="auth-form__input"
          />
          {passwordError && <span className="auth-form__input-error">{passwordError}</span>}
        </div>
        {registerError && <span className="search-form__isprofile-updated">{registerError}</span>}
      </AuthForm>
    </main>
  );
};

export default Register;



