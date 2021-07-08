// import { ELEMENTHTML } from "./constant.js";
// import { addTags } from "./function.js";
// import { recipes } from "./recipe.js";

// export const searchIngredient = (e) => {
//   const inputUser = e.target.value.toLowerCase();

  

//   let recipeFilter = [];
//   if (inputUser.length < 3) {
//     ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Pour commencer la recherche , veuillez saisir au minimum 3 caractères</p>`;
//   }

//   for (let i = 0; i < recipes.length; i++) {
//     const currentRecipe = recipes[i];
//     if (currentRecipe.name.toLowerCase().match(inputUser)) {
//       recipeFilter = [...recipeFilter, currentRecipe];
//     }

//     for (let j = 0; j < currentRecipe.length; j++) {
//       if (currentRecipe.description.toLowerCase().match(inputUser)) {
//         if (!currentRecipe.id.includes(recipeFilter[j].id)) {
//           recipeFilter = [...recipeFilter, currentRecipe];
//         } else {
//           continue;
//         }
//       }
//     }

//     for (let k = 0; k < currentRecipe.ingredients.length; k++) {
//       const element = currentRecipe.ingredients[k].ingredient.toLowerCase();
//       if (element.includes(inputUser)) {
//         recipeFilter = [...recipeFilter, currentRecipe];
//         ELEMENTHTML.list.innerHTML += `<li>${element}</li>`;
//         ELEMENTHTML.list.classList.add("list-ingredient")
//       }
//     }
    
//   }
//   [...document.querySelectorAll("li")].forEach((food) => food.addEventListener("click", () => addTags(food, 0, "list-ingredient", "blueTag")));
//   showList(0)
// };

// export const searchAppliance = (e) => {
//   const inputUser = e.target.value.toLowerCase();
//   for (let i = 0; i < recipes.length; i++) {
//       const appliance = recipes[i].appliance.toLowerCase();
//       if(appliance.includes(inputUser)){
//           ELEMENTHTML.list.innerHTML+=`<li>${appliance}</li>`
//           ELEMENTHTML.list.classList.add("list-appliance")
//       }
      
//   }
//   [...document.querySelectorAll("li")].forEach(item => item.addEventListener("click",() => addTags(item, 1, "list-appliance", "greenTag")))
//   showList(1)
// }

// export const searchUstencil = (e) => {
//   const inputUser = e.target.value.toLowerCase();
//   for (let i = 0; i < recipes.length; i++) {
//       for (let j = 0; j < recipes[i].ustensils.length; j++) {
//          const ustensil = recipes[i].ustensils[j].toLowerCase();
//           if(ustensil.includes(inputUser)){
//               ELEMENTHTML.list.innerHTML+=`<li>${ustensil}</li>`
//               ELEMENTHTML.list.classList.add("list-ustensils")
//           }
          
//       }
      
//   }
//   [...document.querySelectorAll("li")].forEach(item => item.addEventListener("click", () => addTags(item, 2, "list-ustensil", "redTag")))
//   showList(2)
// }

// // Fonction qui permet de montrer les ingredients qui correspondent à la recherche
// const showList = (index) => {
//   // Permet de placer la list sur le bonne input
//   ELEMENTHTML.box[index].appendChild(ELEMENTHTML.list);
//   //ajoute une marge a droite pour afficher coorectement la liste
//   ELEMENTHTML.box[index].style.marginRight = "160px";
//   //ajoute une marge en haut pour eviter que la liste passe au dessus des recettes
//   ELEMENTHTML.containerRecipe.style.marginTop = "200px";
//   // ajoute l'animation du logo des inputs
//   ELEMENTHTML.logoArraow[index].classList.add("animLogo");
// };







































// import { recipes } from "./recipe.js";
// import { ELEMENTHTML } from "./constant.js";

// export const createElement = (array) => {
//   if (ELEMENTHTML.containerRecipe.innerHTML != "") {
//     ELEMENTHTML.containerRecipe.innerHTML = "";
//   }
//   for (let i = 0; i < array.length; i++) {
//     ELEMENTHTML.containerRecipe.innerHTML += `
//     <article class="card_recipe">
//         <img class="picture_recipe" src="." alt="Image indisponible" />
//         <div class="head_card">
//             <h2>${array[i].name}</h2>
//             <span class="time">${array[i].time}<span class="far fa-clock"></span></span>
//         </div>
//         <div class="description_recipe">
//             <div class="list_ingredients"></div>
//             <div class="make_recipe">
//                 <p class="instructions">${array[i].description}</p>
//             </div>
//         </div>
//     </article>`;
//   }
// };

// export const setIngredients = (array) => {
//   const containerIngredients = [...document.querySelectorAll(".list_ingredients")];
//   for (let indexIngredient = 0; indexIngredient < array.length; indexIngredient++) {
//     const ingredients = array[indexIngredient].ingredients;
//     ingredients.forEach((item) => {
//       item.unit
//         ? (containerIngredients[indexIngredient].innerHTML += `<p class="ingredient">${item.ingredient} ${item.quantity} ${item.unit}</p>`)
//         : (containerIngredients[indexIngredient].innerHTML += `<p class="ingredient">${item.ingredient} ${item.quantity}</p>`);
//     });
//   }
// };

