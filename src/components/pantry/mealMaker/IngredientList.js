import React from "react";
import Ingredient from "./Ingredient";

export default ({
  addIngredient,
  ingredients,
  mealMakerTracker,
  mealTrackerObject,
  removeIngredient,
}) => {
  return (
    <>
      <div className="ingredientList">
        {ingredients.map((food) => {
          return (
            <Ingredient
              addIngredient={addIngredient}
              food={food}
              mealMakerTracker={mealMakerTracker}
              mealTrackerObject={mealTrackerObject}
              removeIngredient={removeIngredient}
            />
          );
        })}
      </div>
    </>
  );
};
