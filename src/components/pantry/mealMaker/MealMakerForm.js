// import React, { useContext, useRef, useState, useEffect } from "react";
// import { DietContext } from "../../meals/DietProvider";
// import { MealTypeContext } from "../../meals/MealTypeProvider";
// import { MealContext } from "../../meals/MealProvider";
// import IngredientList from "./IngredientList";
// import { MealFoodsContext } from "../../meals/MealFoodsProvider";
// import { UserMealContext } from "../../meals/UserMealsProvider";
// import { MealQuantityContext } from "../MealQuantityProvider";
// import { FoodContext } from "../foodList/FoodProvider";

// export default ({
//   addIngredient,
//   addIngredients,
//   ingredients,
//   removeIngredient,
//   activeUserMeals,
//   setIngredients,
// }) => {
//   // ___________Getting data from providers___________
//   const { diets } = useContext(DietContext);
//   const { addMeal, getMeals, meals } = useContext(MealContext);
//   const { mealTypes } = useContext(MealTypeContext);
//   const { addUserMeal } = useContext(UserMealContext);
//   const { addMealFood, mealFoods } = useContext(MealFoodsContext);
//   const { foods } = useContext(FoodContext);
//   const { updateQuantities, quantities, setQuantities } = useContext(
//     MealQuantityContext
//   );

//   // ___________Nutrients Portion of Meal Maker___________

//   const [calories, setCalories] = useState(0);
//   const [protein, setProtein] = useState(0);
//   const [fat, setFat] = useState(0);
//   const [carbohydrate, setCarbohydrate] = useState(0);
//   const [sugar, setSugar] = useState(0);

//   useEffect(() => {
//     let totals = [];
//     ingredients.forEach((ingredient) => {
//       const cal = ingredient.calories;
//       const pro = ingredient.protein;
//       const f = ingredient.fat;
//       const carb = ingredient.carbohydrate;
//       const sug = ingredient.sugar;
//       const quantity = quantities[ingredient.id];
//       totals.push({
//         calories: cal * quantity,
//         protein: pro * quantity,
//         fat: f * quantity,
//         carbohydrate: carb * quantity,
//         sugar: sug * quantity,
//       });
//     });
//     updateMacros(totals);
//   }, [ingredients, quantities]);

//   const updateMacros = (totals) => {
//     const total = totals.reduce(
//       (acc, curr) => {
//         return {
//           calories: (curr.calories += acc.calories),
//           sugar: (curr.sugar += acc.sugar),
//           carbohydrate: (curr.carbohydrate += acc.carbohydrate),
//           protein: (curr.protein += acc.protein),
//           fat: (curr.fat += acc.fat),
//         };
//       },
//       { calories: 0, sugar: 0, carbohydrate: 0, protein: 0, fat: 0 }
//     );
//     setCalories(total.calories);
//     setSugar(total.sugar);
//     setCarbohydrate(total.carbohydrate);
//     setProtein(total.protein);
//     setFat(total.fat);
//   };

//   // ___________onClick of submit button when editMode is falsey, invoke addMeal, addMealFood, and addUserMeal___________
//   const constructNewMealObj = () => {
//     const chosenDietTypeId = parseInt(dietTypeId);
//     const chosenMealTypeId = parseInt(mealTypeId);
//     const chosenCalories = calories;
//     const chosenProtein = protein;
//     const chosenFat = fat;
//     const chosenCarbohydrate = carbohydrate;
//     const chosenSugar = sugar;

//     if (name === "") {
//       window.alert("Please name your meal");
//     } else if (chosenDietTypeId === 0) {
//       window.alert("Please select a diet type");
//     } else if (chosenMealTypeId === 0) {
//       window.alert("Please select a meal type");
//     } else {
//       addMeal({
//         name: name,
//         dietId: chosenDietTypeId,
//         MealTypeId: chosenMealTypeId,
//         calories: chosenCalories,
//         protein: chosenProtein,
//         fat: chosenFat,
//         carbohydrate: chosenCarbohydrate,
//         sugar: chosenSugar,
//         description: description,
//       })
//         .then(constructNewMealFoodsObj)
//         .then(getMeals);
//     }
//   };
//   // When we save a new meal we also want to save a new mealFood object for each ingredient in the meal.
//   const constructNewMealFoodsObj = (meal) => {
//     ingredients.map((ing) => {
//       const quantity = quantities[ing.id];
//       addMealFood({
//         foodId: ing.id,
//         mealId: meal.id,
//         quantity: quantity,
//       });
//     });
//     // When we save a new meal we also want to save a new userMeal object, incase one meal can be owned by many users later on.

