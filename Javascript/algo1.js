import { ELEMENTHTML } from "./constant.js";
import { createElement, setIngredients } from "./function.js";
import { recipes } from "./recipe.js"
let recipeFilter = [];
let idRecipe = []
export const mainSearch = (e) => {
  let arrayId = []
  const inputUser = e.target.value.toLowerCase();
  
  if (inputUser.length <= 3) {
    ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Aucune recette ne correspond à votre critère ... Vous pouvez rechercher tarte au pomme ou poisson par exemple</p>`;
  }else{

    
    for (let i = 0; i < recipes.length; i++) {
      let flag = 0;
      const element = recipes[i];
    
      if(element.name.toLowerCase().match(inputUser) || element.description.toLowerCase().match(inputUser)){
        recipeFilter.push(element)
        arrayId.push(element.id)
        flag = 1
      }


      for (let j = 0; j < recipes[i].ingredients.length; j++) {
        const ingredient = recipes[i].ingredients[j].ingredient.toLowerCase();
        if(flag === 1){
          continue;
        }
       if(ingredient.includes(inputUser)){
         recipeFilter.push(element)
       }
        
      }
    }
  }
  
  createElement(recipeFilter)
  setIngredients(recipeFilter)

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
  for (let recipe = 0; recipe < recipeFilter.length; recipe++) {
  for (let food = 0; food < recipeFilter[recipe].ingredients.length; food++) {
    const ingredient = recipeFilter[recipe].ingredients[food].ingredient.toLowerCase();
    
    
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
  for (let recipe = 0; recipe < recipeFilter.length; recipe++) {
    const appliance = recipeFilter[recipe].appliance.toLowerCase();
    if (ELEMENTHTML.listItem.innerHTML.includes(`<li class="object">${appliance}</li>`)) {
      continue;
    }
    ELEMENTHTML.box[1].appendChild(ELEMENTHTML.listItem);
    ELEMENTHTML.listItem.innerHTML += `<li class="object">${appliance}</li>`;
    ELEMENTHTML.listItem.classList.add("list-appliance");
  }
};

export const addAllUstencil = (recipeFilter) => {
  for (let recipe = 0; recipe < recipeFilter.length; recipe++) {
    for (let item = 0; item < recipeFilter[recipe].ustensils.length; item++) {
      const ustencil = recipeFilter[recipe].ustensils[item].toLowerCase();
    
      if (ELEMENTHTML.listUstencil.innerHTML.includes(`<li class="item">${ustencil}</li>`)) {
        continue;
      }
      ELEMENTHTML.box[2].appendChild(ELEMENTHTML.listUstencil);
      ELEMENTHTML.listUstencil.innerHTML += `<li class="item">${ustencil}</li>`;
      ELEMENTHTML.listUstencil.classList.add("list-ustensils");
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
  for (let recipe = 0; recipe < recipeFilter.length; recipe++) {
    let flag = 0
    const currentRecipe = recipeFilter[recipe]
    if(currentRecipe.name.toLowerCase().match(input) || currentRecipe.description.toLowerCase().match(input)){
      recipeFilter.push(currentRecipe)
      flag = 1
    }
    
    
    
    idRecipe = recipeFilter.map((recipeId) => recipeId.id);
    
    
    for (const food of recipe.ingredients) {
      const ingredient = food.ingredient.toLowerCase();
      if (flag === 1){
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

  