import API from '../fetch-film/fetch-data';
import renderCard from '../render';

const searchForm = document.querySelector('.header__form');
const gallery = document.querySelector('.search-film__by-name-js');
const headerSearchContainer = document.querySelector('.header__search-cont');
let searchQuery = document.querySelector('.search-film__input');
const warningText = document.querySelector('.header__warning-text-js');

// console.log(searchQuery.value);

searchForm.addEventListener('submit', searchHandler);
searchQuery.addEventListener('click', inputHandler);

function searchHandler(event) {
  event.preventDefault();

  const inputQuery = searchQuery.value;

  if (inputQuery === '') {
    warningText.classList.remove('is-hidden-warn');
  } else if (inputQuery !== '') {
    API.fetchData(searchQuery).then(films => {
      gallery.innerHTML = '';
      renderCard(films, gallery).catch(error => console.log(error));
    });
  }
}
function inputHandler(event) {
  const deletingWarning = document.querySelector('.header__warning-text-js');
  deletingWarning.classList.add('is-hidden-warn');
}
