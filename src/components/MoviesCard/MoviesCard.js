import React, { useState, useEffect } from 'react';
import './MoviesCard.css';
import mainApi from '../utils/MainApi';

const MoviesCard = ({ movie, location, saveMovies, setSaveMovies }) => {
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    const movieInSaved = saveMovies.find(savedMovie => savedMovie.movieId === movie.id);
    setIsLiked(!!movieInSaved);
  }, [saveMovies, movie.id]);

  const handleLikeDislikeClick = () => {
    if (!isLiked) {
      // Отправляем запрос на добавление фильма в избранное
      mainApi.addMovielike({ movie })
        .then((data) => {
          setSaveMovies([...saveMovies, data]); // Обновляем saveMovies после успешного добавления
          setIsLiked(true);
        })
        .catch((error) => {
          console.error('Ошибка при добавлении фильма в избранное:', error);
        });
    } else {
      const movieInSaved = saveMovies.find(savedMovie => savedMovie.movieId === movie.id);
      if (movieInSaved) {
        // Отправляем запрос на удаление фильма из избранного по _id
        mainApi.deleteMovielike(movieInSaved._id)
          .then(() => {
            setSaveMovies(saveMovies.filter(savedMovie => savedMovie.movieId !== movie.id)); // Обновляем saveMovies после успешного удаления
            setIsLiked(false);
          })
          .catch((error) => {
            console.error('Ошибка при удалении фильма из избранного:', error);
          });
      }
    }
  };
  const handleRemoveFromSaved = () => {
    mainApi.deleteMovielike(movie._id)
      .then((deletedMovie) => {
        setSaveMovies(saveMovies.filter(savedMovie => savedMovie.movieId !== deletedMovie.movieId)); // Обновляем saveMovies после успешного удаления
      })
      .catch((error) => {
        console.error('Ошибка при удалении фильма из избранного:', error);
      });
  }
  
  
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
        <img className="movies-card__poster" src={location.pathname === '/movies' ? `https://api.nomoreparties.co${movie.image.url}` : movie.image} alt={movie.nameRU} />
      </a>
      <h3 className="movies-card__title">{movie.nameRU}</h3>
      <p className="movies-card__duration">{formatDuration(movie.duration)}</p>
      {location.pathname === '/movies' ? (
        <button className={`${isLiked ? 'movies-card__like-button' : 'movies-card__dislike-button'}`} onClick={handleLikeDislikeClick}></button>
      ) : (
        <button className="movies-card__remove-button" onClick={handleRemoveFromSaved}></button>
      )}
    </li>
  );
};

export default MoviesCard;
