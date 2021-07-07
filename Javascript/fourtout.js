// import { ELEMENTHTML } from "./constant.js";
// import { show, addTags, showList, search } from "./function.js";
// import { recipes } from "./recipe.js";

// // Fonction qui va permettre de chercher un ingrédient
// let recipeFilter = [];
// let arrayId = [];
// export const mainSearch = (e) => {

//   const inputUser = e.target.value.toLowerCase();

//   if (inputUser.length < 3) {
//     ELEMENTHTML.containerRecipe.innerHTML = `<p class="no-result">Aucune recette ne correspond à votre critère… vous pouvez
//     chercher « tarte aux pommes , « poisson », etc.</p>`;
//   }

//   recipeFilter = recipes.filter((item) => item.name.toLowerCase().match(inputUser) || item.description.toLowerCase().match(inputUser));

//   arrayId = recipeFilter.map((item) => item.id);

//   for (const recipe of recipes) {
//     for (const ingredients of recipe.ingredients) {
//       const ingredient = ingredients.ingredient.toLowerCase();
//       if ([...arrayId].includes(recipe.id)) {
//         continue;
//       }
//       if (ingredient.includes(inputUser)) {
//         recipeFilter = [...recipeFilter, recipe];
//       }
//     }
//   }
//   show(recipeFilter);


  
//   ELEMENTHTML.inputIngredient.addEventListener("input", (e) => {
//     const inputUser = e.target.value.toLowerCase();
//     [...document.querySelectorAll("li")].forEach((item) => {
//       if (inputUser.length >= 3 && item.innerHTML !== inputUser && !item.innerHTML.match(inputUser)) {
//         item.style.display ="none";
//       }
//       if(inputUser.length === 0){
//         item.style.display="initial"
//       }
//     });
//     [...document.querySelectorAll("li")].forEach(li => li.addEventListener("click", () => addTags(li, 0, "list-ingredients", "blueTag")));
//   });
  
    
//     for (const recipe of recipeFilter) {
//       for (const ingredients of recipe.ingredients) {
//         const ingredient = ingredients.ingredient.toLowerCase();
//         if (ELEMENTHTML.list.innerHTML.includes(`<li>${ingredient}</li>`)) {
//         continue;
//       }
//       ELEMENTHTML.list.innerHTML += `<li>${ingredient}</li>`;
//       ELEMENTHTML.list.classList.add("list-ingredient");
//     }
//   }
//   showList(0);
//   search()



//   ELEMENTHTML.inputAppliance.addEventListener("input", (e) => {
//     const inputUser = e.target.value.toLowerCase();
//     [...document.querySelectorAll("li")].forEach((item) => {
//       if (inputUser.length >= 3 && item.innerHTML !== inputUser && !item.innerHTML.match(inputUser)) {
//         item.style.display ="none";
//       }
//       if(inputUser.length === 0){
//         item.style.display="initial"
//       }
//     });
//   }); 
//   [...document.querySelectorAll("li")].forEach(li => li.addEventListener("click", () => addTags(li, 1, "list-appliance", "greenTag")));


//     ELEMENTHTML.inputUstencil.addEventListener("input", (e) => {
//       const inputUser = e.target.value.toLowerCase();
//       [...document.querySelectorAll("li")].forEach((item) => {
//         if (inputUser.length >= 3 && item.innerHTML !== inputUser && !item.innerHTML.match(inputUser)) {
//           item.style.display ="none";
//         }
//         if(inputUser.length === 0){
//           item.style.display="initial"
//         }
//       });
//     });

//       [...document.querySelectorAll("li")].forEach(li => li.addEventListener("click", () => addTags(document.querySelector("li"), 2, "list-ustensils", "redTag")));
// };




















































//   export const searchIngredient = (e) => {

//     const inputUser = e.target.value.toLowerCase();
//     // Verifie chaque valeur du tableau et le stocke dans le tableau si verifié
//     recipeFilter = recipes.filter((item) => item.name.toLowerCase().match(inputUser) || item.description.toLowerCase().match(inputUser));
    
//     //Utilisation de 2 boucles for of pour acceder aux valeurs de recipes
//     for (const recipe of recipes) {
//       const listIngredient = recipe.ingredients;
//       for (const food of listIngredient) {
//         //on stocke les ingredients en minuscules
//         const ingredient = food.ingredient.toLowerCase();
//         //si dans la liste , l'ingredient est present on ignore
//         if (ELEMENTHTML.list.innerHTML.includes(`<li>${ingredient}</li>`)) {
//           continue;
//         }  
//         //si l'entrée utilisateur correspond à l'ingredient
//         if (ingredient.includes(inputUser)) {
//           //on le pousse dans le tableau recipeFilter
//           recipeFilter = [...recipeFilter, recipe];
//           // on crée un élément li dans list
//           ELEMENTHTML.list.innerHTML += `<li>${ingredient}</li>`;
//           // on ajoute une classe css à list
//           ELEMENTHTML.list.classList.add("list-ingredient");
//         }  
//       }  
//     }  
//     //si on clique su un li , alors on appelle la fonction addTags qui permet d 'ajouter un tag
//     for (const li of [...document.querySelectorAll("li")]) {
//       li.addEventListener("click", () => addTags(li, 0, "list-ingredient", "blueTag"));
//       showList(0);
//     }  
//   }  
//    //appelle de la fonction qui permet d'afficher la liste
   
