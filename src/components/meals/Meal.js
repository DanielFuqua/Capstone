import React, { useContext, useState } from "react";
import { MealContext } from "./MealProvider";
import { MealFoodsContext } from "./MealFoodsProvider";
import { UserMealContext } from "./UserMealsProvider";
import { QuantityTypeContext } from "../pantry/QuantityTypeProvider";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import MealDetailsModal from "./MealDetailsModal";

export default ({ meal, relatedFoods, relatedMealFoods, relatedUserMeals }) => {
  const { releaseMeal } = useContext(MealContext);
  const { releaseMealFoods } = useContext(MealFoodsContext);
  const { releaseUserMeal } = useContext(UserMealContext);
  const { quantityTypes } = useContext(QuantityTypeContext);
  const relatedUserMealsIDs = relatedUserMeals.map((rUM) => {
    return rUM.id;
  });
  const relatedMealFoodsIDs = relatedMealFoods.map((rMF) => {
    return rMF.id;
  });

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <article key={meal.id} className="meal">
        <section className="meal_display">
          <h2 className="meal__name">{meal.name}</h2>
          <h4>Ingredients:</h4>
          <ul className="meal__ingredients">
            {relatedFoods.map((ing) => {
              const quantityType =
                quantityTypes.find((qt) => qt.id === ing.quantityTypeId) || {};
              const relatedMealFoodObj =
                relatedMealFoods.find((rUM) => rUM.foodId === ing.id) || {};
              return (
                <li>
                  {ing.quantity} {quantityType.type} {ing.name} x
                  {relatedMealFoodObj.quantity}
                </li>
              );
            })}
          </ul>
          <h4>Macros:</h4>
          <article className="meal__nutrients">
            <div>Calories: {meal.calories}</div>
            <div>Protein: {meal.protein}g</div>
            <div>Fat: {meal.fat}g</div>
            <div>Carbohydrate: {meal.carbohydrate}g</div>
            <div>Sugar: {meal.sugar}g</div>
          </article>
        </section>
        <section className="meal_buttons">
          <button className="button_edit">Edit</button>
          <button className="button_details" onClick={toggle}>
            Details
          </button>

          <button
            className="button_trash"
            onClick={() => {
              releaseMeal(meal.id);
              releaseMealFoods(relatedMealFoodsIDs);
              releaseUserMeal(relatedUserMealsIDs);
            }}
          >
            Trash
          </button>
        </section>
      </article>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Details About {meal.name}</ModalHeader>
        <ModalBody>
          <MealDetailsModal meal={meal} toggle={toggle} />
        </ModalBody>
      </Modal>
    </>
  );
};
