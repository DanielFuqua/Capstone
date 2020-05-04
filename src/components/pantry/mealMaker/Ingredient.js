import React from "react";

export default ({ food }) => {
  return (
    <>
      <section className="ingredient">
        <div className="ingredient__name">{food.name}</div>

        <button
        //   onClick={() => {
        //     addIngredient(food);
        //   }}
        >
          Adjust Quantity
        </button>
        <button
        //   onClick={() => {
        //     releaseFood(food.id);
        //   }}
        >
          Remove
        </button>
      </section>
    </>
  );
};
