import { recipes } from "./recipe.js";
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
  for (const key in array) {
    const ingredients = array[key].ingredients;
    ingredients.forEach((item) => {
      item.unit
        ? (containerIngredients[key].innerHTML += `<p class="ingredient">${item.ingredient} ${item.quantity} ${item.unit}</p>`)
        : (containerIngredients[key].innerHTML += `<p class="ingredient">${item.ingredient} ${item.quantity}</p>`);
    });
  }
};

const arrayTag = [];
export const addTags = (element, index, classCss) => {
  arrayTag.push(element.innerHTML);
  arrayTag.forEach((tag) => (ELEMENTHTML.allTags.innerHTML += `<p class="tag">${element.innerHTML}</p>`));
  // ELEMENTHTML.allTags.innerHTML=`<p class="tag">${element.innerHTML}</p>`
  const tag = document.querySelector(".tag");
  toFiltreRecipe(arrayTag);
  ELEMENTHTML.doAChoice[index].classList.remove(classCss);
  [...document.querySelectorAll("li")].forEach((li) => (li.innerHTML = ""));
  return arrayTag;
};

export const searchIngredient = (e) => {
  const inputUser = e.target.value.toLowerCase();
  for (const key in recipes) {
    const resultRecipe = recipes[key];
    const listIngredient = recipes[key].ingredients;
    for (const index in listIngredient) {
      const ingredient = listIngredient[index].ingredient.toLowerCase();
      if (ingredient.match(inputUser)) {
        ELEMENTHTML.doAChoice[0].innerHTML += `<li>${listIngredient[index].ingredient}</li>`;
        ELEMENTHTML.doAChoice[0].classList.add("list-ingredient");
      }
    }
  }
  [...document.querySelectorAll("li")].forEach((food) => food.addEventListener("click", () => addTags(food, 0, "list-ingredient")));
};

export const searchAppliance = (e) => {
  const inputUser = e.target.value;
  for (let i = 0; i < recipes.length; i++) {
    const appliance = recipes[i].appliance.toLowerCase();
    if (appliance.match(inputUser.toLowerCase())) {
      ELEMENTHTML.doAChoice[1].innerHTML += `<li>${appliance}</li>`;
      ELEMENTHTML.doAChoice[1].classList.add("list-appliance");
    }
  }
  [...document.querySelectorAll("li")].forEach((item) => item.addEventListener("click", () => addTags(item, 1, "list-appliance")));
};

export const searchUstencil = (e) => {
  const inputUser = e.target.value;
  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ustensils.length; j++) {
      const ustensil = recipes[i].ustensils[j].toLowerCase();
      if (ustensil.match(inputUser.toLowerCase())) {
        ELEMENTHTML.doAChoice[2].innerHTML += `<li>${ustensil}</li>`;
        ELEMENTHTML.doAChoice[2].classList.add("list-ustensils");
      }
    }
  }
  [...document.querySelectorAll("li")].forEach((item) => item.addEventListener("click", () => addTags(item, 2, "list-ustensils")));
};

export const toFiltreRecipe = (tags) => {
  let recipeFilter = [];
  console.log(tags);

  for (const value of tags) {
    recipeFilter = recipes.filter(
      (item) => item.name.toLowerCase().match(value.toLowerCase()) || item.description.toLowerCase().match(value.toLowerCase())
    );

    for (const key in recipes) {
      const resultRecipe = recipes[key];
      const listIngredient = recipes[key].ingredients;
      for (const index in listIngredient) {
        if (listIngredient[index].ingredient.toLowerCase().includes(value.toLowerCase())) {
          recipeFilter = [...recipeFilter, resultRecipe];
        }
      }
    }
  }

  createElement(recipeFilter);
  setIngredients(recipeFilter);
};
