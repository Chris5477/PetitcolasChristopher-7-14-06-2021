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
    for (let indexIngredient = 0; indexIngredient < array.length; indexIngredient++) {
        const ingredients = array[indexIngredient].ingredients;
        ingredients.forEach(item => {
            item.unit? containerIngredients[indexIngredient].innerHTML+=`<p class="ingredient">${item.ingredient} ${item.quantity} ${item.unit}</p>` : containerIngredients[indexIngredient].innerHTML+=`<p class="ingredient">${item.ingredient} ${item.quantity}</p>`
        })
    }
}


export const addTags = (element, index, classCss) => {
    ELEMENTHTML.allTags.innerHTML+=`<p class="tag">${element.innerHTML}</p>`
    const tag = document.querySelector(".tag");
    toFiltreRecipe(tag.innerHTML)
    ELEMENTHTML.doAchoice[index].classList.remove(classCss);
    [...document.querySelectorAll("li")].forEach(item => item.innerHTML="")
}



export const searchIngredient = (e) => {
    const inputUser = e.target.value.toLowerCase();
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            const ingredient = recipes[i].ingredients[j].ingredient.toLowerCase();
            if(ingredient.includes(inputUser)){
                ELEMENTHTML.doAchoice[0].innerHTML+=`<li>${ingredient}</li>`
                ELEMENTHTML.doAchoice[0].classList.add("list-ingredient")
            }
            
        }
        
    }
    [...document.querySelectorAll("li")].forEach(food => food.addEventListener("click", () =>  addTags(food,0,"list-ingredient")))
}

export const searchAppliance = (e) => {
    const inputUser = e.target.value.toLowerCase();
    for (let i = 0; i < recipes.length; i++) {
        const appliance = recipes[i].appliance.toLowerCase();
        if(appliance.includes(inputUser)){
            ELEMENTHTML.doAchoice[1].innerHTML+=`<li>${appliance}</li>`
            ELEMENTHTML.doAchoice[1].classList.add("list-appliance")
        }
        
    }
    [...document.querySelectorAll("li")].forEach(item => item.addEventListener("click",() => addTags(item, 1, "list-appliance")))
}

export const searchUstencil = (e) => {
    const inputUser = e.target.value.toLowerCase();
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
           const ustensil = recipes[i].ustensils[j].toLowerCase();
            if(ustensil.includes(inputUser)){
                ELEMENTHTML.doAchoice[2].innerHTML+=`<li>${ustensil}</li>`
                ELEMENTHTML.doAchoice[2].classList.add("list-ustensils")
            }
            
        }
        
    }
    [...document.querySelectorAll("li")].forEach(item => item.addEventListener("click", () => addTags(item, 2, "list-ustensil")))
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
            
            }
        }
        
    }
    createElement(recipeFilter)
    setIngredients(recipeFilter);
};
