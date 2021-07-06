import { ELEMENTHTML } from "./constant.js";
import { recipes } from "./recipe.js";
import { createElement, setIngredients } from "./function.js";
import { searchIngredient, searchAppliance, searchUstencil } from "./algo1.js";

createElement(recipes);
setIngredients(recipes);

ELEMENTHTML.mainSearch.addEventListener("change", (e) => searchIngredient(e));
ELEMENTHTML.inputIngredient.addEventListener("change", (e) => searchIngredient(e));
ELEMENTHTML.inputAppliance.addEventListener("change", (e) => searchAppliance(e));
ELEMENTHTML.inputUstencil.addEventListener("change", (e) => searchUstencil(e));
