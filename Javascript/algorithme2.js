import { ELEMENTHTML } from "./constant.js";
import { createElement, setIngredients, setTypeTag, removeTag, displayIngredient, displayAppliance, displayUstencil, hiddenAllList } from "./function.js";
import { recipes } from "./recipe.js";
export let copyRecipes = recipes;

//initialisiation des variables

let recipeFilter = [];
let idRecipe = [];
let allIngredients = [];
let allAppliances = [];
let allUstensils = [];
let historySearch = [];

//fonction qui permet de verifier si l'entrée utilisateur est trouvé dans le titre , description ou ingredient
export const searchByMainInput = (e) => {
  //stocke la saisi utilisateur en minuscule
  const inputUser = e.target.value.toLowerCase();

  // si la taille de l'entrée est inférieur a 3
  if (inputUser.length < 3) {
    //vide le tableau (pour actualiser la recherche)
    recipeFilter = [];
    //vide le tableau(pour eviter les doublons )
    idRecipe = [];
    //retourne le message suivant
    return (ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>`);
  }

  //si l'entrée est trouvé dans le titre ou description , pousse la recette associé dans recipeFilter
  recipeFilter = copyRecipes.filter((recipe) => recipe.name.toLowerCase().match(inputUser) || recipe.description.toLowerCase().match(inputUser));
  // pousse les id de chaque recette de recipeFilter pour retirer les doublons
  idRecipe = recipeFilter.map((recipeId) => recipeId.id);

  //Bouclage de copyrecipes pour chercher des correspondances dans la liste d'ingrédient
  for (const recipe of copyRecipes) {
    for (const food of recipe.ingredients) {
      const ingredient = food.ingredient.toLowerCase();
      //si l'id correspond a l'id d'une recette , alors on ignore et on passe a l'itération suivante
      if ([...idRecipe].includes(recipe.id)) {
        continue;
      }
      //si il y a une correspondance alors on pousse la recette dans recipeFilter
      if (ingredient.includes(inputUser)) {
        recipeFilter = [...recipeFilter, recipe];
      }
    }
  }
  //Si la taille de recipeFilter est vide , alors on affiche le message suivant
  if (recipeFilter.length === 0) {
    return (ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>`);
  }
  // fonction qui va créer autant d éléments que possède recipeFilter
  createElement(recipeFilter);
  //fonction qui va remplir les cartes de recettes en fonction de recipeFilter
  setIngredients(recipeFilter);
  //fonction qui va créer les listes d'ingredient, d'appliance et d 'ustensile
  createList(recipeFilter);
};

//Fonction qui va permettre d'afficher les élément restants en fonction d'un array
export const createList = (array) => {
  // retourne un tableau , un avec tout les ingredient restants , un avec tout les appliances restants etc...
  const listTemporyIngredient = array.flatMap((item) => item.ingredients.map((el) => el.ingredient.toLowerCase()));
  const listTemporyAppliance = array.map((item) => item.appliance.toLowerCase());
  const listTemporyUstensil = array.flatMap((item) => item.ustensils).map((el) => el.toLowerCase());
  // Suppression des doublons en fonctions de l'index de l'element , si il est égal a l'index en cours on ajoute 
  allIngredients = listTemporyIngredient.filter((element, position) => listTemporyIngredient.indexOf(element) === position);
  allAppliances = listTemporyAppliance.filter((element, position) => listTemporyAppliance.indexOf(element) === position);
  allUstensils = listTemporyUstensil.filter((element, position) => listTemporyUstensil.indexOf(element) === position);
  // Fonction qui montre les listes
  showList(array);
};

// fonction qui montre les listes
const showList = (array) => {
  // on rentre dans les elements html suivant , chaque valeur du tableau, et on retire la virgule avec join
  ELEMENTHTML.listFood.innerHTML = `${allIngredients.map((ingredient) => `<li class="list-ingredient ing">${ingredient}</li>`).join("")}`;
  ELEMENTHTML.listItem.innerHTML = `${allAppliances.map((appliance) => `<li class="list-appliance object">${appliance}</li>`).join("")}`;
  ELEMENTHTML.listUStencil.innerHTML = `${allUstensils.map((ustensil) => `<li class="list-ustencil ustencil">${ustensil}</li>`).join("")}`;
  //Fonction qui permet d'ajouter un tag
  choiceInList(array);
  //Fonctions qui permet d'afficher une liste et retirer les autres 
  ELEMENTHTML.box[0].addEventListener("click", displayIngredient);
  ELEMENTHTML.box[1].addEventListener("click", displayAppliance);
  ELEMENTHTML.box[2].addEventListener("click", displayUstencil);
  //permet a l'utilisateur de fermer tout pour  voir les recettes, true permet d executer l event sur la phase de bouillonment
  document.body.addEventListener("click", hiddenAllList, true)
  // Permet une saisi utilisateur pour filtrer la liste en cours
  ELEMENTHTML.inputIngredient.addEventListener("input", (e) => filteredList(e));
  ELEMENTHTML.inputAppliance.addEventListener("input", (e) => filteredList(e));
  ELEMENTHTML.inputUstencil.addEventListener("input", (e) => filteredList(e));
};

