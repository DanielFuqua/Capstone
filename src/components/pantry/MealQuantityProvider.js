// import React, { useState, useEffect } from "react";

// export const MealQuantityContext = React.createContext();

// export const MealQuantityProvider = (props) => {
//   const [quantities, setQuantities] = useState({});
//   debugger;
//   const updateQuantities = (foodId, quantity) => {
//     const copy = Object.assign({}, { ...quantities }, { [foodId]: quantity });
//     setQuantities(copy);
//   };

//   useEffect(() => {
//     console.log("quantity state changed");
//     console.log(quantities);
//   }, [quantities]);

//   return (
//     <MealQuantityContext.Provider
//       value={{ quantities, updateQuantities, setQuantities }}
//     >
//       {props.children}
//     </MealQuantityContext.Provider>
//   );
// };

import React, { useState, useEffect, useRef } from "react";

export const MealQuantityContext = React.createContext();

export const MealQuantityProvider = (props) => {
  const [quantities, setQuantities] = useState({});

  const stuff = useRef(null);

  const updateQuantities = (foodId, quantity) => {
    stuff.current = { ...stuff.current, [foodId]: quantity };
    setQuantities(stuff.current);
  };

  useEffect(() => {
    setQuantities(quantities);
  }, [quantities]);

  return (
    <MealQuantityContext.Provider
      value={{ quantities, updateQuantities, setQuantities }}
    >
      {props.children}
    </MealQuantityContext.Provider>
  );
};

// import React, { useState, useEffect, useRef } from "react";

// export const MealQuantityContext = React.createContext();

// export const MealQuantityProvider = (props) => {
//   const [quantities, setQuantities] = useState({});

//   const stuff = useRef(null);

//   const updateQuantities = (foodId, quantity) => {
//     stuff.current = { ...stuff.current, [foodId]: quantity };
//     setQuantities(stuff.current);
//   };

//   useEffect(() => {
//     setQuantities(quantities);
//   }, [quantities]);

//   return (
//     <MealQuantityContext.Provider
//       value={{ quantities, updateQuantities, setQuantities }}
//     >
//             {props.children}
//
//     </MealQuantityContext.Provider>
//   );
// };
