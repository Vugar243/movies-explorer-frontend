import React from 'react';
import './Login.css';
import AuthForm from '../AuthForm/AuthForm';

const Login = ({navigate}) => {
  const loginInputs = [
    { type: 'email', placeholder: 'Email', labelText: 'E-mail' },
    { type: 'password', placeholder: 'Пароль', labelText: 'Пароль', minlength: '2', maxlength: '40' },
  ];
  return (
    <main>
      <AuthForm submitButtonClass="auth-form__submit-btn-login" navigate={navigate} title="Рады видеть!" submitButtonText="Войти" link="/signup" inputs={loginInputs} linkText="Регистрация" text="Ещё не зарегистрированы?" />
    </main>
  );
}

export default Login;