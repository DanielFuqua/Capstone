import React, { useContext, useRef, useState } from "react";
import "./Foods.css";
import { FoodContext } from "./FoodProvider";
import { DietContext } from "../meals/DietProvider";
import { MealTypeContext } from "../meals/MealTypeProvider";
import { MealContext } from "../meals/MealProvider";

export default ({ ingredients }) => {
  const { foods } = useContext(FoodContext);
  const { diets } = useContext(DietContext);
  const { mealTypes } = useContext(MealTypeContext);
  const { addMeal } = useContext(MealContext);

  const name = useRef();
  const dietType = useRef();
  const mealType = useRef();
  const description = useRef();
  const calories = useRef();
  const protein = useRef();
  const fat = useRef();
  const carbohydrate = useRef();
  const sugar = useRef();

  const constructNewMealObj = () => {
    const chosenDietTypeId = parseInt(dietType.current.value);
    const chosenMealTypeId = parseInt(mealType.current.value);
    const totalCalories = parseInt(calories.current.value);
    const totalProtein = parseInt(protein.current.value);
    const totalFat = parseInt(fat.current.value);
    const totalCarbohydrate = parseInt(carbohydrate.current.value);
    const totalSugar = parseInt(sugar.current.value);

    if (quantity === 0) {
      window.alert("Please enter a quantity");
    } else if (quantityType === 0) {
      window.alert("Please select a quantity type");
    } else if (foodType === 0) {
      window.alert("Please select a food type");
    } else {
      addMeal({
        name: name.current.value,
        userId: parseInt(localStorage.getItem("pal_id")),
        dietId: chosenDietTypeId,
        MealTypeId: chosenMealTypeId,
        foodTypeId: chosenFoodTypeId,
        calories: totalCalories,
        protein: totalProtein,
        fat: totalFat,
        carbohydrate: totalCarbohydrate,
        sugar: totalSugar,
        description: description,
      }).then(window.alert("You have successfully created a new meal!"));
      // figure out also how to reset form back to default
    }
  };

  return (
    <form className="mealMakerForm">
      <h2 className="mealMakerForm__title">Meal Maker</h2>
      <fieldset>
        <div className="form-group"></div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="mealName">Name: </label>
          <input
            type="text"
            id="mealName"
            ref={name}
            required
            autoFocus
            className="form-control"
            placeholder="Meal name"
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
          <label htmlFor="DietType">Diet Type: </label>
          <select
            defaultValue=""
            name="dietType"
            ref={dietType}
            id="dietype"
            className="form-control"
          >
            <option value="0">choose one</option>
            {diets.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="mealype">Meal Type: </label>
          <select
            defaultValue=""
            name="mealType"
            ref={mealType}
            id="mealType"
            className="form-control"
          >
            <option value="0">choose one</option>
            {mealTypes.map((e) => (
              <option key={e.id} value={e.id}>
                {e.type}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault(); // Prevent browser from submitting the form
          constructNewMealObj();
        }}
        className="btn btn-primary"
      >
        Shelve It
      </button>
    </form>
  );
};
