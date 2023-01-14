export default async function renderCard(movies, ulSelector) {
  await getGenreList();
  const cardElem = movies
    .map(
      ({
        original_title,
        poster_path,
        vote_average,
        id,
        release_date,
        genre_ids,
      }) => {
        return `
        <li class="card-item" >
          <div class="card-item__img">
          <img src="${
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : './images/no_image.png'
          }"  alt="${original_title}" data-id="${id}" loading="lazy">
          </div>
          <h3 class="card-item__title">${original_title}</h3>
          <p class="card-item__info">
            <span>${genre_ids
              .slice(0, 2)
              .map(genre => genreList[genre])
              .join(', ')}${
          genre_ids.length
            ? genre_ids.length > 2
              ? ', Other'
              : ''
            : 'No genre'
        } </span> <span>${release_date.slice(0, 4)}</span>
            <span class="card-item__vote"> ${vote_average.toFixed(1)}</span>
          </p>
        </li>`;
      }
    )
    .join('');
  // ulSelector.insertAdjacentHTML('beforeend', cardElem);
  ulSelector.innerHTML = cardElem;
}
const genreList = {};
async function getGenreList() {
  if (Object.keys(genreList).length) return;
  const response = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=bea7dcda7b46099606e243fc961918ee'
  );
  const { genres } = await response.json();
  genres.forEach(el => {
    genreList[el.id] = el.name;
  });
}
