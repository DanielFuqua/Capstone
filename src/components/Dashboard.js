import React from "react";
import { FoodProvider } from "./pantry/FoodProvider";
import { FoodTypeProvider } from "./pantry/FoodTypeProvider";
import { QuantityTypeProvider } from "./pantry/QuantityTypeProvider";
import "./Layout.css";
import "./PantryPal.css";
import Pantry from "./pantry/Pantry";
import { DietProvider } from "./meals/DietProvider";
import { MealTypeProvider } from "./meals/MealTypeProvider";
import { MealProvider } from "./meals/MealProvider";

export default () => {
  return (
    <FoodProvider>
      <FoodTypeProvider>
        <QuantityTypeProvider>
          <DietProvider>
            <MealTypeProvider>
              <MealProvider>
                <Pantry />
              </MealProvider>
            </MealTypeProvider>
          </DietProvider>
        </QuantityTypeProvider>
      </FoodTypeProvider>
    </FoodProvider>
  );
};
