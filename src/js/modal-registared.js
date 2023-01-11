import {
  onCloseModalByEscape,
  onCloseModalByClickBackdrop,
  onCloseModal,
} from './services/close-modal';

refs = {
  openModal: document.querySelector('.open-modal-register'),
  backdrop: document.querySelector('.backdrop'),
  closeBtnRegister: document.querySelector('.button-close-register'),
};

refs.openModal.addEventListener('click', onOpenModal);

function onOpenModal() {
  refs.backdrop.classList.remove('is-hidden');
  refs.closeBtnRegister.addEventListener('click', onCloseModal);
  refs.backdrop.addEventListener('click', onCloseModalByClickBackdrop);
  window.addEventListener('keydown', onCloseModalByEscape);
}