//     addUserMeal({
//       userId: parseInt(localStorage.getItem("pal_id")),
//       mealId: meal.id,
//     });
//   };

//   // ___________States of Meal Maker___________
//   const [name, setName] = useState("");
//   const [dietTypeId, setDietTypeId] = useState(0);
//   const [mealTypeId, setMealTypeId] = useState(0);
//   const [description, setDescription] = useState("");

//   // ___________State of Edit Mode / Meal Dropdown___________
//   const [editMode, setEditMode] = useState(false);
//   const [selectedMealId, setSelectedMealId] = useState(0);

//   // ___________Call this when you want the meal maker to show default values___________
//   const resetMealMakerForm = () => {
//     setCalories(0);
//     setProtein(0);
//     setFat(0);
//     setCarbohydrate(0);
//     setSugar(0);
//     setName("");
//     setDietTypeId(0);
//     setMealTypeId(0);
//     setDescription("");
//     setIngredients([]);
//     setQuantities({});
//   };

//   // ___________When Edit Mode is truthy, do this...___________
//   // useEffect(() => {
//   //   if (editMode) {
//   //     const selectedMeal =
//   //       meals.find((meal) => meal.id === selectedMealId) || {};

//   //     const relatedMealFoods =
//   //       mealFoods.filter((mealFood) => mealFood.mealId === selectedMealId) ||
//   //       [];

//   //     relatedMealFoods.forEach((relMealFood) => {
//   //       updateQuantities(relMealFood.foodId, relMealFood.quantity);
//   //     });

//   //     const foodsToAdd = relatedMealFoods.map((rMF) => {
//   //       return foods.find((food) => food.id === rMF.foodId);
//   //     });

//   //     addIngredients(foodsToAdd);
//   //     setName(selectedMeal.name);
//   //     setDietTypeId(selectedMeal.dietId);
//   //     setMealTypeId(selectedMeal.MealTypeId);
//   //     setDescription(selectedMeal.description);
//   //   } else if (!editMode) {
//   //     resetMealMakerForm();
//   //   }
//   // }, [editMode]);

//   useEffect(() => {
//     if (editMode) {
//       debugger;
//       const selectedMeal =
//         meals.find((meal) => meal.id === selectedMealId) || {};

//       const relatedMealFoods =
//         mealFoods.filter((mealFood) => mealFood.mealId === selectedMealId) ||
//         [];

//       const foodsToAdd = relatedMealFoods.map((rMF) => {
//         return foods.find((food) => food.id === rMF.foodId);
//       });

//       // const editModeQuantitiesObj = {};

//       // relatedMealFoods.forEach((relMealFood) => {
//       //   editModeQuantitiesObj[relMealFood.foodId] = relMealFood.quantity;
//       //   setQuantities(editModeQuantitiesObj);
//       // });

//       // relatedMealFoods.forEach((relMealFood) => {
//       //   updateQuantities(relMealFood.foodId, relMealFood.quantity);
//       // });
//       // console.log(quantities);

//       addIngredients(foodsToAdd);
//       console.log(ingredients);

//       setName(selectedMeal.name);
//       setDietTypeId(selectedMeal.dietId);
//       setMealTypeId(selectedMeal.MealTypeId);
//       setDescription(selectedMeal.description);
//     } else {
//       //resetMealMakerForm();
//     }
//   }, [editMode]);

//   return (
//     <>
//       <article className="mealMakerView">
//         <section className="meal_dropdown">
//           <h3>Your Meals:</h3>
//           <select
//             onChange={(e) => {
//               if (e.target.value > 0) {
//                 resetMealMakerForm();

