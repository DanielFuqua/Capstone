import React from "react";
import Ingredient from "./Ingredient";

export default ({
  addIngredient,
  ingredients,
  selectedMealId,
  removeIngredient,
  editMode,
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
              selectedMealId={selectedMealId}
              editMode={editMode}
            />
          );
        })}
      </div>
    </>
  );
};
