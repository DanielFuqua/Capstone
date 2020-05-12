import React, { useContext, useState } from "react";
import { MealFoodsContext } from "./MealFoodsProvider";
import { MealContext } from "./MealProvider";
import { UserMealContext } from "./UserMealsProvider";
import { FoodContext } from "../pantry/foodList/FoodProvider";
import Meal from "./Meal";
import "./Meals.css";

export default () => {
  const { foods } = useContext(FoodContext);
  const { mealFoods } = useContext(MealFoodsContext);
  const { meals } = useContext(MealContext);
  const { userMeals } = useContext(UserMealContext);
  const relatedUserMeals = userMeals.filter(
    (uM) => uM.userId === parseInt(localStorage.getItem("pal_id"))
  );
  const relatedMeals = relatedUserMeals.map((rUM) => {
    return meals.find((meal) => meal.id === rUM.mealId) || {};
  });
  console.log(relatedUserMeals);
  console.log(relatedMeals);
  return (
    <>
      <section className="meals_container">
        <h1>Meals</h1>

        <ul className="meals">
          {relatedMeals.map((meal) => {
            const relatedMealFoods = mealFoods.filter(
              (mealFood) => mealFood.mealId === meal.id
            );
            // const relatedFoodQuantity =
            const relatedFoods = relatedMealFoods.map((rMF) => {
              return foods.find((food) => food.id === rMF.foodId) || {};
            });

            return (
              <Meal
                key={meal.id}
                meal={meal}
                relatedMealFoods={relatedMealFoods}
                relatedFoods={relatedFoods}
                relatedUserMeals={relatedUserMeals}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
};
