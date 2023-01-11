const ul = document.querySelector('.trending__collection');

const BASE_URL = 'https://api.themoviedb.org/3/';
const TRENDING = 'trending/movie/week';
const API_KEY = '1d8f1c2313e3ed4d118cc85bb96261b9';
const GENRES = 'genre/movie/list';

    getFetchTrending()
        .then(renderTrendingCard)
        .catch((error) => console.log(error));

function getFetchTrending() {
       return fetch(`${BASE_URL}${TRENDING}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`)
        .then(response =>
        response.json()
        )
        .then(data => data.results)
}

function renderTrendingCard(films) {
    const cardEl = films.map(film => {
        return `<li class="trending__item">
    <img class=" card__img" src="https://www.themoviedb.org/t/p/w500${film.poster_path}"
      onerror="this.onerror=null;this.src='https://subscribenow.com.au/time/asia/Solo/Content/Images/noCover.gif'" loading="lazy"
      alt="${film.title}" title="${film.title}" data-id="${film.id}" width="280"/>
<h3 class="card__title">${film.title}</h3>
<div class="card-field">
    <p class="text__vote">${film.release_date}</p>
</div>

</li>`
        
    }).join('');

    ul.insertAdjacentHTML('beforeend', cardEl);
    // return cardEl;
};
