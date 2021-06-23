import { ELEMENTHTML  } from "./constant.js";
import { createElement, setIngredients} from "./function.js";
import { recipes } from "./recipe.js"
import { searchRecipe } from "./algo1.js"

createElement(recipes)
setIngredients()

ELEMENTHTML.mainSearch.addEventListener("input", (e) => searchRecipe(e))

