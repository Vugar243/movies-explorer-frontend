import React, { useState } from 'react';
import './MoviesCard.css';

const MoviesCard = ({ movie, location }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeDislikeClick = () => {
    setIsLiked(!isLiked);
  };
  return (
    <li className="movies-card">
      <img className="movies-card__poster" src={movie.poster} alt={movie.title} />
      <h3 className="movies-card__title">{movie.title}</h3>
      <p className="movies-card__duration">{movie.duration}</p>
      {location.pathname === '/movies' ? (
        <button className={`${isLiked ? 'movies-card__like-button' : 'movies-card__dislike-button'}`} onClick={handleLikeDislikeClick}></button>
      ) : (
        <button className="movies-card__remove-button"></button>
      )}
    </li>
  );
};

export default MoviesCard;
