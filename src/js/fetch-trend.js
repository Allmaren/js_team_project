import renderCard from './render';

const ul = document.querySelector('.trending__collection');

const BASE_URL = 'https://api.themoviedb.org/3/';
const TRENDING = 'trending/movie/week';
const API_KEY = '1d8f1c2313e3ed4d118cc85bb96261b9';

getFetchTrending()
  .then(data => data.results)
  .then(films => renderCard(films, ul))
  .catch(error => console.log(error));

export default function getFetchTrending() {
  return fetch(
    `${BASE_URL}${TRENDING}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`
  )
    .then(response => response.json())
    .then((data) => {
       console.log(data);
        return data;
    })
  
    // .then(({total_pages}) => {
    //   console.log(total_pages);
    //   return total_pages;
    // })

}



