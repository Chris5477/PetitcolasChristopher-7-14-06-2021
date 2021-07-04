import { ELEMENTHTML } from "./constant.js";
import { addTags } from "./function.js";
import { recipes } from "./recipe.js";

let recipeFilter = []; // modif
export const searchRecipe = (e) => {

  const inputUser = e.target.value.toLowerCase();
  if (inputUser.length < 3) {
    ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Pour commencer la recherche , veuillez saisir au minimum 3 caractères</p>`;
  }


  recipeFilter = recipes.filter(
    (item) => item.name.toLowerCase().match(inputUser) || item.description.toLowerCase().match(inputUser)
  );

  for (const key in recipes) {
    const resultRecipe = recipes[key];
    const listIngredient = recipes[key].ingredients;
    for (const index in listIngredient) {
      const ing = listIngredient[index].ingredient
      if(ELEMENTHTML.doAChoice[0].innerHTML.includes(`<li>${ing}</li>`)){
        continue;
      }
      if(ing.toLowerCase().includes(inputUser)) {
        recipeFilter = [...recipeFilter, resultRecipe];
        ELEMENTHTML.doAChoice[0].innerHTML+=`<li>${ing}</li>`;
        ELEMENTHTML.doAChoice[0].classList.add("list-ingredient")
      }
    }
  }
  [...document.querySelectorAll("li")].forEach(food => food.addEventListener("click", () => addTags(food, 0, "list-ingredient", "blueTag")))
};
// Fonction qui a le même principe que searchIngredient
export const searchAppliance = (e) => {
  const inputUser = e.target.value;
  for (let i = 0; i < recipes.length; i++) {
    const appliance = recipes[i].appliance.toLowerCase();
    if(ELEMENTHTML.doAChoice[1].innerHTML.includes(`<li>${appliance}</li>`)){
      continue;
    }
    if (appliance.match(inputUser.toLowerCase())){
      ELEMENTHTML.doAChoice[1].innerHTML += `<li>${appliance}</li>`;
      ELEMENTHTML.doAChoice[1].classList.add("list-appliance");
    }
  }
  [...document.querySelectorAll("li")].forEach((item) => item.addEventListener("click", () => addTags(item, 1, "list-appliance", "greenTag")));
};

// fonction qui a le même princie que searchIngredient et SearchAplliance
export const searchUstencil = (e) => {
  const inputUser = e.target.value;
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ustensils.length; j++) {
      const ustensil = recipes[i].ustensils[j].toLowerCase();
      if(ELEMENTHTML.doAChoice[2].innerHTML.includes(`<li>${ustensil}</li>`)){
        continue;
      }
      if (ustensil.match(inputUser.toLowerCase())) {
        ELEMENTHTML.doAChoice[2].innerHTML += `<li>${ustensil}</li>`;
        ELEMENTHTML.doAChoice[2].classList.add("list-ustensils");
      }
    }
  }
  [...document.querySelectorAll("li")].forEach((item) => item.addEventListener("click", () => addTags(item, 2, "list-ustensils", "redTag")));
};
