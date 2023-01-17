import { onToggleModal } from './authentication';
import { allMoviesWatched, allMoviesQueue } from './services/firebase';

const libraryEl = document.querySelector('.nav__link-my-library');
libraryEl.addEventListener('click', onClickLibrary);

function onClickLibrary(evt) {
  evt.preventDefault();
  let userId = localStorage.getItem('user-id');
  if (!userId) {
    onToggleModal();
  } else {
    location.href = 'library.html';
    getMovies(userId);
  }
}

async function getMovies(userId) {
  const arrayWatched = await allMoviesWatched(JSON.parse(userId))
    .then(res => res)
    .catch(error => console.log(error));

  arrayWatched.shift();
  console.log(arrayWatched);

  const arrayQueue = await allMoviesQueue(JSON.parse(userId))
    .then(res => res)
    .catch(error => console.log(error));
}
