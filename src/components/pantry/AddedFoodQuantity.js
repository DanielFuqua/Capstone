import React, { useRef, useContext } from "react";
import { MealQuantityContext } from "./MealQuantityProvider";
import "./Pantry.css";

export default ({ food, addIngredient, toggle }) => {
  const { updateQuantities } = useContext(MealQuantityContext);
  const quantity = useRef();

  return (
    <form className="addedFoodQuantity">
      <fieldset>
        <div className="form-group">
          <label htmlFor="addedFoodQuantity">
            Please enter how much of the item ({food.name}) you would like in
            this meal:
          </label>
          <input
            type="text"
            id="addedFoodQuantity"
            ref={quantity}
            required
            autoFocus
            className="form-control"
            placeholder="AddedFoodQuantity"
          />
        </div>
      </fieldset>
      <button
        onClick={(e) => {
          e.preventDefault();
          const chosenQuantity = parseInt(quantity.current.value);
          if (chosenQuantity >= 1) {
            addIngredient(food);
            updateQuantities(food.id, chosenQuantity);
            toggle();
          } else {
            window.alert("Please enter a valid quantity");
          }
        }}
      >
        Add
      </button>
    </form>
  );
};

// import React, { useRef, useContext } from "react";
// import { MealQuantityContext } from "./MealQuantityProvider";
// import "./Pantry.css";

// export default ({ food, addIngredient, toggle }) => {
//   const { updateQuantities } = useContext(MealQuantityContext);
//   const quantity = useRef();

//   return (
//     <form className="addedFoodQuantity">
//       <fieldset>
//         <div className="form-group">
//           <label htmlFor="addedFoodQuantity">
//             Please enter how much of the item ({food.name}) you would like in
//             this meal:
//           </label>
//           <input
//             type="text"
//             id="addedFoodQuantity"
//             ref={quantity}
//             required
//             autoFocus
//             className="form-control"
//             placeholder="AddedFoodQuantity"
//           />
//         </div>
//       </fieldset>
//       <button
//         onClick={(e) => {
//           e.preventDefault();
//           const chosenQuantity = parseInt(quantity.current.value);
//           if (chosenQuantity >= 1) {
//             addIngredient(food);
//             updateQuantities(food.id, chosenQuantity);
//             toggle();
//           } else {
//             window.alert("Please enter a valid quantity");
//           }
//         }}
//       >
//         Add
//       </button>
//     </form>
//   );
// };
