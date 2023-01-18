import { playSound } from './component/audio-function';

const refs = {
  aboutDev: document.querySelector('#open-team-modal'),
  teamModalBtnClose: document.querySelector('.team-modal-btn'),
  teamBackdrop: document.querySelector('.team-backdrop'),
  body: document.querySelector('body'),
};

refs.aboutDev.addEventListener('click', openTeamModal);
refs.teamModalBtnClose.addEventListener('click', closeTeamModal);

function openTeamModal() {
  playSound(
    'https://mp36ka.net/uploads/files/2022-08/3ba84883347e821d_mp36ka_mjusli-ua-ft_-vasia-charisma-_-dobrij-den-everybody.mp3'
  );

  refs.teamBackdrop.classList.remove('is-hidden');
  refs.body.classList.add('no-scroll');
  document.addEventListener('click', onClickCloseModal);
  document.addEventListener('keydown', onEscCloseModal);
}

function closeTeamModal() {
  refs.teamBackdrop.classList.add('is-hidden');
  refs.body.classList.remove('no-scroll');

  document.removeEventListener('click', onClickCloseModal);
  document.removeEventListener('keydown', onEscCloseModal);
}

function onEscCloseModal(event) {
  if (event.key === 'Escape') {
    closeTeamModal();
  }
}
function onClickCloseModal(event) {
  if (
    event.target.classList.contains('team-backdrop') ||
    event.target.classList.contains('team-modal-btn')
  ) {
    closeTeamModal();
  }
}
