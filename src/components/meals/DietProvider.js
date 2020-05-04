import React, { useState, useEffect } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const DietContext = React.createContext();

/*
 This component establishes what data can be used.
 */
export const DietProvider = (props) => {
  const [diets, setDiets] = useState([]);

  const getDiets = () => {
    return fetch("http://localhost:8088/diets")
      .then((res) => res.json())
      .then(setDiets);
  };

  const addDiet = (diet) => {
    return fetch("http://localhost:8088/diets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diet),
    }).then(getDiets);
  };

  const updateDiet = (diet) => {
    return fetch(`http://localhost:8088/diets/${diet.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diet),
    }).then(getDiets);
  };
  const releaseDiet = (dietId) => {
    return fetch(`http://localhost:8088/diets/${dietId}`, {
      method: "DELETE",
    }).then(getDiets);
  };

  /*
        Load all Diets when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getDiets();
  }, []);

  useEffect(() => {
    console.log("****  Diet APPLICATION STATE CHANGED  ****");
  }, [diets]);

  return (
    <DietContext.Provider
      value={{
        diets,
      }}
    >
      {props.children}
    </DietContext.Provider>
  );
};
