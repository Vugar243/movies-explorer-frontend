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
import CurrentUserContext from '../Contexts/CurrentUserContext';
import mainApi from '../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';



function App() {
  const [currentUser, setCurrentUser] = useState({ email: '', password: '', name: '', });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Состояние для режима редактирования
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const location = useLocation();

  const handleNavigationButtonClick = () => {
    setIsNavigationPopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsNavigationPopupOpen(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
      mainApi
        .checkToken(jwt)
        .catch((error) => {
          console.error("Ошибка при проверке токена:", error);
          setIsAuthenticated(false);
        });
  };
  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/signin' || location.pathname === '/signup')) {
      navigate('/'); // Перенаправляем авторизованного пользователя с /signin и /signup на другую страницу
    }
  }, [isAuthenticated, location.pathname, navigate]);
  useEffect(() => {
    if (location.pathname === '/profile') {
      mainApi.getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
          localStorage.setItem('nameInfo', userInfo.name); // Записываем в локальное хранилище
          localStorage.setItem('emailInfo', userInfo.email);
          setIsProfileUpdated('');
        })
        .catch((err) => console.error('Ошибка при загрузке данных пользователя:', err));
          setIsProfileUpdated('Ошибка при загрузке данных пользователя');
    }
  }, [location.pathname === '/profile', setCurrentUser]);

  function handleUpdateUser(e) {
    e.preventDefault();
    setIsEditing(false);
    // Отправляем запрос на сервер для обновления профиля пользователя
    mainApi.updateUserInfo({ email: currentUser.email, name: currentUser.name })
      .then((newUser) => {
        setCurrentUser(newUser); // Обновляем стейт currentUser с новыми данными
        localStorage.setItem('nameInfo', (newUser.name));
        localStorage.setItem('emailInfo', (newUser.email));
        setIsProfileUpdated('Профиль успешно обновлен!');
      })
      .catch((err) => {
        console.error('Ошибка при обновлении профиля:', err);
        setIsProfileUpdated('Ошибка при обновлении профиля');
        setIsEditing(true);
      });
  }
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('')
    mainApi
      .login({ email: currentUser.email, password: currentUser.password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsAuthenticated(true);
          navigate('/movies');
        } else {
          // Обработка случая, если токен не получен
          console.log({ email: currentUser.email, password: currentUser.password })
        }
      })
      .catch((error) => {
        console.error("Ошибка при входе:", error);
        setLoginError('Ошибка при входе')
        setRegisterError('Ошибка при регистрации')
        // Обработка ошибок входа, например, вывод сообщения об ошибке пользователю
      });
  };
  

  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError('')
    mainApi
      .register({ email: currentUser.email, password: currentUser.password, name: currentUser.name })
      .then(() => {
        handleLogin(e); // Вызываем функцию авторизации после успешной регистрации
      })
      .catch((error) => {
        console.error("Ошибка при регистрации:", error);
        setRegisterError('Ошибка при регистрации')
      });
  };
  const [saveMovies, setSaveMovies] = useState([]);
  useEffect(() => {
    mainApi.getInitialMovies()
      .then((data) => {
        setSaveMovies(data);
      })
      .catch((error) => {
        console.error('Error fetching initial movies:', error);
      });
  }, [location.pathname === '/movies', location.pathname === '/saved-movies'],);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}> 
        <Routes>
          <Route path="/signin" element={<Login loginError={loginError} navigate={navigate} setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Register registerError={registerError} navigate={navigate} setCurrentUser={setCurrentUser} handleRegister={handleRegister} />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={<Main isAuthenticated={isAuthenticated} navigate={navigate} handleNavigationButtonClick={handleNavigationButtonClick} location={location} isNavigationPopupOpen={isNavigationPopupOpen} closeAllPopups={closeAllPopups}/>} />
          <Route path="/movies" 
            element={
              <ProtectedRoute 
              isAuthenticated={isAuthenticated} 
              element={Movies} 
              saveMovies={saveMovies} 
              setSaveMovies={setSaveMovies} 
              error={error} 
              setError={setError} 
              loading={loading} 
              setLoading={setLoading} 
              navigate={navigate} 
              handleNavigationButtonClick={handleNavigationButtonClick} 
              location={location} 
              isNavigationPopupOpen={isNavigationPopupOpen} 
              closeAllPopups={closeAllPopups}/>
          } 
          />
          <Route path="/saved-movies" 
            element={
              <ProtectedRoute 
              isAuthenticated={isAuthenticated} 
              element={SavedMovies} 
              saveMovies={saveMovies} 
              setSaveMovies={setSaveMovies} 
              error={error} 
              setError={setError} 
              loading={loading} 
              setLoading={setLoading} 
              navigate={navigate} 
              handleNavigationButtonClick={handleNavigationButtonClick} 
              location={location} 
              isNavigationPopupOpen={isNavigationPopupOpen} 
              closeAllPopups={closeAllPopups}/>
          } 
          />
          <Route path="/profile" 
            element={
              <ProtectedRoute 
              isAuthenticated={isAuthenticated} 
              element={Profile} 
              saveMovies={saveMovies} 
              setSaveMovies={setSaveMovies} 
              error={error} 
              setError={setError} 
              loading={loading} 
              setLoading={setLoading} 
              navigate={navigate} 
              handleNavigationButtonClick={handleNavigationButtonClick} 
              location={location} 
              isNavigationPopupOpen={isNavigationPopupOpen} 
              closeAllPopups={closeAllPopups}
              setIsAuthenticated={setIsAuthenticated} 
              setCurrentUser={setCurrentUser}
              handleUpdateUser={handleUpdateUser}
              isEditing={isEditing} 
              setIsEditing={setIsEditing}
              isProfileUpdated={isProfileUpdated}
              />
          } 
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
