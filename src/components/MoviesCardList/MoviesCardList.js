import React, { useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies, location, saveMovies, setSaveMovies,}) => {
  return (
    <section className="section-movies">
      <ul className="movies-card-list">
        {movies.map((movie) => (
          <MoviesCard saveMovies={saveMovies} setSaveMovies={setSaveMovies} key={location === 'movies' ? movie._id : movie._id} movie={movie} location={location} />
        ))}
      </ul>
    </section>
  );
};

export default MoviesCardList;

