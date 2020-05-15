import React, { useState, useEffect } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const UserFoodsContext = React.createContext();

/*
 This component establishes what data can be used.
 */
export const UserFoodsProvider = (props) => {
  const [userFoods, setUserFoods] = useState([]);

  const getUserFoods = () => {
    return fetch("http://localhost:8088/userFoods")
      .then((res) => res.json())
      .then(setUserFoods);
  };

  const addUserFood = (userFoods) => {
    return fetch("http://localhost:8088/userFoods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFoods),
    }).then(getUserFoods);
  };

  const updateUserFoods = (userFoods) => {
    return fetch(`http://localhost:8088/userFoods/${userFoods.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFoods),
    }).then(getUserFoods);
  };
  const releaseUserFoods = (userFoodsId) => {
    return fetch(`http://localhost:8088/userFoods/${userFoodsId}`, {
      method: "DELETE",
    }).then(getUserFoods);
  };

  /*
        Load all UserFoodss when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getUserFoods();
  }, []);

  return (
    <UserFoodsContext.Provider
      value={{
        userFoods,
        addUserFood,
      }}
    >
      {props.children}
    </UserFoodsContext.Provider>
  );
};
