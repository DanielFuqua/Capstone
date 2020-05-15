import React, { useState, useRef, useContext } from "react";
import FoodList from "./foodList/FoodList";
import "../Layout.css";
import "../PantryPal.css";
// import "./Pantry.css";
import MealMakerForm from "./mealMaker/MealMakerForm";
import { MealQuantityProvider } from "./MealQuantityProvider";
import { MealContext } from "../meals/MealProvider";
import { UserMealContext } from "../meals/UserMealsProvider";

export default () => {
  const { meals } = useContext(MealContext);
  const { userMeals } = useContext(UserMealContext);

  const activeUserUserMeals =
    userMeals.filter(
      (userMeal) => userMeal.userId === parseInt(localStorage.getItem("pal_id"))
    ) || [];
  const activeUserMeals =
    activeUserUserMeals.map((actUserUserMeal) => {
      return meals.find((meal) => meal.id === actUserUserMeal.mealId);
    }) || {};

  const [ingredients, setIngredients] = useState([]);

  const addIngredients = (foods) => {
    // copy current state with slice
    const newIngredients = [...ingredients, ...foods];
    setIngredients(newIngredients);
  };

  const addIngredient = (food) => {
    // copy current state with slice
    const newIngredients = ingredients.slice(0);

    if (!newIngredients.includes(food)) {
      // if newIngredients doesn not include food...
      // add new ingredient to copy
      newIngredients.push(food);
      // invoke setIngredients and pass the copy as the argument
      setIngredients(newIngredients);
    }
  };
  const removeIngredient = (food) => {
    const copy = ingredients.slice();
    const i = copy.indexOf(food);
    copy.splice(i, 1);
    setIngredients(copy);
  };

  return (
    <>
      <section className="pantry_view">
        <MealQuantityProvider>
          <MealMakerForm
            setIngredients={setIngredients}
            activeUserMeals={activeUserMeals}
            addIngredient={addIngredient}
            addIngredients={addIngredients}
            ingredients={ingredients}
            removeIngredient={removeIngredient}
          />
          <FoodList addIngredient={addIngredient} />
        </MealQuantityProvider>
      </section>
    </>
  );
};
