import { ELEMENTHTML } from "./constant.js";
let recipeFilter =[]
let idRecipe = [];
// Fonction qui permet de générer des éléments HTML
export const createElement = (array) => {
  // verfication du conteneur pour afficher autant d'élément que de recettes filtrées , si il n'est pas vide , alors on le vide
  if (ELEMENTHTML.containerRecipe.innerHTML != "") {
    ELEMENTHTML.containerRecipe.innerHTML = "";
  }

  // Création des éléments avec une boucles pour injecter les données
  for (const element of array) {
    ELEMENTHTML.containerRecipe.innerHTML += `
    <article class="card_recipe">
    <img class="picture_recipe" src="." alt="Image indisponible" />
    <div class="head_card">
    <h2>${element.name}</h2>
    <span class="time">${element.time}<span class="far fa-clock"></span></span>
    </div>
    <div class="description_recipe">
    <div class="list_ingredients"></div>
    <div class="make_recipe">
    <p class="instructions">${element.description}</p>
    </div>
    </div>
    </article>`;
  }
};

// Fonction qui permet de définir les ingredients dans les cartes de recette
export const setIngredients = (array) => {
  //Cibalge des éléments li créées avec la fonction createElement
  const containerIngredients = [...document.querySelectorAll(".list_ingredients")];
  //Pour chacune des valeurs du tableau , on injecte les données
  for (const key in array) {
    const ingredients = array[key].ingredients;
    ingredients.forEach((item) => {
      // Vérification pour afficher les ingredients avec quantité , ou unité
      // Si la valeur a la clé unit , alors on affiche la 'unité
      if (item.hasOwnProperty("unit")) {
        containerIngredients[key].innerHTML += `<p class="ingredient">${item.ingredient} ${item.quantity} ${item.unit}</p>`;
        // Si la quantité n'est pas définit , alors on affiche que l'ingredient
      } else if (item.quantity == undefined) {
        containerIngredients[key].innerHTML += `<p class="ingredient">${item.ingredient}</p>`;
        // sinon on affiche que l'ingredient et sa quantité
      } else {
        containerIngredients[key].innerHTML += `<p class="ingredient">${item.ingredient} ${item.quantity}</p>`;
      }
    });
  }
};

export const addAllIngredients = (array) => {
  for (const recipe of array) {
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
  if(element.classList.contains("ing")){
    cssClass = "blueTag"
  }else if(element.classList.contains("object")){
    cssClass = "greenTag"
  }else{
    cssClass = "redTag"
  }
 
  ELEMENTHTML.allTags.innerHTML += `<p class="tag ${cssClass}">${element.innerHTML}<span class="far fa-times-circle"></span></p>`;
  filterByTag(element.innerHTML, recipeFilter)
};

const filterByTag = (tag , array) => {
  const input = tag.toLowerCase();
  console.log(array)
  recipeFilter = array.filter((recipe) => recipe.name.toLowerCase().match(input) || recipe.description.toLowerCase().match(input));
  console.log(array)

  idRecipe = recipeFilter.map((recipeId) => recipeId.id);

  for (const recipe of array) {
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
