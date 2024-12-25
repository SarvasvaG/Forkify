import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView.js';
import { START_PAGE } from './config.js';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    //1. Loading Recipe
    await model.loadRecipes(id);

    //2. Rendering Recipe
    recipeView.render(model.state.recipe);

    //3. Update the results view
    resultsView.update(model.getSearchPageResults());

    //4. Update the bookmarks view
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    console.error(err);
    recipeView.renderErrorMessage();
  }
};

const controlSearchRecipes = async function () {
  try {
    resultsView.renderSpinner();

    //1. Get Seacrh Query
    const query = searchView.getQuery();
    if (!query) throw new Error();

    //2. Load Results
    await model.loadSearchResults(query);

    //3. Render Results
    resultsView.render(model.getSearchPageResults(START_PAGE));

    //4. Render Pagination Buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    resultsView.renderErrorMessage();
    paginationView.clearParentAPI();
  }
};

const controlDisplayPage = function (goToPage) {
  //1. Render Results
  resultsView.render(model.getSearchPageResults(goToPage));

  //2. Render Pagination Buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the servings in the state
  model.updateServings(newServings);

  //Update the servings in the view.
  recipeView.update(model.state.recipe);
};

const controlAddBookmarks = function () {
  try {
    //1. Add the recipe to bookmarks in state
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

    //2. Display the bookmarked icon in recipeView
    recipeView.update(model.state.recipe);

    //3. Display the updated bookmarks list in bookmarkView
    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    console.error(err);
    bookmarksView.renderErrorMessage();
  }

  console.log(model.state.bookmarks);
  console.log(model.state.recipe.bookmarked);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(
      addRecipeView.hideWindow.bind(addRecipeView),
      MODAL_CLOSE_SEC * 1000
    );
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderErrorMessage(err.message);
  }
};

const controlInitialBookmarks = function () {
  try {
    //1. Set Bookmarks array in model
    model.initializeBookmarks();

    //2. Display each bookmark in view
    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    console.error(err);
    bookmarksView.renderErrorMessage();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmarks(controlAddBookmarks);
  searchView.addHandlerRender(controlSearchRecipes);
  paginationView.addHandlerClick(controlDisplayPage);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  controlInitialBookmarks();
};

init();
