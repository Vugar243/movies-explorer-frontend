import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch, onCheckboxChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [shortMoviesOnly, setShortMoviesOnly] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery, shortMoviesOnly);
  };

  const handleCheckboxChange = () => {
    setShortMoviesOnly(!shortMoviesOnly);
    
  };

  return (
    <form className="search-form">
      <input
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
          onChange={handleCheckboxChange}
          className="search-form__checkbox"
        />
        <span className="search-form__custom-checkbox"></span>
        Короткометражки
      </label>
      <button type="button" onClick={handleSearch} className="search-form__button">Найти</button>
    </form>
  );
};

export default SearchForm;

