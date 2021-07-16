import { ELEMENTHTML } from "./constant.js";
import { createElement, setIngredients, setTypeTag, removeTag } from "./function.js";
import { recipes } from "./recipe.js";
export let copyRecipes = recipes;

let recipeFilter = [];
let idRecipe = [];
let allIngredients = [];
let allAppliances = [];
let allUstensils = [];
let historySearch = [];

export const searchByMainInput = (e) => {
  const inputUser = e.target.value.toLowerCase();

  if (inputUser.length < 3) {
    recipeFilter = []
    idRecipe = []
    return (ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>`);
  }

  recipeFilter = copyRecipes.filter((recipe) => recipe.name.toLowerCase().match(inputUser) || recipe.description.toLowerCase().match(inputUser));
  idRecipe = recipeFilter.map((recipeId) => recipeId.id);

  for (const recipe of copyRecipes) {
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

export const createList = (array) => {
  const listTemporyIngredient = array.flatMap((item) => item.ingredients.map((el) => el.ingredient.toLowerCase()));
  const listTemporyAppliance = array.map((item) => item.appliance.toLowerCase());
  const listTemporyUstensil = array.flatMap((item) => item.ustensils).map((el) => el.toLowerCase());
  allIngredients = listTemporyIngredient.filter((element, position) => listTemporyIngredient.indexOf(element) === position);
  allAppliances = listTemporyAppliance.filter((element, position) => listTemporyAppliance.indexOf(element) === position);
  allUstensils = listTemporyUstensil.filter((element, position) => listTemporyUstensil.indexOf(element) === position);
  showList(array);
};

const showList = (array) => {
  ELEMENTHTML.listFood.innerHTML = `${allIngredients.map((ingredient) => `<li class="list-ingredient ing">${ingredient}</li>`).join("")}`;
  ELEMENTHTML.listItem.innerHTML = `${allAppliances.map((appliance) => `<li class="list-appliance object">${appliance}</li>`).join("")}`;
  ELEMENTHTML.listUStencil.innerHTML = `${allUstensils.map((ustensil) => `<li class="list-ustencil ustencil">${ustensil}</li>`).join("")}`;
  choiceInList(array);
  ELEMENTHTML.inputIngredient.addEventListener("input", (e) => filteredList(e));
  ELEMENTHTML.inputAppliance.addEventListener("input", (e) => filteredList(e));
  ELEMENTHTML.inputUstencil.addEventListener("input", (e) => filteredList(e));
};

 const filteredList = (e) => {
  let inputUser = e.target.value.toLowerCase();
  [...document.querySelectorAll("li")].forEach((el) => {
    if (inputUser.length >= 3 && !el.innerHTML.includes(inputUser)) {
      el.style.display = "none";
    }
  });
};

const choiceInList = (array) => {
  ELEMENTHTML.inputIngredient.value = "";
  ELEMENTHTML.inputAppliance.value = "";
  ELEMENTHTML.inputUstencil.value = "";
  [...document.querySelectorAll("li")].forEach((el) => el.addEventListener("click", () => addTag(el, array)));
};

const addTag = (element, array) => {
  let classTag = setTypeTag(element);
  ELEMENTHTML.allTags.innerHTML += `<p class="tag ${classTag}">${element.innerHTML}<span class="far fa-times-circle"></span></p>`;
  stepRecipeFiltered(element.innerHTML, array);
};

const stepRecipeFiltered = (tag, array) => {
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

  historySearch.push(array);
  array = stockageTemporay;
  createElement(array);
  setIngredients(array);
  list(array);
  [...document.querySelectorAll(".fa-times-circle")].forEach((cross, key) => cross.addEventListener("click", () => removeTag(key, historySearch)));
};

ELEMENTHTML.inputIngredient.addEventListener("click", () => {
  if (!ELEMENTHTML.mainSearch.value) {
    list(copyRecipes);
  }
});



