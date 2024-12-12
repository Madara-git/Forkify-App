import { API_URL, RES_PER_PAGE, KEY } from './config';
import { ajax } from './helper';
export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    resultPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookMark: [],
};
loading();

function createDataObject(recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    serving: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
    bookMarked: true,
  };
}

export const loadRecipe = async function (id) {
  try {
    const data = await ajax(`${API_URL}/${id}?key=${KEY}`);
    let { recipe } = data.data;
    state.recipe = createDataObject(recipe);
    if (state.bookMark.some(marks => marks.id === id))
      state.recipe.bookMarked = true;
    else state.recipe.bookMarked = false;
  } catch (er) {
    throw er;
  }
};
export async function loadingSearchQuery(query) {
  try {
    state.search.query = query;
    const data = await ajax(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.result = data.data.recipes.map(res => {
      return {
        id: res.id,
        title: res.title,
        publisher: res.publisher,
        image: res.image_url,
        ...(res.key && { key: res.key }),
      };
    });
  } catch (er) {
    throw er;
  }
}
export function getSeatchResaultPage(page = 1) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.result.slice(start, end);
}

export function updateServing(newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.serving;
  });
  state.recipe.serving = newServing;
}

function persistBookMark() {
  localStorage.setItem('bookMarks', JSON.stringify(state.bookMark));
}

export function addBookMark(recipe) {
  state.bookMark.push(recipe);

  if (state.recipe.id === recipe.id) state.recipe.bookMarked = true;
  persistBookMark();
}

export function removeBokkMark(delId) {
  const id = state.bookMark.findIndex(el => el.id === delId);
  if (state.recipe.id === delId) state.recipe.bookMarked = false;
  if (state.recipe.id === delId) state.bookMark.splice(id, 1);

  persistBookMark();
}

export function loading() {
  if (localStorage.getItem('bookMarks')) {
    const bookMarks = localStorage.getItem('bookMarks');
    state.bookMark = JSON.parse(bookMarks);
  }
}

export async function uploadRecipe(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',');
        if (ingArr.length !== 3)
          throw new Error('WONG INGREDIENT FORMAT PLEASE USE THE RIGHT ROMAT');

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await ajax(`${API_URL}?key=${KEY}`, recipe);
    addBookMark(data.data.recipe);
    state.recipe = createDataObject(data.data.recipe);
  } catch (er) {
    throw er;
  }
}
