import { ELEMENTHTML  } from "./constant.js";
import { recipes } from "./recipe.js";
import { createElement,setIngredients} from "./function.js";
import {searchRecipe, searchAppliance, searchUstencil} from "./algorithme2.js"

createElement(recipes)
setIngredients(recipes)

ELEMENTHTML.mainSearch.addEventListener("change",(e) => searchRecipe(e))
ELEMENTHTML.inputIngredient.addEventListener("change", (e) => searchRecipe(e))
ELEMENTHTML.inputAppliance.addEventListener("change", (e) => searchAppliance(e))
ELEMENTHTML.inputUstencil.addEventListener("change", (e) => searchUstencil(e))
