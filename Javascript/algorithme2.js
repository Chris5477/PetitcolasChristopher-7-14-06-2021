import { ELEMENTHTML } from "./constant.js";
import { createElement, setIngredients } from "./function.js";
import { recipes } from "./recipe.js";

export const searchRecipe = (e) => {
  const inputUser = e.target.value;

  if (inputUser.length < 3) {
    ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Pour commencer la recherche , veuillez saisir au minimum 3 caractères</p>`;
  }

  let recipeFilter = [];

  recipeFilter = recipes.filter(
    (item) => item.name.toLowerCase().match(inputUser.toLowerCase()) || item.description.toLowerCase().match(inputUser.toLowerCase())
  );

  for (const key in recipes) {
    const vvv = recipes[key];
    const www = recipes[key].ingredients;
    for (const index in www) {
      if (www[index].ingredient.toLowerCase().includes(inputUser.toLowerCase())) {
        recipeFilter = [...recipeFilter, vvv];
      }
    }
  }
  createElement(recipeFilter);
  setIngredients(recipeFilter);
};
