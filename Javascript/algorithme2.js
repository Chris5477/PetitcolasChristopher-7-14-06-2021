import { ELEMENTHTML } from "./constant.js";
import { addTags } from "./function.js";
import { recipes } from "./recipe.js";

export const searchRecipe = (e) => {
 
  const inputUser = e.target.value.toLowerCase();

  if (inputUser.length < 3) {
    ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Pour commencer la recherche , veuillez saisir au minimum 3 caractères</p>`;
  }

  let recipeFilter = [];

  recipeFilter = recipes.filter(
    (item) => item.name.toLowerCase().match(inputUser) || item.description.toLowerCase().match(inputUser)
  );

  for (const key in recipes) {
    const resultRecipe = recipes[key];
    const listIngredient = recipes[key].ingredients;
    for (const index in listIngredient) {
      if (listIngredient[index].ingredient.toLowerCase().includes(inputUser)) {
        recipeFilter = [...recipeFilter, resultRecipe];
        ELEMENTHTML.doAChoice[0].innerHTML+=`<li>${listIngredient[index].ingredient}</li>`;
        ELEMENTHTML.doAChoice[0].classList.add("list-ingredient")
      }
    }
  }
  [...document.querySelectorAll("li")].forEach(food => food.addEventListener("click", () => addTags(food, 0, "list-ingredient", "blueTag")))
};
