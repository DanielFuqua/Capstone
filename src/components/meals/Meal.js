import React, { useContext, useState } from "react";
import { MealContext } from "./MealProvider";
import { MealFoodsContext } from "./MealFoodsProvider";
import { UserMealContext } from "./UserMealsProvider";

export default ({ meal, relatedFoods, relatedMealFoods, relatedUserMeals }) => {
  const { releaseMeal } = useContext(MealContext);
  const { releaseMealFoods } = useContext(MealFoodsContext);
  const { releaseUserMeal } = useContext(UserMealContext);
  const relatedUserMealsIDs = relatedUserMeals.map((rUM) => {
    return rUM.id;
  });
  const relatedMealFoodsIDs = relatedMealFoods.map((rMF) => {
    return rMF.id;
  });
  return (
    <>
      <section className="meal">
        <h3 className="meal__name">{meal.name}</h3>
        <h4>Ingredients:</h4>
        <ul className="meal__ingredients">
          {relatedFoods.map((ing) => {
            return <li>{ing.name}</li>;
          })}
        </ul>
        <h4>Nutrients:</h4>
        <ul className="meal__nutrients">
          <li>{meal.calories}</li>
          <li>{meal.protein}g</li>
          <li>{meal.fat}g</li>
          <li>{meal.carbohydrate}g</li>
          <li>{meal.sugar}g</li>
        </ul>

        <button
          onClick={() => {
            releaseMeal(meal.id);
            releaseMealFoods(relatedMealFoodsIDs);
            releaseUserMeal(relatedUserMealsIDs);
          }}
        >
          Trash
        </button>
      </section>
    </>
  );
};
