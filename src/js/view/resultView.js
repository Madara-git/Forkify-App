import PreviewView from './previewView';
class ResultView extends PreviewView {
  _parentElement = document.querySelector('.results');
  _errorMessage = `couldn't find this query`;
}

export default new ResultView();
