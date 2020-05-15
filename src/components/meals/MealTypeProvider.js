import React, { useState, useEffect } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const MealTypeContext = React.createContext();

/*
 This component establishes what data can be used.
 */
export const MealTypeProvider = (props) => {
  const [mealTypes, setMealTypes] = useState([]);

  const getMealTypes = () => {
    return fetch("http://localhost:8088/mealTypes")
      .then((res) => res.json())
      .then(setMealTypes);
  };

  const addMealType = (mealType) => {
    return fetch("http://localhost:8088/mealTypes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mealType),
    }).then(getMealTypes);
  };

  const updateMealType = (mealType) => {
    return fetch(`http://localhost:8088/mealTypes/${mealType.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mealType),
    }).then(getMealTypes);
  };
  const releaseMealType = (mealTypeId) => {
    return fetch(`http://localhost:8088/mealTypes/${mealTypeId}`, {
      method: "DELETE",
    }).then(getMealTypes);
  };

  /*
        Load all MealTypes when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getMealTypes();
  }, []);

  return (
    <MealTypeContext.Provider
      value={{
        mealTypes,
      }}
    >
      {props.children}
    </MealTypeContext.Provider>
  );
};
