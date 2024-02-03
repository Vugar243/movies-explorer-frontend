import React, { useState, useContext } from 'react';
import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import CurrentUserContext from '../Contexts/CurrentUserContext';

const Login = ({navigate, handleLogin, setCurrentUser}) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main>
      <AuthForm 
        onFormSubmit={handleLogin} 
        submitButtonClass="auth-form__submit-btn-login" 
        navigate={navigate} 
        title="Рады видеть!" 
        submitButtonText="Войти" 
        link="/signup" 
        linkText="Регистрация" 
        text="Ещё не зарегистрированы?"
      >
        <div className="auth-form__input-wrapper">
          <label className="auth-form__label">E-mail</label>
          <input
            id=""
            className="auth-form__input"
            type="email"
            placeholder="Email"
            required
            minLength="2"
            maxLength="40"
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            value={currentUser.email}
          />
        </div>
        <div className="auth-form__input-wrapper">
          <label className="auth-form__label">Пароль</label>
          <input
            id=""
            className="auth-form__input"
            type="password"
            placeholder="Пароль"
            required
            minLength="2"
            maxLength="40"
            onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
            value={currentUser.password}
          />
        </div>
      </AuthForm>
    </main>
  );
}

export default Login;