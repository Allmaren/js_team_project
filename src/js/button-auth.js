import { onToggleModal } from './authentication';
import { reloadHome } from './services/reload-library';
import { Notify } from 'notiflix';

const userId = JSON.parse(localStorage.getItem('user-id'));
const loginBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');

if (userId) {
  loginBtn.textContent = 'LOG OUT';
}

if (!userId) {
  loginBtn.addEventListener('click', onToggleModal);
  registerBtn.addEventListener('click', onToggleModal);
} else {
  loginBtn.addEventListener('click', () => {
    if (userId) {
      localStorage.removeItem('user-id');
      Notify.info(`You have logged out! Сome again!`, {
        fontSize: '16px',
      });
      setTimeout(() => {
        reloadHome();
      }, 3000);
    }
  });
}
