import React, { useState } from 'react';
import './MoviesCard.css';
import mainApi from '../utils/MainApi';

const MoviesCard = ({ movie, location }) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeDislikeClick = () => {
    // Инвертируем состояние лайка
    setIsLiked(!isLiked);

    // Отправляем запрос на добавление/удаление фильма в избранное
    if (!isLiked) {
      // Если фильм не лайкнут, отправляем запрос на добавление
      mainApi.addMovie(movie)
      console.log(movie)
        .then((data) => {
          console.log('Фильм добавлен в избранное:', data);
        })
        .catch((error) => {
          console.error('Ошибка при добавлении фильма в избранное:', error);
        });
    } else {
      // Если фильм уже лайкнут, отправляем запрос на удаление
      // Тут нужно реализовать метод в mainApi для удаления фильма из избранного
      // mainApi.removeMovie(movieId) или подобный
    }
  };
  const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedHours = hours > 0 ? `${hours}ч` : '';
  const formattedMinutes = remainingMinutes > 0 ? `${remainingMinutes}м` : '';

  return `${formattedHours} ${formattedMinutes}`;
};

  return (
    <li className="movies-card">
      <a className="movies-card__link" href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
        <img className="movies-card__poster" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
      </a>
      <h3 className="movies-card__title">{movie.nameRU}</h3>
      <p className="movies-card__duration">{formatDuration(movie.duration)}</p>
      {location.pathname === '/movies' ? (
        <button className={`${isLiked ? 'movies-card__like-button' : 'movies-card__dislike-button'}`} onClick={handleLikeDislikeClick}></button>
      ) : (
        <button className="movies-card__remove-button"></button>
      )}
    </li>
  );
};

export default MoviesCard;
