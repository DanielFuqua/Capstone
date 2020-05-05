import React, { useState, useEffect } from "react";
import FoodList from "./FoodList";
import "../Layout.css";
import "../PantryPal.css";
import MealMakerForm from "./mealMaker/MealMakerForm";

export default () => {
  const [ingredients, setIngredients] = useState([]);
  const addIngredient = (food) => {
    // copy current state with slice
    const newIngredients = ingredients.slice();
    // add new ingredient to copy
    newIngredients.push(food);
    // invoke setIngredients and pass the copy as the argument
    setIngredients(newIngredients);
  };

  const [mealTrackerObject, setMealTrackerObject] = useState({});
  const mealMakerTracker = (foodId, quantity) => {
    // copy the existing state with object.assign
    // on new obj add a new id which is foodId and its value is quantity
    const copy = Object.assign(mealTrackerObject, { [foodId]: quantity });
    // then envoke setMealTrackerObject passing this new object as the argument
    setMealTrackerObject(copy);
  };

  return (
    <>
      <FoodList
        addIngredient={addIngredient}
        mealMakerTracker={mealMakerTracker}
      />
      <MealMakerForm
        mealTrackerObject={mealTrackerObject}
        mealMakerTracker={mealMakerTracker}
        addIngredient={addIngredient}
        ingredients={ingredients}
      />
    </>
  );
};
