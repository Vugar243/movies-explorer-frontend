class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)
  }
  
  updateUserInfo({ name, email }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
      .then(this._checkResponse)
  }
  
  login({ email, password }) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }
  checkToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
  register({ email, password, name }) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name }),
    }).then(this._checkResponse);
  }

 
  addMovie({ movie }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movie
      })
    })
      .then(this._checkResponse)
  }
  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`
      },
    })
      .then(this._checkResponse)
  }
  likeCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards/${cardId}/likes/`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`
      },
    })
      .then(this._checkResponse)
  }

  dislikeCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards/${cardId}/likes/`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`
      },
    })
      .then(this._checkResponse)
  }
}
const mainApi = new MainApi({
  baseUrl: 'https://api.vugar243.nomoredomainsmonster.ru'
});
export default mainApi;