//                 setEditMode(true);
//                 setSelectedMealId(parseInt(e.target.value));
//               } else {
//                 setEditMode(false);
//               }
//             }}
//             defaultValue=""
//             name="meal_dropdown"
//             // ref={selectedMealId}
//             id="meal_dropdown"
//             className="form-control"
//           >
//             <option value="0">Your Meals...</option>
//             {activeUserMeals.map((e) => (
//               <option key={e.id} value={e.id}>
//                 {e.name}
//               </option>
//             ))}
//           </select>
//         </section>

//         <form className="mealMakerForm">
//           <h1 className="mealMakerForm__title">Meal Maker</h1>
//           <br></br>
//           {/* Display list of ingredient */}
//           <fieldset>
//             <div className="form-group">
//               <h4 htmlFor="Ingredients">Ingredients: </h4>
//               {
//                 <IngredientList
//                   addIngredient={addIngredient}
//                   ingredients={ingredients}
//                   removeIngredient={removeIngredient}
//                 />
//               }
//             </div>
//           </fieldset>

//           {/* Display Total nutrients */}
//           <fieldset>
//             <div className="form-group">
//               <h4 htmlFor="Nutriens">Total Macros: </h4>
//               <section>
//                 <div className="calories">Calories: {calories}</div>
//                 <div className="protein">Protein: {protein}g</div>
//                 <div className="fat">Fat: {fat}g</div>
//                 <div className="carbohydrate">
//                   Carbohydrate: {carbohydrate}g
//                 </div>
//                 <div className="sugar">Sugar: {sugar}g</div>
//               </section>
//             </div>
//           </fieldset>

//           {/* Give 'er a name */}
//           <fieldset>
//             <div className="form-group">
//               <label htmlFor="mealName">Name: </label>
//               <input
//                 type="text"
//                 onKeyUp={(e) => setName(e.target.value)}
//                 id="mealName"
//                 required
//                 autoFocus
//                 className="form-control"
//                 placeholder="Meal name"
//                 defaultValue={name}
//               />
//             </div>
//           </fieldset>
//           {/* Dropdown to choose Diet Type */}
//           <fieldset>
//             <div className="form-group">
//               <label htmlFor="DietType">Diet Type: </label>
//               <select
//                 onChange={(e) => setDietTypeId(e.target.value)}
//                 name="dietType"
//                 id="dietype"
//                 className="form-control"
//                 value={dietTypeId}
//               >
//                 <option value="0">choose one</option>
//                 {diets.map((e) => (
//                   <option key={e.id} value={e.id}>
//                     {e.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </fieldset>
//           {/* Dropdown to choose Meal Type */}
//           <fieldset>
//             <div className="form-group">
//               <label htmlFor="mealype">Meal Type: </label>
//               <select
//                 defaultValue=""
//                 onChange={(e) => setMealTypeId(e.target.value)}
//                 name="mealType"
//                 // ref={mealType}
//                 id="mealType"
//                 className="form-control"
//                 value={mealTypeId}
//               >
//                 <option value="0">choose one</option>
//                 {mealTypes.map((e) => (
//                   <option key={e.id} value={e.id}>
//                     {e.type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </fieldset>
//           {/* Enter in a description */}
//           <fieldset>
//             <div className="form-group">
//               <label htmlFor="description">Description: </label>
//               <textarea
//                 type="text"
//                 onKeyUp={(e) => setDescription(e.target.value)}
//                 id="description"
//                 // ref={description}
//                 required
//                 autoFocus
//                 className="form-control"
//                 placeholder="Description"
//                 defaultValue={description}
//               />
//             </div>
//           </fieldset>
//           {/* button to construct new meal object and save to meals */}
//           <button
//             type="submit"
//             onClick={(evt) => {
//               evt.preventDefault(); // Prevent browser from submitting the form
//               resetMealMakerForm();
//               constructNewMealObj();
//             }}
//             className="btn btn-primary"
//           >
//             Save Meal
//           </button>
//         </form>
//       </article>
//     </>
//   );
// };

