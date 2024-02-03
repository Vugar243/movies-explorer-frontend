import React, { useState, useContext } from 'react';
import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import CurrentUserContext from '../Contexts/CurrentUserContext';

const Register = ({navigate, setCurrentUser, handleRegister}) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main>
      <AuthForm
        onFormSubmit={handleRegister} 
        submitButtonClass="auth-form__submit-btn-register"
        navigate={navigate} 
        title="Добро пожаловать!" 
        submitButtonText="Зарегистрироваться" 
        link="/signin" 
        linkText="Войти" 
        text="Уже зарегистрированы?"
      >
        <div className="auth-form__input-wrapper">
          <label className="auth-form__label">Имя</label>
          <input
            id=""
            className="auth-form__input"
            type="text"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
            value={currentUser.name}
          />
        </div>
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

export default Register;