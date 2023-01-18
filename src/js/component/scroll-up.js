const scrollUpBtn = document.querySelector('.scroll-up-btn');
const rootEl = document.documentElement;

onScrollUp();
window.onscroll = function () {
  onScrollUp();
};

function onScrollUp() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    scrollUpBtn.classList.add('is-show-btn');
  } else {
    scrollUpBtn.classList.remove('is-show-btn');
  }
}

scrollUpBtn.addEventListener('click', scrollUpTop);

function scrollUpTop() {
  rootEl.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
