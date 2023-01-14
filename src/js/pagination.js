import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/components/_pagination.scss';

export default class FilmsPagination {
  constructor(filmsSearchInstance, totalItems) {
    this.filmsSearchInstance = filmsSearchInstance;
    this.options = {
      totalItems: totalItems,
      itemsPerPage: 20,
      visiblePages: 4,
      page: 1,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage:
          '<strong class="tui-page-btn tui-is-selected tui-main">{{page}}</strong>',
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
    this.pagination = new Pagination('pagination', this.options);
  }

}

export default function createPagination() {
    // const totalResult = responce.total_results;
    // const currentPage = responce.page;

    const instance = addPagination();
    instance.setItemsPerPage(20);
    instance.setTotalItems(totalResult);

    instance.movePageTo(currentPage);

    instance.on('afterMove', (event) => {
     const currentPage = event.page;
     console.log(currentPage);
    });

}

// import addPagination from './pagination';
// import createPagination from './pagination';

// const totalResult = res.total_results;
//     currentPage = res.page;

//     const instance = handlerPagination();
//     instance.setItemsPerPage(20);
//     instance.setTotalItems(totalResult);

//     instance.movePageTo(currentPage);

//     instance.on('afterMove', event => {
//       ApiServise.page = event.page;
//       currentPage = ApiServise.page;
//       createCard(currentPage);
//     });