import React from "react";
import Ingredient from "./Ingredient";

export default ({
  addIngredient,
  ingredients,

  removeIngredient,
}) => {
  return (
    <>
      <div className="ingredientList">
        {ingredients.map((food) => {
          return (
            <Ingredient
              key={`food--${food.id}`}
              addIngredient={addIngredient}
              food={food}
              removeIngredient={removeIngredient}
            />
          );
        })}
      </div>
    </>
  );
};
