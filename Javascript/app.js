import { ELEMENTHTML  } from "./constant.js";
import { recipes } from "./recipe.js";
import { createElement, searchAppliance, searchUstencil, setIngredients,arrayTag, undoTag} from "./function.js";
import {searchRecipe} from "./algorithme2.js"

createElement(recipes)
setIngredients(recipes)

ELEMENTHTML.mainSearch.addEventListener("change",(e) => searchRecipe(e))
ELEMENTHTML.inputIngredient.addEventListener("change", (e) => searchRecipe(e))
ELEMENTHTML.inputAppliance.addEventListener("change", (e) => searchAppliance(e))
ELEMENTHTML.inputUstencil.addEventListener("change", (e) => searchUstencil(e))

