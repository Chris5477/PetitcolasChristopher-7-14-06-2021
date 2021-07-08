import { recipes } from "./recipe.js"
import { ELEMENTHTML } from "./constant.js"
import { createElement, setIngredients } from "./function.js"
import { mainSearch, searchElement } from "./algo1.js"

createElement(recipes)
setIngredients(recipes)

ELEMENTHTML.mainSearch.addEventListener("input" , (e) => mainSearch(e))
ELEMENTHTML.inputIngredient.addEventListener("change", (e) => searchElement(e))
ELEMENTHTML.inputAppliance.addEventListener("change", (e) => searchElement(e))
ELEMENTHTML.inputUstencil.addEventListener("change", (e) => searchElement(e))