import React, { useContext, useRef, useState, useEffect } from "react";
import { DietContext } from "../../meals/DietProvider";
import { MealTypeContext } from "../../meals/MealTypeProvider";
import { MealContext } from "../../meals/MealProvider";
import IngredientList from "./IngredientList";
import { MealFoodsContext } from "../../meals/MealFoodsProvider";
import { UserMealContext } from "../../meals/UserMealsProvider";
import { MealQuantityContext } from "../MealQuantityProvider";
import { FoodContext } from "../foodList/FoodProvider";

export default ({
  addIngredient,
  addIngredients,
  ingredients,
  removeIngredient,
  activeUserMeals,
  setIngredients,
}) => {
  // ___________Getting data from providers___________
  const { diets } = useContext(DietContext);
  const { addMeal, getMeals, meals } = useContext(MealContext);
  const { mealTypes } = useContext(MealTypeContext);
  const { addUserMeal } = useContext(UserMealContext);
  const { addMealFood, mealFoods } = useContext(MealFoodsContext);
  const { foods } = useContext(FoodContext);
  const { updateQuantities, quantities, setQuantities } = useContext(
    MealQuantityContext
  );

  // ___________Nutrients Portion of Meal Maker___________
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbohydrate, setCarbohydrate] = useState(0);
  const [sugar, setSugar] = useState(0);

  const updateMacros = (totals) => {
    const total = totals.reduce(
      (acc, curr) => {
        return {
          calories: (curr.calories += acc.calories),
          sugar: (curr.sugar += acc.sugar),
          carbohydrate: (curr.carbohydrate += acc.carbohydrate),
          protein: (curr.protein += acc.protein),
          fat: (curr.fat += acc.fat),
        };
      },
      { calories: 0, sugar: 0, carbohydrate: 0, protein: 0, fat: 0 }
    );
    setCalories(total.calories);
    setSugar(total.sugar);
    setCarbohydrate(total.carbohydrate);
    setProtein(total.protein);
    setFat(total.fat);
  };

  useEffect(() => {
    let totals = [];
    ingredients.forEach((ingredient) => {
      const cal = ingredient.calories;
      const pro = ingredient.protein;
      const f = ingredient.fat;
      const carb = ingredient.carbohydrate;
      const sug = ingredient.sugar;
      const quantity = quantities[ingredient.id];
      totals.push({
        calories: cal * quantity,
        protein: pro * quantity,
        fat: f * quantity,
        carbohydrate: carb * quantity,
        sugar: sug * quantity,
      });
    });
    updateMacros(totals);
  }, [ingredients, quantities]);

  // ___________Invoke addMeal, addMealFood, and addUserMeal___________
  const editNewMealObj = () => {
    // Find this meal by it's id
    // Update meal attributes (description, name etc)
    // Update meals foods quantities
  };

  const constructNewMealObj = () => {
    const chosenDietTypeId = parseInt(dietTypeId);
    const chosenMealTypeId = parseInt(mealTypeId);
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
        name: name,
        dietId: chosenDietTypeId,
        MealTypeId: chosenMealTypeId,
        calories: chosenCalories,
        protein: chosenProtein,
        fat: chosenFat,
        carbohydrate: chosenCarbohydrate,
        sugar: chosenSugar,
        description: description,
      })
        .then(constructNewMealFoodsObj)
        .then(getMeals);
      // figure out also how to reset form back to default
    }
  };
  // When we save a new meal we also want to save a new mealFood object for each ingredient in the meal.
  const constructNewMealFoodsObj = (meal) => {
    ingredients.map((ing) => {
      const quantity = quantities[ing.id];
      // This MealFoodObject is going to need the ID of the meal we just saved above...
      addMealFood({
        foodId: ing.id,
        mealId: meal.id,
        quantity: quantity,
      });
    });
    // When we save a new meal we also want to save a new userMeal object, incase one meal can be owned by many users later on.

    addUserMeal({
      userId: parseInt(localStorage.getItem("pal_id")),
      mealId: meal.id,
    });
  };

  // ___________States of Meal Maker___________
  const [name, setName] = useState("");
  const [dietTypeId, setDietTypeId] = useState(0);
  const [mealTypeId, setMealTypeId] = useState(0);
  const [description, setDescription] = useState("");

  // ___________State of Edit Mode / Meal Dropdown___________
  const [editMode, setEditMode] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(0);

  // ___________Call this when you want the meal maker to show default values___________
  const resetMealMakerForm = () => {
    setCalories(0);
    setProtein(0);
    setFat(0);
    setCarbohydrate(0);
    setSugar(0);
    setName("");
    setDietTypeId(0);
    setMealTypeId(0);
    setDescription("");
    setIngredients([]);
    setQuantities({});
  };

  // ___________When Edit Mode is truthy, do this...___________

  useEffect(() => {
    if (editMode) {
      const selectedMeal =
        meals.find((meal) => meal.id === selectedMealId) || {};

      const relatedMealFoods =
        mealFoods.filter((mealFood) => mealFood.mealId === selectedMealId) ||
        [];

      relatedMealFoods.forEach((relMealFood) => {
        updateQuantities(relMealFood.foodId, relMealFood.quantity);
      });

      const foodsToAdd = relatedMealFoods.map((rMF) => {
        return foods.find((food) => food.id === rMF.foodId);
      });

      addIngredients(foodsToAdd);
      setName(selectedMeal.name);
      setDietTypeId(selectedMeal.dietId);
      setMealTypeId(selectedMeal.MealTypeId);
      setDescription(selectedMeal.description);
    } else if (!editMode) {
      resetMealMakerForm();
    }
  }, [editMode]);

  return (
    <>
      <article className="mealMakerView">
        <section className="meal_dropdown">
          <h3>Your Meals:</h3>
          <select
            onChange={(e) => {
              if (e.target.value > 0) {
                setIngredients([]);
                setEditMode(true);
                setSelectedMealId(parseInt(e.target.value));
              } else {
                setIngredients([]);
                setEditMode(false);
              }
            }}
            defaultValue=""
            name="meal_dropdown"
            // ref={selectedMealId}
            id="meal_dropdown"
            className="form-control"
          >
            <option default>Your Meals...</option>
            {activeUserMeals.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </section>

        <form className="mealMakerForm">
          <h1 className="mealMakerForm__title">Meal Maker</h1>
          <br></br>
          {/* Display list of ingredient */}
          <fieldset>
            <div className="form-group">
              <h4 htmlFor="Ingredients">Ingredients: </h4>
              {
                <IngredientList
                  addIngredient={addIngredient}
                  ingredients={ingredients}
                  removeIngredient={removeIngredient}
                />
              }
            </div>
          </fieldset>

          {/* Display Total nutrients */}
          <fieldset>
            <div className="form-group">
              <h4 htmlFor="Nutriens">Total Macros: </h4>
              <section>
                <div className="calories">Calories: {calories}</div>
                <div className="protein">Protein: {protein}g</div>
                <div className="fat">Fat: {fat}g</div>
                <div className="carbohydrate">
                  Carbohydrate: {carbohydrate}g
                </div>
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
                onKeyUp={(e) => setName(e.target.value)}
                id="mealName"
                required
                autoFocus
                className="form-control"
                placeholder="Meal name"
                defaultValue={name}
              />
            </div>
          </fieldset>
          {/* Dropdown to choose Diet Type */}
          <fieldset>
            <div className="form-group">
              <label htmlFor="DietType">Diet Type: </label>
              <select
                onChange={(e) => setDietTypeId(e.target.value)}
                name="dietType"
                id="dietype"
                className="form-control"
                value={dietTypeId}
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
                onChange={(e) => setMealTypeId(e.target.value)}
                name="mealType"
                // ref={mealType}
                id="mealType"
                className="form-control"
                value={mealTypeId}
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
                onKeyUp={(e) => setDescription(e.target.value)}
                id="description"
                // ref={description}
                required
                autoFocus
                className="form-control"
                placeholder="Description"
                defaultValue={description}
              />
            </div>
          </fieldset>
          {/* button to construct new meal object and save to meals */}
          <button
            type="submit"
            onClick={(evt) => {
              evt.preventDefault(); // Prevent browser from submitting the form
              if (editMode) {
                editNewMealObj();
              } else {
                resetMealMakerForm();
                constructNewMealObj();
              }
            }}
            className="btn btn-primary"
          >
            Save Meal
          </button>
        </form>
      </article>
    </>
  );
};
