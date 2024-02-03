// SearchForm.js
import React from 'react';
import './SearchForm.css';

const SearchForm = ({ children, onSearch,}) => {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="search-form">
      {children}
      <button type="submit" onClick={handleSearch} className="search-form__button">Найти</button>
    </form>
  );
};

export default SearchForm;

