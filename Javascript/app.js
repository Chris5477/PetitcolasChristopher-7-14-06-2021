import { ELEMENTHTML } from "./constant.js";
import { mainSearch, searchElement} from "./algorithme2.js";
import { createElement, setIngredients } from "./function.js";
import { recipes } from "./recipe.js";


createElement(recipes);
setIngredients(recipes)


// if(ELEMENTHTML.mainSearch.value ==="" || ELEMENTHTML.allTags.innerHTML=="" ){
//     ELEMENTHTML.inputIngredient.addEventListener("input",(e) => mainSearch(e))
//     ELEMENTHTML.inputAppliance.addEventListener("input",(e) => mainSearch(e))
//     ELEMENTHTML.inputUstencil.addEventListener("input",(e) => mainSearch(e))
//     ELEMENTHTML.inputIngredient.addEventListener("change",(e) => searchElement(e))
//     ELEMENTHTML.inputAppliance.addEventListener("change",(e) => searchElement(e))
//     ELEMENTHTML.inputUstencil.addEventListener("change",(e) => searchElement(e))
// }else if(ELEMENTHTML.mainSearch.value === "" || ELEMENTHTML.allTags.innerHTML !==""){
//     ELEMENTHTML.inputIngredient.addEventListener("change",(e) => searchElement(e))
//     ELEMENTHTML.inputAppliance.addEventListener("change",(e) => searchElement(e))
//     ELEMENTHTML.inputUstencil.addEventListener("change",(e) => searchElement(e))
// }else{
    
    ELEMENTHTML.mainSearch.addEventListener("input",(e) => mainSearch(e))
    ELEMENTHTML.inputIngredient.addEventListener("change",(e) => searchElement(e))
    ELEMENTHTML.inputAppliance.addEventListener("change",(e) => searchElement(e))
    ELEMENTHTML.inputUstencil.addEventListener("change",(e) => searchElement(e))



