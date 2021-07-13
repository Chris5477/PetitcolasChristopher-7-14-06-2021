import { ELEMENTHTML } from "./constant.js";
import { createElement, setIngredients, addStyleInput, removeStyleInput } from "./function.js";
import { recipes } from "./recipe.js";
export let arr = recipes;

let recipeFilter = [];
let idRecipe = [];
let arrayTag = [];
let historySearch = [];
let resultResearch = null;

export const mainSearch = (e) => {
  const inputUser = e.target.value.toLowerCase();
  if (inputUser.length < 3) {
    ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>`;
  } else {
    ELEMENTHTML.mainSearch.value ? arrayTag.splice(0, 1, inputUser) : (arrayTag = []);

    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].name.toLowerCase().match(inputUser) || recipes[i].description.toLowerCase().match(inputUser)) {
        recipeFilter.push(recipes[i]);
      }

      for (let j = 0; j < recipeFilter.length; j++) {
        idRecipe.push(recipeFilter[j].id);
      }

      for (let k = 0; k < recipes[i].ingredients.length; k++) {
        const ingredient = recipes[i].ingredients[k].ingredient.toLowerCase();
        if ([...idRecipe].includes(recipes[i].id)) {
          continue;
        }
        if (ingredient.includes(inputUser)) {
          recipeFilter.push(recipes[i]);
        }
      }
    }

    if (inputUser.length !== 0) {
      createElement(recipeFilter);
      setIngredients(recipeFilter);
    } else {
      createElement(recipes);
      setIngredients(recipes);
    }

    setListOfRecipe();
  }
};

export const addAllIngredients = (array) => {
  for (let l = 0; l < array.length; l++) {
    for (let m = 0; m < array[l].ingredients.length; m++) {
      const ingredient = array[l].ingredients[m].ingredient.toLowerCase();
      if (ELEMENTHTML.listFood.innerHTML.includes(`<li class="ing">${ingredient}</li>`)) {
        continue;
      }
      addStyleInput(0, ELEMENTHTML.listFood, "list-ingredient", ingredient);
    }
  }
};

export const addAllAppliances = (array) => {
  for (let w = 0; w < array.length; w++) {
    const appliance = array[w].appliance.toLowerCase();
    if (ELEMENTHTML.listItem.innerHTML.includes(`<li class="object">${appliance}</li>`)) {
      continue;
    }
    ELEMENTHTML.box[1].appendChild(ELEMENTHTML.listItem);
    ELEMENTHTML.listItem.innerHTML += `<li class="object">${appliance}</li>`;
    ELEMENTHTML.listItem.classList.add("list-appliance");
  }
};

export const addAllUstencil = (array) => {
  for (let x = 0; x < array.length; x++) {
    for (let c = 0; c < array[x].ustensils.length; c++) {
      const ustencil = array[x].ustensils[c].toLowerCase();
      if (ELEMENTHTML.listUStencil.innerHTML.includes(`<li class="ustensil">${ustencil}</li>`)) {
        continue;
      }
      ELEMENTHTML.box[2].appendChild(ELEMENTHTML.listUStencil);
      ELEMENTHTML.listUStencil.innerHTML += `<li class="ustensil">${ustencil}</li>`;
      ELEMENTHTML.listUStencil.classList.add("list-ustensils");
    }
  }
};

export const searchElement = (e) => {
  setListOfRecipe();
  const inputUser = e.target.value.toLowerCase();
  const elementsLiHtml = [...document.querySelectorAll("li")];
  for (let v = 0; v < elementsLiHtml.length; v++) {
    if (inputUser.length >= 3 && elementsLiHtml[v].innerHTML !== inputUser && !elementsLiHtml[v].innerHTML.match(inputUser)) {
      elementsLiHtml[v].style.display = "none";
    }
  }
  elementsLiHtml.forEach((li) => li.addEventListener("click", () => addTag(li)));
};

const addTag = (element) => {
  let array = [];
  let cssClass = null;
  if (element.classList.contains("ing")) {
    cssClass = "blueTag";
  } else if (element.classList.contains("object")) {
    cssClass = "greenTag";
  } else {
    cssClass = "redTag";
  }
  ELEMENTHTML.mainSearch.value ? ((array = recipeFilter), historySearch.push(recipeFilter)) : ((array = arr), historySearch.push(arr));

  ELEMENTHTML.allTags.innerHTML += `<p class="tag ${cssClass}">${element.innerHTML}<span class="far fa-times-circle"></span></p>`;
  arrayTag.push(element.innerHTML);
  filterByTag(arrayTag, array);
  [...document.querySelectorAll(".fa-times-circle")].forEach((logo, index) =>
    logo.addEventListener("click", () => {
      let numberTag = null;
      [...document.querySelectorAll(".tag")][index].remove();
      ELEMENTHTML.mainSearch.value ? (numberTag = index + 1) : (numberTag = index);
      arrayTag.splice(numberTag, 1);
      arrayTag.length !== 0 ? filterByTag(arrayTag, historySearch[index]) : createElement(recipes) + setIngredients(recipes);
    })
  );
};

// Fonction qui permet d'afficher les recettes en fonctions des tags
export const filterByTag = (tags, array) => {
  removeStyleInput(0, ELEMENTHTML.listFood, "list-ingredient");

  for (let b = 0; b < tags.length; b++) {
    resultResearch = [];
    if (array === arr) {
      arr = resultResearch;
    }

    for (let n = 0; n < array.length; n++) {
      for (let p = 0; p < array[n].ingredients.length; p++) {
        const food = array[n].ingredients[p].ingredient.toLowerCase();

        if (food.includes(tags[b])) {
          resultResearch.push(array[n]);
        }
      }

      const appliance = array[n].appliance.toLowerCase();

      if (appliance.includes(tags[b])) {
        resultResearch.push(array[n]);
      }

      for (let u = 0; u < array[n].ustensils.length; u++) {
        const ustencil = array[n].ustensils[u].toLowerCase();
        if (ustencil.includes(tags[b])) {
          resultResearch.push(array[n]);
        }
      }
    }
  }

  if (array === recipeFilter) {
    recipeFilter = resultResearch;
  }
  arr = resultResearch;

  createElement(resultResearch);
  setIngredients(resultResearch);
};

const setListOfRecipe = () => {
  if (ELEMENTHTML.mainSearch.value) {
    ELEMENTHTML.inputIngredient.addEventListener("click", () => {
      addAllIngredients(recipeFilter);
    });

    ELEMENTHTML.inputAppliance.addEventListener("click", () => {
      addAllAppliances(recipeFilter);
    });

    ELEMENTHTML.inputUstencil.addEventListener("click", () => {
      addAllUstencil(recipeFilter);
    });
  } else {
    ELEMENTHTML.inputIngredient.addEventListener("click", () => {
      addAllIngredients(arr);
    });

    ELEMENTHTML.inputAppliance.addEventListener("click", () => {
      addAllAppliances(arr);
    });

    ELEMENTHTML.inputUstencil.addEventListener("click", () => {
      addAllUstencil(arr);
    });
  }
};
