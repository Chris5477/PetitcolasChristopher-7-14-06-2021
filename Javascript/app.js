import { ELEMENTHTML } from "./constant.js";
import { mainSearch, searchElement } from "./algorithme2.js";
import { createElement, setIngredients } from "./function.js";
import { recipes } from "./recipe.js";

createElement(recipes);
setIngredients(recipes);

ELEMENTHTML.mainSearch.addEventListener("change", (e) => mainSearch(e));

ELEMENTHTML.inputIngredient.addEventListener("change", (e) => searchElement(e));
ELEMENTHTML.inputAppliance.addEventListener("change", (e) => searchElement(e));
ELEMENTHTML.inputUstencil.addEventListener("change", (e) => searchElement(e));
