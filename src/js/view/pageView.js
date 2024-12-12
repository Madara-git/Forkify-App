import View from './view';
import icons from 'url:../../../src/img/icons.svg';

class PageView extends View {
  _parentElement = document.querySelector('.pagination');

  addEvent(controlPage) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      let goTo = +btn.dataset.goto;
      controlPage(goTo);
    });
  }
  pervious(currentPage) {
    return `
    <button data-goto="${
      currentPage - 1
    }"  class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1} </span>
    </button>

  `;
  }
  nexPage(currentPage) {
    return `
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
       <span>Page ${currentPage + 1}</span>
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
       </svg>
     </button>`;
  }

  NumberOfPages(currentPage) {
    return `
    <div class="__show-pages"> 
      <p>${currentPage} pages</p>
    </div>

    `;
  }
  _generateView() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    if (currentPage === 1 && numPages === 1) {
      return `${this.NumberOfPages(numPages)}`;
    }
    if (currentPage === 1 && numPages > 1) {
      return `${this.nexPage(currentPage)} ${this.NumberOfPages(numPages)}`;
    }

    if (currentPage === numPages && numPages > 1) {
      return `${this.pervious(currentPage)} ${this.NumberOfPages(numPages)}`;
    }
    if (currentPage < numPages && this._data.page > 1) {
      return `${this.nexPage(currentPage)} ${this.pervious(
        currentPage
      )} ${this.NumberOfPages(numPages)}`;
    }
  }
}

export default new PageView();
