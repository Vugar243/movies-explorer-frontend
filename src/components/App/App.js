import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);
  const location = useLocation();

  const handleNavigationButtonClick = () => {
    setIsNavigationPopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsNavigationPopupOpen(false);
  };
  const navigate = useNavigate();
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main isAuthenticated={isAuthenticated} navigate={navigate} handleNavigationButtonClick={handleNavigationButtonClick} location={location} isNavigationPopupOpen={isNavigationPopupOpen} closeAllPopups={closeAllPopups}/>} />
        <Route path="/movies" element={<Movies isAuthenticated={isAuthenticated} navigate={navigate} handleNavigationButtonClick={handleNavigationButtonClick} location={location} isNavigationPopupOpen={isNavigationPopupOpen} closeAllPopups={closeAllPopups}/>} />
        <Route path="/saved-movies" element={<SavedMovies isAuthenticated={isAuthenticated} navigate={navigate} handleNavigationButtonClick={handleNavigationButtonClick} location={location} isNavigationPopupOpen={isNavigationPopupOpen} closeAllPopups={closeAllPopups}/>} />
        <Route path="/profile" element={<Profile navigate={navigate} isAuthenticated={isAuthenticated} handleNavigationButtonClick={handleNavigationButtonClick} location={location} isNavigationPopupOpen={isNavigationPopupOpen} closeAllPopups={closeAllPopups}/>} />
        <Route path="/signin" element={<Login navigate={navigate} />} />
        <Route path="/signup" element={<Register navigate={navigate} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
