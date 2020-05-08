import React, { useState, useEffect } from "react";

export const useMealMaker = () => {
    const [mealTrackerObject, setMealTrackerObject] = useState({});

    const mealMakerTracker = (foodId, quantity) => {
        const copy = Object.assign({}, { ...mealTrackerObject }, { [foodId]: quantity });
        setMealTrackerObject(copy);
    };

    return { mealTrackerObject, mealMakerTracker };
};
