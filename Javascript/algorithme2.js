
import { ELEMENTHTML } from "./constant.js";
import { createElement, setIngredients, addStyleInput, removeStyleInput } from "./function.js";
import { recipes } from "./recipe.js";
export let arr = recipes;

let recipeFilter = [];
let idRecipe = [];
let arrayTag = [];
let resultResearch = null;

export const mainSearch = (e) => {
  const inputUser = e.target.value.toLowerCase();
  if (inputUser.length < 3) {
    ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>`;
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

  setListOfRecipe()
};

export const addAllIngredients = (array) => {
  for (const recipe of array) {
    for (const food of recipe.ingredients) {
      const ingredient = food.ingredient.toLowerCase();
      if (ELEMENTHTML.listFood.innerHTML.includes(`<li class="ing">${ingredient}</li>`)) {
        continue;
      }
      addStyleInput(0, ELEMENTHTML.listFood, "list-ingredient", ingredient);
    }
  }
};

export const addAllAppliances = (array) => {
  for (const recipe of array) {
    const appliance = recipe.appliance.toLowerCase();
    if (ELEMENTHTML.listItem.innerHTML.includes(`<li class="object">${appliance}</li>`)) {
      continue;
    }
    ELEMENTHTML.box[1].appendChild(ELEMENTHTML.listItem);
    ELEMENTHTML.listItem.innerHTML += `<li class="object">${appliance}</li>`;
    ELEMENTHTML.listItem.classList.add("list-appliance");
  }
};

export const addAllUstencil = (array) => {
  for (const recipe of array) {
    for (const item of recipe.ustensils) {
      const ustencil = item.toLowerCase();
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
  setListOfRecipe()
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
  let array = [];
  let cssClass = null;
  if (element.classList.contains("ing")) {
    cssClass = "blueTag";
  } else if (element.classList.contains("object")) {
    cssClass = "greenTag";
  } else {
    cssClass = "redTag";
  }
  ELEMENTHTML.mainSearch.value ? (array = recipeFilter) : (array = arr);

  ELEMENTHTML.allTags.innerHTML += `<p class="tag ${cssClass}">${element.innerHTML}<span class="far fa-times-circle"></span></p>`;
  arrayTag.push(element.innerHTML);
  filterByTag(arrayTag, array);
};

// Fonction qui permet d'afficher les recettes en fonctions des tags
export const filterByTag = (tags, array) => {
  removeStyleInput(0, ELEMENTHTML.listFood, "list-ingredient");

  for (const tag of tags) {
    resultResearch = [];
    if (array === arr) {
      arr = resultResearch;
    }
    for (const recipe of array) {
      for (const ingredient of recipe.ingredients) {
        const food = ingredient.ingredient.toLowerCase();

        if (food.includes(tag)) {
          resultResearch.push(recipe);
        }
      }

      const appliance = recipe.appliance.toLowerCase();

      if (appliance.includes(tag)) {
        resultResearch.push(recipe);
      }

      for (const ustencil of recipe.ustensils) {
        if (ustencil.includes(tag)) {
          resultResearch.push(recipe);
        }
      }
    }
  }
  if(array === recipeFilter){
    recipeFilter = resultResearch
  }
    arr = resultResearch
  
  createElement(resultResearch);
  setIngredients(resultResearch);
};

const setListOfRecipe = () => {
  if(ELEMENTHTML.mainSearch.value){

    ELEMENTHTML.inputIngredient.addEventListener("click", () => {
      addAllIngredients(recipeFilter);
    });
    
    ELEMENTHTML.inputAppliance.addEventListener("click", () => {
      addAllAppliances(recipeFilter);
    });
    
    ELEMENTHTML.inputUstencil.addEventListener("click", () => {
      addAllUstencil(recipeFilter);
    });
  }else{
    ELEMENTHTML.inputIngredient.addEventListener("click", () => {
      addAllIngredients(arr);
    });
    
    ELEMENTHTML.inputAppliance.addEventListener("click", () => {
      addAllAppliances(arr);
    });
    
    ELEMENTHTML.inputUstencil.addEventListener("click", () => {
      addAllUstencil(arr);
  })
}
}
