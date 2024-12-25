import iconsImage from 'url:../../img/icons.svg';

export class View {
  _data;

  render(data) {
    if (!data || (data instanceof Array && data.length === 0))
      throw new Error();
    this._data = data;
    const markup = this._generateMarkup();
    this._clearParent();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `<div class="spinner">
                <svg>
                  <use href="${iconsImage}#icon-loader"></use>
                </svg>
              </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderErrorMessage(message = this._errorMessage) {
    const markup = `<div class="error">
                <div>
                  <svg>
                    <use href="${iconsImage}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;
    this._clearParent();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
                <div>
                  <svg>
                    <use href="${iconsImage}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;
    this._clearParent();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }
  _clearParent() {
    this._parentElement.innerHTML = '';
  }

  clearParentAPI() {
    this._parentElement.innerHTML = '';
  }
}
