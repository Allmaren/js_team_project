import { renderModalMarkup } from './render-modal-movie';
import { refs } from './component/refs';
import { reload } from './services/reload-library';
import axios from 'axios';
import 'animate.css';

refs.openModal.addEventListener('click', onFetchApiMovieClick);

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
  refs.backdropMovie.classList.toggle('is_hidden-movie');
  document.body.classList.toggle('no-scroll');

  window.addEventListener('keydown', onCloseModalMovieEscape);
  refs.closeModal.addEventListener('click', onCloseModalMovie);
  refs.backdropMovie.addEventListener('click', onCLoseBackdropMovie);
}

function onCloseModalMovie() {
  if (refs.backdropMovie) {
    toggleModal();
    window.removeEventListener('keydown', onCloseModalMovieEscape);
    refs.backdropMovie.removeEventListener('click', onCLoseBackdropMovie);
    reload();
  }
}

function onCloseModalMovieEscape(e) {
  if (e.key === 'Escape') {
    reload();
    toggleModal();
    window.removeEventListener('keydown', onCloseModalMovieEscape);
  }
}

function onCLoseBackdropMovie(e) {
  if (e.target === refs.backdropMovie) {
    toggleModal();
    window.removeEventListener('keydown', onCloseModalMovieEscape);
    refs.closeModal.removeEventListener('click', onCloseModalMovie);
    reload();
  }
}
