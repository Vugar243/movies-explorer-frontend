// import Preloader from '../Preloader/Preloader';
import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import dummyMovies from '../utils/moviesCard';
import Navigation from '../Navigation/Navigation';


const Movies = ({isAuthenticated, navigate, handleNavigationButtonClick, location, isNavigationPopupOpen, closeAllPopups}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Header isAuthenticated={isAuthenticated} navigate={navigate} handleNavigationButtonClick={handleNavigationButtonClick} location={location}/>
      <SearchForm />
      {loading ? <Preloader /> : <MoviesCardList movies={dummyMovies} location={location} />}
      <button className="movies-button-load-more">Ещё</button>
      <Footer />
      <Navigation isNavigationPopupOpen={isNavigationPopupOpen}  location={location} closeAllPopups={closeAllPopups} />
    </>
  );
};

export default Movies;
