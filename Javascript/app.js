import { ELEMENTHTML } from "./constant.js";
import { mainSearch } from "./algorithme2.js";
import { createElement, setIngredients, searchElement} from "./function.js";
import { recipes } from "./recipe.js";


createElement(recipes);
setIngredients(recipes)



ELEMENTHTML.mainSearch.addEventListener("input",(e) => mainSearch(e))
ELEMENTHTML.inputIngredient.addEventListener("change",(e) => searchElement(e))
ELEMENTHTML.inputAppliance.addEventListener("change",(e) => searchElement(e))
ELEMENTHTML.inputUstencil.addEventListener("change",(e) => searchElement(e))
