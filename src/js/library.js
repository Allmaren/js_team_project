import { onToggleModal } from './authentication';

const libraryEl = document.querySelector('.nav__link-my-library');
libraryEl.addEventListener('click', onClickLibrary);

function onClickLibrary(evt) {
  evt.preventDefault();
  let isUser = localStorage.getItem('user-id');
  if (!isUser) {
    onToggleModal();
  } else {
    location.href = 'library.html';
  }
}
