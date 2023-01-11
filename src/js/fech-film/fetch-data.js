import axios from 'axios';

// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = '32213066-8c27353e21dcb9ee734ab239c';

export default class FetchData {
  constructor() {
    this.searchQuery = '';
    this.perPage = 20;
    this.page = 1;
  }

  async makesRequest() {
    const params = new URLSearchParams({
      api_key: API_KEY,
      q: this.searchQuery,
      language: 'en-US',
      include_adult: false,
      page: this.pageAmount,
      per_page: this.perPage,
    });
    const url = `${BASE_URL}?${params}`;
    this.incrementPage();
    return await axios.get(url);
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQueary = newQuery;
  }
}
