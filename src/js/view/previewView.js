import View from './view';
import icons from 'url:../../../src/img/icons.svg';
class PreviewView extends View {
  _generateView() {
    return this._data.map(this._generateViewPreview.bind(this));
  }
  _generateViewPreview(res) {
    const id = window.location.hash.slice(1);
    return `
      <li class="preview ${res.id === id ? 'preview__link--active' : ''}">
         <a class="preview__link " href="#${res.id}">
           <figure class="preview__fig">
             <img src="${res.image}" alt="${res.title}" />
           </figure>
            <div class="preview__data">
             <h4 class="preview__title">${res.title}</h4>
             <p class="preview__publisher">${res.publisher}</p>
           <div class="recipe__user-generated ${res.key ? '' : 'hidden'} ">
              <svg>
                 <use href="${icons}#icon-user"></use>
              </svg>
          </div>
            </div>
         </a>
     </li>
     `;
  }
}

export default PreviewView;
