import { recipes } from "./recipe.js"
import { ELEMENTHTML } from "./constant.js";

export const createElement = (array) => {
    if( ELEMENTHTML.containerRecipe.innerHTML !=""){
        ELEMENTHTML.containerRecipe.innerHTML = ""
    }
for (let i = 0; i < array.length; i++) {
    ELEMENTHTML.containerRecipe.innerHTML+=`
    <article class="card_recipe">
        <img class="picture_recipe" src="." alt="Image indisponible" />
        <div class="head_card">
            <h2>${array[i].name}</h2>
            <span class="time">${array[i].time}<span class="far fa-clock"></span></span>
        </div>
        <div class="description_recipe">
            <div class="list_ingredients"></div>
            <div class="make_recipe">
                <p class="instructions">${array[i].description}</p>
            </div>
        </div>
    </article>`
}         
}

export const setIngredients = (array) => {
    const containerIngredients = [...document.querySelectorAll(".list_ingredients")]
    for (const key in array) {
        const ingredients = array[key].ingredients;
        ingredients.forEach(item => {
            item.unit? containerIngredients[key].innerHTML+=`<p class="ingredient">${item.ingredient} ${item.quantity} ${item.unit}</p>` : containerIngredients[key].innerHTML+=`<p class="ingredient">${item.ingredient} ${item.quantity}</p>`
        })

    }
}

export const addTag= (el) => {
    ELEMENTHTML.tags.innerHTML=`<p class="tag">${el}</p>`
    ELEMENTHTML.restIngredient.innerHTML=""
    const tag = document.querySelector(".tag");
    toFiltreRecipe(tag.innerHTML)
}

export const searchIngredient = (e, array) => {
    const inputUser = e.target.value;
    for (const key in array) {
        const resultRecipe = array[key];
        const listIngredient = array[key].ingredients;
        for (const index in listIngredient) {
          if (listIngredient[index].ingredient.toLowerCase().includes(inputUser.toLowerCase())) {
            recipeFilter = [...recipeFilter, resultRecipe];
            ELEMENTHTML.restIngredient.innerHTML+=`<li>${listIngredient[index].ingredient}</li>`;
          }
        }
        const tag = document.querySelector(".tag")
        toFiltreRecipe(tag.innerHTML)
      
}
}

export const searchAppliance = (e, array) =>{
    const inputUser = e.target.value;
    for(let i = 0; i < array.length; i++){
        if(array[i].appliance.toLowerCase().match(inputUser.toLowerCase())){
            ELEMENTHTML.allTags.innerHTML=`<p class="tag">${inputUser}</p>`
        }
    }
    const tag = document.querySelector(".tag")
        toFiltreRecipe(tag.innerHTML)
}

export const searchUstencil = (e, array) => {
    const inputUser = e.target.value;
    for (let i = 0; i < array.length; i++) {
       for (let j = 0; j < array[i].ustensils.length; j++) {
           if(array[i].ustensils[j].toLowerCase().includes(inputUser.toLowerCase())){
               ELEMENTHTML.allTags.innerHTML=`<p class="tag">${inputUser}</p>`
           }
           
        }
    }
    const tag = document.querySelector(".tag")
    toFiltreRecipe(tag.innerHTML)
}

 export const toFiltreRecipe = (tag) => {
    let recipeFilter = [];
    
  recipeFilter = recipes.filter(
    (item) => item.name.toLowerCase().match(tag.toLowerCase()) || item.description.toLowerCase().match(tag.toLowerCase())
  );

  for (const key in recipes) {
    const resultRecipe = recipes[key];
    const listIngredient = recipes[key].ingredients;
    for (const index in listIngredient) {
      if (listIngredient[index].ingredient.toLowerCase().includes(tag.toLowerCase())) {
        recipeFilter = [...recipeFilter, resultRecipe];
        ELEMENTHTML.restIngredient.innerHTML+=`<li>${listIngredient[index].ingredient}</li>`;
      }
    }
  
        
    }
    createElement(recipeFilter)
    setIngredients(recipeFilter);
    [...document.querySelectorAll("li")].forEach(food => food.addEventListener("click",() => addTags(food.innerHTML)))
};
