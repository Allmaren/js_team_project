import { onToggleModal } from './services/close-modal';

refs = {
  openModalBtn: document.querySelector('[data-modal-open-register]'),
  modalRegister: document.querySelector('[data-modal-register]'),
  closeModalBtn: document.querySelector('[data-modal-close-register]'),
};

refs.openModalBtn.addEventListener('click', onToggleModal);
refs.closeModalBtn.addEventListener('click', onToggleModal);
