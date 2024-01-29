import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies, location }) => {
  return (
    <section className="section-movies">
      <ul className="movies-card-list">
        {movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} location={location} />
        ))}
      </ul>
    </section>
  );
};

export default MoviesCardList;

