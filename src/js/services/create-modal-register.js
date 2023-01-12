export function onCloseModalByEscape(evt) {
  if (evt.code === 'Escape') {
    onToggleModal();
    window.removeEventListener('keydown', onCloseModalByEscape);
  }
}

export function onCloseModalByClickBackdrop(evt) {
  if (evt.target.classList.value === 'backdrop-register') {
    onToggleModal();
    window.removeEventListener('keydown', onCloseModalByEscape);
  }
}

export function onToggleModal() {
  refs.modalRegister.addEventListener('click', onCloseModalByClickBackdrop);
  window.addEventListener('keydown', onCloseModalByEscape);
  document.body.classList.toggle('no-scroll');
  refs.modalRegister.classList.toggle('is-hidden');
}
