import { renderModalMarkup } from './render-modal-movie';
import { refs } from './refs';
import axios from 'axios';
import 'animate.css';

refs.closeModal.addEventListener('click', onCloseModalMovie);
refs.openModal.addEventListener('click', onFetchApiMovieClick);
window.addEventListener('keydown', onCloseModalMovieEscape);

async function onFetchApiMovieClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  toggleModal();
  refs.modal.innerHTML = '';
  const ID_MOVIE = e.target.dataset.id;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${ID_MOVIE}?api_key=1234dced32e7dcd076b4111d81f37c06`
    );
    renderModalMarkup(refs.modal, response.data);
  } catch (error) {
    console.log('error', error);
  }
}

function toggleModal() {
  refs.backdropMovieMovie.classList.toggle('is_hidden-movie');
  document.body.classList.toggle('no-scroll');
}

function onCloseModalMovie(e) {
  if (refs.backdropMovieMovie) {
    toggleModal();
  }
}

function onCloseModalMovieEscape(e) {
  if (e.key === 'Escape') {
    onCloseModalMovie();
  }
}

// function closeModal() {
//   if (refs.backdropMovieMovie.classList.contains('is_hidden-movie')) {
//     return;
//   }
//   toggleModal();
//   window.removeEventListener('click', closeModal);
// }
//
//
