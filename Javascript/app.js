import { ELEMENTHTML  } from "./constant.js";
import { recipes } from "./recipe.js";
import { createElement, setIngredients} from "./function.js";
import {searchRecipe, continueSearch} from "./algorithme2.js"

createElement(recipes)
setIngredients(recipes)

ELEMENTHTML.mainSearch.addEventListener("change",(e) => searchRecipe(e))

