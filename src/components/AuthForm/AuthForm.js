import React from 'react';
import './AuthForm.css';
import { Link } from 'react-router-dom';

const AuthForm = ({ disabled, title, submitButtonText, onFormSubmit, link, children, linkText, text, navigate, submitButtonClass }) => {
  return (
    <div className="auth-form">
      <div className="auth-form__logo" onClick={() => navigate('/')} role="button"></div>
      <h1 className="auth-form__title">{title}</h1>
      <form noValidate className="auth-form__form" onSubmit={onFormSubmit}>
        {children}
        <button type="submit"disabled={disabled} className={submitButtonClass}>{submitButtonText}</button>
        <p className="auth-form__text">{text} <Link to={link} href="#" className="auth-form__link">{linkText}</Link></p>
      </form>
    </div>
  );
}

export default AuthForm;



