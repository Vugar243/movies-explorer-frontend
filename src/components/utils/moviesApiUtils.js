// В отдельном файле, например, moviesApiUtils.js

import moviesApi from './MoviesApi';

export const handleSearchMovies = async (saveLocalStorage, searchQuery, shortMoviesOnly, setLoading, setError, setFilteredMovies) => {
  setLoading(true);

  try {
    // Получение начальных фильмов
    const data = await moviesApi.getInitialCards();

    // Фильтрация фильмов
    const filtered = data.filter((movie) => {
      const titleIncludesQuery = movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase());
      const isShortMovie = shortMoviesOnly ? movie.duration <= 40 : true;

      return titleIncludesQuery && isShortMovie;
    });

    // Сохранение результатов поиска в localStorage
    saveLocalStorage(filtered);
    setFilteredMovies(filtered);
  } catch (error) {
    console.error('Ошибка при загрузке начальных фильмов:', error);
    setError(true);
  } finally {
    setLoading(false);
  }
};
