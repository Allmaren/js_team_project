import * as basicLightbox from 'basiclightbox';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

let trailer;
window.lang = 'en';

export function initTrailerListener(modal, movieId){

  document.querySelector(".fetch-trailer")
    .addEventListener("click",() => {
    fetchVideo(movieId);

  })
}

function openVideoModal(key) {
  Loading.dots({ svgColor: '#FF001B' });
  trailer =
    basicLightbox.create(`
<div class='video_trailer' >
  <iframe class='video_frame' height='315' src='https://www.youtube.com/embed/${key}'
     title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
     picture-in-picture' allowfullscreen></iframe><button type='button'
     <img srs='/src/images/sprite.svg#close' width='16' alt='close' class='trailer-close'>
    X</button>
         </div>`);
  trailer.show();
  const close = document.querySelector(".trailer-close");
  document.addEventListener("keydown", closeTrailer);
  close.addEventListener("click", closeTrailerButton);
  const backdropMovieTrailer = document.querySelector('.backdrop-movie');
  backdropMovieTrailer.addEventListener("click", toggleTrailer)



  Loading.remove(1000);
}


function fetchVideo(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=29deaaf716fa79e249465a6fdd70c034&append_to_response=videos&language=${window.lang}`
  )
    .then(resp => resp.json())
    .then(data => renderTrailer(data));
};

function renderTrailer(data) {
  let key;
  if (lang === 'en') {
    data.videos.results.forEach(video => {
      video.name.includes('Official') && video.site.includes('YouTube')
        ? (key = video.key)
        : (key = 'WHeOZLmXxn8');
    });
  } else {
    data.videos.results.forEach(video => {
      video.name.includes('трейлер') && video.site.includes('YouTube')
        ? (key = video.key)
        : (key = 'WHeOZLmXxn8');
    });
  }

  openVideoModal(key)
};

function closeTrailerButton(e){
  trailer.close()

};
function toggleTrailer(e){
  trailer.close();
};

function closeTrailer(e){
  if (e.key === 'Escape') {
    trailer.close();
  }

}


