// import axios from 'axios';
import renderCard from './component/render';
import Pagination from 'tui-pagination';

const ul = document.querySelector('.trending__collection');

const BASE_URL = 'https://api.themoviedb.org/3/';
const TRENDING = 'trending/movie/week';
const API_KEY = '1d8f1c2313e3ed4d118cc85bb96261b9';

let isFirstFetch = true;
const container = document.getElementById('pagination');
const paginatorOptions = {
  itemsPerPage: 20,
  visiblePages: 5,
};

getFetchTrending().then(() => {
  let pagin = new Pagination(container, paginatorOptions);
  pagin.on('afterMove', function (eventData) {
    const currentPage = eventData.page;
    getFetchTrending(eventData.page);
    localStorage.setItem('currentTrendPage', eventData.page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  pagin.movePageTo(localStorage.getItem('currentTrendPage'));
});

function getFetchTrending(page = 1) {
  let currentTrendPage = localStorage.getItem('currentTrendPage')
    ? localStorage.getItem('currentTrendPage')
    : 1;

  return fetch(
    `${BASE_URL}${TRENDING}?api_key=${API_KEY}&language=en-US&page=${
      isFirstFetch ? currentTrendPage : page
    }&include_adult=false`
  )
    .then(response => response.json())
    .then(data => {
      paginatorOptions.totalItems = data.total_results;
      isFirstFetch = false;
      return data.results;
    })
    .then(films => renderCard(films, ul))
    .catch(error => console.log(error));
}
