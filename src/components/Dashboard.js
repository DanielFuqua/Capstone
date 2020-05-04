import React from "react";
import { FoodProvider } from "./pantry/FoodProvider";
import { FoodTypeProvider } from "./pantry/FoodTypeProvider";
import { QuantityTypeProvider } from "./pantry/QuantityTypeProvider";
import "./Layout.css";
import "./PantryPal.css";
import Pantry from "./pantry/Pantry";

export default () => {
  return (
    <FoodProvider>
      <FoodTypeProvider>
        <QuantityTypeProvider>
          <Pantry />
        </QuantityTypeProvider>
      </FoodTypeProvider>
    </FoodProvider>
  );
};
