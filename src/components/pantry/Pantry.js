import React, { useState } from "react";
import FoodList from "./pantry/FoodList";
import { FoodProvider } from "./pantry/FoodProvider";
import { FoodTypeProvider } from "./pantry/FoodTypeProvider";
import { QuantityTypeProvider } from "./pantry/QuantityTypeProvider";
import "./Layout.css";
import "./PantryPal.css";
import MealMakerForm from "./MealMakerForm";

export default () => {
  const [ingredients, setIngredients] = useState([]);
  const addIngredient = (food) => {
    // copy current state with slice
    const newIngredients = ingredients.slice();
    // add new ingredient to copy
    newIngredients
      .push(food)
      // invoke setIngredients and pass the copy as the argument
      .then(setIngredients(newIngredients));
  };

  return (
    <FoodProvider>
      <FoodTypeProvider>
        <QuantityTypeProvider>
          <FoodList addIngredient={addIngredient} />
          <MealMakerForm ingredients={ingredients} />
        </QuantityTypeProvider>
      </FoodTypeProvider>
    </FoodProvider>
  );
};
