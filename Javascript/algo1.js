import { ELEMENTHTML } from "./constant.js";
import { createElement, setIngredients, addTags} from "./function.js";
import { recipes } from "./recipe.js";

export const searchRecipe = (e) => {
  const inputUser = e.target.value.toLowerCase();

  

  let recipeFilter = [];
  if (inputUser.length < 3) {
    ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Pour commencer la recherche , veuillez saisir au minimum 3 caractères</p>`;
  }

  for (let i = 0; i < recipes.length; i++) {
    const currentRecipe = recipes[i];
    if (currentRecipe.name.toLowerCase().match(inputUser)) {
      recipeFilter = [...recipeFilter, currentRecipe];
    }

    for (let j = 0; j < currentRecipe.length; j++) {
      if (currentRecipe.description.toLowerCase().match(inputUser)) {
        if (!currentRecipe.id.includes(recipeFilter[j].id)) {
          recipeFilter = [...recipeFilter, currentRecipe];
        } else {
          continue;
        }
      }
    }

    for (let k = 0; k < currentRecipe.ingredients.length; k++) {
      const element = currentRecipe.ingredients[k].ingredient;
      if (element.toLowerCase().includes(inputUser)) {
        recipeFilter = [...recipeFilter, currentRecipe];
        ELEMENTHTML.doAchoice[0].innerHTML += `<li>${element}</li>`;
        ELEMENTHTML.doAchoice[0].classList.add("list-ingredient")
      }
    }
    
  }
  [...document.querySelectorAll("li")].forEach((food) => food.addEventListener("click", () => addTags(food, 0, "list-ingredient")));
};