//Fonction qui permet d'afficher que les elements qui correspondent a la saisi utilisateur
const filteredList = (e) => {
  //variable qui contient la saisi utilisateur en minuscule
  let inputUser = e.target.value.toLowerCase();
  // On cible tout les éléments listes disponibles
  [...document.querySelectorAll("li")].forEach((el) => {
    //pour chacun des cas , si la saisi est supérieur ou égal a 3 et ne correspond pas au contenu de l'element 
    if (inputUser.length >= 3 && !el.innerHTML.includes(inputUser)) {
      // on le retire de l 'affichage
      el.style.display = "none";
    }
  });
};

//Permet d'ajouter un tag
const choiceInList = (array) => {
  // pour chaque element , siclique on appelle la fonction addTag
  [...document.querySelectorAll("li")].forEach((el) => el.addEventListener("click", () => addTag(el, array)));
};

//Fonction qui peremt d'ajouter un tag
const addTag = (element, array) => {
  // Peremt d'associer la couleur en fonction dy type de liste
  let classTag = setTypeTag(element);
  //Ajoute un tag avec son contenu
  ELEMENTHTML.allTags.innerHTML += `<p class="tag ${classTag}">${element.innerHTML}<span class="far fa-times-circle"></span></p>`;
  //Fonction qui permet de continuer la recherche
  stepRecipeFiltered(element.innerHTML, array);
};

//Permet de continuer la recherche
const stepRecipeFiltered = (tag, array) => {
  // on initialise un array qui stockera temporairement l 'array en parametre
  let stockageTemporay = [];
  //bouclage pour verfier une correspondance
  for (const recipe of array) {
    for (const food of recipe.ingredients) {
      const ingredient = food.ingredient.toLowerCase();
      if (ingredient.includes(tag.toLowerCase())) {
        //si oui ,  on stocke la recette dans stockageTempory
        stockageTemporay = [...stockageTemporay, recipe];
      }
    }
    //on fait pareil pour les inputs suivants
    const appliance = recipe.appliance.toLowerCase();
    if (appliance.includes(tag.toLowerCase())) {
      stockageTemporay = [...stockageTemporay, recipe];
    }

    for (const ustensil of recipe.ustensils) {
      if (ustensil.includes(tag.toLowerCase())) {
        stockageTemporay = [...stockageTemporay, recipe];
      }
    }
  }

  //on pousse le tableau dans historySearch , en cas de retour en arrière , on peut réafficher la resultat de la recherche précédente
  historySearch.push(array);
  // array = stockageTempory
  array = stockageTemporay;
  //ET on affiche autant de recettes que array
  createElement(array);
  setIngredients(array);
  createList(array);
  //fonction qui permet de supprimer un tag
  [...document.querySelectorAll(".fa-times-circle")].forEach((cross, key) => cross.addEventListener("click", () => removeTag(key, historySearch)));
};

// si il n y a pas de tag , et de valeur dans la barre principale , alors au clique on créer une liste
ELEMENTHTML.inputIngredient.addEventListener("click", () => {
  if (!ELEMENTHTML.mainSearch.value && !ELEMENTHTML.allTags.innerHTML) {
    createList(copyRecipes);
  }
});

ELEMENTHTML.inputAppliance.addEventListener("click", () => {
  if (!ELEMENTHTML.mainSearch.value && !ELEMENTHTML.allTags.innerHTML) {
    createList(copyRecipes);
  }
});

ELEMENTHTML.inputUstencil.addEventListener("click", () => {
  if (!ELEMENTHTML.mainSearch.value && !ELEMENTHTML.allTags.innerHTML) {
    createList(copyRecipes);
  }
});
