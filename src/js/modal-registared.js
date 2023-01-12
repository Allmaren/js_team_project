import {
  onCloseModalByEscape,
  onCloseModalByClickBackdrop,
} from './services/close-modal-register';
import { createUser, logInUser } from './services/firebase';
import { Notify } from 'notiflix';

const refs = {
  openModalBtn: document.querySelector('[data-modal-open-register]'),
  modalRegister: document.querySelector('[data-modal-register]'),
  closeModalBtn: document.querySelector('[data-modal-close-register]'),

  formEl: document.querySelector('.register-form'),
  logInBtn: document.querySelector('[data-log-in-btn]'),
  registerBtn: document.querySelector('[data-register-btn]'),
  emailEl: document.querySelector('[data-email]'),
  passwordEl: document.querySelector('[data-password]'),
};

// Create modal for registration
refs.openModalBtn.addEventListener('click', onToggleModal);
refs.closeModalBtn.addEventListener('click', onToggleModal);

export function onToggleModal() {
  refs.modalRegister.addEventListener('click', onCloseModalByClickBackdrop);
  window.addEventListener('keydown', onCloseModalByEscape);
  document.body.classList.toggle('no-scroll');
  refs.modalRegister.classList.toggle('is-hidden');
}

// Create user on Firebase
refs.formEl.addEventListener('submit', onCreateUser, onLogIn);
refs.registerBtn.addEventListener('click', onCreateUser);
refs.logInBtn.addEventListener('click', onLogIn);
let userData = {};

function onCreateUser(evt) {
  evt.preventDefault();

  userData = {
    userEmail: refs.emailEl.value,
    userPassword: refs.passwordEl.value,
    watchedMovies: ['111111'],
    queueMovies: ['222222'],
  };

  createUser(userData);

  refs.formEl.reset();
}

// Log In user on Firebase

async function onLogIn(evt) {
  evt.preventDefault();

  userData = {
    userEmail: refs.emailEl.value,
    userPassword: refs.passwordEl.value,
  };

  const userMovies = await logInUser(userData)
    .then(isUser)
    .catch(error => console.log(error));

  refs.formEl.reset();
  console.log(userMovies);
  return userMovies;
}

function isUser({ userEmail, watchedMovies, queueMovies }) {
  Notify.success(`You have logged successfully! Enjoy watching movies`, {
    fontSize: '20px',
  });
  onToggleModal();
  return (userData = {
    userEmail,
    watchedMovies,
    queueMovies,
  });
}
