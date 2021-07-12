import { ELEMENTHTML } from "./constant.js";

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

export const addStyleInput = (index, elementDom, classCss, contentDynamique) => {
  elementDom.innerHTML += `<li class="ing">${contentDynamique}</li>`;
  ELEMENTHTML.box[index].appendChild(elementDom);

  ELEMENTHTML.spanContainerInput[index].id = "bigInput";
  ELEMENTHTML.inputIngredient.id = "bigInput";

  ELEMENTHTML.logoArraow[index].classList.add("animLogo");
  ELEMENTHTML.listFood.classList.add(classCss);
};

export const removeStyleInput = (index, elementDom, classCss) => {
  ELEMENTHTML.box[index].appendChild(elementDom);

  ELEMENTHTML.spanContainerInput[index].id = "";
  ELEMENTHTML.inputIngredient.id = "";

  ELEMENTHTML.logoArraow[index].classList.remove("animLogo");
  ELEMENTHTML.listFood.classList.remove(classCss);
};
