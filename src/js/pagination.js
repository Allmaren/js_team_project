import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/components/_pagination.scss';

const options = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn  ">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected  ">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const addPagination = () => {
  const container = document.getElementById('tui-pagination-container');
  const instance = new Pagination(container, options);
  return instance;
};

export default addPagination;
// import addPagination from './pagination';

// function pag() {

//     const totalResult = responce.total_results;
//     currentPage = responce.page;

//     const instance = addPagination();
//     instance.setItemsPerPage(20);
//     instance.setTotalItems(totalResult);

//     instance.movePageTo(currentPage);

//     instance.on('afterMove', event => {
//       getFetchTrending.page = event.page;
//       currentPage = getFetchTrending.page;
//       renderTrendingCard(currentPage);
//     });
// }