import { ELEMENTHTML } from "./constant.js";
import { mainSearch } from "./algorithme2.js";
import { createElement, setIngredients } from "./function.js";
import { recipes } from "./recipe.js";

createElement(recipes);
setIngredients(recipes);

ELEMENTHTML.mainSearch.addEventListener("input", (e) => mainSearch(e));