//    //Fonction qui a le même principe que searchIngredient
//    export const searchAppliance = (e) => {
//      const inputUser = e.target.value.toLowerCase();
//      for (const item of recipes) {
//      const appliance = item.appliance.toLowerCase();  
//      if (ELEMENTHTML.list.innerHTML.includes(`<li>${appliance}</li>`)) {
//        continue;
//      }  
//      if (appliance.match(inputUser)) {
//        ELEMENTHTML.list.innerHTML += `<li>${appliance}</li>`;
//        ELEMENTHTML.list.classList.add("list-appliance");
//      }  
//    }  
//    for (const li of [...document.querySelectorAll("li")]) {
//      li.addEventListener("click", () => addTags(li, 1, "list-appliance", "greenTag"));
//    }  
//    showList(1);
//  };  

//   //fonction qui a le même princie que searchIngredient et SearchAplliance
//  export const searchUstencil = (e) => {
//    const inputUser = e.target.value.toLowerCase();
//    for (const recipe of recipes) {
//      for (const ustensil of recipe.ustensils) {
//        if (ELEMENTHTML.list.innerHTML.includes(`<li>${ustensil.toLowerCase()}</li>`)) {
//          continue;
//        }  
//        if (ustensil.toLowerCase().match(inputUser)) {
//          ELEMENTHTML.list.innerHTML += `<li>${ustensil}</li>`;
//          ELEMENTHTML.list.classList.add("list-ustensils");
//        }  
//      }  
//    }  
//    for (const li of [...document.querySelectorAll("li")]) {
//      li.addEventListener("click", () => addTags(li, 2, "list-ustensils", "redTag"));
//    }  
//    showList(2);
//  };  




//  =========================================================================================================================================================

//  import { recipes } from "./recipe.js";
// import { ELEMENTHTML } from "./constant.js";

// // Fonction qui permet de générer des éléments HTML
// export const createElement = (array) => {
//   // verfication du conteneur pour afficher autant d'élément que de recettes filtrées , si il n'est pas vide , alors on le vide
//   if (ELEMENTHTML.containerRecipe.innerHTML != "") {
//     ELEMENTHTML.containerRecipe.innerHTML = "";
//   }

//   // Création des éléments avec une boucles pour injecter les données
//   for (const element of array) {
//     ELEMENTHTML.containerRecipe.innerHTML += `
//     <article class="card_recipe">
//     <img class="picture_recipe" src="." alt="Image indisponible" />
//     <div class="head_card">
//     <h2>${element.name}</h2>
//     <span class="time">${element.time}<span class="far fa-clock"></span></span>
//     </div>
//     <div class="description_recipe">
//     <div class="list_ingredients"></div>
//     <div class="make_recipe">
//     <p class="instructions">${element.description}</p>
//     </div>
//     </div>
//     </article>`;
//   }
// };

// // Fonction qui permet de définir les ingredients dans les cartes de recette
// export const setIngredients = (array) => {
//   //Cibalge des éléments li créées avec la fonction createElement
//   const containerIngredients = [...document.querySelectorAll(".list_ingredients")];
//   //Pour chacune des valeurs du tableau , on injecte les données
//   for (const key in array) {
//     const ingredients = array[key].ingredients;
//     ingredients.forEach((item) => {
//       // Vérification pour afficher les ingredients avec quantité , ou unité
//       // Si la valeur a la clé unit , alors on affiche la 'unité
//       if (item.hasOwnProperty("unit")) {
//         containerIngredients[key].innerHTML += `<p class="ingredient">${item.ingredient} ${item.quantity} ${item.unit}</p>`;
//         // Si la quantité n'est pas définit , alors on affiche que l'ingredient
//       } else if (item.quantity == undefined) {
//         containerIngredients[key].innerHTML += `<p class="ingredient">${item.ingredient}</p>`;
//         // sinon on affiche que l'ingredient et sa quantité
//       } else {
//         containerIngredients[key].innerHTML += `<p class="ingredient">${item.ingredient} ${item.quantity}</p>`;
//       }
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

// export const show = (array) => {
//   createElement(array)
//   setIngredients(array)
// }

// // Fonction qui permet d'afficher les recettes en fonctions des tags
// export const toFiltreRecipe = (tags, array) => {
//   // Array qui contiendra tout les id pour effacer les doublons
//   let arrayId = [];
//   // Boucle for of pur agir sur toutes les valeurs
//   for (const value of tags) {
//     // Si la valeur du tag a une correspondance dans le nom ou description , on le rentre dans recipeFilter
//     recipeFilter = array.filter(
//       (item) => item.name.toLowerCase().match(value.toLowerCase()) || item.description.toLowerCase().match(value.toLowerCase())
//     );

