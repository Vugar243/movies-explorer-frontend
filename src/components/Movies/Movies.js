import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import { handleSearchMovies } from '../utils/moviesApiUtils';
import mainApi from '../utils/MainApi';

const Movies = ({ shortMoviesOnly, setShortMoviesOnly, error, setError, searchQuery, setSearchQuery, filteredMovies, setFilteredMovies, loading, setLoading, isAuthenticated, navigate, handleNavigationButtonClick, location, isNavigationPopupOpen, closeAllPopups }) => {
  const [cardsPerRow, setCardsPerRow] = useState(4);
  const [visibleCards, setVisibleCards] = useState(cardsPerRow);
  const [loadMoreCards, setLoadMoreCards] = useState(2);  
  const [saveMovies, setSaveMovies] = useState([]);
  useEffect(() => {
    // Fetch initial movies when the component mounts

    const storedSearchQuery = localStorage.getItem('searchQuery');
    const storedShortMoviesOnly = localStorage.getItem('shortMoviesOnly') === 'true';
    const storedMovies = JSON.parse(localStorage.getItem('movies'));

    if (storedSearchQuery || storedShortMoviesOnly || storedMovies) {
      setSearchQuery(storedSearchQuery);
      setShortMoviesOnly(storedShortMoviesOnly);
      setFilteredMovies(storedMovies);
    }

  // Добавлен слушатель событий resize для отслеживания изменения размера экрана
  const handleResize = () => {
    // Установка таймера для вызова функции через 300 миллисекунд после окончания изменений размера
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateVisibleCards();
    }, 800);
  };

  let resizeTimer; // Переменная для хранения таймера

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
  }, []);
  useEffect(() => {
    mainApi.getInitialMovies()
      .then((data) => {
        setSaveMovies(data);
      })
      .catch((error) => {
        console.error('Error fetching initial movies:', error);
      });
  }, []);
  

  // Обновление количества видимых карточек в зависимости от ширины экрана
  const updateVisibleCards = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1280) {
      setCardsPerRow(16);
      setLoadMoreCards(4);
    } else if (screenWidth >= 768) {
      setCardsPerRow(8);
      setLoadMoreCards(2);
    } else {
      setCardsPerRow(5);
      setLoadMoreCards(2);
    }

    setVisibleCards(cardsPerRow);
  };

  useEffect(() => {
    updateVisibleCards();
  }, [cardsPerRow]);
  const handleLoadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + loadMoreCards);
  };
  const saveLocalStorage = (filtered) => {
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('shortMoviesOnly', shortMoviesOnly);
    localStorage.setItem('movies', JSON.stringify(filtered));
  }

  const handleSearch = async () => {
    await handleSearchMovies(saveLocalStorage, searchQuery, shortMoviesOnly, setLoading, setError, setFilteredMovies);
  };

  useEffect(() => {
    // Получение сохраненного значения из localStorage
    const storedShortMoviesOnly = localStorage.getItem('shortMoviesOnly') === 'true';
  
    // Сравнение текущего значения с сохраненным
    if (shortMoviesOnly !== storedShortMoviesOnly) {
      handleSearch();
    }
  }, [shortMoviesOnly]);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} navigate={navigate} handleNavigationButtonClick={handleNavigationButtonClick} location={location} />
      <main>
        <SearchForm onSearch={handleSearch}>
          <input
            type="text"
            placeholder="Фильм"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-form__input"
            required
          />
          <div className="search-form__divider"></div>
          <label className="search-form__label">
            <input
              type="checkbox"
              checked={shortMoviesOnly}
              onChange={() => setShortMoviesOnly(!shortMoviesOnly)}
              className="search-form__checkbox"
            />
            <span className="search-form__custom-checkbox"></span>
            Короткометражки
          </label>
        </SearchForm>
        {loading ? (
          <Preloader />
        ) : (
          <MoviesCardList saveMovies={saveMovies} setSaveMovies={setSaveMovies} movies={filteredMovies.slice(0, visibleCards)} location={location} />
        )}
        {error ? (
          <p className="error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        ) : (
          filteredMovies.length === 0 && <p className="not-found-message">Ничего не найдено</p>
        )}
        {/* Кнопка "Ещё" отображается, только если есть ещё карточки для загрузки */}
        {filteredMovies.length > visibleCards && (
          <button type="button" className="movies-button-load-more" onClick={handleLoadMore}>
            Ещё
          </button>
        )}
      </main>
      <Footer />
      <Navigation isNavigationPopupOpen={isNavigationPopupOpen} location={location} closeAllPopups={closeAllPopups} />
    </>
  );
};

export default Movies;








