import { ELEMENTHTML } from "./constant.js";
import { createElement, setIngredients } from "./function.js";
import { recipes } from "./recipe.js";
export let arr = recipes;

let recipeFilter = [];
let idRecipe = [];
let ing = [];
let app = [];
let us = [];

export const mainSearch = (e) => {
  console.time()
  const inputUser = e.target.value.toLowerCase();

  if (inputUser.length < 3) {
    return (ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>`);
  }

  recipeFilter = arr.filter((recipe) => recipe.name.toLowerCase().match(inputUser) || recipe.description.toLowerCase().match(inputUser));
  idRecipe = recipeFilter.map((recipeId) => recipeId.id);

  for (const recipe of arr) {
    for (const food of recipe.ingredients) {
      const ingredient = food.ingredient.toLowerCase();
      if ([...idRecipe].includes(recipe.id)) {
        continue;
      }
      if (ingredient.includes(inputUser)) {
        recipeFilter = [...recipeFilter, recipe];
      }
    }
  }

  createElement(recipeFilter);
  setIngredients(recipeFilter);
  list(recipeFilter);
};

const list = (a) => {

  const aaa = a.flatMap((item) => item.ingredients.map((el) => el.ingredient.toLowerCase()));
  const bbb = a.map((item) => item.appliance.toLowerCase());
  const ccc = a.flatMap((item) => item.ustensils).map((el) => el.toLowerCase());
  ing = aaa.filter((element, position) => aaa.indexOf(element) === position);
  app = bbb.filter((element, position) => bbb.indexOf(element) === position);
  us = ccc.filter((element, position) => ccc.indexOf(element) === position);
  showList(a);
};

const showList = (array) => {
  ELEMENTHTML.listFood.innerHTML = `${ing.map((ing) => `<li class="list-ingredient ing">${ing}</li>`).join("")}`;
  ELEMENTHTML.listItem.innerHTML = `${app.map((app) => `<li class="list-appliance object">${app}</li>`).join("")}`;
  ELEMENTHTML.listUStencil.innerHTML = `${us.map((us) => `<li class="list-utsensils item">${us}</li>`).join("")}`;
  choix(array);
  ELEMENTHTML.inputIngredient.addEventListener("input", (e) => filtreList(e));
  ELEMENTHTML.inputAppliance.addEventListener("input", (e) => filtreList(e));
ELEMENTHTML.inputUstencil.addEventListener("input", (e) => filtreList(e));
};

export const filtreList = (e) => {
let inputUser = e.target.value.toLowerCase();
[...document.querySelectorAll("li")].forEach(el => {
  if( !el.innerHTML.includes(inputUser)){
    el.style.display="none"
  }
})
}

const choix = (array) => {
  ELEMENTHTML.inputIngredient.value="";
  [...document.querySelectorAll("li")].forEach((el) => el.addEventListener("click", () => add(el, array)));
};

const add = (element, array) => {
  ELEMENTHTML.allTags.innerHTML += element.innerHTML;
  filtrage(element.innerHTML, array);
};

const filtrage = (tag, array) => {
  let stockageTemporay = [];
  for (const recipe of array) {
    for (const food of recipe.ingredients) {
      const ingredient = food.ingredient.toLowerCase();
      if (ingredient.includes(tag.toLowerCase())) {
        stockageTemporay = [...stockageTemporay, recipe];
      }
    }
    const appliance = recipe.appliance.toLowerCase();
    if (appliance.includes(tag.toLowerCase())) {
      stockageTemporay = [...stockageTemporay, recipe];
    }

    for (const ustensil of recipe.ustensils) {
      if (ustensil.includes(tag.toLowerCase())) {
        stockageTemporay = [...stockageTemporay, recipe];
      }
    }
  }

  array = stockageTemporay;
  createElement(array);
  setIngredients(array);
  list(array);
  console.timeEnd()
};


  ELEMENTHTML.inputIngredient.addEventListener("click", () => {
    if(!ELEMENTHTML.mainSearch.value){
      list(arr)
    }
  })