//     //On push les id des recettes de recipefilter
//     arrayId = recipeFilter.map((item) => item.id);

//     //boucle for of pour acceder aux ingredients dans le sous tableau ingredients

//     for (const recipe of array) {
//       for (const ingredients of recipe.ingredients) {
//         const ingredient = ingredients.ingredient.toLowerCase();
//         // pour chaque id , si inclus dans dans le tableau ""array", alors on continu et on ignore
//         if ([...arrayId].includes(recipe.id)) {
//           continue;
//         }
//         // sinon on pousse la valeur dans recipeFilter
//         if (ingredient.includes(value.toLowerCase())) {
//           recipeFilter = [...recipeFilter, recipe];
//         }
//       }
//     }
    
//     for (const recipe of array) {
//       for(const ustensil of recipe.ustensils){
//         if(ustensil.includes(value.toLowerCase())){
//           recipeFilter = [...recipeFilter, recipe]
//           console.log(recipeFilter)
//         }
//       }
//     }
//   }

    
//   //On créer autant de carte de recette en fonction du nombre de valeur de recipeFilter et on définit les ingrédients de chacunes des recettes

//   createElement(recipeFilter);
//   setIngredients(recipeFilter);
//   // on retourne recipeFilter pour que l'algorithme fonctionne!
//   return recipeFilter;
// };


// //Fonction qui permet de montrer les ingredients qui correspondent à la recherche
// export const showList = (index) => {
//   //Permet de placer la list sur le bonne input
//  ELEMENTHTML.box[index].appendChild(ELEMENTHTML.list);
//  //ajoute une marge a droite pour afficher coorectement la liste
//  ELEMENTHTML.box[index].style.marginRight = "160px";
//  //ajoute une marge en haut pour eviter que la liste passe au dessus des recettes
//  ELEMENTHTML.containerRecipe.style.marginTop = "200px";
//   //ajoute l'animation du logo des inputs
//  ELEMENTHTML.logoArraow[index].classList.add("animLogo");
// };

// export const search = () => {
  
//   for (const recipe of recipeFilter) {
//     for (const ing of recipe.ingredients) {
//     const aaa = ing.ingredient.toLowerCase();
//     if (ELEMENTHTML.list.innerHTML.includes(`<li>${aaa}</li>`)) {
//       continue;
//     }
//     ELEMENTHTML.list.innerHTML += `<li>${aaa}</li>`;
//     ELEMENTHTML.list.classList.add("list-ingredient");
//     showList(0);
//   }
// }

// const allAppliance = recipeFilter.map((item) => item.appliance);

// ELEMENTHTML.inputAppliance.addEventListener("click", () => {
//   ELEMENTHTML.list.innerHTML = "";
//   ELEMENTHTML.list.classList.remove("list-ingredient");
  
//   for (const item of allAppliance) {
//     if (ELEMENTHTML.list.innerHTML.includes(`<li>${item.toLowerCase()}</li>`)) {
//       continue;
//     }
//     ELEMENTHTML.list.innerHTML += `<li>${item.toLowerCase()}</li>`;
//     ELEMENTHTML.list.classList.add("list-appliance");
//     showList(1);
//   }
// });

// const allUstensils = recipeFilter.map((item) => item.ustensils);

// ELEMENTHTML.inputUstencil.addEventListener("click", () => {
//   ELEMENTHTML.list.innerHTML = "";
//   ELEMENTHTML.list.classList.remove("list-appliance");
  
//   for (const item of allUstensils) {
//     for (const ustensil of item) {
//       if (ELEMENTHTML.list.innerHTML.includes(`<li>${ustensil.toLowerCase()}</li>`)) {
//         continue;
//       }
      
//       ELEMENTHTML.list.innerHTML += `<li>${ustensil}</li>`;
//       ELEMENTHTML.list.classList.add("list-ustensils");
//       showList(2);
//     }
//   }
// }); 
// }

// ===================================================================================================================================
// import { ELEMENTHTML } from "./constant.js";
// import { recipes } from "./recipe.js";
// import { createElement, setIngredients } from "./function.js";
// import { mainSearch, searchIngredient, searchAppliance, searchUstencil } from "./algorithme2.js";

// createElement(recipes);
// setIngredients(recipes);

// ELEMENTHTML.mainSearch.addEventListener("change", (e) => mainSearch(e));
// ELEMENTHTML.inputIngredient.addEventListener("change", (e) => searchIngredient(e));
// ELEMENTHTML.inputAppliance.addEventListener("change", (e) => searchAppliance(e));
// ELEMENTHTML.inputUstencil.addEventListener("change", (e) => searchUstencil(e));
