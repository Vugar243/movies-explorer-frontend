import React from 'react';
import './Register.css';
import AuthForm from '../AuthForm/AuthForm';

const Register = ({navigate}) => {
  const handleProfileButtonClick =  (window.innerWidth <= 320) ;
  const registerInputs = [
    { type: 'text', /*placeholder: 'Имя',*/ labelText: 'Имя' },
    { type: 'email', /*placeholder: 'Email',*/ labelText: 'E-mail' },
    { type: 'password', /*placeholder: 'Пароль',*/ labelText: 'Пароль'  },
  ];
  return (
    <AuthForm submitButtonClass="auth-form__submit-btn-register"  navigate={navigate} title="Добро пожаловать!" submitButtonText="Зарегистрироваться" link="/signin" inputs={registerInputs} linkText="Войти" text="Уже зарегистрированы?" />
  );
}

export default Register;