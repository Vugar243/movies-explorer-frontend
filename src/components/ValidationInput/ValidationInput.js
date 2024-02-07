import React, { useEffect, useState } from 'react';

const ValidationInput = ({ id, cssClassError, readOnly, label, type, placeholder, required, minLength, maxLength, onChange, value, cssClass }) => {
  const [error, setError] = useState('');

  useEffect(() => {
    const validate = () => {
      if (required && !value) {
        return 'Это поле обязательно для заполнения';
      }

      if (minLength && value.length < parseInt(minLength, 10)) {
        return `Минимальная длина ${minLength} символов`;
      }

      if (maxLength && value.length > parseInt(maxLength, 10)) {
        return `Максимальная длина ${maxLength} символов`;
      }

      if (type === 'email' && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          return 'Введите корректный адрес электронной почты';
        }
      }

      return '';
    };

    const validationError = validate();
    setError(validationError);
    onChange(value, validationError);
  }, [value, required, minLength, maxLength, type]);
  

  return (
    <>
      <input
        id={id}
        className={cssClass}  // Добавляем класс ошибки, если ошибка присутствует
        type={type}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value, error)}
        value={value}
        readOnly={readOnly}
      />
      {error && <span className={cssClassError}>{error}</span>}
    </>
  );
};

export default ValidationInput;




