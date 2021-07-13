import { ELEMENTHTML } from "./constant.js";

export const createElement = (array) => {
  if (ELEMENTHTML.containerRecipe.innerHTML != "") {
    ELEMENTHTML.containerRecipe.innerHTML = "";
  }
  for (let i = 0; i < array.length; i++) {
    ELEMENTHTML.containerRecipe.innerHTML += `
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
    </article>`;
  }
};

export const setIngredients = (array) => {
  const containerIngredients = [...document.querySelectorAll(".list_ingredients")];
  for (let indexIngredient = 0; indexIngredient < array.length; indexIngredient++) {
    const ingredients = array[indexIngredient].ingredients;
    ingredients.forEach((item) => {
      item.unit
        ? (containerIngredients[indexIngredient].innerHTML += `<p class="ingredient">${item.ingredient} ${item.quantity} ${item.unit}</p>`)
        : (containerIngredients[indexIngredient].innerHTML += `<p class="ingredient">${item.ingredient} ${item.quantity}</p>`);
    });
  }
};

export const addStyleInput = (index, elementDom, classCss, contentDynamique) => {
  elementDom.innerHTML += `<li class="ing">${contentDynamique}</li>`;
  ELEMENTHTML.box[index].appendChild(elementDom);

  ELEMENTHTML.spanContainerInput[index].id = "bigInput";
  ELEMENTHTML.inputIngredient.id = "bigInput";

  ELEMENTHTML.logoArraow[index].classList.add("animLogo");
  ELEMENTHTML.listFood.classList.add(classCss);
};

export const removeStyleInput = (index, elementDom, classCss) => {
  ELEMENTHTML.box[index].appendChild(elementDom);

  ELEMENTHTML.spanContainerInput[index].id = "";
  ELEMENTHTML.inputIngredient.id = "";

  ELEMENTHTML.logoArraow[index].classList.remove("animLogo");
  ELEMENTHTML.listFood.classList.remove(classCss);
};