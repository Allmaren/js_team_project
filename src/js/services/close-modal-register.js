import { onToggleModal } from '../modal-registared';

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
