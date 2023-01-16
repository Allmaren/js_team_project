import axios from 'axios';
import renderCard from './render';
import Pagination from 'tui-pagination';

const ul = document.querySelector('.trending__collection');

const BASE_URL = 'https://api.themoviedb.org/3/';
const TRENDING = 'trending/movie/week';
const API_KEY = '1d8f1c2313e3ed4d118cc85bb96261b9';

const container = document.getElementById('pagination');
const paginatorOptions = {
  // totalItems: 20,
  itemsPerPage: 20,
  visiblePages: 5,
};

getFetchTrending().then(() => {
  new Pagination(container, paginatorOptions).on(
    'afterMove',
    function (eventData) {
      // console.log('The current page is ' + eventData.page);
      getFetchTrending(eventData.page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  );
});

function getFetchTrending(page = 1) {
  return fetch(
    `${BASE_URL}${TRENDING}?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false`
  )
    .then(response => response.json())
    .then(data => {
      paginatorOptions.totalItems = data.total_results;
      return data.results;
    })
    .then(films => renderCard(films, ul))
    .catch(error => console.log(error));
}
