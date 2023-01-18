import { onCloseModalByEscape } from './services/close-modal-register';
import { createUser, logInUser } from './services/firebase';
import { Notify } from 'notiflix';
import { withoutDot } from './services/notification-update-buttons';

export const STORAGE_KEY = 'user-id';

const refs = {
  modalRegister: document.querySelector('[data-modal-register]'),
  closeModalBtn: document.querySelector('[data-modal-close-register]'),

  formEl: document.querySelector('.register-form'),
  logInBtn: document.querySelector('[data-log-in-btn]'),
  registerBtn: document.querySelector('[data-register-btn]'),
  emailEl: document.querySelector('[data-login]'),
  passwordEl: document.querySelector('[data-password]'),
};

// Create modal for registration
refs.closeModalBtn.addEventListener('click', onToggleModal);

export function onToggleModal() {
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
    watchedMovies: [0],
    queueMovies: [0],
  };

  if (!userData.userEmail.includes('.')) {
    await createUser(userData);
  } else {
    withoutDot();
  }

  refs.formEl.reset();
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
      console.log(error.status);
    });

  if (userMovies) {
    onToggleModal();
    refs.formEl.reset();
    return userMovies;
  }
}

function isUser({ userEmail, watchedMovies, queueMovies }) {
  Notify.success(`You have logged successfully! Enjoy watching movies`, {
    fontSize: '16px',
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userEmail));

  return (userData = {
    userEmail,
    watchedMovies,
    queueMovies,
  });
}
