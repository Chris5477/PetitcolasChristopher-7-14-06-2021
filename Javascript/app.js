import { ELEMENTHTML  } from "./constant.js";
import { recipes } from "./recipe.js";
import { createElement, searchAppliance, searchUstencil, setIngredients} from "./function.js";
import {searchRecipe} from "./algorithme2.js"

createElement(recipes)
setIngredients(recipes)

ELEMENTHTML.mainSearch.addEventListener("change",(e) => searchRecipe(e))
ELEMENTHTML.inputIngredient.addEventListener("change", (e) => searchRecipe(e, recipes))
ELEMENTHTML.inputAppliance.addEventListener("change", (e) => searchAppliance(e, recipes))
ELEMENTHTML.inputUstencil.addEventListener("change", (e) => searchUstencil(e, recipes))
