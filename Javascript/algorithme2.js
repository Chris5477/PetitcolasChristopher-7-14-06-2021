import { ELEMENTHTML } from "./constant.js";
import { createElement, setIngredients, addStyleInput, removeStyleInput} from "./function.js";
import { recipes } from "./recipe.js";

let recipeFilter = [];
let idRecipe = [];
let arrayTag = [];
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

const addAllIngredients = (recipeFilter) => {
  for (const recipe of recipeFilter) {
    for (const food of recipe.ingredients) {
      const ingredient = food.ingredient.toLowerCase();
      if (ELEMENTHTML.listFood.innerHTML.includes(`<li class="ing">${ingredient}</li>`)) {
        continue;
      }
      
      addStyleInput(0, ELEMENTHTML.listFood,"list-ingredient", ingredient)
    }
  }
};

const addAllAppliances = (recipeFilter) => {
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

 const addAllUstencil = (recipeFilter) => {
  for (const recipe of recipeFilter) {
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
  arrayTag.push(element.innerHTML);
  filterByTag(arrayTag);

  [...document.querySelectorAll(".fa-times-circle")].forEach((item, key) => item.addEventListener("click", () => undoTag(arrayTag, key)));
};

// Fonction qui permet d'afficher les recettes en fonctions des tags
export const filterByTag = (tags) => {

  removeStyleInput(0, ELEMENTHTML.listFood, "list-ingredient")

  //si mainsearch == tomate , recipefilter === 3
  console.log(recipeFilter)
  let resultResearch = null
  for (const tag of tags) {
    resultResearch = []
    for (const recipe of recipeFilter) {
      for (const ingredient of recipe.ingredients) {
        const food = ingredient.ingredient.toLowerCase()
 
        if(food.includes(tag)){
          resultResearch.push(recipe)
        }
      }
      
      const appliance = recipe.appliance.toLowerCase()
    
      if(appliance.includes(tag)){
        resultResearch.push(recipe)
      }

      for (const ustencil of recipe.ustensils) {
        if(ustencil.includes(tag)){
          resultResearch.push(recipe)
        }
  
      }
      
    }  

  }

  recipeFilter = resultResearch
  createElement(resultResearch)
  setIngredients(resultResearch)
  
};

export const undoTag = (array, key) => {
  array.splice(key);
  //avec la clé récuperé , on supprime le tag associé
  [...document.querySelectorAll(".tag")][key].remove();
  // puis on revérifie la taille du tableau pour filtrer en fonctions des tags qui reste
  if (array.length === 0) {
    createElement(recipes);
    setIngredients(recipes);
  } else if (array.length >= 1) {
    toFiltreRecipe(arrayTag, recipes);
  } else {
    toFiltreRecipe(arrayTag, recipeFilter);
  }
};
