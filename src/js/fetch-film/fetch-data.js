const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = '57c452bac8b733cbb049921c3a15e368';
let searchQuery = document.querySelector('.search-film__input');
function fetchData(searchQuery) {
  const params = `api_key=${API_KEY}&query='${searchQuery.value}'&language=en-US&page=1&include_adult=false`;
  const url = `${BASE_URL}?${params}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data.results);
}

export default { fetchData };
