// SavedMovies.js
import React, { useState, useEffect, useRef } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

const SavedMovies = ({ saveMovies, setSaveMovies, error, setError, loading, setLoading, isAuthenticated, navigate, handleNavigationButtonClick, location, isNavigationPopupOpen, closeAllPopups }) => {
  const [saveSearchQuery, setSaveSearchQuery] = useState('');
  const [saveShortMoviesOnly, setSaveShortMoviesOnly] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [saveFilteredMovies, setSaveFilteredMovies] = useState([]);
  const [saveSearcError, setSaveSearchError] = useState('');
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  useEffect(() => {
    // Установить флаг "компонент смонтирован" после первого рендера
    setIsComponentMounted(true);
  }, []);
  
  const handleSearchMoviesSave = () => {
    const filterMovies = () => {
      return saveMovies.filter((movie) => {
        const titleIncludesQuery = movie.nameRU.toLowerCase().includes(saveSearchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(saveSearchQuery.toLowerCase());
        const isShortMovie = saveShortMoviesOnly ? movie.duration <= 40 : true;
  
        return titleIncludesQuery && isShortMovie;
      });
    };
    setSaveFilteredMovies(filterMovies);
    setIsSearchPerformed(true);
  };

  const handleSearch = async () => {
    // Ручная валидация перед запросом на сервер
    if (saveSearchQuery.trim().length < 1) {
      // Минимальная длина запроса - 2 символа
      setSaveSearchError('Нужно ввести ключевое слово');
      return;
    }

    setSaveSearchError('');

    handleSearchMoviesSave();
  };

  useEffect(() => {
    // Выполнить поиск только если компонент смонтирован
    if (isComponentMounted) {
      handleSearch();
    }
  }, [saveShortMoviesOnly, saveMovies]);
  useEffect(() => {
    // Выполнить поиск только если компонент смонтирован
    if (isComponentMounted) {
      setSaveSearchError('');
    }
  }, [saveMovies]);
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} navigate={navigate} handleNavigationButtonClick={handleNavigationButtonClick} location={location} />
      <main>
        <SearchForm onSearch={handleSearch}>
        <input
              id="saveSearchQuery"
              type="text"
              placeholder="Фильм"
              value={saveSearchQuery}
              onChange={(e) => setSaveSearchQuery(e.target.value)}
              className="search-form__input"
              required
            />
          <div className="search-form__divider"></div>
          <label className="search-form__label">
            <input
              type="checkbox"
              checked={saveShortMoviesOnly}
              onChange={() => setSaveShortMoviesOnly(!saveShortMoviesOnly)}
              className="search-form__checkbox"
            />
            <span className="search-form__custom-checkbox"></span>
            Короткометражки
          </label>
          {saveSearcError && <span className="search-form__input-error">{saveSearcError}</span>}
        </SearchForm>
        {loading ? (
          <Preloader />
        ) : (
          <MoviesCardList setSaveSearchError={setSaveSearchError} handleSearch={handleSearch} saveFilteredMovies={saveFilteredMovies} setSaveFilteredMovies={setSaveFilteredMovies} saveMovies={saveMovies} setSaveMovies={setSaveMovies} movies={isSearchPerformed ? saveFilteredMovies : saveMovies} location={location} />
        )}
        {error ? (
          <p className="error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        ) : (
          (isSearchPerformed && saveFilteredMovies.length === 0) && <p className="not-found-message">Ничего не найдено</p>
        )}
      </main>
      <Footer />
      <Navigation isNavigationPopupOpen={isNavigationPopupOpen} location={location} closeAllPopups={closeAllPopups} />
    </>
  );
};

export default SavedMovies;