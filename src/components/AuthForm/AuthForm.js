import React from 'react';
import './AuthForm.css';
import { Link } from 'react-router-dom';

const AuthForm = ({ title, submitButtonText, onFormSubmit, link, inputs, linkText, text, navigate, submitButtonClass }) => {
  return (
    <div className="auth-form">
      <div className="auth-form__logo" onClick={() => navigate('/')} role="button"></div>
      <h1 className="auth-form__title">{title}</h1>
      <form className="auth-form__form" onSubmit={onFormSubmit}>
        {inputs.map((input, index) => (
          <div key={index} className="auth-form__input-wrapper">
            <label className="auth-form__label" htmlFor={input.id || `input-${index}`}>
              {input.labelText}
            </label>
            <input
              id={input.id || `input-${index}`}
              className="auth-form__input"
              type={input.type}
              placeholder={input.placeholder}
              required
              minlength={input.minlength}
              maxlength={input.maxlength}
            />
          </div>
        ))}
        <button type="submit" className={submitButtonClass}>{submitButtonText}</button>
        <p className="auth-form__text">{text} <Link to={link} href="#" className="auth-form__link">{linkText}</Link></p>
      </form>
    </div>
  );
}

export default AuthForm;



