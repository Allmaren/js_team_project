import axios from 'axios';
// import { onToggleModal } from './authentication';
import { allMoviesWatched, allMoviesQueue } from './services/firebase';

const libraryEl = document.querySelector('.nav__link-my-library');

const libraryUl = document.querySelector('.my-library-list');
const watchedEL = document.querySelector('button.btn-watched');
const quequeEl = document.querySelector('button.btn-queque');

// // libraryEl.addEventListener('click', onClickLibrary);

// // function onClickLibrary(evt) {
// //   evt.preventDefault();
// //   let userId = localStorage.getItem('user-id');
// //   if (!userId) {
// //     onToggleModal();
// //   } else {
// //     location.href = 'library.html';
// //     getMovies(userId);
// //   }
// // }

let userId = localStorage.getItem('user-id');

// watchedEL.addEventListener('click', getWatchedFilms);
// quequeEl.addEventListener('click', getQuequeFilms);

getMovies(allMoviesWatched, userId);

function getWatchedFilms(fetchFilms) {
  getMovies(allMoviesWatched, userId);
}

function getQuequeFilms(fetchFilms) {
  getMovies(allMoviesQueue, userId);
}

async function getMovies(fetchFilms, userId) {
  const getFilms = await fetchFilms(JSON.parse(userId))
    .then(res => res)
    .catch(error => console.log(error));

  const arrayFilms = getFilms.slice(1);
  console.log('arrayFilms', arrayFilms);

  libraryUl.innerHTML = '';
  arrayFilms.map(async el => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${el}?api_key=1234dced32e7dcd076b4111d81f37c06`
    );
    renderLibraryFilms(response.data);
  });

  function renderLibraryFilms(object) {
    libraryUl.insertAdjacentHTML('beforeend', createLibraryCard(object));
  }

  function createLibraryCard({
    original_title,
    poster_path,
    vote_average,
    id,
    release_date,
    genres,
  }) {
    const genreList = [];
    genres.forEach(el => {
      genreList.push(el.name);
    });
    return `
    <li class="card-item" >
      <div class="card-item__img">
      <img src="${
        poster_path
          ? `https://image.tmdb.org/t/p/w500${poster_path}`
          : './images/no_image.jpg'
      }"  alt="${original_title}" data-id="${id}" loading="lazy">
      </div>
      <h3 class="card-item__title">${original_title}</h3>
      <p class="card-item__info">
        <span>${genreList
          .slice(0, 2)
          .map(el => el)
          .join(', ')}${
      genreList.length ? (genreList.length > 2 ? ', Other' : '') : 'No genre'
    } </span> <span>${release_date.slice(0, 4)}</span>
        <span class="card-item__vote"> ${
          vote_average ? vote_average.toFixed(1) : '0'
        }</span>
      </p>
    </li>`;
  }
}
