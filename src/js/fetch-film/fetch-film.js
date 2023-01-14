import API from '../fetch-film/fetch-data';
import renderCard from '../render';

const searchForm = document.querySelector('.header__form');
const gallery = document.querySelector('.search-film__by-name-js');
const headerSearchContainer = document.querySelector('.header__search-cont');
const searchQuery = document.querySelector('.search-film__input');
const warningText = document.querySelector('.header__warning-text-js');

// console.log(searchQuery.value);

searchForm.addEventListener('submit', searchHandler);
searchQuery.addEventListener('click', inputHandler);

function searchHandler(event) {
  event.preventDefault();

  const inputQuery = searchQuery.value;

  if (inputQuery === '') {
    warningText.classList.remove('is-hidden-warn');
  } else {
    API.fetchData(searchQuery).then(films => {
      console.log(films.length);
      if (films.length >= 1) {
        gallery.innerHTML = '';
        renderCard(films, gallery).catch(error => console.log(error));
      } else {
        warningText.classList.remove('is-hidden-warn');
      }
    });
  }
}
function inputHandler(event) {
  const deletingWarning = document.querySelector('.header__warning-text-js');
  deletingWarning.classList.add('is-hidden-warn');
}
