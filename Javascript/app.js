import { ELEMENTHTML  } from "./constant.js";
import { createElement, setIngredients, searchIngredient, searchAppliance, searchUstencil} from "./function.js";
import { recipes } from "./recipe.js"
import { searchRecipe } from "./algo1.js"

createElement(recipes)
setIngredients()

ELEMENTHTML.mainSearch.addEventListener("change", (e) => searchRecipe(e));
ELEMENTHTML.inputIngredient.addEventListener("change", (e) => searchIngredient(e, recipes));
ELEMENTHTML.inputAppliance.addEventListener("change", (e) => searchAppliance(e, recipes))
ELEMENTHTML.inputUstencil.addEventListener("change", (e) => searchUstencil(e, recipes))



