class searchView {
  _searchInput = document.querySelector('.search');

  getQuery() {
    const query = this._searchInput.querySelector('.search__field').value;
    if (query) {
      this._clearSearchView();
      return query;
    }
  }
  eventHandler(searchLoad) {
    this._searchInput.addEventListener('submit', function (e) {
      e.preventDefault();
      searchLoad();
    });
  }
  _clearSearchView() {
    this._searchInput.querySelector('.search__field').value = '';
  }
}

export default new searchView();
