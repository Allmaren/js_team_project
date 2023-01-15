import { createButtons } from './services/create-buttons';

export function renderModalMarkup(element, object) {
  element.insertAdjacentHTML('beforeend', createMovieItem(object));
  const buttons = document.querySelector('.about-descr');
  buttons.insertAdjacentHTML('beforeend', createButtons());
}

function createMovieItem({
  title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
  poster_path,
}) {
  const API_BASE_IMAGE = 'https://www.themoviedb.org/t/p/w500';
  return `<div class="modal-container">
  <div class="wrapper-movie-poster">
    <img
      class="movie-poster"
      src="${API_BASE_IMAGE}${poster_path}"
      alt="${title}"
      loading="lazy"
    />
    <div class="trailer-overlay">
      <button type="button" class="fetch-trailer"><span class="play">▷</span></button>
    </div>
  </div>

  <div class="info-thumb animate__animated animate__fadeInLeft">
    <table class="info">
      <caption class="movie-title">
        ${title.toUpperCase()}
      </caption>
      <tbody class="info-wrapper">
        <tr class="table-row">
          <td class="td">
            <p class="characteristic">Vote / Votes</p>
          </td>
          <td class="description">
            <span class="vote">${vote_average.toFixed(1)} </span>
            <span class="slash">/</span>
            <span class="votes">${vote_count} </span>
          </td>
        </tr>
        <tr class="table-row">
          <td class="td">
            <p class="characteristic">Popularity</p>
          </td>
          <td class="description">${popularity}</td>
        </tr>
        <tr class="table-row">
          <td class="td">
            <p class="characteristic">Original Title</p>
          </td>
          <td class="description">${title.toUpperCase()}</td>
        </tr>
        <tr class="table-row">
          <td class="td">
            <p class="characteristic">Genre</p>
          </td>
          <td class="description">${genres.map(el => el.name).join(', ')}</td>
        </tr>
      </tbody>
    </table>
    <h3 class="about">About</h3>
    <p class="about-descr">${overview}</p>
  </div>
</div>

`;
}
