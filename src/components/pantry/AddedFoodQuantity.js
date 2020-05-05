import React, { useRef } from "react";
import "./Foods.css";

export default ({ food, addIngredient, mealMakerTracker, toggle }) => {
  const quantity = useRef();
  return (
    <form className="addedFoodQuantity">
      <fieldset>
        <div className="form-group">
          <label htmlFor="addedFoodQuantity">
            Please enter how much of the item ({food.name}) would you like to
            add:
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

          addIngredient(food);
          mealMakerTracker(food.id, chosenQuantity);
          toggle();
        }}
      >
        Add
      </button>
    </form>
  );
};
