import axios from 'axios';
import renderCard from './render';

const ul = document.querySelector('.trending__collection');

const BASE_URL = 'https://api.themoviedb.org/3/';
const TRENDING = 'trending/movie/week';
const API_KEY = '1d8f1c2313e3ed4d118cc85bb96261b9';

getFetchTrending()
  .then(films => renderCard(films, ul))
  .catch(error => console.log(error));

function getFetchTrending() {

  return fetch(
    `${BASE_URL}${TRENDING}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`
  )
    .then(response => response.json())
    .then(data => data.results);
}



    
    
    
        






