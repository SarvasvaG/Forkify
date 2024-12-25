import { iconsImage, View } from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(+btn.dataset.goTo);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    let markup = '';
    if (numPages === 1) return markup;
    if (this._data.page !== 1) markup += this._generateButton('prev');
    if (this._data.page !== numPages) markup += this._generateButton('next');
    return markup;
  }

  _generateButton(buttonType) {
    const displayButton =
      buttonType === 'prev' ? this._data.page - 1 : this._data.page + 1;

    return `<button data-go-to="${displayButton}"class="btn--inline pagination__btn--${buttonType}">
            <svg class="search__icon">
              <use href="${iconsImage}#icon-arrow-${
      buttonType === 'prev' ? 'left' : 'right'
    }"></use>
            </svg>
            <span>Page ${displayButton}</span>`;
  }
}

export default new PaginationView();
