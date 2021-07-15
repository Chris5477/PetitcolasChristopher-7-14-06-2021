import { createList } from "./algorithme2.js";
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

export const setTypeTag = (elementLi, css) => {
  if (elementLi.classList.contains("ing")) {
    return (css = "blueTag");
  } else if (elementLi.classList.contains("object")) {
    return (css = "greenTag");
  } else {
    return (css = "redTag");
  }
};

export const removeTag = (key, array) => {
  do {
    [...document.querySelectorAll(".tag")][key].remove();
  } while ([...document.querySelectorAll(".tag")].length > key);

  createElement(array[key]);
  setIngredients(array[key]);
  createList(array[key]);
  array.splice(key);
};
