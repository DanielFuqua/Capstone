import React from "react";
import Ingredient from "./Ingredient";

export default ({
  addIngredient,
  ingredients,
  addIngredientQuantity,
  ingredientQuantity,
  mealTrackerObject,
}) => {
  return (
    <>
      <div className="ingredientList">
        {ingredients.map((food) => {
          // need to find primary key on mealTrackerObj and get quantity user tyoed in
          const quantity = mealTrackerObject[food.id];
          return (
            <Ingredient
              addIngredient={addIngredient}
              food={food}
              addIngredientQuantity={addIngredientQuantity}
              ingredientQuantity={ingredientQuantity}
              quantity={quantity}
            />
          );
        })}
      </div>
    </>
  );
};
