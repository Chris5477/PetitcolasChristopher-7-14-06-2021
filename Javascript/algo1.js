import { ELEMENTHTML } from "./constant.js";
import { addTags } from "./function.js";
import { recipes } from "./recipe.js";

export const searchIngredient = (e) => {
  const inputUser = e.target.value.toLowerCase();

  

  let recipeFilter = [];
  if (inputUser.length < 3) {
    ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Pour commencer la recherche , veuillez saisir au minimum 3 caractères</p>`;
  }

  for (let i = 0; i < recipes.length; i++) {
    const currentRecipe = recipes[i];
    if (currentRecipe.name.toLowerCase().match(inputUser)) {
      recipeFilter = [...recipeFilter, currentRecipe];
    }

    for (let j = 0; j < currentRecipe.length; j++) {
      if (currentRecipe.description.toLowerCase().match(inputUser)) {
        if (!currentRecipe.id.includes(recipeFilter[j].id)) {
          recipeFilter = [...recipeFilter, currentRecipe];
        } else {
          continue;
        }
      }
    }

    for (let k = 0; k < currentRecipe.ingredients.length; k++) {
      const element = currentRecipe.ingredients[k].ingredient.toLowerCase();
      if (element.includes(inputUser)) {
        recipeFilter = [...recipeFilter, currentRecipe];
        ELEMENTHTML.list.innerHTML += `<li>${element}</li>`;
        ELEMENTHTML.list.classList.add("list-ingredient")
      }
    }
    
  }
  [...document.querySelectorAll("li")].forEach((food) => food.addEventListener("click", () => addTags(food, 0, "list-ingredient", "blueTag")));
  showList(0)
};

export const searchAppliance = (e) => {
  const inputUser = e.target.value.toLowerCase();
  for (let i = 0; i < recipes.length; i++) {
      const appliance = recipes[i].appliance.toLowerCase();
      if(appliance.includes(inputUser)){
          ELEMENTHTML.list.innerHTML+=`<li>${appliance}</li>`
          ELEMENTHTML.list.classList.add("list-appliance")
      }
      
  }
  [...document.querySelectorAll("li")].forEach(item => item.addEventListener("click",() => addTags(item, 1, "list-appliance", "greenTag")))
  showList(1)
}

export const searchUstencil = (e) => {
  const inputUser = e.target.value.toLowerCase();
  for (let i = 0; i < recipes.length; i++) {
      for (let j = 0; j < recipes[i].ustensils.length; j++) {
         const ustensil = recipes[i].ustensils[j].toLowerCase();
          if(ustensil.includes(inputUser)){
              ELEMENTHTML.list.innerHTML+=`<li>${ustensil}</li>`
              ELEMENTHTML.list.classList.add("list-ustensils")
          }
          
      }
      
  }
  [...document.querySelectorAll("li")].forEach(item => item.addEventListener("click", () => addTags(item, 2, "list-ustensil", "redTag")))
  showList(2)
}

// Fonction qui permet de montrer les ingredients qui correspondent à la recherche
const showList = (index) => {
  // Permet de placer la list sur le bonne input
  ELEMENTHTML.box[index].appendChild(ELEMENTHTML.list);
  //ajoute une marge a droite pour afficher coorectement la liste
  ELEMENTHTML.box[index].style.marginRight = "160px";
  //ajoute une marge en haut pour eviter que la liste passe au dessus des recettes
  ELEMENTHTML.containerRecipe.style.marginTop = "200px";
  // ajoute l'animation du logo des inputs
  ELEMENTHTML.logoArraow[index].classList.add("animLogo");
};