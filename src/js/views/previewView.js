import { mark } from 'regenerator-runtime';
import { View } from './View.js';
import iconsImage from 'url:../../img/icons.svg';

export default class PreviewView extends View {
  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data
      .map(
        recipe =>
          `<li class="preview">
                <a class="preview__link ${
                  recipe.id === id ? 'preview__link--active' : ''
                }" href="#${recipe.id}">
                  <figure class="preview__fig">
                    <img src="${recipe.image}" alt="${recipe.title}" />
                  </figure>
                  <div class="preview__data">
                    <h4 class="preview__title">${recipe.title}</h4>
                    <p class="preview__publisher">${recipe.publisher}</p>
                    <div class="preview__user-generated ${
                      recipe.key ? '' : 'hidden'
                    }">
                      <svg>
                        <use href="${iconsImage}#icon-user"></use>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>`
      )
      .join('\n');
  }
}
