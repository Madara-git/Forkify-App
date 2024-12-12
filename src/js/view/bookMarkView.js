import PreviewView from './previewView';

class BookMarkView extends PreviewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `no book marks yet. find a nice recipe and book mark it :)`;
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookMarkView();
