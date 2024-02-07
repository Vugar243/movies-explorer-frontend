import React, { useContext, useState, useEffect } from 'react';
import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import CurrentUserContext from '../Contexts/CurrentUserContext';
import ValidationInput from '../ValidationInput/ValidationInput';

const Register = ({ navigate, setCurrentUser, handleRegister }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleNameChange = (value, error) => {
    setCurrentUser({ ...currentUser, name: value });
    setNameError(error);
  };

  const handleEmailChange = (value, error) => {
    setCurrentUser({ ...currentUser, email: value });
    setEmailError(error);
  };

  const handlePasswordChange = (value, error) => {
    setCurrentUser({ ...currentUser, password: value });
    setPasswordError(error);
  };

  useEffect(() => {
    // Проверка наличия ошибок в каждом поле
    const hasErrors = !!nameError || !!emailError || !!passwordError;

    // Обновление состояния формы в зависимости от наличия ошибок
    setIsFormValid(!hasErrors);
  }, [nameError, emailError, passwordError]);

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
        <ValidationInput
          id="name"
          label="Имя"
          type="text"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleNameChange}
          value={currentUser.name}
          cssClass="auth-form__input"
          cssClassError="auth-form__input-error"
          error={nameError}
        />

        <ValidationInput
          id="email"
          label="E-mail"
          type="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          onChange={handleEmailChange}
          value={currentUser.email}
          cssClass="auth-form__input"
          cssClassError="auth-form__input-error"
          error={emailError}
        />

        <ValidationInput
          id="password"
          label="Пароль"
          type="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="40"
          onChange={handlePasswordChange}
          value={currentUser.password}
          cssClass="auth-form__input"
          cssClassError="auth-form__input-error"
          error={passwordError}
        />
      </AuthForm>
    </main>
  );
};

export default Register;


