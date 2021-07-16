import { recipes } from "./recipe.js"
import { ELEMENTHTML } from "./constant.js"
import { createElement, setIngredients } from "./function.js"
import { searchByMainInput } from "./algo1.js"

createElement(recipes)
setIngredients(recipes)

ELEMENTHTML.mainSearch.addEventListener("change" , (e) => searchByMainInput(e))
