const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = '57c452bac8b733cbb049921c3a15e368';

function fetchData() {
  const params = `api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;
  const url = `${BASE_URL}?${params}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      data.results;
      console.log(data.results);
    });
}

export default { fetchData };

// import axios from 'axios';

// // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
// const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
// const API_KEY = '57c452bac8b733cbb049921c3a15e368';

// export default class FetchData {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   async makesRequest() {
//     const params = new URLSearchParams({
//       api_key: API_KEY,
//       query: this.searchQuery,
//       language: 'en-US',
//       include_adult: false,
//       page: this.pageAmount,
//     });
//     const url = `${BASE_URL}?${params}`;
//      return await axios.get(url);
//   }
//   incrementPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQueary = newQuery;
//   }
// }
