class MoviesApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getInitialCards() {
    return fetch(this.baseUrl)
      .then(this._checkResponse)
  }
}
const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
});
export default moviesApi;
