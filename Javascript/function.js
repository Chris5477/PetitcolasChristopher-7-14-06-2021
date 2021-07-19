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
    <div class="picture_recipe"></div>
    <div class="head_card">
          <h2>${element.name}</h2>
          <span class="time"><span class="far fa-clock"> ${element.time} min</span></span>
          </div>
        <div class="description_recipe">
        <div class="list_ingredients"></div>
        <div class="make_recipe">
          <p class="instructions">${element.description}</p>
          </div>
          </div>
          </article>`;
        }
        //Appelle de la fonction qui ajoutera une ellispe si le texte de la recette depasse la hauteur maximale de son parent
        ellipsis()
      };
      
      // Fonction qui permet de rajouter une éliipse si plus grand que parent
      const ellipsis = () => {
        // Ciblage de tous les conteneurs de recettes
        const cookingRecipe = [...document.querySelectorAll(".description_recipe")]
        // pour chacun d'entre eux
        cookingRecipe.forEach(recipe => {
          // ciblage de leur texte de rectte
            const textRecipe = recipe.querySelector(".instructions")
            // tant que le parent a moins de pixel en hauteur que le texte
            while(recipe.clientHeight < textRecipe.clientHeight){
              // on remplace le dernier mot de textRecipe avant depassement du parent par ... , 
               textRecipe.textContent = textRecipe.textContent.replace(/\W*\s(\S)*$/, "...")
        
            }
        })
      }
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
        containerIngredients[key].innerHTML += `<p class="ingredient"><span class="weight">${item.ingredient}</span> : ${item.quantity} ${item.unit}</p>`;
        // Si la quantité n'est pas définit , alors on affiche que l'ingredient
      } else if (item.quantity == undefined) {
        containerIngredients[key].innerHTML += `<p class="ingredient"><span class="weight">${item.ingredient}</span></p>`;
        // sinon on affiche que l'ingredient et sa quantité
      } else {
        containerIngredients[key].innerHTML += `<p class="ingredient"><span class="weight">${item.ingredient}</span>: ${item.quantity}</p>`;
      }
    });
  }
};

//Fonction qui permet de définir la couleur de fond du tag
export const setTypeTag = (elementLi, css) => {
  // en fonctions si elementLi contient la classe indiqué affiche sa couleur
  if (elementLi.classList.contains("ing")) {
    return (css = "blueTag");
  } else if (elementLi.classList.contains("object")) {
    return (css = "greenTag");
  } else {
    return (css = "redTag");
  }
};

//Fonction qui permet de supprimer un tag
export const removeTag = (key, array) => {
  //on demande de faire une supression de tag tant que chaque tag est superieur a l index de l icone sur la quelle il y a eu le clique
  do {
    [...document.querySelectorAll(".tag")][key].remove();
  } while ([...document.querySelectorAll(".tag")].length > key);
  
  // Et on appelle l array (historySearch non disponible sur ce module) pour afficher un des resultats des recherches précédentes
  createElement(array[key]);
  setIngredients(array[key]);
  createList(array[key]);
  // suppresion des tags de l array
  array.splice(key);
};


//Fonction qui permet de donner du style a une liste et supprimer ceux des autres des autres listes
 export const displayIngredient = () => {
   ELEMENTHTML.inputIngredient.placeholder = "Recherchez un ingredient";
   displayList(ELEMENTHTML.listFood, 0, ELEMENTHTML.inputIngredient, "box-ingredient")
   hiddenList(ELEMENTHTML.listItem,1,ELEMENTHTML.inputAppliance, "box-appliance", 'Appareil')
   hiddenList(ELEMENTHTML.listUStencil, 2, ELEMENTHTML.inputUstencil, "box-ustencil", "Ustensiles")
  }
  // pareil que la fonction préc"dente
  export const displayAppliance = () => {
    ELEMENTHTML.inputAppliance.placeholder = "Recherchez un appareil";
    displayList(ELEMENTHTML.listItem, 1, ELEMENTHTML.inputAppliance, "box-appliance")
    hiddenList(ELEMENTHTML.listFood,0,ELEMENTHTML.inputIngredient, "box-ingredient", "Ingredient")
    hiddenList(ELEMENTHTML.listUStencil, 2, ELEMENTHTML.inputUstencil, "box-ustencil", "UStensiles")
  }
  
  //pareil que la fonction précédente
  export const displayUstencil = () => {
  ELEMENTHTML.inputUstencil.placeholder="Recherchez un ustensile"
  displayList(ELEMENTHTML.listUStencil, 2, ELEMENTHTML.inputUstencil, "box-ustencil")
  hiddenList(ELEMENTHTML.listFood,0,ELEMENTHTML.inputIngredient, "box-ingredient", "Ingredient")
  hiddenList(ELEMENTHTML.listItem,1,ELEMENTHTML.inputAppliance, "box-appliance", "Appareil")
}

//permet d'afficher le style d'une liste
 const displayList = (element, index, input, cssClass) => {
  element.style.display="flex"
  ELEMENTHTML.box[index].classList.add(cssClass)
  ELEMENTHTML.logoArraow[index].classList.add("animLogo")
  input.classList.add("size-input")

}
//permet de retirer le styles des autres listes
 const hiddenList = (element, index, input, cssclass, placeholder) => {
element.style.display ="none"
input.classList.remove("size-input")
ELEMENTHTML.logoArraow[index].classList.remove("animLogo")
ELEMENTHTML.box[index].classList.remove(cssclass)
input.placeholder=placeholder
}

// permet de retirer le style de toutee les listes
export const hiddenAllList = () => {
  hiddenList(ELEMENTHTML.listFood,0,ELEMENTHTML.inputIngredient, "box-ingredient", "Ingredient")
  hiddenList(ELEMENTHTML.listItem,1,ELEMENTHTML.inputAppliance, "box-appliance", "Appareil")
  hiddenList(ELEMENTHTML.listUStencil, 2, ELEMENTHTML.inputUstencil, "box-ustencil","Ustensiles")
}


