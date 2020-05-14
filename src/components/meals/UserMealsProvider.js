import React, { useState, useEffect } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const UserMealContext = React.createContext();

/*
 This component establishes what data can be used.
 */
export const UserMealProvider = (props) => {
  const [userMeals, setUserMeals] = useState([]);

  const getUserMeals = () => {
    return fetch("http://localhost:8088/userMeals")
      .then((res) => res.json())
      .then(setUserMeals);
  };

  const addUserMeal = (userMeal) => {
    return fetch("http://localhost:8088/userMeals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userMeal),
    }).then((res) => res.json());
  };

  const updateUserMeal = (userMeal) => {
    return fetch(`http://localhost:8088/userMeals/${userMeal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userMeal),
    }).then(getUserMeals);
  };
  const releaseUserMeal = (userMealId) => {
    return fetch(`http://localhost:8088/userMeals/${userMealId}`, {
      method: "DELETE",
    }).then(getUserMeals);
  };

  /*
        Load all UserMeals when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getUserMeals();
  }, []);

  return (
    <UserMealContext.Provider
      value={{
        userMeals,
        addUserMeal,
        getUserMeals,
        releaseUserMeal,
      }}
    >
      {props.children}
    </UserMealContext.Provider>
  );
};
