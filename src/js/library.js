import axios from 'axios';
import { onToggleModal } from './authentication';
import { allMoviesWatched, allMoviesQueue } from './services/firebase';

const libraryUl = document.querySelector('.my-library-list');
const watchedEL = document.querySelector('button.btn-watched');
const queueEl = document.querySelector('button.btn-queue');
const libraryWrapper = document.querySelector('.nav-library');
const currentWatchedBtn = document.querySelector('.btn-watched');
const currentQueueBtn = document.querySelector('.btn-queue');

const watched = 'watched';
const queque = 'queque';

watchedEL.addEventListener('click', getWatchedFilms);
queueEl.addEventListener('click', getQueueFilms);

const userId = JSON.parse(localStorage.getItem('user-id'));

if (!userId) {
  let notificationLibrary = document.createElement('p');
  notificationLibrary.className = 'notification-update-movie';
  notificationLibrary.innerHTML =
    'To create your collections of movies you have to log in on Home page';
  libraryWrapper.append(notificationLibrary);
  setTimeout(() => notificationLibrary.remove(), 6000);

  libraryUl.innerHTML = '';
  const imgEl =
    '<li class="library-photo-item"><div class="library-photo"></div></li>';
  libraryUl.insertAdjacentHTML('beforeend', imgEl);
} else {
  currentWatchedBtn.classList.add('btn-library-current');
  getMovies(allMoviesWatched, userId, watched);
}

function getWatchedFilms() {
  if (!userId) {
    onToggleModal();
  } else {
    currentWatchedBtn.classList.add('btn-library-current');
    currentQueueBtn.classList.remove('btn-library-current');
    getMovies(allMoviesWatched, userId, watched);
  }
}

function getQueueFilms() {
  if (!userId) {
    onToggleModal();
  } else {
    currentWatchedBtn.classList.remove('btn-library-current');
    currentQueueBtn.classList.add('btn-library-current');
    getMovies(allMoviesQueue, userId, queque);
  }
}

async function getMovies(fetchFilms, userId, photo) {
  const getFilms = await fetchFilms(userId)
    .then(res => res)
    .catch(error => console.log(error));

  const arrayFilms = getFilms.slice(1);

  libraryUl.innerHTML = '';
  if (arrayFilms.length === 0) {
    libraryUl.innerHTML = '';
    const imgEl = `<li class="library-photo-item"><div class="library-${photo}-photo"></div></li>`;
    libraryUl.insertAdjacentHTML('beforeend', imgEl);
  }

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
