import React, { useContext, useState, useEffect } from 'react';
import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import CurrentUserContext from '../Contexts/CurrentUserContext';

const Login = ({ navigate, handleLogin, setCurrentUser }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
    const hasErrors = !!emailError || !!passwordError;

    // Обновление состояния формы на основе наличия ошибок
    setIsFormValid(!hasErrors);
  }, [emailError, passwordError]);

  return (
    <main>
      <AuthForm
        onFormSubmit={handleLogin}
        submitButtonClass="auth-form__submit-btn-login"
        navigate={navigate}
        disabled={!isFormValid}
        title="Рады видеть!"
        submitButtonText="Войти"
        link="/signup"
        linkText="Регистрация"
        text="Ещё не зарегистрированы?"
      >
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
      </AuthForm>
    </main>
  );
};

export default Login;

