import View from './view';
class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _closeBtn = document.querySelector('.btn--close-modal');
  _openBtn = document.querySelector('.nav__btn--add-recipe');
  message = `recipe has been uploaded`;
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  _addHandlerShowWindow() {
    this._openBtn.addEventListener(
      'click',
      this._handleTaggleHidden.bind(this)
    );
  }

  _addHandlerHideWindow() {
    this._closeBtn.addEventListener(
      'click',
      this._handleTaggleHidden.bind(this)
    );
    this._overlay.addEventListener(
      'click',
      this._handleTaggleHidden.bind(this)
    );
  }

  _handleTaggleHidden() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const dataObj = Object.fromEntries(dataArr);
      console.log(dataObj);
      handler(dataObj);
    });
  }
}
export default new addRecipeView();
