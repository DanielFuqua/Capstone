import React, { useContext, useRef } from "react";
import "../Pantry.css";
import { FoodContext } from "./FoodProvider";
import { FoodTypeContext } from "./FoodTypeProvider";
import { QuantityTypeContext } from "../QuantityTypeProvider";
import { UserFoodsContext } from "./UserFoodsProvider";

export default (props) => {
  const { addFood, getFoods } = useContext(FoodContext);
  const { foodTypes } = useContext(FoodTypeContext);
  const { quantityTypes } = useContext(QuantityTypeContext);
  const { addUserFood } = useContext(UserFoodsContext);
  const name = useRef();
  const quantity = useRef();
  const quantityType = useRef();
  const foodType = useRef();
  const calories = useRef();
  const protein = useRef();
  const fat = useRef();
  const carbohydrate = useRef();
  const sugar = useRef();

  const constructNewFoodObj = () => {
    const chosenQuantity = parseInt(quantity.current.value);
    const chosenCalories = parseInt(calories.current.value);
    const chosenProtein = parseInt(protein.current.value);
    const chosenFat = parseInt(fat.current.value);
    const chosenCarbohydrate = parseInt(carbohydrate.current.value);
    const chosenSugar = parseInt(sugar.current.value);
    const chosenQuantityTypeId = parseInt(quantityType.current.value);
    const chosenFoodTypeId = parseInt(foodType.current.value);

    if (quantity === 0) {
      window.alert("Please enter a quantity");
    } else if (quantityType === 0) {
      window.alert("Please select a quantity type");
    } else if (foodType === 0) {
      window.alert("Please select a food type");
    } else {
      addFood({
        name: name.current.value,
        quantity: chosenQuantity,
        quantityTypeId: chosenQuantityTypeId,
        foodTypeId: chosenFoodTypeId,
        calories: chosenCalories,
        protein: chosenProtein,
        fat: chosenFat,
        carbohydrate: chosenCarbohydrate,
        sugar: chosenSugar,
      })
        .then(constructNewUserFoodObj)
        .then(getFoods)
        .then(props.toggler);
    }
  };

  const constructNewUserFoodObj = (food) => {
    addUserFood({
      userId: parseInt(localStorage.getItem("pal_id")),
      foodId: food.id,
    });
  };

  return (
    <form className="addFoodForm">
      <h2 className="addFoodForm__title">Add Food To Pantry</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="foodName">Name: </label>
          <input
            type="text"
            id="foodName"
            ref={name}
            required
            autoFocus
            className="form-control"
            placeholder="Food name"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="foodQuantity">Quantity: </label>
          <input
            type="text"
            id="foodQuantity"
            ref={quantity}
            required
            autoFocus
            className="form-control"
            placeholder="Food quantity"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="quantityType">Quantity Type: </label>
          <select
            defaultValue=""
            name="foodQuantityType"
            ref={quantityType}
            id="foodQuantityType"
            className="form-control"
          >
            <option value="0">Cup, tbsp, ounce, etc...</option>
            {quantityTypes.map((e) => (
              <option key={e.id} value={e.id}>
                {e.type}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="foodType">Food Type: </label>
          <select
            defaultValue=""
            name="foodType"
            ref={foodType}
            id="foodType"
            className="form-control"
          >
            <option value="0">choose one</option>
            {foodTypes.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="calories">Calories: </label>
          <input
            type="text"
            id="calories"
            ref={calories}
            required
            autoFocus
            className="form-control"
            placeholder="calories"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="protein">Protein: </label>
          <input
            type="text"
            id="protein"
            ref={protein}
            required
            autoFocus
            className="form-control"
            placeholder="protein"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="fat">Fat: </label>
          <input
            type="text"
            id="fat"
            ref={fat}
            required
            autoFocus
            className="form-control"
            placeholder="fat"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="carbohydrate">Carbohydrate: </label>
          <input
            type="text"
            id="carbohydrate"
            ref={carbohydrate}
            required
            autoFocus
            className="form-control"
            placeholder="carbohydrate"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="sugar">Sugar: </label>
          <input
            type="text"
            id="sugar"
            ref={sugar}
            required
            autoFocus
            className="form-control"
            placeholder="sugar"
          />
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault(); // Prevent browser from submitting the form
          constructNewFoodObj();
        }}
        className="btn btn-primary"
      >
        Shelve It
      </button>
    </form>
  );
};
