import { ELEMENTHTML } from "./constant.js";
import { createElement, setIngredients } from "./function.js";
import { recipes } from "./recipe.js";

export let recipeFilter = [];
let idRecipe = [];
export const mainSearch = (e) => {
  const inputUser = e.target.value.toLowerCase();

  if (inputUser.length < 3) {
    ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>`;
  }

  recipeFilter = recipes.filter((recipe) => recipe.name.toLowerCase().match(inputUser) || recipe.description.toLowerCase().match(inputUser));

  idRecipe = recipeFilter.map((recipeId) => recipeId.id);

  for (const recipe of recipes) {
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

  ELEMENTHTML.inputIngredient.addEventListener("click", () => {
    addAllIngredients(recipeFilter);
  });

  ELEMENTHTML.inputAppliance.addEventListener("click", () => {
    addAllAppliances(recipeFilter);
  });

  ELEMENTHTML.inputUstencil.addEventListener("click", () => {
    addAllUstencil(recipeFilter);
  });
};

export const addAllIngredients = (recipeFilter) => {
  for (const recipe of recipeFilter) {
    for (const food of recipe.ingredients) {
      const ingredient = food.ingredient.toLowerCase();
      if (ELEMENTHTML.listFood.innerHTML.includes(`<li class="ing">${ingredient}</li>`)) {
        continue;
      }
      ELEMENTHTML.box[0].appendChild(ELEMENTHTML.listFood);
      ELEMENTHTML.listFood.innerHTML += `<li class="ing">${ingredient}</li>`;
      ELEMENTHTML.listFood.classList.add("list-ingredient");
    }
  }
};

export const addAllAppliances = (recipeFilter) => {
  for (const recipe of recipeFilter) {
    const appliance = recipe.appliance.toLowerCase();
    if (ELEMENTHTML.listItem.innerHTML.includes(`<li class="object">${appliance}</li>`)) {
      continue;
    }
    ELEMENTHTML.box[1].appendChild(ELEMENTHTML.listItem);
    ELEMENTHTML.listItem.innerHTML += `<li class="object">${appliance}</li>`;
    ELEMENTHTML.listItem.classList.add("list-appliance");
  }
};

export const addAllUstencil = (recipeFilter) => {
  for (const recipe of recipeFilter) {
    for (const item of recipe.ustensils) {
      const ustencil = item.toLowerCase();
      if (ELEMENTHTML.listUStencil.innerHTML.includes(`<li class="item">${ustencil}</li>`)) {
        continue;
      }
      ELEMENTHTML.box[2].appendChild(ELEMENTHTML.listUStencil);
      ELEMENTHTML.listUStencil.innerHTML += `<li class="item">${ustencil}</li>`;
      ELEMENTHTML.listUStencil.classList.add("list-ustensils");
    }
  }
};

export const searchElement = (e) => {
  const inputUser = e.target.value.toLowerCase();
  const elementsLiHtml = [...document.querySelectorAll("li")];
  for (const li of elementsLiHtml) {
    if (inputUser.length >= 3 && li.innerHTML !== inputUser && !li.innerHTML.match(inputUser)) {
      li.style.display = "none";
    }
  }
  elementsLiHtml.forEach((li) => li.addEventListener("click", () => addTag(li)));
};

const addTag = (element) => {
  let cssClass = null;
  if (element.classList.contains("ing")) {
    cssClass = "blueTag";
  } else if (element.classList.contains("object")) {
    cssClass = "greenTag";
  } else {
    cssClass = "redTag";
  }

  ELEMENTHTML.allTags.innerHTML += `<p class="tag ${cssClass}">${element.innerHTML}<span class="far fa-times-circle"></span></p>`;
  filterByTag(element.innerHTML);
  const closeLogo = [...document.querySelectorAll(".fa-times-circle")];
  closeLogo.forEach((logo, index) => logo.addEventListener("click", () => removeTag(index)));
};

const filterByTag = (tag) => {
  const input = tag.toLowerCase();
  recipeFilter = recipeFilter.filter((recipe) => recipe.name.toLowerCase().match(input) || recipe.description.toLowerCase().match(input));

  idRecipe = recipeFilter.map((recipeId) => recipeId.id);

  for (const recipe of recipeFilter) {
    for (const food of recipe.ingredients) {
      const ingredient = food.ingredient.toLowerCase();
      if ([...idRecipe].includes(recipe.id)) {
        continue;
      }
      if (ingredient.includes(input)) {
        recipeFilter = [...recipeFilter, recipe];
      }
    }
  }
  createElement(recipeFilter);
  setIngredients(recipeFilter);
};

const removeTag = (index) => {
  const tag = [...document.querySelectorAll(".tag")][index].remove();
  ELEMENTHTML.allTags.innerHTML === "" ? createElement(recipes) + setIngredients(recipes) + addAllIngredients(recipes) : filterByTag(tag);
};
