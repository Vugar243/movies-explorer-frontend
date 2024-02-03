// SavedMovies.js
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../utils/MoviesApi';

const SavedMovies = ({ isAuthenticated, navigate, handleNavigationButtonClick, location, isNavigationPopupOpen, closeAllPopups }) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // mainApi.getSavedMovies()
    //   .then((movies) => {
    //     setSavedMovies(movies);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error('Ошибка при загрузке сохранённых фильмов:', error);
    //     setLoading(false);
    //   });
  }, []);

  const handleSearch = (query, shortMoviesOnly) => {
    // Здесь должна быть логика поиска сохраненных фильмов
    // Вместо dummyMovies должны быть данные, полученные с сервера
    // Обновите состояние setSavedMovies
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} navigate={navigate} handleNavigationButtonClick={handleNavigationButtonClick} location={location} />
      <main>
        <SearchForm onSearch={handleSearch} />
        {loading ? <Preloader /> : <MoviesCardList movies={savedMovies} location={location} />}
      </main>
      <Footer />
      <Navigation isNavigationPopupOpen={isNavigationPopupOpen} location={location} closeAllPopups={closeAllPopups} />
    </>
  );
};

export default SavedMovies;

