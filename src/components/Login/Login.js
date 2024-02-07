import React, { useContext, useState, useEffect } from 'react';
import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import CurrentUserContext from '../Contexts/CurrentUserContext';
import ValidationInput from '../ValidationInput/ValidationInput';

const Login = ({ navigate, handleLogin, setCurrentUser }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (value, error) => {
    setCurrentUser({ ...currentUser, email: value });
    setEmailError(error);
  };

  const handlePasswordChange = (value, error) => {
    setCurrentUser({ ...currentUser, password: value });
    setPasswordError(error);
  };

  useEffect(() => {
    // Check for errors in each field
    const hasErrors = !!emailError || !!passwordError;

    // Update the form state based on error presence
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

export default Login;
