import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import moviesApi from '../utils/MoviesApi';

const Movies = ({ isAuthenticated, navigate, handleNavigationButtonClick, location, isNavigationPopupOpen, closeAllPopups }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [shortMoviesOnly, setShortMoviesOnly] = useState(false);
  const [cardsPerRow, setCardsPerRow] = useState(4);
  const [visibleCards, setVisibleCards] = useState(cardsPerRow);
  const [loadMoreCards, setLoadMoreCards] = useState(2);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch initial movies when the component mounts
    const storedSearchQuery = localStorage.getItem('searchQuery');
    const storedShortMoviesOnly = localStorage.getItem('shortMoviesOnly') === 'true';
    const storedMovies = JSON.parse(localStorage.getItem('movies'));

    if (storedSearchQuery || storedShortMoviesOnly || storedMovies) {
      setSearchQuery(storedSearchQuery);
      setShortMoviesOnly(storedShortMoviesOnly);
      setMovies(storedMovies);
      setFilteredMovies(storedMovies);
    }

    // Добавлен слушатель событий resize для отслеживания изменения размера экрана
    const handleResize = () => {
      updateVisibleCards();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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

   const handleSearch = () => {
    setLoading(true);
    const InitialCards = () => {
    moviesApi.getInitialCards()
      .then((data) => {
        setMovies(data);
        setError(false);
      })
      .catch((error) => {
        console.error('Error fetching initial movies:', error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
    };


    
    const filtered = movies.filter((movie) => {
      const titleIncludesQuery = movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase());
      const isShortMovie = shortMoviesOnly ? movie.duration <= 40 : true;

      return titleIncludesQuery && isShortMovie;
    });
    InitialCards();
    setFilteredMovies(filtered);


    // Save search results to localStorage
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('shortMoviesOnly', shortMoviesOnly);
    localStorage.setItem('movies', JSON.stringify(filtered));
  };

  const handleLoadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + loadMoreCards);
  };
  useEffect(() => {
    handleSearch() 
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
          <MoviesCardList movies={filteredMovies.slice(0, visibleCards)} location={location} />
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








