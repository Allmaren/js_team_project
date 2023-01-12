import { onToggleModal } from './services/create-modal-register';

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
    watchedMovies: [],
    queueMovies: [],
  };

  const { userEmail, userPassword, watchedMovies, queueMovies } = userData;

  firebaseCreateUser(userEmail, userPassword, watchedMovies, queueMovies);

  refs.formEl.reset();
}

// Log In user on Firebase

function onLogIn(evt) {
  evt.preventDefault();

  userData = {
    userEmail: refs.emailEl.value,
    userPassword: refs.passwordEl.value,
  };

  const { userEmail, userPassword } = userData;

  refs.formEl.reset();
}
