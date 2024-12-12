import icons from 'url:../../../src/img/icons.svg';

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.displayError();
    this._data = data;
    const markup = this._generateView();
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
  renderSpier() {
    const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateView();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    const currentElement = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElement.forEach((newEl, i) => {
      const curEl = currentElement[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  displayError(message = this._errorMessage) {
    const htmlError = ` <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', htmlError);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderMessage(message = this.message) {
    const mes = ` <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', mes);
  }
}
