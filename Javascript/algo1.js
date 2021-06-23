import { ELEMENTHTML } from "./constant.js";
import { createElement, setIngredients, toSuggestIngredient } from "./function.js";
import { recipes } from "./recipe.js";

//Entree => valeur utilisateur : Sortie => une liste (array) -> recettes filtrées
// 1/ Recherche dans le titre , puis dans la description , puis sous tableau ingredient

export const searchRecipe = (e) => {
  const inputUser = e.target.value;
  let recipeFilter = [];
  if (inputUser.length < 3) {
    ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Pour commencer la recherche , veuillez saisir au minimum 3 caractères</p>`;
  }

  //recipes.name => recherche de titre

  for (let i = 0; i < recipes.length; i++) {
    const currentRecipe = recipes[i];
    if (currentRecipe.name.toLowerCase().match(inputUser.toLowerCase())) {
      recipeFilter = [...recipeFilter, currentRecipe];
    }
    if(currentRecipe.description.toLowerCase().match(inputUser.toLowerCase())){
        recipeFilter = [...recipeFilter, currentRecipe]
    }

    for (let k = 0; k < currentRecipe.ingredients.length; k++) {
        const element = currentRecipe.ingredients[k].ingredient;
        if(element.toLowerCase().includes(inputUser.toLowerCase())){
            recipeFilter = [...recipeFilter, currentRecipe]
        }
    }
    
  }
  createElement(recipeFilter)
  setIngredients(recipeFilter)
  toSuggestIngredient(recipeFilter)
};


