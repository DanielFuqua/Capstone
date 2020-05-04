import React, { useState, useEffect } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const QuantityTypeContext = React.createContext();

/*
 This component establishes what data can be used.
 */
export const QuantityTypeProvider = (props) => {
  const [quantityTypes, setQuantityTypes] = useState([]);

  const getQuantityTypes = () => {
    return fetch("http://localhost:8088/quantityTypes")
      .then((res) => res.json())
      .then(setQuantityTypes);
  };

  const addQuantityType = (quantityType) => {
    return fetch("http://localhost:8088/quantityTypes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quantityType),
    }).then(getQuantityTypes);
  };

  const updateQuantityType = (quantityType) => {
    return fetch(`http://localhost:8088/quantityTypes/${quantityType.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quantityType),
    }).then(getQuantityTypes);
  };

  /*
        Load all QuantityTypes when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getQuantityTypes();
  }, []);

  useEffect(() => {
    console.log("****  QuantityType APPLICATION STATE CHANGED  ****");
  }, [quantityTypes]);

  return (
    <QuantityTypeContext.Provider
      value={{
        quantityTypes,
      }}
    >
      {props.children}
    </QuantityTypeContext.Provider>
  );
};
