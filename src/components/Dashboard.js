import React, { useState, useEffect } from "react";
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
import MealList from "./meals/MealList";

export default () => {
  const [activeList, setActiveList] = useState("pantry");
  const [components, setComponents] = useState();

  const showPantry = () => (
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

  const showMeals = () => (
    <MealProvider>
      <MealFoodsProvider>
        <UserMealProvider>
          <FoodProvider>
            <MealProvider>
              <MealList />
            </MealProvider>
          </FoodProvider>
        </UserMealProvider>
      </MealFoodsProvider>
    </MealProvider>
  );

  /*
        This effect hook determines which list is shown
        based on the state of the `activeList` variable.
    */
  useEffect(() => {
    if (activeList === "pantry") {
      setComponents(showPantry);
    } else if (activeList === "meals") {
      setComponents(showMeals);
    }
  }, [activeList]);
  return (
    <>
      <div className="mainContainer">
        <div className="dataContainer">
          <h2>Pantry Pal</h2>
          {/* <small>Loving care when you're not there.</small> */}
          <div className="listContainer">
            <div className="nav_buttons">
              <button
                className="nav_button"
                onClick={() => setActiveList("pantry")}
              >
                Pantry
              </button>
              <button
                className="nav_button"
                onClick={() => setActiveList("meals")}
              >
                Meals
              </button>
            </div>
            <div className="linkDisplay">{components}</div>
          </div>
        </div>
      </div>
    </>
  );
};
