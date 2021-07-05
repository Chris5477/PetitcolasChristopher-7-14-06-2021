import { ELEMENTHTML } from "./constant.js";
import { addTags } from "./function.js";
import { recipes } from "./recipe.js";

// Fonction qui va permettre de chercher un ingrédient
export const searchIngredient = (e) => {
  // Initialisation du tableau recipeFilter
  let recipeFilter = [];
  // variable qui va contenir l'entrée utilisateur en minuscule
  const inputUser = e.target.value.toLowerCase();
  // la recherche se lance que si la la valeur utilisateur fait 3 caractères au minimum
  if (inputUser.length < 3) {
    // si inferieur retourne l'indication suivante,
    ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Pour commencer la recherche , veuillez saisir au minimum 3 caractères</p>`;
  }

  // Verifie chaque valeur du tableau et le stocke dans le tableau si verifié
  recipeFilter = recipes.filter((item) => item.name.toLowerCase().match(inputUser) || item.description.toLowerCase().match(inputUser));

  //Utilisation de 2 boucles for of pour acceder aux valeurs de recipes
  for (const recipe of recipes) {
    const listIngredient = recipe.ingredients;
    for (const food of listIngredient) {
      // on stocke les ingredients en minuscules
      const ingredient = food.ingredient.toLowerCase();
      // si dans la liste , l'ingredient est present on ignore
      if (ELEMENTHTML.list.innerHTML.includes(`<li>${ingredient}</li>`)) {
        continue;
      }
      // si l'entrée utilisateur correspond à l'ingredient
      if (ingredient.includes(inputUser)) {
        // on le pousse dans le tableau recipeFilter
        recipeFilter = [...recipeFilter, recipe];
        //on crée un élément li dans list
        ELEMENTHTML.list.innerHTML += `<li>${ingredient}</li>`;
        // on ajoute une classe css à list
        ELEMENTHTML.list.classList.add("list-ingredient");
      }
    }
  }
  //si on clique su un li , alors on appelle la fonction addTags qui permet d 'ajouter un tag
  for (const li of [...document.querySelectorAll("li")]) {
    li.addEventListener("click", () => addTags(li, 0, "list-ingredient", "blueTag"));
  }
  //appelle de la fonction qui permet d'afficher la liste
  showList(0);
};
// Fonction qui a le même principe que searchIngredient
export const searchAppliance = (e) => {
  const inputUser = e.target.value.toLowerCase();
  for (const item of recipes) {
    const appliance = item.appliance.toLowerCase();
    if (ELEMENTHTML.list.innerHTML.includes(`<li>${appliance}</li>`)) {
      continue;
    }
    if (appliance.match(inputUser)) {
      ELEMENTHTML.list.innerHTML += `<li>${appliance}</li>`;
      ELEMENTHTML.list.classList.add("list-appliance");
    }
  }
  for (const li of [...document.querySelectorAll("li")]) {
    li.addEventListener("click", () => addTags(li, 1, "list-appliance", "greenTag"));
  }
  showList(1);
};

// fonction qui a le même princie que searchIngredient et SearchAplliance
export const searchUstencil = (e) => {
  const inputUser = e.target.value.toLowerCase();
  for (const recipe of recipes) {
    for (const ustensil of recipe.ustensils) {
      if (ELEMENTHTML.list.innerHTML.includes(`<li>${ustensil.toLowerCase()}</li>`)) {
        continue;
      }
      if (ustensil.toLowerCase().match(inputUser)) {
        ELEMENTHTML.list.innerHTML += `<li>${ustensil}</li>`;
        ELEMENTHTML.list.classList.add("list-ustensils");
      }
    }
  }
  for (const li of [...document.querySelectorAll("li")]) {
    li.addEventListener("click", () => addTags(li, 2, "list-ustensils", "redTag"));
  }
  showList(2);
};

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
