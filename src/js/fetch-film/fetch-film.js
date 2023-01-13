import API from '../fetch-film/fetch-data';

const searchForm = document.querySelector('.header__form');
const gallery = document.querySelector('.search-film__by-name-js');
const headerSearchContainer = document.querySelector('.header__search-cont');
const searchQuery = document.querySelector('.search-film__input');

searchForm.addEventListener('submit', searchHandler);
// searchQuery.addEventListener('click', inputHandler);

function searchHandler(event) {
  event.preventDefault();

  API.fetchData(searchQuery.value)
    .then(renderSearchingResults)
    .catch(error => console.log(error));

  if (searchQuery.value === '') {
    const warningText = `<p class='header__warning-text-js'>Search result not successful. Enter the correct movie name and retry searching please.</p>`;
    headerSearchContainer.insertAdjacentHTML('beforeend', warningText);
  }
}
function renderSearchingResults(results) {
  const cardEl = results
    .map(result => {
      return `<li class="trending__item">
    <img class=" card__img" src="https://www.themoviedb.org/t/p/w500${result.poster_path}"
      onerror="this.onerror=null;this.src='https://subscribenow.com.au/time/asia/Solo/Content/Images/noCover.gif'" loading="lazy"
      alt="${result.title}" title="${result.title}" data-id="${result.id}" width="280"/>
<h3 class="card__title">${result.title}</h3>
<div class="card-field">
    <p class="text__vote">${film.release_date}</p>
</div>
</li>`;
    })
    .join('');

  gallery.innerHTML = '';
  gallery.insertAdjacentHTML('beforeend', cardEl);
}

// function inputHandler(event) {
//   const deletingWarning = document.querySelector('.header__warning-text-js');
//   deletingWarning.remove();
// }
// //

// // loadMoreBtn.addEventListener('click', loadMoreHandler);

// async function searchHandler(event) {
//   event.preventDefault();

//   // if (!loadMoreBtn.classList.contains('is-hidden')) {
//   //   loadMoreBtn.classList.add('is-hidden');
//   // }

//   inputRequest.searchQuery = event.currentTarget.elements.searchQuery.value;
//   inputRequest.resetPage();

//   try {
//     if (inputRequest.searchQuery === '') {
//       const warningText = `<p class='header__warning-text-js'>Search result not successful. Enter the correct movie name and retry searching please.</p>`;
//       headerSearchContainer.insertAdjacentHTML('afterend', warningText);
//       clearList();
//       Notiflix.Notify.failure('Please enter your search data.');
//     } else {
//       // loadMoreButton.show();
//       // loadMoreButton.disable();
//       const response = await inputRequest.makesRequest();
//       const {
//         data: { results, total_results },
//       } = response;
//       clearList();
//       // loadMoreButton.enable();

//       if (results.length === 0) {
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//       } else {
//         // loadMoreBtn.classList.remove('is-hidden');

//         Notiflix.Notify.success(`Hooray! We found ${total_results} images.`);
//         createGalleryList(results);
//       }

//       // loadMoreButton.show();
//     }
//   } catch (error) {
//     Notiflix.Notify.failure(
//       "We're sorry, but you've reached the end of search results."
//     );
//     console.log(error.message);

//     // loadMoreButton.enable();
//   }
// }

// // async function loadMoreHandler() {
// //   const response = await inputRequest.makesRequest();
// //   const {
// //     data: { hits },
// //   } = response;

// //   if (hits.length === 0) {
// //     Notiflix.Notify.failure(
// //       'Sorry, there are no images matching your search query. Please try again.'
// //     );
// //   } else createGalleryList(hits);
// // }

// async function createGalleryList(event) {
//   const cardEl = films
//     .map(film => {
//       return `<li class="trending__item">
//     <img class=" card__img" src="https://www.themoviedb.org/t/p/w500${film.poster_path}"
//       onerror="this.onerror=null;this.src='https://subscribenow.com.au/time/asia/Solo/Content/Images/noCover.gif'" loading="lazy"
//       alt="${film.title}" title="${film.title}" data-id="${film.id}" width="280"/>
// <h3 class="card__title">${film.title}</h3>
// <div class="card-field">
//     <p class="text__vote">${film.release_date}</p>
// </div>

// </li>`;
//     })
//     .join('');
//   //   const markup = event
//   //     .map(
//   //       ({
//   //         webformatURL,
//   //         largeImageURL,
//   //         tags,
//   //         likes,
//   //         views,
//   //         comments,
//   //         downloads,
//   //       }) => {
//   //         return `  <div class="photo-card">
//   //         <a href="${largeImageURL}">
//   //   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   //   <div class="info">
//   //     <p class="info-item">
//   //       <b>Likes ${likes}</b>
//   //     </p>
//   //     <p class="info-item">
//   //       <b>Views ${views}</b>
//   //     </p>
//   //     <p class="info-item">
//   //       <b>Comments ${comments}</b>
//   //     </p>
//   //     <p class="info-item">
//   //       <b>Downloads ${downloads}</b>
//   //     </p>
//   //   </div>
//   // </div>
//   //   `;
//   //       }
//   //     )
//   //     .join('');

//   gallery.insertAdjacentHTML('beforeend', cardEl);

//   // simpleLightbox();
//   scroll();
// }

// function clearList() {
//   gallery.innerHTML = '';
// }

// // function simpleLightbox() {
// //   let lightbox = new SimpleLightbox('.gallery a', {
// //     captions: false,
// //     captionDelay: 250,
// //     enableKeyboard: true,
// //     doubleTapZoom: 5,
// //   });
// //   lightbox.refresh();
// // }

// function scroll() {
//   const { height: cardHeight } = document
//     .querySelector('.container')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }
