import { recipes } from "./recipe.js";
import { ELEMENTHTML } from "./constant.js";

export const createElement = () => {
for (let i = 0; i < recipes.length; i++) {
    ELEMENTHTML.containerRecipe.innerHTML+=`
    <article class="card_recipe">
        <img class="picture_recipe" src="." alt="Image indisponible" />
        <div class="head_card">
            <h2>${recipes[i].name}</h2>
            <span class="time">${recipes[i].time}<span class="far fa-clock"></span></span>
        </div>
        <div class="description_recipe">
            <div class="list_ingredients"></div>
            <div class="make_recipe">
                <p class="instructions">${recipes[i].description}</p>
            </div>
        </div>
    </article>`
}         
}

export const setIngredients = () => {
    const containerIngredients = [...document.querySelectorAll(".list_ingredients")]
    for (const key in recipes) {
        const ingredients = recipes[key].ingredients;
        ingredients.forEach(item => {
            item.unit? containerIngredients[key].innerHTML+=`<p class="ingredient">${item.ingredient} ${item.quantity} ${item.unit}</p>` : containerIngredients[key].innerHTML+=`<p class="ingredient">${item.ingredient} ${item.quantity}</p>`
        })

    }
}

