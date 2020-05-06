import React, { useState, useEffect } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const FoodContext = React.createContext();

/*
 This component establishes what data can be used.
 */
export const FoodProvider = (props) => {
  const [foods, setFoods] = useState([]);

  const getFoods = () => {
    return fetch("http://localhost:8088/foods")
      .then((res) => res.json())
      .then(setFoods);
  };

  const addFood = (food) => {
    return fetch("http://localhost:8088/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food),
    }).then(getFoods);
  };

  const updateFood = (food) => {
    return fetch(`http://localhost:8088/foods/${food.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food),
    }).then(getFoods);
  };
  const releaseFood = (foodId) => {
    return fetch(`http://localhost:8088/foods/${foodId}`, {
      method: "DELETE",
    }).then(getFoods);
  };

  /*
        Load all Foods when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getFoods();
  }, []);

  useEffect(() => {
    console.log("****  Food APPLICATION STATE CHANGED  ****");
  }, [foods]);

  return (
    <FoodContext.Provider
      value={{
        foods,
        addFood,
        releaseFood,
      }}
    >
      {props.children}
    </FoodContext.Provider>
  );
};
