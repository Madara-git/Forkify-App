//API LINK
// https://forkify-api.herokuapp.com/v2
import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './view/reciveView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import pageView from './view/pageView.js';
import reciveView from './view/reciveView.js';
import bookMarkView from './view/bookMarkView.js';
import addRecipeView from './view/addRecipeView.js';

async function showRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render loading spinner
    recipeView.renderSpier();

    // Update the results view with the current page
    resultView.update(model.getSeatchResaultPage(model.state.search.page));
    bookMarkView.update(model.state.bookMark);

    // Load the recipe
    await model.loadRecipe(id);

    // Render the recipe
    recipeView.render(model.state.recipe);
  } catch (er) {
    recipeView.displayError();
    console.error(er);
  }
}

async function controllerSearchQuery() {
  try {
    resultView.renderSpier();
    const query = searchView.getQuery();
    if (!query) throw Error('Please Enter a recipe');
    if (!query) return;

    await model.loadingSearchQuery(query);
    resultView.render(model.getSeatchResaultPage());

    pageView.render(model.state.search);
  } catch (er) {
    resultView.displayError(er.message);
  }
}

function controllPage(goTo) {
  resultView.render(model.getSeatchResaultPage(goTo));
  pageView.render(model.state.search);
}

function controllServings(updatedValue) {
  model.updateServing(updatedValue);
  recipeView.update(model.state.recipe);
}

function controllerAddNewBookMark() {
  if (!model.state.recipe.bookMarked) {
    model.addBookMark(model.state.recipe);
  } else {
    model.removeBokkMark(model.state.recipe.id);
  }

  reciveView.update(model.state.recipe);

  bookMarkView.render(model.state.bookMark);
}

function controlLocalStorage() {
  bookMarkView.render(model.state.bookMark);
}

async function controllAddRecipe(recivedData) {
  try {
    await model.uploadRecipe(recivedData);
    addRecipeView.renderSpier();
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    window.history.pushState(null, ' ', `#${model.state.recipe.id}`);
    bookMarkView.render(model.state.bookMark);
    setTimeout(() => {
      addRecipeView._handleTaggleHidden();
    }, 1000);
  } catch (er) {
    console.log(er);
    addRecipeView.displayError(er.message);
  }
}
function clearHash() {
  window.addEventListener('load', () => {
    history.pushState(null, '', window.location.hostname);
  });
}
function init() {
  clearHash();
  bookMarkView.addHandlerRender(controlLocalStorage);
  recipeView.addEventHandler(showRecipe);
  searchView.eventHandler(controllerSearchQuery);
  pageView.addEvent(controllPage);
  recipeView.handleIngredients(controllServings);
  recipeView.addEventHandleBookMarked(controllerAddNewBookMark);
  addRecipeView.addHandlerUpload(controllAddRecipe);
}
init();