// //initialisation de recipêFilter qui me servira pour trier les recettes on fontions des entrées utilisateur
// let recipeFilter = [];
// // initialistation d'un tableau qui va stocker les tags
// export const arrayTag = [];

// //Fonction qui permet d'ajouter un tag
// export const addTags = (element, index, classCss, tagColor) => {
//   // permet de decaler les inputs quand la liste apparait
//   ELEMENTHTML.containerRecipe.style.margin = "0px";
//   ELEMENTHTML.box[index].style.marginRight = "0px";
//   // enleve la callse animLogo pour que le logo (^) retrouve sa position d'origine
//   ELEMENTHTML.logoArraow[index].classList.remove("animLogo");

//   // on recupère la veleur de l'ingredient cliqué par l'utilisateur et on le pousse dans arrayTag
//   arrayTag.push(element.innerHTML);
//   // Pour chaque valeur tu tableau on crée un élément HTML p
//   ELEMENTHTML.allTags.innerHTML += `<p class="tag ${tagColor}">${element.innerHTML}<span class="fas fa-times"></span></p>`;

//   // en fonction de la taille de tableau , on appelle la fonction avec un array different
//   recipeFilter.length === 0 ? toFiltreRecipe(arrayTag, recipes) : toFiltreRecipe(arrayTag, recipeFilter);
//   // Suppresiion de la classe Css afin de retirer la list d 'ingredient
//   ELEMENTHTML.list.classList.remove(classCss);
//   // Suppression des valeurs de la liste d'ingredient
//   for (const li of [...document.querySelectorAll("li")]) {
//     li.innerHTML = "";
//   }
//   // pour chaque logo croix , on recupere la clé et on appelle une fonction pour supprimer le tag
//   [...document.querySelectorAll(".fa-times")].forEach((item, key) => item.addEventListener("click", () => undoTag(arrayTag, key)));

//   // on retourne arrayTag pour rendre le tableau disponible
//   return arrayTag;
// };

// export const undoTag = (array, key) => {
//   array.splice(key);
//   //avec la clé récuperé , on supprime le tag associé
//   [...document.querySelectorAll(".tag")][key].remove();
//   // puis on revérifie la taille du tableau pour filtrer en fonctions des tags qui reste
//   if (array.length === 0) {
//     createElement(recipes);
//     setIngredients(recipes);
//   } else if (array.length >= 1) {
//     toFiltreRecipe(arrayTag, recipes);
//   } else {
//     toFiltreRecipe(arrayTag, recipeFilter);
//   }
// };

// // Fonction qui permet d'afficher les recettes en fonctions des tags
// export const toFiltreRecipe = (tags, array) => {
//   // Array qui contiendra tout les id pour effacer les doublons
//   let arrayId = [];

//   // Boucle for of pur agir sur toutes les valeurs

//   for (let index = 0; index < tags.length; index++) {
//     const value = tags[index];
//     let flag = 0;

//     for (let indexRecipe = 0; indexRecipe < array.length; indexRecipe++) {
//       const currentRecipe = array[indexRecipe];
//       if (currentRecipe.name.toLowerCase().match(value) || currentRecipe.description.toLowerCase().match(value)) {
//         recipeFilter = [...recipeFilter, currentRecipe];
//       }
//       for (let recipeFilterIndex = 0; recipeFilterIndex < recipeFilter.length; recipeFilterIndex++) {
//         arrayId.push(recipeFilter[recipeFilterIndex].id);
//       }

//       for (let recipe = 0; recipe < recipes.length; recipe++) {
//         if ([...arrayId].includes(recipes[recipe].id)) {
//           flag = 1;
//           continue;
//         }
//       }
//       for (let food = 0; food < currentRecipe.ingredients.length; food++) {
//         const ingredient = currentRecipe.ingredients[food].ingredient.toLowerCase();
//         if (ingredient.includes(value) && flag === 0) {
//           recipeFilter = [...recipeFilter, currentRecipe];
//         }
//       }
//     }
//   }

//   createElement(recipeFilter);
//   setIngredients(recipeFilter);
//   // on retourne recipeFilter pour que l'algorithme fonctionne!
//   return recipeFilter;
// };



















































// import { ELEMENTHTML } from "./constant.js";
// import { recipes } from "./recipe.js";
// import { createElement, setIngredients } from "./function.js";
// import { searchIngredient, searchAppliance, searchUstencil } from "./algo1.js";

// createElement(recipes);
// setIngredients(recipes);

// ELEMENTHTML.mainSearch.addEventListener("change", (e) => searchIngredient(e));
// ELEMENTHTML.inputIngredient.addEventListener("change", (e) => searchIngredient(e));
// ELEMENTHTML.inputAppliance.addEventListener("change", (e) => searchAppliance(e));
// ELEMENTHTML.inputUstencil.addEventListener("change", (e) => searchUstencil(e));
