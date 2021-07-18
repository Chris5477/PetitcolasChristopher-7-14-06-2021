import { ELEMENTHTML } from "./constant.js";
import { createElement, setIngredients, setTypeTag, removeTag, displayIngredient, displayAppliance, displayUstencil, hiddenAllList } from "./function.js";
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
  recipeFilter = [];

  if (inputUser.length < 3) {
    idRecipe = [];
    return (ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>`);
  }

  for (let i = 0; i < copyRecipes.length; i++) {
    const recipe = copyRecipes[i];
    if (recipe.name.toLowerCase().match(inputUser) || recipe.description.toLowerCase().match(inputUser)) {
      recipeFilter.push(recipe);
    }
  }


  for (let j = 0; j < recipeFilter.length; j++) {
    const idOfRecipe = recipeFilter[j].id;
    idRecipe.push(idOfRecipe);
  }

  for (let k = 0; k < copyRecipes.length; k++) {
    for (let l = 0; l < copyRecipes[k].ingredients.length; l++) {
      const food = copyRecipes[k].ingredients[l].ingredient.toLowerCase();
      if ([...idRecipe].includes(copyRecipes[k].id)) {
        continue;
      }
      if (food.includes(inputUser)) {
        recipeFilter.push(copyRecipes[k]);
      }
    }
  }

  if(recipeFilter.length === 0){
    return (ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>`);
  }

  createElement(recipeFilter);
  setIngredients(recipeFilter);
  createList(recipeFilter);
};

export const createList = (array) => {
  let listTemporyIngredient = [];
  let listTemporyAppliance = [];
  let listTemporyUstensil = [];

  if (allIngredients.length !== 0) {
    allIngredients = [];
    allAppliances = [];
    allUstensils = [];
  }

  for (let recipe = 0; recipe < array.length; recipe++) {
    for (let food = 0; food < array[recipe].ingredients.length; food++) {
      const ingredient = array[recipe].ingredients[food].ingredient.toLowerCase();
      listTemporyIngredient.push(ingredient);
    }

    const appliance = array[recipe].appliance.toLowerCase();
    listTemporyAppliance.push(appliance);

    for (let item = 0; item < array[recipe].ustensils.length; item++) {
      const ustencil = array[recipe].ustensils[item].toLowerCase();
      listTemporyUstensil.push(ustencil);
    }
  }

  listTemporyIngredient.forEach((element, position) => {
    if (listTemporyIngredient.indexOf(element) === position) {
      allIngredients.push(element);
    }
  });

  listTemporyAppliance.forEach((element, position) => {
    if (listTemporyAppliance.indexOf(element) === position) {
      allAppliances.push(element);
    }
  });

  listTemporyUstensil.forEach((element, position) => {
    if (listTemporyUstensil.indexOf(element) === position) {
      allUstensils.push(element);
    }
  });

  showList(array);
};

const showList = (array) => {
  if (ELEMENTHTML.listFood.innerHTML) {
    ELEMENTHTML.listFood.innerHTML = "";
    ELEMENTHTML.listItem.innerHTML = "";
    ELEMENTHTML.listUStencil.innerHTML = "";
  }
  for (let keyIngredient = 0; keyIngredient < allIngredients.length; keyIngredient++) {
    const ingredient = allIngredients[keyIngredient];
    ELEMENTHTML.listFood.innerHTML += `<li class="list-ingredient ing">${ingredient}</li>`;
  }

  for (let keyAppliance = 0; keyAppliance < allAppliances.length; keyAppliance++) {
    const appliance = allAppliances[keyAppliance];
    ELEMENTHTML.listItem.innerHTML += `<li class="list-appliance object">${appliance}</li>`;
  }

  for (let keyUstencil = 0; keyUstencil < allUstensils.length; keyUstencil++) {
    const ustencil = allUstensils[keyUstencil];
    ELEMENTHTML.listUStencil.innerHTML += `<li class="list-ustencil ustencil">${ustencil}</li>`;
  }
  choiceInList(array);
  ELEMENTHTML.box[0].addEventListener("click", displayIngredient);
  ELEMENTHTML.box[1].addEventListener("click", displayAppliance);
  ELEMENTHTML.box[2].addEventListener("click", displayUstencil);
  document.body.addEventListener("click", hiddenAllList, true)
  ELEMENTHTML.inputIngredient.addEventListener("input", (e) => filteredList(e));
  ELEMENTHTML.inputAppliance.addEventListener("input", (e) => filteredList(e));
  ELEMENTHTML.inputUstencil.addEventListener("input", (e) => filteredList(e));
};

const filteredList = (e) => {
  let inputUser = e.target.value.toLowerCase();
  [...document.querySelectorAll("li")].forEach((el) => {
    if (inputUser.length >= 3 &&  !el.innerHTML.includes(inputUser)) {
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

  for (let recipe = 0; recipe < array.length; recipe++) {
    for (let food = 0; food < array[recipe].ingredients.length; food++) {
      const ingredient = array[recipe].ingredients[food].ingredient.toLowerCase();
      if (ingredient.includes(tag.toLowerCase())) {
        stockageTemporay.push(array[recipe]);
      }
    }

    const appliance = array[recipe].appliance.toLowerCase();
    if (appliance.includes(tag.toLowerCase())) {
      stockageTemporay.push(array[recipe]);
    }

    for (let item = 0; item < array[recipe].ustensils.length; item++) {
      const ustencil = array[recipe].ustensils[item].toLowerCase();
      if (ustencil.includes(tag.toLowerCase())) {
        stockageTemporay.push(array[recipe]);
      }
    }
  }

  historySearch.push(array);
  array = stockageTemporay;
  createElement(array);
  setIngredients(array);
  createList(array);
  [...document.querySelectorAll(".fa-times-circle")].forEach((cross, key) => cross.addEventListener("click", () => removeTag(key, historySearch)));
};

ELEMENTHTML.inputIngredient.addEventListener("click", () => {
  if (!ELEMENTHTML.mainSearch.value && !ELEMENTHTML.allTags.innerHTML) {
    createList(copyRecipes);
  }
});

ELEMENTHTML.inputAppliance.addEventListener("click", () => {
  if (!ELEMENTHTML.mainSearch.value && !ELEMENTHTML.allTags.innerHTML) {
    createList(copyRecipes);
  }
});

ELEMENTHTML.inputUstencil.addEventListener("click", () => {
  if (!ELEMENTHTML.mainSearch.value && !ELEMENTHTML.allTags.innerHTML) {
    createList(copyRecipes);
  }
});
