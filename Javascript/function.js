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
    ELEMENTHTML.tags.innerHTML=el
    ELEMENTHTML.restIngredient.innerHTML=""
}