import React, { useState, useEffect } from "react";

export const MealQuantityContext = React.createContext();

export const MealQuantityProvider = (props) => {
    const [quantities, setQuantities] = useState({});

    const updateQuantities = (foodId, quantity) => {
        const copy = Object.assign({}, { ...quantities }, { [foodId]: quantity });
        setQuantities(copy);
    };

    useEffect(() => {
        console.log("quantity state changed")
        console.log(quantities)
    }, [quantities])

    return <MealQuantityContext.Provider value={{ quantities, updateQuantities }}>
        {props.children}
    </MealQuantityContext.Provider>
}
