import { recipes } from "./recipe.js";
import { ELEMENTHTML } from "./constant.js";

export const createElement = (array) => {
if(ELEMENTHTML.containerRecipe.innerHTML != ''){
    ELEMENTHTML.containerRecipe.innerHTML = ""
}
for (let i = 0; i < array.length; i++) {
    ELEMENTHTML.containerRecipe.innerHTML +=`
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


export const addTags = (element) => {
    ELEMENTHTML.allTags.innerHTML=`<p class="tag">${element}</p>`;
    ELEMENTHTML.choiceIngredient.innerHTML=""
    const tag = document.querySelector(".tag");
    toFiltreRecipe(tag.innerHTML)
}

export const searchIngredient = (e, array) => {
    const inputUser = e.target.value;
    for (let i = 0; i < array.length; i++) {
        for (let k = 0; k < array[i].ingredients.length; k++) {
            const element = array[i].ingredients[k].ingredient;
            if(element.toLowerCase().includes(inputUser.toLowerCase())){
                ELEMENTHTML.allTags.innerHTML=`<p class="tag">${inputUser}</p>`
              }
            }
        }
        const tag = document.querySelector(".tag")
        toFiltreRecipe(tag.innerHTML)
      
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
    
    for (let i = 0; i < recipes.length; i++) {
        const currentRecipe = recipes[i];
        if (currentRecipe.name.toLowerCase().match(tag.toLowerCase())) {
            recipeFilter = [...recipeFilter, currentRecipe];
        }
        if(currentRecipe.description.toLowerCase().match(tag.toLowerCase())){
            recipeFilter = [...recipeFilter, currentRecipe]
        }
        
        for (let k = 0; k < currentRecipe.ingredients.length; k++) {
            const element = currentRecipe.ingredients[k].ingredient;
            if(element.toLowerCase().includes(tag.toLowerCase())){
                recipeFilter = [...recipeFilter, currentRecipe];
                ELEMENTHTML.choiceIngredient.innerHTML+=`<li>${currentRecipe.ingredients[k].ingredient}</li>`
            }
        }
        
    }
    createElement(recipeFilter)
    setIngredients(recipeFilter);
    [...document.querySelectorAll("li")].forEach(food => food.addEventListener("click",() => addTags(food.innerHTML)))
};
