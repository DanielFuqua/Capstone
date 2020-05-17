import React, { useState, useEffect } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const MealFoodsContext = React.createContext();

/*
 This component establishes what data can be used.
 */
export const MealFoodsProvider = (props) => {
  const [mealFoods, setMealFoods] = useState([]);

  const getMealFoods = () => {
    return fetch("http://localhost:8088/mealFoods")
      .then((res) => res.json())
      .then(setMealFoods);
  };

  const addMealFood = (mealFoods) => {
    return fetch("http://localhost:8088/mealFoods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mealFoods),
    }).then(getMealFoods);
  };

  const updateMealFoods = (mealFoods) => {
    console.log(mealFoods);
    return fetch(`http://localhost:8088/mealFoods/${mealFoods.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mealFoods),
    }).then(getMealFoods);
  };
  const releaseMealFoods = (mealFoodsId) => {
    return fetch(`http://localhost:8088/mealFoods/${mealFoodsId}`, {
      method: "DELETE",
    }).then(getMealFoods);
  };

  /*
        Load all MealFoodss when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getMealFoods();
  }, []);

  return (
    <MealFoodsContext.Provider
      value={{
        mealFoods,
        addMealFood,
        releaseMealFoods,
        updateMealFoods,
      }}
    >
      {props.children}
    </MealFoodsContext.Provider>
  );
};
