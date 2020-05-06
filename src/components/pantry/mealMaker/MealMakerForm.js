import React, { useContext, useRef, useState, useEffect } from "react";
import { FoodContext } from "../foodList/FoodProvider";
import { DietContext } from "../../meals/DietProvider";
import { MealTypeContext } from "../../meals/MealTypeProvider";
import { MealContext } from "../../meals/MealProvider";
import IngredientList from "./IngredientList";
import { MealFoodsContext } from "../../meals/MealFoodsProvider";

export default ({
  addIngredient,
  ingredients,
  mealTrackerObject,
  mealMakerTracker,
}) => {
  const { foods } = useContext(FoodContext);
  const { diets } = useContext(DietContext);
  const { mealTypes } = useContext(MealTypeContext);
  const { addMeal } = useContext(MealContext);
  const { addMealFood } = useContext(MealFoodsContext);
  const { getMeals } = useContext(MealContext);

  const [calories, setCalories] = useState(0);
  const addCalories = (cal, ing) => {
    const quantity = mealTrackerObject[ing.id];
    const newCalories = calories + cal * quantity;
    setCalories(newCalories);
  };

  const [protein, setProtein] = useState(0);
  const addProtein = (pro, ing) => {
    const quantity = mealTrackerObject[ing.id];
    const newProtein = protein + pro * quantity;
    setProtein(newProtein);
  };

  const [fat, setFat] = useState(0);
  const addFat = (f, ing) => {
    const quantity = mealTrackerObject[ing.id];
    const newFat = fat + f * quantity;
    setFat(newFat);
  };

  const [carbohydrate, setCarbohydrate] = useState(0);
  const addCarbs = (carb, ing) => {
    const quantity = mealTrackerObject[ing.id];
    const newCarbs = carbohydrate + carb * quantity;
    setCarbohydrate(newCarbs);
  };

  const [sugar, setSugar] = useState(0);
  const addSugar = (sug, ing) => {
    const quantity = mealTrackerObject[ing.id];
    const newSugar = sugar + sug * quantity;
    setSugar(newSugar);
  };

  useEffect(() => {
    ingredients.map((ingredient) => {
      const cal = ingredient.calories;
      const pro = ingredient.protein;
      const f = ingredient.fat;
      const carb = ingredient.carbohydrate;
      const sug = ingredient.sugar;
      addCalories(cal, ingredient);
      addProtein(pro, ingredient);
      addFat(f, ingredient);
      addCarbs(carb, ingredient);
      addSugar(sug, ingredient);
    });
  }, [ingredients]);

  const name = useRef();
  const dietType = useRef();
  const mealType = useRef();
  const description = useRef();

  const constructNewMealObj = () => {
    const chosenDietTypeId = parseInt(dietType.current.value);
    const chosenMealTypeId = parseInt(mealType.current.value);
    const chosenCalories = calories;
    const chosenProtein = protein;
    const chosenFat = fat;
    const chosenCarbohydrate = carbohydrate;
    const chosenSugar = sugar;

    if (name === "") {
      window.alert("Please name your meal");
    } else if (chosenDietTypeId === 0) {
      window.alert("Please select a diet type");
    } else if (chosenMealTypeId === 0) {
      window.alert("Please select a meal type");
    } else {
      addMeal({
        name: name.current.value,
        userId: parseInt(localStorage.getItem("pal_id")),
        dietId: chosenDietTypeId,
        MealTypeId: chosenMealTypeId,
        calories: chosenCalories,
        protein: chosenProtein,
        fat: chosenFat,
        carbohydrate: chosenCarbohydrate,
        sugar: chosenSugar,
        description: description.current.value,
      })
        .then(constructNewMealFoodsObj)
        .then(getMeals);
      // figure out also how to reset form back to default
    }
  };
  const constructNewMealFoodsObj = (meal) => {
    ingredients.map((ing) => {
      const quantity = mealTrackerObject[ing.id];
      // This MealFoodObject is going to need the ID of the meal we just saved above...
      addMealFood({
        foodId: ing.id,
        mealId: meal.id,
        quantity: quantity,
      });
    });
  };

  return (
    <form className="mealMakerForm">
      <h2 className="mealMakerForm__title">Meal Maker</h2>
      <br></br>
      {/* Display list of ingredient */}
      <fieldset>
        <div className="form-group">
          <h4 htmlFor="Ingredients">Ingredients: </h4>
          {
            <IngredientList
              addIngredient={addIngredient}
              ingredients={ingredients}
              mealMakerTracker={mealMakerTracker}
              mealTrackerObject={mealTrackerObject}
            />
          }
        </div>
      </fieldset>

      {/* Display Total nutrients */}
      <fieldset>
        <div className="form-group">
          <h4 htmlFor="Nutriens">Total Nutrients: </h4>
          <section>
            <div className="calories">Calories: {calories}</div>
            <div className="protein">Protein: {protein}g</div>
            <div className="fat">Fat: {fat}g</div>
            <div className="carbohydrate">Carbohydrate: {carbohydrate}g</div>
            <div className="sugar">Sugar: {sugar}g</div>
          </section>
        </div>
      </fieldset>

      {/* Give 'er a name */}
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
      {/* Dropdown to choose Diet Type */}
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
      {/* Dropdown to choose Meal Type */}
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
      {/* Enter in a description */}
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <textarea
            type="text"
            id="description"
            ref={description}
            required
            autoFocus
            className="form-control"
            placeholder="Description"
          />
        </div>
      </fieldset>
      {/* button to construct new meal object and save to meals */}
      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault(); // Prevent browser from submitting the form
          constructNewMealObj();
        }}
        className="btn btn-primary"
      >
        Save Meal
      </button>
    </form>
  );
};
