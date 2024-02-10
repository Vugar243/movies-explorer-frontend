import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import moviesApi from '../utils/MoviesApi';

const Movies = ({ saveMovies, setSaveMovies, error, setError, loading, setLoading, isAuthenticated, navigate, handleNavigationButtonClick, location, isNavigationPopupOpen, closeAllPopups }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [shortMoviesOnly, setShortMoviesOnly] = useState(() => {
    // Здесь мы получаем сохраненное значение из localStorage
    const storedShortMoviesOnly = localStorage.getItem('shortMoviesOnly') === 'true';
    // Возвращаем это значение как начальное значение
    return storedShortMoviesOnly;
  });   
  const [isFirstSearch, setIsFirstSearch] = useState(true);



  const [cardsPerRow, setCardsPerRow] = useState(16);
  const [visibleCards, setVisibleCards] = useState(cardsPerRow);
  const [loadMoreCards, setLoadMoreCards] = useState(4); 
  const [searcError, setSearchError] = useState('');
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  useEffect(() => {
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

  // Обновление количества видимых карточек в зависимости от ширины экрана
  const updateVisibleCards = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      setCardsPerRow(16);
      setLoadMoreCards(4);
    } else if (screenWidth <= 768) {
      setCardsPerRow(8);
      setLoadMoreCards(2);
    } else if (screenWidth <= 480) {
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
    setLoading(true)
    // Ручная валидация перед запросом на сервер
    if (searchQuery.trim().length < 1) {
      // Минимальная длина запроса - 2 символа
      setSearchError('Нужно ввести ключевое слово');
      return;
    }
    setIsSearchPerformed(true);
    setSearchError('');
    let fetchedMovies; // Переменная для хранения загруженных фильмов
    // Выполнять запрос к серверу только при первом поиске
    if (isFirstSearch) {
      try {
        fetchedMovies = await moviesApi.getInitialCards();
        setMovies(fetchedMovies);
        setError(false);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке начальных фильмов:', error);
        setError(true);
        return;
      } finally {
        setIsFirstSearch(false);
      }
    } else {
      // Использовать уже загруженные фильмы, если первый поиск уже выполнен
      fetchedMovies = movies;
    }
    // Фильтрация фильмов
    const filtered = fetchedMovies.filter((movie) => {
      const titleIncludesQuery = movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase());
      const isShortMovie = shortMoviesOnly ? movie.duration <= 40 : true;
  
      return titleIncludesQuery && isShortMovie;
    });
    // Сохранение результатов поиска в localStorage
    saveLocalStorage(filtered);
    setFilteredMovies(filtered);
    updateVisibleCards(); ///////////////////////////////////////
    setLoading(false);
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
            id="searchQuery"
            type="text"
            placeholder="Фильм"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-form__input"
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
          {searcError && <span className="search-form__input-error">{searcError}</span>}
        </SearchForm>
        {loading ? (
          <Preloader />
        ) : (
          <MoviesCardList saveMovies={saveMovies} setSaveMovies={setSaveMovies} movies={filteredMovies.slice(0, visibleCards)} location={location} />
        )}
        {error ? (
          <p className="error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        ) : (
          (isSearchPerformed && filteredMovies.length === 0) && <p className="not-found-message">Ничего не найдено</p>
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








