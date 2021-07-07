import { ELEMENTHTML } from "./constant.js"
import { addAllAppliances, addAllIngredients, addAllUstencil, createElement, setIngredients} from "./function.js";
import {recipes } from "./recipe.js"


export let recipeFilter = [];
let idRecipe = []
export const mainSearch = (e) => {

const inputUser = e.target.value.toLowerCase();

if(inputUser.length < 3 ){
   ELEMENTHTML.containerRecipe.innerHTML=`<p class="no-result">Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>`
}

recipeFilter = recipes.filter(recipe => recipe.name.toLowerCase().match(inputUser) || recipe.description.toLowerCase().match(inputUser))

idRecipe = recipeFilter.map(recipeId => recipeId.id )

for (const recipe of recipes) {
  for (const food of recipe.ingredients) {
    const ingredient = food.ingredient.toLowerCase()
    if([...idRecipe].includes(recipe.id)){
      continue;
    }
    if(ingredient.includes(inputUser)){
      recipeFilter = [...recipeFilter, recipe]
    }
  }
}

createElement(recipeFilter)
setIngredients(recipeFilter)


ELEMENTHTML.inputIngredient.addEventListener("click", () => {
  addAllIngredients(recipeFilter)
})

ELEMENTHTML.inputAppliance.addEventListener("click", () => {
  addAllAppliances(recipeFilter) 
  
})

ELEMENTHTML.inputUstencil.addEventListener("click", () => {
  addAllUstencil(recipeFilter)
  
})

console.log(recipeFilter)
}