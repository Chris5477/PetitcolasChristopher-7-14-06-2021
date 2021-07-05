import { recipes } from "./recipe.js";
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

//initialisation de recipêFilter qui me servira pour trier les recettes on fontions des entrées utilisateur
let recipeFilter = [];
// initialistation d'un tableau qui va stocker les tags
export const arrayTag = [];

//Fonction qui permet d'ajouter un tag
export const addTags = (element, index, classCss, tagColor) => {
  // permet de decaler les inputs quand la liste apparait
  ELEMENTHTML.containerRecipe.style.margin = "0px";
  ELEMENTHTML.box[index].style.marginRight = "0px";
  // enleve la callse animLogo pour que le logo (^) retrouve sa position d'origine
  ELEMENTHTML.logoArraow[index].classList.remove("animLogo");

  // on recupère la veleur de l'ingredient cliqué par l'utilisateur et on le pousse dans arrayTag
  arrayTag.push(element.innerHTML);
  // Pour chaque valeur tu tableau on crée un élément HTML p
  ELEMENTHTML.allTags.innerHTML += `<p class="tag ${tagColor}">${element.innerHTML}<span class="fas fa-times"></span></p>`;

  // en fonction de la taille de tableau , on appelle la fonction avec un array different
  recipeFilter.length === 0 ? toFiltreRecipe(arrayTag, recipes) : toFiltreRecipe(arrayTag, recipeFilter);
  // Suppresiion de la classe Css afin de retirer la list d 'ingredient
  ELEMENTHTML.list.classList.remove(classCss);
  // Suppression des valeurs de la liste d'ingredient
  for (const li of [...document.querySelectorAll("li")]) {
    li.innerHTML = "";
  }
  // pour chaque logo croix , on recupere la clé et on appelle une fonction pour supprimer le tag
  [...document.querySelectorAll(".fa-times")].forEach((item, key) => item.addEventListener("click", () => undoTag(arrayTag, key)));

  // on retourne arrayTag pour rendre le tableau disponible
  return arrayTag;
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

// Fonction qui permet d'afficher les recettes en fonctions des tags
export const toFiltreRecipe = (tags, array) => {
  // Array qui contiendra tout les id pour effacer les doublons
  let arrayId = [];
  // Boucle for of pur agir sur toutes les valeurs
  for (const value of tags) {
    // Si la valeur du tag a une correspondance dans le nom ou description , on le rentre dans recipeFilter
    recipeFilter = array.filter(
      (item) => item.name.toLowerCase().match(value.toLowerCase()) || item.description.toLowerCase().match(value.toLowerCase())
    );

    //On push les id des recettes de recipefilter
    arrayId = recipeFilter.map((item) => item.id);

    //boucle for of pour acceder aux ingredients dans le sous tableau ingredients

    for (const recipe of array) {
      for (const ingredients of recipe.ingredients) {
        const ingredient = ingredients.ingredient.toLowerCase();
        // pour chaque id , si inclus dans dans le tableau ""array", alors on continu et on ignore
        if ([...arrayId].includes(recipe.id)) {
          continue;
        }
        // sinon on pousse la valeur dans recipeFilter
        if (ingredient.includes(value.toLowerCase())) {
          recipeFilter = [...recipeFilter, recipe];
        }
      }
    }
  }

  //On créer autant de carte de recette en fonction du nombre de valeur de recipeFilter et on définit les ingrédients de chacunes des recettes

  createElement(recipeFilter);
  setIngredients(recipeFilter);
  // on retourne recipeFilter pour que l'algorithme fonctionne!
  return recipeFilter;
};
