import { refs } from '../refs';
import { onToggleModal } from '../authentication';
import { allMoviesWatched, allMoviesQueue, updateMovies } from './firebase';
import {
  onMarkupTwoAdd,
  onMarkupRemovePlusAdd,
  onMarkupAddPlusRemove,
  onMarkupTwoRemove,
} from './markup-modal-buttons';

let MOVIE_ID = 0;
let USER_ID = '';

export async function createModalButtons(movieID) {
  USER_ID = JSON.parse(localStorage.getItem('user-id'));
  MOVIE_ID = movieID;

  const arrayWatchedMovies = await allMoviesWatched(USER_ID)
    .then(res => res)
    .catch(error => console.log(error));
  const allWatched = arrayWatchedMovies ? arrayWatchedMovies : [];

  const arrayQueueMovies = await allMoviesQueue(USER_ID)
    .then(res => res)
    .catch(error => console.log(error));
  const allQueue = arrayQueueMovies ? arrayQueueMovies : [];

  onRenderRightModalButtons(USER_ID, movieID, allWatched, allQueue);

  const watchedBtn = document.querySelector('.add-to-watched-btn');
  const queueBtn = document.querySelector('.add-to-queue-btn');
  watchedBtn.addEventListener('click', onUpdateMovies);
  queueBtn.addEventListener('click', onUpdateMovies);
}

function onUpdateMovies(evt) {
  const nameButton = evt.srcElement.innerText.toLowerCase();
  if (!USER_ID) {
    refs.backdropMovieMovie.classList.toggle('is_hidden-movie');
    onToggleModal();
  } else updateMovies(USER_ID, MOVIE_ID, nameButton.trim());
}

function onRenderRightModalButtons(userId, movieID, allWatched, allQueue) {
  const buttonsEl = document.querySelector('.info-thumb');

  if (!userId) {
    buttonsEl.insertAdjacentHTML('beforeend', onMarkupTwoAdd());
  }

  if (userId && !allWatched.includes(movieID) && !allQueue.includes(movieID)) {
    buttonsEl.insertAdjacentHTML('beforeend', onMarkupTwoAdd());
  }

  if (userId && allWatched.includes(movieID) && !allQueue.includes(movieID)) {
    buttonsEl.insertAdjacentHTML('beforeend', onMarkupRemovePlusAdd());
  }

  if (userId && !allWatched.includes(movieID) && allQueue.includes(movieID)) {
    buttonsEl.insertAdjacentHTML('beforeend', onMarkupAddPlusRemove());
  }

  if (userId && allWatched.includes(movieID) && allQueue.includes(movieID)) {
    buttonsEl.insertAdjacentHTML('beforeend', onMarkupTwoRemove());
  }
}
