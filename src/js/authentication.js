import {
  onCloseModalByEscape,
  onCloseModalByClickBackdrop,
} from './services/close-modal-register';
import { USER_ID } from './services/userID';
import { createUser, logInUser, updateMovies } from './services/firebase';
import { Notify } from 'notiflix';

const refs = {
  openModalBtn: document.querySelector('[data-modal-open-register]'), //треба видалити
  addWatched: document.querySelector('[data-add-watched]'), //треба видалити
  removeWatched: document.querySelector('[data-remove-watched]'), //треба видалити
  addQueue: document.querySelector('[data-add-queue]'), //треба видалити
  removeQueue: document.querySelector('[data-remove-queue]'), //треба видалити

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

//On push buttons for update
refs.addWatched.addEventListener('click', onAddWatched); //треба видалити
refs.removeWatched.addEventListener('click', onRemoveWatched); //треба видалити
refs.addQueue.addEventListener('click', onAddQueue); //треба видалити
refs.removeQueue.addEventListener('click', onRemoveQueue); //треба видалити

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

async function onCreateUser(evt) {
  evt.preventDefault();

  userData = {
    userEmail: refs.emailEl.value,
    userPassword: refs.passwordEl.value,
    watchedMovies: [1, 2, 3, 315162],
    queueMovies: [11, 22, 33],
  };

  createUser(userData);

  refs.formEl.reset();
  onToggleModal();
}

// Log In user on Firebase - using for button "LIBRARY"

async function onLogIn(evt) {
  evt.preventDefault();

  userData = {
    userEmail: refs.emailEl.value,
    userPassword: refs.passwordEl.value,
  };

  const userMovies = await logInUser(userData)
    .then(isUser)
    .catch(error => {
      refs.formEl.reset();
      console.log(error);
    });

  if (userMovies) {
    onToggleModal();
    refs.formEl.reset();
    console.log(userMovies);
    return userMovies;
  }
}

function isUser({ userEmail, watchedMovies, queueMovies }) {
  Notify.success(`You have logged successfully! Enjoy watching movies`, {
    fontSize: '16px',
  });
  return (userData = {
    userEmail,
    watchedMovies,
    queueMovies,
  });
}

//треба видалити цю функції
function onAddWatched(evt) {
  const movieData = {
    userEmail: 1,
    movieId: 4,
    type: 'watched',
    action: 'add',
  };
  updateMovies(movieData);
}

function onRemoveWatched(evt) {
  const movieData = {
    userEmail: 1,
    movieId: 4,
    type: 'watched',
    action: 'remove',
  };
  updateMovies(movieData);
}

function onAddQueue(evt) {
  const movieData = {
    userEmail: 1,
    movieId: 44,
    type: 'queue',
    action: 'add',
  };
  updateMovies(movieData);
}

function onRemoveQueue(evt) {
  const movieData = {
    userEmail: 1,
    movieId: 44,
    type: 'queue',
    action: 'remove',
  };
  updateMovies(movieData);
}
