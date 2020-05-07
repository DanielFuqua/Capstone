import React from "react";
import { FoodProvider } from "./pantry/foodList/FoodProvider";
import { FoodTypeProvider } from "./pantry/foodList/FoodTypeProvider";
import { QuantityTypeProvider } from "./pantry/QuantityTypeProvider";
import "./Layout.css";
import "./PantryPal.css";
import Pantry from "./pantry/Pantry";
import { DietProvider } from "./meals/DietProvider";
import { MealTypeProvider } from "./meals/MealTypeProvider";
import { MealProvider } from "./meals/MealProvider";
import { MealFoodsProvider } from "./meals/MealFoodsProvider";
import { UserMealProvider } from "./meals/UserMealsProvider";
import { UserFoodsProvider } from "./pantry/foodList/UserFoodsProvider";

export default () => {
  return (
    <UserFoodsProvider>
      <FoodProvider>
        <FoodTypeProvider>
          <QuantityTypeProvider>
            <DietProvider>
              <MealFoodsProvider>
                <MealTypeProvider>
                  <MealProvider>
                    <UserMealProvider>
                      <Pantry />
                    </UserMealProvider>
                  </MealProvider>
                </MealTypeProvider>
              </MealFoodsProvider>
            </DietProvider>
          </QuantityTypeProvider>
        </FoodTypeProvider>
      </FoodProvider>
    </UserFoodsProvider>
  );
};
