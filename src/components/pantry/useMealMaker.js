import React, { useState, useEffect } from "react";

export const useMealMaker = () => {
  const [mealTrackerObject, setMealTrackerObject] = useState({});
  const mealMakerTracker = (foodId, quantity) => {
    // copy the existing state with object.assign
    // on new obj add a new id which is foodId and its value is quantity
    const copy = Object.assign(mealTrackerObject, { [foodId]: quantity });
    // then envoke setMealTrackerObject passing this new object as the argument
    setMealTrackerObject(copy);
  };
  return { mealTrackerObject, mealMakerTracker };
};
