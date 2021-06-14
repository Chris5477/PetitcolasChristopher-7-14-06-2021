import { ELEMENTHTML  } from "./constant.js";
import { createElement, setIngredients} from "./function.js";

createElement()
setIngredients()

// for (let i = 0; i < recipes.length; i++) {
//   const article = document.createElement('article');
//   article.className="card_recipe";
//   ELEMENTHTML.allRecipes.appendChild(article);
//   const picture = document.createElement("img");
//   picture.className="pictureRecipe"
//   picture.src="";
//   picture.alt="pas d'image pour le moment"
//   article.appendChild(picture);
//   const mainInfo = document.createElement("div")
//   mainInfo.className="head_card";
//   article.appendChild(mainInfo);


//   const listIngredient = document.createElement("div")

//   listIngredient.className="list_ingredient";
//   article.appendChild(listIngredient);

//   const name = document.createElement("h2");
//   name.textContent=recipes[i].name;
//   mainInfo.appendChild(name);

























//   const time = document.createElement("span");
//   time.className="time";
//   time.textContent=recipes[i].time;
//   mainInfo.appendChild(time);

//   const logoTime = document.createElement("span");
//   logoTime.className="far fa-clock";
//   time.appendChild(logoTime);





















//   const describeRecipe = document.createElement("p");
//   describeRecipe.className="describe_recipe"
//   describeRecipe.textContent= recipes[i].description
//   article.appendChild(describeRecipe);
// }

// const allIngredient = [...document.querySelectorAll(".list_ingredient")];
// const array = []
// for (const key in recipes) {
//   const ingredients = recipes[key].ingredients;
// ingredients.forEach(item => {
//   const para = document.createElement("p");
//   para.textContent=item.ingredient + " " + item.quantity
//   if(item.unit){
//     para.textContent+= " " + item.unit
//   }
//   para.className="ingredient"
//   allIngredient[key].appendChild(para)
    
// })
// } 

