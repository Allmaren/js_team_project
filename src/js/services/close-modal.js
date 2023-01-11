export function onCloseModalByEscape(evt) {
  if ((evt.code = 'Escape')) {
    onCloseModal();
  }
}

export function onCloseModalByClickBackdrop(evt) {
  if (evt.target.className === 'backdrop') {
    onCloseModal();
  }
}

export function onCloseModal() {
  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onCloseModalByEscape);
}
