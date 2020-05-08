import React, { useState, useEffect } from "react";
import FoodList from "./foodList/FoodList";
import "../Layout.css";
import "../PantryPal.css";
import MealMakerForm from "./mealMaker/MealMakerForm";
import { MealQuantityProvider } from "./MealQuantityProvider";


export default () => {
    const [ingredients, setIngredients] = useState([]);
    const addIngredient = (food) => {
        // copy current state with slice
        const newIngredients = ingredients.slice();
        if (!newIngredients.includes(food)) {
            // if newIngredients doesn not include food...
            // add new ingredient to copy
            newIngredients.push(food);
            // invoke setIngredients and pass the copy as the argument
            setIngredients(newIngredients);
        }
    };
    const removeIngredient = (food) => {
        const copy = ingredients.slice();
        const i = copy.splice(i, 1);
        setIngredients(copy);
    };

    return (
        <>
            <MealQuantityProvider>
                <FoodList addIngredient={addIngredient} />
                <MealMakerForm
                    addIngredient={addIngredient}
                    ingredients={ingredients}
                    removeIngredient={removeIngredient}
                />
            </MealQuantityProvider>
        </>
    );
};
