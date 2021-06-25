import { ELEMENTHTML } from "./constant.js";
import { createElement, setIngredients, addTag } from "./function.js";
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
    const resultRecipe = recipes[key];
    const listIngredient = recipes[key].ingredients;
    for (const index in listIngredient) {
      if (listIngredient[index].ingredient.toLowerCase().includes(inputUser.toLowerCase())) {
        recipeFilter = [...recipeFilter, resultRecipe];
        ELEMENTHTML.restIngredient.innerHTML+=`<li>${listIngredient[index].ingredient}</li>`;
      }
    }
  }
  
  createElement(recipeFilter);
  setIngredients(recipeFilter);
  [...document.querySelectorAll("li")].forEach(li => (li.addEventListener("click",() => addTag(li.innerHTML))))
  
  

};
