import React from 'react';
import './NotFound.css';
import { Link, useNavigate } from 'react-router-dom';


const NotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Переход на предыдущую страницу
  };
  return (
    <main>
      <div className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
        <Link className="not-found__link" onClick={handleGoBack}>Назад</Link>
      </div>
    </main>
  );
}

export default NotFound;