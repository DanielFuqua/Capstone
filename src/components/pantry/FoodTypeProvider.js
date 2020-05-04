import React, { useState, useEffect } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const FoodTypeContext = React.createContext();

/*
 This component establishes what data can be used.
 */
export const FoodTypeProvider = (props) => {
  const [foodTypes, setFoodTypes] = useState([]);

  const getFoodTypes = () => {
    return fetch("http://localhost:8088/foodTypes")
      .then((res) => res.json())
      .then(setFoodTypes);
  };

  const addFoodType = (foodType) => {
    return fetch("http://localhost:8088/foodTypes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodType),
    }).then(getFoodTypes);
  };

  const updateFoodType = (foodType) => {
    return fetch(`http://localhost:8088/foodTypes/${foodType.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodType),
    }).then(getFoodTypes);
  };

  /*
        Load all FoodTypes when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getFoodTypes();
  }, []);

  useEffect(() => {
    console.log("****  FoodType APPLICATION STATE CHANGED  ****");
  }, [foodTypes]);

  return (
    <FoodTypeContext.Provider
      value={{
        foodTypes,
      }}
    >
      {props.children}
    </FoodTypeContext.Provider>
  );
};
