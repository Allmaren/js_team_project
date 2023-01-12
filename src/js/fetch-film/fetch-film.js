import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FetchData from '../fetch-film/fetch-data';
// import LoadMoreButton from './js/loadMoreBtn';

const inputRequest = new FetchData();
// const loadMoreButton = new LoadMoreButton({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', searchHandler);
loadMoreBtn.addEventListener('click', loadMoreHandler);

async function searchHandler(event) {
  event.preventDefault(); //Чтоб не перезагружалась страничка при субмите формы

  // if (!loadMoreBtn.classList.contains('is-hidden')) {
  //   loadMoreBtn.classList.add('is-hidden');
  // }

  inputRequest.searchQuery = event.currentTarget.elements.searchQuery.value;
  inputRequest.resetPage();

  try {
    if (inputRequest.searchQuery === '') {
      clearList();
      Notiflix.Notify.failure('Please enter your search data.');
    } else {
      // loadMoreButton.show();
      // loadMoreButton.disable();
      const response = await inputRequest.makesRequest();
      const {
        data: { hits, totalHits },
      } = response;
      clearList();
      // loadMoreButton.enable();

      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        // loadMoreBtn.classList.remove('is-hidden');
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        createGalleryList(hits);
      }

      // loadMoreButton.show();
    }
  } catch (error) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    console.log(error.message);

    // loadMoreButton.enable();
  }
}

async function loadMoreHandler() {
  const response = await inputRequest.makesRequest();
  const {
    data: { hits },
  } = response;

  if (hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else createGalleryList(hits);
}

async function createGalleryList(event) {
  const markup = event
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `  <div class="photo-card">
        <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>
  `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  simpleLightbox();
  scroll();
}

function clearList() {
  gallery.innerHTML = '';
}

function simpleLightbox() {
  let lightbox = new SimpleLightbox('.gallery a', {
    captions: false,
    captionDelay: 250,
    enableKeyboard: true,
    doubleTapZoom: 5,
  });
  lightbox.refresh();
}

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
