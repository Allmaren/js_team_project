import renderCard from './component/render';

import Pagination from 'tui-pagination';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = '57c452bac8b733cbb049921c3a15e368';

const searchForm = document.querySelector('.header__form');
const gallery = document.querySelector('.search-film__by-name-js');

const searchQuery = document.querySelector('.search-film__input');
const warningText = document.querySelector('.header__warning-text-js');

const container = document.getElementById('pagination');
const paginatorOptions = {
  itemsPerPage: 20,
  visiblePages: 5,
};
searchForm.addEventListener('submit', searchHandler);
searchQuery.addEventListener('click', inputHandler);

function searchHandler(event) {
  event.preventDefault();

  const inputQuery = searchQuery.value;

  if (inputQuery === '') {
    warningText.classList.remove('is-hidden-warn');
  } else {
    fetchData(searchQuery).then(() => {
      new Pagination(container, paginatorOptions).on(
        'afterMove',
        function (eventData) {
          fetchData(searchQuery, eventData.page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      );
    });
  }
}

function inputHandler(event) {
  warningText.classList.add('is-hidden-warn');
}

function fetchData(searchQuery, page = 1) {
  const params = `api_key=${API_KEY}&query='${searchQuery.value}'&language=en-US&page=${page}&include_adult=false`;
  const url = `${BASE_URL}?${params}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      paginatorOptions.totalItems = data.total_results;
      return data.results;
    })
    .then(films => {
      if (films.length >= 1) {
        renderCard(films, gallery);
        warningText.classList.add('is-hidden-warn');
      } else {
        warningText.classList.remove('is-hidden-warn');
      }
    })
    .catch(error => console.log(error));
}
