// SavedMovies.js
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import dummyMovies from '../utils/moviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

const SavedMovies = ({isAuthenticated, navigate, handleNavigationButtonClick, location, isNavigationPopupOpen, closeAllPopups}) => {
  const [savedMovies, setSavedMovies] = useState([]);


  return (
    <>
      <Header isAuthenticated={isAuthenticated} navigate={navigate} handleNavigationButtonClick={handleNavigationButtonClick} location={location} />
      <main>
        <SearchForm />
        <MoviesCardList movies={dummyMovies} location={location} />
      </main>
      <Footer />
      <Navigation isNavigationPopupOpen={isNavigationPopupOpen}  location={location} closeAllPopups={closeAllPopups} />
    </>
  );
};

export default SavedMovies;
